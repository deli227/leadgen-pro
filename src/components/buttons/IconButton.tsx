import { Button } from "@/components/ui/button"
import { LucideIcon } from "lucide-react"
import { cn } from "@/lib/utils"

interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon: LucideIcon
  label: string
  variant?: "default" | "outline" | "ghost"
  size?: "default" | "sm" | "lg"
  className?: string
  disabled?: boolean
}

export const IconButton = ({
  icon: Icon,
  label,
  variant = "default",
  size = "default",
  className,
  disabled = false,
  ...props
}: IconButtonProps) => {
  return (
    <Button
      variant={variant}
      size={size}
      className={cn(
        "flex items-center justify-center gap-2 whitespace-nowrap",
        disabled && "opacity-50 cursor-not-allowed",
        className
      )}
      disabled={disabled}
      {...props}
    >
      <Icon className="h-4 w-4" />
      <span className="text-sm">{label}</span>
    </Button>
  )
}