import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

export async function saveAnalysis(analysis: any, lead: any, userId: string, supabaseUrl: string, supabaseKey: string) {
  const supabase = createClient(supabaseUrl, supabaseKey);

  const { data: savedAnalysis, error: insertError } = await supabase
    .from('lead_analyses')
    .insert({
      lead_id: lead.id,
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