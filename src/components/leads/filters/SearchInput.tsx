import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"

interface SearchInputProps {
  value: string
  onChange: (value: string) => void
}

export function SearchInput({ value, onChange }: SearchInputProps) {
  return (
    <div className="relative">
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-primary-light/70" />
      <Input
        type="text"
        placeholder="Rechercher une entreprise..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="pl-10 bg-black/20 border-primary-light/20 text-white placeholder:text-primary-light/50"
      />
    </div>
  )
}