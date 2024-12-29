import { Tag } from "@/types/tags"
import { Badge } from "@/components/ui/badge"

interface TagBadgeProps {
  tag: Tag
  onRemove?: () => void
}

export function TagBadge({ tag, onRemove }: TagBadgeProps) {
  return (
    <Badge 
      variant="outline" 
      style={{ 
        backgroundColor: `${tag.color}20`,
        borderColor: tag.color,
        color: tag.color
      }}
      className="cursor-pointer hover:opacity-80 transition-opacity"
      onClick={onRemove}
    >
      {tag.name}
    </Badge>
  )
}