import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

async function generateMockLeads(filters: any) {
  const leads = []
  const count = Math.min(filters.leadCount || 10, 50) // Maximum 50 leads

  for (let i = 1; i <= count; i++) {
    leads.push({
      company: `Entreprise ${i} - ${filters.industry}`,
      website: `https://example${i}.com`,
      email: `contact@example${i}.com`,
      phone: `+33 1 23 45 67 ${i.toString().padStart(2, '0')}`,
      address: `${filters.city}, ${filters.country}`,
      industry: filters.industry,
      social_media: {
        linkedin: `https://linkedin.com/company/example${i}`,
        twitter: `https://twitter.com/example${i}`
      },
      score: Math.floor(Math.random() * 5) + 5, // Score entre 5 et 10
      qualification: Math.floor(Math.random() * 3) + 2, // Qualification entre 2 et 5
      strengths: ['Présence digitale forte', 'Croissance rapide'],
      weaknesses: ['Communication à améliorer']
    })
  }

  return leads
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? ''
    )

    const { filters } = await req.json()
    console.log('Received filters:', filters)

    if (!filters || !filters.country || !filters.industry) {
      throw new Error('Missing required filters')
    }

    const leads = await generateMockLeads(filters)
    console.log(`Generated ${leads.length} leads`)

    const { error: insertError } = await supabaseClient
      .from('leads')
      .insert(leads.map(lead => ({
        ...lead,
        user_id: filters.userId
      })))

    if (insertError) {
      console.error('Error inserting leads:', insertError)
      throw insertError
    }

    return new Response(
      JSON.stringify({ success: true, message: `${leads.length} leads generated successfully` }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200 
      }
    )

  } catch (error) {
    console.error('Error:', error)
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: error.message || 'An error occurred during lead generation'
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500 
      }
    )
  }
})