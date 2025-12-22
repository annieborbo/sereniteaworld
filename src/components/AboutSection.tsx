import teaPouch from '@/assets/tea-pouch.png';

export const AboutSection = () => {
  return (
    <section id="about" className="py-24 bg-secondary/20 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Image Side */}
          <div className="relative animate-slide-in-left">
            <div className="relative">
              {/* Decorative Elements */}
              <div className="absolute -top-8 -left-8 w-32 h-32 bg-primary/10 rounded-full blur-3xl" />
              <div className="absolute -bottom-8 -right-8 w-48 h-48 bg-secondary/40 rounded-full blur-3xl" />
              
              {/* Main Image */}
              <div className="relative bg-gradient-to-br from-secondary/50 to-muted rounded-3xl p-12">
                <img
                  src={teaPouch}
                  alt="Serenitea Tea Pouch"
                  className="w-full max-w-md mx-auto drop-shadow-2xl"
                />
              </div>
            </div>
          </div>

          {/* Content Side */}
          <div className="space-y-6 animate-slide-in-right">
            <span className="text-primary font-medium tracking-widest uppercase text-sm">Our Story</span>
            <h2 className="text-4xl md:text-5xl font-serif font-semibold text-foreground leading-tight">
              Ancient Wisdom,
              <br />
              <span className="text-primary">Modern Wellness</span>
            </h2>
            
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                Serenitea brings you the treasured tradition of Tartary Buckwheat tea, 
                known in Asia as "Soba Cha." For centuries, this remarkable grain has been 
                celebrated for its nutty, toasted flavor and exceptional health benefits.
              </p>
              <p>
                Our tea is made from 100% pure Tartary Buckwheat, carefully roasted to perfection 
                using time-honored techniques. Each sip delivers a warm, earthy taste with 
                subtle hints of honey and nuts – a truly unique tea experience.
              </p>
              <p>
                Whether you're seeking a caffeine-free alternative or exploring natural 
                wellness solutions, Serenitea offers a moment of calm in your busy day.
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 pt-8 border-t border-border">
              <div>
                <div className="text-3xl font-serif font-semibold text-primary">100%</div>
                <div className="text-sm text-muted-foreground mt-1">Natural</div>
              </div>
              <div>
                <div className="text-3xl font-serif font-semibold text-primary">0mg</div>
                <div className="text-sm text-muted-foreground mt-1">Caffeine</div>
              </div>
              <div>
                <div className="text-3xl font-serif font-semibold text-primary">1000+</div>
                <div className="text-sm text-muted-foreground mt-1">Happy Customers</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
