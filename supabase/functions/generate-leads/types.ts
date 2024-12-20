export interface SearchParams {
  industry: string;
  country: string;
  city: string;
  leadCount: number;
}

export interface LeadResult {
  company: string;
  website: string;
  industry: string;
  user_id: string;
  qualification: number;
  score: number;
  social_media: Record<string, any>;
  strengths: string[];
  weaknesses: string[];
}