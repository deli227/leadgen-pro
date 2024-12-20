import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { useToast } from "@/hooks/use-toast"
import { Settings } from "lucide-react"

export function ApiKeyDialog() {
  const { toast } = useToast()

  const handleSaveApiKey = () => {
    toast({
      title: "Configuration API",
      description: "La fonctionnalité de scraping a été désactivée."
    })
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="icon" className="border-primary-light">
          <Settings className="h-4 w-4 text-primary-light" />
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-secondary-dark border-primary-light">
        <DialogHeader>
          <DialogTitle className="text-primary-light">Configuration désactivée</DialogTitle>
        </DialogHeader>
        <div className="p-4 text-primary-light">
          La fonctionnalité de scraping a été désactivée.
        </div>
      </DialogContent>
    </Dialog>
  )
}