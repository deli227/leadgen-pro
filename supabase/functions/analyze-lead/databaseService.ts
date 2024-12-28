import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

export async function saveAnalysisToDatabase(leadId: string, userId: string, analysis: any) {
  const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
  const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
  const supabase = createClient(supabaseUrl, supabaseKey);

  const { data: savedAnalysis, error: insertError } = await supabase
    .from('lead_analyses')
    .insert({
      lead_id: leadId,
      user_id: userId,
      company_analysis: analysis.company_analysis,
      tech_analysis: analysis.tech_analysis,
      marketing_analysis: analysis.marketing_analysis,
      financial_analysis: analysis.financial_analysis,
      competitive_analysis: analysis.competitive_analysis,
      recommendations: analysis.recommendations,
      action_plan: analysis.action_plan
    })
    .select()
    .single();

  if (insertError) {
    console.error('Erreur lors de la sauvegarde:', insertError);
    throw new Error('Erreur lors de la sauvegarde de l\'analyse');
  }

  return savedAnalysis;
}