import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Loader2, ArrowLeft } from 'lucide-react';
import { storefrontApiRequest, PRODUCT_BY_HANDLE_QUERY, ShopifyProduct } from '@/lib/shopify.tsx';
import { useCartStore } from '@/stores/cartStore';
import { toast } from 'sonner';

const ProductDetail = () => {
  const { handle } = useParams<{ handle: string }>();
  const [product, setProduct] = useState<ShopifyProduct['node'] | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedVariantIndex, setSelectedVariantIndex] = useState(0);
  const [selectedImage, setSelectedImage] = useState(0);
  const addItem = useCartStore(state => state.addItem);
  const isCartLoading = useCartStore(state => state.isLoading);

  useEffect(() => {
    async function fetchProduct() {
      if (!handle) return;
      setLoading(true);
      try {
        const data = await storefrontApiRequest(PRODUCT_BY_HANDLE_QUERY, { handle });
        setProduct(data?.data?.productByHandle || null);
      } catch (error) {
        console.error('Failed to fetch product:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchProduct();
  }, [handle]);

  const selectedVariant = product?.variants.edges[selectedVariantIndex]?.node;

  const handleAddToCart = async () => {
    if (!product || !selectedVariant) return;
    await addItem({
      product: { node: product },
      variantId: selectedVariant.id,
      variantTitle: selectedVariant.title,
      price: selectedVariant.price,
      quantity: 1,
      selectedOptions: selectedVariant.selectedOptions || [],
    });
    toast.success('Added to cart!', { position: 'top-center' });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="flex items-center justify-center pt-32 pb-20">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
        <Footer />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 pt-32 pb-20 text-center">
          <h1 className="text-2xl font-serif text-foreground mb-4">Product not found</h1>
          <Link to="/" className="text-primary hover:underline">← Back to shop</Link>
        </div>
        <Footer />
      </div>
    );
  }

  const images = product.images.edges;

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 pt-28 pb-20">
        <Link to="/#featured" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-8 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back to shop
        </Link>
        <div className="grid md:grid-cols-2 gap-12">
          {/* Images */}
          <div>
            <div className="aspect-square bg-muted/30 rounded-lg overflow-hidden mb-4">
              {images[selectedImage] && (
                <img src={images[selectedImage].node.url} alt={images[selectedImage].node.altText || product.title} className="w-full h-full object-contain" />
              )}
            </div>
            {images.length > 1 && (
              <div className="flex gap-2 overflow-x-auto">
                {images.map((img, i) => (
                  <button key={i} onClick={() => setSelectedImage(i)} className={`w-16 h-16 rounded border-2 overflow-hidden flex-shrink-0 ${i === selectedImage ? 'border-primary' : 'border-transparent'}`}>
                    <img src={img.node.url} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Info */}
          <div>
            <h1 className="text-3xl md:text-4xl font-serif font-semibold text-foreground mb-4">{product.title}</h1>
            <p className="text-2xl font-semibold text-foreground mb-6">
              {selectedVariant?.price.currencyCode} {parseFloat(selectedVariant?.price.amount || '0').toFixed(2)}
            </p>
            <p className="text-muted-foreground mb-8 leading-relaxed">{product.description}</p>

            {/* Variant selection */}
            {product.variants.edges.length > 1 && (
              <div className="mb-6">
                <label className="text-sm font-medium text-foreground mb-2 block">Variant</label>
                <div className="flex flex-wrap gap-2">
                  {product.variants.edges.map((v, i) => (
                    <button
                      key={v.node.id}
                      onClick={() => setSelectedVariantIndex(i)}
                      className={`px-4 py-2 rounded-full border text-sm transition-colors ${i === selectedVariantIndex ? 'bg-primary text-primary-foreground border-primary' : 'border-border hover:border-primary'}`}
                    >
                      {v.node.title}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <Button onClick={handleAddToCart} size="lg" className="w-full" disabled={isCartLoading || !selectedVariant?.availableForSale}>
              {isCartLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : !selectedVariant?.availableForSale ? 'Out of Stock' : 'Add to Cart'}
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ProductDetail;
