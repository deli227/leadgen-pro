import { useState } from "react"
import { LeadsFilters } from "@/components/leads/LeadsFilters"
import { LeadsStats } from "@/components/leads/LeadsStats"
import { DashboardHeader } from "@/components/dashboard/DashboardHeader"
import { useSessionData } from "@/hooks/useSessionData"
import { useProfileData } from "@/hooks/useProfileData"
import { useSubscriptionLimits } from "@/hooks/useSubscriptionLimits"
import { useLeadsData } from "@/hooks/useLeadsData"
import { useToast } from "@/hooks/use-toast"
import { Lead } from "@/types/leads"

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

  const { data: session } = useSessionData()
  const { data: profile } = useProfileData(session)
  const { data: limits } = useSubscriptionLimits(profile?.subscription_type)
  const leads = useLeadsData(session)

  const handleAddToAnalytics = (lead: Lead) => {
    if (!analyticsLeads.find(l => l.id === lead.id)) {
      setAnalyticsLeads(prev => [...prev, lead])
      toast({
        title: "Lead ajouté aux analytiques",
        description: "Le lead a été ajouté avec succès à la section analytiques."
      })
    }
  }

  const handleAddToExport = (lead: Lead) => {
    if (!exportLeads.find(l => l.id === lead.id)) {
      setExportLeads(prev => [...prev, lead])
      toast({
        title: "Lead ajouté à l'export",
        description: "Le lead a été ajouté avec succès à la liste d'export."
      })
    }
  }

  const handleRemoveFromExport = (leadId: number) => {
    setExportLeads(prev => prev.filter(lead => lead.id !== leadId))
    toast({
      title: "Lead retiré de l'export",
      description: "Le lead a été retiré avec succès de la liste d'export."
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-secondary-dark via-[#1A1F2C] to-black">
      <div className="container mx-auto py-8 px-4 animate-fade-in">
        <DashboardHeader exportLeads={exportLeads} />

        {profile && limits && (
          <div className="mb-8 animate-fade-up">
            <LeadsStats
              dailyLeadsLeft={limits.daily_leads_limit - profile.leads_generated_today}
              monthlyLeadsLeft={limits.monthly_leads_limit - profile.leads_generated_this_month}
              totalDailyLeads={limits.daily_leads_limit}
              totalMonthlyLeads={limits.monthly_leads_limit}
              subscriptionType={profile.subscription_type}
            />
          </div>
        )}
        
        <div className="grid gap-8 animate-fade-up" style={{ animationDelay: "0.2s" }}>
          <LeadsFilters 
            filters={filters} 
            setFilters={setFilters} 
            leads={leads}
            analyticsLeads={analyticsLeads}
            onAddToAnalytics={handleAddToAnalytics}
            onAddToExport={handleAddToExport}
            exportLeads={exportLeads}
            onRemoveFromExport={handleRemoveFromExport}
          />
        </div>
      </div>
    </div>
  )
}