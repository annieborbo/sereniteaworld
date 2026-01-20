import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { useSectionTracking } from '@/hooks/useSectionTracking';

export const WhenFitsBestSection = () => {
  const { language } = useLanguage();
  const sectionRef = useSectionTracking('when-fits-best');

  const moments = {
    en: [
      { headline: "After a long day", subline: "When silence finally settles in" },
      { headline: "Kids asleep at last", subline: "A quiet moment, just for you" },
      { headline: "Warmth without the buzz", subline: "Cozy, without the caffeine" },
      { headline: "Instead of that glass", subline: "A gentler way to unwind" },
      { headline: "Choosing calm", subline: "Rest, on purpose" },
    ],
    nl: [
      { headline: "Na een lange dag", subline: "Wanneer de stilte eindelijk valt" },
      { headline: "Kinderen eindelijk op bed", subline: "Een rustig moment, alleen voor jou" },
      { headline: "Warmte zonder de buzz", subline: "Gezellig, zonder cafeïne" },
      { headline: "In plaats van dat glas", subline: "Een zachtere manier om te ontspannen" },
      { headline: "Bewust kiezen voor rust", subline: "Rust, met intentie" },
    ]
  };

  const content = moments[language];

  return (
    <section 
      ref={sectionRef} 
      id="when-fits-best" 
      className="py-32 relative overflow-hidden"
      style={{
        background: 'linear-gradient(180deg, hsl(40 33% 97%) 0%, hsl(30 30% 94%) 30%, hsl(25 25% 88%) 70%, hsl(20 20% 82%) 100%)'
      }}
    >
      {/* Atmospheric overlays */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Warm vignette effect */}
        <div 
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(ellipse at center, transparent 0%, hsl(25 30% 75% / 0.15) 70%, hsl(20 25% 65% / 0.3) 100%)'
          }}
        />
        {/* Soft glow spots */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-3xl" style={{ background: 'hsl(40 40% 85% / 0.4)' }} />
        <div className="absolute bottom-1/3 right-1/4 w-80 h-80 rounded-full blur-3xl" style={{ background: 'hsl(350 35% 88% / 0.3)' }} />
      </div>

      <div className="container mx-auto px-4 max-w-6xl relative z-10">
        {/* Section Header */}
        <div className="text-center mb-20 animate-fade-up">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-medium text-foreground leading-tight">
            {language === 'nl' ? 'Voor momenten die om rust vragen' : 'For moments that ask for calm'}
          </h2>
        </div>

        {/* Staggered Moment Cards */}
        <div className="relative max-w-5xl mx-auto">
          {/* Row 1 - offset left */}
          <div className="flex flex-col md:flex-row gap-6 md:gap-8 mb-6 md:mb-8">
            <MomentCard 
              moment={content[0]} 
              className="md:w-[55%] md:ml-0" 
              delay={0}
              variant="warm"
            />
            <MomentCard 
              moment={content[1]} 
              className="md:w-[40%]" 
              delay={150}
              variant="soft"
            />
          </div>

          {/* Row 2 - center emphasis */}
          <div className="flex justify-center mb-6 md:mb-8">
            <MomentCard 
              moment={content[2]} 
              className="md:w-[50%]" 
              delay={300}
              variant="glow"
            />
          </div>

          {/* Row 3 - offset right */}
          <div className="flex flex-col md:flex-row gap-6 md:gap-8">
            <MomentCard 
              moment={content[3]} 
              className="md:w-[38%] md:ml-auto md:mr-4" 
              delay={450}
              variant="dusk"
            />
            <MomentCard 
              moment={content[4]} 
              className="md:w-[52%]" 
              delay={600}
              variant="evening"
            />
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-20 animate-fade-up" style={{ animationDelay: '800ms' }}>
          <a href="#waitlist">
            <Button 
              className="h-14 px-10 text-base rounded-full font-medium transition-all duration-500 hover:scale-[1.02]"
              style={{
                background: 'linear-gradient(135deg, hsl(165 25% 50%) 0%, hsl(165 25% 42%) 100%)',
                boxShadow: '0 8px 32px -8px hsl(165 25% 40% / 0.35)'
              }}
            >
              {language === 'nl' ? 'Ontvang als eerste bericht bij lancering' : 'Be the first to know at launch'}
            </Button>
          </a>
        </div>
      </div>
    </section>
  );
};

