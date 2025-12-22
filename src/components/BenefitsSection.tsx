import { Leaf, Heart, Moon, Sparkles, Shield, Coffee } from 'lucide-react';

const benefits = [
  {
    icon: Coffee,
    title: 'Caffeine Free',
    description: 'Enjoy anytime without worrying about sleep disruption or jitters.',
  },
  {
    icon: Heart,
    title: 'Heart Healthy',
    description: 'Rich in rutin, supporting cardiovascular health and circulation.',
  },
  {
    icon: Shield,
    title: 'Antioxidant Rich',
    description: 'Packed with flavonoids that help protect your cells from damage.',
  },
  {
    icon: Moon,
    title: 'Promotes Relaxation',
    description: 'Natural compounds help calm the mind and reduce stress.',
  },
  {
    icon: Leaf,
    title: '100% Natural',
    description: 'No artificial additives, preservatives, or flavoring agents.',
  },
  {
    icon: Sparkles,
    title: 'Supports Digestion',
    description: 'Gentle on the stomach and aids in healthy digestion.',
  },
];

export const BenefitsSection = () => {
  return (
    <section id="benefits" className="py-24 bg-background">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16 animate-fade-up">
          <span className="text-primary font-medium tracking-widest uppercase text-sm">Why Choose Us</span>
          <h2 className="text-4xl md:text-5xl font-serif font-semibold text-foreground mt-3 mb-4">
            Health Benefits
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Tartary Buckwheat has been treasured for centuries in Asian cultures 
            for its remarkable health-promoting properties.
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <div
              key={benefit.title}
              className="group p-8 rounded-2xl bg-card hover:bg-secondary/30 border border-border/50 hover:border-primary/20 transition-all duration-300 animate-fade-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                <benefit.icon className="w-7 h-7 text-primary" />
              </div>
              <h3 className="text-xl font-serif font-semibold text-foreground mb-3">
                {benefit.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
