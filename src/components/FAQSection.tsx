import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { useLanguage } from '@/contexts/LanguageContext';
import { useSectionTracking } from '@/hooks/useSectionTracking';

export const FAQSection = () => {
  const { t } = useLanguage();
  const sectionRef = useSectionTracking('faq');

  return (
    <section ref={sectionRef} id="faq" className="py-14 md:py-16 bg-background">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-12">
          <h2 className="font-serif text-3xl md:text-4xl text-foreground">
            {t.faq.title}
          </h2>
        </div>

        <Accordion type="single" collapsible className="w-full space-y-3">
          {t.faq.items.map((faq, index) => (
            <AccordionItem 
              key={index} 
              value={`item-${index}`}
              className="border border-border/50 rounded-lg px-6 bg-card/50 data-[state=open]:bg-card data-[state=open]:shadow-soft transition-all duration-300"
            >
              <AccordionTrigger className="text-left font-serif text-lg text-foreground hover:text-primary hover:no-underline py-5">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground leading-relaxed pb-5">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};
