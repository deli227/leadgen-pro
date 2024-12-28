import { Lead } from '@/types/leads'

export const downloadFile = (blob: Blob, filename: string) => {
  const link = document.createElement("a")
  link.href = URL.createObjectURL(blob)
  link.setAttribute("download", filename)
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}

export const generateCSVContent = (leads: Lead[]): string => {
  const headers = ["Entreprise", "Email", "Téléphone", "Score", "Secteur"]
  return [
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
}

export const generateJSONContent = (leads: Lead[]): string => {
  return JSON.stringify(leads, null, 2)
}