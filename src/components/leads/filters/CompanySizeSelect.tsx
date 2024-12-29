import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useTranslation } from "react-i18next"

interface CompanySizeSelectProps {
  value: string
  onChange: (value: string) => void
}

export function CompanySizeSelect({ value, onChange }: CompanySizeSelectProps) {
  const { t } = useTranslation()

  return (
    <div className="w-full sm:w-[200px]">
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger className="bg-black/20 text-primary-light">
          <SelectValue placeholder={t('filters.companySize')} />
        </SelectTrigger>
        <SelectContent className="bg-secondary-dark/95 text-primary-light border-primary-light/20">
          <SelectItem value="all" className="text-primary-light hover:bg-primary/20">{t('common.all')}</SelectItem>
          <SelectItem value="large" className="text-primary-light hover:bg-primary/20">{t('companySize.large')}</SelectItem>
          <SelectItem value="medium" className="text-primary-light hover:bg-primary/20">{t('companySize.medium')}</SelectItem>
          <SelectItem value="small" className="text-primary-light hover:bg-primary/20">{t('companySize.small')}</SelectItem>
          <SelectItem value="micro" className="text-primary-light hover:bg-primary/20">{t('companySize.micro')}</SelectItem>
          <SelectItem value="unknown" className="text-primary-light hover:bg-primary/20">{t('companySize.unknown')}</SelectItem>
        </SelectContent>
      </Select>
    </div>
  )
}