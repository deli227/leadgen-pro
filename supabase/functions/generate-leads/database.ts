import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.7';
import { LeadResult } from './types.ts';

export async function insertLeadsAndUpdateProfile(
  supabaseClient: ReturnType<typeof createClient>,
  leads: LeadResult[],
  userId: string
) {
  const { error: insertError } = await supabaseClient
    .from('leads')
    .insert(leads);

  if (insertError) {
    console.error('Erreur lors de l\'insertion des leads:', insertError);
    throw new Error(`Database error: ${insertError.message}`);
  }

  const { error: updateError } = await supabaseClient
    .from('profiles')
    .update({
      leads_generated_today: leads.length,
      last_lead_generation_date: new Date().toISOString(),
    })
    .eq('id', userId);

  if (updateError) {
    console.error('Erreur lors de la mise à jour du profil:', updateError);
    throw new Error(`Profile update error: ${updateError.message}`);
  }
}