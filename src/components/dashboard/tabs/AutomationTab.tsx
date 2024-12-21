import { motion } from "framer-motion"
import { Bot, Webhook, Plug, Workflow, Bell, Settings2 } from "lucide-react"
import { useTranslation } from "react-i18next"
import { AutomationSection } from "../automation/AutomationSection"

export function AutomationTab() {
  const { t } = useTranslation()

  const integrations = [
    {
      title: "OpenAI",
      description: "Analyse automatique des leads avec l'IA",
      icon: Bot,
      gradient: "from-purple-500/20 to-blue-500/20",
    },
    {
      title: "Webhooks",
      description: "Notifications temps réel",
      icon: Webhook,
      gradient: "from-orange-500/20 to-red-500/20",
    },
    {
      title: "API Personnalisée",
      description: "Connectez vos outils préférés",
      icon: Plug,
      gradient: "from-green-500/20 to-emerald-500/20",
    },
  ]

  const workflows = [
    {
      title: "Enrichissement des leads",
      description: "Enrichissez automatiquement vos leads avec des données externes",
      icon: Workflow,
      gradient: "from-blue-500/20 to-cyan-500/20",
    },
    {
      title: "Qualification IA",
      description: "Qualifiez vos leads automatiquement avec l'IA",
      icon: Bot,
      gradient: "from-violet-500/20 to-purple-500/20",
    },
    {
      title: "Notifications",
      description: "Recevez des alertes pour les leads importants",
      icon: Bell,
      gradient: "from-pink-500/20 to-rose-500/20",
    },
  ]

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
      className="space-y-8 p-2 sm:p-4"
    >
      <AutomationSection
        title="Intégrations API"
        buttonIcon={Settings2}
        buttonText="Gérer les clés API"
        items={integrations}
      />

      <AutomationSection
        title="Workflows d'automatisation"
        buttonIcon={Workflow}
        buttonText="Créer un workflow"
        items={workflows}
      />
    </motion.div>
  )
}