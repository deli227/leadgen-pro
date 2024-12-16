import { motion } from "framer-motion"
import { EmailAutomationTab } from "@/components/email/EmailAutomationTab"

export function AutomationTab() {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
    >
      <EmailAutomationTab />
    </motion.div>
  )
}