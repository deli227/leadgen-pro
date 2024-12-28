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

  const exportToPDF = () => {
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
      
      // Configuration de la police et des couleurs
      pdf.setFont("helvetica", "bold")
      pdf.setTextColor(155, 135, 245) // Couleur primary (#9b87f5)
      
      // Titre principal
      pdf.setFontSize(24)
      pdf.text("LeadGen Pro", 105, 20, { align: "center" })
      
      // Sous-titre avec la date
      pdf.setFontSize(14)
      pdf.setTextColor(110, 89, 165) // Couleur secondary (#6E59A5)
      const date = new Date().toLocaleDateString('fr-FR', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
      })
      pdf.text(`Liste des Leads - ${date}`, 105, 30, { align: "center" })
      
      // Ligne de séparation
      pdf.setDrawColor(155, 135, 245)
      pdf.line(20, 35, 190, 35)
      
      // En-têtes du tableau
      pdf.setFontSize(12)
      pdf.setFont("helvetica", "bold")
      const headers = ["Entreprise", "Email", "Téléphone", "Score", "Secteur"]
      const columnWidth = 35
      const startY = 45
      
      headers.forEach((header, index) => {
        pdf.text(header, 20 + (index * columnWidth), startY)
      })
      
      // Contenu du tableau
      pdf.setFont("helvetica", "normal")
      pdf.setTextColor(60, 60, 60)
      pdf.setFontSize(10)
      
      leads.forEach((lead, index) => {
        const y = startY + 10 + (index * 8)
        
        // Fonction pour tronquer le texte si nécessaire
        const truncateText = (text: string, maxLength: number) => {
          if (!text) return ''
          return text.length > maxLength ? text.substring(0, maxLength) + '...' : text
        }
        
        // Données du lead avec troncature
        const row = [
          truncateText(lead.company, 15),
          truncateText(lead.email, 20),
          truncateText(lead.phone, 15),
          lead.score?.toString() || 'N/A',
          truncateText(lead.industry, 15)
        ]
        
        row.forEach((text, colIndex) => {
          pdf.text(text, 20 + (colIndex * columnWidth), y)
        })
      })
      
      // Pied de page
      const pageHeight = pdf.internal.pageSize.height
      pdf.setFontSize(8)
      pdf.setTextColor(110, 89, 165)
      pdf.text(`Document généré le ${date}`, 105, pageHeight - 10, { align: "center" })
      
      // Sauvegarde du PDF
      pdf.save("leads.pdf")
      
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