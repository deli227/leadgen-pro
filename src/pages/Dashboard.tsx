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

export function Dashboard() {
  const { toast } = useToast()
  const [filters, setFilters] = useState({
    search: "",
    leadCount: 10,
    industry: "all",
    country: "all",
    city: "all"
  })
  const [analyticsLeads, setAnalyticsLeads] = useState<Lead[]>([])
  const [exportLeads, setExportLeads] = useState<Lead[]>([])
  const [removedAnalyticsLeads, setRemovedAnalyticsLeads] = useState<string[]>([])

  const { data: session } = useSessionData()
  const { data: profile } = useProfileData(session)
  const { data: limits } = useSubscriptionLimits(profile?.subscription_type)
  const leads = useLeadsData(session)

  const handleAddToAnalytics = (lead: Lead) => {
    if (!analyticsLeads.find(l => l.id === lead.id)) {
      setAnalyticsLeads(prev => [...prev, lead])
      // Si le lead était précédemment supprimé, on le retire de la liste des supprimés
      setRemovedAnalyticsLeads(prev => prev.filter(id => id !== lead.id))
      toast({
        title: "Ajout aux analytiques",
        description: "Le lead a été ajouté aux analytiques avec succès"
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

  // Filtrer les leads d'analytics en excluant ceux qui ont été supprimés
  const filteredAnalyticsLeads = analyticsLeads.filter(
    lead => !removedAnalyticsLeads.includes(lead.id)
  )

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
              dailyLeadsLeft={limits.daily_leads_limit - profile.leads_generated_today}
              monthlyLeadsLeft={limits.monthly_leads_limit - profile.leads_generated_this_month}
              totalDailyLeads={limits.daily_leads_limit}
              totalMonthlyLeads={limits.monthly_leads_limit}
              subscriptionType={profile.subscription_type}
            />
          </motion.div>
        )}
        
        <DashboardTabs 
          filters={filters}
          setFilters={setFilters}
          leads={leads}
          analyticsLeads={filteredAnalyticsLeads}
          onAddToAnalytics={handleAddToAnalytics}
          onAddToExport={handleAddToExport}
          exportLeads={exportLeads}
          onRemoveFromExport={(leadId: string) => {
            setRemovedAnalyticsLeads(prev => [...prev, leadId])
            setAnalyticsLeads(prev => prev.filter(lead => lead.id !== leadId))
            toast({
              title: "Lead retiré des analytiques",
              description: "Le lead a été retiré des analytiques avec succès"
            })
          }}
        />
      </div>
    </div>
  )
}