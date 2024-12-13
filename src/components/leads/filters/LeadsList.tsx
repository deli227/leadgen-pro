import { ScrollArea } from "@/components/ui/scroll-area"
import { LeadCard } from "./LeadCard"

interface LeadsListProps {
  leads: any[]
  onAddToAnalytics: (lead: any) => void
}

export function LeadsList({ leads, onAddToAnalytics }: LeadsListProps) {
  return (
    <div className="mt-6">
      <h3 className="text-xl font-semibold text-primary-light mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
        Leads générés
      </h3>
      <ScrollArea className="h-[600px] pr-4">
        <div className="space-y-6">
          {leads.map((lead) => (
            <LeadCard
              key={lead.id}
              lead={lead}
              onAddToAnalytics={onAddToAnalytics}
            />
          ))}
        </div>
      </ScrollArea>
    </div>
  )
}