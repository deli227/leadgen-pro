import { useState } from "react"
import { toast } from "sonner"
import { supabase } from "@/integrations/supabase/client"
import { Button } from "@/components/ui/button"
import { Sparkles, Zap } from "lucide-react"
import { motion } from "framer-motion"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

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
    <TooltipProvider delayDuration={0}>
      <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
        <Tooltip>
          <TooltipTrigger asChild>
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
          </TooltipTrigger>
          <TooltipContent 
            side="right"
            align="start"
            className="w-[300px] p-4 bg-secondary-dark border border-primary/20 z-50"
            sideOffset={5}
          >
            <div className="space-y-2">
              <p className="font-semibold text-primary">Version Pro - 24,99€/mois</p>
              <div className="bg-primary/10 p-3 rounded-lg mb-3 text-center">
                <p className="text-xl font-bold text-primary animate-pulse">
                  200 leads garantis/mois
                </p>
                <p className="text-sm text-primary-light">Seulement 0,125 €/lead</p>
              </div>
              <ul className="text-sm space-y-1 text-gray-200">
                <li className="flex items-center gap-2">
                  <Zap className="w-4 h-4 text-primary" />
                  Analyse IA avancée
                </li>
                <li className="flex items-center gap-2">
                  <Zap className="w-4 h-4 text-primary" />
                  Export multi-formats
                </li>
                <li className="flex items-center gap-2">
                  <Zap className="w-4 h-4 text-primary" />
                  Accès API
                </li>
                <li className="flex items-center gap-2">
                  <Zap className="w-4 h-4 text-primary" />
                  Support prioritaire
                </li>
              </ul>
            </div>
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
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
          </TooltipTrigger>
          <TooltipContent 
            side="right"
            align="start"
            className="w-[300px] p-4 bg-secondary-dark border border-primary/20 z-50"
            sideOffset={5}
          >
            <div className="space-y-2">
              <p className="font-semibold text-accent">Version Premium - 59,99€/mois</p>
              <div className="bg-accent/10 p-3 rounded-lg mb-3 text-center">
                <p className="text-xl font-bold text-accent animate-pulse">
                  500 leads garantis/mois
                </p>
                <p className="text-sm text-accent/90">Seulement 0,12 €/lead</p>
              </div>
              <ul className="text-sm space-y-1 text-gray-200">
                <li className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-accent" />
                  Analyse IA avancée et personnalisée
                </li>
                <li className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-accent" />
                  API dédiée pour automatisation
                </li>
                <li className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-accent" />
                  Support prioritaire expert
                </li>
                <li className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-accent" />
                  Automatisations illimitées (Bientôt)
                </li>
                <li className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-accent" />
                  Enrichissement des leads automatique (Bientôt)
                </li>
              </ul>
            </div>
          </TooltipContent>
        </Tooltip>
      </div>
    </TooltipProvider>
  )
}