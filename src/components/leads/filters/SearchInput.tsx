import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search } from "lucide-react"

interface SearchInputProps {
  value: string
  onChange: (value: string) => void
}

export function SearchInput({ value, onChange }: SearchInputProps) {
  return (
    <div className="flex-1 min-w-[200px] relative">
      <Input
        placeholder="Nom de l'entreprise..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="bg-transparent border-primary-light text-primary-light placeholder:text-primary-light/70 pl-4 pr-12 py-6 text-lg"
      />
      <Button 
        variant="ghost" 
        size="icon"
        className="absolute right-2 top-1/2 -translate-y-1/2 text-primary-light hover:text-primary hover:bg-transparent"
        onClick={() => console.log("Recherche lancée")}
      >
        <Search className="h-5 w-5" />
      </Button>
    </div>
  )
}