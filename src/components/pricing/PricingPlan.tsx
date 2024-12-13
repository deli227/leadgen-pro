import { Button } from "@/components/ui/button";
import { Check, Infinity } from "lucide-react";
import { Link } from "react-router-dom";
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

  const handleSubscribe = async () => {
    if (type === 'free') {
      window.location.href = '/auth';
      return;
    }

    try {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        window.location.href = '/auth';
        return;
      }

      const { data, error } = await supabase.functions.invoke('create-checkout', {
        body: { priceId },
      });

      if (error) throw error;
      if (data?.url) {
        window.location.href = data.url;
      }
    } catch (error) {
      console.error('Erreur:', error);
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Impossible de créer la session de paiement. Veuillez réessayer.",
      });
    }
  };

  return (
    <div
      className={`flex flex-col justify-between rounded-3xl bg-white p-8 ring-1 ring-gray-200 xl:p-10 ${
        popular ? "relative shadow-xl" : ""
      }`}
    >
      {popular && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2">
          <div className="rounded-full bg-primary px-4 py-1 text-sm font-semibold text-white">
            Populaire
          </div>
        </div>
      )}

      <div>
        <div className="flex items-center justify-between gap-x-4">
          <h3 className="text-lg font-semibold leading-8 text-gray-900">
            {name}
          </h3>
        </div>
        <p className="mt-4 text-sm leading-6 text-gray-600">
          {description}
        </p>
        <p className="mt-6 flex items-baseline gap-x-1">
          <span className="text-4xl font-bold tracking-tight text-gray-900">
            {price}
          </span>
          {price !== "Sur mesure" && (
            <span className="text-sm font-semibold leading-6 text-gray-600">
              /mois
            </span>
          )}
        </p>
        <ul role="list" className="mt-8 space-y-3 text-sm leading-6 text-gray-600">
          {features.map((feature) => (
            <li key={feature} className="flex gap-x-3">
              {feature.includes("illimit") ? (
                <Infinity className="h-6 w-5 flex-none text-primary" />
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
        className={`mt-8 w-full ${
          popular
            ? "bg-primary hover:bg-primary/90"
            : "bg-primary/10 hover:bg-primary/20 text-primary"
        }`}
      >
        {buttonText}
      </Button>
    </div>
  );
};