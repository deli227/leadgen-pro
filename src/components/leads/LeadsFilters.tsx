import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

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
    <Tabs defaultValue="filters" className="w-full">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="filters">Filtres</TabsTrigger>
        <TabsTrigger value="analytics">Analytiques</TabsTrigger>
        <TabsTrigger value="export">Export</TabsTrigger>
      </TabsList>

      <TabsContent value="filters" className="space-y-4">
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
              <SelectItem value="Retail">Commerce de détail</SelectItem>
              <SelectItem value="Manufacturing">Industrie</SelectItem>
              <SelectItem value="Education">Éducation</SelectItem>
              <SelectItem value="RealEstate">Immobilier</SelectItem>
              <SelectItem value="Energy">Énergie</SelectItem>
              <SelectItem value="Agriculture">Agriculture</SelectItem>
              <SelectItem value="Transportation">Transport</SelectItem>
              <SelectItem value="Media">Médias</SelectItem>
              <SelectItem value="Tourism">Tourisme</SelectItem>
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
      </TabsContent>

      <TabsContent value="analytics" className="space-y-4">
        <div className="p-4 border rounded-lg">
          <h3 className="text-lg font-semibold mb-2">Analytiques</h3>
          <p className="text-muted-foreground">
            Les analyses détaillées seront disponibles prochainement.
          </p>
        </div>
      </TabsContent>

      <TabsContent value="export" className="space-y-4">
        <div className="p-4 border rounded-lg">
          <h3 className="text-lg font-semibold mb-2">Export des données</h3>
          <p className="text-muted-foreground">
            Les options d'export seront disponibles prochainement.
          </p>
        </div>
      </TabsContent>
    </Tabs>
  )
}