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
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? ''
    )

    const { filters } = await req.json()
    const { leadCount } = filters as ScrapingFilters

    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000))

    // Generate mock leads
    const mockLeads = Array.from({ length: leadCount }, () => {
      const companies = [
        "TechVision", "DataFlow", "SmartSolutions", "InnovaTech",
        "EcoSystems", "CloudNine", "DigitalPulse", "FutureWave",
        "GlobalTech", "CyberForce", "GreenTech", "SmartLife"
      ]
      
      const company = companies[Math.floor(Math.random() * companies.length)]
      const domain = company.toLowerCase().replace(/\s+/g, '') + '.com'
      
      return {
        id: Math.floor(Math.random() * 10000),
        company,
        email: `contact@${domain}`,
        phone: '+33 ' + Math.floor(Math.random() * 1000000000),
        address: '123 Tech Street',
        qualification: Math.floor(Math.random() * 5) + 5,
        socialMedia: {
          linkedin: `https://linkedin.com/company/${company.toLowerCase()}`,
          twitter: `https://twitter.com/${company.toLowerCase()}`
        },
        score: Math.floor(Math.random() * 5) + 5,
        industry: "Technologies",
        strengths: ["Innovation", "Équipe expérimentée"],
        weaknesses: ["Concurrence forte"]
      }
    })

    return new Response(JSON.stringify(mockLeads), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  } catch (error) {
    console.error('Error in generate-leads function:', error)
    return new Response(JSON.stringify({ error: error.message }), {
      status: 400,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  }
})