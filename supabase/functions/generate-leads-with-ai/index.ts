import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

function buildBasicSearchPrompt(filters: any) {
  const prompt = `Generate ${filters.leadCount} B2B leads in ${filters.country}, ${filters.city} for the ${filters.industry} industry. Return a JSON array of leads with this exact format:
  [
    {
      "company": "Company Name",
      "website": "https://example.com",
      "email": "contact@example.com",
      "phone": "+1234567890",
      "address": "Full Address",
      "industry": "${filters.industry}",
      "socialMedia": {
        "linkedin": "https://linkedin.com/company/example",
        "twitter": "https://twitter.com/example"
      },
      "score": 8,
      "qualification": 4,
      "strengths": ["Strength 1", "Strength 2"],
      "weaknesses": ["Weakness 1", "Weakness 2"]
    }
  ]

  Rules:
  1. Use realistic, professional data
  2. Ensure all URLs are properly formatted
  3. Start with [ and end with ]
  4. Each company must be unique
  5. All fields must use the exact names shown above
  6. DO NOT include any text before or after the JSON array
  7. DO NOT include any explanations or comments`;

  return prompt;
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const { filters } = await req.json()
    console.log('Received filters:', filters)

    if (!filters || !filters.country || !filters.industry || !filters.userId) {
      throw new Error('Missing required filters')
    }

    // Initialize Supabase client
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
      {
        auth: {
          persistSession: false
        }
      }
    )

    // Call Perplexity API to generate leads
    const response = await fetch('https://api.perplexity.ai/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${Deno.env.get('PERPLEXITY_API_KEY')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'pplx-7b-chat',
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
        temperature: 0.1,
        top_p: 0.9,
        max_tokens: 2000
      }),
    });

    if (!response.ok) {
      throw new Error(`Perplexity API error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    console.log('Perplexity API response:', data);

    if (!data.choices || !data.choices[0] || !data.choices[0].message || !data.choices[0].message.content) {
      throw new Error('Invalid API response structure');
    }

    const content = data.choices[0].message.content;
    console.log('Generated content:', content);

    let generatedLeads;
    try {
      // Try to parse the content directly
      generatedLeads = JSON.parse(content);

      // Validate that it's an array
      if (!Array.isArray(generatedLeads)) {
        throw new Error('Response is not an array');
      }

      // Validate lead count
      if (generatedLeads.length !== filters.leadCount) {
        throw new Error(`Incorrect number of leads: ${generatedLeads.length} instead of ${filters.leadCount}`)
      }

      // Validate each lead has required fields
      generatedLeads.forEach((lead: any, index: number) => {
        if (!lead.company || !lead.industry || !lead.socialMedia) {
          throw new Error(`Lead at index ${index} is missing required fields`)
        }
      })

      // Add user_id to each lead
      const leadsWithUserId = generatedLeads.map((lead: any) => ({
        ...lead,
        user_id: filters.userId
      }));

      // Insert leads into Supabase
      const { data: insertedLeads, error: insertError } = await supabaseClient
        .from('leads')
        .insert(leadsWithUserId)
        .select();

      if (insertError) {
        console.error('Error inserting leads:', insertError);
        throw new Error(`Failed to insert leads: ${insertError.message}`);
      }

      console.log('Successfully inserted leads:', insertedLeads);

      return new Response(
        JSON.stringify({ 
          success: true, 
          message: `${leadsWithUserId.length} leads generated and saved successfully`,
          data: insertedLeads
        }),
        { 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 200 
        }
      );

    } catch (error) {
      console.error('Error parsing response:', error)
      throw new Error('Invalid response format: ' + error.message)
    }

  } catch (error) {
    console.error('Error:', error)
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: error.message || 'An error occurred during lead generation'
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400 
      }
    )
  }
})