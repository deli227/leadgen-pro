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
  FR: [
    "Paris", "Lyon", "Marseille", "Bordeaux", "Toulouse", 
    "Nantes", "Strasbourg", "Lille", "Montpellier", "Rennes",
    "Nice", "Grenoble", "Tours", "Dijon", "Angers"
  ],
  BE: ["Bruxelles", "Anvers", "Gand", "Liège", "Charleroi"],
  CH: ["Genève", "Zurich", "Bâle", "Lausanne", "Berne"],
  CA: ["Montréal", "Toronto", "Vancouver", "Ottawa", "Québec"],
  LU: ["Luxembourg", "Esch-sur-Alzette", "Differdange"],
  MC: ["Monaco", "Monte-Carlo", "La Condamine"],
  MA: ["Casablanca", "Rabat", "Marrakech", "Tanger", "Fès"],
  TN: ["Tunis", "Sfax", "Sousse", "Kairouan", "Bizerte"],
  SN: ["Dakar", "Thiès", "Saint-Louis", "Rufisque", "Kaolack"],
  CI: ["Abidjan", "Yamoussoukro", "Bouaké", "Daloa", "Korhogo"]
} as const

export function LocationFilters({ 
  country, 
  city, 
  onCountryChange, 
  onCityChange 
}: LocationFiltersProps) {
  const handleCountryChange = (value: string) => {
    console.log("Changement de pays:", value)
    onCountryChange(value)
    // Reset city when country changes
    if (value !== country) {
      onCityChange("all")
    }
  }

  return (
    <div className="flex gap-4">
      <Select 
        value={country}
        onValueChange={handleCountryChange}
      >
        <SelectTrigger className="w-[180px] bg-secondary-dark border-primary-light/20 text-primary-light">
          <SelectValue>
            {country === "all" ? "Tous les pays" : country}
          </SelectValue>
        </SelectTrigger>
        <SelectContent className="bg-secondary-dark border-primary-light/20 text-primary-light">
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
        <SelectTrigger className="w-[180px] bg-secondary-dark border-primary-light/20 text-primary-light">
          <SelectValue>
            {city === "all" ? "Toutes les villes" : city}
          </SelectValue>
        </SelectTrigger>
        <SelectContent className="bg-secondary-dark border-primary-light/20 text-primary-light">
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