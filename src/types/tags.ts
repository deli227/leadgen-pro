export interface Tag {
  id: string;
  name: string;
  color: string;
  created_at: string;
}

export interface LeadTag {
  lead_id: string;
  tag_id: string;
  created_at: string;
}