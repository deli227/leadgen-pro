import { Button } from "@/components/ui/button"
import { LogOut } from "lucide-react"
import { LeadsExport } from "../leads/LeadsExport"
import { Lead } from "@/types/leads"
import { useToast } from "@/hooks/use-toast"
import { supabase } from "@/integrations/supabase/client"
import { useNavigate } from "react-router-dom"
import { useSessionData } from "@/hooks/useSessionData"

interface DashboardHeaderProps {
  exportLeads: Lead[]
}

export function DashboardHeader({ exportLeads }: DashboardHeaderProps) {
  const navigate = useNavigate()
  const { toast } = useToast()
  const { data: session } = useSessionData()

  const handleLogout = async () => {
    try {
      if (!session) {
        navigate('/auth')
        return
      }

      const { error } = await supabase.auth.signOut()
      if (error) throw error

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

  return (
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
  )
}