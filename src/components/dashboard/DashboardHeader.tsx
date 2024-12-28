import { Button } from "@/components/ui/button"
import { LogOut, Book } from "lucide-react"
import { LeadsExport } from "../leads/LeadsExport"
import { Lead } from "@/types/leads"
import { useToast } from "@/hooks/use-toast"
import { supabase } from "@/integrations/supabase/client"
import { useNavigate, Link } from "react-router-dom"

interface DashboardHeaderProps {
  exportLeads: Lead[]
}

export function DashboardHeader({ exportLeads }: DashboardHeaderProps) {
  const navigate = useNavigate()
  const { toast } = useToast()

  const handleLogout = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession()
      
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
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4 md:mb-8 w-full">
      <div className="space-y-2 w-full sm:w-auto">
        <h1 className="text-xl sm:text-2xl md:text-4xl font-bold bg-gradient-to-r from-primary-light via-primary to-accent bg-clip-text text-transparent">
          Tableau de bord
        </h1>
        <p className="text-xs sm:text-sm md:text-base text-primary-light/70">
          Gérez et analysez vos leads en temps réel
        </p>
      </div>
      <div className="flex gap-2 md:gap-4 items-center w-full sm:w-auto justify-end">
        <Link 
          to="/documentation"
          className="inline-flex items-center gap-2 px-3 py-2 text-xs sm:text-sm text-primary-light hover:text-white transition-colors"
        >
          <Book className="h-3 w-3 sm:h-4 sm:w-4" />
          <span>Documentation</span>
        </Link>
        <LeadsExport leads={exportLeads} />
        <Button
          onClick={handleLogout}
          variant="outline"
          size="sm"
          className="bg-gradient-to-r from-primary/20 to-primary-dark/20 text-primary-light border-primary-light/20 hover:bg-primary/30 hover:text-white transition-all duration-300 text-xs sm:text-sm"
        >
          <LogOut className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
          <span className="hidden sm:inline">Déconnexion</span>
        </Button>
      </div>
    </div>
  )
}