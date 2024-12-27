export interface SocialMedia {
  linkedin?: string;
  twitter?: string;
}

export interface Lead {
  company: string;
  email?: string;
  phone?: string;
  website?: string;
  industry?: string;
  social_media?: SocialMedia;
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