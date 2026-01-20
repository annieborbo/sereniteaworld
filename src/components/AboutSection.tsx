import { useLanguage } from '@/contexts/LanguageContext';
import { Leaf, CupSoda, Coffee, Wheat, Sprout } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { trackEvent } from '@/lib/analytics';
import { useSectionTracking } from '@/hooks/useSectionTracking';

export const AboutSection = () => {
  const { language } = useLanguage();
  const sectionRef = useSectionTracking('about');

  const content = {
    en: {
      title: "What is Buckwheat Tea?",
      description1: "Buckwheat tea is a caffeine-free drink made from roasted buckwheat seeds. The taste is soft, nutty and slightly sweet, often compared to cookies or grains.",
      description2: "Because it contains no caffeine, it's suitable for drinking in the evening too. Just a warm or cold moment, without stimulants.",
      benefits: [
        { icon: Leaf, label: "100% Natural" },
        { icon: Coffee, label: "Caffeine Free" },
        { icon: CupSoda, label: "Sugar Free" },
        { icon: Wheat, label: "Gluten Free" },
        { icon: Sprout, label: "Vegan" },
      ],
      joinWaitlist: "Join the waitlist"
    },
    nl: {
      title: "Wat is Boekweitthee?",
      description1: "Boekweit thee is een cafeïnevrije drank gemaakt van geroosterde boekweitzaden. De smaak is zacht, nootachtig en licht zoet, vaak vergeleken met granen of koekjes.",
      description2: "Omdat het geen cafeïne bevat, kun je het ook 's avonds drinken. Gewoon een warm of koud moment, zonder prikkels.",
      benefits: [
        { icon: Leaf, label: "100% Natuurlijk" },
        { icon: Coffee, label: "Cafeïnevrij" },
        { icon: CupSoda, label: "Suikervrij" },
        { icon: Wheat, label: "Glutenvrij" },
        { icon: Sprout, label: "Veganistisch" },
      ],
      joinWaitlist: "Schrijf je in op de wachtlijst"
    }
  };

  const t = content[language];

  return (
    <section ref={sectionRef} id="about" className="py-24 relative overflow-hidden">
      {/* Background with subtle gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-secondary/30 via-secondary/20 to-background" />
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-secondary/30 rounded-full blur-3xl" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center space-y-8">
          <h2 className="text-4xl md:text-5xl font-serif font-semibold text-foreground mb-4">
            {t.title}
          </h2>
          
          <div className="space-y-4">
            <p className="text-lg text-muted-foreground leading-relaxed">
              {t.description1}
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              {t.description2}
            </p>
          </div>

          {/* Benefits Icons */}
          <div className="grid grid-cols-5 gap-6 pt-8">
            {t.benefits.map((benefit, index) => (
              <div key={index} className="flex flex-col items-center gap-2">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <benefit.icon className="w-5 h-5 text-primary" />
                </div>
                <span className="text-xs text-muted-foreground text-center font-medium">
                  {benefit.label}
                </span>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};
