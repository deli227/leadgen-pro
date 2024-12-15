import { useQuery } from "@tanstack/react-query"
import { supabase } from "@/integrations/supabase/client"
import { Card } from "@/components/ui/card"
import { Mail, Calendar, User } from "lucide-react"

export function EmailHistory() {
  const { data: sentEmails } = useQuery({
    queryKey: ['sent-emails'],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) throw new Error('User not authenticated')

      const { data, error } = await supabase
        .from('email_automations')
        .select('*')
        .eq('user_id', user.id)
        .not('last_sent_at', 'is', null)
        .order('last_sent_at', { ascending: false })

      if (error) throw error
      return data
    }
  })

  if (!sentEmails || sentEmails.length === 0) {
    return (
      <div className="text-center py-8 text-primary-light">
        <Mail className="h-12 w-12 mx-auto mb-4 opacity-50" />
        <p className="text-primary-light">Aucun email envoyé pour le moment</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {sentEmails.map((email) => (
        <Card key={email.id} className="p-4 bg-black/40 border-primary/20">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <h4 className="font-medium text-primary-light">{email.name}</h4>
              <span className="text-sm text-primary-light/70 flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                {new Date(email.last_sent_at).toLocaleDateString()}
              </span>
            </div>
            <p className="text-sm text-primary-light/70">{email.subject}</p>
            <div className="flex items-center gap-2 text-primary-light/70">
              <User className="h-4 w-4" />
              <span className="text-sm">
                {email.selected_leads?.length || 0} destinataires
              </span>
            </div>
          </div>
        </Card>
      ))}
    </div>
  )
}