import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const SENDGRID_API_KEY = Deno.env.get('SENDGRID_API_KEY')
const SUPABASE_URL = Deno.env.get('SUPABASE_URL')
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

interface EmailRequest {
  to: string
  from: string
  subject: string
  html: string
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const supabase = createClient(
      SUPABASE_URL!,
      SUPABASE_SERVICE_ROLE_KEY!
    )

    const { automation_id } = await req.json()

    // Fetch the automation details
    const { data: automation, error: automationError } = await supabase
      .from('email_automations')
      .select('*')
      .eq('id', automation_id)
      .single()

    if (automationError) throw new Error(`Error fetching automation: ${automationError.message}`)
    if (!automation) throw new Error('Automation not found')

    // Get leads for this automation based on score
    const { data: leads, error: leadsError } = await supabase
      .from('leads')
      .select('email')
      .eq('user_id', automation.user_id)
      .gte('score', automation.trigger_score)
      .not('email', 'is', null)

    if (leadsError) throw new Error(`Error fetching leads: ${leadsError.message}`)
    if (!leads?.length) return new Response(
      JSON.stringify({ message: 'No leads match the criteria' }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )

    // Send email to each lead
    const emailPromises = leads.map(async (lead) => {
      const emailRequest: EmailRequest = {
        to: lead.email,
        from: automation.sender_email,
        subject: automation.subject,
        html: automation.template,
      }

      const response = await fetch('https://api.sendgrid.com/v3/mail/send', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${SENDGRID_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          personalizations: [{
            to: [{ email: emailRequest.to }],
          }],
          from: { email: emailRequest.from },
          subject: emailRequest.subject,
          content: [{
            type: 'text/html',
            value: emailRequest.html,
          }],
        }),
      })

      if (!response.ok) {
        const error = await response.text()
        throw new Error(`SendGrid API error: ${error}`)
      }

      return response
    })

    await Promise.all(emailPromises)

    // Update last_sent_at timestamp
    const { error: updateError } = await supabase
      .from('email_automations')
      .update({ last_sent_at: new Date().toISOString() })
      .eq('id', automation_id)

    if (updateError) throw new Error(`Error updating automation: ${updateError.message}`)

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: `Emails sent to ${leads.length} leads` 
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )

  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    )
  }
})