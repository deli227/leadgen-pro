import { IconButton } from "./IconButton"
import { Zap } from "lucide-react"
import { toast } from "sonner"

interface UpgradeButtonProps {
  className?: string
}

export const UpgradeButton = ({ className }: UpgradeButtonProps) => {
  const handleUpgradeClick = () => {
    toast.info("La fonctionnalité de paiement sera bientôt disponible")
  }

  return (
    <IconButton
      icon={Zap}
      label="Augmenter la limite"
      variant="outline"
      onClick={handleUpgradeClick}
      disabled
      className={className}
    />
  )
}