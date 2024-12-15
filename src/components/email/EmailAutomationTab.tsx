import { useQuery } from "@tanstack/react-query"
import { supabase } from "@/integrations/supabase/client"
import { NewAutomationForm } from "./NewAutomationForm"
import { AutomationList } from "./AutomationList"
import { EmailHistory } from "./EmailHistory"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Mail, History } from "lucide-react"
import { toast } from "sonner"

export function EmailAutomationTab() {
  const { data: automations, refetch } = useQuery({
    queryKey: ['email-automations'],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) throw new Error('User not authenticated')

      const { data, error } = await supabase
        .from('email_automations')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })

      if (error) throw error
      return data
    }
  })

  const handleSendEmails = async (automation: any) => {
    try {
      const { error } = await supabase
        .from('email_automations')
        .update({ 
          last_sent_at: new Date().toISOString()
        })
        .eq('id', automation.id)

      if (error) throw error

      toast.success("Emails envoyés avec succès")
      refetch()
    } catch (error) {
      console.error('Error:', error)
      toast.error("Erreur lors de l'envoi des emails")
    }
  }

  return (
    <div className="space-y-6 p-4 bg-gradient-to-br from-black/80 to-secondary-dark/80 rounded-xl border border-primary/10">
      <NewAutomationForm onSuccess={refetch} />
      
      <Tabs defaultValue="automations" className="space-y-4">
        <TabsList className="grid w-full grid-cols-2 bg-black/40 border border-primary/20 rounded-xl overflow-hidden">
          <TabsTrigger 
            value="automations" 
            className="text-primary-light data-[state=active]:bg-primary/20"
          >
            <Mail className="h-4 w-4 mr-2" />
            Automatisations
          </TabsTrigger>
          <TabsTrigger 
            value="history" 
            className="text-primary-light data-[state=active]:bg-primary/20"
          >
            <History className="h-4 w-4 mr-2" />
            Historique
          </TabsTrigger>
        </TabsList>

        <TabsContent value="automations">
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-primary-light">Automatisations existantes</h3>
            <AutomationList 
              automations={automations} 
              onUpdate={refetch}
              onSend={handleSendEmails}
            />
          </div>
        </TabsContent>

        <TabsContent value="history">
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-primary-light">Historique des envois</h3>
            <EmailHistory />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}