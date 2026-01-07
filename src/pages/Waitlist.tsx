import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useLanguage } from '@/contexts/LanguageContext';
import { useState } from 'react';

const Waitlist = () => {
  const { language } = useLanguage();
  const [email, setEmail] = useState('');

  const content = {
    en: {
      title: "Be the first to know when we launch!",
      subtitle: "You caught us mid-brew. SereniTea is still roasting its first batch of buckwheat tea. Join the waitlist and you'll be first to know when it lands.",
      placeholder: "Email",
      button: "Join Waitlist",
    },
    nl: {
      title: "Wees de eerste die weet wanneer we lanceren!",
      subtitle: "Je hebt ons midden in het brouwen betrapt. SereniTea roostert nog haar eerste batch boekweitthee. Schrijf je in voor de wachtlijst en je bent de eerste die het hoort.",
      placeholder: "E-mail",
      button: "Schrijf je in",
    },
  };

  const t = content[language];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle waitlist signup
    console.log('Waitlist signup:', email);
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
                className="h-14 px-8 bg-primary/70 hover:bg-primary/80 text-primary-foreground rounded-lg text-base font-medium"
              >
                {t.button}
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
