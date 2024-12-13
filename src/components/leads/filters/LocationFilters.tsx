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

const citiesByCountry = {
  FR: ["Paris", "Lyon", "Marseille", "Bordeaux", "Lille", "Toulouse", "Nantes", "Strasbourg"],
  BE: ["Bruxelles", "Anvers", "Gand", "Liège", "Bruges"],
  CH: ["Genève", "Zurich", "Bâle", "Lausanne", "Berne"],
  CA: ["Montréal", "Québec", "Ottawa", "Toronto", "Vancouver"],
  LU: ["Luxembourg"],
  MC: ["Monaco"],
  MA: ["Casablanca", "Rabat", "Marrakech", "Tanger", "Fès"],
  TN: ["Tunis", "Sfax", "Sousse", "Kairouan"],
  SN: ["Dakar", "Saint-Louis", "Thiès", "Rufisque"],
  CI: ["Abidjan", "Yamoussoukro", "Bouaké", "Korhogo"]
}

export function LocationFilters({ 
  country, 
  city, 
  onCountryChange, 
  onCityChange 
}: LocationFiltersProps) {
  return (
    <div className="flex gap-4">
      <Select 
        value={country}
        onValueChange={onCountryChange}
      >
        <SelectTrigger className="w-[180px] bg-secondary-dark border-primary-light text-primary-light">
          <SelectValue placeholder="Pays">
            {country === "all" ? "Tous les pays" : country}
          </SelectValue>
        </SelectTrigger>
        <SelectContent className="bg-secondary-dark border-primary-light text-primary-light">
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
        value={city}
        onValueChange={onCityChange}
        disabled={country === "all"}
      >
        <SelectTrigger className="w-[180px] bg-secondary-dark border-primary-light text-primary-light">
          <SelectValue placeholder="Ville">
            {city === "all" ? "Toutes les villes" : city}
          </SelectValue>
        </SelectTrigger>
        <SelectContent className="bg-secondary-dark border-primary-light text-primary-light">
          <SelectItem value="all">Toutes les villes</SelectItem>
          {country !== "all" && citiesByCountry[country as keyof typeof citiesByCountry]?.map((cityName) => (
            <SelectItem 
              key={cityName} 
              value={cityName}
            >
              {cityName}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}