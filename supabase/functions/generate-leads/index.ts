import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import { corsHeaders } from '../_shared/cors.ts'

interface ScrapingFilters {
  search: string
  industry: string
  country: string
  city: string
  leadCount: number
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? ''
    )

    // Récupérer la clé API de scraping
    const { data: secretData, error: secretError } = await supabase
      .from('secrets')
      .select('value')
      .eq('name', 'scraping_api_key')
      .single()

    if (secretError || !secretData) {
      throw new Error('Clé API de scraping non trouvée')
    }

    const { filters } = await req.json()
    const { search, industry, country, city, leadCount } = filters as ScrapingFilters

    // Simuler l'appel à l'API de scraping (à remplacer par votre vrai appel API)
    const response = await fetch('https://api.scraping-service.com/search', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${secretData.value}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: search,
        industry,
        location: {
          country,
          city,
        },
        limit: leadCount,
      }),
    })

    const leads = await response.json()

    return new Response(JSON.stringify(leads), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 400,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  }
})