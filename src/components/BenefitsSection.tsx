import { Leaf, Heart, Moon, Sparkles, Shield, Coffee } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

export const BenefitsSection = () => {
  const { t } = useLanguage();

  const benefits = [
    {
      icon: Coffee,
      title: t.benefits.items.caffeineFree.title,
      description: t.benefits.items.caffeineFree.description,
    },
    {
      icon: Heart,
      title: t.benefits.items.heartHealthy.title,
      description: t.benefits.items.heartHealthy.description,
    },
    {
      icon: Shield,
      title: t.benefits.items.antioxidant.title,
      description: t.benefits.items.antioxidant.description,
    },
    {
      icon: Moon,
      title: t.benefits.items.relaxation.title,
      description: t.benefits.items.relaxation.description,
    },
    {
      icon: Leaf,
      title: t.benefits.items.natural.title,
      description: t.benefits.items.natural.description,
    },
    {
      icon: Sparkles,
      title: t.benefits.items.digestion.title,
      description: t.benefits.items.digestion.description,
    },
  ];

  return (
    <section id="benefits" className="py-24 bg-background">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16 animate-fade-up">
          <span className="text-primary font-medium tracking-widest uppercase text-sm">{t.benefits.subtitle}</span>
          <h2 className="text-4xl md:text-5xl font-serif font-semibold text-foreground mt-3 mb-4">
            {t.benefits.title}
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            {t.benefits.description}
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
