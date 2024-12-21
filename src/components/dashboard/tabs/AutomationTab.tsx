import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Webhook, Bot, Bell, Workflow, Plug, Settings2 } from "lucide-react"
import { useTranslation } from "react-i18next"

export function AutomationTab() {
  const { t } = useTranslation()

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
      className="space-y-8"
    >
      {/* Section Intégrations */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-primary-light">Intégrations API</h2>
          <Button variant="outline" className="border-primary/20" disabled>
            <Settings2 className="h-4 w-4 mr-2" />
            Gérer les clés API
            <Badge variant="secondary" className="ml-2 bg-primary/20">Bientôt</Badge>
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {integrations.map((integration) => (
            <Card key={integration.title} className="p-6 bg-black/40 border-primary/20 relative group">
              <integration.icon className="h-8 w-8 text-primary mb-4" />
              <h3 className="text-lg font-semibold text-primary-light mb-2">{integration.title}</h3>
              <p className="text-primary-light/70">{integration.description}</p>
              <Badge 
                variant="secondary" 
                className="absolute top-4 right-4 bg-primary/20"
              >
                Bientôt
              </Badge>
              <Button 
                className="w-full mt-4 bg-primary/20 hover:bg-primary/30 transition-colors"
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
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-primary-light">Workflows d'automatisation</h2>
          <Button variant="outline" className="border-primary/20" disabled>
            <Workflow className="h-4 w-4 mr-2" />
            Créer un workflow
            <Badge variant="secondary" className="ml-2 bg-primary/20">Bientôt</Badge>
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {workflows.map((workflow) => (
            <Card key={workflow.title} className="p-6 bg-black/40 border-primary/20 relative group">
              <workflow.icon className="h-8 w-8 text-primary mb-4" />
              <h3 className="text-lg font-semibold text-primary-light mb-2">{workflow.title}</h3>
              <p className="text-primary-light/70">{workflow.description}</p>
              <Badge 
                variant="secondary" 
                className="absolute top-4 right-4 bg-primary/20"
              >
                Bientôt
              </Badge>
              <Button 
                className="w-full mt-4 bg-primary/20 hover:bg-primary/30 transition-colors"
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