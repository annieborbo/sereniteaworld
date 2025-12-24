import { Facebook, Instagram, Youtube } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

export const Footer = () => {
  const { t } = useLanguage();

  return (
    <footer id="contact" className="bg-[#1a1a1a] text-white py-12">
      <div className="container mx-auto px-4">
        {/* Main Footer Content */}
        <div className="flex flex-col md:flex-row justify-between items-start gap-10 mb-10">
          {/* Logo and Tagline */}
          <div className="flex flex-col items-start">
            <h2 className="text-2xl font-bold tracking-wide mb-2">Serenitea</h2>
            <p className="text-gray-400 text-sm">Premium Tea Experience</p>
          </div>

          {/* Navigation Links */}
          <div className="flex flex-wrap gap-8 md:gap-12">
            <div>
              <h3 className="font-semibold text-sm uppercase tracking-wider mb-4">Shop</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">All Products</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Best Sellers</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">New Arrivals</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-sm uppercase tracking-wider mb-4">About</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Our Story</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Contact</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">FAQ</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-sm uppercase tracking-wider mb-4">Policies</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Shipping</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Returns</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</a></li>
              </ul>
            </div>
          </div>

          {/* Social Media */}
          <div className="flex flex-col items-start md:items-end">
            <h3 className="font-semibold text-sm uppercase tracking-wider mb-4">Follow Us</h3>
            <div className="flex gap-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-700 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            {/* Copyright */}
            <p className="text-gray-500 text-xs">
              © 2024 Serenitea. All rights reserved.
            </p>

            {/* Payment Methods */}
            <div className="flex items-center gap-3">
              <div className="bg-white rounded px-2 py-1">
                <span className="text-[#1a1f71] font-bold text-xs">VISA</span>
              </div>
              <div className="bg-white rounded px-2 py-1">
                <span className="text-[#eb001b] font-bold text-xs">MC</span>
              </div>
              <div className="bg-white rounded px-2 py-1">
                <span className="text-[#003087] font-bold text-xs">PayPal</span>
              </div>
              <div className="bg-white rounded px-2 py-1">
                <span className="text-black font-bold text-xs">Apple Pay</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
