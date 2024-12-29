import { Card } from "@/components/ui/card"
import { User } from "lucide-react"
import { Session } from "@supabase/supabase-js"

interface ProfileInfoProps {
  profile: any
  session: Session | null
}

export function ProfileInfo({ profile, session }: ProfileInfoProps) {
  return (
    <Card className="p-6 bg-gradient-to-br from-secondary-dark via-secondary-dark/95 to-secondary-dark/90 border border-primary/20 rounded-xl backdrop-blur-sm">
      <div className="flex items-start gap-4">
        <div className="p-3 bg-primary/10 rounded-lg">
          <User className="w-6 h-6 text-primary" />
        </div>
        <div className="space-y-1">
          <h2 className="text-lg font-semibold text-primary-light">Informations du profil</h2>
          <p className="text-sm text-primary-light/70">Email : {session?.user?.email}</p>
          <p className="text-sm text-primary-light/70">
            Membre depuis : {new Date(profile?.created_at).toLocaleDateString('fr-FR', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </p>
        </div>
      </div>
    </Card>
  )
}