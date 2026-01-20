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
      availableNote: "Available at our official launch"
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
      availableNote: "Beschikbaar bij onze officiële lancering"
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

        {/* Email Capture Section - Calm Invitation */}
        <div 
          id="waitlist" 
          className="relative mt-24 py-20 -mx-4 px-4 overflow-hidden"
          style={{
            background: 'linear-gradient(180deg, hsl(40 33% 97% / 0) 0%, hsl(30 28% 92%) 15%, hsl(25 25% 88%) 50%, hsl(30 28% 92%) 85%, hsl(40 33% 97% / 0) 100%)'
          }}
        >
          {/* Atmospheric glow */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <div 
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-3xl"
              style={{ background: 'hsl(42 45% 80% / 0.3)' }}
            />
            <div 
              className="absolute top-1/3 right-1/4 w-64 h-64 rounded-full blur-3xl"
              style={{ background: 'hsl(350 35% 88% / 0.25)' }}
            />
          </div>

          {/* Card */}
          <div 
            className="relative z-10 max-w-lg mx-auto rounded-3xl p-10 md:p-12 animate-fade-up backdrop-blur-sm"
            style={{
              background: 'linear-gradient(145deg, hsl(0 0% 100% / 0.95) 0%, hsl(40 35% 98% / 0.9) 100%)',
              boxShadow: '0 25px 80px -20px hsl(30 30% 45% / 0.2), 0 10px 30px -10px hsl(30 25% 50% / 0.12), inset 0 1px 0 hsl(0 0% 100% / 0.8)',
              border: '1px solid hsl(40 30% 90% / 0.5)'
            }}
          >
            {/* Subtle inner vignette */}
            <div 
              className="absolute inset-0 rounded-3xl pointer-events-none"
              style={{
                background: 'radial-gradient(ellipse at center, transparent 50%, hsl(40 30% 92% / 0.3) 100%)'
              }}
            />

            <div className="relative z-10 text-center">
              {/* Headline */}
              <h3 className="text-3xl md:text-4xl font-serif font-medium text-foreground mb-4 leading-snug">
                {language === 'nl' ? 'Binnenkort is het zover' : 'It\'s almost time'}
              </h3>
              
              {/* Subline */}
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                {language === 'nl' 
                  ? 'Onze eerste batch is bijna klaar. Laat je e-mail achter en wees erbij.' 
                  : 'Our first batch is almost ready. Leave your email and be there.'}
              </p>

              {/* Email Form */}
              <form onSubmit={handleEmailSubmit} className="space-y-4">
                <Input
                  type="email"
                  placeholder={language === 'nl' ? 'Je e-mailadres' : 'Your email address'}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-14 text-base rounded-2xl bg-background/80 border-border/50 focus:border-primary/40 focus:ring-primary/20 text-center placeholder:text-muted-foreground/60"
                  required
                />
                <Button 
                  type="submit" 
                  className="w-full h-14 text-base rounded-2xl font-medium transition-all duration-500 hover:scale-[1.01]"
                  style={{
                    background: 'linear-gradient(135deg, hsl(165 22% 55%) 0%, hsl(165 25% 48%) 100%)',
                    boxShadow: '0 8px 24px -6px hsl(165 25% 45% / 0.35)'
                  }}
                  disabled={isSubmitting}
                >
                  {isSubmitting 
                    ? (language === 'nl' ? 'Bezig...' : 'Signing up...') 
                    : (language === 'nl' ? 'Houd me op de hoogte' : 'Keep me posted')
                  }
                </Button>
              </form>

              {/* Privacy note */}
              <p className="text-sm text-muted-foreground/70 mt-6 font-light">
                {language === 'nl' ? 'Geen spam. Alleen updates die ertoe doen.' : 'No spam. Only updates that matter.'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
