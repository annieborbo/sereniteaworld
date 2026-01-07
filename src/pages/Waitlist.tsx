import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useLanguage } from '@/contexts/LanguageContext';
import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

const Waitlist = () => {
  const { language } = useLanguage();
  const [searchParams] = useSearchParams();
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  
  const format = searchParams.get('format');

  const content = {
    en: {
      title: "Be the first to know when we launch!",
      subtitle: "You caught us mid-brew. SereniTea is still roasting its first batch of buckwheat tea. Join the waitlist and you'll be first to know when it lands.",
      placeholder: "Email",
      button: "Join Waitlist",
      success: "You're on the list! We'll notify you when we launch.",
      error: "Something went wrong. Please try again.",
      duplicate: "You're already on the waitlist!",
    },
    nl: {
      title: "Wees de eerste die weet wanneer we lanceren!",
      subtitle: "Je hebt ons midden in het brouwen betrapt. SereniTea roostert nog haar eerste batch boekweitthee. Schrijf je in voor de wachtlijst en je bent de eerste die het hoort.",
      placeholder: "E-mail",
      button: "Schrijf je in",
      success: "Je staat op de lijst! We laten je weten wanneer we lanceren.",
      error: "Er ging iets mis. Probeer het opnieuw.",
      duplicate: "Je staat al op de wachtlijst!",
    },
  };

  const t = content[language];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const { error } = await supabase
      .from('waitlist_signups')
      .insert({ 
        email: email.trim().toLowerCase(),
        format: format || null
      });

    setIsLoading(false);

    if (error) {
      if (error.code === '23505') {
        toast({ title: t.duplicate });
      } else {
        toast({ title: t.error, variant: 'destructive' });
      }
      return;
    }

    toast({ title: t.success });
    setEmail('');
  };

  return (
    <div className="min-h-screen flex flex-col bg-secondary/50">
      <Header />
      
      <main className="flex-1 flex items-center justify-center pt-32 pb-24">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center justify-center text-center max-w-xl mx-auto">
            {/* Waving Hand Emoji */}
            <div className="text-6xl mb-6">
              👋
            </div>
            
            {/* Title */}
            <h1 className="text-3xl md:text-4xl font-serif font-semibold text-foreground mb-4">
              {t.title}
            </h1>
            
            {/* Subtitle */}
            <p className="text-lg text-muted-foreground mb-12">
              {t.subtitle}
            </p>
            
            {/* Email Form */}
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 w-full max-w-md">
              <Input
                type="email"
                placeholder={t.placeholder}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 h-14 px-6 bg-background border-0 rounded-lg text-base"
                required
              />
              <Button 
                type="submit"
                disabled={isLoading}
                className="h-14 px-8 bg-primary/70 hover:bg-primary/80 text-primary-foreground rounded-lg text-base font-medium disabled:opacity-50"
              >
                {isLoading ? '...' : t.button}
              </Button>
            </form>
            
            {/* Microline */}
            <p className="text-sm text-muted-foreground mt-4">
              {language === 'en' ? 'No spam. Just tea.' : 'Geen spam. Alleen thee.'}
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Waitlist;
