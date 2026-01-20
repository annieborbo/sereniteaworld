import heroBg from '@/assets/hero-bg.jpg';
import { useLanguage } from '@/contexts/LanguageContext';
import { trackEvent } from '@/lib/analytics';
import { useSectionTracking } from '@/hooks/useSectionTracking';
import { InlineEmailCapture } from '@/components/InlineEmailCapture';

export const HeroSection = () => {
  const { t } = useLanguage();
  const sectionRef = useSectionTracking('hero');

  return (
    <section ref={sectionRef} className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroBg})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-background/60 via-background/30 to-transparent" />
      </div>

      <div className="container mx-auto px-4 relative z-10 pt-32">
        <div className="max-w-2xl">
          {/* Left Content */}
          <div className="text-left space-y-6 animate-fade-up">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif font-semibold text-foreground leading-tight">
              {t.hero.title1}
              <br />
              <span className="text-primary">{t.hero.title2}</span>
              <br />
              {t.hero.title3}
            </h1>
            
            <p className="text-lg md:text-xl text-muted-foreground max-w-lg leading-relaxed">
              {t.hero.description}
            </p>

            <div className="pt-4">
              <InlineEmailCapture 
                buttonText={t.hero.joinWaitlist}
                source="hero"
                variant="hero"
              />
            </div>

            {/* Micro-copy under CTA */}
            <p className="text-sm text-muted-foreground/80">
              {t.hero.microCopy}
            </p>

          </div>
        </div>
      </div>
    </section>
  );
};
