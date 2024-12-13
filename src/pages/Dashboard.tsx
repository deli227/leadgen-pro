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

export function Dashboard() {
  const navigate = useNavigate();
  const [filters, setFilters] = useState({
    search: "",
    leadCount: 10,
    industry: "all",
    country: "all",
    city: "all"
  });

  const { data: leads = [] } = useQuery({
    queryKey: ['leads'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('leads')
        .select('*')
      
      if (error) throw error;
      return data;
    }
  });

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