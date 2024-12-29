import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { CalendarIcon } from "lucide-react"
import { format } from "date-fns"
import { fr } from "date-fns/locale"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface DateRangeSelectorProps {
  onRangeChange: (range: { start: Date; end: Date }) => void
  onPeriodChange: (period: "day" | "week" | "month") => void
}

export function DateRangeSelector({ onRangeChange, onPeriodChange }: DateRangeSelectorProps) {
  const [date, setDate] = useState<Date>(new Date())
  const [period, setPeriod] = useState<"day" | "week" | "month">("day")

  const handleDateSelect = (selectedDate: Date | undefined) => {
    if (!selectedDate) return
    
    setDate(selectedDate)
    let start = new Date(selectedDate)
    let end = new Date(selectedDate)

    switch (period) {
      case "week":
        start.setDate(start.getDate() - start.getDay()) // Début de la semaine (Dimanche)
        end.setDate(end.getDate() + (6 - end.getDay())) // Fin de la semaine (Samedi)
        break
      case "month":
        start.setDate(1) // Premier jour du mois
        end.setMonth(end.getMonth() + 1)
        end.setDate(0) // Dernier jour du mois
        break
      default:
        // Pour "day", start et end sont les mêmes
        break
    }

    onRangeChange({ start, end })
  }

  const handlePeriodChange = (newPeriod: "day" | "week" | "month") => {
    setPeriod(newPeriod)
    onPeriodChange(newPeriod)
    handleDateSelect(date) // Recalculer la plage avec la nouvelle période
  }

  return (
    <div className="flex items-center gap-4">
      <Select value={period} onValueChange={handlePeriodChange}>
        <SelectTrigger className="w-[180px] bg-black/60 border-primary text-primary-light hover:bg-black/70 transition-colors">
          <SelectValue placeholder="Sélectionner une période" />
        </SelectTrigger>
        <SelectContent className="bg-black/90 border-primary">
          <SelectItem value="day" className="text-primary-light hover:bg-primary/20">Par jour</SelectItem>
          <SelectItem value="week" className="text-primary-light hover:bg-primary/20">Par semaine</SelectItem>
          <SelectItem value="month" className="text-primary-light hover:bg-primary/20">Par mois</SelectItem>
        </SelectContent>
      </Select>

      <Popover>
        <PopoverTrigger asChild>
          <Button 
            variant="outline" 
            className={`
              min-w-[200px] bg-black/60 border-primary text-primary-light
              hover:bg-black/70 hover:border-primary-light transition-colors
              ${period === 'week' ? 'font-semibold' : ''}
              ${period === 'month' ? 'font-semibold' : ''}
            `}
          >
            <CalendarIcon className="mr-2 h-5 w-5 text-primary" />
            {format(date, "d MMMM yyyy", { locale: fr })}
          </Button>
        </PopoverTrigger>
        <PopoverContent 
          className="w-auto p-0 bg-black/90 border-primary" 
          align="start"
        >
          <Calendar
            mode="single"
            selected={date}
            onSelect={handleDateSelect}
            initialFocus
            className="rounded-md bg-transparent"
            classNames={{
              months: "space-y-4 text-primary-light",
              month: "space-y-4",
              caption: "flex justify-center pt-1 relative items-center text-primary-light",
              caption_label: "text-lg font-medium",
              nav: "space-x-1 flex items-center",
              nav_button: "h-8 w-8 bg-transparent p-0 opacity-70 hover:opacity-100 transition-opacity",
              nav_button_previous: "absolute left-1",
              nav_button_next: "absolute right-1",
              table: "w-full border-collapse space-y-1",
              head_row: "flex",
              head_cell: "text-primary-light/70 rounded-md w-9 font-normal text-[0.8rem]",
              row: "flex w-full mt-2",
              cell: `
                relative p-0 text-center text-sm focus-within:relative 
                focus-within:z-20 [&:has([aria-selected])]:bg-primary/20
              `,
              day: `
                h-9 w-9 p-0 font-normal text-primary-light/90 
                hover:bg-primary/30 hover:text-primary-light
                focus:bg-primary/40 focus:text-primary-light
                aria-selected:opacity-100 rounded-md
              `,
              day_selected: "bg-primary/40 text-primary-light font-semibold hover:bg-primary/50",
              day_today: "bg-accent/20 text-accent-foreground",
              day_outside: "text-primary-light/50 opacity-50",
              day_disabled: "text-primary-light/30",
              day_range_middle: "aria-selected:bg-accent aria-selected:text-accent-foreground",
              day_hidden: "invisible",
            }}
          />
        </PopoverContent>
      </Popover>
    </div>
  )
}