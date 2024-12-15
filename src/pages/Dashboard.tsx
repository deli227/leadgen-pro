import { useState } from "react"
import { LeadsFilters } from "@/components/leads/LeadsFilters"
import { LeadsStats } from "@/components/leads/LeadsStats"
import { DashboardHeader } from "@/components/dashboard/DashboardHeader"
import { EmailAutomationTab } from "@/components/email/EmailAutomationTab"
import { useSessionData } from "@/hooks/useSessionData"
import { useProfileData } from "@/hooks/useProfileData"
import { useSubscriptionLimits } from "@/hooks/useSubscriptionLimits"
import { useLeadsData } from "@/hooks/useLeadsData"
import { useToast } from "@/hooks/use-toast"
import { Lead } from "@/types/leads"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { motion } from "framer-motion"
import { Database, Mail, PieChart } from "lucide-react"

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
        
        <Tabs defaultValue="leads" className="space-y-4">
          <TabsList className="grid w-full grid-cols-3 bg-black/40 border border-primary/20 rounded-xl overflow-hidden">
            <TabsTrigger 
              value="leads" 
              className="data-[state=active]:bg-primary/20 data-[state=active]:text-primary-light"
            >
              <Database className="h-4 w-4 mr-2" />
              Leads
            </TabsTrigger>
            <TabsTrigger 
              value="analytics" 
              className="data-[state=active]:bg-primary/20 data-[state=active]:text-primary-light"
            >
              <PieChart className="h-4 w-4 mr-2" />
              Analytiques
            </TabsTrigger>
            <TabsTrigger 
              value="automation" 
              className="data-[state=active]:bg-primary/20 data-[state=active]:text-primary-light"
            >
              <Mail className="h-4 w-4 mr-2" />
              Automatisation
            </TabsTrigger>
          </TabsList>

          <TabsContent value="leads">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
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
            </motion.div>
          </TabsContent>

          <TabsContent value="analytics">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <LeadsFilters 
                filters={filters} 
                setFilters={setFilters} 
                leads={analyticsLeads}
                analyticsLeads={analyticsLeads}
                onAddToAnalytics={handleAddToAnalytics}
                onAddToExport={handleAddToExport}
                exportLeads={exportLeads}
                onRemoveFromExport={handleRemoveFromExport}
              />
            </motion.div>
          </TabsContent>

          <TabsContent value="automation">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <EmailAutomationTab />
            </motion.div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}