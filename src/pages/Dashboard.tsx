import { useState } from "react"
import { LeadsStats } from "@/components/leads/LeadsStats"
import { DashboardHeader } from "@/components/dashboard/DashboardHeader"
import { useSessionData } from "@/hooks/useSessionData"
import { useProfileData } from "@/hooks/useProfileData"
import { useSubscriptionLimits } from "@/hooks/useSubscriptionLimits"
import { useLeadsData } from "@/hooks/useLeadsData"
import { useToast } from "@/hooks/use-toast"
import { Lead } from "@/types/leads"
import { motion } from "framer-motion"
import { DashboardTabs } from "@/components/dashboard/DashboardTabs"
import { useQueryClient } from "@tanstack/react-query"
import { supabase } from "@/integrations/supabase/client"

export function Dashboard() {
  const { toast } = useToast()
  const queryClient = useQueryClient()
  const [filters, setFilters] = useState({
    search: "",
    leadCount: 10,
    industry: "all",
    country: "all",
    city: "all"
  })
  const [analyticsLeads, setAnalyticsLeads] = useState<Lead[]>([])
  const [exportLeads, setExportLeads] = useState<Lead[]>([])

  const { data: session } = useSessionData()
  const { data: profile } = useProfileData(session)
  const { data: limits } = useSubscriptionLimits(profile?.subscription_type)
  const { leads, isLoading, refetch } = useLeadsData(session)

  const handleAddToAnalytics = async (lead: Lead) => {
    if (!session?.user?.id) {
      toast({
        title: "Erreur d'authentification",
        description: "Vous devez être connecté pour effectuer cette action",
        variant: "destructive"
      })
      return
    }

    try {
      // Vérifier si le lead existe déjà dans analytics_leads avec maybeSingle()
      const { data: existingAnalytic, error: checkError } = await supabase
        .from('analytics_leads')
        .select('*')
        .eq('user_id', session.user.id)
        .eq('lead_id', lead.id)
        .maybeSingle()

      if (checkError) {
        throw checkError
      }

      // Si un résultat a été trouvé
      if (existingAnalytic) {
        toast({
          title: "Information",
          description: "Ce lead est déjà dans vos analytiques"
        })
        return
      }

      // Si le lead n'existe pas, on l'ajoute
      const { error: insertError } = await supabase
        .from('analytics_leads')
        .insert([{ user_id: session.user.id, lead_id: lead.id }])

      if (insertError) throw insertError

      setAnalyticsLeads(prev => [...prev, lead])
      toast({
        title: "Ajout aux analytiques",
        description: "Le lead a été ajouté aux analytiques avec succès"
      })

      // Mise à jour immédiate du cache
      const queryKey = ['leads', session.user.id]
      const currentData = queryClient.getQueryData<Lead[]>(queryKey) || []
      queryClient.setQueryData(queryKey, currentData)
    } catch (error: any) {
      console.error('Erreur lors de l\'ajout aux analytiques:', error)
      toast({
        title: "Erreur",
        description: "Erreur lors de l'ajout aux analytiques",
        variant: "destructive"
      })
    }
  }

  const handleAddToExport = (lead: Lead) => {
    if (!exportLeads.find(l => l.id === lead.id)) {
      setExportLeads(prev => [...prev, lead])
      toast({
        title: "Ajout à l'export",
        description: "Le lead a été ajouté à l'export avec succès"
      })
    }
  }

  const handleRemoveFromExport = (leadId: string) => {
    setExportLeads(prev => prev.filter(lead => lead.id !== leadId))
    toast({
      title: "Retrait de l'export",
      description: "Le lead a été retiré de l'export avec succès"
    })
  }

  const handleRemoveFromAnalytics = async (leadId: string) => {
    try {
      const { error } = await supabase
        .from('analytics_leads')
        .delete()
        .eq('lead_id', leadId)
        .eq('user_id', session?.user?.id)

      if (error) throw error

      setAnalyticsLeads(prev => prev.filter(lead => lead.id !== leadId))
      toast({
        title: "Retrait des analytiques",
        description: "Le lead a été retiré des analytiques avec succès"
      })

      // Mise à jour immédiate du cache
      const queryKey = ['leads', session?.user?.id]
      const currentData = queryClient.getQueryData<Lead[]>(queryKey) || []
      queryClient.setQueryData(queryKey, currentData)
    } catch (error) {
      console.error('Erreur lors du retrait des analytiques:', error)
      toast({
        title: "Erreur",
        description: "Erreur lors du retrait des analytiques",
        variant: "destructive"
      })
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-secondary-dark via-[#1A1F2C] to-black">
      <div className="container mx-auto py-2 sm:py-4 md:py-8 px-2 sm:px-4 animate-fade-in max-w-[98%] sm:max-w-[95%] lg:max-w-[90%] xl:max-w-[1400px]">
        <DashboardHeader exportLeads={exportLeads} />

        {profile && limits && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-2 sm:mb-4 md:mb-8"
          >
            <LeadsStats
              monthlyLeadsLeft={limits.monthly_leads_limit - profile.leads_generated_this_month}
              totalMonthlyLeads={limits.monthly_leads_limit}
              subscriptionType={profile.subscription_type}
            />
          </motion.div>
        )}
        
        <DashboardTabs 
          filters={filters}
          setFilters={setFilters}
          leads={leads}
          analyticsLeads={analyticsLeads}
          onAddToAnalytics={handleAddToAnalytics}
          onAddToExport={handleAddToExport}
          exportLeads={exportLeads}
          onRemoveFromExport={handleRemoveFromExport}
          onRemoveFromAnalytics={handleRemoveFromAnalytics}
        />
      </div>
    </div>
  )
}