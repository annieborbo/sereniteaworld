import { useLanguage } from '@/contexts/LanguageContext';
import { useSectionTracking } from '@/hooks/useSectionTracking';
import { InlineEmailCapture } from '@/components/InlineEmailCapture';

// Import lifestyle images
import momentEveningCalm from '@/assets/moment-evening-calm.jpg';
import momentAfterKids from '@/assets/moment-after-kids.jpg';
import momentWarmCup from '@/assets/moment-warm-cup.jpg';
import momentConsciousChoice from '@/assets/moment-conscious-choice.jpg';
import momentIntentionalRest from '@/assets/moment-intentional-rest.jpg';

interface MomentCard {
  id: string;
  image: string;
  titleNl: string;
  titleEn: string;
  subtitleNl: string;
  subtitleEn: string;
  size: 'large' | 'medium' | 'small' | 'tall';
}

const moments: MomentCard[] = [
  {
    id: 'evening-calm',
    image: momentEveningCalm,
    titleNl: 'Na een lange dag',
    titleEn: 'After a long day',
    subtitleNl: 'Eindelijk even rust',
    subtitleEn: 'Finally, a quiet moment',
    size: 'large',
  },
  {
    id: 'after-kids',
    image: momentAfterKids,
    titleNl: 'De kinderen slapen',
    titleEn: 'Kids are asleep',
    subtitleNl: 'Tijd voor jezelf',
    subtitleEn: 'Time for yourself',
    size: 'medium',
  },
  {
    id: 'warm-cup',
    image: momentWarmCup,
    titleNl: 'Iets warms, geen cafeïne',
    titleEn: 'Something warm, no caffeine',
    subtitleNl: 'Warmte zonder prikkels',
    subtitleEn: 'Warmth without the buzz',
    size: 'tall',
  },
  {
    id: 'conscious-choice',
    image: momentConsciousChoice,
    titleNl: 'In plaats van koffie of wijn',
    titleEn: 'Instead of coffee or wine',
    subtitleNl: 'Een bewuste keuze',
    subtitleEn: 'A mindful alternative',
    size: 'medium',
  },
  {
    id: 'intentional-rest',
    image: momentIntentionalRest,
    titleNl: 'Bewust kiezen voor rust',
    titleEn: 'Choosing rest',
    subtitleNl: 'Een moment van stilte',
    subtitleEn: 'A moment of stillness',
    size: 'small',
  },
];

export const WhenFitsBestSection = () => {
  const { language } = useLanguage();
  const sectionRef = useSectionTracking('when-fits-best');

  const getSizeClasses = (size: MomentCard['size']) => {
    switch (size) {
      case 'large':
        return 'md:col-span-2 md:row-span-2';
      case 'medium':
        return 'md:col-span-1 md:row-span-1';
      case 'tall':
        return 'md:col-span-1 md:row-span-2';
      case 'small':
        return 'md:col-span-1 md:row-span-1';
      default:
        return '';
    }
  };

  return (
    <section 
      ref={sectionRef} 
      id="when-fits-best" 
      className="py-14 md:py-16 bg-gradient-to-b from-muted/30 via-background to-muted/20 relative overflow-hidden"
    >
      {/* Ambient background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-20 w-96 h-96 bg-primary/5 rounded-full blur-[100px]" />
        <div className="absolute bottom-1/4 -right-20 w-[500px] h-[500px] bg-secondary/8 rounded-full blur-[120px]" />
      </div>

      <div className="container mx-auto px-4 max-w-6xl relative z-10">
        {/* Header */}
        <div className="text-center mb-10 animate-fade-up">
          <h2 className="text-4xl md:text-5xl font-serif font-semibold text-foreground">
            {language === 'nl' ? 'Wanneer mensen voor Serenitea kiezen' : 'When people choose Serenitea'}
          </h2>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5 auto-rows-[200px] md:auto-rows-[180px]">
          {moments.map((moment, index) => (
            <div
              key={moment.id}
              className={`group relative rounded-3xl overflow-hidden cursor-pointer
                         ${getSizeClasses(moment.size)}
                         animate-fade-up`}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Image */}
              <div className="absolute inset-0">
                <img
                  src={moment.image}
                  alt={language === 'nl' ? moment.titleNl : moment.titleEn}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out
                             group-hover:scale-105"
                />
              </div>
              
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent
                              transition-opacity duration-500 group-hover:from-black/80" />
              
              {/* Subtle glow on hover */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500
                              bg-gradient-to-t from-primary/10 via-transparent to-transparent" />

              {/* Content */}
              <div className="absolute inset-0 p-6 flex flex-col justify-end">
                <div className="transform transition-transform duration-500 group-hover:translate-y-[-4px]">
                  <h3 className="text-white font-serif text-xl md:text-2xl font-medium mb-1
                                 drop-shadow-lg">
                    {language === 'nl' ? moment.titleNl : moment.titleEn}
                  </h3>
                  <p className="text-white/70 text-sm md:text-base font-light drop-shadow-md">
                    {language === 'nl' ? moment.subtitleNl : moment.subtitleEn}
                  </p>
                </div>
              </div>

              {/* Subtle border glow */}
              <div className="absolute inset-0 rounded-3xl ring-1 ring-white/10 
                              group-hover:ring-white/20 transition-all duration-500" />
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="flex justify-center mt-14 animate-fade-up" style={{ animationDelay: '500ms' }}>
          <InlineEmailCapture 
            buttonText={language === 'nl' ? 'Ontvang als eerste bericht bij lancering' : 'Be the first to know at launch'}
            source="when-fits-best"
            variant="subtle"
          />
        </div>
      </div>
    </section>
  );
};
