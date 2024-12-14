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
      className="p-3 sm:p-4 md:p-6 border border-primary/20 rounded-xl bg-gradient-to-br from-black/40 to-secondary-dark/40 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 group flex flex-col h-full"
    >
      <div className="flex flex-col sm:flex-row justify-between items-start gap-2 sm:gap-4 mb-3 sm:mb-4">
        <div className="w-full sm:w-auto">
          <h4 className="text-base sm:text-lg font-semibold text-primary-light group-hover:text-white transition-colors truncate">
            {lead.company}
          </h4>
          <p className="text-xs sm:text-sm text-primary-light/70 truncate">
            {lead.industry}
          </p>
        </div>
        <Button
          onClick={() => onAddToAnalytics(lead)}
          variant="outline"
          size="sm"
          className="w-full sm:w-auto bg-gradient-to-r from-primary to-primary-dark text-white border-none hover:opacity-90 shadow-lg hover:shadow-xl transition-all duration-300 text-xs sm:text-sm whitespace-nowrap"
        >
          Ajouter aux analytiques
        </Button>
      </div>
      
      <div className="space-y-2 sm:space-y-3 flex-grow">
        <LeadScoreDisplay score={lead.score} />
        
        <div className="flex flex-col gap-1.5 sm:gap-2 mt-3 sm:mt-4">
          {lead.email && (
            <div className="flex items-center gap-1.5 sm:gap-2 text-primary-light/80 hover:text-primary-light transition-colors">
              <Mail className="h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0" />
              <a href={`mailto:${lead.email}`} className="hover:underline text-xs sm:text-sm truncate">
                {lead.email}
              </a>
            </div>
          )}
          
          {lead.phone && (
            <div className="flex items-center gap-1.5 sm:gap-2 text-primary-light/80 hover:text-primary-light transition-colors">
              <Phone className="h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0" />
              <a href={`tel:${lead.phone}`} className="hover:underline text-xs sm:text-sm truncate">
                {lead.phone}
              </a>
            </div>
          )}
          
          {lead.address && (
            <div className="flex items-center gap-1.5 sm:gap-2 text-primary-light/80 hover:text-primary-light transition-colors">
              <MapPin className="h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0" />
              <span className="text-xs sm:text-sm truncate">{lead.address}</span>
            </div>
          )}
        </div>

        {(lead.socialMedia?.linkedin || lead.socialMedia?.twitter) && (
          <div className="mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-primary/10 flex gap-3 sm:gap-4">
            {lead.socialMedia.linkedin && (
              <a 
                href={lead.socialMedia.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[10px] sm:text-xs text-primary-light/70 hover:text-primary hover:underline transition-colors"
              >
                LinkedIn
              </a>
            )}
            {lead.socialMedia.twitter && (
              <a 
                href={lead.socialMedia.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[10px] sm:text-xs text-primary-light/70 hover:text-primary hover:underline transition-colors"
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