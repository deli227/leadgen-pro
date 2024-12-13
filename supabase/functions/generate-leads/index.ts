import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import { corsHeaders } from '../_shared/cors.ts'
import { faker } from 'npm:@faker-js/faker/locale/fr'

const industries = [
  "Technologies", "E-commerce", "Finance", "Santé", "Éducation",
  "Immobilier", "Services aux entreprises", "Marketing", "Logistique",
  "Énergie", "Tourisme", "Alimentation"
]

const generateRandomStrengths = () => {
  const allStrengths = [
    "Innovation continue", "Équipe expérimentée", "Position de leader",
    "Forte croissance", "Présence internationale", "Excellence opérationnelle",
    "R&D avancée", "Service client premium", "Marque reconnue"
  ]
  return faker.helpers.arrayElements(allStrengths, { min: 2, max: 4 })
}

const generateRandomWeaknesses = () => {
  const allWeaknesses = [
    "Concurrence forte", "Coûts élevés", "Dépendance fournisseurs",
    "Marché saturé", "Rotation du personnel", "Dette technique",
    "Processus complexes", "Marketing limité"
  ]
  return faker.helpers.arrayElements(allWeaknesses, { min: 1, max: 3 })
}

const generateMockLead = (userId: string) => {
  const company = faker.company.name()
  const domain = faker.internet.domainName()
  
  return {
    user_id: userId,
    company,
    email: `contact@${domain}`,
    phone: faker.phone.number(),
    address: faker.location.streetAddress(),
    qualification: faker.number.int({ min: 3, max: 10 }),
    social_media: {
      linkedin: `https://linkedin.com/company/${company.toLowerCase().replace(/\s+/g, '-')}`,
      twitter: `https://twitter.com/${company.toLowerCase().replace(/\s+/g, '')}`
    },
    score: faker.number.int({ min: 5, max: 10 }),
    industry: faker.helpers.arrayElement(industries),
    strengths: generateRandomStrengths(),
    weaknesses: generateRandomWeaknesses()
  }
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    // Get the JWT from the Authorization header
    const authHeader = req.headers.get('Authorization')?.split('Bearer ')[1]
    if (!authHeader) {
      throw new Error('Non authentifié')
    }

    // Get the user from the JWT
    const { data: { user }, error: userError } = await supabase.auth.getUser(authHeader)
    if (userError || !user) {
      throw new Error('Utilisateur non trouvé')
    }

    // Get the request body
    const { filters } = await req.json()
    const { leadCount = 10 } = filters || {}

    console.log('Generating leads for user:', user.id)
    console.log('Lead count:', leadCount)

    // Generate mock leads
    const mockLeads = Array.from({ length: leadCount }, () => generateMockLead(user.id))

    // Insert the leads into the database
    const { data: insertedLeads, error: insertError } = await supabase
      .from('leads')
      .insert(mockLeads)
      .select()

    if (insertError) {
      console.error('Error inserting leads:', insertError)
      throw insertError
    }

    // Update user's lead generation counts
    const { error: updateError } = await supabase
      .from('profiles')
      .update({
        leads_generated_today: supabase.sql`leads_generated_today + ${leadCount}`,
        leads_generated_this_month: supabase.sql`leads_generated_this_month + ${leadCount}`,
        last_lead_generation_date: new Date().toISOString()
      })
      .eq('id', user.id)

    if (updateError) {
      console.error('Error updating profile:', updateError)
      throw updateError
    }

    return new Response(JSON.stringify(insertedLeads), {
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