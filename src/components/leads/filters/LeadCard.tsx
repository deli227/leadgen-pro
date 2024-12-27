import { Mail, MapPin, Phone, Globe, Facebook, Instagram, Linkedin, Twitter, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { LeadScoreDisplay } from "../LeadScoreDisplay"
import { motion } from "framer-motion"
import { toast } from "sonner"
import { supabase } from "@/integrations/supabase/client"

interface LeadCardProps {
  lead: any
  onAddToAnalytics: (lead: any) => void
  onLeadDeleted: () => void
}

export function LeadCard({ lead, onAddToAnalytics, onLeadDeleted }: LeadCardProps) {
  const handleDelete = async () => {
    try {
      const { error } = await supabase
        .from('leads')
        .delete()
        .eq('id', lead.id);

      if (error) throw error;

      toast.success("Lead supprimé avec succès");
      onLeadDeleted();
    } catch (error) {
      console.error('Erreur lors de la suppression:', error);
      toast.error("Erreur lors de la suppression du lead");
    }
  };

  const formatSocialUrl = (url: string) => {
    if (!url) return '';
    return url.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, '');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="p-4 border border-primary/20 rounded-xl bg-gradient-to-br from-black/40 to-secondary-dark/40 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 group"
    >
      <div className="flex flex-col gap-3">
        <div className="flex justify-between items-start">
          <div className="space-y-1">
            <h4 className="text-base font-semibold text-primary-light group-hover:text-white transition-colors line-clamp-1">
              {lead.company}
            </h4>
            <p className="text-sm text-primary-light/70 line-clamp-1">
              {lead.industry}
            </p>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="text-primary-light/70 hover:text-red-500 hover:bg-red-500/10"
            onClick={handleDelete}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>

        <LeadScoreDisplay score={lead.score} />
        
        <div className="space-y-2">
          {lead.email && (
            <div className="flex items-center gap-2 text-primary-light/80 hover:text-primary-light transition-colors">
              <Mail className="h-4 w-4 flex-shrink-0" />
              <a href={`mailto:${lead.email}`} className="text-sm hover:underline line-clamp-1 break-all">
                {lead.email}
              </a>
            </div>
          )}
          
          {lead.phone && (
            <div className="flex items-center gap-2 text-primary-light/80 hover:text-primary-light transition-colors">
              <Phone className="h-4 w-4 flex-shrink-0" />
              <a href={`tel:${lead.phone}`} className="text-sm hover:underline line-clamp-1">
                {lead.phone}
              </a>
            </div>
          )}
          
          {lead.address && (
            <div className="flex items-center gap-2 text-primary-light/80 hover:text-primary-light transition-colors">
              <MapPin className="h-4 w-4 flex-shrink-0" />
              <span className="text-sm line-clamp-1">{lead.address}</span>
            </div>
          )}

          {lead.website && (
            <div className="flex items-center gap-2 text-primary-light/80 hover:text-primary-light transition-colors">
              <Globe className="h-4 w-4 flex-shrink-0" />
              <a 
                href={lead.website} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-sm hover:underline line-clamp-1"
              >
                {formatSocialUrl(lead.website)}
              </a>
            </div>
          )}
        </div>

        {lead.social_media && (
          <div className="pt-3 border-t border-primary/10 flex gap-3">
            {lead.social_media.linkedin && (
              <a 
                href={lead.social_media.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary-light/70 hover:text-primary transition-colors group relative"
                title={formatSocialUrl(lead.social_media.linkedin)}
              >
                <Linkedin className="h-4 w-4" />
                <span className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-xs opacity-0 group-hover:opacity-100 whitespace-nowrap">
                  {formatSocialUrl(lead.social_media.linkedin)}
                </span>
              </a>
            )}
            {lead.social_media.twitter && (
              <a 
                href={lead.social_media.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary-light/70 hover:text-primary transition-colors group relative"
                title={formatSocialUrl(lead.social_media.twitter)}
              >
                <Twitter className="h-4 w-4" />
                <span className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-xs opacity-0 group-hover:opacity-100 whitespace-nowrap">
                  {formatSocialUrl(lead.social_media.twitter)}
                </span>
              </a>
            )}
            {lead.social_media.facebook && (
              <a 
                href={lead.social_media.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary-light/70 hover:text-primary transition-colors group relative"
                title={formatSocialUrl(lead.social_media.facebook)}
              >
                <Facebook className="h-4 w-4" />
                <span className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-xs opacity-0 group-hover:opacity-100 whitespace-nowrap">
                  {formatSocialUrl(lead.social_media.facebook)}
                </span>
              </a>
            )}
            {lead.social_media.instagram && (
              <a 
                href={lead.social_media.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary-light/70 hover:text-primary transition-colors group relative"
                title={formatSocialUrl(lead.social_media.instagram)}
              >
                <Instagram className="h-4 w-4" />
                <span className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-xs opacity-0 group-hover:opacity-100 whitespace-nowrap">
                  {formatSocialUrl(lead.social_media.instagram)}
                </span>
              </a>
            )}
          </div>
        )}

        <Button
          onClick={() => onAddToAnalytics(lead)}
          variant="outline"
          size="sm"
          className="w-full bg-gradient-to-r from-primary to-primary-dark text-white border-none hover:opacity-90 shadow-lg hover:shadow-xl transition-all duration-300 text-sm"
        >
          Ajouter aux analytiques
        </Button>
      </div>
    </motion.div>
  );
}