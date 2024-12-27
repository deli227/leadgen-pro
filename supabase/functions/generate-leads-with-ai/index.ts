import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import { corsHeaders } from '../_shared/cors.ts'

const PERPLEXITY_API_KEY = Deno.env.get('PERPLEXITY_API_KEY')
const SUPABASE_URL = Deno.env.get('SUPABASE_URL')
const SUPABASE_ANON_KEY = Deno.env.get('SUPABASE_ANON_KEY')

// Validate input data
function validateInputData(data: any) {
  const requiredFields = ['search', 'leadCount', 'industry', 'country', 'city', 'userId']
  const missingFields = requiredFields.filter(field => !data[field])
  
  if (missingFields.length > 0) {
    throw new Error(`Missing required fields: ${missingFields.join(', ')}`)
  }

  if (typeof data.leadCount !== 'number' || data.leadCount < 1 || data.leadCount > 50) {
    throw new Error('leadCount must be a number between 1 and 50')
  }

  return true
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    // Validate API key
    if (!PERPLEXITY_API_KEY) {
      console.error('PERPLEXITY_API_KEY is not set')
      throw new Error('PERPLEXITY_API_KEY is not set')
    }

    // Parse and validate request data
    const requestData = await req.json()
    console.log('Received request data:', requestData)
    validateInputData(requestData)

    const { search, leadCount, industry, country, city, userId } = requestData
    console.log('Validated request parameters:', { search, leadCount, industry, country, city, userId })

    // Construct prompt
    const prompt = `Generate ${leadCount} business leads in the ${industry} industry from ${city}, ${country}. For each lead, provide:
    1. Company name
    2. Industry focus
    3. A list of 3 company strengths
    4. A list of 3 areas for improvement
    5. A qualification score from 1-10
    Format the response as a valid JSON array where each object has these fields:
    - company (string)
    - industry (string)
    - strengths (array of 3 strings)
    - weaknesses (array of 3 strings)
    - qualification (number between 1-10)
    Ensure the response is a properly formatted JSON array that can be parsed.`

    console.log('Sending prompt to Perplexity:', prompt)

    // Make request to Perplexity API with proper headers
    const response = await fetch('https://api.perplexity.ai/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${PERPLEXITY_API_KEY}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        model: 'sonar-medium-online',
        messages: [
          {
            role: 'system',
            content: 'You are a helpful assistant that generates business leads information in valid JSON format only.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        max_tokens: 4000,
        temperature: 0.7,
        top_p: 0.9,
        stream: false
      })
    })

    if (!response.ok) {
      console.error('Perplexity API error:', response.status, response.statusText)
      const errorText = await response.text()
      console.error('Error details:', errorText)
      throw new Error(`Perplexity API error: ${response.status} ${response.statusText}`)
    }

    const data = await response.json()
    console.log('Perplexity API response:', data)

    if (!data.choices || !data.choices[0] || !data.choices[0].message) {
      throw new Error('Invalid response format from Perplexity API')
    }

    let leads = []
    try {
      const content = data.choices[0].message.content
      // Try to extract JSON if it's wrapped in backticks or has extra text
      const jsonMatch = content.match(/```json\n?(.*)\n?```/) || content.match(/\[(.*)\]/s)
      const jsonContent = jsonMatch ? jsonMatch[1] : content
      const cleanedContent = jsonContent.trim().replace(/^[^[]*\[/, '[').replace(/][^]]*$/, ']')
      leads = JSON.parse(cleanedContent)
      
      if (!Array.isArray(leads)) {
        throw new Error('Generated content is not an array')
      }
      
      console.log('Parsed leads:', leads)
    } catch (error) {
      console.error('Error parsing leads:', error)
      throw new Error('Failed to parse generated leads')
    }

    // Initialize Supabase client
    const supabase = createClient(
      SUPABASE_URL!,
      SUPABASE_ANON_KEY!
    )

    // Insert leads into Supabase
    const { data: insertedLeads, error: insertError } = await supabase
      .from('leads')
      .insert(
        leads.map((lead: any) => ({
          ...lead,
          user_id: userId,
          score: Math.floor(Math.random() * 10) + 1
        }))
      )
      .select()

    if (insertError) {
      console.error('Error inserting leads:', insertError)
      throw insertError
    }

    console.log('Successfully inserted leads:', insertedLeads?.length)

    return new Response(
      JSON.stringify({
        success: true,
        leads: insertedLeads
      }),
      {
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json'
        }
      }
    )
  } catch (error) {
    console.error('Error:', error)
    return new Response(
      JSON.stringify({
        success: false,
        error: error.message
      }),
      {
        status: 400,
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json'
        }
      }
    )
  }
})