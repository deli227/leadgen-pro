import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { LucideIcon } from "lucide-react";

interface Step {
  title: string;
  content: string[];
}

interface Section {
  icon: LucideIcon;
  title: string;
  description: string;
  steps: Step[];
}

interface SectionAccordionProps {
  section: Section;
  index: number;
}

export const SectionAccordion = ({ section, index }: SectionAccordionProps) => {
  const Icon = section.icon;
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="bg-secondary-dark/50 rounded-xl p-6 border border-primary/10 hover:border-primary/30 transition-all duration-300"
    >
      <div className="flex items-center gap-4 mb-4">
        <div className="p-3 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
          <Icon className="w-6 h-6 text-primary" />
        </div>
        <div>
          <h3 className="text-xl font-semibold text-white">{section.title}</h3>
          <p className="text-gray-400">{section.description}</p>
        </div>
      </div>

      <Accordion type="single" collapsible className="w-full">
        {section.steps.map((step, stepIndex) => (
          <AccordionItem key={stepIndex} value={`step-${stepIndex}`}>
            <AccordionTrigger className="text-primary-light hover:text-primary">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <span className="text-primary text-sm">{stepIndex + 1}</span>
                </div>
                {step.title}
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <ul className="space-y-2 pl-8">
                {step.content.map((item, itemIndex) => (
                  <li key={itemIndex} className="flex items-start gap-2 text-gray-300">
                    <ArrowRight className="w-4 h-4 text-primary mt-1 flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </motion.div>
  );
};