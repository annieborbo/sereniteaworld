import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { ShoppingBag } from 'lucide-react';

const Cart = () => {
  const { language } = useLanguage();

  const content = {
    en: {
      title: "Your cart",
      empty: "Your cart is empty",
      continueShopping: "Continue shopping",
    },
    nl: {
      title: "Je winkelwagen",
      empty: "Je winkelwagen is leeg",
      continueShopping: "Verder winkelen",
    },
  };

  const t = content[language];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-1 pt-32 pb-24">
        <div className="container mx-auto px-4">
          {/* Cart Header */}
          <h1 className="text-3xl md:text-4xl font-serif font-semibold text-foreground text-center mb-16">
            {t.title}
          </h1>

          {/* Empty Cart State */}
          <div className="flex flex-col items-center justify-center py-16">
            <div className="w-20 h-20 rounded-full bg-muted/50 flex items-center justify-center mb-6">
              <ShoppingBag className="w-10 h-10 text-muted-foreground/50" />
            </div>
            
            <h2 className="text-2xl md:text-3xl font-serif text-foreground mb-8">
              {t.empty}
            </h2>
            
            <a href="/#featured">
              <Button 
                variant="outline" 
                className="px-8 py-6 text-base font-medium rounded-full border-foreground text-foreground hover:bg-foreground hover:text-background transition-colors"
              >
                {t.continueShopping}
              </Button>
            </a>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Cart;
