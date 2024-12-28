import jsPDF from 'jspdf'
import { Lead } from "@/types/leads"
import { LeadAnalysis } from "@/types/analysis"
import { supabase } from "@/integrations/supabase/client"

export async function exportToPDF(leads: Lead[]) {
  const pdf = new jsPDF()
  let yPosition = 15
  const pageHeight = pdf.internal.pageSize.height

  for (const lead of leads) {
    // En-tête du lead
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
    pdf.setTextColor(155, 135, 245)
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

    try {
      // Récupérer l'analyse IA
      const { data: analysis } = await supabase
        .from('lead_analyses')
        .select('*')
        .eq('lead_id', lead.id)
        .single()

      if (analysis) {
        await addAnalysisToPDF(pdf, analysis as LeadAnalysis)
      }
    } catch (error) {
      console.error("Erreur lors de la récupération de l'analyse:", error)
    }

    // Nouvelle page pour le prochain lead
    if (lead !== leads[leads.length - 1]) {
      pdf.addPage()
      yPosition = 15
    }
  }

  return pdf
}

async function addAnalysisToPDF(pdf: jsPDF, analysis: LeadAnalysis) {
  let yPosition = 15
  const pageHeight = pdf.internal.pageSize.height
  
  // Nouvelle page pour l'analyse
  pdf.addPage()

  // Titre de l'analyse
  pdf.setFontSize(18)
  pdf.setTextColor(66, 66, 66)
  pdf.text("Analyse IA", 14, yPosition)
  yPosition += 10

  // Analyse de l'entreprise
  if (analysis.company_analysis) {
    yPosition = addSectionToPDF(pdf, "Analyse de l'entreprise", analysis.company_analysis, yPosition, pageHeight)
  }

  // Analyse technologique
  if (analysis.tech_analysis) {
    yPosition = addSectionToPDF(pdf, "Analyse technologique", analysis.tech_analysis, yPosition, pageHeight)
  }

  // Analyse marketing
  if (analysis.marketing_analysis) {
    yPosition = addSectionToPDF(pdf, "Analyse marketing", analysis.marketing_analysis, yPosition, pageHeight)
  }

  // Analyse financière
  if (analysis.financial_analysis) {
    yPosition = addSectionToPDF(pdf, "Analyse financière", analysis.financial_analysis, yPosition, pageHeight)
  }

  // Analyse concurrentielle
  if (analysis.competitive_analysis) {
    yPosition = addSectionToPDF(pdf, "Analyse concurrentielle", analysis.competitive_analysis, yPosition, pageHeight)
  }

  // Plan d'action
  if (analysis.action_plan) {
    yPosition = addSectionToPDF(pdf, "Plan d'action", analysis.action_plan, yPosition, pageHeight)
  }
}

function addSectionToPDF(pdf: jsPDF, title: string, data: any, startY: number, pageHeight: number): number {
  let yPosition = startY

  // Vérifier s'il faut ajouter une nouvelle page
  if (yPosition > pageHeight - 40) {
    pdf.addPage()
    yPosition = 15
  }

  // Titre de la section
  pdf.setFontSize(14)
  pdf.setTextColor(155, 135, 245)
  pdf.text(title, 14, yPosition)
  yPosition += 7

  // Contenu de la section
  pdf.setFontSize(12)
  pdf.setTextColor(100, 100, 100)

  Object.entries(data).forEach(([key, value]) => {
    if (value) {
      // Vérifier s'il faut ajouter une nouvelle page
      if (yPosition > pageHeight - 20) {
        pdf.addPage()
        yPosition = 15
      }

      if (Array.isArray(value)) {
        pdf.text(`${key}:`, 14, yPosition)
        yPosition += 7
        value.forEach((item: string) => {
          if (yPosition > pageHeight - 20) {
            pdf.addPage()
            yPosition = 15
          }
          pdf.text(`• ${item}`, 20, yPosition)
          yPosition += 7
        })
      } else {
        pdf.text(`${key}: ${value}`, 14, yPosition)
        yPosition += 7
      }
    }
  })

  return yPosition + 5
}