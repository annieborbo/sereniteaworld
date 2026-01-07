import { ChevronDown } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

export const Footer = () => {
  const { t, language, setLanguage } = useLanguage();

  const policyLinks = [
    { label: 'Refund policy', href: '#' },
    { label: 'Privacy policy', href: '#' },
    { label: 'Terms of service', href: '#' },
    { label: 'Shipping policy', href: '#' },
    { label: 'Contact information', href: '#contact' },
    { label: 'Cookie preferences', href: '#' },
  ];

  const paymentMethods = [
    { name: 'Amex', bg: '#006FCF', text: 'AMEX' },
    { name: 'Apple Pay', bg: '#000', text: 'Pay' },
    { name: 'Bancontact', bg: '#005498', text: 'BC' },
    { name: 'Google Pay', bg: '#fff', text: 'G Pay', textColor: '#5F6368' },
    { name: 'iDEAL', bg: '#CC0066', text: 'iD' },
    { name: 'Maestro', bg: '#0066B2', text: 'M' },
    { name: 'Mastercard', bg: '#EB001B', text: 'MC' },
    { name: 'Shop Pay', bg: '#5A31F4', text: 'Shop' },
    { name: 'UnionPay', bg: '#E21836', text: 'UP' },
    { name: 'Visa', bg: '#1A1F71', text: 'VISA' },
  ];

  return (
    <footer className="bg-muted py-10">
      <div className="container mx-auto px-4">
        {/* Top Section: Country/Language & Payment Methods */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 mb-8">
          {/* Country & Language Dropdowns */}
          <div className="flex flex-wrap gap-6">
            {/* Country/Region */}
            <div className="flex flex-col gap-2">
              <span className="text-sm text-foreground/70">Country/region</span>
              <button className="flex items-center gap-2 px-4 py-2.5 border border-foreground/20 rounded-md bg-background text-foreground text-sm min-w-[180px] justify-between">
                <span>Netherlands | EUR €</span>
                <ChevronDown className="w-4 h-4 text-foreground/50" />
              </button>
            </div>
            
            {/* Language */}
            <div className="flex flex-col gap-2">
              <span className="text-sm text-foreground/70">Language</span>
              <button 
                onClick={() => setLanguage(language === 'en' ? 'nl' : 'en')}
                className="flex items-center gap-2 px-4 py-2.5 border border-foreground/20 rounded-md bg-background text-foreground text-sm min-w-[120px] justify-between"
              >
                <span>{language === 'en' ? 'English' : 'Nederlands'}</span>
                <ChevronDown className="w-4 h-4 text-foreground/50" />
              </button>
            </div>
          </div>

          {/* Payment Methods */}
          <div className="flex flex-wrap gap-2">
            {paymentMethods.map((method) => (
              <div
                key={method.name}
                className="w-12 h-8 rounded flex items-center justify-center border border-foreground/10"
                style={{ backgroundColor: method.bg }}
                title={method.name}
              >
                <span 
                  className="text-[9px] font-bold"
                  style={{ color: method.textColor || '#fff' }}
                >
                  {method.text}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Section: Copyright & Policy Links */}
        <div className="pt-6 border-t border-foreground/10">
          <div className="flex flex-col md:flex-row flex-wrap items-center gap-2 md:gap-0 text-sm text-foreground/70">
            <span>© 2025, Serenitea</span>
            {policyLinks.map((link, index) => (
              <span key={link.label} className="flex items-center">
                <span className="mx-2 hidden md:inline">·</span>
                <a
                  href={link.href}
                  className="hover:text-foreground transition-colors"
                >
                  {link.label}
                </a>
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};
