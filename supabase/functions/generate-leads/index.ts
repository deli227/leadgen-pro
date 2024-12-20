import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    // Créer le client Supabase
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
    )

    // Récupérer les secrets
    const { data: secrets, error: secretsError } = await supabaseClient
      .from('secrets')
      .select('value')
      .in('name', ['BRIGHT_DATA_PROXY_URL'])

    if (secretsError) {
      throw new Error(`Error fetching secrets: ${secretsError.message}`)
    }

    const proxyUrl = secrets.find(s => s.name === 'BRIGHT_DATA_PROXY_URL')?.value

    if (!proxyUrl) {
      throw new Error('Bright Data proxy URL not found')
    }

    // Récupérer les paramètres de la requête
    const { filters } = await req.json()
    console.log('Received filters:', filters)

    // Configuration du proxy
    const fetchOptions = {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      proxy: proxyUrl,
    }

    // Exemple de requête à travers le proxy
    const response = await fetch('https://example.com', fetchOptions)
    const data = await response.json()

    return new Response(
      JSON.stringify({ success: true, data }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200 
      }
    )

  } catch (error) {
    console.error('Error:', error)
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500 
      }
    )
  }
})