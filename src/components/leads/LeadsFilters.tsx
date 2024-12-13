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
    country: string
    city: string
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
            value={filters.country}
            onValueChange={(value) => setFilters({ ...filters, country: value })}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Pays" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tous les pays</SelectItem>
              <SelectItem value="FR">France</SelectItem>
              <SelectItem value="BE">Belgique</SelectItem>
              <SelectItem value="CH">Suisse</SelectItem>
              <SelectItem value="CA">Canada</SelectItem>
              <SelectItem value="LU">Luxembourg</SelectItem>
              <SelectItem value="MC">Monaco</SelectItem>
              <SelectItem value="MA">Maroc</SelectItem>
              <SelectItem value="TN">Tunisie</SelectItem>
              <SelectItem value="SN">Sénégal</SelectItem>
              <SelectItem value="CI">Côte d'Ivoire</SelectItem>
            </SelectContent>
          </Select>

          <Select
            value={filters.city}
            onValueChange={(value) => setFilters({ ...filters, city: value })}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Ville" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Toutes les villes</SelectItem>
              <SelectItem value="Paris">Paris</SelectItem>
              <SelectItem value="Lyon">Lyon</SelectItem>
              <SelectItem value="Marseille">Marseille</SelectItem>
              <SelectItem value="Bordeaux">Bordeaux</SelectItem>
              <SelectItem value="Toulouse">Toulouse</SelectItem>
              <SelectItem value="Nantes">Nantes</SelectItem>
              <SelectItem value="Strasbourg">Strasbourg</SelectItem>
              <SelectItem value="Lille">Lille</SelectItem>
              <SelectItem value="Montpellier">Montpellier</SelectItem>
              <SelectItem value="Rennes">Rennes</SelectItem>
              <SelectItem value="Bruxelles">Bruxelles</SelectItem>
              <SelectItem value="Genève">Genève</SelectItem>
              <SelectItem value="Montréal">Montréal</SelectItem>
              <SelectItem value="Luxembourg">Luxembourg</SelectItem>
              <SelectItem value="Casablanca">Casablanca</SelectItem>
              <SelectItem value="Tunis">Tunis</SelectItem>
              <SelectItem value="Dakar">Dakar</SelectItem>
              <SelectItem value="Abidjan">Abidjan</SelectItem>
            </SelectContent>
          </Select>
          
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
              <SelectItem value="Construction">Construction</SelectItem>
              <SelectItem value="Consulting">Conseil</SelectItem>
              <SelectItem value="Legal">Services juridiques</SelectItem>
              <SelectItem value="Insurance">Assurance</SelectItem>
              <SelectItem value="Telecom">Télécommunications</SelectItem>
              <SelectItem value="Automotive">Automobile</SelectItem>
              <SelectItem value="Aerospace">Aérospatiale</SelectItem>
              <SelectItem value="Biotechnology">Biotechnologie</SelectItem>
              <SelectItem value="Pharmaceutical">Pharmaceutique</SelectItem>
              <SelectItem value="Entertainment">Divertissement</SelectItem>
              <SelectItem value="Sports">Sport</SelectItem>
              <SelectItem value="Fashion">Mode</SelectItem>
              <SelectItem value="Food">Alimentation</SelectItem>
              <SelectItem value="Hospitality">Hôtellerie</SelectItem>
              <SelectItem value="NGO">ONG</SelectItem>
              <SelectItem value="Government">Secteur public</SelectItem>
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