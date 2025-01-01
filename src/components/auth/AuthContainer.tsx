import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { AuthUI } from "./AuthUI"

export function AuthContainer() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-gradient-to-br from-secondary-dark to-[#1A1F2C] flex flex-col items-center justify-center p-4">
      <Button 
        onClick={() => navigate("/")}
        className="absolute top-4 left-4 text-lg font-semibold flex items-center gap-2 bg-black/30 hover:bg-black/40 text-white"
      >
        <ArrowLeft className="w-6 h-6" />
        Retour
      </Button>

      <div className="w-full max-w-md bg-black/40 backdrop-blur-lg p-8 rounded-xl border border-primary/20">
        <AuthUI />
      </div>
    </div>
  )
}