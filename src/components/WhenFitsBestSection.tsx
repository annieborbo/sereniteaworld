import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { useSectionTracking } from '@/hooks/useSectionTracking';
import { Moon, Heart, Coffee, Wine, Sparkles } from 'lucide-react';

export const WhenFitsBestSection = () => {
  const { t, language } = useLanguage();
  const sectionRef = useSectionTracking('when-fits-best');

  const icons = [Moon, Heart, Coffee, Wine, Sparkles];

  return (
    <section ref={sectionRef} id="when-fits-best" className="py-24 bg-gradient-to-b from-muted/20 to-background relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-10 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-10 w-80 h-80 bg-secondary/10 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 max-w-4xl relative z-10">
      <div className="text-center mb-14 animate-fade-up">
          <h2 className="text-4xl md:text-5xl font-serif font-semibold text-foreground">
            {language === 'nl' ? 'Wanneer mensen voor Serenitea kiezen' : 'When people choose Serenitea'}
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {t.whenFitsBest.items.map((item, index) => {
            const Icon = icons[index % icons.length];
            return (
              <div
                key={index}
                className="group relative bg-card/80 backdrop-blur-sm border border-border/50 rounded-2xl p-6 
                           hover:bg-card hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5
                           transition-all duration-300 animate-fade-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center
                                  group-hover:bg-primary/20 group-hover:scale-110 transition-all duration-300">
                    <Icon className="w-5 h-5 text-primary" />
                  </div>
                  <p className="text-foreground/80 group-hover:text-foreground transition-colors leading-relaxed pt-1.5">
                    {item}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA */}
        <div className="text-center mt-12 animate-fade-up">
          <a href="#waitlist">
            <Button className="btn-primary h-12 px-8 text-base">
              {language === 'nl' ? 'Ontvang als eerste bericht bij lancering' : 'Be the first to know at launch'}
            </Button>
          </a>
        </div>
      </div>
    </section>
  );
};
