import { useState } from "react"
import { LeadFilters } from "@/types/filters"
import { Lead } from "@/types/leads"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { FiltersTabContent } from "./filters/FiltersTabContent"
import { SearchTabContent } from "./filters/SearchTabContent"
import { ExportTabContent } from "./filters/ExportTabContent"
import { TabsHeader } from "./filters/TabsHeader"
import { useToast } from "@/hooks/use-toast"
import { useNavigate } from "react-router-dom"

interface LeadsFiltersProps {
  filters: LeadFilters
  setFilters: (filters: LeadFilters) => void
  leads: Lead[]
  analyticsLeads: Lead[]
  onAddToAnalytics: (lead: Lead) => void
  onAddToExport: (lead: Lead) => void
  exportLeads: Lead[]
  onRemoveFromExport: (leadId: string) => void
  onRemoveFromAnalytics: (leadId: string) => void
  onLocalRemove: (leadId: string) => void
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
  const [activeTab, setActiveTab] = useState("filters")
  const { toast } = useToast()
  const navigate = useNavigate()

  const handleError = (error: any) => {
    if (error.limitReached) {
      toast({
        variant: "destructive",
        title: "Limite de leads atteinte",
        description: "Vous avez atteint votre limite mensuelle de leads. Passez à un plan supérieur pour continuer à générer des leads.",
      })
      navigate("/#pricing-section")
    } else {
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Une erreur est survenue lors de la génération des leads.",
      })
    }
  }

  return (
    <Tabs
      defaultValue="filters"
      value={activeTab}
      onValueChange={setActiveTab}
      className="w-full"
    >
      <TabsHeader activeTab={activeTab} />
      
      <TabsList className="grid w-full grid-cols-3 mb-8">
        <TabsTrigger value="filters">Filtres</TabsTrigger>
        <TabsTrigger value="search">Recherche</TabsTrigger>
        <TabsTrigger value="export">Export</TabsTrigger>
      </TabsList>

      <TabsContent value="filters" className="mt-0">
        <FiltersTabContent
          filters={filters}
          setFilters={setFilters}
          leads={leads}
          onAddToAnalytics={onAddToAnalytics}
          onAddToExport={onAddToExport}
          onLocalRemove={onLocalRemove}
          onError={handleError}
        />
      </TabsContent>

      <TabsContent value="search" className="mt-0">
        <SearchTabContent
          leads={leads}
          onAddToAnalytics={onAddToAnalytics}
          onAddToExport={onAddToExport}
          onLocalRemove={onLocalRemove}
          onError={handleError}
        />
      </TabsContent>

      <TabsContent value="export" className="mt-0">
        <ExportTabContent
          exportLeads={exportLeads}
          onRemoveFromExport={onRemoveFromExport}
        />
      </TabsContent>
    </Tabs>
  )
}