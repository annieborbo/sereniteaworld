import { useState } from 'react';
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
    <section ref={sectionRef} id="featured" className="relative py-20 md:py-28 overflow-hidden">
      {/* Background Image with smooth gradient overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroBg})` }}
      >
        <div className="absolute inset-0 bg-background/70 backdrop-blur-[2px]" />
      </div>

      {/* Top fade for smooth transition */}
      <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-background to-transparent z-[1]" />
      
      {/* Bottom fade for smooth transition */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent z-[1]" />

      <div className="container mx-auto px-4 relative z-10">
        <div id="waitlist" className="max-w-2xl mx-auto text-center animate-fade-up">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-semibold text-foreground leading-tight mb-6">
            {c.headline}
          </h2>
          
          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-8">
            {c.subheadline}
          </p>

          {/* Bullet Points - centered */}
          <ul className="inline-flex flex-col items-start space-y-3 mb-8 text-left">
            {c.bullets.map((bullet, index) => (
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
                placeholder={c.placeholder}
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
    </section>
  );
};
