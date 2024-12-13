import { useState, useEffect } from "react"
import { LeadsTable } from "@/components/leads/LeadsTable"
import { LeadsFilters } from "@/components/leads/LeadsFilters"
import { LeadsExport } from "@/components/leads/LeadsExport"
import { LeadsStats } from "@/components/leads/LeadsStats"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Button } from "@/components/ui/button"
import { LogOut } from "lucide-react"
import { supabase } from "@/integrations/supabase/client"
import { useNavigate } from "react-router-dom"
import { useQuery } from "@tanstack/react-query"
import { useToast } from "@/hooks/use-toast"

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
  const navigate = useNavigate()
  const { toast } = useToast()
  const [filters, setFilters] = useState({
    search: "",
    leadCount: 10,
    industry: "all",
    country: "all",
    city: "all"
  })
  const [analyticsLeads, setAnalyticsLeads] = useState<Lead[]>([])
  const [exportLeads, setExportLeads] = useState<Lead[]>([])

  // Get the current session
  const { data: session } = useQuery({
    queryKey: ['session'],
    queryFn: async () => {
      const { data: { session } } = await supabase.auth.getSession()
      if (!session) throw new Error('Not authenticated')
      return session
    },
  })

  const { data: profile } = useQuery({
    queryKey: ['profile', session?.user?.id],
    queryFn: async () => {
      if (!session?.user?.id) throw new Error('No user ID')

      const { data, error } = await supabase
        .from('profiles')
        .select('subscription_type, leads_generated_today, leads_generated_this_month, last_lead_generation_date')
        .eq('id', session.user.id)
        .single()
      
      if (error) throw error
      return data
    },
    enabled: !!session?.user?.id
  })

  const { data: limits } = useQuery({
    queryKey: ['subscription_limits', profile?.subscription_type],
    queryFn: async () => {
      if (!profile) return null
      const { data, error } = await supabase
        .from('subscription_limits')
        .select('daily_leads_limit, monthly_leads_limit')
        .eq('subscription_type', profile.subscription_type)
        .single()
      
      if (error) throw error
      return data
    },
    enabled: !!profile
  })

  const { data: supabaseLeads = [] } = useQuery({
    queryKey: ['leads', session?.user?.id],
    queryFn: async () => {
      if (!session?.user?.id) throw new Error('No user ID')

      const { data, error } = await supabase
        .from('leads')
        .select('*')
        .eq('user_id', session.user.id)
      
      if (error) throw error
      return data
    },
    enabled: !!session?.user?.id
  })

  const leads: Lead[] = supabaseLeads.map(lead => ({
    id: parseInt(lead.id),
    company: lead.company,
    email: lead.email || "",
    phone: lead.phone || "",
    address: lead.address || undefined,
    qualification: lead.qualification || 0,
    socialMedia: {
      linkedin: (lead.social_media as any)?.linkedin || "",
      twitter: (lead.social_media as any)?.twitter || ""
    },
    score: lead.score || 0,
    industry: lead.industry || "",
    strengths: lead.strengths || [],
    weaknesses: lead.weaknesses || []
  }))

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut()
      navigate('/auth')
    } catch (error) {
      console.error('Error logging out:', error)
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Une erreur est survenue lors de la déconnexion.",
      })
    }
  }

  const handleAddToAnalytics = (lead: Lead) => {
    if (!analyticsLeads.find(l => l.id === lead.id)) {
      setAnalyticsLeads(prev => [...prev, lead])
      toast({
        title: "Lead ajouté aux analytiques",
        description: "Le lead a été ajouté avec succès à la section analytiques."
      })
    }
  }

  const handleAddToExport = (lead: Lead) => {
    if (!exportLeads.find(l => l.id === lead.id)) {
      setExportLeads(prev => [...prev, lead])
      toast({
        title: "Lead ajouté à l'export",
        description: "Le lead a été ajouté avec succès à la liste d'export."
      })
    }
  }

  const handleRemoveFromExport = (leadId: number) => {
    setExportLeads(prev => prev.filter(lead => lead.id !== leadId))
    toast({
      title: "Lead retiré de l'export",
      description: "Le lead a été retiré avec succès de la liste d'export."
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-secondary-dark via-[#1A1F2C] to-black">
      <div className="container mx-auto py-8 px-4 animate-fade-in">
        <div className="flex justify-between items-center mb-8">
          <div className="space-y-2">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-primary-light via-primary to-accent bg-clip-text text-transparent">
              Tableau de bord
            </h1>
            <p className="text-primary-light/70">
              Gérez et analysez vos leads en temps réel
            </p>
          </div>
          <div className="flex gap-4 items-center">
            <LeadsExport leads={exportLeads} />
            <Button
              onClick={handleLogout}
              variant="outline"
              className="bg-gradient-to-r from-primary/20 to-primary-dark/20 text-primary-light border-primary-light/20 hover:bg-primary/30 hover:text-white transition-all duration-300"
            >
              <LogOut className="h-4 w-4 mr-2" />
              Déconnexion
            </Button>
          </div>
        </div>

        {profile && limits && (
          <div className="mb-8 animate-fade-up">
            <LeadsStats
              dailyLeadsLeft={limits.daily_leads_limit - profile.leads_generated_today}
              monthlyLeadsLeft={limits.monthly_leads_limit - profile.leads_generated_this_month}
              totalDailyLeads={limits.daily_leads_limit}
              totalMonthlyLeads={limits.monthly_leads_limit}
              subscriptionType={profile.subscription_type}
            />
          </div>
        )}
        
        <div className="grid gap-8 animate-fade-up" style={{ animationDelay: "0.2s" }}>
          <LeadsFilters 
            filters={filters} 
            setFilters={setFilters} 
            leads={leads}
            analyticsLeads={analyticsLeads}
            onAddToAnalytics={handleAddToAnalytics}
            onAddToExport={handleAddToExport}
            exportLeads={exportLeads}
            onRemoveFromExport={handleRemoveFromExport}
          />
        </div>
      </div>
    </div>
  )
}