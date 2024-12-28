import { IconButton } from "./IconButton"
import { Zap } from "lucide-react"
import { toast } from "sonner"
import { useState } from "react"
import { supabase } from "@/integrations/supabase/client"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface UpgradeButtonProps {
  className?: string
}

export const UpgradeButton = ({ className }: UpgradeButtonProps) => {
  const [isLoading, setIsLoading] = useState(false)

  const handleUpgradeClick = async (priceId: string, planName: string) => {
    try {
      setIsLoading(true)
      
      const { data, error } = await supabase.functions.invoke('create-checkout', {
        body: { priceId }
      })

      if (error) {
        console.error('Erreur lors de la création de la session de paiement:', error)
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
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <IconButton
          icon={Zap}
          label={isLoading ? "Chargement..." : "Augmenter la limite"}
          variant="outline"
          disabled={isLoading}
          className={`bg-gradient-to-r from-primary/20 to-primary/30 hover:from-primary/30 hover:to-primary/40 border-primary/50 text-primary font-medium shadow-sm hover:shadow-md transition-all duration-300 ${className}`}
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48 bg-secondary-dark border border-primary/20">
        <DropdownMenuItem 
          onClick={() => handleUpgradeClick("price_1QYqRXB0B6nBBCbUR3iwskQu", "Pro")}
          className="cursor-pointer hover:bg-primary/10"
        >
          Version Pro (24,99€)
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={() => handleUpgradeClick("price_1QYqSJB0B6nBBCbUWCkn0Qn5", "Premium")}
          className="cursor-pointer hover:bg-primary/10"
        >
          Version Premium (59,99€)
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}