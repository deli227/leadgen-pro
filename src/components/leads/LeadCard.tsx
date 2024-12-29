import { Mail, MapPin, Phone, Globe, Facebook, Instagram, Linkedin, Twitter, Trash2, NotebookPen } from "lucide-react"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { toast } from "sonner"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { LeadNotes } from "@/components/leads/LeadNotes"
import { useState } from "react"
import { TagsManager } from "./tags/TagsManager"
import { handleLeadDeletion } from "@/utils/leadUtils"

interface LeadCardProps {
  lead: any
  onAddToAnalytics: (lead: any) => void
  onLeadDeleted: () => void
}

export function LeadCard({ lead, onAddToAnalytics, onLeadDeleted }: LeadCardProps) {
  const [isNotesOpen, setIsNotesOpen] = useState(false)

  const handleDelete = async () => {
    try {
      const error = await handleLeadDeletion(lead.id)

      if (error) {
        console.error('Erreur lors de la suppression:', error)
        toast.error("Erreur lors de la suppression du lead")
        return
      }

      toast.success("Lead supprimé avec succès")
      onLeadDeleted()
    } catch (error) {
      console.error('Erreur lors de la suppression:', error)
      toast.error("Erreur lors de la suppression du lead")
    }
  }

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
          <div className="flex gap-2">
            <Dialog open={isNotesOpen} onOpenChange={setIsNotesOpen}>
              <DialogTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-primary-light/70 hover:text-primary hover:bg-primary/10"
                >
                  <NotebookPen className="h-4 w-4" />
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[600px] bg-transparent border-none p-0">
                <LeadNotes lead={lead} onClose={() => setIsNotesOpen(false)} />
              </DialogContent>
            </Dialog>
            <Button
              variant="ghost"
              size="icon"
              className="text-primary-light/70 hover:text-red-500 hover:bg-red-500/10"
              onClick={handleDelete}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>

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
                href={lead.website.startsWith('http') ? lead.website : `https://${lead.website}`}
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-sm hover:underline line-clamp-1"
              >
                {lead.website.replace(/^https?:\/\//, '')}
              </a>
            </div>
          )}
        </div>

        {lead.socialMedia && (
          <div className="pt-3 border-t border-primary/10 flex gap-3">
            {lead.socialMedia.linkedin && (
              <a 
                href={lead.socialMedia.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary-light/70 hover:text-primary transition-colors"
                title="LinkedIn"
              >
                <Linkedin className="h-4 w-4" />
              </a>
            )}
            {lead.socialMedia.twitter && (
              <a 
                href={lead.socialMedia.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary-light/70 hover:text-primary transition-colors"
                title="X (Twitter)"
              >
                <Twitter className="h-4 w-4" />
              </a>
            )}
            {lead.socialMedia.facebook && (
              <a 
                href={lead.socialMedia.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary-light/70 hover:text-primary transition-colors"
                title="Facebook"
              >
                <Facebook className="h-4 w-4" />
              </a>
            )}
            {lead.socialMedia.instagram && (
              <a 
                href={lead.socialMedia.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary-light/70 hover:text-primary transition-colors"
                title="Instagram"
              >
                <Instagram className="h-4 w-4" />
              </a>
            )}
          </div>
        )}

        <div className="mt-2">
          <TagsManager leadId={lead.id} />
        </div>

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
  )
}
