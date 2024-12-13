import { useState, useEffect } from "react"
import { LeadsTable } from "@/components/leads/LeadsTable"
import { LeadsFilters } from "@/components/leads/LeadsFilters"
import { LeadsExport } from "@/components/leads/LeadsExport"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Button } from "@/components/ui/button"
import { LogOut } from "lucide-react"
import { supabase } from "@/integrations/supabase/client"
import { useNavigate } from "react-router-dom"
import { useQuery } from "@tanstack/react-query"

interface SupabaseLead {
  id: string
  company: string
  email: string
  phone: string
  address: string
  qualification: number
  social_media: {
    linkedin: string
    twitter: string
  }
  score: number
  industry: string
  strengths: string[]
  weaknesses: string[]
  user_id: string
  created_at: string
}

interface Lead {
  id: number
  company: string
  email: string
  phone: string
  address?: string
  qualification: number
  socialMedia: {
    linkedin: string
    twitter: string
  }
  score: number
  industry: string
  strengths: string[]
  weaknesses: string[]
}

export function Dashboard() {
  const navigate = useNavigate();
  const [filters, setFilters] = useState({
    search: "",
    leadCount: 10,
    industry: "all",
    country: "all",
    city: "all"
  });

  const { data: supabaseLeads = [] } = useQuery({
    queryKey: ['leads'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('leads')
        .select('*')
      
      if (error) throw error;
      return data as SupabaseLead[];
    }
  });

  // Transform Supabase leads to match the expected Lead interface
  const leads: Lead[] = supabaseLeads.map(lead => ({
    id: parseInt(lead.id), // Convert string id to number
    company: lead.company,
    email: lead.email || "",
    phone: lead.phone || "",
    address: lead.address,
    qualification: lead.qualification,
    socialMedia: lead.social_media || { linkedin: "", twitter: "" },
    score: lead.score,
    industry: lead.industry || "",
    strengths: lead.strengths || [],
    weaknesses: lead.weaknesses || []
  }));

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/auth');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-secondary-dark to-[#1A1F2C]">
      <div className="container mx-auto py-8 px-4 animate-fade-in">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-primary-light to-primary bg-clip-text text-transparent">
            Tableau de bord des leads
          </h1>
          <div className="flex gap-4 items-center">
            <LeadsExport leads={leads} />
            <Button
              onClick={handleLogout}
              variant="outline"
              className="bg-gradient-to-r from-primary to-primary-dark text-white border-none hover:opacity-90"
            >
              <LogOut className="h-4 w-4 mr-2" />
              Déconnexion
            </Button>
          </div>
        </div>
        
        <div className="grid gap-8">
          <LeadsFilters filters={filters} setFilters={setFilters} />
          <ScrollArea className="h-[calc(100vh-24rem)] rounded-xl border border-primary/20 bg-black/40 backdrop-blur-sm shadow-lg shadow-primary/5">
            <LeadsTable leads={leads} filters={filters} />
          </ScrollArea>
        </div>
      </div>
    </div>
  );
}