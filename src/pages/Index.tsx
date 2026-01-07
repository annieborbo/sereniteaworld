import { useEffect } from 'react';
import { Header } from '@/components/Header';
import { HeroSection } from '@/components/HeroSection';
import { FeaturedProducts } from '@/components/FeaturedProducts';
import { AboutSection } from '@/components/AboutSection';
import { TestimonialsSection } from '@/components/TestimonialsSection';
import { FAQSection } from '@/components/FAQSection';
import { Footer } from '@/components/Footer';
import { trackEvent } from '@/lib/analytics';

const Index = () => {
  useEffect(() => {
    trackEvent('page_view_home');
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />
        <FeaturedProducts />
        <TestimonialsSection />
        <AboutSection />
        <FAQSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
