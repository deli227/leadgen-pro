import { Button } from "@/components/ui/button"
import { Loader2 } from "lucide-react"
import { useTranslation } from "react-i18next"

interface FilterActionsProps {
  isGenerating: boolean
  onGenerate: () => void
}

export function FilterActions({ isGenerating, onGenerate }: FilterActionsProps) {
  const { t } = useTranslation()

  return (
    <div className="flex justify-end">
      <Button
        onClick={onGenerate}
        disabled={isGenerating}
        className="w-full sm:w-auto bg-gradient-to-r from-primary to-primary-dark text-white hover:opacity-90 text-xs sm:text-sm h-9 sm:h-10"
      >
        {isGenerating ? (
          <>
            <Loader2 className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2 animate-spin" />
            {t('common.generating')}
          </>
        ) : (
          t('common.generateLeads')
        )}
      </Button>
    </div>
  )
}