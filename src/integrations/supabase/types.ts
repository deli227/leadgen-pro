export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      admin_users: {
        Row: {
          created_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          user_id?: string
        }
        Relationships: []
      }
      analytics_leads: {
        Row: {
          created_at: string
          id: string
          lead_id: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          lead_id: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          lead_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "analytics_leads_lead_id_fkey"
            columns: ["lead_id"]
            isOneToOne: false
            referencedRelation: "leads"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "analytics_leads_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      email_automations: {
        Row: {
          created_at: string
          follow_up_days: number | null
          id: string
          is_active: boolean
          last_sent_at: string | null
          name: string
          selected_leads: string[] | null
          send_time: string | null
          subject: string
          template: string
          trigger_score: number
          user_id: string
        }
        Insert: {
          created_at?: string
          follow_up_days?: number | null
          id?: string
          is_active?: boolean
          last_sent_at?: string | null
          name: string
          selected_leads?: string[] | null
          send_time?: string | null
          subject: string
          template: string
          trigger_score?: number
          user_id: string
        }
        Update: {
          created_at?: string
          follow_up_days?: number | null
          id?: string
          is_active?: boolean
          last_sent_at?: string | null
          name?: string
          selected_leads?: string[] | null
          send_time?: string | null
          subject?: string
          template?: string
          trigger_score?: number
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "email_automations_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      lead_analyses: {
        Row: {
          action_plan: Json | null
          company_analysis: Json | null
          competitive_analysis: Json | null
          created_at: string
          financial_analysis: Json | null
          id: string
          lead_id: string
          marketing_analysis: Json | null
          recommendations: Json | null
          tech_analysis: Json | null
          updated_at: string
          user_id: string
        }
        Insert: {
          action_plan?: Json | null
          company_analysis?: Json | null
          competitive_analysis?: Json | null
          created_at?: string
          financial_analysis?: Json | null
          id?: string
          lead_id: string
          marketing_analysis?: Json | null
          recommendations?: Json | null
          tech_analysis?: Json | null
          updated_at?: string
          user_id: string
        }
        Update: {
          action_plan?: Json | null
          company_analysis?: Json | null
          competitive_analysis?: Json | null
          created_at?: string
          financial_analysis?: Json | null
          id?: string
          lead_id?: string
          marketing_analysis?: Json | null
          recommendations?: Json | null
          tech_analysis?: Json | null
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "lead_analyses_lead_id_fkey"
            columns: ["lead_id"]
            isOneToOne: false
            referencedRelation: "leads"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "lead_analyses_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      lead_notes: {
        Row: {
          content: string
          created_at: string
          id: string
          lead_id: string
          updated_at: string
          user_id: string
        }
        Insert: {
          content: string
          created_at?: string
          id?: string
          lead_id: string
          updated_at?: string
          user_id: string
        }
        Update: {
          content?: string
          created_at?: string
          id?: string
          lead_id?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "lead_notes_lead_id_fkey"
            columns: ["lead_id"]
            isOneToOne: false
            referencedRelation: "leads"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "lead_notes_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      lead_tags: {
        Row: {
          color: string
          created_at: string
          id: string
          name: string
          user_id: string
        }
        Insert: {
          color?: string
          created_at?: string
          id?: string
          name: string
          user_id: string
        }
        Update: {
          color?: string
          created_at?: string
          id?: string
          name?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "lead_tags_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      leads: {
        Row: {
          address: string | null
          company: string
          company_size: Database["public"]["Enums"]["company_size_type"] | null
          created_at: string
          email: string | null
          id: string
          industry: string | null
          is_search_result: boolean | null
          phone: string | null
          qualification: number | null
          score: number | null
          social_media: Json | null
          strengths: string[] | null
          user_id: string | null
          weaknesses: string[] | null
          website: string | null
        }
        Insert: {
          address?: string | null
          company: string
          company_size?: Database["public"]["Enums"]["company_size_type"] | null
          created_at?: string
          email?: string | null
          id?: string
          industry?: string | null
          is_search_result?: boolean | null
          phone?: string | null
          qualification?: number | null
          score?: number | null
          social_media?: Json | null
          strengths?: string[] | null
          user_id?: string | null
          weaknesses?: string[] | null
          website?: string | null
        }
        Update: {
          address?: string | null
          company?: string
          company_size?: Database["public"]["Enums"]["company_size_type"] | null
          created_at?: string
          email?: string | null
          id?: string
          industry?: string | null
          is_search_result?: boolean | null
          phone?: string | null
          qualification?: number | null
          score?: number | null
          social_media?: Json | null
          strengths?: string[] | null
          user_id?: string | null
          weaknesses?: string[] | null
          website?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "leads_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      leads_to_tags: {
        Row: {
          created_at: string
          lead_id: string
          tag_id: string
        }
        Insert: {
          created_at?: string
          lead_id: string
          tag_id: string
        }
        Update: {
          created_at?: string
          lead_id?: string
          tag_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "leads_to_tags_lead_id_fkey"
            columns: ["lead_id"]
            isOneToOne: false
            referencedRelation: "leads"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "leads_to_tags_tag_id_fkey"
            columns: ["tag_id"]
            isOneToOne: false
            referencedRelation: "lead_tags"
            referencedColumns: ["id"]
          },
        ]
      }
      payments: {
        Row: {
          amount: number
          created_at: string
          currency: string
          id: string
          payment_method: string | null
          status: string
          stripe_customer_id: string | null
          stripe_payment_id: string
          user_id: string
        }
        Insert: {
          amount: number
          created_at?: string
          currency?: string
          id?: string
          payment_method?: string | null
          status: string
          stripe_customer_id?: string | null
          stripe_payment_id: string
          user_id: string
        }
        Update: {
          amount?: number
          created_at?: string
          currency?: string
          id?: string
          payment_method?: string | null
          status?: string
          stripe_customer_id?: string | null
          stripe_payment_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "payments_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          created_at: string
          email: string | null
          email_confirmed: boolean | null
          id: string
          last_lead_generation_date: string | null
          leads_generated_this_month: number
          leads_generated_today: number
          subscription_type: Database["public"]["Enums"]["subscription_type"]
        }
        Insert: {
          created_at?: string
          email?: string | null
          email_confirmed?: boolean | null
          id: string
          last_lead_generation_date?: string | null
          leads_generated_this_month?: number
          leads_generated_today?: number
          subscription_type?: Database["public"]["Enums"]["subscription_type"]
        }
        Update: {
          created_at?: string
          email?: string | null
          email_confirmed?: boolean | null
          id?: string
          last_lead_generation_date?: string | null
          leads_generated_this_month?: number
          leads_generated_today?: number
          subscription_type?: Database["public"]["Enums"]["subscription_type"]
        }
        Relationships: []
      }
      secrets: {
        Row: {
          created_at: string
          id: string
          name: string
          value: string
        }
        Insert: {
          created_at?: string
          id?: string
          name: string
          value: string
        }
        Update: {
          created_at?: string
          id?: string
          name?: string
          value?: string
        }
        Relationships: []
      }
      subscription_limits: {
        Row: {
          monthly_leads_limit: number
          subscription_type: Database["public"]["Enums"]["subscription_type"]
        }
        Insert: {
          monthly_leads_limit: number
          subscription_type: Database["public"]["Enums"]["subscription_type"]
        }
        Update: {
          monthly_leads_limit?: number
          subscription_type?: Database["public"]["Enums"]["subscription_type"]
        }
        Relationships: []
      }
      waitlist: {
        Row: {
          created_at: string
          email: string
          id: string
          status: Database["public"]["Enums"]["waitlist_status"]
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
          status?: Database["public"]["Enums"]["waitlist_status"]
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          status?: Database["public"]["Enums"]["waitlist_status"]
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      company_size_type: "large" | "medium" | "small" | "micro" | "unknown"
      subscription_type: "free" | "pro" | "enterprise"
      waitlist_status: "pending" | "notified"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
