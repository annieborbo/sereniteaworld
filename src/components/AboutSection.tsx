import { useLanguage } from '@/contexts/LanguageContext';
import { Leaf, CupSoda, Coffee, Wheat, Sparkles, Sprout } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { trackEvent } from '@/lib/analytics';
import { useSectionTracking } from '@/hooks/useSectionTracking';

export const AboutSection = () => {
  const { language } = useLanguage();
  const sectionRef = useSectionTracking('about');

  const content = {
    en: {
      title: "What is Tartary Buckwheat Tea",
      description: "Buckwheat tea, also known in Asia as \"Soba Cha\", is a nutrient-rich, decaffeinated beverage known for its amazing health benefits. Soba tea is a decaffeinated herbal tea made from roasted buckwheat seeds. Despite its name, it contains no wheat and is gluten-free when made from 100% buckwheat. It has a toasty, nutty, slightly sweet aftertaste and is known for its comforting and warming properties.",
      benefits: [
        { icon: Leaf, label: "100% Natural" },
        { icon: CupSoda, label: "Sugar Free" },
        { icon: Coffee, label: "Caffeine Free" },
        { icon: Wheat, label: "Gluten Free" },
        { icon: Sparkles, label: "Antioxidant Rich" },
        { icon: Sprout, label: "Vegan" },
      ],
      joinWaitlist: "Join the Waiting List"
    },
    nl: {
      title: "Wat is Tartary Boekweitthee",
      description: "Boekweitthee, ook bekend in Azië als \"Soba Cha\", is een voedingsrijke, cafeïnevrije drank die bekend staat om zijn geweldige gezondheidsvoordelen. Soba-thee is een cafeïnevrije kruidenthee gemaakt van geroosterde boekweitzaden. Ondanks de naam bevat het geen tarwe en is het glutenvrij wanneer gemaakt van 100% boekweit. Het heeft een geroosterde, nootachtige, licht zoete nasmaak en staat bekend om zijn troostende en verwarmende eigenschappen.",
      benefits: [
        { icon: Leaf, label: "100% Natuurlijk" },
        { icon: CupSoda, label: "Suikervrij" },
        { icon: Coffee, label: "Cafeïnevrij" },
        { icon: Wheat, label: "Glutenvrij" },
        { icon: Sparkles, label: "Antioxidantrijk" },
        { icon: Sprout, label: "Veganistisch" },
      ],
      joinWaitlist: "Schrijf je in op de Wachtlijst"
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
          
          <p className="text-lg text-muted-foreground leading-relaxed">
            {t.description}
          </p>

          {/* Benefits Icons */}
          <div className="grid grid-cols-3 md:grid-cols-6 gap-6 pt-8">
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

          {/* Join Waitlist Button */}
          <div className="pt-8">
            <Link to="/waitlist" onClick={() => trackEvent('cta_click_join_waitlist')}>
              <Button className="btn-hero text-primary-foreground">
                {t.joinWaitlist}
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};
