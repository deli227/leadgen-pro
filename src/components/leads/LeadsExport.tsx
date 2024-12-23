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
      
      // Add title
      pdf.setFontSize(16)
      pdf.text("Liste des Leads", 14, 15)
      
      // Add headers
      pdf.setFontSize(12)
      const headers = ["Entreprise", "Email", "Téléphone", "Score", "Secteur"]
      pdf.text(headers.join("   "), 14, 25)
      
      // Add content
      pdf.setFontSize(10)
      leads.forEach((lead, index) => {
        const y = 35 + (index * 10)
        const row = [
          lead.company,
          lead.email,
          lead.phone,
          lead.score,
          lead.industry
        ]
        pdf.text(row.join("   "), 14, y)
      })
      
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