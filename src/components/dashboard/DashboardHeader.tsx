import { Button } from "@/components/ui/button"
import { LogOut, Book, User } from "lucide-react"
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
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 sm:gap-4 mb-2 sm:mb-4 md:mb-8 w-full">
      <div className="space-y-1 sm:space-y-2 w-full sm:w-auto">
        <h1 className="text-lg sm:text-2xl md:text-4xl font-bold bg-gradient-to-r from-primary-light via-primary to-accent bg-clip-text text-transparent flex items-center gap-2">
          Tableau de bord
          <span className="text-[10px] sm:text-sm md:text-base font-normal text-primary-light/80 bg-primary-dark/10 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-md">
            Beta
          </span>
        </h1>
        <p className="text-xs sm:text-sm md:text-base text-primary-light/70">
          Gérez et analysez vos leads en temps réel
        </p>
      </div>
      <div className="flex gap-1.5 sm:gap-4 items-center w-full sm:w-auto justify-end flex-wrap">
        <Link 
          to="/documentation"
          className="inline-flex items-center gap-1 sm:gap-2 px-2 sm:px-3 py-1.5 sm:py-2 text-[10px] sm:text-sm text-primary-light hover:text-white transition-colors"
        >
          <Book className="h-3 w-3 sm:h-4 sm:w-4" />
          <span>Documentation</span>
        </Link>
        <Link 
          to="/profile"
          className="inline-flex items-center gap-1 sm:gap-2 px-2 sm:px-3 py-1.5 sm:py-2 text-[10px] sm:text-sm text-primary-light hover:text-white transition-colors"
        >
          <User className="h-3 w-3 sm:h-4 sm:w-4" />
          <span>Profil</span>
        </Link>
        <LeadsExport leads={exportLeads} />
        <Button
          onClick={handleLogout}
          variant="outline"
          size="sm"
          className="bg-gradient-to-r from-primary/20 to-primary-dark/20 text-primary-light border-primary-light/20 hover:bg-primary/30 hover:text-white transition-all duration-300 text-[10px] sm:text-sm px-2 sm:px-3 py-1.5 sm:py-2 h-auto"
        >
          <LogOut className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
          <span className="hidden sm:inline">Déconnexion</span>
        </Button>
      </div>
    </div>
  )
}