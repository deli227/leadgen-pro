import { ScrollArea } from "@/components/ui/scroll-area"
import { LeadCard } from "./LeadCard"

interface LeadsListProps {
  leads: any[]
  onAddToAnalytics: (lead: any) => void
}

export function LeadsList({ leads, onAddToAnalytics }: LeadsListProps) {
  return (
    <div className="mt-4">
      <h3 className="text-lg font-semibold mb-4 bg-gradient-to-r from-primary-light to-accent bg-clip-text text-transparent">
        Leads générés
      </h3>
      <ScrollArea className="h-[calc(100vh-20rem)] pr-2">
        <div className="grid gap-3 grid-cols-1">
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