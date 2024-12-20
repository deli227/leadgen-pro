import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.7'
import { corsHeaders } from '../_shared/cors'

interface SearchParams {
  industry: string
  country: string
  city: string
  leadCount: number
}

const BRIGHT_DATA_SERP_API_URL = 'https://api.brightdata.com/serp/google'

Deno.serve(async (req) => {
  // Handle CORS
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    // Vérifier l'authentification
    const authHeader = req.headers.get('Authorization')
    if (!authHeader) {
      throw new Error('Missing Authorization header')
    }

    // Créer le client Supabase
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
      {
        global: {
          headers: { Authorization: authHeader },
        },
      }
    )

    // Récupérer l'utilisateur
    const {
      data: { user },
      error: userError,
    } = await supabaseClient.auth.getUser()

    if (userError || !user) {
      throw new Error('Unauthorized')
    }

    // Récupérer les paramètres de recherche
    const { industry, country, city, leadCount }: SearchParams = await req.json()
    
    console.log('Recherche avec paramètres:', { industry, country, city, leadCount })

    // Construire la requête de recherche
    const searchQuery = `${industry} company ${city} ${country}`
    
    // Appeler l'API SERP de Bright Data
    const response = await fetch(BRIGHT_DATA_SERP_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${Deno.env.get('BRIGHT_DATA_SERP_API_KEY')}`,
      },
      body: JSON.stringify({
        query: searchQuery,
        domain: 'google.com',
        num_pages: Math.ceil(leadCount / 10), // 10 résultats par page
      }),
    })

    if (!response.ok) {
      throw new Error(`Bright Data API error: ${response.statusText}`)
    }

    const results = await response.json()
    console.log('Résultats bruts:', results)

    // Traiter et formater les résultats
    const leads = results.organic.slice(0, leadCount).map((result: any) => ({
      company: result.title.replace(/- .*$/, '').trim(),
      website: result.link,
      description: result.snippet,
      industry,
      user_id: user.id,
      qualification: 0,
      score: 0,
      social_media: {},
      strengths: [],
      weaknesses: [],
    }))

    console.log('Leads formatés:', leads)

    // Insérer les leads dans la base de données
    const { error: insertError } = await supabaseClient
      .from('leads')
      .insert(leads)

    if (insertError) {
      throw new Error(`Error inserting leads: ${insertError.message}`)
    }

    // Mettre à jour les compteurs de l'utilisateur
    const { error: updateError } = await supabaseClient
      .from('profiles')
      .update({
        leads_generated_today: leads.length,
        last_lead_generation_date: new Date().toISOString(),
      })
      .eq('id', user.id)

    if (updateError) {
      console.error('Error updating profile:', updateError)
    }

    return new Response(
      JSON.stringify({ success: true, leads }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      }
    )

  } catch (error) {
    console.error('Error:', error)
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400,
      }
    )
  }
})