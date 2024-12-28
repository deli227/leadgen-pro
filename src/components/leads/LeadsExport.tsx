import { useToast } from "@/components/ui/use-toast"
import { Lead } from "@/types/leads"
import { ExportButton } from "./export/ExportButton"
import { exportToPDF } from "./export/PDFExporter"

interface LeadsExportProps {
  leads: Lead[]
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

  const handleExportPDF = async () => {
    if (leads.length === 0) {
      toast({
        variant: "destructive",
        title: "Aucun lead à exporter",
        description: "Ajoutez d'abord des leads à votre liste d'export."
      })
      return
    }

    try {
      const pdf = await exportToPDF(leads)
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
    <ExportButton
      leadsCount={leads.length}
      onExportCSV={exportToCSV}
      onExportJSON={exportToJSON}
      onExportPDF={handleExportPDF}
    />
  )
}