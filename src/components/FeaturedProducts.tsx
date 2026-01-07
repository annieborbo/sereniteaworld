import teaBox from '@/assets/tea-box.png';
import teaPouch from '@/assets/tea-pouch.png';
import { Button } from '@/components/ui/button';
import { ShoppingCart } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

export const FeaturedProducts = () => {
  const { t } = useLanguage();

  const products = [
    {
      id: 1,
      name: t.products.items.pouch.name,
      description: t.products.items.pouch.description,
      price: 12.99,
      image: teaPouch,
    },
    {
      id: 2,
      name: t.products.items.box.name,
      description: t.products.items.box.description,
      price: 9.99,
      image: teaBox,
    },
  ];

  return (
    <section id="featured" className="py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16 animate-fade-up">
          <h2 className="text-4xl md:text-5xl font-serif font-semibold text-foreground mb-4">
            {t.products.title}
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            {t.products.description}
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {products.map((product, index) => (
            <div
              key={product.id}
              className="card-product group cursor-pointer animate-fade-up"
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

                {/* Quick Add Button */}
                <div className="absolute inset-x-0 bottom-0 p-4">
                  <Button className="w-full btn-primary rounded-xl py-3 flex items-center justify-center gap-2">
                    <ShoppingCart className="w-4 h-4" />
                    {t.products.addToCart}
                  </Button>
                </div>
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
      </div>
    </section>
  );
};
