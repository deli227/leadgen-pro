import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { BrainCircuit, Signal } from "lucide-react"
import { motion } from "framer-motion"

interface AIAnalysisWindowProps {
  isOpen: boolean
  onClose: () => void
  analysis: string | null
  company: string
}

export function AIAnalysisWindow({ isOpen, onClose, analysis, company }: AIAnalysisWindowProps) {
  return (
    <Dialog open={isOpen} onOpenChange={() => onClose()}>
      <DialogContent className="bg-gradient-to-br from-black via-secondary-dark to-black border-primary-light/20 max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-primary-light">
            <BrainCircuit className="h-6 w-6 text-primary" />
            Analyse IA - {company}
          </DialogTitle>
        </DialogHeader>
        
        <div className="mt-4 space-y-4">
          {analysis ? (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="relative"
            >
              <div className="absolute top-0 right-0">
                <Signal className="h-5 w-5 text-primary animate-pulse" />
              </div>
              <div className="p-6 rounded-lg bg-black/40 border border-primary/20 text-primary-light">
                {analysis.split('\n').map((line, index) => (
                  <motion.p 
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="mb-2"
                  >
                    {line}
                  </motion.p>
                ))}
              </div>
            </motion.div>
          ) : (
            <div className="flex items-center justify-center p-8">
              <motion.div 
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              >
                <BrainCircuit className="h-8 w-8 text-primary" />
              </motion.div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}