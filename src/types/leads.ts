export interface Lead {
  id: string;
  company: string;
  email?: string;
  phone?: string;
  address?: string;
  qualification?: number;
  socialMedia?: {
    linkedin: string;
    twitter: string;
  };
  score?: number;
  industry?: string;
  strengths?: string[];
  weaknesses?: string[];
  website?: string;
}