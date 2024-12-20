import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useToast } from "@/components/ui/use-toast"
import { Settings } from "lucide-react"

export function ApiKeyDialog() {
  const [apiKey, setApiKey] = useState("")
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
        <Button variant="outline" size="sm" className="bg-primary hover:bg-primary-dark text-white border-none">
          <Settings className="h-4 w-4 mr-2" />
          Configurer API
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