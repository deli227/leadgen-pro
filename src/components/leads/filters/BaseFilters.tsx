import { LocationFilters } from "./LocationFilters"
import { IndustrySelect } from "./IndustrySelect"
import { CompanySizeSelect } from "./CompanySizeSelect"
import { LeadFilters } from "@/types/filters"

interface BaseFiltersProps {
  filters: LeadFilters
  setFilters: (filters: LeadFilters) => void
}

export function BaseFilters({ filters, setFilters }: BaseFiltersProps) {
  return (
    <div className="flex flex-wrap gap-4">
      <LocationFilters 
        country={filters.country}
        city={filters.city}
        onCountryChange={(value) => {
          setFilters({ ...filters, country: value, city: "all" })
        }}
        onCityChange={(value) => setFilters({ ...filters, city: value })}
      />
      
      <IndustrySelect 
        value={filters.industry}
        onChange={(value) => setFilters({ ...filters, industry: value })}
      />

      <CompanySizeSelect
        value={filters.companySize || 'all'}
        onChange={(value) => setFilters({ ...filters, companySize: value })}
      />
    </div>
  )
}