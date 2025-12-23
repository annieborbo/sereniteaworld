import teaPouch from '@/assets/tea-pouch.png';
import { useLanguage } from '@/contexts/LanguageContext';

export const AboutSection = () => {
  const { t } = useLanguage();

  return (
    <section id="about" className="py-24 bg-secondary/20 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Image Side */}
          <div className="relative animate-slide-in-left">
            <div className="relative">
              {/* Decorative Elements */}
              <div className="absolute -top-8 -left-8 w-32 h-32 bg-primary/10 rounded-full blur-3xl" />
              <div className="absolute -bottom-8 -right-8 w-48 h-48 bg-secondary/40 rounded-full blur-3xl" />
              
              {/* Main Image */}
              <div className="relative bg-gradient-to-br from-secondary/50 to-muted rounded-3xl p-12">
                <img
                  src={teaPouch}
                  alt="Serenitea Tea Pouch"
                  className="w-full max-w-md mx-auto drop-shadow-2xl"
                />
              </div>
            </div>
          </div>

          {/* Content Side */}
          <div className="space-y-6 animate-slide-in-right">
            <span className="text-primary font-medium tracking-widest uppercase text-sm">{t.about.subtitle}</span>
            <h2 className="text-4xl md:text-5xl font-serif font-semibold text-foreground leading-tight">
              {t.about.title1}
              <br />
              <span className="text-primary">{t.about.title2}</span>
            </h2>
            
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>{t.about.p1}</p>
              <p>{t.about.p2}</p>
              <p>{t.about.p3}</p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 pt-8 border-t border-border">
              <div>
                <div className="text-3xl font-serif font-semibold text-primary">100%</div>
                <div className="text-sm text-muted-foreground mt-1">{t.about.stats.natural}</div>
              </div>
              <div>
                <div className="text-3xl font-serif font-semibold text-primary">0mg</div>
                <div className="text-sm text-muted-foreground mt-1">{t.about.stats.caffeine}</div>
              </div>
              <div>
                <div className="text-3xl font-serif font-semibold text-primary">1000+</div>
                <div className="text-sm text-muted-foreground mt-1">{t.about.stats.customers}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
