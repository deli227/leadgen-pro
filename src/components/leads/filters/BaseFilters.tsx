import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useTranslation } from "react-i18next"
import { LeadFilters } from "@/types/filters"

interface BaseFiltersProps {
  filters: LeadFilters
  setFilters: (filters: LeadFilters) => void
}

export function BaseFilters({ filters, setFilters }: BaseFiltersProps) {
  const { t } = useTranslation()

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-4">
      <Select
        value={filters.country}
        onValueChange={(value) => setFilters({ ...filters, country: value })}
      >
        <SelectTrigger className="w-full bg-black/20 border-primary/20 text-primary-light text-xs sm:text-sm h-9 sm:h-10">
          <SelectValue placeholder={t('filters.allCountries')} />
        </SelectTrigger>
        <SelectContent className="bg-secondary-dark border-primary/20">
          <SelectItem value="all" className="text-primary-light hover:bg-primary/20">
            {t('filters.allCountries')}
          </SelectItem>
          <SelectItem value="france" className="text-primary-light hover:bg-primary/20">
            France
          </SelectItem>
          <SelectItem value="belgium" className="text-primary-light hover:bg-primary/20">
            Belgique
          </SelectItem>
          <SelectItem value="switzerland" className="text-primary-light hover:bg-primary/20">
            Suisse
          </SelectItem>
        </SelectContent>
      </Select>

      <Select
        value={filters.city}
        onValueChange={(value) => setFilters({ ...filters, city: value })}
      >
        <SelectTrigger className="w-full bg-black/20 border-primary/20 text-primary-light text-xs sm:text-sm h-9 sm:h-10">
          <SelectValue placeholder={t('filters.allCities')} />
        </SelectTrigger>
        <SelectContent className="bg-secondary-dark border-primary/20">
          <SelectItem value="all" className="text-primary-light hover:bg-primary/20">
            {t('filters.allCities')}
          </SelectItem>
          <SelectItem value="paris" className="text-primary-light hover:bg-primary/20">
            Paris
          </SelectItem>
          <SelectItem value="lyon" className="text-primary-light hover:bg-primary/20">
            Lyon
          </SelectItem>
          <SelectItem value="marseille" className="text-primary-light hover:bg-primary/20">
            Marseille
          </SelectItem>
        </SelectContent>
      </Select>

      <Select
        value={filters.industry}
        onValueChange={(value) => setFilters({ ...filters, industry: value })}
      >
        <SelectTrigger className="w-full bg-black/20 border-primary/20 text-primary-light text-xs sm:text-sm h-9 sm:h-10">
          <SelectValue placeholder={t('filters.allIndustries')} />
        </SelectTrigger>
        <SelectContent className="bg-secondary-dark border-primary/20">
          <SelectItem value="all" className="text-primary-light hover:bg-primary/20">
            {t('filters.allIndustries')}
          </SelectItem>
          <SelectItem value="tech" className="text-primary-light hover:bg-primary/20">
            Tech
          </SelectItem>
          <SelectItem value="retail" className="text-primary-light hover:bg-primary/20">
            Retail
          </SelectItem>
          <SelectItem value="finance" className="text-primary-light hover:bg-primary/20">
            Finance
          </SelectItem>
        </SelectContent>
      </Select>
    </div>
  )
}