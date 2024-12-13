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
    "Paris", "Lyon", "Marseille", "Bordeaux", "Lille", "Toulouse", "Nantes", 
    "Strasbourg", "Nice", "Rennes", "Montpellier", "Reims", "Toulon", "Grenoble", 
    "Dijon", "Angers", "Nîmes", "Saint-Étienne", "Perpignan", "Besançon", "Orléans",
    "Rouen", "Caen", "Nancy", "Metz", "Tours", "Clermont-Ferrand", "Avignon"
  ],
  BE: [
    "Bruxelles", "Anvers", "Gand", "Liège", "Bruges", "Namur", "Louvain", "Mons",
    "Ostende", "Charleroi", "Courtrai", "Hasselt", "Tournai", "Arlon", "Wavre",
    "Malines", "Verviers", "Seraing", "Dinant", "La Louvière"
  ],
  CH: [
    "Genève", "Zurich", "Bâle", "Lausanne", "Berne", "Lucerne", "Winterthour",
    "Saint-Gall", "Lugano", "Bienne", "Thoune", "Köniz", "Fribourg", "Neuchâtel",
    "Vernier", "Sion", "Coire", "Schaffhouse", "Yverdon-les-Bains"
  ],
  CA: [
    "Montréal", "Québec", "Ottawa", "Toronto", "Vancouver", "Calgary", "Edmonton",
    "Winnipeg", "Halifax", "Victoria", "Regina", "Saskatoon", "Gatineau", "Laval",
    "Sherbrooke", "Trois-Rivières", "Longueuil", "Saint-Jean-sur-Richelieu"
  ],
  LU: [
    "Luxembourg", "Esch-sur-Alzette", "Differdange", "Dudelange", "Pétange",
    "Ettelbruck", "Diekirch", "Wiltz", "Echternach", "Remich", "Vianden"
  ],
  MC: ["Monaco", "Monte-Carlo", "La Condamine", "Fontvieille", "Larvotto"],
  MA: [
    "Casablanca", "Rabat", "Marrakech", "Tanger", "Fès", "Meknès", "Oujda",
    "Agadir", "Tétouan", "Safi", "El Jadida", "Kénitra", "Nador", "Essaouira",
    "Mohammedia", "Ouarzazate", "Ifrane"
  ],
  TN: [
    "Tunis", "Sfax", "Sousse", "Kairouan", "Bizerte", "Gabès", "Ariana",
    "Gafsa", "Monastir", "Nabeul", "Hammamet", "Médenine", "Kasserine",
    "La Marsa", "Mahdia", "Djerba", "Tozeur"
  ],
  SN: [
    "Dakar", "Saint-Louis", "Thiès", "Rufisque", "Kaolack", "Ziguinchor",
    "Touba", "Diourbel", "Louga", "Tambacounda", "Kolda", "Mbour", "Fatick"
  ],
  CI: [
    "Abidjan", "Yamoussoukro", "Bouaké", "Korhogo", "San-Pédro", "Daloa",
    "Man", "Divo", "Gagnoa", "Grand-Bassam", "Dabou", "Séguéla", "Abengourou"
  ]
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
        <SelectContent className="bg-secondary-dark border-primary-light text-primary-light max-h-[300px] overflow-y-auto">
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