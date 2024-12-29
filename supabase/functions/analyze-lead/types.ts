export interface Lead {
  id?: string
  company: string
  email?: string
  phone?: string
  address?: string
  website?: string
  industry?: string
  social_media?: {
    linkedin?: string
    twitter?: string
    facebook?: string
    instagram?: string
  }
  qualification?: number
  score?: number
  strengths?: string[]
  weaknesses?: string[]
  created_at?: string
  is_search_result?: boolean
}