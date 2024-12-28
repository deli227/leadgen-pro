import { Tabs, TabsContent } from "@/components/ui/tabs"
import { motion } from "framer-motion"
import { LeadsAnalytics } from "./LeadsAnalytics"
import { FiltersTabContent } from "./filters/FiltersTabContent"
import { ExportTabContent } from "./filters/ExportTabContent"
import { SearchTabContent } from "./filters/SearchTabContent"
import { TabsHeader } from "./filters/TabsHeader"
import { Lead } from "@/types/leads"

interface LeadsFiltersProps {
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
  onRemoveFromExport: (leadId: string) => void
  onRemoveFromAnalytics: (leadId: string) => void
  onLocalRemove?: (leadId: string) => void
}

export function LeadsFilters({ 
  filters, 
  setFilters, 
  leads,
  analyticsLeads,
  onAddToAnalytics,
  onAddToExport,
  exportLeads,
  onRemoveFromExport,
  onRemoveFromAnalytics,
  onLocalRemove
}: LeadsFiltersProps) {
  return (
    <Tabs defaultValue="filters" className="w-full">
      <TabsHeader />

      <TabsContent value="filters">
        <FiltersTabContent 
          filters={filters}
          setFilters={setFilters}
          leads={leads}
          onAddToAnalytics={onAddToAnalytics}
        />
      </TabsContent>

      <TabsContent value="analytics" className="space-y-4 bg-gradient-to-br from-black/80 to-secondary-dark/80 p-8 rounded-b-xl border border-primary/10 shadow-xl">
        <LeadsAnalytics 
          leads={analyticsLeads} 
          onAddToExport={onAddToExport} 
          onLocalRemove={onLocalRemove}
          onRemoveFromAnalytics={onRemoveFromAnalytics}
        />
      </TabsContent>

      <TabsContent value="search" className="space-y-4 bg-gradient-to-br from-black/80 to-secondary-dark/80 p-8 rounded-b-xl border border-primary/10 shadow-xl">
        <SearchTabContent 
          filters={filters}
          setFilters={setFilters}
          onAddToAnalytics={onAddToAnalytics}
        />
      </TabsContent>

      <TabsContent value="export" className="space-y-4 bg-gradient-to-br from-black/80 to-secondary-dark/80 p-8 rounded-b-xl border border-primary/10 shadow-xl">
        <ExportTabContent 
          exportLeads={exportLeads}
          onRemoveFromExport={onRemoveFromExport}
        />
      </TabsContent>
    </Tabs>
  )
}