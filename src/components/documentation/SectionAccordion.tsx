import { ArrowRight } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

type Step = {
  title: string;
  content: string[];
};

type Props = {
  steps: Step[];
};

export const SectionAccordion = ({ steps }: Props) => {
  return (
    <Accordion type="single" collapsible className="w-full">
      {steps.map((step, stepIndex) => (
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
  );
};