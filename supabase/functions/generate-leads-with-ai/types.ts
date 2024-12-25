export interface SearchFilters {
  search?: string;
  industry?: string;
  country?: string;
  city?: string;
  leadCount: number;
}

export interface SearchResult {
  title: string;
  snippet: string;
  link: string;
}

export interface CountryParams {
  lang: string;
  gl: string;
  businessTerm: string;
}