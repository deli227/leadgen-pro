import { useState } from "react"
import { supabase } from "@/integrations/supabase/client"
import { toast } from "sonner"

export interface NewAutomation {
  name: string
  subject: string
  template: string
  trigger_score: number
  is_active: boolean
  send_time: string
  follow_up_days: number
  sender_email: string
}

export const useCreateAutomation = (onSuccess: () => void) => {
  const [newAutomation, setNewAutomation] = useState<NewAutomation>({
    name: "",
    subject: "",
    template: "",
    trigger_score: 7,
    is_active: true,
    send_time: "09:00",
    follow_up_days: 3,
    sender_email: ""
  })

  const validateAutomation = () => {
    if (!newAutomation.name) {
      toast.error("Le nom de l'automatisation est requis")
      return false
    }

    if (!newAutomation.subject) {
      toast.error("Le sujet de l'email est requis")
      return false
    }

    if (!newAutomation.template) {
      toast.error("Le template de l'email est requis")
      return false
    }

    if (!newAutomation.sender_email) {
      toast.error("L'email d'expédition est requis")
      return false
    }

    return true
  }

  const handleCreateAutomation = async () => {
    if (!validateAutomation()) return

    try {
      console.log("Début de la création de l'automatisation...")
      
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        toast.error("Vous devez être connecté pour créer une automatisation")
        return
      }

      console.log("Utilisateur authentifié:", user.id)
      console.log("Données de l'automatisation:", newAutomation)

      const { data, error } = await supabase
        .from('email_automations')
        .insert([{ 
          ...newAutomation, 
          user_id: user.id,
          selected_leads: [],
          sender_email: newAutomation.sender_email 
        }])
        .select()

      console.log("Réponse de Supabase:", { data, error })

      if (error) {
        console.error("Erreur détaillée:", error)
        throw error
      }

      toast.success("Automatisation créée avec succès")
      onSuccess()
      setNewAutomation({
        name: "",
        subject: "",
        template: "",
        trigger_score: 7,
        is_active: true,
        send_time: "09:00",
        follow_up_days: 3,
        sender_email: ""
      })
    } catch (error) {
      console.error('Erreur détaillée:', error)
      toast.error("Erreur lors de la création de l'automatisation. Vérifiez la console pour plus de détails.")
    }
  }

  return {
    newAutomation,
    setNewAutomation,
    handleCreateAutomation
  }
}