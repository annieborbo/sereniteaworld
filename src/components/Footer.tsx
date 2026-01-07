import { ChevronDown } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import visaLogo from '@/assets/visa-logo.png';

const PaymentIcons = {
  Amex: () => (
    <svg viewBox="0 0 38 24" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
      <rect width="38" height="24" rx="3" fill="#006FCF"/>
      <path d="M10 12.5L11.5 9h2l1.5 3.5M11.2 11.5h2.1M20 9v3.5M22 9l1.5 1.75L25 9v3.5M27 9h2.5M27 10.75h2M27 12.5h2.5" stroke="white" strokeWidth="1.2" fill="none"/>
    </svg>
  ),
  ApplePay: () => (
    <svg viewBox="0 0 38 24" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
      <rect width="38" height="24" rx="3" fill="#000"/>
      <path d="M12.5 8.5c-.6.7-1.5 1.2-2.4 1.1-.1-.9.3-1.9.8-2.5.6-.7 1.6-1.2 2.4-1.1.1 1-.3 1.8-.8 2.5zm.8 1.3c-1.3-.1-2.5.8-3.1.8-.6 0-1.6-.7-2.7-.7-1.4 0-2.7.8-3.4 2.1-1.5 2.5-.4 6.3 1 8.4.7 1 1.5 2.2 2.6 2.1 1-.1 1.4-.7 2.7-.7 1.2 0 1.6.7 2.7.7 1.1 0 1.8-1 2.5-2 .8-1.2 1.1-2.3 1.1-2.4-1.3-.5-2.4-2.8-2.4-4.5 0-1.5.9-3 2.2-3.7-.8-1.2-2.1-1.9-3.2-2.1z" fill="white" transform="translate(9, 2) scale(0.75)"/>
      <text x="22" y="15" fill="white" fontSize="7" fontFamily="system-ui" fontWeight="500">Pay</text>
    </svg>
  ),
  Bancontact: () => (
    <svg viewBox="0 0 38 24" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
      <rect width="38" height="24" rx="3" fill="#005498"/>
      <circle cx="14" cy="12" r="5" fill="#FFD800"/>
      <circle cx="24" cy="12" r="5" fill="#005498" stroke="#FFD800" strokeWidth="1"/>
    </svg>
  ),
  GooglePay: () => (
    <svg viewBox="0 0 38 24" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
      <rect width="38" height="24" rx="3" fill="#fff" stroke="#E5E5E5"/>
      <path d="M17.5 12.3v2.8h-.9V8h2.4c.6 0 1.1.2 1.5.6.4.4.6.9.6 1.4 0 .6-.2 1-.6 1.4-.4.4-.9.6-1.5.6h-1.5v.3zm0-3.4v2.3h1.5c.4 0 .7-.1.9-.4.2-.2.4-.5.4-.8 0-.3-.1-.6-.4-.8-.2-.2-.5-.4-.9-.4h-1.5z" fill="#5F6368"/>
      <path d="M24.1 10.2c.7 0 1.2.2 1.6.5.4.4.6.9.6 1.5v3h-.8v-.7h0c-.4.5-.9.8-1.5.8-.5 0-1-.1-1.3-.4-.3-.3-.5-.7-.5-1.1 0-.5.2-.9.5-1.2.4-.3.8-.4 1.5-.4.5 0 1 .1 1.3.3v-.2c0-.3-.1-.6-.4-.8-.2-.2-.5-.3-.9-.3-.5 0-.9.2-1.2.6l-.7-.5c.4-.6 1-.9 1.8-.9zm-1.1 3.5c0 .2.1.4.3.6.2.1.4.2.7.2.4 0 .8-.1 1.1-.4.3-.3.4-.6.4-1-.3-.2-.7-.4-1.2-.4-.4 0-.7.1-1 .3-.2.2-.3.4-.3.7z" fill="#5F6368"/>
      <path d="M31.2 10.4l-2.8 6.4h-.9l1-2.2-1.8-4.1h1l1.2 3 1.2-3h1.1z" fill="#5F6368"/>
      <path d="M12.7 11.6c0-.3 0-.6-.1-.9H9v1.7h2.1c-.1.5-.4.9-.8 1.2v1h1.3c.8-.7 1.2-1.8 1.1-3z" fill="#4285F4"/>
      <path d="M9 15c1.1 0 2-.4 2.6-1l-1.3-1c-.4.2-.8.4-1.4.4-.5 0-1-.2-1.4-.5-.4-.3-.6-.8-.7-1.3H6.5v1c.6 1.4 1.8 2.4 2.5 2.4z" fill="#34A853"/>
      <path d="M6.2 11.6c-.1-.3-.1-.7 0-1v-1h-1.3c-.4.8-.4 1.8 0 2.6l1.3-1v-.6z" fill="#FBBC04"/>
      <path d="M9 8.6c.6 0 1.1.2 1.5.6l1.1-1.1C10.9 7.4 10 7 9 7c-1.4 0-2.6.8-3.2 2l1.3 1c.2-.5.5-.9.9-1.2.4-.3.9-.5 1.4-.5l-.4.3z" fill="#EA4335"/>
    </svg>
  ),
  iDEAL: () => (
    <svg viewBox="0 0 38 24" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
      <rect width="38" height="24" rx="3" fill="#fff" stroke="#E5E5E5"/>
      <rect x="8" y="5" width="22" height="14" rx="2" fill="#CC0066"/>
      <text x="19" y="14" fill="white" fontSize="7" fontFamily="system-ui" fontWeight="700" textAnchor="middle">iDEAL</text>
    </svg>
  ),
  Maestro: () => (
    <svg viewBox="0 0 38 24" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
      <rect width="38" height="24" rx="3" fill="#fff" stroke="#E5E5E5"/>
      <circle cx="15" cy="12" r="7" fill="#ED0006"/>
      <circle cx="23" cy="12" r="7" fill="#0099DF"/>
      <path d="M19 6.6a7 7 0 0 0-2.5 5.4c0 2.2 1 4.2 2.5 5.4a7 7 0 0 0 2.5-5.4c0-2.2-1-4.2-2.5-5.4z" fill="#6C6BBD"/>
    </svg>
  ),
  Mastercard: () => (
    <svg viewBox="0 0 38 24" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
      <rect width="38" height="24" rx="3" fill="#fff" stroke="#E5E5E5"/>
      <circle cx="15" cy="12" r="7" fill="#EB001B"/>
      <circle cx="23" cy="12" r="7" fill="#F79E1B"/>
      <path d="M19 6.6a7 7 0 0 0-2.5 5.4c0 2.2 1 4.2 2.5 5.4a7 7 0 0 0 2.5-5.4c0-2.2-1-4.2-2.5-5.4z" fill="#FF5F00"/>
    </svg>
  ),
  ShopPay: () => (
    <svg viewBox="0 0 38 24" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
      <rect width="38" height="24" rx="3" fill="#5A31F4"/>
      <path d="M10 10.5c.8-.9 2-1.5 3.3-1.5 1.8 0 3.3 1 4 2.5h-2.1c-.4-.6-1.1-1-1.9-1-.7 0-1.4.3-1.9.8l-1.4-.8z" fill="white"/>
      <text x="19" y="16" fill="white" fontSize="7" fontFamily="system-ui" fontWeight="600" textAnchor="middle">pay</text>
    </svg>
  ),
  UnionPay: () => (
    <svg viewBox="0 0 38 24" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
      <rect width="38" height="24" rx="3" fill="#fff" stroke="#E5E5E5"/>
      <rect x="5" y="4" width="10" height="16" rx="1" fill="#E21836"/>
      <rect x="14" y="4" width="10" height="16" rx="1" fill="#00447C"/>
      <rect x="23" y="4" width="10" height="16" rx="1" fill="#019B7A"/>
    </svg>
  ),
  Visa: () => (
    <div className="w-full h-full bg-white rounded flex items-center justify-center p-1 border border-foreground/10">
      <img src={visaLogo} alt="Visa" className="h-full w-auto object-contain" />
    </div>
  ),
};

