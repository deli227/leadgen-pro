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
        <SelectTrigger className="bg-black/20">
          <SelectValue placeholder={t('filters.companySize')} />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">{t('common.all')}</SelectItem>
          <SelectItem value="large">{t('companySize.large')}</SelectItem>
          <SelectItem value="medium">{t('companySize.medium')}</SelectItem>
          <SelectItem value="small">{t('companySize.small')}</SelectItem>
          <SelectItem value="micro">{t('companySize.micro')}</SelectItem>
          <SelectItem value="unknown">{t('companySize.unknown')}</SelectItem>
        </SelectContent>
      </Select>
    </div>
  )
}