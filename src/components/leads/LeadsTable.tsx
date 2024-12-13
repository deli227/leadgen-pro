import { useState } from "react"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { LineChart, Eye, NotebookPen, MapPin, Star, PlusCircle } from "lucide-react"
import { LeadDetails } from "./LeadDetails"
import { LeadNotes } from "./LeadNotes"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { useToast } from "@/components/ui/use-toast"
import { Button } from "@/components/ui/button"

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
    <>
      <Table>
        <TableHeader>
          <TableRow className="border-primary-light">
            <TableHead className="text-primary-light">Entreprise</TableHead>
            <TableHead className="text-primary-light">Contact</TableHead>
            <TableHead className="text-primary-light">Adresse</TableHead>
            <TableHead className="text-primary-light">Qualification</TableHead>
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
              <TableCell className="text-primary-light">
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-primary-light/70" />
                  {lead.address || "Non spécifiée"}
                </div>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-1 text-primary-light">
                  <Star className="h-4 w-4 text-primary" fill="currentColor" />
                  <span>{lead.qualification}/10</span>
                </div>
              </TableCell>
              <TableCell className="text-primary-light">{lead.industry}</TableCell>
              <TableCell>
                <div className="flex gap-2">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button
                        onClick={() => setSelectedLead(lead)}
                        variant="outline"
                        size="sm"
                        className="border-primary-light text-primary-light hover:bg-primary-light/10"
                      >
                        <Eye className="h-4 w-4 mr-2" />
                        Détails
                      </Button>
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
                  
                  <Dialog open={showNotes} onOpenChange={setShowNotes}>
                    <DialogTrigger asChild>
                      <Button
                        onClick={() => {
                          setSelectedLead(lead)
                          setShowNotes(true)
                        }}
                        variant="outline"
                        size="sm"
                        className="border-primary-light text-primary-light hover:bg-primary-light/10"
                      >
                        <NotebookPen className="h-4 w-4 mr-2" />
                        Notes
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="bg-secondary-dark border-primary-light">
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
                  
                  <Button
                    onClick={() => handleAddToExport(lead.id)}
                    variant="outline"
                    size="sm"
                    className="border-primary-light text-primary-light hover:bg-primary-light/10"
                    disabled={exportList.includes(lead.id)}
                  >
                    <PlusCircle className="h-4 w-4 mr-2" />
                    {exportList.includes(lead.id) ? "Ajouté" : "Exporter"}
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  )
}