interface MomentCardProps {
  moment: { headline: string; subline: string };
  className?: string;
  delay: number;
  variant: 'warm' | 'soft' | 'glow' | 'dusk' | 'evening';
}

const MomentCard = ({ moment, className = '', delay, variant }: MomentCardProps) => {
  const variantStyles = {
    warm: {
      background: 'linear-gradient(145deg, hsl(0 0% 100% / 0.9) 0%, hsl(40 35% 97% / 0.85) 100%)',
      border: 'hsl(40 30% 88% / 0.6)',
      shadow: '0 12px 40px -12px hsl(30 30% 50% / 0.15), 0 4px 12px -4px hsl(30 25% 60% / 0.1)',
      hoverShadow: '0 20px 60px -15px hsl(30 30% 45% / 0.25), 0 8px 24px -8px hsl(30 25% 55% / 0.15)',
    },
    soft: {
      background: 'linear-gradient(145deg, hsl(0 0% 100% / 0.85) 0%, hsl(350 30% 97% / 0.8) 100%)',
      border: 'hsl(350 25% 90% / 0.5)',
      shadow: '0 12px 40px -12px hsl(350 25% 60% / 0.12), 0 4px 12px -4px hsl(350 20% 70% / 0.08)',
      hoverShadow: '0 20px 60px -15px hsl(350 25% 55% / 0.2), 0 8px 24px -8px hsl(350 20% 65% / 0.12)',
    },
    glow: {
      background: 'linear-gradient(145deg, hsl(0 0% 100% / 0.95) 0%, hsl(42 40% 96% / 0.9) 100%)',
      border: 'hsl(42 35% 85% / 0.6)',
      shadow: '0 16px 50px -12px hsl(42 40% 50% / 0.18), 0 6px 16px -6px hsl(42 35% 55% / 0.12)',
      hoverShadow: '0 24px 70px -15px hsl(42 40% 45% / 0.28), 0 10px 30px -10px hsl(42 35% 50% / 0.18)',
    },
    dusk: {
      background: 'linear-gradient(145deg, hsl(0 0% 100% / 0.88) 0%, hsl(25 25% 95% / 0.82) 100%)',
      border: 'hsl(25 20% 85% / 0.5)',
      shadow: '0 12px 40px -12px hsl(25 30% 50% / 0.14), 0 4px 12px -4px hsl(25 25% 60% / 0.1)',
      hoverShadow: '0 20px 60px -15px hsl(25 30% 45% / 0.22), 0 8px 24px -8px hsl(25 25% 55% / 0.14)',
    },
    evening: {
      background: 'linear-gradient(145deg, hsl(0 0% 100% / 0.92) 0%, hsl(165 20% 97% / 0.88) 100%)',
      border: 'hsl(165 15% 88% / 0.5)',
      shadow: '0 12px 40px -12px hsl(165 25% 45% / 0.12), 0 4px 12px -4px hsl(165 20% 55% / 0.08)',
      hoverShadow: '0 20px 60px -15px hsl(165 25% 40% / 0.2), 0 8px 24px -8px hsl(165 20% 50% / 0.12)',
    },
  };

  const style = variantStyles[variant];

  return (
    <div
      className={`group relative rounded-3xl p-8 md:p-10 backdrop-blur-sm animate-fade-up transition-all duration-700 ease-out cursor-default ${className}`}
      style={{ 
        animationDelay: `${delay}ms`,
        background: style.background,
        border: `1px solid ${style.border}`,
        boxShadow: style.shadow,
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-6px)';
        e.currentTarget.style.boxShadow = style.hoverShadow;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = style.shadow;
      }}
    >
      {/* Subtle inner glow on hover */}
      <div 
        className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, hsl(40 40% 95% / 0.5) 0%, transparent 70%)'
        }}
      />
      
      <div className="relative z-10">
        <h3 className="text-2xl md:text-3xl font-serif font-medium text-foreground mb-3 transition-all duration-500 group-hover:translate-x-1">
          {moment.headline}
        </h3>
        <p className="text-base md:text-lg text-muted-foreground font-light tracking-wide opacity-80 group-hover:opacity-100 transition-opacity duration-500">
          {moment.subline}
        </p>
      </div>
    </div>
  );
};
