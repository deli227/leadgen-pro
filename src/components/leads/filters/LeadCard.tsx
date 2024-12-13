import { Mail, MapPin, Phone } from "lucide-react"
import { Button } from "@/components/ui/button"
import { LeadScoreDisplay } from "../LeadScoreDisplay"
import { motion } from "framer-motion"

interface LeadCardProps {
  lead: any
  onAddToAnalytics: (lead: any) => void
}

export function LeadCard({ lead, onAddToAnalytics }: LeadCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="p-6 border border-primary/20 rounded-xl bg-gradient-to-br from-black/40 to-secondary-dark/40 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 group"
    >
      <div className="flex justify-between items-start mb-4">
        <div>
          <h4 className="text-lg font-semibold text-primary-light group-hover:text-white transition-colors">
            {lead.company}
          </h4>
          <p className="text-sm text-primary-light/70">{lead.industry}</p>
        </div>
        <Button
          onClick={() => onAddToAnalytics(lead)}
          variant="outline"
          size="sm"
          className="bg-gradient-to-r from-primary to-primary-dark text-white border-none hover:opacity-90 shadow-lg hover:shadow-xl transition-all duration-300"
        >
          Ajouter aux analytiques
        </Button>
      </div>
      
      <div className="space-y-3">
        <LeadScoreDisplay score={lead.score} />
        
        <div className="flex flex-col gap-2 mt-4">
          {lead.email && (
            <div className="flex items-center gap-2 text-primary-light/80 hover:text-primary-light transition-colors">
              <Mail className="h-4 w-4" />
              <a href={`mailto:${lead.email}`} className="hover:underline">
                {lead.email}
              </a>
            </div>
          )}
          
          {lead.phone && (
            <div className="flex items-center gap-2 text-primary-light/80 hover:text-primary-light transition-colors">
              <Phone className="h-4 w-4" />
              <a href={`tel:${lead.phone}`} className="hover:underline">
                {lead.phone}
              </a>
            </div>
          )}
          
          {lead.address && (
            <div className="flex items-center gap-2 text-primary-light/80 hover:text-primary-light transition-colors">
              <MapPin className="h-4 w-4" />
              <span>{lead.address}</span>
            </div>
          )}
        </div>

        {(lead.socialMedia?.linkedin || lead.socialMedia?.twitter) && (
          <div className="mt-4 pt-4 border-t border-primary/10 flex gap-4">
            {lead.socialMedia.linkedin && (
              <a 
                href={lead.socialMedia.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-primary-light/70 hover:text-primary hover:underline transition-colors"
              >
                LinkedIn
              </a>
            )}
            {lead.socialMedia.twitter && (
              <a 
                href={lead.socialMedia.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-primary-light/70 hover:text-primary hover:underline transition-colors"
              >
                Twitter
              </a>
            )}
          </div>
        )}
      </div>
    </motion.div>
  )
}