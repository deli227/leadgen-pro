import { useState } from "react"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { LineChart, Star, Eye } from "lucide-react"
import { LeadDetails } from "./LeadDetails"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"

interface Lead {
  id: number
  company: string
  email: string
  phone: string
  socialMedia: {
    linkedin: string
    twitter: string
  }
  score: number
  industry: string
  strengths: string[]
  weaknesses: string[]
}

interface LeadsTableProps {
  leads: Lead[]
  filters: {
    search: string
    minScore: number
    maxScore: number
    industry: string
    country: string
    city: string
  }
}

export function LeadsTable({ leads, filters }: LeadsTableProps) {
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null)

  const filteredLeads = leads.filter(lead => {
    const matchesSearch = lead.company.toLowerCase().includes(filters.search.toLowerCase()) ||
      lead.email.toLowerCase().includes(filters.search.toLowerCase())
    const matchesScore = lead.score >= filters.minScore && lead.score <= filters.maxScore
    const matchesIndustry = filters.industry === "all" || lead.industry === filters.industry
    // Note: country and city filters are prepared for future implementation
    const matchesCountry = filters.country === "all" // To be implemented with real data
    const matchesCity = filters.city === "all" // To be implemented with real data

    return matchesSearch && matchesScore && matchesIndustry && matchesCountry && matchesCity
  })

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Entreprise</TableHead>
            <TableHead>Contact</TableHead>
            <TableHead>Score IA</TableHead>
            <TableHead>Secteur</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredLeads.map((lead) => (
            <TableRow key={lead.id}>
              <TableCell className="font-medium">{lead.company}</TableCell>
              <TableCell>
                <div className="space-y-1">
                  <div>{lead.email}</div>
                  <div className="text-sm text-muted-foreground">{lead.phone}</div>
                </div>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                  <span>{lead.score.toFixed(1)}</span>
                </div>
              </TableCell>
              <TableCell>{lead.industry}</TableCell>
              <TableCell>
                <div className="flex gap-2">
                  <Dialog>
                    <DialogTrigger asChild>
                      <button
                        onClick={() => setSelectedLead(lead)}
                        className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2"
                      >
                        <Eye className="h-4 w-4 mr-2" />
                        Détails
                      </button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl">
                      {selectedLead && (
                        <LeadDetails 
                          lead={selectedLead} 
                          onClose={() => setSelectedLead(null)} 
                        />
                      )}
                    </DialogContent>
                  </Dialog>
                  
                  <button
                    onClick={() => console.log("Voir analyse", lead.id)}
                    className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2"
                  >
                    <LineChart className="h-4 w-4 mr-2" />
                    Analyse
                  </button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  )
}