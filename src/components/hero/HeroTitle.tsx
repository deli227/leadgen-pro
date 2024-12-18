import { RobotMascot } from "../RobotMascot";
import { CountdownTimer } from "./CountdownTimer";

export const HeroTitle = () => {
  return (
    <div className="max-w-2xl mx-auto px-4">
      <div className="flex items-center justify-center gap-3 mb-8">
        <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
          LeadGen Pro <span className="text-base sm:text-lg font-normal">(beta)</span>
        </h1>
        <RobotMascot className="mt-1" />
      </div>
      <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-primary via-accent to-primary animate-gradient mb-12" id="main-heading">
        Une première mondiale en prospection B2B
      </h2>
      <p className="mt-8 text-base sm:text-lg md:text-xl leading-8 text-gray-300">
        Propulsez votre marketing et votre prospection dans une nouvelle dimension avec notre IA révolutionnaire !
        Repérez vos leads qualifiés en un instant et obtenez une vision à 360° : forces à exploiter, faiblesses à dépasser, opportunités à saisir. Transformez chaque prospect en succès grâce à des insights percutants et un avantage imbattable. Prêt à dominer votre marché ? Passez à la vitesse supérieure dès maintenant !
      </p>
      <CountdownTimer />
    </div>
  );
};