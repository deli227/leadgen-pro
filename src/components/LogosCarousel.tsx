import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import { motion } from "framer-motion";
import Autoplay from "embla-carousel-autoplay";
import { useRef } from "react";

const companies = [
  {
    name: "Salesforce",
    logo: "/lovable-uploads/salesforce.png"
  },
  {
    name: "HubSpot",
    logo: "/lovable-uploads/hubspot.png"
  },
  {
    name: "Oracle",
    logo: "/lovable-uploads/oracle.png"
  },
  {
    name: "SAP",
    logo: "/lovable-uploads/sap.png"
  },
  {
    name: "Adobe",
    logo: "/lovable-uploads/adobe.png"
  },
  {
    name: "Microsoft",
    logo: "/lovable-uploads/microsoft.png"
  },
  {
    name: "Marketo",
    logo: "/lovable-uploads/marketo.png"
  },
  {
    name: "Zendesk",
    logo: "/lovable-uploads/zendesk.png"
  }
];

export const LogosCarousel = () => {
  const plugin = useRef(
    Autoplay({ delay: 2000, stopOnInteraction: false })
  );

  return (
    <section className="py-12 bg-secondary-dark/50 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        <h2 className="text-center text-xl text-white/80 mb-8 font-medium">
          Utilisé par les leaders du marketing B2B
        </h2>
        
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          plugins={[plugin.current]}
          className="w-full"
        >
          <CarouselContent className="-ml-2 md:-ml-4">
            {companies.map((company, index) => (
              <CarouselItem key={index} className="pl-2 md:pl-4 basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/5">
                <div className="relative aspect-[3/2] flex items-center justify-center p-4">
                  <div className="absolute inset-0 bg-white/5 rounded-lg backdrop-blur-sm border border-white/10" />
                  <img
                    src={company.logo}
                    alt={`${company.name} logo`}
                    className="relative w-24 h-12 object-contain opacity-70 hover:opacity-100 transition-opacity duration-300"
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </motion.div>
    </section>
  );
};