import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

const buildBasicSearchPrompt = (filters: any) => {
  const leadCount = Math.min(Math.max(filters.leadCount, 1), 50);

  let prompt = `Generate EXACTLY ${leadCount} unique company leads as a JSON array. The response MUST be a valid JSON array starting with [ and ending with ]. Each company should have this exact structure:
  {
    "company": "Company Name",
    "email": "contact@company.com",
    "phone": "+1234567890",
    "website": "https://company.com",
    "address": "Full Address",
    "industry": "${filters.industry}",
    "score": 8,
    "socialMedia": {
      "linkedin": "https://linkedin.com/company/...",
      "twitter": "https://twitter.com/...",
      "facebook": "https://facebook.com/...",
      "instagram": "https://instagram.com/..."
    }
  }`;
  
  if (filters.country !== 'all') {
    prompt += `\nCompanies must be located in ${filters.country}`;
    if (filters.city !== 'all') {
      prompt += `, specifically in ${filters.city}`;
    }
  }
  
  if (filters.industry !== 'all') {
    prompt += `\nCompanies must be in the ${filters.industry} industry`;
  }

  prompt += `\n\nCRITICAL REQUIREMENTS:
  1. Return EXACTLY ${leadCount} companies
  2. Response must be a valid JSON array
  3. Start with [ and end with ]
  4. Each company must be unique
  5. All fields must use the exact names shown above
  6. DO NOT include any text before or after the JSON array
  7. DO NOT include any explanations or comments`;

  return prompt;
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { 
      headers: {
        ...corsHeaders,
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
      }
    })
  }

  try {
    const { filters, userId } = await req.json()
    console.log('Filters received:', filters)
    console.log('User ID:', userId)

    const perplexityApiKey = Deno.env.get('PERPLEXITY_API_KEY')
    if (!perplexityApiKey) {
      throw new Error('Perplexity API key not configured')
    }

    console.log('Sending request to Perplexity...')
    const response = await fetch('https://api.perplexity.ai/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${perplexityApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'llama-3.1-sonar-small-128k-online',
        messages: [
          {
            role: 'system',
            content: 'You are a JSON API that ONLY returns valid JSON arrays. Never include any explanatory text. Your response must always start with [ and end with ]. Never include any text before or after the JSON array.'
          },
          {
            role: 'user',
            content: buildBasicSearchPrompt(filters)
          }
        ],
        temperature: 0.1, // Reduced for more consistent output
        top_p: 0.9,
        max_tokens: 2000 // Increased to handle larger responses
      }),
    });

    if (!response.ok) {
      console.error('Perplexity API error:', await response.text())
      throw new Error('Error generating leads')
    }

    const result = await response.json()
    console.log('Perplexity response received')
    
    let generatedLeads
    try {
      const content = result.choices[0].message.content.trim()
      console.log('Raw content:', content)
      
      // Ensure we only parse the JSON array part
      const jsonStart = content.indexOf('[')
      const jsonEnd = content.lastIndexOf(']') + 1
      if (jsonStart === -1 || jsonEnd === 0) {
        throw new Error('No JSON array found in response')
      }
      
      const jsonContent = content.slice(jsonStart, jsonEnd)
      console.log('Cleaned JSON content:', jsonContent)
      
      generatedLeads = JSON.parse(jsonContent)
      
      if (!Array.isArray(generatedLeads)) {
        throw new Error('Response is not an array')
      }
      
      if (generatedLeads.length !== filters.leadCount) {
        throw new Error(`Incorrect number of leads: ${generatedLeads.length} instead of ${filters.leadCount}`)
      }

      // Validate each lead has required fields
      generatedLeads.forEach((lead: any, index: number) => {
        if (!lead.company || !lead.industry || !lead.socialMedia) {
          throw new Error(`Lead at index ${index} is missing required fields`)
        }
      })
    } catch (error) {
      console.error('Error parsing response:', error)
      throw new Error('Invalid response format: ' + error.message)
    }

    return new Response(
      JSON.stringify({ 
        success: true, 
        data: generatedLeads 
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
        headers: { 
          ...corsHeaders,
          'Content-Type': 'application/json'
        },
        status: 400
      }
    )
  }
})