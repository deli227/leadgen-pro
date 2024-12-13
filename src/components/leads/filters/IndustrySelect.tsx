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
      <SelectContent className="bg-secondary-dark border-primary-light">
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
  )
}