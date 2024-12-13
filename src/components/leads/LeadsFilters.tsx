import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"

interface LeadsFiltersProps {
  filters: {
    search: string
    minScore: number
    maxScore: number
    industry: string
  }
  setFilters: (filters: any) => void
}

export function LeadsFilters({ filters, setFilters }: LeadsFiltersProps) {
  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-4">
        <div className="flex-1 min-w-[200px]">
          <Input
            placeholder="Rechercher une entreprise..."
            value={filters.search}
            onChange={(e) => setFilters({ ...filters, search: e.target.value })}
          />
        </div>
        
        <Select
          value={filters.industry}
          onValueChange={(value) => setFilters({ ...filters, industry: value })}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Secteur d'activité" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tous les secteurs</SelectItem>
            <SelectItem value="Technology">Technologie</SelectItem>
            <SelectItem value="Environmental">Environnement</SelectItem>
            <SelectItem value="Finance">Finance</SelectItem>
            <SelectItem value="Healthcare">Santé</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Score IA (min-max)</label>
        <div className="px-2">
          <Slider
            defaultValue={[filters.minScore, filters.maxScore]}
            max={10}
            step={0.5}
            onValueChange={([min, max]) => 
              setFilters({ ...filters, minScore: min, maxScore: max })
            }
          />
        </div>
        <div className="flex justify-between text-sm text-muted-foreground">
          <span>{filters.minScore}</span>
          <span>{filters.maxScore}</span>
        </div>
      </div>
    </div>
  )
}