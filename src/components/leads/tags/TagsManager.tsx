import { useState } from "react"
import { Tag } from "@/types/tags"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { toast } from "sonner"
import { supabase } from "@/integrations/supabase/client"
import { TagBadge } from "./TagBadge"
import { useQuery } from "@tanstack/react-query"
import { useSessionData } from "@/hooks/useSessionData"

interface TagsManagerProps {
  leadId: string
}

export function TagsManager({ leadId }: TagsManagerProps) {
  const [newTagName, setNewTagName] = useState("")
  const [selectedColor, setSelectedColor] = useState("#3B82F6")
  const [isCreating, setIsCreating] = useState(false)
  const { data: session } = useSessionData()

  const { data: tags = [], refetch: refetchTags } = useQuery({
    queryKey: ['tags'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('lead_tags')
        .select('*')
        .order('created_at', { ascending: true })

      if (error) {
        console.error('Error fetching tags:', error)
        throw error
      }

      return data as Tag[]
    }
  })

  const { data: leadTags = [], refetch: refetchLeadTags } = useQuery({
    queryKey: ['lead_tags', leadId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('leads_to_tags')
        .select(`
          tag_id,
          lead_tags (*)
        `)
        .eq('lead_id', leadId)

      if (error) {
        console.error('Error fetching lead tags:', error)
        throw error
      }

      return data.map(lt => lt.lead_tags) as Tag[]
    }
  })

  const handleCreateTag = async () => {
    if (!newTagName.trim()) {
      toast.error("Le nom du tag ne peut pas être vide")
      return
    }

    if (!session?.user?.id) {
      toast.error("Vous devez être connecté pour créer un tag")
      return
    }

    setIsCreating(true)
    try {
      const { data, error } = await supabase
        .from('lead_tags')
        .insert([
          { 
            name: newTagName.trim(), 
            color: selectedColor,
            user_id: session.user.id
          }
        ])
        .select()
        .single()

      if (error) throw error

      toast.success("Tag créé avec succès")
      setNewTagName("")
      refetchTags()
    } catch (error) {
      console.error('Error creating tag:', error)
      toast.error("Erreur lors de la création du tag")
    } finally {
      setIsCreating(false)
    }
  }

  const handleAddTagToLead = async (tagId: string) => {
    try {
      const { error } = await supabase
        .from('leads_to_tags')
        .insert([
          { lead_id: leadId, tag_id: tagId }
        ])

      if (error) throw error

      toast.success("Tag ajouté au lead")
      refetchLeadTags()
    } catch (error) {
      console.error('Error adding tag to lead:', error)
      toast.error("Erreur lors de l'ajout du tag")
    }
  }

  const handleRemoveTagFromLead = async (tagId: string) => {
    try {
      const { error } = await supabase
        .from('leads_to_tags')
        .delete()
        .eq('lead_id', leadId)
        .eq('tag_id', tagId)

      if (error) throw error

      toast.success("Tag retiré du lead")
      refetchLeadTags()
    } catch (error) {
      console.error('Error removing tag from lead:', error)
      toast.error("Erreur lors du retrait du tag")
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        {leadTags.map((tag) => (
          <TagBadge 
            key={tag.id} 
            tag={tag}
            onRemove={() => handleRemoveTagFromLead(tag.id)}
          />
        ))}
      </div>

      <div className="flex gap-2">
        <Input
          type="text"
          placeholder="Nouveau tag..."
          value={newTagName}
          onChange={(e) => setNewTagName(e.target.value)}
          className="flex-1"
        />
        <Input
          type="color"
          value={selectedColor}
          onChange={(e) => setSelectedColor(e.target.value)}
          className="w-16"
        />
        <Button 
          onClick={handleCreateTag}
          disabled={isCreating}
        >
          Créer
        </Button>
      </div>

      <div className="flex flex-wrap gap-2">
        {tags
          .filter(tag => !leadTags.some(lt => lt.id === tag.id))
          .map((tag) => (
            <TagBadge 
              key={tag.id} 
              tag={tag}
              onRemove={() => handleAddTagToLead(tag.id)}
            />
          ))}
      </div>
    </div>
  )
}