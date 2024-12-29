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
        <SelectTrigger className="w-[180px] bg-black/40 border-primary/20">
          <SelectValue placeholder="Sélectionner une période" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="day">Par jour</SelectItem>
          <SelectItem value="week">Par semaine</SelectItem>
          <SelectItem value="month">Par mois</SelectItem>
        </SelectContent>
      </Select>

      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline" className="bg-black/40 border-primary/20">
            <CalendarIcon className="mr-2 h-4 w-4" />
            {format(date, "d MMMM yyyy", { locale: fr })}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            selected={date}
            onSelect={handleDateSelect}
            initialFocus
          />
        </PopoverContent>
      </Popover>
    </div>
  )
}