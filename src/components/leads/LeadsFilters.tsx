import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

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
  )
}