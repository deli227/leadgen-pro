import { TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ChevronRight } from "lucide-react"
import { motion } from "framer-motion"

export function TabsHeader() {
  return (
    <TabsList className="grid w-full grid-cols-4 bg-gradient-to-r from-black to-secondary-dark border border-primary-light/20 rounded-t-xl overflow-hidden shadow-lg">
      <TabsTrigger 
        value="filters" 
        className="relative text-primary-light data-[state=active]:bg-black/60 data-[state=active]:text-primary-light group transition-all duration-300"
      >
        <span className="flex items-center gap-2 text-primary-light">
          Filtres
          <ChevronRight className="h-4 w-4 transition-transform group-data-[state=active]:rotate-90" />
        </span>
        <motion.span 
          className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-primary to-accent"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.3 }}
        />
      </TabsTrigger>
      <TabsTrigger 
        value="analytics" 
        className="relative text-primary-light data-[state=active]:bg-black/60 data-[state=active]:text-primary-light group transition-all duration-300"
      >
        <span className="flex items-center gap-2 text-primary-light">
          Analytiques
          <ChevronRight className="h-4 w-4 transition-transform group-data-[state=active]:rotate-90" />
        </span>
        <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary scale-x-0 group-data-[state=active]:scale-x-100 transition-transform" />
      </TabsTrigger>
      <TabsTrigger 
        value="search" 
        className="relative text-primary-light data-[state=active]:bg-black/60 data-[state=active]:text-primary-light group transition-all duration-300"
      >
        <span className="flex items-center gap-2 text-primary-light">
          Recherche
          <ChevronRight className="h-4 w-4 transition-transform group-data-[state=active]:rotate-90" />
        </span>
        <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary scale-x-0 group-data-[state=active]:scale-x-100 transition-transform" />
      </TabsTrigger>
      <TabsTrigger 
        value="export" 
        className="relative text-primary-light data-[state=active]:bg-black/60 data-[state=active]:text-primary-light group transition-all duration-300"
      >
        <span className="flex items-center gap-2 text-primary-light">
          Export
          <ChevronRight className="h-4 w-4 transition-transform group-data-[state=active]:rotate-90" />
        </span>
        <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary scale-x-0 group-data-[state=active]:scale-x-100 transition-transform" />
      </TabsTrigger>
    </TabsList>
  )
}