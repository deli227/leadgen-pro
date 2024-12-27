export interface Filters {
  search: string
  leadCount: number
  industry: string
  country: string
  city: string
}

export interface Lead {
  company: string
  email: string
  phone: string
  website: string
  address: string
  industry: string
  score: number
  socialMedia: {
    linkedin: string
    twitter: string
    facebook: string
    instagram: string
  }
}

export interface GenerateLeadsResponse {
  success: boolean
  data?: {
    leads: Lead[]
    metadata: {
      totalLeads: number
      generatedAt: string
      searchCriteria: {
        industry: string
        country: string
        leadCount: number
      }
    }
  }
  error?: string
  details?: string
}