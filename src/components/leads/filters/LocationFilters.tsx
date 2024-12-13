import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface LocationFiltersProps {
  country: string
  city: string
  onCountryChange: (value: string) => void
  onCityChange: (value: string) => void
}

export function LocationFilters({ 
  country, 
  city, 
  onCountryChange, 
  onCityChange 
}: LocationFiltersProps) {
  return (
    <>
      <Select value={country} onValueChange={onCountryChange}>
        <SelectTrigger className="w-[180px] bg-transparent border-primary-light text-primary-light">
          <SelectValue placeholder="Pays" />
        </SelectTrigger>
        <SelectContent className="bg-secondary-dark border-primary-light">
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

      <Select value={city} onValueChange={onCityChange}>
        <SelectTrigger className="w-[180px] bg-transparent border-primary-light text-primary-light">
          <SelectValue placeholder="Ville" />
        </SelectTrigger>
        <SelectContent className="bg-secondary-dark border-primary-light">
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
    </>
  )
}