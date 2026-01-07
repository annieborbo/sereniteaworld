import { Header } from '@/components/Header';
import { HeroSection } from '@/components/HeroSection';
import { FeaturedProducts } from '@/components/FeaturedProducts';
import { BenefitsSection } from '@/components/BenefitsSection';
import { AboutSection } from '@/components/AboutSection';
import { TestimonialsSection } from '@/components/TestimonialsSection';
import { FAQSection } from '@/components/FAQSection';
import { Footer } from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />
        <FeaturedProducts />
        <TestimonialsSection />
        <AboutSection />
        <BenefitsSection />
        <FAQSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
