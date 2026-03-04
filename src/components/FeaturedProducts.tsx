import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useLanguage } from '@/contexts/LanguageContext';
import { trackEvent } from '@/lib/analytics';
import { useSectionTracking } from '@/hooks/useSectionTracking';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { Check, Loader2, ShoppingCart } from 'lucide-react';
import heroBg from '@/assets/hero-bg.jpg';
import { storefrontApiRequest, STOREFRONT_PRODUCTS_QUERY, ShopifyProduct } from '@/lib/shopify.tsx';
import { useCartStore } from '@/stores/cartStore';

export const FeaturedProducts = () => {
  const { language } = useLanguage();
  const sectionRef = useSectionTracking('featured-products');
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [products, setProducts] = useState<ShopifyProduct[]>([]);
  const [loadingProducts, setLoadingProducts] = useState(true);
  const addItem = useCartStore(state => state.addItem);
  const isCartLoading = useCartStore(state => state.isLoading);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const data = await storefrontApiRequest(STOREFRONT_PRODUCTS_QUERY, { first: 20 });
        setProducts(data?.data?.products?.edges || []);
      } catch (error) {
        console.error('Failed to fetch products:', error);
      } finally {
        setLoadingProducts(false);
      }
    }
    fetchProducts();
  }, []);

  const content = {
    en: {
      title: "Our Products",
      subtitle: "Discover our collection of premium buckwheat teas.",
      noProducts: "No products yet — check back soon!",
      addToCart: "Add to Cart",
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
      title: "Onze Producten",
      subtitle: "Ontdek onze collectie premium boekweit thee.",
      noProducts: "Nog geen producten — kom snel terug!",
      addToCart: "In winkelwagen",
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

  const handleAddToCart = async (product: ShopifyProduct) => {
    const variant = product.node.variants.edges[0]?.node;
    if (!variant) return;
    await addItem({
      product,
      variantId: variant.id,
      variantTitle: variant.title,
      price: variant.price,
      quantity: 1,
      selectedOptions: variant.selectedOptions || [],
    });
    toast.success(language === 'nl' ? 'Toegevoegd aan winkelwagen!' : 'Added to cart!', { position: 'top-center' });
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
        <p className="text-center text-lg text-muted-foreground mb-12 max-w-xl mx-auto animate-fade-up">
          {c.subtitle}
        </p>

        {/* Products Grid */}
        {loadingProducts ? (
          <div className="flex justify-center py-16">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-16">
            <ShoppingCart className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-lg text-muted-foreground">{c.noProducts}</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto mb-16">
            {products.map((product, index) => {
              const p = product.node;
              const image = p.images.edges[0]?.node;
              const price = p.priceRange.minVariantPrice;
              return (
                <div
                  key={p.id}
                  className="card-product group animate-fade-up"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <Link to={`/product/${p.handle}`}>
                    <div className="relative aspect-square bg-gradient-to-br from-secondary/30 to-muted/50 overflow-hidden">
                      {image ? (
                        <img src={image.url} alt={image.altText || p.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-muted-foreground">No image</div>
                      )}
                    </div>
                  </Link>
                  <div className="p-6">
                    <Link to={`/product/${p.handle}`}>
                      <h3 className="text-xl font-serif font-semibold text-foreground mb-1 group-hover:text-primary transition-colors">
                        {p.title}
                      </h3>
                    </Link>
                    <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{p.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-semibold text-foreground">
                        {price.currencyCode} {parseFloat(price.amount).toFixed(2)}
                      </span>
                      <Button
                        size="sm"
                        onClick={(e) => { e.preventDefault(); handleAddToCart(product); }}
                        disabled={isCartLoading}
                      >
                        {isCartLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : c.addToCart}
                      </Button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Email Capture Section */}
        <div className="relative py-16 md:py-20 -mx-4 px-4 overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${heroBg})` }}
          >
            <div className="absolute inset-0 bg-background/70 backdrop-blur-[2px]" />
          </div>
          <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-muted/30 to-transparent z-[1]" />
          <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-muted/30 to-transparent z-[1]" />

          <div id="waitlist" className="max-w-2xl mx-auto text-center relative z-10 animate-fade-up">
            <h3 className="text-4xl md:text-5xl font-serif font-semibold text-foreground leading-tight mb-6">
              {c.emailCapture.headline}
            </h3>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-8">
              {c.emailCapture.subheadline}
            </p>
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
            <p className="text-sm text-muted-foreground">
              {c.emailCapture.privacy}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
