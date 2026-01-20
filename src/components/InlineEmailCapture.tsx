import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useLanguage } from '@/contexts/LanguageContext';
import { trackEvent } from '@/lib/analytics';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { ArrowRight, Check, Loader2 } from 'lucide-react';

interface InlineEmailCaptureProps {
  buttonText: string;
  source: string;
  variant?: 'default' | 'hero' | 'subtle';
  className?: string;
}

export const InlineEmailCapture = ({ 
  buttonText, 
  source, 
  variant = 'default',
  className = ''
}: InlineEmailCaptureProps) => {
  const { language } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !email.includes('@')) {
      toast.error(language === 'nl' ? 'Voer een geldig e-mailadres in' : 'Please enter a valid email address');
      return;
    }

    setIsSubmitting(true);
    trackEvent('waitlist_signup_attempt', { source });

    try {
      const { error } = await supabase
        .from('waitlist_signups')
        .insert([{ email, format: source }]);

      if (error) {
        if (error.code === '23505') {
          toast.info(language === 'nl' ? 'Je staat al op de wachtlijst!' : 'You\'re already on the waitlist!');
          setIsSuccess(true);
        } else {
          throw error;
        }
      } else {
        toast.success(language === 'nl' ? 'Je bent ingeschreven!' : 'You\'re signed up!');
        trackEvent('waitlist_signup_success', { source });
        setIsSuccess(true);
        setEmail('');
      }
    } catch (error) {
      console.error('Error signing up:', error);
      toast.error(language === 'nl' ? 'Er ging iets mis. Probeer het opnieuw.' : 'Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const buttonClasses = {
    default: 'btn-primary h-12 px-8 text-base rounded-full',
    hero: 'btn-hero text-primary-foreground',
    subtle: 'btn-primary h-12 px-8 text-base rounded-full shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 transition-shadow duration-300'
  };

  if (isSuccess) {
    return (
      <div className={`inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary/10 text-primary font-medium ${className}`}>
        <Check className="w-5 h-5" />
        <span>{language === 'nl' ? 'Je bent ingeschreven!' : 'You\'re signed up!'}</span>
      </div>
    );
  }

  if (!isOpen) {
    return (
      <Button 
        onClick={() => setIsOpen(true)}
        className={`${buttonClasses[variant]} ${className}`}
      >
        {buttonText}
      </Button>
    );
  }

  return (
    <form onSubmit={handleSubmit} className={`inline-flex flex-col sm:flex-row gap-2 ${className}`}>
      <div className="relative">
        <Input
          type="email"
          placeholder={language === 'nl' ? 'Je e-mailadres' : 'Your email address'}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="h-12 w-64 sm:w-72 text-base rounded-full px-5 pr-12 bg-background/90 backdrop-blur-sm border-border/60 focus:border-primary"
          autoFocus
          required
          disabled={isSubmitting}
        />
      </div>
      <Button 
        type="submit" 
        className={`${buttonClasses[variant]} min-w-[120px]`}
        disabled={isSubmitting}
      >
        {isSubmitting ? (
          <Loader2 className="w-5 h-5 animate-spin" />
        ) : (
          <>
            <span>{language === 'nl' ? 'Verstuur' : 'Send'}</span>
            <ArrowRight className="w-4 h-4 ml-2" />
          </>
        )}
      </Button>
    </form>
  );
};
