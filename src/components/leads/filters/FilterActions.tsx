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
    <Button
      onClick={onGenerate}
      disabled={isGenerating}
      className="ml-auto bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-white shadow-lg hover:shadow-xl transition-all duration-300"
    >
      {isGenerating ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          {t('common.generating')}
        </>
      ) : (
        t('common.generateLeads')
      )}
    </Button>
  )
}