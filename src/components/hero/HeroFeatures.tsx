import { Globe, Zap, TrendingUp, Brain } from "lucide-react";

const FeatureCard = ({ 
  icon: Icon, 
  title, 
  description 
}: { 
  icon: React.ElementType;
  title: string;
  description: string;
}) => (
  <div className="flex items-start gap-3 sm:gap-4 p-3 sm:p-4 rounded-xl bg-white/5 backdrop-blur-sm transform hover:scale-105 transition-all duration-300" role="listitem">
    <div className="rounded-lg bg-primary/10 p-2 sm:p-3 shadow-[0_0_20px_rgba(155,135,245,0.3)] flex-shrink-0">
      <Icon className="h-4 w-4 sm:h-6 sm:w-6 text-primary" aria-hidden="true" />
    </div>
    <div className="text-left min-w-0">
      <h3 className="font-semibold text-white text-sm sm:text-base">{title}</h3>
      <p className="text-xs sm:text-sm text-gray-300 truncate">{description}</p>
    </div>
  </div>
);

export const HeroFeatures = () => {
  const features = [
    {
      icon: Globe,
      title: "Couverture mondiale",
      description: "Accédez à des leads qualifiés partout"
    },
    {
      icon: Zap,
      title: "Analyse instantanée",
      description: "Tout savoir en quelques secondes"
    },
    {
      icon: TrendingUp,
      title: "Taux de conversion élevé",
      description: "Augmentez vos conversions"
    },
    {
      icon: Brain,
      title: "Un temps d'avance",
      description: "Anticipez le potentiel"
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 w-full max-w-2xl mx-auto px-3 sm:px-4" role="list" aria-label="Caractéristiques principales">
      {features.map((feature, index) => (
        <FeatureCard key={index} {...feature} />
      ))}
    </div>
  );
};