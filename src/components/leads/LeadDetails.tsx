import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { ChartBar, Building2, Mail, Phone, LinkedinIcon, TwitterIcon, TrendingUp, AlertTriangle } from "lucide-react"

interface LeadDetailsProps {
  lead: {
    id: number
    company: string
    email: string
    phone: string
    socialMedia: {
      linkedin: string
      twitter: string
    }
    score: number
    industry: string
    strengths: string[]
    weaknesses: string[]
  }
  onClose: () => void
}

export function LeadDetails({ lead, onClose }: LeadDetailsProps) {
  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle className="text-2xl">{lead.company}</CardTitle>
            <CardDescription>{lead.industry}</CardDescription>
          </div>
          <div className="flex items-center gap-2">
            <ChartBar className="h-5 w-5 text-primary" />
            <span className="text-xl font-bold">{lead.score.toFixed(1)}</span>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[400px] pr-4">
          <div className="space-y-6">
            <div className="space-y-2">
              <h3 className="text-lg font-semibold">Informations de contact</h3>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Building2 className="h-4 w-4 text-muted-foreground" />
                  <span>{lead.company}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span>{lead.email}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <span>{lead.phone}</span>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="text-lg font-semibold">Réseaux sociaux</h3>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <LinkedinIcon className="h-4 w-4 text-muted-foreground" />
                  <a href={`https://linkedin.com/in/${lead.socialMedia.linkedin}`} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                    {lead.socialMedia.linkedin}
                  </a>
                </div>
                <div className="flex items-center gap-2">
                  <TwitterIcon className="h-4 w-4 text-muted-foreground" />
                  <a href={`https://twitter.com/${lead.socialMedia.twitter}`} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                    {lead.socialMedia.twitter}
                  </a>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="text-lg font-semibold">Analyse IA</h3>
              <div className="space-y-4">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <TrendingUp className="h-4 w-4 text-green-500" />
                    <span className="font-medium">Points forts</span>
                  </div>
                  <ul className="list-disc list-inside space-y-1 pl-4">
                    {lead.strengths.map((strength, index) => (
                      <li key={index}>{strength}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <AlertTriangle className="h-4 w-4 text-yellow-500" />
                    <span className="font-medium">Points d'amélioration</span>
                  </div>
                  <ul className="list-disc list-inside space-y-1 pl-4">
                    {lead.weaknesses.map((weakness, index) => (
                      <li key={index}>{weakness}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  )
}