import jsPDF from 'jspdf'
import { Lead } from '@/types/leads'

const PRIMARY_COLOR: [number, number, number] = [155, 135, 245] // #9b87f5
const SECONDARY_COLOR: [number, number, number] = [110, 89, 165] // #6E59A5
const TEXT_COLOR: [number, number, number] = [60, 60, 60]

export const truncateText = (text: string | undefined, maxLength: number): string => {
  if (!text) return ''
  return text.length > maxLength ? text.substring(0, maxLength) + '...' : text
}

export const configurePDFStyles = (pdf: jsPDF) => {
  pdf.setFont("helvetica", "bold")
  pdf.setTextColor(...PRIMARY_COLOR)
}

export const addHeader = (pdf: jsPDF, date: string) => {
  // Titre principal
  pdf.setFontSize(24)
  pdf.text("LeadGen Pro", 105, 20, { align: "center" })
  
  // Sous-titre avec la date
  pdf.setFontSize(14)
  pdf.setTextColor(...SECONDARY_COLOR)
  pdf.text(`Liste des Leads - ${date}`, 105, 30, { align: "center" })
  
  // Ligne de séparation
  pdf.setDrawColor(...PRIMARY_COLOR)
  pdf.line(20, 35, 190, 35)
}

export const addTableHeaders = (pdf: jsPDF, startY: number) => {
  pdf.setFontSize(12)
  pdf.setFont("helvetica", "bold")
  const headers = ["Entreprise", "Email", "Téléphone", "Score", "Secteur"]
  const columnWidth = 35
  
  headers.forEach((header, index) => {
    pdf.text(header, 20 + (index * columnWidth), startY)
  })
  
  return { headers, columnWidth }
}

export const addTableContent = (pdf: jsPDF, leads: Lead[], startY: number, columnWidth: number) => {
  pdf.setFont("helvetica", "normal")
  pdf.setTextColor(...TEXT_COLOR)
  pdf.setFontSize(10)
  
  leads.forEach((lead, index) => {
    const y = startY + 10 + (index * 8)
    
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
}

export const addFooter = (pdf: jsPDF, date: string) => {
  const pageHeight = pdf.internal.pageSize.height
  pdf.setFontSize(8)
  pdf.setTextColor(...SECONDARY_COLOR)
  pdf.text(`Document généré le ${date}`, 105, pageHeight - 10, { align: "center" })
}