import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.7'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

interface SearchParams {
  industry: string
  country: string
  city: string
  leadCount: number
}

Deno.serve(async (req) => {
  // Handle CORS
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    // Vérifier l'authentification
    const authHeader = req.headers.get('Authorization')
    if (!authHeader) {
      console.error('Erreur: Pas d\'en-tête d\'autorisation')
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

    if (userError) {
      console.error('Erreur d\'authentification:', userError)
      throw new Error('Unauthorized')
    }

    if (!user) {
      console.error('Erreur: Pas d\'utilisateur trouvé')
      throw new Error('No user found')
    }

    // Récupérer les paramètres de recherche
    const { industry, country, city, leadCount }: SearchParams = await req.json()
    
    console.log('Paramètres de recherche reçus:', { industry, country, city, leadCount })

    // Construire la requête de recherche
    let searchQuery = ''
    if (industry !== 'all') {
      searchQuery += `${industry} company `
    }
    if (city !== 'all') {
      searchQuery += `${city} `
    }
    if (country !== 'all') {
      searchQuery += `${country}`
    }
    
    if (!searchQuery.trim()) {
      searchQuery = 'companies'
    }

    console.log('Requête de recherche finale:', searchQuery)

    // Vérifier la clé API Bright Data
    const brightDataApiKey = Deno.env.get('BRIGHT_DATA_SERP_API_KEY')
    if (!brightDataApiKey) {
      console.error('Erreur: Clé API Bright Data non trouvée')
      throw new Error('Bright Data API key not found')
    }

    // Appeler l'API Bright Data
    console.log('Appel de l\'API Bright Data...')
    const brightDataResponse = await fetch('https://api.brightdata.com/serp/google', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${brightDataApiKey}`,
      },
      body: JSON.stringify({
        query: searchQuery,
        domain: 'google.com',
        num_pages: Math.ceil(leadCount / 10),
        parse: true
      }),
    })

    if (!brightDataResponse.ok) {
      const errorText = await brightDataResponse.text()
      console.error('Erreur Bright Data:', errorText)
      throw new Error(`Bright Data API error: ${brightDataResponse.status} - ${errorText}`)
    }

    const results = await brightDataResponse.json()
    console.log('Résultats bruts reçus de Bright Data:', results)

    if (!results.organic || !Array.isArray(results.organic)) {
      console.error('Format de réponse invalide:', results)
      throw new Error('Invalid response format from Bright Data')
    }

    // Traiter et formater les résultats
    const leads = results.organic.slice(0, leadCount).map((result: any) => ({
      company: result.title.replace(/[-–—|].+$/, '').trim(),
      website: result.link,
      industry: industry === 'all' ? 'Non spécifié' : industry,
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
      console.error('Erreur lors de l\'insertion des leads:', insertError)
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
      console.error('Erreur lors de la mise à jour du profil:', updateError)
    }

    return new Response(
      JSON.stringify({ success: true, leads }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      }
    )

  } catch (error) {
    console.error('Erreur générale:', error)
    return new Response(
      JSON.stringify({ 
        error: error.message,
        details: error.stack 
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400,
      }
    )
  }
})