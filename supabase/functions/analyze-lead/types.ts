export interface AnalysisRequest {
  lead: {
    id: string;
    company: string;
    website?: string;
    industry?: string;
    email?: string;
    phone?: string;
    address?: string;
  };
  userId: string;
}

export interface AnalysisResponse {
  success: boolean;
  data?: any;
  error?: string;
}