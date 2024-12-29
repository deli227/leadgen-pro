interface UserProfile {
  subscription_type: string;
  leads_generated_this_month: number;
}

interface SubscriptionLimits {
  monthly_leads_limit: number;
}

export const checkAndGetAvailableLeads = async (
  supabase: any,
  userId: string,
  requestedLeads: number
): Promise<{ canGenerate: boolean; availableLeads: number; error?: string }> => {
  console.log(`Vérification des limites pour l'utilisateur ${userId}, demande de ${requestedLeads} leads`);

  try {
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('subscription_type, leads_generated_this_month')
      .eq('id', userId)
      .single();

    if (profileError) {
      console.error('Erreur lors de la récupération du profil:', profileError);
      throw new Error('Erreur lors de la récupération du profil');
    }

    const { data: limits, error: limitsError } = await supabase
      .from('subscription_limits')
      .select('monthly_leads_limit')
      .eq('subscription_type', profile.subscription_type)
      .single();

    if (limitsError) {
      console.error('Erreur lors de la récupération des limites:', limitsError);
      throw new Error('Erreur lors de la récupération des limites');
    }

    const remainingLeads = limits.monthly_leads_limit - profile.leads_generated_this_month;
    console.log(`Leads restants pour ce mois: ${remainingLeads}`);

    if (remainingLeads <= 0) {
      return { 
        canGenerate: false, 
        availableLeads: 0,
        error: "Limite mensuelle atteinte" 
      };
    }

    const availableLeads = Math.min(requestedLeads, remainingLeads);
    console.log(`Nombre de leads disponibles pour la génération: ${availableLeads}`);

    return {
      canGenerate: true,
      availableLeads
    };
  } catch (error) {
    console.error('Erreur lors de la vérification des limites:', error);
    throw error;
  }
};

export const updateLeadCount = async (
  supabase: any,
  userId: string,
  generatedCount: number
): Promise<void> => {
  console.log(`Mise à jour du compteur de leads pour l'utilisateur ${userId}, ajout de ${generatedCount} leads`);

  try {
    const { error } = await supabase.rpc('increment_lead_counters', {
      p_user_id: userId,
      p_count: generatedCount
    });

    if (error) {
      console.error('Erreur lors de la mise à jour du compteur:', error);
      throw new Error('Erreur lors de la mise à jour du compteur');
    }

    console.log('Compteur de leads mis à jour avec succès');
  } catch (error) {
    console.error('Erreur lors de la mise à jour:', error);
    throw error;
  }
};