import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { useLanguage } from '@/contexts/LanguageContext';
import { Leaf, Coffee, CupSoda, Wheat, Sprout } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import aboutFounderImg from '@/assets/about-founder.jpg';
import aboutStoryImg from '@/assets/about-story.jpg';

const About = () => {
  const { language } = useLanguage();

  const content = {
    en: {
      heroTitle: "Hi, we're Serenitea",
      heroText1: "Serenitea started with a simple question: why is it so hard to find a warm drink that fits a calm evening — without caffeine, without sugar, without compromise?",
      heroText2: "We discovered buckwheat tea during our travels in Asia, where it's been enjoyed for centuries. The taste surprised us: soft, nutty, slightly sweet — like a warm hug in a cup. No caffeine, no additives. Just roasted buckwheat seeds and hot water.",
      heroText3: "We knew we had to bring this to the Netherlands. Not as a trend, but as something lasting. A daily ritual for people who value simplicity and intention in what they consume.",
      heroSign: "With warmth,",
      heroSignName: "The Serenitea Team",
      storyTitle: "How it started",
      storyText1: "What began as a personal discovery quickly became a mission. We spent months sourcing the finest tartary buckwheat, testing roast levels, and perfecting the flavor profile — balancing that signature nutty warmth with a clean, smooth finish.",
      storyText2: "Every decision we make is intentional. From the ingredients we select to the way we package our tea — minimal waste, maximum care. We believe that what you put into your body should be as thoughtful as the moment you take to enjoy it.",
      storyText3: "Serenitea isn't just a product. It's an invitation to slow down, even if just for five minutes. To choose something that's good for you, without overthinking it.",
      valuesTitle: "What we stand for",
      benefits: [
        { icon: Leaf, label: "100% Natural", desc: "Nothing artificial, ever" },
        { icon: Coffee, label: "Caffeine Free", desc: "Perfect for any time of day" },
        { icon: CupSoda, label: "Sugar Free", desc: "Pure taste, zero sugar" },
        { icon: Wheat, label: "Gluten Free", desc: "Safe for sensitive diets" },
        { icon: Sprout, label: "Vegan", desc: "Plant-based goodness" },
      ],
      cta: "Discover our tea",
    },
    nl: {
      heroTitle: "Hi, wij zijn Serenitea",
      heroText1: "Serenitea begon met een simpele vraag: waarom is het zo moeilijk om een warm drankje te vinden dat past bij een rustige avond — zonder cafeïne, zonder suiker, zonder compromis?",
      heroText2: "We ontdekten boekweitthee tijdens onze reizen in Azië, waar het al eeuwenlang wordt gedronken. De smaak verraste ons: zacht, nootachtig, licht zoet — als een warme knuffel in een kopje. Geen cafeïne, geen toevoegingen. Gewoon geroosterde boekweitzaden en heet water.",
      heroText3: "We wisten dat we dit naar Nederland moesten brengen. Niet als een trend, maar als iets blijvends. Een dagelijks ritueel voor mensen die eenvoud en intentie waarderen in wat ze consumeren.",
      heroSign: "Met warmte,",
      heroSignName: "Het Serenitea Team",
      storyTitle: "Hoe het begon",
      storyText1: "Wat begon als een persoonlijke ontdekking werd al snel een missie. We hebben maanden besteed aan het zoeken naar de beste tartaarse boekweit, het testen van brandgraden en het perfectioneren van het smaakprofiel — die kenmerkende nootachtige warmte in balans met een schone, zachte afdronk.",
      storyText2: "Elke beslissing die we nemen is intentioneel. Van de ingrediënten die we selecteren tot de manier waarop we onze thee verpakken — minimale verspilling, maximale zorg. We geloven dat wat je in je lichaam stopt net zo doordacht moet zijn als het moment dat je neemt om ervan te genieten.",
      storyText3: "Serenitea is niet zomaar een product. Het is een uitnodiging om even te vertragen, al is het maar voor vijf minuten. Om iets te kiezen dat goed voor je is, zonder er te veel over na te denken.",
      valuesTitle: "Waar we voor staan",
      benefits: [
        { icon: Leaf, label: "100% Natuurlijk", desc: "Niets kunstmatigs, ooit" },
        { icon: Coffee, label: "Cafeïnevrij", desc: "Perfect voor elk moment" },
        { icon: CupSoda, label: "Suikervrij", desc: "Puur smaak, nul suiker" },
        { icon: Wheat, label: "Glutenvrij", desc: "Veilig voor gevoelige diëten" },
        { icon: Sprout, label: "Veganistisch", desc: "Plantaardige goedheid" },
      ],
      cta: "Ontdek onze thee",
    },
  };

  const t = content[language];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        {/* Hero / Founder Section */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
              {/* Image */}
              <div className="animate-slide-in-left">
                <div className="relative rounded-2xl overflow-hidden shadow-card">
                  <img
                    src={aboutFounderImg}
                    alt="Serenitea - a warm cup of buckwheat tea"
                    className="w-full h-[500px] md:h-[650px] object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-foreground/10 to-transparent" />
                </div>
              </div>

              {/* Text */}
              <div className="animate-slide-in-right space-y-6">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-semibold text-foreground leading-tight">
                  {t.heroTitle}
                </h1>
                <div className="space-y-4">
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    {t.heroText1}
                  </p>
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    {t.heroText2}
                  </p>
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    {t.heroText3}
                  </p>
                </div>
                <div className="pt-4">
                  <p className="text-muted-foreground italic">{t.heroSign}</p>
                  <p className="font-serif text-xl font-semibold text-foreground">{t.heroSignName}</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Story Section */}
        <section className="py-16 md:py-24 bg-secondary/20">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
              {/* Text (reversed order on desktop) */}
              <div className="order-2 lg:order-1 animate-fade-up space-y-6">
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-semibold text-foreground">
                  {t.storyTitle}
                </h2>
                <div className="space-y-4">
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    {t.storyText1}
                  </p>
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    {t.storyText2}
                  </p>
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    {t.storyText3}
                  </p>
                </div>
              </div>

              {/* Image */}
              <div className="order-1 lg:order-2 animate-fade-up">
                <div className="relative rounded-2xl overflow-hidden shadow-card">
                  <img
                    src={aboutStoryImg}
                    alt="Buckwheat tea seeds and preparation"
                    className="w-full h-[500px] md:h-[650px] object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-foreground/10 to-transparent" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-semibold text-foreground text-center mb-16">
              {t.valuesTitle}
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-8 max-w-4xl mx-auto">
              {t.benefits.map((benefit, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center gap-3 text-center animate-fade-up"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                    <benefit.icon className="w-7 h-7 text-primary" />
                  </div>
                  <span className="text-sm font-semibold text-foreground">{benefit.label}</span>
                  <span className="text-xs text-muted-foreground">{benefit.desc}</span>
                </div>
              ))}
            </div>

            <div className="text-center mt-16">
              <Button asChild size="lg" className="btn-hero">
                <Link to="/#featured-products">{t.cta}</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default About;
