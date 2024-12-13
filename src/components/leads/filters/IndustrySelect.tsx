import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface IndustrySelectProps {
  value: string
  onChange: (value: string) => void
}

export function IndustrySelect({ value, onChange }: IndustrySelectProps) {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className="w-[180px] bg-transparent border-primary-light text-primary-light">
        <SelectValue placeholder="Secteur d'activité" />
      </SelectTrigger>
      <SelectContent className="bg-secondary-dark/95 border-primary-light text-primary-light">
        <SelectItem value="all" className="text-primary-light hover:bg-primary/20">Tous les secteurs</SelectItem>
        <SelectItem value="Technology" className="text-primary-light hover:bg-primary/20">Technologie</SelectItem>
        <SelectItem value="Environmental" className="text-primary-light hover:bg-primary/20">Environnement</SelectItem>
        <SelectItem value="Finance" className="text-primary-light hover:bg-primary/20">Finance</SelectItem>
        <SelectItem value="Healthcare" className="text-primary-light hover:bg-primary/20">Santé</SelectItem>
        <SelectItem value="Retail" className="text-primary-light hover:bg-primary/20">Commerce de détail</SelectItem>
        <SelectItem value="Manufacturing" className="text-primary-light hover:bg-primary/20">Industrie</SelectItem>
        <SelectItem value="Education" className="text-primary-light hover:bg-primary/20">Éducation</SelectItem>
        <SelectItem value="RealEstate" className="text-primary-light hover:bg-primary/20">Immobilier</SelectItem>
        <SelectItem value="Energy" className="text-primary-light hover:bg-primary/20">Énergie</SelectItem>
        <SelectItem value="Agriculture" className="text-primary-light hover:bg-primary/20">Agriculture</SelectItem>
        <SelectItem value="Transportation" className="text-primary-light hover:bg-primary/20">Transport</SelectItem>
        <SelectItem value="Media" className="text-primary-light hover:bg-primary/20">Médias</SelectItem>
        <SelectItem value="Tourism" className="text-primary-light hover:bg-primary/20">Tourisme</SelectItem>
        <SelectItem value="Construction" className="text-primary-light hover:bg-primary/20">Construction</SelectItem>
        <SelectItem value="Consulting" className="text-primary-light hover:bg-primary/20">Conseil</SelectItem>
        <SelectItem value="Legal" className="text-primary-light hover:bg-primary/20">Services juridiques</SelectItem>
        <SelectItem value="Insurance" className="text-primary-light hover:bg-primary/20">Assurance</SelectItem>
        <SelectItem value="Telecom" className="text-primary-light hover:bg-primary/20">Télécommunications</SelectItem>
        <SelectItem value="Automotive" className="text-primary-light hover:bg-primary/20">Automobile</SelectItem>
        <SelectItem value="Aerospace" className="text-primary-light hover:bg-primary/20">Aérospatiale</SelectItem>
        <SelectItem value="Biotechnology" className="text-primary-light hover:bg-primary/20">Biotechnologie</SelectItem>
        <SelectItem value="Pharmaceutical" className="text-primary-light hover:bg-primary/20">Pharmaceutique</SelectItem>
        <SelectItem value="Entertainment" className="text-primary-light hover:bg-primary/20">Divertissement</SelectItem>
        <SelectItem value="Sports" className="text-primary-light hover:bg-primary/20">Sport</SelectItem>
        <SelectItem value="Fashion" className="text-primary-light hover:bg-primary/20">Mode</SelectItem>
        <SelectItem value="Food" className="text-primary-light hover:bg-primary/20">Alimentation</SelectItem>
        <SelectItem value="Hospitality" className="text-primary-light hover:bg-primary/20">Hôtellerie</SelectItem>
        <SelectItem value="NGO" className="text-primary-light hover:bg-primary/20">ONG</SelectItem>
        <SelectItem value="Government" className="text-primary-light hover:bg-primary/20">Secteur public</SelectItem>
      </SelectContent>
    </Select>
  )
}