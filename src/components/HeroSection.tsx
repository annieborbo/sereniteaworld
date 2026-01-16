import heroBg from '@/assets/hero-bg.jpg';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { trackEvent } from '@/lib/analytics';

export const HeroSection = () => {
  const { t } = useLanguage();

  const handleJoinWaitlistClick = () => {
    trackEvent('cta_click_join_waitlist');
  };

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
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

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <a href="/waitlist" onClick={handleJoinWaitlistClick}>
                <Button className="btn-hero text-primary-foreground">
                  {t.hero.joinWaitlist}
                </Button>
              </a>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};
