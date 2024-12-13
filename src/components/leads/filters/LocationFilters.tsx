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
        <SelectContent className="bg-secondary-dark/95 border-primary-light text-primary-light">
          <SelectItem value="all" className="text-primary-light hover:bg-primary/20">Tous les pays</SelectItem>
          <SelectItem value="FR" className="text-primary-light hover:bg-primary/20">France</SelectItem>
          <SelectItem value="BE" className="text-primary-light hover:bg-primary/20">Belgique</SelectItem>
          <SelectItem value="CH" className="text-primary-light hover:bg-primary/20">Suisse</SelectItem>
          <SelectItem value="CA" className="text-primary-light hover:bg-primary/20">Canada</SelectItem>
          <SelectItem value="LU" className="text-primary-light hover:bg-primary/20">Luxembourg</SelectItem>
          <SelectItem value="MC" className="text-primary-light hover:bg-primary/20">Monaco</SelectItem>
          <SelectItem value="MA" className="text-primary-light hover:bg-primary/20">Maroc</SelectItem>
          <SelectItem value="TN" className="text-primary-light hover:bg-primary/20">Tunisie</SelectItem>
          <SelectItem value="SN" className="text-primary-light hover:bg-primary/20">Sénégal</SelectItem>
          <SelectItem value="CI" className="text-primary-light hover:bg-primary/20">Côte d'Ivoire</SelectItem>
        </SelectContent>
      </Select>

      <Select value={city} onValueChange={onCityChange}>
        <SelectTrigger className="w-[180px] bg-transparent border-primary-light text-primary-light">
          <SelectValue placeholder="Ville" />
        </SelectTrigger>
        <SelectContent className="bg-secondary-dark/95 border-primary-light text-primary-light">
          <SelectItem value="all" className="text-primary-light hover:bg-primary/20">Toutes les villes</SelectItem>
          <SelectItem value="Paris" className="text-primary-light hover:bg-primary/20">Paris</SelectItem>
          <SelectItem value="Lyon" className="text-primary-light hover:bg-primary/20">Lyon</SelectItem>
          <SelectItem value="Marseille" className="text-primary-light hover:bg-primary/20">Marseille</SelectItem>
          <SelectItem value="Bordeaux" className="text-primary-light hover:bg-primary/20">Bordeaux</SelectItem>
          <SelectItem value="Toulouse" className="text-primary-light hover:bg-primary/20">Toulouse</SelectItem>
          <SelectItem value="Nantes" className="text-primary-light hover:bg-primary/20">Nantes</SelectItem>
          <SelectItem value="Strasbourg" className="text-primary-light hover:bg-primary/20">Strasbourg</SelectItem>
          <SelectItem value="Lille" className="text-primary-light hover:bg-primary/20">Lille</SelectItem>
          <SelectItem value="Montpellier" className="text-primary-light hover:bg-primary/20">Montpellier</SelectItem>
          <SelectItem value="Rennes" className="text-primary-light hover:bg-primary/20">Rennes</SelectItem>
          <SelectItem value="Bruxelles" className="text-primary-light hover:bg-primary/20">Bruxelles</SelectItem>
          <SelectItem value="Genève" className="text-primary-light hover:bg-primary/20">Genève</SelectItem>
          <SelectItem value="Montréal" className="text-primary-light hover:bg-primary/20">Montréal</SelectItem>
          <SelectItem value="Luxembourg" className="text-primary-light hover:bg-primary/20">Luxembourg</SelectItem>
          <SelectItem value="Casablanca" className="text-primary-light hover:bg-primary/20">Casablanca</SelectItem>
          <SelectItem value="Tunis" className="text-primary-light hover:bg-primary/20">Tunis</SelectItem>
          <SelectItem value="Dakar" className="text-primary-light hover:bg-primary/20">Dakar</SelectItem>
          <SelectItem value="Abidjan" className="text-primary-light hover:bg-primary/20">Abidjan</SelectItem>
        </SelectContent>
      </Select>
    </>
  )
}