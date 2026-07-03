import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import contentData from '../data/contentData.json';
import { ShoppingBag, Menu, X } from 'lucide-react';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { totalItems } = useCart();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-300 border-b border-deep-brown/5 ${
        isScrolled ? 'glass py-4' : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12 flex justify-between items-center h-10">
        {/* Mobile menu button */}
        <button className="lg:hidden text-deep-brown" onClick={() => setMobileMenuOpen(true)}>
          <Menu size={24} />
        </button>

        <nav className="hidden lg:flex space-x-8 text-[11px] uppercase tracking-widest font-medium">
          {contentData.navigation.slice(0, 3).map((item) => (
            <Link key={item.path} to={item.path} className="hover:text-subtle-gold transition-colors">
              {item.label}
            </Link>
          ))}
        </nav>

        <Link to="/" className="h-full lg:absolute lg:left-1/2 lg:-translate-x-1/2">
          <img src={contentData.brand.logos.wordmark} alt={contentData.brand.name} className="h-full object-contain" />
        </Link>

        <div className="flex items-center space-x-6 lg:space-x-8 text-[11px] uppercase tracking-widest font-medium">
          <div className="hidden lg:flex space-x-8">
            {contentData.navigation.slice(3, 5).map((item) => (
              <Link key={item.path} to={item.path} className="hover:text-subtle-gold transition-colors">
                {item.label}
              </Link>
            ))}
          </div>
          <Link to="/cart" className="relative hover:text-subtle-gold transition-colors flex items-center gap-2">
            <span className="hidden lg:block">Giỏ hàng ({totalItems})</span>
            <ShoppingBag size={18} strokeWidth={1.5} className="lg:hidden" />
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-2 bg-deep-brown text-warm-ivory text-[9px] w-4 h-4 flex lg:hidden items-center justify-center rounded-full">
                {totalItems}
              </span>
            )}
          </Link>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 bg-warm-ivory z-50 flex flex-col p-6">
          <div className="flex justify-between items-center mb-12">
            <Link to="/" className="text-2xl font-serif">{contentData.brand.name}</Link>
            <button onClick={() => setMobileMenuOpen(false)}>
              <X size={28} strokeWidth={1.5} />
            </button>
          </div>
          <nav className="flex flex-col space-y-6 text-xl font-serif">
            {contentData.navigation.map((item) => (
              <Link key={item.path} to={item.path} className="border-b border-warm-sand pb-4">
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
