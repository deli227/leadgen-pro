import { Download } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"
import jsPDF from 'jspdf'
import { supabase } from "@/integrations/supabase/client"

interface LeadsExportProps {
  leads: any[]
}

export function LeadsExport({ leads }: LeadsExportProps) {
  const { toast } = useToast()

  const exportToCSV = () => {
    if (leads.length === 0) {
      toast({
        variant: "destructive",
        title: "Aucun lead à exporter",
        description: "Ajoutez d'abord des leads à votre liste d'export."
      })
      return
    }

    const headers = ["Entreprise", "Email", "Téléphone", "Score", "Secteur"]
    const csvContent = [
      headers.join(","),
      ...leads.map(lead => 
        [
          lead.company,
          lead.email,
          lead.phone,
          lead.score,
          lead.industry
        ].join(",")
      )
    ].join("\n")

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })
    downloadFile(blob, "leads.csv")
    
    toast({
      title: "Export réussi",
      description: `${leads.length} leads ont été exportés au format CSV`
    })
  }

  const exportToJSON = () => {
    if (leads.length === 0) {
      toast({
        variant: "destructive",
        title: "Aucun lead à exporter",
        description: "Ajoutez d'abord des leads à votre liste d'export."
      })
      return
    }

    const jsonContent = JSON.stringify(leads, null, 2)
    const blob = new Blob([jsonContent], { type: "application/json" })
    downloadFile(blob, "leads.json")
    
    toast({
      title: "Export réussi",
      description: `${leads.length} leads ont été exportés au format JSON`
    })
  }

  const exportToPDF = async () => {
    if (leads.length === 0) {
      toast({
        variant: "destructive",
        title: "Aucun lead à exporter",
        description: "Ajoutez d'abord des leads à votre liste d'export."
      })
      return
    }

    try {
      const pdf = new jsPDF()
      let yPosition = 15
      const pageHeight = pdf.internal.pageSize.height
      
      for (const lead of leads) {
        // En-tête du lead avec le logo et les informations principales
        pdf.setFontSize(20)
        pdf.setTextColor(66, 66, 66)
        pdf.text(lead.company, 14, yPosition)
        yPosition += 10

        // Informations de contact
        pdf.setFontSize(12)
        pdf.setTextColor(100, 100, 100)
        if (lead.email) {
          pdf.text(`Email: ${lead.email}`, 14, yPosition)
          yPosition += 7
        }
        if (lead.phone) {
          pdf.text(`Téléphone: ${lead.phone}`, 14, yPosition)
          yPosition += 7
        }
        if (lead.address) {
          pdf.text(`Adresse: ${lead.address}`, 14, yPosition)
          yPosition += 7
        }
        if (lead.website) {
          pdf.text(`Site web: ${lead.website}`, 14, yPosition)
          yPosition += 7
        }

        // Score et industrie
        pdf.setFontSize(14)
        pdf.setTextColor(155, 135, 245) // Couleur primary
        pdf.text(`Score: ${lead.score}/10`, 14, yPosition)
        yPosition += 7
        pdf.text(`Secteur: ${lead.industry}`, 14, yPosition)
        yPosition += 10

        // Réseaux sociaux
        if (lead.socialMedia) {
          pdf.setFontSize(14)
          pdf.setTextColor(66, 66, 66)
          pdf.text("Réseaux sociaux", 14, yPosition)
          yPosition += 7
          pdf.setFontSize(12)
          pdf.setTextColor(100, 100, 100)
          
          Object.entries(lead.socialMedia).forEach(([platform, url]) => {
            if (url) {
              pdf.text(`${platform}: ${url}`, 14, yPosition)
              yPosition += 7
            }
          })
          yPosition += 3
        }

        // Récupérer l'analyse IA si elle existe
        const { data: analysis } = await supabase
          .from('lead_analyses')
          .select('*')
          .eq('lead_id', lead.id)
          .single()

        if (analysis) {
          // Nouvelle page pour l'analyse IA
          pdf.addPage()
          yPosition = 15

          pdf.setFontSize(18)
          pdf.setTextColor(66, 66, 66)
          pdf.text("Analyse IA", 14, yPosition)
          yPosition += 10

          // Analyse de l'entreprise
          if (analysis.company_analysis) {
            pdf.setFontSize(14)
            pdf.setTextColor(155, 135, 245)
            pdf.text("Analyse de l'entreprise", 14, yPosition)
            yPosition += 7
            
            pdf.setFontSize(12)
            pdf.setTextColor(100, 100, 100)
            Object.entries(analysis.company_analysis).forEach(([key, value]) => {
              if (value && yPosition < pageHeight - 20) {
                pdf.text(`${key}: ${value}`, 14, yPosition)
                yPosition += 7
              }
            })
            yPosition += 5
          }

          // Analyse technologique
          if (analysis.tech_analysis) {
            if (yPosition > pageHeight - 40) {
              pdf.addPage()
              yPosition = 15
            }
            
            pdf.setFontSize(14)
            pdf.setTextColor(155, 135, 245)
            pdf.text("Analyse technologique", 14, yPosition)
            yPosition += 7
            
            pdf.setFontSize(12)
            pdf.setTextColor(100, 100, 100)
            Object.entries(analysis.tech_analysis).forEach(([key, value]) => {
              if (value && yPosition < pageHeight - 20) {
                if (Array.isArray(value)) {
                  pdf.text(`${key}: ${value.join(", ")}`, 14, yPosition)
                } else {
                  pdf.text(`${key}: ${value}`, 14, yPosition)
                }
                yPosition += 7
              }
            })
            yPosition += 5
          }

          // Plan d'action
          if (analysis.action_plan) {
            if (yPosition > pageHeight - 40) {
              pdf.addPage()
              yPosition = 15
            }
            
            pdf.setFontSize(14)
            pdf.setTextColor(155, 135, 245)
            pdf.text("Plan d'action", 14, yPosition)
            yPosition += 7
            
            pdf.setFontSize(12)
            pdf.setTextColor(100, 100, 100)
            if (analysis.action_plan.steps) {
              pdf.text("Étapes :", 14, yPosition)
              yPosition += 7
              analysis.action_plan.steps.forEach((step: string) => {
                if (yPosition < pageHeight - 20) {
                  pdf.text(`• ${step}`, 20, yPosition)
                  yPosition += 7
                }
              })
            }
          }
        }

        // Ajouter une nouvelle page pour le prochain lead
        if (lead !== leads[leads.length - 1]) {
          pdf.addPage()
          yPosition = 15
        }
      }

      pdf.save("leads-export.pdf")
      
      toast({
        title: "Export réussi",
        description: `${leads.length} leads ont été exportés au format PDF`
      })
    } catch (error) {
      console.error("Erreur d'export PDF:", error)
      toast({
        variant: "destructive",
        title: "Erreur d'export",
        description: "Impossible d'exporter en PDF pour le moment"
      })
    }
  }

  const downloadFile = (blob: Blob, filename: string) => {
    const link = document.createElement("a")
    link.href = URL.createObjectURL(blob)
    link.setAttribute("download", filename)
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="outline" 
          className="bg-gradient-to-r from-primary/20 to-primary-dark/20 text-primary-light border-primary-light/20 hover:bg-primary/30 hover:text-white transition-all duration-300"
          disabled={leads.length === 0}
        >
          <Download className="h-4 w-4 mr-2" />
          Exporter ({leads.length})
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="bg-secondary-dark border-primary-light">
        <DropdownMenuItem 
          onClick={exportToCSV}
          className="text-primary-light hover:bg-primary/20 cursor-pointer"
        >
          Export CSV
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={exportToJSON}
          className="text-primary-light hover:bg-primary/20 cursor-pointer"
        >
          Export JSON
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={exportToPDF}
          className="text-primary-light hover:bg-primary/20 cursor-pointer"
        >
          Export PDF
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}