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
    // Récupération du profil utilisateur
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('subscription_type, leads_generated_this_month')
      .eq('id', userId)
      .single();

    if (profileError) {
      console.error('Erreur lors de la récupération du profil:', profileError);
      throw new Error('Erreur lors de la récupération du profil');
    }

    // Récupération des limites de l'abonnement
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

    // Calcul du nombre de leads pouvant être générés
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

  const { error } = await supabase
    .from('profiles')
    .update({ 
      leads_generated_this_month: supabase.sql`leads_generated_this_month + ${generatedCount}`,
      last_lead_generation_date: new Date().toISOString()
    })
    .eq('id', userId);

  if (error) {
    console.error('Erreur lors de la mise à jour du compteur:', error);
    throw new Error('Erreur lors de la mise à jour du compteur');
  }
};