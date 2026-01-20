import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useLanguage } from '@/contexts/LanguageContext';
import { trackEvent } from '@/lib/analytics';
import { useSectionTracking } from '@/hooks/useSectionTracking';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { Check } from 'lucide-react';
import productsHero from '@/assets/products-hero.jpg';

export const FeaturedProducts = () => {
  const { language } = useLanguage();
  const sectionRef = useSectionTracking('featured-products');
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const content = {
    en: {
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
    },
    nl: {
      headline: "We lanceren binnenkort",
      subheadline: "Wees de eerste die Serenitea ervaart. Schrijf je in voor vroege toegang en een exclusieve lanceringskorting.",
      bullets: [
        "Vroege toegang tot de lancering",
        "Exclusieve lanceringskorting",
        "Maximaal 1–2 e-mails per maand"
      ],
      cta: "Meld je aan voor vroege toegang",
      privacy: "Geen spam. Afmelden kan altijd.",
      placeholder: "Je e-mailadres"
    }
  };

  const c = content[language];

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
    <section ref={sectionRef} id="featured" className="py-16 md:py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center max-w-6xl mx-auto">
          
          {/* Left: Image */}
          <div className="relative animate-fade-up order-2 lg:order-1">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl shadow-primary/10">
              <img
                src={productsHero}
                alt="Serenitea buckwheat tea"
                className="w-full h-auto object-cover"
              />
              {/* Subtle overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent" />
            </div>
            
            {/* Decorative elements */}
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-primary/10 rounded-full blur-2xl" />
            <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-secondary/20 rounded-full blur-3xl" />
          </div>

          {/* Right: Content */}
          <div id="waitlist" className="space-y-6 order-1 lg:order-2 animate-fade-up" style={{ animationDelay: '100ms' }}>
            <h2 className="text-4xl md:text-5xl font-serif font-semibold text-foreground leading-tight">
              {c.headline}
            </h2>
            
            <p className="text-lg text-muted-foreground leading-relaxed">
              {c.subheadline}
            </p>

            {/* Bullet Points */}
            <ul className="space-y-3 pt-2">
              {c.bullets.map((bullet, index) => (
                <li key={index} className="flex items-center gap-3 text-foreground/80">
                  <span className="flex-shrink-0 w-5 h-5 rounded-full bg-primary/15 flex items-center justify-center">
                    <Check className="w-3 h-3 text-primary" />
                  </span>
                  {bullet}
                </li>
              ))}
            </ul>

            {/* Email Form */}
            <form onSubmit={handleEmailSubmit} className="pt-4">
              <div className="flex flex-col sm:flex-row gap-3">
                <Input
                  type="email"
                  placeholder={c.placeholder}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-12 text-base flex-1 rounded-full px-5 border-border/60 focus:border-primary"
                  required
                />
                <Button 
                  type="submit" 
                  className="btn-primary h-12 px-8 text-base rounded-full whitespace-nowrap"
                  disabled={isSubmitting}
                >
                  {isSubmitting 
                    ? (language === 'nl' ? 'Bezig...' : 'Loading...') 
                    : c.cta
                  }
                </Button>
              </div>
            </form>

            {/* Privacy Micro-copy */}
            <p className="text-sm text-muted-foreground">
              {c.privacy}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
