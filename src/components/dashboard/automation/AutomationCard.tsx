import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { LucideIcon } from "lucide-react"
import { motion } from "framer-motion"

interface AutomationCardProps {
  title: string
  description: string
  icon: LucideIcon
  gradient: string
  buttonText?: string
}

export function AutomationCard({
  title,
  description,
  icon: Icon,
  gradient,
  buttonText = "Configurer"
}: AutomationCardProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <Card 
        className={`p-4 sm:p-6 bg-gradient-to-br ${gradient} border-primary/20 relative group transition-all duration-300 backdrop-blur-sm hover:shadow-lg hover:shadow-primary/5`}
      >
        <div className="absolute inset-0 bg-black/40 rounded-lg" />
        <div className="relative z-10">
          <Icon className="h-6 w-6 sm:h-8 sm:w-8 text-primary-light mb-3 sm:mb-4" />
          <h3 className="text-base sm:text-lg font-semibold text-primary-light mb-2">
            {title}
          </h3>
          <p className="text-sm sm:text-base text-primary-light/90 mb-4">
            {description}
          </p>
          <Badge 
            variant="secondary" 
            className="absolute top-2 right-2 sm:top-4 sm:right-4 bg-primary/20 text-primary-light text-xs"
          >
            Bientôt
          </Badge>
          <Button 
            className="w-full mt-3 sm:mt-4 bg-primary/20 hover:bg-primary/30 transition-all duration-300 text-sm sm:text-base backdrop-blur-sm text-primary-light"
            disabled
          >
            {buttonText}
          </Button>
        </div>
      </Card>
    </motion.div>
  )
}