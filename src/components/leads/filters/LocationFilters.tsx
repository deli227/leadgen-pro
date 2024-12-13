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
  return (
    <div className="flex gap-4">
      <Select 
        defaultValue={country}
        onValueChange={(value) => {
          console.log("Sélection du pays:", value)
          onCountryChange(value)
          onCityChange("all")
        }}
      >
        <SelectTrigger className="w-[180px] bg-transparent border-primary-light/20 text-primary-light">
          <SelectValue placeholder="Pays">
            {country === "all" ? "Tous les pays" : country}
          </SelectValue>
        </SelectTrigger>
        <SelectContent className="bg-secondary-dark/95 border-primary-light/20 text-primary-light">
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

      <Select 
        defaultValue={city}
        onValueChange={onCityChange}
        disabled={country === "all"}
      >
        <SelectTrigger className="w-[180px] bg-transparent border-primary-light/20 text-primary-light">
          <SelectValue placeholder="Ville">
            {city === "all" ? "Toutes les villes" : city}
          </SelectValue>
        </SelectTrigger>
        <SelectContent className="bg-secondary-dark/95 border-primary-light/20 text-primary-light">
          <SelectItem value="all" className="text-primary-light hover:bg-primary/20">Toutes les villes</SelectItem>
          {country !== "all" && citiesByCountry[country as keyof typeof citiesByCountry]?.map((cityName) => (
            <SelectItem 
              key={cityName} 
              value={cityName} 
              className="text-primary-light hover:bg-primary/20"
            >
              {cityName}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}