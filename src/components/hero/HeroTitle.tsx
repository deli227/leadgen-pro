import { RobotMascot } from "../RobotMascot";

export const HeroTitle = () => {
  return (
    <div className="max-w-2xl mx-auto px-4">
      <div className="flex items-center justify-center gap-2 mb-4">
        <h1 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
          LeadGen Pro <span className="text-xs sm:text-sm font-normal">(beta)</span>
        </h1>
        <RobotMascot className="mt-1" />
      </div>
      <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-primary via-accent to-primary animate-gradient" id="main-heading">
        Une première mondiale en prospection B2B
      </h2>
      <p className="mt-6 text-base sm:text-lg md:text-xl leading-8 text-gray-300">
        Recherchez vos leads qualifiés et lancez une analyse approfondie grâce à notre IA innovante. Obtenez instantanément une vision à 360° : points forts, points faibles, opportunités d'amélioration... Tout ce dont vous avez besoin pour comprendre et conquérir vos prospects est à portée de clic.
      </p>
    </div>
  );
};