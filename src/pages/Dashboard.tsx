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
import { useToast } from "@/components/ui/use-toast"

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

interface UserProfile {
  subscription_type: 'free' | 'pro' | 'enterprise'
  leads_generated_today: number
  leads_generated_this_month: number
  last_lead_generation_date: string
}

export function Dashboard() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [filters, setFilters] = useState({
    search: "",
    leadCount: 10,
    industry: "all",
    country: "all",
    city: "all"
  });

  const { data: profile } = useQuery({
    queryKey: ['profile'],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      const { data, error } = await supabase
        .from('profiles')
        .select('subscription_type, leads_generated_today, leads_generated_this_month, last_lead_generation_date')
        .eq('id', user.id)
        .single();
      
      if (error) throw error;
      return data as UserProfile;
    }
  });

  const { data: limits } = useQuery({
    queryKey: ['subscription_limits', profile?.subscription_type],
    queryFn: async () => {
      if (!profile) return null;
      const { data, error } = await supabase
        .from('subscription_limits')
        .select('daily_leads_limit, monthly_leads_limit')
        .eq('type', profile.subscription_type)
        .single();
      
      if (error) throw error;
      return data;
    },
    enabled: !!profile
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

  useEffect(() => {
    if (profile && limits) {
      if (profile.leads_generated_today >= limits.daily_leads_limit) {
        toast({
          title: "Limite quotidienne atteinte",
          description: `Vous avez atteint votre limite de ${limits.daily_leads_limit} leads par jour. Passez à un forfait supérieur pour générer plus de leads.`,
          variant: "destructive",
        });
      } else if (profile.leads_generated_this_month >= limits.monthly_leads_limit) {
        toast({
          title: "Limite mensuelle atteinte",
          description: `Vous avez atteint votre limite de ${limits.monthly_leads_limit} leads par mois. Passez à un forfait supérieur pour générer plus de leads.`,
          variant: "destructive",
        });
      }
    }
  }, [profile, limits, toast]);

  // Transform Supabase leads to match the expected Lead interface
  const leads: Lead[] = supabaseLeads.map(lead => ({
    id: parseInt(lead.id),
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
            {profile && limits && (
              <div className="text-primary-light text-sm">
                <span className="mr-4">
                  {profile.leads_generated_today}/{limits.daily_leads_limit} leads aujourd'hui
                </span>
                <span>
                  {profile.leads_generated_this_month}/{limits.monthly_leads_limit} leads ce mois
                </span>
              </div>
            )}
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