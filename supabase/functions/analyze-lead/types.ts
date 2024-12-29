export interface Lead {
  id: string;
  company: string;
  industry?: string;
  website?: string;
  email?: string;
  phone?: string;
  address?: string;
}

export interface AnalysisResponse {
  success: boolean;
  data?: any;
  error?: string;
}