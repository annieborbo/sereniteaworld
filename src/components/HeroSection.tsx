import heroBg from '@/assets/hero-bg.jpg';
import teaBox from '@/assets/tea-box.png';
import teaPouch from '@/assets/tea-pouch.png';
import { Button } from '@/components/ui/button';
import { ChevronDown } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

export const HeroSection = () => {
  const { t } = useLanguage();

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
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="text-left space-y-6 animate-fade-up">
            <span className="inline-block px-4 py-2 bg-secondary/60 backdrop-blur-sm rounded-full text-sm font-medium text-foreground/80 tracking-wider uppercase">
              {t.hero.badge}
            </span>
            
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
              <Button className="btn-hero text-primary-foreground">
                {t.hero.shopNow}
              </Button>
            </div>

            {/* Trust Badges */}
            <div className="flex flex-wrap gap-6 pt-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span>{t.hero.glutenFree}</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </div>
                <span>{t.hero.vegan}</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707" />
                  </svg>
                </div>
                <span>{t.hero.natural}</span>
              </div>
            </div>
          </div>

          {/* Right Content - Product Images */}
          <div className="relative hidden lg:flex justify-center items-center">
            <div className="relative">
              {/* Main product - Box */}
              <img
                src={teaBox}
                alt="Serenitea Tartary Buckwheat Tea Box"
                className="w-80 h-auto drop-shadow-2xl"
              />
              {/* Secondary product - Pouch */}
              <img
                src={teaPouch}
                alt="Serenitea Tartary Buckwheat Tea Pouch"
                className="absolute -right-20 -bottom-10 w-56 h-auto drop-shadow-xl"
              />
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2">
          <a href="#featured" className="flex flex-col items-center gap-2 text-muted-foreground hover:text-primary transition-colors">
            <span className="text-sm tracking-wider uppercase">{t.hero.discover}</span>
            <ChevronDown className="w-5 h-5" />
          </a>
        </div>
      </div>
    </section>
  );
};
