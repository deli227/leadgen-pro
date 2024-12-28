import { IconButton } from "./IconButton"
import { Zap } from "lucide-react"
import { toast } from "sonner"
import { useState } from "react"
import { supabase } from "@/integrations/supabase/client"

interface UpgradeButtonProps {
  className?: string
}

export const UpgradeButton = ({ className }: UpgradeButtonProps) => {
  const [isLoading, setIsLoading] = useState(false)

  const handleUpgradeClick = async () => {
    try {
      setIsLoading(true)
      
      // Prix pour l'abonnement Pro
      const priceId = "price_1OqKHyKez0igoNdCnewVaA8M"

      const response = await fetch('/api/create-checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${(await supabase.auth.getSession()).data.session?.access_token}`
        },
        body: JSON.stringify({ priceId })
      })

      const { url, error } = await response.json()

      if (error) {
        throw new Error(error)
      }

      // Rediriger vers la page de paiement Stripe
      window.location.href = url
    } catch (error) {
      console.error('Erreur lors de la création de la session de paiement:', error)
      toast.error("Une erreur est survenue lors de la création de la session de paiement")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <IconButton
      icon={Zap}
      label={isLoading ? "Chargement..." : "Augmenter la limite"}
      variant="outline"
      onClick={handleUpgradeClick}
      disabled={isLoading}
      className={className}
    />
  )
}