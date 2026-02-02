import { useState } from 'react';
import teaBox from '@/assets/tea-box.jpg';
import teaPouch from '@/assets/tea-pouch.jpg';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useLanguage } from '@/contexts/LanguageContext';
import { trackEvent } from '@/lib/analytics';
import { useSectionTracking } from '@/hooks/useSectionTracking';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { Check } from 'lucide-react';
import heroBg from '@/assets/hero-bg.jpg';

export const FeaturedProducts = () => {
  const { language } = useLanguage();
  const sectionRef = useSectionTracking('featured-products');
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const content = {
    en: {
      title: "Coming Soon",
      subtitle: "We're starting with a small first batch. Sign up to be the first to order.",
      pouch: {
        name: "Tartary Buckwheat Tea – Loose Tea",
        description: "For those who like to brew themselves and want control over strength and taste."
      },
      box: {
        name: "Tartary Buckwheat Tea – Tea Bags",
        description: "Convenient, quick and mess-free."
      },
      emailCapture: {
        headline: "We're launching soon",
        subheadline: "Be the first to experience Serenitea. Sign up for early access and an exclusive launch discount.",
        bullets: [
          "Early access to the launch",
          "Exclusive launch discount",
          "Maximum 1–2 emails per month"
        ],
        cta: "Sign up for early access",
        privacy: "No spam. Unsubscribe anytime.",
        placeholder: "Enter your email"
      }
    },
    nl: {
      title: "Binnenkort verkrijgbaar",
      subtitle: "We starten met een kleine eerste batch. Schrijf je in om als eerste te bestellen.",
      pouch: {
        name: "Tataarse boekweit thee – losse thee",
        description: "Voor wie graag zelf zet en controle wil over sterkte en smaak."
      },
      box: {
        name: "Tataarse boekweit thee – theezakjes",
        description: "Handig, snel en zonder rommel."
      },
      emailCapture: {
        headline: "We lanceren binnenkort",
        subheadline: "Wees de eerste die Serenitea ervaart. Schrijf je in voor vroege toegang en een exclusieve lanceringskorting.",
        bullets: [
          "Vroege toegang tot de lancering",
          "Exclusieve lanceringskorting",
          "Alleen wanneer het echt de moeite waard is."
        ],
        cta: "Meld je aan voor vroege toegang",
        privacy: "Geen spam. Afmelden kan altijd.",
        placeholder: "Je e-mailadres"
      }
    }
  };

  const c = content[language];

  const products = [
    {
      id: 1,
      name: c.pouch.name,
      description: c.pouch.description,
      price: 12.99,
      image: teaPouch,
      format: 'losse-thee',
    },
    {
      id: 2,
      name: c.box.name,
      description: c.box.description,
      price: 9.99,
      image: teaBox,
      format: 'theezakjes',
    },
  ];

  // Proper email validation regex
  const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const trimmedEmail = email.trim().toLowerCase();
    if (!trimmedEmail || !EMAIL_REGEX.test(trimmedEmail)) {
      toast.error(language === 'nl' ? 'Voer een geldig e-mailadres in' : 'Please enter a valid email address');
      return;
    }

    setIsSubmitting(true);
    trackEvent('waitlist_signup_attempt', { source: 'products_section' });

    try {
      const { error } = await supabase
        .from('waitlist_signups')
        .insert([{ email: trimmedEmail, format: 'products-section' }]);

      if (error) {
        if (error.code === '23505') {
          toast.info(language === 'nl' ? 'Je staat al op de wachtlijst!' : 'You\'re already on the waitlist!');
        } else {
          throw error;
        }
      } else {
        toast.success(language === 'nl' ? 'Je bent ingeschreven!' : 'You\'re signed up!');
        trackEvent('waitlist_signup_success', { source: 'products_section' });
        setEmail('');
      }
    } catch (error) {
      console.error('Error signing up:', error);
      toast.error(language === 'nl' ? 'Er ging iets mis. Probeer het opnieuw.' : 'Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section ref={sectionRef} id="featured" className="py-16 md:py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-4 animate-fade-up">
          <h2 className="text-4xl md:text-5xl font-serif font-semibold text-foreground">
            {c.title}
          </h2>
        </div>

        {/* Subheader */}
        <p className="text-center text-lg text-muted-foreground mb-12 max-w-xl mx-auto animate-fade-up">
          {c.subtitle}
        </p>

        {/* Products Grid */}
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-16">
          {products.map((product, index) => (
            <div
              key={product.id}
              className="card-product group animate-fade-up"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              {/* Image Container */}
              <div className="relative aspect-[4/5] bg-gradient-to-br from-secondary/30 to-muted/50 p-4 overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-110"
                />
              </div>

              {/* Product Info */}
              <div className="p-6">
                <h3 className="text-xl font-serif font-semibold text-foreground mb-1 group-hover:text-primary transition-colors">
                  {product.name}
                </h3>
                <p className="text-sm text-muted-foreground mb-4">{product.description}</p>
                <div className="flex items-center gap-3">
                  <span className="text-2xl font-semibold text-foreground">
                    <span className="text-base font-normal text-muted-foreground mr-1">{language === 'nl' ? 'vanaf' : 'from'}</span>
                    €{product.price.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Email Capture Section with hero-style background */}
        <div className="relative py-16 md:py-20 -mx-4 px-4 overflow-hidden">
          {/* Background Image */}
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${heroBg})` }}
          >
            <div className="absolute inset-0 bg-background/70 backdrop-blur-[2px]" />
          </div>

          {/* Top fade */}
          <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-muted/30 to-transparent z-[1]" />
          
          {/* Bottom fade */}
          <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-muted/30 to-transparent z-[1]" />

          <div id="waitlist" className="max-w-2xl mx-auto text-center relative z-10 animate-fade-up">
            <h3 className="text-4xl md:text-5xl font-serif font-semibold text-foreground leading-tight mb-6">
              {c.emailCapture.headline}
            </h3>
            
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-8">
              {c.emailCapture.subheadline}
            </p>

            {/* Bullet Points */}
            <ul className="inline-flex flex-col items-start space-y-3 mb-8 text-left">
              {c.emailCapture.bullets.map((bullet, index) => (
                <li key={index} className="flex items-center gap-3 text-foreground">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center">
                    <Check className="w-3.5 h-3.5 text-primary" />
                  </span>
                  <span className="text-base md:text-lg">{bullet}</span>
                </li>
              ))}
            </ul>

            {/* Email Form */}
            <form onSubmit={handleEmailSubmit} className="mb-4 max-w-lg mx-auto">
              <div className="flex flex-col sm:flex-row gap-3">
                <Input
                  type="email"
                  placeholder={c.emailCapture.placeholder}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-14 text-base flex-1 rounded-full px-6 bg-background/80 backdrop-blur-sm border-border/60 focus:border-primary"
                  required
                />
                <Button 
                  type="submit" 
                  className="btn-primary h-14 px-10 text-base rounded-full whitespace-nowrap shadow-lg shadow-primary/20"
                  disabled={isSubmitting}
                >
                  {isSubmitting 
                    ? (language === 'nl' ? 'Bezig...' : 'Loading...') 
                    : c.emailCapture.cta
                  }
                </Button>
              </div>
            </form>

            {/* Privacy Micro-copy */}
            <p className="text-sm text-muted-foreground">
              {c.emailCapture.privacy}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
