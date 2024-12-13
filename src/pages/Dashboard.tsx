import { useState } from "react"
import { LeadsTable } from "@/components/leads/LeadsTable"
import { LeadsFilters } from "@/components/leads/LeadsFilters"
import { LeadsExport } from "@/components/leads/LeadsExport"
import { ScrollArea } from "@/components/ui/scroll-area"

export function Dashboard() {
  const [filters, setFilters] = useState({
    search: "",
    minScore: 0,
    maxScore: 10,
    industry: "all",
    country: "all",
    city: "all"
  })

  // Données mockées pour la démo
  const leads = [
    {
      id: 1,
      company: "TechCorp",
      email: "contact@techcorp.com",
      phone: "+33 1 23 45 67 89",
      socialMedia: {
        linkedin: "techcorp",
        twitter: "@techcorp"
      },
      score: 8.5,
      industry: "Technology",
      strengths: ["Innovation", "Market presence"],
      weaknesses: ["Customer support"]
    },
    {
      id: 2,
      company: "EcoSolutions",
      email: "info@ecosolutions.fr",
      phone: "+33 1 98 76 54 32",
      socialMedia: {
        linkedin: "ecosolutions",
        twitter: "@ecosolutions"
      },
      score: 7.2,
      industry: "Environmental",
      strengths: ["Sustainability", "Brand recognition"],
      weaknesses: ["Limited product range"]
    }
  ]

  return (
    <div className="min-h-screen bg-secondary-dark">
      <div className="container mx-auto py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-primary-light">Tableau de bord des leads</h1>
          <LeadsExport leads={leads} />
        </div>
        
        <div className="grid gap-8">
          <LeadsFilters filters={filters} setFilters={setFilters} />
          <ScrollArea className="h-[600px] rounded-md border border-primary-light bg-black">
            <LeadsTable leads={leads} filters={filters} />
          </ScrollArea>
        </div>
      </div>
    </div>
  )
}