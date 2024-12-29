import { useExportData } from "./export/useExportData"
import { ExportButton } from "./export/ExportButton"
import jsPDF from 'jspdf'
import { Lead } from "@/types/leads"

interface LeadsExportProps {
  leads: Lead[]
}

export function LeadsExport({ leads }: LeadsExportProps) {
  const { enrichedLeads, toast } = useExportData(leads)

  const exportToCSV = () => {
    if (leads.length === 0) {
      toast({
        variant: "destructive",
        title: "Aucun lead à exporter",
        description: "Ajoutez d'abord des leads à votre liste d'export."
      })
      return
    }

    const headers = ["Entreprise", "Email", "Téléphone", "Score", "Secteur", "Notes", "Tags"]
    const csvContent = [
      headers.join(","),
      ...enrichedLeads.map(lead => 
        [
          lead.company,
          lead.email,
          lead.phone,
          lead.score,
          lead.industry,
          lead.notes?.map(n => n.content).join("; "),
          lead.tags?.map(t => t.name).join("; ")
        ].join(",")
      )
    ].join("\n")

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })
    const link = document.createElement("a")
    link.href = URL.createObjectURL(blob)
    link.setAttribute("download", "leads.csv")
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    
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

    const jsonContent = JSON.stringify(enrichedLeads, null, 2)
    const blob = new Blob([jsonContent], { type: "application/json" })
    const link = document.createElement("a")
    link.href = URL.createObjectURL(blob)
    link.setAttribute("download", "leads.json")
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    
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
      pdf.setTextColor(155, 135, 245)
      
      // Titre principal
      pdf.setFontSize(24)
      pdf.text("LeadGen Pro", 105, 20, { align: "center" })
      
      // Sous-titre avec la date
      pdf.setFontSize(14)
      pdf.setTextColor(110, 89, 165)
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
      const headers = ["Entreprise", "Email", "Téléphone", "Score", "Secteur", "Notes", "Tags"]
      const columnWidth = 25
      const startY = 45
      
      headers.forEach((header, index) => {
        pdf.text(header, 20 + (index * columnWidth), startY)
      })
      
      // Contenu du tableau
      pdf.setFont("helvetica", "normal")
      pdf.setTextColor(60, 60, 60)
      pdf.setFontSize(10)
      
      enrichedLeads.forEach((lead, index) => {
        const y = startY + 10 + (index * 8)
        
        const truncateText = (text: string, maxLength: number) => {
          if (!text) return ''
          return text.length > maxLength ? text.substring(0, maxLength) + '...' : text
        }
        
        const row = [
          truncateText(lead.company, 15),
          truncateText(lead.email || '', 20),
          truncateText(lead.phone || '', 15),
          lead.score?.toString() || 'N/A',
          truncateText(lead.industry || '', 15),
          truncateText(lead.notes?.map(n => n.content).join("; ") || '', 20),
          truncateText(lead.tags?.map(t => t.name).join(", ") || '', 20)
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

  return (
    <ExportButton 
      leads={leads}
      onExportCSV={exportToCSV}
      onExportJSON={exportToJSON}
      onExportPDF={exportToPDF}
    />
  )
}