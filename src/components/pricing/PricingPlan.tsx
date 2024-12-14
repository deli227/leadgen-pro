import { Button } from "@/components/ui/button";
import { Check, Infinity } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";

interface PricingPlanProps {
  name: string;
  description: string;
  price: string;
  features: string[];
  buttonText: string;
  type: string;
  popular?: boolean;
  priceId?: string;
}

export const PricingPlan = ({
  name,
  description,
  price,
  features,
  buttonText,
  type,
  popular,
  priceId,
}: PricingPlanProps) => {
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSubscribe = async () => {
    toast({
      title: "Fonctionnalité temporairement indisponible",
      description: "Le système de paiement sera bientôt disponible.",
      variant: "default",
    });
  };

  return (
    <div
      className={`relative flex flex-col justify-between rounded-3xl bg-gradient-to-br from-black/60 to-black/40 backdrop-blur-sm border border-primary/10 hover:border-primary/20 transition-all duration-300 p-8 xl:p-10 transform hover:scale-105 ${
        popular ? "shadow-[0_0_30px_rgba(155,135,245,0.3)]" : ""
      }`}
    >
      {popular && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2">
          <div className="rounded-full bg-gradient-to-r from-primary to-accent px-4 py-1 text-sm font-semibold text-white shadow-[0_0_15px_rgba(155,135,245,0.5)]">
            Populaire
          </div>
        </div>
      )}

      <div>
        <div className="flex items-center justify-between gap-x-4">
          <h3 className="text-lg font-semibold leading-8 text-primary-light">
            {name}
          </h3>
        </div>
        <p className="mt-4 text-sm leading-6 text-gray-300">
          {description}
        </p>
        <p className="mt-6 flex items-baseline gap-x-1">
          <span className="text-4xl font-bold tracking-tight text-white bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
            {price}
          </span>
          {price !== "Sur mesure" && (
            <span className="text-sm font-semibold leading-6 text-gray-300">
              /mois
            </span>
          )}
        </p>
        <ul role="list" className="mt-8 space-y-3 text-sm leading-6 text-gray-300">
          {features.map((feature) => (
            <li key={feature} className="flex gap-x-3">
              {feature.includes("illimit") ? (
                <Infinity className="h-6 w-5 flex-none text-primary animate-pulse" />
              ) : (
                <Check className="h-6 w-5 flex-none text-primary" />
              )}
              {feature}
            </li>
          ))}
        </ul>
      </div>
      <Button
        onClick={handleSubscribe}
        className={`mt-8 w-full flex items-center justify-center gap-2 ${
          popular
            ? "bg-gradient-to-r from-primary/50 to-accent/50 hover:from-primary/60 hover:to-accent/60 shadow-[0_0_15px_rgba(155,135,245,0.3)] hover:shadow-[0_0_25px_rgba(155,135,245,0.5)]"
            : "bg-primary/10 hover:bg-primary/20 text-primary border border-primary/20 hover:border-primary/30"
        } transform transition-all duration-300 opacity-75 px-3 py-2 h-auto min-h-[44px]`}
      >
        <span className="text-sm sm:text-base whitespace-nowrap">{buttonText}</span>
        <span className="text-xs sm:text-sm whitespace-nowrap opacity-75">(Bientôt disponible)</span>
      </Button>
    </div>
  );
};