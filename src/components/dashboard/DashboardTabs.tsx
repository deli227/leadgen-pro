import { Database } from "lucide-react"
import { PieChart } from "lucide-react"
import { Mail } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { LeadsTab } from "./tabs/LeadsTab"
import { AnalyticsTab } from "./tabs/AnalyticsTab"
import { AutomationTab } from "./tabs/AutomationTab"
import { useTranslation } from "react-i18next"
import { Lead } from "@/types/leads"

interface DashboardTabsProps {
  filters: {
    search: string
    leadCount: number
    industry: string
    country: string
    city: string
  }
  setFilters: (filters: any) => void
  leads: Lead[]
  analyticsLeads: Lead[]
  onAddToAnalytics: (lead: Lead) => void
  onAddToExport: (lead: Lead) => void
  exportLeads: Lead[]
  onRemoveFromExport: (leadId: number) => void
}

export function DashboardTabs({
  filters,
  setFilters,
  leads,
  analyticsLeads,
  onAddToAnalytics,
  onAddToExport,
  exportLeads,
  onRemoveFromExport
}: DashboardTabsProps) {
  const { t } = useTranslation()

  return (
    <Tabs defaultValue="leads" className="space-y-4">
      <TabsList className="grid w-full grid-cols-3 bg-black/40 border border-primary/20 rounded-xl overflow-hidden">
        <TabsTrigger 
          value="leads" 
          className="text-primary-light data-[state=active]:bg-primary/20"
        >
          <Database className="h-4 w-4 mr-2" />
          {t('common.leads')}
        </TabsTrigger>
        <TabsTrigger 
          value="analytics" 
          className="text-primary-light data-[state=active]:bg-primary/20"
        >
          <PieChart className="h-4 w-4 mr-2" />
          {t('common.analytics')}
        </TabsTrigger>
        <TabsTrigger 
          value="automation" 
          className="text-primary-light data-[state=active]:bg-primary/20"
        >
          <Mail className="h-4 w-4 mr-2" />
          {t('common.automation')} <span className="text-xs text-primary-light/50">{t('common.comingSoon')}</span>
        </TabsTrigger>
      </TabsList>

      <TabsContent value="leads">
        <LeadsTab 
          filters={filters}
          setFilters={setFilters}
          leads={leads}
          analyticsLeads={analyticsLeads}
          onAddToAnalytics={onAddToAnalytics}
          onAddToExport={onAddToExport}
          exportLeads={exportLeads}
          onRemoveFromExport={onRemoveFromExport}
        />
      </TabsContent>

      <TabsContent value="analytics">
        <AnalyticsTab 
          filters={filters}
          setFilters={setFilters}
          analyticsLeads={analyticsLeads}
          onAddToAnalytics={onAddToAnalytics}
          onAddToExport={onAddToExport}
          exportLeads={exportLeads}
          onRemoveFromExport={onRemoveFromExport}
        />
      </TabsContent>

      <TabsContent value="automation">
        <AutomationTab />
      </TabsContent>
    </Tabs>
  )
}