import { useLanguage } from '@/contexts/LanguageContext';
import { useSectionTracking } from '@/hooks/useSectionTracking';

export const WhenFitsBestSection = () => {
  const { t } = useLanguage();
  const sectionRef = useSectionTracking('when-fits-best');

  return (
    <section ref={sectionRef} className="py-20 bg-background">
      <div className="container mx-auto px-4 max-w-3xl">
        <div className="text-center mb-10 animate-fade-up">
          <h2 className="font-serif text-3xl md:text-4xl text-foreground">
            {t.whenFitsBest.title}
          </h2>
        </div>

        <ul className="space-y-4 max-w-md mx-auto animate-fade-up">
          {t.whenFitsBest.items.map((item, index) => (
            <li 
              key={index} 
              className="flex items-center gap-4 text-lg text-muted-foreground"
            >
              <span className="w-2 h-2 rounded-full bg-primary flex-shrink-0" />
              {item}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};
