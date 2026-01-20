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
        headline: "Be among the first",
        subheadline: "A small first batch. Limited spots.",
        note: "We'll only reach out when there's something worth sharing.",
        cta: "Save my spot",
        privacy: "No spam. Just tea."
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
        headline: "Wees erbij",
        subheadline: "Een kleine eerste batch. Beperkt aantal plekken.",
        note: "We mailen alleen als er iets te delen is.",
        cta: "Reserveer mijn plek",
        privacy: "Geen spam. Alleen thee."
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
                    <span className="text-base font-normal text-muted-foreground mr-1">{language === 'nl' ? 'vanaf' : 'from'}</span>
                    €{product.price.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>


        {/* Email Capture Section - Evening Invitation */}
        <div 
          id="waitlist" 
          className="mt-24 md:mt-32 py-20 md:py-28 -mx-4 px-4 relative overflow-hidden"
          style={{
            background: 'linear-gradient(180deg, hsl(25 30% 16%) 0%, hsl(280 20% 14%) 60%, hsl(220 25% 13%) 100%)'
          }}
        >
          {/* Warm glow effect */}
          <div 
            className="absolute inset-0 pointer-events-none"
            style={{
              background: 'radial-gradient(ellipse 80% 60% at 50% 40%, hsl(35 55% 40% / 0.25) 0%, transparent 60%)'
            }}
          />
          
          {/* Vignette */}
          <div 
            className="absolute inset-0 pointer-events-none"
            style={{
              background: 'radial-gradient(ellipse at center, transparent 40%, hsl(220 30% 8% / 0.4) 100%)'
            }}
          />

          <div className="relative z-10 max-w-lg mx-auto text-center">
            {/* Headline */}
            <h3 
              className="text-3xl md:text-4xl lg:text-5xl font-serif font-semibold mb-4 animate-fade-up"
              style={{ color: 'hsl(40 40% 92%)' }}
            >
              {c.emailCapture.headline}
            </h3>
            
            {/* Subheadline */}
            <p 
              className="text-lg md:text-xl font-light mb-3 animate-fade-up"
              style={{ color: 'hsl(35 30% 75%)', animationDelay: '100ms' }}
            >
              {c.emailCapture.subheadline}
            </p>
            
            {/* Note */}
            <p 
              className="text-sm mb-10 animate-fade-up"
              style={{ color: 'hsl(35 20% 55%)', animationDelay: '150ms' }}
            >
              {c.emailCapture.note}
            </p>

            {/* Form Card */}
            <div 
              className="backdrop-blur-sm rounded-2xl p-8 md:p-10 animate-fade-up"
              style={{ 
                background: 'hsl(30 20% 98% / 0.06)',
                border: '1px solid hsl(35 30% 50% / 0.15)',
                boxShadow: '0 20px 50px -15px hsl(0 0% 0% / 0.3), inset 0 1px 0 0 hsl(35 40% 60% / 0.1)',
                animationDelay: '200ms'
              }}
            >
              <form onSubmit={handleEmailSubmit} className="space-y-5">
                <Input
                  type="email"
                  placeholder={language === 'nl' ? 'Je e-mailadres' : 'Your email address'}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-14 text-base rounded-xl border-0 text-foreground placeholder:text-muted-foreground/60"
                  style={{ 
                    background: 'hsl(40 30% 97%)',
                    boxShadow: 'inset 0 2px 4px hsl(0 0% 0% / 0.05)'
                  }}
                  required
                />
                <Button 
                  type="submit" 
                  className="w-full h-14 text-base font-medium rounded-xl transition-all duration-300"
                  style={{
                    background: 'linear-gradient(135deg, hsl(165 25% 50%) 0%, hsl(165 30% 42%) 100%)',
                    color: 'hsl(40 33% 97%)',
                    boxShadow: '0 4px 15px -3px hsl(165 30% 40% / 0.4)'
                  }}
                  disabled={isSubmitting}
                >
                  {isSubmitting 
                    ? (language === 'nl' ? 'Bezig...' : 'Saving...') 
                    : c.emailCapture.cta
                  }
                </Button>
              </form>
            </div>

            {/* Privacy */}
            <p 
              className="text-sm mt-6 animate-fade-up"
              style={{ color: 'hsl(35 15% 45%)', animationDelay: '300ms' }}
            >
              {c.emailCapture.privacy}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
