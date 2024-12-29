import { RobotMascot } from "../RobotMascot";
import { CountdownTimer } from "./CountdownTimer";
import { useTranslation } from "react-i18next";

export const HeroTitle = () => {
  const { t } = useTranslation();

  return (
    <div className="max-w-2xl mx-auto px-4">
      <div className="flex items-center justify-center gap-3 mb-8">
        <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
          LeadGen Pro <span className="text-base sm:text-lg font-normal">(beta)</span>
        </h1>
        <RobotMascot className="mt-1" />
      </div>
      <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-primary via-accent to-primary animate-gradient mb-12" id="main-heading">
        {t('hero.title')}
      </h2>
      <p className="mt-8 text-base sm:text-lg md:text-xl leading-8 text-gray-300">
        {t('hero.mainText')}
      </p>
      <CountdownTimer />
    </div>
  );
};