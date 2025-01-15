'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { usePathname } from 'next/navigation';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const navigationItems = [
    { name: 'Accueil', href: '/' },
    { name: 'Nos villas', href: '/villas' },
    { name: 'Configurer son séjour', href: '/services' },
    { name: 'Contact', href: '/contact' },
  ];

  return (
    <nav className="bg-primary text-white fixed w-full z-50 shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-6">
          {/* Site Title */}
          <Link 
            href="/" 
            className="text-2xl font-serif text-luxury-gold hover:text-luxury-cream transition-all duration-300 transform hover:scale-105"
          >
            Corsica Luxury Rentals
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-12">
            {navigationItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`relative text-base font-medium group ${
                    isActive ? 'text-luxury-gold' : 'text-gray-300'
                  }`}
                >
                  <span className="relative z-10 hover:text-luxury-gold transition-colors duration-300">
                    {item.name}
                  </span>
                  <span className={`absolute -bottom-2 left-0 w-0 h-0.5 bg-luxury-gold transition-all duration-300 group-hover:w-full ${
                    isActive ? 'w-full' : ''
                  }`} />
                </Link>
              );
            })}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 text-white hover:text-luxury-gold transition-colors duration-300"
          >
            {isMobileMenuOpen ? (
              <X size={24} className="transform hover:rotate-180 transition-transform duration-300" />
            ) : (
              <Menu size={24} className="transform hover:scale-110 transition-transform duration-300" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden border-t border-luxury-gold/20 bg-primary/95 backdrop-blur-sm"
            >
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="py-6"
              >
                <div className="flex flex-col space-y-6">
                  {navigationItems.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                      <Link
                        key={item.name}
                        href={item.href}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className={`block py-2 text-base font-medium transition-all duration-300 transform hover:translate-x-2 ${
                          isActive 
                            ? 'text-luxury-gold' 
                            : 'text-gray-300 hover:text-luxury-gold'
                        }`}
                      >
                        {item.name}
                      </Link>
                    );
                  })}
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
};

export default Navbar;
