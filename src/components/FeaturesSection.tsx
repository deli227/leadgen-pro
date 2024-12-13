import { CheckCircle, Users, LineChart, FileText } from "lucide-react";

export const FeaturesSection = () => {
  const features = [
    {
      name: "Scoring intelligent des leads",
      description: "Notre IA analyse et attribue un score de 1 à 10 à chaque lead en fonction de sa pertinence pour votre activité.",
      icon: CheckCircle,
    },
    {
      name: "Analyse approfondie",
      description: "Obtenez une vue détaillée des forces et faiblesses de chaque entreprise prospect.",
      icon: LineChart,
    },
    {
      name: "Base de données centralisée",
      description: "Toutes vos données sont centralisées et facilement accessibles dans un tableau de bord intuitif.",
      icon: FileText,
    },
    {
      name: "Gestion collaborative",
      description: "Partagez et collaborez efficacement avec votre équipe commerciale.",
      icon: Users,
    },
  ];

  return (
    <div className="bg-gray-50 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Fonctionnalités principales
          </h2>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Des outils puissants pour optimiser votre prospection commerciale
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-2">
            {features.map((feature) => (
              <div key={feature.name} className="flex flex-col bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
                <dt className="flex items-center gap-x-3 text-lg font-semibold leading-7 text-gray-900">
                  <feature.icon className="h-5 w-5 flex-none text-primary" />
                  {feature.name}
                </dt>
                <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600">
                  <p className="flex-auto">{feature.description}</p>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
};