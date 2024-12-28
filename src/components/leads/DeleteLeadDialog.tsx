import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"

interface DeleteLeadDialogProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
}

export function DeleteLeadDialog({ isOpen, onClose, onConfirm }: DeleteLeadDialogProps) {
  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Supprimer le lead définitivement ?</AlertDialogTitle>
          <AlertDialogDescription>
            Cette action est irréversible. Le lead sera supprimé définitivement de votre tableau de bord.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={onClose}>Annuler</AlertDialogCancel>
          <AlertDialogAction onClick={onConfirm}>Supprimer</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}