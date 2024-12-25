import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const { filters, userId } = await req.json()
    console.log('Filtres reçus:', filters)
    console.log('ID utilisateur:', userId)

    // Temporary mock response while we implement a new search solution
    const mockResults = [{
      company: "Example Company",
      website: "www.example.com",
      email: "contact@example.com",
      phone: "+1234567890",
      address: "123 Example St",
      industry: filters.industry || "Technology",
      score: 8,
      qualification: 7,
      strengths: ["Strong market presence", "Innovative solutions"],
      weaknesses: ["Limited international reach"]
    }]

    return new Response(
      JSON.stringify({ success: true, data: mockResults }),
      { 
        headers: { 
          ...corsHeaders,
          'Content-Type': 'application/json'
        } 
      }
    )
  } catch (error) {
    console.error('Erreur:', error)
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