import { useState } from "react"
import { toast } from "sonner"
import { supabase } from "@/integrations/supabase/client"
import { Button } from "@/components/ui/button"
import { Sparkles, Zap } from "lucide-react"
import { motion } from "framer-motion"

interface UpgradeButtonProps {
  className?: string
}

export const UpgradeButton = ({ className }: UpgradeButtonProps) => {
  const [isLoading, setIsLoading] = useState(false)

  const handleUpgradeClick = async (priceId: string, plan: string) => {
    try {
      setIsLoading(true)
      toast.loading(`Préparation de votre passage au plan ${plan}...`)
      
      const { data, error } = await supabase.functions.invoke('create-checkout', {
        body: { priceId }
      })

      if (error) {
        console.error('Erreur lors de la création de la session de paiement:', error)
        throw new Error(error.message)
      }

      if (data?.url) {
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
    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
      <motion.div
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <Button
          onClick={() => handleUpgradeClick("price_1QYqRXB0B6nBBCbUR3iwskQu", "Pro")}
          disabled={isLoading}
          className="bg-gradient-to-r from-primary/80 to-primary hover:from-primary hover:to-primary/90 text-white font-medium px-6 py-2 rounded-lg flex items-center gap-2 min-w-[200px] justify-center"
        >
          <Zap className="w-4 h-4" />
          Passer au Pro
        </Button>
      </motion.div>

      <motion.div
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <Button
          onClick={() => handleUpgradeClick("price_1QYqSJB0B6nBBCbUWCkn0Qn5", "Premium")}
          disabled={isLoading}
          className="bg-gradient-to-r from-accent/80 to-accent hover:from-accent hover:to-accent/90 text-white font-medium px-6 py-2 rounded-lg flex items-center gap-2 min-w-[200px] justify-center"
        >
          <Sparkles className="w-4 h-4" />
          Passer au Premium
        </Button>
      </motion.div>
    </div>
  )
}