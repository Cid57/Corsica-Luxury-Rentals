'use client';

import Link from 'next/link';
import { FaFacebook, FaInstagram, FaTwitter } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-primary text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Titre et description */}
          <div className="space-y-4">
            <Link href="/" className="block">
              <span className="text-2xl font-serif text-luxury-gold hover:text-luxury-cream transition-all duration-300">
                Corsica Luxury Rentals
              </span>
            </Link>
            <p className="text-gray-300">
              Location de villas de luxe en Corse. Des propriétés d'exception pour des séjours inoubliables.
            </p>
          </div>

          {/* Navigation */}
          <div className="space-y-4">
            <h3 className="text-lg font-serif text-luxury-gold">Navigation</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-300 hover:text-luxury-gold transition-colors">
                  Accueil
                </Link>
              </li>
              <li>
                <Link href="/villas" className="text-gray-300 hover:text-luxury-gold transition-colors">
                  Nos villas
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-gray-300 hover:text-luxury-gold transition-colors">
                  Configurer son séjour
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-300 hover:text-luxury-gold transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h3 className="text-lg font-serif text-luxury-gold">Contact</h3>
            <ul className="space-y-2 text-gray-300">
              <li>Email: contact@corsicaluxury.com</li>
              <li>Téléphone: +33 4 XX XX XX XX</li>
              <li>Adresse: Ajaccio, Corse</li>
            </ul>
          </div>

          {/* Réseaux sociaux */}
          <div className="space-y-4">
            <h3 className="text-lg font-serif text-luxury-gold">Suivez-nous</h3>
            <div className="flex space-x-4">
              <a
                href="#"
                className="text-gray-300 hover:text-luxury-gold transition-colors"
                aria-label="Facebook"
              >
                <FaFacebook size={24} />
              </a>
              <a
                href="#"
                className="text-gray-300 hover:text-luxury-gold transition-colors"
                aria-label="Instagram"
              >
                <FaInstagram size={24} />
              </a>
              <a
                href="#"
                className="text-gray-300 hover:text-luxury-gold transition-colors"
                aria-label="Twitter"
              >
                <FaTwitter size={24} />
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-8 border-t border-luxury-gold/20 text-center text-gray-300">
          <p>&copy; {new Date().getFullYear()} Corsica Luxury Rentals. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
