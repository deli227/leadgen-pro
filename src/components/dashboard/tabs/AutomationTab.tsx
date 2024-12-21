import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Webhook, Bot, Bell, Workflow, Plug, Settings2 } from "lucide-react"
import { useTranslation } from "react-i18next"
import { useIsMobile } from "@/hooks/use-mobile"

export function AutomationTab() {
  const { t } = useTranslation()
  const isMobile = useIsMobile()

  const integrations = [
    {
      title: "OpenAI",
      description: "Analyse automatique des leads avec l'IA",
      icon: Bot,
    },
    {
      title: "Webhooks",
      description: "Notifications temps réel",
      icon: Webhook,
    },
    {
      title: "API Personnalisée",
      description: "Connectez vos outils préférés",
      icon: Plug,
    },
  ]

  const workflows = [
    {
      title: "Enrichissement des leads",
      description: "Enrichissez automatiquement vos leads avec des données externes",
      icon: Workflow,
    },
    {
      title: "Qualification IA",
      description: "Qualifiez vos leads automatiquement avec l'IA",
      icon: Bot,
    },
    {
      title: "Notifications",
      description: "Recevez des alertes pour les leads importants",
      icon: Bell,
    },
  ]

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
      className="space-y-8 p-2 sm:p-4"
    >
      {/* Section Intégrations */}
      <section className="space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <h2 className="text-xl font-semibold text-primary-light">Intégrations API</h2>
          <Button 
            variant="outline" 
            className="border-primary/20 w-full sm:w-auto whitespace-nowrap"
            disabled
          >
            <Settings2 className="h-4 w-4 mr-2" />
            {isMobile ? "Gérer" : "Gérer les clés API"}
            <Badge variant="secondary" className="ml-2 bg-primary/20 text-xs">
              Bientôt
            </Badge>
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {integrations.map((integration) => (
            <Card 
              key={integration.title} 
              className="p-4 sm:p-6 bg-black/40 border-primary/20 relative group transition-all duration-300 hover:scale-[1.02]"
            >
              <integration.icon className="h-6 w-6 sm:h-8 sm:w-8 text-primary mb-3 sm:mb-4" />
              <h3 className="text-base sm:text-lg font-semibold text-primary-light mb-2">
                {integration.title}
              </h3>
              <p className="text-sm sm:text-base text-primary-light/70">
                {integration.description}
              </p>
              <Badge 
                variant="secondary" 
                className="absolute top-2 right-2 sm:top-4 sm:right-4 bg-primary/20 text-xs"
              >
                Bientôt
              </Badge>
              <Button 
                className="w-full mt-3 sm:mt-4 bg-primary/20 hover:bg-primary/30 transition-colors text-sm sm:text-base"
                disabled
              >
                Configurer
              </Button>
            </Card>
          ))}
        </div>
      </section>

      {/* Section Workflows */}
      <section className="space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <h2 className="text-xl font-semibold text-primary-light">Workflows d'automatisation</h2>
          <Button 
            variant="outline" 
            className="border-primary/20 w-full sm:w-auto whitespace-nowrap"
            disabled
          >
            <Workflow className="h-4 w-4 mr-2" />
            {isMobile ? "Nouveau" : "Créer un workflow"}
            <Badge variant="secondary" className="ml-2 bg-primary/20 text-xs">
              Bientôt
            </Badge>
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {workflows.map((workflow) => (
            <Card 
              key={workflow.title} 
              className="p-4 sm:p-6 bg-black/40 border-primary/20 relative group transition-all duration-300 hover:scale-[1.02]"
            >
              <workflow.icon className="h-6 w-6 sm:h-8 sm:w-8 text-primary mb-3 sm:mb-4" />
              <h3 className="text-base sm:text-lg font-semibold text-primary-light mb-2">
                {workflow.title}
              </h3>
              <p className="text-sm sm:text-base text-primary-light/70">
                {workflow.description}
              </p>
              <Badge 
                variant="secondary" 
                className="absolute top-2 right-2 sm:top-4 sm:right-4 bg-primary/20 text-xs"
              >
                Bientôt
              </Badge>
              <Button 
                className="w-full mt-3 sm:mt-4 bg-primary/20 hover:bg-primary/30 transition-colors text-sm sm:text-base"
                disabled
              >
                Explorer
              </Button>
            </Card>
          ))}
        </div>
      </section>
    </motion.div>
  )
}