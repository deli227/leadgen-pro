import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import { corsHeaders } from '../_shared/cors.ts'

const PERPLEXITY_API_KEY = Deno.env.get('PERPLEXITY_API_KEY')
const SUPABASE_URL = Deno.env.get('SUPABASE_URL')
const SUPABASE_ANON_KEY = Deno.env.get('SUPABASE_ANON_KEY')

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { search, leadCount, industry, country, city, userId } = await req.json()

    // Validate required parameters
    if (!industry || !country || !city || !userId) {
      return new Response(
        JSON.stringify({
          success: false,
          error: 'Missing required filters'
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

    const supabase = createClient(
      SUPABASE_URL!,
      SUPABASE_ANON_KEY!
    )

    const prompt = `Generate ${leadCount} business leads in the ${industry} industry from ${city}, ${country}. For each lead, provide:
    1. Company name
    2. Industry focus
    3. A list of 3 company strengths
    4. A list of 3 areas for improvement
    5. A qualification score from 1-10
    Format as JSON array with fields: company, industry, strengths (array), weaknesses (array), qualification (number).`

    const response = await fetch('https://api.perplexity.ai/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${PERPLEXITY_API_KEY}`
      },
      body: JSON.stringify({
        model: 'mixtral-8x7b-instruct',
        messages: [{
          role: 'user',
          content: prompt
        }]
      })
    })

    if (!response.ok) {
      console.error('Perplexity API error:', response.status, response.statusText)
      const errorText = await response.text()
      console.error('Error details:', errorText)
      throw new Error(`Perplexity API error: ${response.status} ${response.statusText}`)
    }

    const data = await response.json()
    console.log('API Response:', data)

    let leads = []
    try {
      const content = data.choices[0].message.content
      leads = JSON.parse(content)
    } catch (error) {
      console.error('Error parsing leads:', error)
      throw new Error('Failed to parse generated leads')
    }

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