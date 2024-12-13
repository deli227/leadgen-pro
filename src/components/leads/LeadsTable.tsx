import { useState } from "react"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { MapPin, Star } from "lucide-react"
import { LeadsTableActions } from "./LeadsTableActions"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { useToast } from "@/components/ui/use-toast"
import { LeadNotes } from "./LeadNotes"

interface Lead {
  id: number
  company: string
  email: string
  phone: string
  address?: string
  qualification: number
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
  const [showNotes, setShowNotes] = useState(false)
  const [exportList, setExportList] = useState<number[]>([])
  const { toast } = useToast()

  const handleAddToExport = (leadId: number) => {
    if (!exportList.includes(leadId)) {
      setExportList([...exportList, leadId])
      toast({
        title: "Lead ajouté à la liste d'export",
        description: "Le lead a été ajouté avec succès à votre liste d'export."
      })
    }
  }

  const filteredLeads = leads.filter(lead => {
    const matchesSearch = lead.company.toLowerCase().includes(filters.search.toLowerCase()) ||
      lead.email.toLowerCase().includes(filters.search.toLowerCase())
    const matchesIndustry = filters.industry === "all" || lead.industry === filters.industry
    const matchesCountry = filters.country === "all"
    const matchesCity = filters.city === "all"

    return matchesSearch && matchesIndustry && matchesCountry && matchesCity
  }).slice(0, filters.leadCount)

  return (
    <div className="space-y-4">
      <Table>
        <TableHeader>
          <TableRow className="border-primary/10 hover:bg-transparent">
            <TableHead className="text-xs text-primary-light/70 font-medium">Entreprise</TableHead>
            <TableHead className="text-xs text-primary-light/70 font-medium">Contact</TableHead>
            <TableHead className="text-xs text-primary-light/70 font-medium">Réseaux Sociaux</TableHead>
            <TableHead className="text-xs text-primary-light/70 font-medium">Score</TableHead>
            <TableHead className="text-xs text-primary-light/70 font-medium">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredLeads.map((lead) => (
            <TableRow key={lead.id} className="border-primary/5 hover:bg-black/20 transition-colors duration-200">
              <TableCell className="py-2">
                <span className="font-medium text-sm text-primary-light">{lead.company}</span>
              </TableCell>
              <TableCell className="py-2">
                <div className="space-y-0.5">
                  <div className="text-sm text-primary-light">{lead.email}</div>
                  <div className="text-xs text-primary-light/70">{lead.phone}</div>
                </div>
              </TableCell>
              <TableCell className="py-2">
                <div className="flex items-center gap-2">
                  {lead.socialMedia.linkedin && (
                    <a href={lead.socialMedia.linkedin} target="_blank" rel="noopener noreferrer" 
                       className="text-primary-light/70 hover:text-primary-light">
                      LinkedIn
                    </a>
                  )}
                  {lead.socialMedia.twitter && (
                    <a href={lead.socialMedia.twitter} target="_blank" rel="noopener noreferrer"
                       className="text-primary-light/70 hover:text-primary-light">
                      Twitter
                    </a>
                  )}
                </div>
              </TableCell>
              <TableCell className="py-2">
                <div className="flex items-center gap-1">
                  <div className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-xs">
                    Score: {lead.score}/10
                  </div>
                  {lead.qualification >= 7 && (
                    <div className="px-2 py-0.5 rounded-full bg-primary/20 text-primary-light text-xs">
                      Qualifié
                    </div>
                  )}
                </div>
              </TableCell>
              <TableCell className="py-2">
                <LeadsTableActions
                  lead={lead}
                  onShowDetails={setSelectedLead}
                  onShowNotes={(lead) => {
                    setSelectedLead(lead)
                    setShowNotes(true)
                  }}
                  onAddToExport={handleAddToExport}
                  exportList={exportList}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Dialog open={showNotes} onOpenChange={setShowNotes}>
        <DialogContent className="bg-secondary-dark border-primary-light backdrop-blur-lg bg-opacity-95">
          {selectedLead && (
            <LeadNotes
              lead={selectedLead}
              onClose={() => {
                setShowNotes(false)
                toast({
                  title: "Note enregistrée",
                  description: "Votre note a été sauvegardée avec succès.",
                })
              }}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}