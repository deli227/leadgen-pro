import { useSessionData } from "@/hooks/useSessionData"
import { useProfileData } from "@/hooks/useProfileData"
import { useSubscriptionLimits } from "@/hooks/useSubscriptionLimits"
import { DashboardHeader } from "@/components/dashboard/DashboardHeader"
import { ProfileStats } from "@/components/profile/ProfileStats"
import { ProfileInfo } from "@/components/profile/ProfileInfo"
import { SubscriptionInfo } from "@/components/profile/SubscriptionInfo"
import { motion } from "framer-motion"
import { IconButton } from "@/components/buttons/IconButton"
import { ArrowLeft } from "lucide-react"
import { useNavigate } from "react-router-dom"

export function Profile() {
  const navigate = useNavigate()
  const { data: session } = useSessionData()
  const { data: profile } = useProfileData(session)
  const { data: limits } = useSubscriptionLimits(profile?.subscription_type)

  return (
    <div className="min-h-screen bg-gradient-to-br from-secondary-dark via-[#1A1F2C] to-black">
      <div className="container mx-auto py-2 sm:py-4 md:py-8 px-2 sm:px-4 animate-fade-in max-w-[98%] sm:max-w-[95%] lg:max-w-[90%] xl:max-w-[1400px]">
        <div className="mb-4">
          <IconButton
            icon={ArrowLeft}
            label="Retour au tableau de bord"
            variant="ghost"
            onClick={() => navigate('/dashboard')}
            className="text-primary-light hover:text-primary-light/80"
          />
        </div>
        
        <DashboardHeader exportLeads={[]} />
        
        <div className="space-y-6 mt-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid gap-6 md:grid-cols-2"
          >
            <ProfileInfo profile={profile} session={session} />
            <ProfileStats profile={profile} limits={limits} />
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <SubscriptionInfo profile={profile} limits={limits} />
          </motion.div>
        </div>
      </div>
    </div>
  )
}