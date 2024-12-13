import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useToast } from "@/components/ui/use-toast"
import { Settings } from "lucide-react"

export function ApiKeyDialog() {
  const [apiKey, setApiKey] = useState(localStorage.getItem("scraping_api_key") || "")
  const { toast } = useToast()

  const handleSaveApiKey = () => {
    localStorage.setItem("scraping_api_key", apiKey)
    toast({
      title: "Clé API sauvegardée",
      description: "Votre clé API a été enregistrée avec succès."
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
          <DialogTitle className="text-primary-light">Configuration de la clé API</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="apiKey" className="text-sm font-medium text-primary-light">
              Clé API pour le scraping
            </label>
            <Input
              id="apiKey"
              type="password"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              className="bg-black border-primary-light text-primary-light"
              placeholder="Entrez votre clé API"
            />
          </div>
          <Button 
            onClick={handleSaveApiKey}
            className="w-full bg-primary hover:bg-primary-dark text-white"
          >
            Sauvegarder
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}