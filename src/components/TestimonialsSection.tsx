import { Star } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useSectionTracking } from '@/hooks/useSectionTracking';

export const TestimonialsSection = () => {
  const { t } = useLanguage();
  const sectionRef = useSectionTracking('testimonials');

  const testimonials = t.testimonials.items.map((item, index) => ({
    id: index + 1,
    name: item.name,
    rating: 5,
    text: item.text,
    verified: true,
  }));

  return (
    <section ref={sectionRef} id="testimonials" className="py-14 md:py-16 bg-background">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-10 animate-fade-up">
          <span className="text-primary font-medium tracking-widest uppercase text-sm">{t.testimonials.subtitle}</span>
          <h2 className="text-4xl md:text-5xl font-serif font-semibold text-foreground mt-3">
            {t.testimonials.title}
          </h2>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial.id}
              className="p-8 rounded-2xl bg-card border border-border/50 hover:shadow-card transition-all duration-300 animate-fade-up"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-accent text-accent" />
                ))}
              </div>

              {/* Quote */}
              <p className="text-foreground/80 leading-relaxed mb-6 italic">
                "{testimonial.text}"
              </p>

              {/* Author */}
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                  <span className="text-primary font-semibold text-sm">
                    {testimonial.name.charAt(0)}
                  </span>
                </div>
                <div>
                  <div className="font-semibold text-foreground">{testimonial.name}</div>
                  {testimonial.verified && (
                    <div className="text-xs text-primary flex items-center gap-1">
                      <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      {t.testimonials.verifiedBuyer}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
