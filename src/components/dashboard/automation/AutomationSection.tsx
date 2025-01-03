import { Button } from "@/components/ui/button"
import { Settings2, Workflow } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { AutomationCard } from "./AutomationCard"
import { LucideIcon } from "lucide-react"

interface AutomationSectionProps {
  title: string
  buttonIcon: LucideIcon
  buttonText: string
  items: {
    title: string
    description: string
    icon: LucideIcon
    gradient: string
  }[]
}

export function AutomationSection({ title, buttonIcon: ButtonIcon, buttonText, items }: AutomationSectionProps) {
  return (
    <section className="space-y-3 sm:space-y-4">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-4">
        <h2 className="text-base sm:text-xl font-semibold text-primary-light">
          {title}
        </h2>
        <Button 
          variant="outline" 
          className="border-primary/20 w-full sm:w-auto whitespace-nowrap bg-black/40 backdrop-blur-sm hover:bg-primary/10 transition-all duration-300 text-primary-light text-xs sm:text-base h-auto py-1.5 sm:py-2"
          disabled
        >
          <ButtonIcon className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
          {buttonText}
          <Badge variant="secondary" className="ml-1 sm:ml-2 bg-primary/20 text-primary-light text-[10px] sm:text-xs">
            Bientôt
          </Badge>
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-4">
        {items.map((item) => (
          <AutomationCard
            key={item.title}
            {...item}
          />
        ))}
      </div>
    </section>
  )
}