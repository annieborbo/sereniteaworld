import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { useSectionTracking } from '@/hooks/useSectionTracking';

export const WhenFitsBestSection = () => {
  const { language } = useLanguage();
  const sectionRef = useSectionTracking('when-fits-best');

  const moments = language === 'nl' ? [
    {
      headline: "Na een lange dag",
      subline: "Wanneer stilte je omarmt",
      size: "large",
    },
    {
      headline: "De kinderen slapen",
      subline: "Jouw moment begint",
      size: "medium",
    },
    {
      headline: "Warmte zonder cafeïne",
      subline: "Rustig tot middernacht",
      size: "medium",
    },
    {
      headline: "In plaats van wijn",
      subline: "Een bewuster alternatief",
      size: "small",
    },
    {
      headline: "Rust als keuze",
      subline: "Niet per ongeluk, maar met intentie",
      size: "small",
    },
  ] : [
    {
      headline: "After a long day",
      subline: "When silence embraces you",
      size: "large",
    },
    {
      headline: "Kids are asleep",
      subline: "Your moment begins",
      size: "medium",
    },
    {
      headline: "Warmth without caffeine",
      subline: "Calm until midnight",
      size: "medium",
    },
    {
      headline: "Instead of wine",
      subline: "A more conscious alternative",
      size: "small",
    },
    {
      headline: "Rest by choice",
      subline: "Not by accident, but with intention",
      size: "small",
    },
  ];

  return (
    <section 
      ref={sectionRef} 
      id="when-fits-best" 
      className="py-28 md:py-36 relative overflow-hidden"
      style={{
        background: 'linear-gradient(180deg, hsl(40 33% 97%) 0%, hsl(35 30% 93%) 50%, hsl(30 25% 90%) 100%)'
      }}
    >
      {/* Atmospheric background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div 
          className="absolute top-0 left-1/4 w-[600px] h-[600px] rounded-full blur-3xl opacity-30"
          style={{ background: 'radial-gradient(circle, hsl(35 40% 75%) 0%, transparent 70%)' }}
        />
        <div 
          className="absolute bottom-0 right-1/4 w-[500px] h-[500px] rounded-full blur-3xl opacity-20"
          style={{ background: 'radial-gradient(circle, hsl(350 30% 80%) 0%, transparent 70%)' }}
        />
      </div>

      <div className="container mx-auto px-4 max-w-6xl relative z-10">
        {/* Section Header */}
        <div className="text-center mb-20 animate-fade-up">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-semibold text-foreground leading-tight">
            {language === 'nl' 
              ? 'Wanneer mensen voor Serenitea kiezen' 
              : 'When people choose Serenitea'
            }
          </h2>
        </div>

        {/* Staggered Moment Cards */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8">
          {/* Large card - spans more */}
          <div 
            className="md:col-span-7 animate-fade-up"
            style={{ animationDelay: '100ms' }}
          >
            <div className="moment-card p-10 md:p-14 min-h-[280px] md:min-h-[340px] flex flex-col justify-end">
              <h3 className="text-3xl md:text-4xl font-serif font-semibold text-foreground mb-3">
                {moments[0].headline}
              </h3>
              <p className="text-lg text-muted-foreground/80 font-light">
                {moments[0].subline}
              </p>
            </div>
          </div>

          {/* Medium card */}
          <div 
            className="md:col-span-5 animate-fade-up"
            style={{ animationDelay: '200ms' }}
          >
            <div className="moment-card p-8 md:p-10 min-h-[240px] md:min-h-[340px] flex flex-col justify-end">
              <h3 className="text-2xl md:text-3xl font-serif font-semibold text-foreground mb-2">
                {moments[1].headline}
              </h3>
              <p className="text-base text-muted-foreground/80 font-light">
                {moments[1].subline}
              </p>
            </div>
          </div>

          {/* Medium card */}
          <div 
            className="md:col-span-5 md:col-start-1 animate-fade-up"
            style={{ animationDelay: '300ms' }}
          >
            <div className="moment-card p-8 md:p-10 min-h-[220px] md:min-h-[280px] flex flex-col justify-end">
              <h3 className="text-2xl md:text-3xl font-serif font-semibold text-foreground mb-2">
                {moments[2].headline}
              </h3>
              <p className="text-base text-muted-foreground/80 font-light">
                {moments[2].subline}
              </p>
            </div>
          </div>

          {/* Two smaller cards side by side */}
          <div 
            className="md:col-span-4 animate-fade-up"
            style={{ animationDelay: '400ms' }}
          >
            <div className="moment-card p-7 md:p-8 min-h-[200px] md:min-h-[280px] flex flex-col justify-end">
              <h3 className="text-xl md:text-2xl font-serif font-semibold text-foreground mb-2">
                {moments[3].headline}
              </h3>
              <p className="text-sm text-muted-foreground/80 font-light">
                {moments[3].subline}
              </p>
            </div>
          </div>

          <div 
            className="md:col-span-3 animate-fade-up"
            style={{ animationDelay: '500ms' }}
          >
            <div className="moment-card p-6 md:p-8 min-h-[180px] md:min-h-[280px] flex flex-col justify-end">
              <h3 className="text-lg md:text-xl font-serif font-semibold text-foreground mb-2">
                {moments[4].headline}
              </h3>
              <p className="text-sm text-muted-foreground/70 font-light">
                {moments[4].subline}
              </p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-16 md:mt-20 animate-fade-up" style={{ animationDelay: '600ms' }}>
          <a href="#waitlist">
            <Button className="btn-primary h-14 px-10 text-base rounded-full shadow-lg hover:shadow-xl transition-shadow">
              {language === 'nl' ? 'Ontvang als eerste bericht bij lancering' : 'Be the first to know at launch'}
            </Button>
          </a>
        </div>
      </div>
    </section>
  );
};
