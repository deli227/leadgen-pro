export interface SocialMedia {
  linkedin: string;
  twitter: string;
  facebook: string;
  instagram: string;
}

export interface Lead {
  id?: string;
  company: string;
  email?: string;
  phone?: string;
  website?: string;
  address?: string;
  qualification?: number;
  social_media?: SocialMedia;
  score?: number;
  industry?: string;
  strengths?: string[];
  weaknesses?: string[];
}

export interface GenerateLeadsResponse {
  success: boolean;
  data?: {
    leads: Lead[];
    metadata: {
      totalLeads: number;
      generatedAt: string;
      searchCriteria: {
        industry: string;
        country: string;
        leadCount: number;
      };
    };
  };
  error?: string;
  details?: string;
}