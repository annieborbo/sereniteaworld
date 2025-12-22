import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useState } from 'react';
import { toast } from 'sonner';

export const NewsletterSection = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      toast.success('Thank you for subscribing!', {
        description: 'You\'ll receive our newsletter and 10% off your first order.',
      });
      setEmail('');
    }
  };

  return (
    <section className="py-24 bg-primary/5 relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-0 left-1/4 w-64 h-64 bg-secondary/30 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-48 h-48 bg-primary/10 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-2xl mx-auto text-center animate-fade-up">
          <span className="text-primary font-medium tracking-widest uppercase text-sm">Stay Connected</span>
          <h2 className="text-4xl md:text-5xl font-serif font-semibold text-foreground mt-3 mb-4">
            Join the Serenitea Family
          </h2>
          <p className="text-muted-foreground mb-8">
            Subscribe to our newsletter for exclusive offers, brewing tips, and wellness inspiration. 
            Get 10% off your first order!
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 h-14 px-6 rounded-full border-2 border-border focus:border-primary bg-card"
              required
            />
            <Button type="submit" className="btn-hero h-14 whitespace-nowrap">
              Subscribe
            </Button>
          </form>

          <p className="text-xs text-muted-foreground mt-4">
            By subscribing, you agree to our Privacy Policy. Unsubscribe anytime.
          </p>
        </div>
      </div>
    </section>
  );
};
