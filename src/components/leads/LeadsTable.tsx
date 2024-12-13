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
    leadCount: number
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
    const matchesIndustry = filters.industry === "all" || lead.industry === filters.industry
    const matchesCountry = filters.country === "all"
    const matchesCity = filters.city === "all"

    return matchesSearch && matchesIndustry && matchesCountry && matchesCity
  }).slice(0, filters.leadCount)

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow className="border-primary-light">
            <TableHead className="text-primary-light">Entreprise</TableHead>
            <TableHead className="text-primary-light">Contact</TableHead>
            <TableHead className="text-primary-light">Score IA</TableHead>
            <TableHead className="text-primary-light">Secteur</TableHead>
            <TableHead className="text-primary-light">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredLeads.map((lead) => (
            <TableRow key={lead.id} className="border-primary-light/20 hover:bg-secondary-dark/50">
              <TableCell className="font-medium text-primary-light">{lead.company}</TableCell>
              <TableCell>
                <div className="space-y-1">
                  <div className="text-primary-light">{lead.email}</div>
                  <div className="text-sm text-primary-light/70">{lead.phone}</div>
                </div>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                  <span className="text-primary-light">{lead.score.toFixed(1)}</span>
                </div>
              </TableCell>
              <TableCell className="text-primary-light">{lead.industry}</TableCell>
              <TableCell>
                <div className="flex gap-2">
                  <Dialog>
                    <DialogTrigger asChild>
                      <button
                        onClick={() => setSelectedLead(lead)}
                        className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-primary-light bg-transparent text-primary-light hover:bg-primary-light/10 h-10 px-4 py-2"
                      >
                        <Eye className="h-4 w-4 mr-2" />
                        Détails
                      </button>
                    </DialogTrigger>
                    <DialogContent className="bg-secondary-dark border-primary-light">
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
                    className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-primary-light bg-transparent text-primary-light hover:bg-primary-light/10 h-10 px-4 py-2"
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