export const Footer = () => {
  const { language, setLanguage } = useLanguage();

  const policyLinks = [
    { label: 'Refund policy', href: '#' },
    { label: 'Privacy policy', href: '#' },
    { label: 'Terms of service', href: '#' },
    { label: 'Shipping policy', href: '#' },
    { label: 'Contact information', href: '#contact' },
    { label: 'Cookie preferences', href: '#' },
  ];

  const paymentMethods = [
    'GooglePay', 'ApplePay', 'iDEAL', 'Maestro', 'Mastercard', 'Visa'
  ] as const;

  return (
    <footer className="bg-muted py-10">
      <div className="container mx-auto px-4">
        {/* Top Section: Country/Language & Payment Methods */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 mb-8">
          {/* Language Dropdown */}
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

          {/* Payment Methods */}
          <div className="flex flex-wrap gap-2">
            {paymentMethods.map((method) => {
              const Icon = PaymentIcons[method];
              return (
                <div
                  key={method}
                  className="w-12 h-8 rounded overflow-hidden"
                  title={method}
                >
                  <Icon />
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom Section: Copyright & Policy Links */}
        <div className="pt-6 border-t border-foreground/10">
          <div className="flex flex-col md:flex-row flex-wrap items-center gap-2 md:gap-0 text-sm text-foreground/70">
            <span>© 2025, Serenitea</span>
            {policyLinks.map((link) => (
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
