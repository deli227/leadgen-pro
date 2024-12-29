import { Tag } from "@/types/tags"
import { Badge } from "@/components/ui/badge"
import { X } from "lucide-react"

interface TagBadgeProps {
  tag: Tag
  onRemove?: () => void
  showDelete?: boolean
  onDelete?: () => void
}

export function TagBadge({ tag, onRemove, showDelete, onDelete }: TagBadgeProps) {
  return (
    <Badge 
      variant="outline" 
      style={{ 
        backgroundColor: `${tag.color}20`,
        borderColor: tag.color,
        color: tag.color
      }}
      className="cursor-pointer hover:opacity-80 transition-opacity flex items-center gap-1"
      onClick={onRemove}
    >
      {tag.name}
      {showDelete && (
        <X 
          className="h-3 w-3 hover:text-red-500" 
          onClick={(e) => {
            e.stopPropagation()
            onDelete?.()
          }}
        />
      )}
    </Badge>
  )
}