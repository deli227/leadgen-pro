import { Auth as SupabaseAuth } from "@supabase/auth-ui-react"
import { ThemeSupa } from "@supabase/auth-ui-shared"
import { supabase } from "@/integrations/supabase/client"
import { useNavigate, useSearchParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import { toast } from "sonner"
import { AuthUI } from "@/components/auth/AuthUI"
import { AuthHeader } from "@/components/auth/AuthHeader"
import { AuthContainer } from "@/components/auth/AuthContainer"
import { EmailConfirmation } from "@/components/auth/EmailConfirmation"

export function Auth() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const [isLoading, setIsLoading] = useState(true)
  const [isConfirming, setIsConfirming] = useState(false)

  useEffect(() => {
    const checkSession = async () => {
      const { data: { session }, error } = await supabase.auth.getSession()
      if (error) {
        console.error("Erreur lors de la vérification de la session:", error)
        toast.error("Erreur de connexion")
      }
      if (session) {
        navigate("/dashboard")
      }
      setIsLoading(false)
    }

    const confirmEmail = async () => {
      const token_hash = searchParams.get('token_hash')
      const type = searchParams.get('type')
      
      if (type === 'email_confirmation' && token_hash) {
        setIsConfirming(true)
        try {
          const { error } = await supabase.auth.verifyOtp({
            token_hash,
            type: "signup",
          })
          
          if (error) throw error
          
          const { error: updateError } = await supabase
            .from('profiles')
            .update({ email_confirmed: true })
            .eq('id', (await supabase.auth.getUser()).data.user?.id)
          
          if (updateError) throw updateError
          
          toast.success("Email confirmé avec succès !")
          navigate("/") // Redirection vers la landing page au lieu du dashboard
        } catch (error) {
          console.error("Erreur lors de la confirmation de l'email:", error)
          toast.error("Erreur lors de la confirmation de l'email")
        } finally {
          setIsConfirming(false)
        }
      }
    }

    checkSession()
    confirmEmail()

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log("Changement d'état d'authentification:", event, session)
      if (event === 'PASSWORD_RECOVERY') {
        toast.info("Veuillez réinitialiser votre mot de passe")
      } else if (event === 'SIGNED_IN') {
        toast.success("Connexion réussie")
        navigate("/dashboard")
      } else if (event === 'SIGNED_OUT') {
        toast.info("Déconnexion réussie")
      } else if (event === 'USER_UPDATED') {
        toast.success("Profil mis à jour avec succès")
        navigate("/dashboard")
      }
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [navigate, searchParams])

  if (isConfirming) {
    return <EmailConfirmation />
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-secondary-dark to-[#1A1F2C]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    )
  }

  return <AuthContainer />
}