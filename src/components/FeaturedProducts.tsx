import { useState } from 'react';
import teaBox from '@/assets/tea-box.png';
import teaPouch from '@/assets/tea-pouch.png';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useLanguage } from '@/contexts/LanguageContext';
import { trackEvent } from '@/lib/analytics';
import { useSectionTracking } from '@/hooks/useSectionTracking';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export const FeaturedProducts = () => {
  const { t, language } = useLanguage();
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
      availableNote: "Available at our official launch",
      emailCapture: {
        headline: "We're launching soon",
        subheadline: "Want to be the first to order?",
        bullets: [
          "Early access to the launch",
          "Exclusive launch discount",
          "Maximum 1–2 emails per month"
        ],
        cta: "Sign me up",
        privacy: "No spam. Unsubscribe anytime."
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
      availableNote: "Beschikbaar bij onze officiële lancering",
      emailCapture: {
        headline: "We lanceren binnenkort",
        subheadline: "Wil je als eerste bestellen?",
        bullets: [
          "Vroege toegang tot de lancering",
          "Exclusieve lanceringskorting",
          "Maximaal 1–2 e-mails per maand"
        ],
        cta: "Schrijf me in",
        privacy: "Geen spam. Afmelden kan altijd."
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

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !email.includes('@')) {
      toast.error(language === 'nl' ? 'Voer een geldig e-mailadres in' : 'Please enter a valid email address');
      return;
    }

    setIsSubmitting(true);
    trackEvent('waitlist_signup_attempt', { source: 'products_section' });

    try {
      const { error } = await supabase
        .from('waitlist_signups')
        .insert([{ email, format: 'products-section' }]);

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
    <section ref={sectionRef} id="featured" className="py-24 bg-muted/30">
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
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {products.map((product, index) => (
            <div
              key={product.id}
              className="card-product group animate-fade-up"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              {/* Image Container */}
              <div className="relative aspect-square bg-gradient-to-br from-secondary/30 to-muted/50 p-8 overflow-hidden">
                {/* Product Image */}
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
                    €{product.price.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>


        {/* Email Capture Section */}
        <div className="max-w-xl mx-auto bg-card border border-border rounded-2xl p-8 md:p-10 shadow-lg animate-fade-up">
          <div className="text-center space-y-4">
            <h3 className="text-2xl md:text-3xl font-serif font-semibold text-foreground">
              {c.emailCapture.headline}
            </h3>
            <p className="text-lg text-muted-foreground">
              {c.emailCapture.subheadline}
            </p>
          </div>

          {/* Bullet Points */}
          <ul className="mt-6 space-y-3">
            {c.emailCapture.bullets.map((bullet, index) => (
              <li key={index} className="flex items-center gap-3 text-muted-foreground">
                <span className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                {bullet}
              </li>
            ))}
          </ul>

          {/* Email Form */}
          <form onSubmit={handleEmailSubmit} className="mt-8 space-y-4">
            <Input
              type="email"
              placeholder={language === 'nl' ? 'Je e-mailadres' : 'Your email address'}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="h-12 text-base"
              required
            />
            <Button 
              type="submit" 
              className="w-full btn-primary h-12 text-base"
              disabled={isSubmitting}
            >
              {isSubmitting 
                ? (language === 'nl' ? 'Bezig...' : 'Loading...') 
                : c.emailCapture.cta
              }
            </Button>
          </form>

          {/* Privacy Micro-copy */}
          <p className="text-center text-sm text-muted-foreground mt-4">
            {c.emailCapture.privacy}
          </p>
        </div>
      </div>
    </section>
  );
};
