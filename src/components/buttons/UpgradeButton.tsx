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

      const { data, error } = await supabase.functions.invoke('create-checkout', {
        body: { priceId }
      })

      if (error) {
        throw new Error(error.message)
      }

      if (data?.url) {
        // Rediriger vers la page de paiement Stripe
        window.location.href = data.url
      } else {
        throw new Error("URL de paiement non reçue")
      }
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