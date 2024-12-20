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

    // Récupérer le secret
    const { data: secret, error: secretError } = await supabaseClient
      .from('secrets')
      .select('*')
      .eq('name', 'BRIGHT_DATA_PROXY_URL')
      .single()

    if (secretError) {
      console.error('Error fetching secret:', secretError)
      throw new Error(`Error fetching secret: ${secretError.message}`)
    }

    if (!secret || !secret.value) {
      console.error('No proxy URL found in secrets')
      throw new Error('Bright Data proxy URL not found')
    }

    console.log('Secret retrieved successfully')

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
      proxy: secret.value,
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