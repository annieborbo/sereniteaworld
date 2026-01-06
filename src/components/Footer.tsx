import { Facebook, Instagram, Youtube } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

export const Footer = () => {
  const { t } = useLanguage();

  const mainLinks = [
    { label: t.footer.links.shopAll, href: '#' },
    { label: t.footer.links.aboutUs, href: '#about' },
    { label: t.footer.serviceLinks.contactUs, href: '#contact' },
  ];

  return (
    <footer className="bg-foreground text-background py-12">
      <div className="container mx-auto px-4">
        {/* Main Footer Content */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-8 mb-10">
          {/* Logo */}
          <div className="text-center md:text-left">
            <h2 className="text-2xl font-serif font-semibold tracking-wide">Serenitea</h2>
          </div>

          {/* Navigation Links */}
          <nav className="flex flex-wrap justify-center gap-6 md:gap-10">
            {mainLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-background/80 hover:text-background text-sm uppercase tracking-wider transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Social Icons */}
          <div className="flex gap-4">
            <a
              href="#"
              className="text-background/70 hover:text-background transition-colors"
              aria-label="Facebook"
            >
              <Facebook className="w-5 h-5" />
            </a>
            <a
              href="#"
              className="text-background/70 hover:text-background transition-colors"
              aria-label="Instagram"
            >
              <Instagram className="w-5 h-5" />
            </a>
            <a
              href="#"
              className="text-background/70 hover:text-background transition-colors"
              aria-label="YouTube"
            >
              <Youtube className="w-5 h-5" />
            </a>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-background/10 pt-8">
          {/* Bottom Section */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            {/* Copyright & Policy Links */}
            <div className="flex flex-col md:flex-row items-center gap-4 md:gap-6 text-sm text-background/50">
              <span>{t.footer.copyright}</span>
              <div className="flex gap-4">
                <a href="#" className="hover:text-background transition-colors">{t.footer.privacy}</a>
                <a href="#" className="hover:text-background transition-colors">{t.footer.terms}</a>
              </div>
            </div>

            {/* Payment Methods */}
            <div className="flex items-center gap-3">
              <span className="text-xs text-background/40 mr-2">Payment methods:</span>
              <div className="flex gap-2">
                {/* Visa */}
                <div className="w-10 h-6 bg-background/10 rounded flex items-center justify-center">
                  <span className="text-[10px] font-bold text-background/70">VISA</span>
                </div>
                {/* Mastercard */}
                <div className="w-10 h-6 bg-background/10 rounded flex items-center justify-center">
                  <span className="text-[10px] font-bold text-background/70">MC</span>
                </div>
                {/* PayPal */}
                <div className="w-10 h-6 bg-background/10 rounded flex items-center justify-center">
                  <span className="text-[10px] font-bold text-background/70">PP</span>
                </div>
                {/* Apple Pay */}
                <div className="w-10 h-6 bg-background/10 rounded flex items-center justify-center">
                  <span className="text-[8px] font-bold text-background/70">Apple</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
