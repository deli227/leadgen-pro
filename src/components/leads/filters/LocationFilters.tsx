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
  US: [
    "New York", "Los Angeles", "Chicago", "Houston", "Phoenix", "Philadelphia",
    "San Antonio", "San Diego", "Dallas", "San Jose", "Austin", "Jacksonville",
    "Fort Worth", "Columbus", "San Francisco", "Charlotte", "Indianapolis",
    "Seattle", "Denver", "Washington DC", "Boston", "Nashville", "Las Vegas",
    "Portland", "Miami", "Atlanta", "New Orleans", "Minneapolis", "San Diego"
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
  ],
  DE: [
    "Berlin", "Hambourg", "Munich", "Cologne", "Francfort", "Stuttgart", 
    "Düsseldorf", "Dortmund", "Essen", "Leipzig", "Dresde", "Hanovre", 
    "Nuremberg", "Duisbourg", "Bochum", "Wuppertal", "Bielefeld", "Bonn"
  ],
  ES: [
    "Madrid", "Barcelone", "Valence", "Séville", "Saragosse", "Malaga",
    "Murcie", "Palma", "Las Palmas", "Bilbao", "Alicante", "Cordoue",
    "Valladolid", "Vigo", "Gijón", "Grenade", "La Corogne", "Vitoria"
  ],
  IT: [
    "Rome", "Milan", "Naples", "Turin", "Palerme", "Gênes", "Bologne",
    "Florence", "Bari", "Catane", "Venise", "Vérone", "Messine", "Padoue",
    "Trieste", "Brescia", "Parme", "Tarente", "Prato", "Modène"
  ],
  PT: [
    "Lisbonne", "Porto", "Vila Nova de Gaia", "Amadora", "Braga", "Coimbra",
    "Funchal", "Setúbal", "Aveiro", "Évora", "Faro", "Viseu", "Guimarães"
  ],
  IE: [
    "Dublin", "Cork", "Limerick", "Galway", "Waterford", "Drogheda", "Dundalk",
    "Swords", "Bray", "Navan", "Kilkenny", "Ennis", "Carlow", "Tralee"
  ],
  NL: [
    "Amsterdam", "Rotterdam", "La Haye", "Utrecht", "Eindhoven", "Groningue",
    "Tilburg", "Almere", "Breda", "Nimègue", "Apeldoorn", "Haarlem", "Zaanstad"
  ],
  GR: [
    "Athènes", "Thessalonique", "Le Pirée", "Patras", "Héraklion", "Larissa",
    "Volos", "Rhodes", "Ioannina", "Chania", "Chalcis", "Kavala", "Lamia"
  ],
  SE: [
    "Stockholm", "Göteborg", "Malmö", "Uppsala", "Västerås", "Örebro",
    "Linköping", "Helsingborg", "Jönköping", "Norrköping", "Lund", "Umeå"
  ],
  DK: [
    "Copenhague", "Aarhus", "Odense", "Aalborg", "Frederiksberg", "Esbjerg",
    "Randers", "Kolding", "Horsens", "Vejle", "Roskilde", "Herning"
  ],
  NO: [
    "Oslo", "Bergen", "Trondheim", "Stavanger", "Drammen", "Fredrikstad",
    "Kristiansand", "Sandnes", "Tromsø", "Sarpsborg", "Skien", "Ålesund"
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
          <SelectItem value="US">États-Unis</SelectItem>
          <SelectItem value="LU">Luxembourg</SelectItem>
          <SelectItem value="MC">Monaco</SelectItem>
          <SelectItem value="MA">Maroc</SelectItem>
          <SelectItem value="TN">Tunisie</SelectItem>
          <SelectItem value="SN">Sénégal</SelectItem>
          <SelectItem value="CI">Côte d'Ivoire</SelectItem>
          <SelectItem value="DE">Allemagne</SelectItem>
          <SelectItem value="ES">Espagne</SelectItem>
          <SelectItem value="IT">Italie</SelectItem>
          <SelectItem value="PT">Portugal</SelectItem>
          <SelectItem value="IE">Irlande</SelectItem>
          <SelectItem value="NL">Pays-Bas</SelectItem>
          <SelectItem value="GR">Grèce</SelectItem>
          <SelectItem value="SE">Suède</SelectItem>
          <SelectItem value="DK">Danemark</SelectItem>
          <SelectItem value="NO">Norvège</SelectItem>
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