import { Database, Mail } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { LeadsTab } from "@/components/dashboard/tabs/LeadsTab"
import { AutomationTab } from "@/components/dashboard/tabs/AutomationTab"
import { useTranslation } from "react-i18next"
import { Lead } from "@/types/leads"
import { LeadFilters } from "@/types/filters"
import { useIsMobile } from "@/hooks/use-mobile"

interface DashboardTabsProps {
  filters: LeadFilters
  setFilters: (filters: LeadFilters) => void
  leads: Lead[]
  analyticsLeads: Lead[]
  onAddToAnalytics: (lead: Lead) => void
  onAddToExport: (lead: Lead) => void
  exportLeads: Lead[]
  onRemoveFromExport: (leadId: string) => void
  onRemoveFromAnalytics: (leadId: string) => void
}

export function DashboardTabs({
  filters,
  setFilters,
  leads,
  analyticsLeads,
  onAddToAnalytics,
  onAddToExport,
  exportLeads,
  onRemoveFromExport,
  onRemoveFromAnalytics
}: DashboardTabsProps) {
  const { t } = useTranslation()
  const isMobile = useIsMobile()

  return (
    <Tabs defaultValue="leads" className="space-y-2 sm:space-y-4">
      <TabsList className="grid w-full grid-cols-2 bg-black/40 border border-primary/20 rounded-xl overflow-hidden h-auto">
        <TabsTrigger 
          value="leads" 
          className="text-primary-light data-[state=active]:bg-primary/20 text-xs sm:text-base py-2 sm:py-3"
        >
          <Database className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
          {t('common.leads')}
        </TabsTrigger>
        <TabsTrigger 
          value="automation" 
          className="text-primary-light data-[state=active]:bg-primary/20 relative text-xs sm:text-base py-2 sm:py-3"
        >
          <Mail className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
          <div className="flex flex-col sm:flex-row items-center gap-0.5 sm:gap-2">
            <span>{t('common.automation')}</span>
            <span className="text-[8px] sm:text-xs text-primary-light/80 absolute -bottom-3 sm:static whitespace-nowrap">
              ({t('common.comingSoon')})
            </span>
          </div>
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
          onRemoveFromAnalytics={onRemoveFromAnalytics}
        />
      </TabsContent>

      <TabsContent value="automation">
        <AutomationTab />
      </TabsContent>
    </Tabs>
  )
}