import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Lead } from "@/types/leads";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export function useLeadActions() {
  const [aiAnalysis, setAiAnalysis] = useState<Record<string, string>>({});
  const queryClient = useQueryClient();

  const handleDelete = async (lead: Lead) => {
    try {
      const { data: { session }, error: sessionError } = await supabase.auth.getSession();
      
      if (sessionError || !session) {
        console.error('Erreur de session:', sessionError);
        toast.error("Erreur d'authentification", {
          description: "Veuillez vous reconnecter pour effectuer cette action"
        });
        return;
      }

      console.log('Tentative de suppression du lead:', lead.id, 'par utilisateur:', session.user.id);
      
      const { error } = await supabase
        .from('leads')
        .delete()
        .eq('id', lead.id)
        .eq('user_id', session.user.id);

      if (error) {
        console.error('Erreur détaillée lors de la suppression:', error);
        toast.error("Erreur", {
          description: "Une erreur est survenue lors de la suppression du lead"
        });
        return;
      }

      console.log('Lead supprimé avec succès:', lead.id);
      toast.success("Succès", {
        description: "Le lead a été supprimé avec succès"
      });
      
      queryClient.invalidateQueries({ queryKey: ['leads'] });
    } catch (error) {
      console.error('Erreur lors de la suppression:', error);
      toast.error("Erreur", {
        description: "Une erreur est survenue lors de la suppression du lead"
      });
    }
  };

  const handleAnalyze = async (lead: Lead) => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        toast.error("Erreur d'authentification");
        return;
      }

      console.log('Analyse du lead:', lead.id, 'par utilisateur:', session.user.id);
      
      const analysis = `Analyse IA pour ${lead.company}:\n- Force principale: ${lead.strengths[0]}\n- Point d'amélioration: ${lead.weaknesses[0]}`;
      setAiAnalysis(prev => ({ ...prev, [lead.id]: analysis }));
      
      toast.success("Analyse terminée", {
        description: "L'analyse IA a été générée avec succès"
      });
    } catch (error) {
      console.error('Erreur lors de l\'analyse:', error);
      toast.error("Erreur", {
        description: "Impossible de générer l'analyse IA"
      });
    }
  };

  return {
    aiAnalysis,
    handleDelete,
    handleAnalyze
  };
}