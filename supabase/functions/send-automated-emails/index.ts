import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.7";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
const SUPABASE_URL = Deno.env.get("SUPABASE_URL");
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");

const supabase = createClient(
  SUPABASE_URL!,
  SUPABASE_SERVICE_ROLE_KEY!
);

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Get all active automations
    const { data: automations, error: automationsError } = await supabase
      .from("email_automations")
      .select("*")
      .eq("is_active", true);

    if (automationsError) throw automationsError;

    // Process each automation
    for (const automation of automations) {
      // Get leads that match the trigger score
      const { data: leads, error: leadsError } = await supabase
        .from("leads")
        .select("*")
        .eq("user_id", automation.user_id)
        .gte("score", automation.trigger_score);

      if (leadsError) throw leadsError;

      // Send emails to matching leads
      for (const lead of leads) {
        if (!lead.email) continue;

        try {
          const emailResponse = await fetch("https://api.resend.com/emails", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${RESEND_API_KEY}`,
            },
            body: JSON.stringify({
              from: "LeadGen Pro <onboarding@resend.dev>",
              to: [lead.email],
              subject: automation.subject,
              html: automation.template
                .replace("{{company}}", lead.company)
                .replace("{{score}}", lead.score.toString()),
            }),
          });

          if (!emailResponse.ok) {
            console.error(`Failed to send email to ${lead.email}:`, await emailResponse.text());
          }
        } catch (error) {
          console.error(`Error sending email to ${lead.email}:`, error);
        }
      }
    }

    return new Response(
      JSON.stringify({ message: "Automated emails processed successfully" }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      }
    );
  } catch (error) {
    console.error("Error in send-automated-emails function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 500,
      }
    );
  }
};

serve(handler);