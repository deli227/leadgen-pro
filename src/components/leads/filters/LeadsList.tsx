import { ScrollArea } from "@/components/ui/scroll-area"
import { LeadCard } from "./LeadCard"

interface LeadsListProps {
  leads: any[]
  onAddToAnalytics: (lead: any) => void
}

export function LeadsList({ leads, onAddToAnalytics }: LeadsListProps) {
  return (
    <div className="mt-4 sm:mt-6">
      <h3 className="text-lg sm:text-xl font-semibold text-primary-light mb-4 sm:mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
        Leads générés
      </h3>
      <ScrollArea className="h-[400px] sm:h-[500px] md:h-[600px] pr-2 sm:pr-4">
        <div className="grid gap-3 sm:gap-4 md:gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
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