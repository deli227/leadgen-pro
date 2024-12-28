import { Lead } from "@/types/leads"
import { LeadActions } from "../LeadActions"
import { LeadScoreDisplay } from "../LeadScoreDisplay"
import { Mail, MapPin, Phone, Globe, Facebook, Linkedin, Twitter } from "lucide-react"

interface LeadCardProps {
  lead: Lead
  onAddToAnalytics?: (lead: Lead) => void
  onAddToExport?: (lead: Lead) => void
  onDelete?: (lead: Lead) => void
  showActions?: boolean
}

export function LeadCard({
  lead,
  onAddToAnalytics,
  onAddToExport,
  onDelete,
  showActions = true
}: LeadCardProps) {
  const renderSocialLink = (url: string | undefined, Icon: any, platform: string) => {
    if (!url) return null;
    return (
      <a 
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="text-primary-light/70 hover:text-primary transition-colors"
        title={platform}
      >
        <Icon className="h-4 w-4" />
      </a>
    );
  };

  return (
    <div className="p-4 border border-primary/20 rounded-xl bg-gradient-to-br from-black/40 to-secondary-dark/40 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 group">
      <div className="flex flex-col gap-3">
        <div className="flex justify-between items-start">
          <div className="space-y-1">
            <h4 className="text-base font-semibold text-primary-light group-hover:text-white transition-colors line-clamp-1">
              {lead.company}
            </h4>
            {lead.industry && (
              <p className="text-sm text-primary-light/70 line-clamp-1">
                {lead.industry}
              </p>
            )}
          </div>
          {lead.score && <LeadScoreDisplay score={lead.score} />}
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
                href={lead.website} 
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
            {renderSocialLink(lead.socialMedia.linkedin, Linkedin, "LinkedIn")}
            {renderSocialLink(lead.socialMedia.twitter, Twitter, "Twitter")}
            {renderSocialLink(lead.socialMedia.facebook, Facebook, "Facebook")}
          </div>
        )}

        {showActions && onAddToAnalytics && onAddToExport && (
          <LeadActions
            lead={lead}
            onAnalyze={() => onAddToAnalytics(lead)}
            onShowNotes={() => {}}
            onAddToExport={() => onAddToExport(lead)}
            onDelete={onDelete ? () => onDelete(lead) : undefined}
          />
        )}
      </div>
    </div>
  );
}