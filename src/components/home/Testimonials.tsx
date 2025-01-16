'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { FaQuoteLeft, FaStar, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { getImagePath } from '@/utils/imagePath';
import { motion, AnimatePresence } from 'framer-motion';

const testimonials = [
  {
    id: 1,
    name: 'Sophie Laurent',
    role: 'Séjour en famille',
    image: getImagePath('/images/person-1.jpg'),
    quote: 'Une expérience inoubliable dans une villa exceptionnelle. Le service de conciergerie était parfait, toujours à l\'écoute de nos besoins.',
    rating: 5,
    location: 'Villa à Porto-Vecchio'
  },
  {
    id: 2,
    name: 'Marc Dubois',
    role: 'Voyage d\'affaires',
    image: getImagePath('/images/person-2.jpg'),
    quote: 'Le niveau de luxe et de service est incomparable. Chaque détail a été pensé pour rendre notre séjour parfait.',
    rating: 5,
    location: 'Villa à Bonifacio'
  },
  {
    id: 3,
    name: 'Marie Lefebvre',
    role: 'Séjour romantique',
    image: getImagePath('/images/person-3.jpg'),
    quote: 'Un cadre idyllique pour notre séjour en amoureux. La vue sur la mer était à couper le souffle.',
    rating: 5,
    location: 'Villa à Saint-Florent'
  }
];

export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((current) => (current + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const handlePrevious = () => {
    setActiveIndex((current) => (current - 1 + testimonials.length) % testimonials.length);
  };

  const handleNext = () => {
    setActiveIndex((current) => (current + 1) % testimonials.length);
  };

  return (
    <section className="py-24 bg-gradient-to-br from-[#1A365D] via-[#1A365D]/90 to-luxury-gold/30 overflow-hidden">
      <div className="container mx-auto px-6 relative">
        {/* Cercles décoratifs */}
        <div className="absolute left-0 top-0 w-96 h-96 bg-luxury-gold/10 rounded-full blur-3xl -translate-x-1/2"></div>
        <div className="absolute right-0 bottom-0 w-96 h-96 bg-luxury-gold/10 rounded-full blur-3xl translate-x-1/2"></div>

        <div className="text-center mb-16 relative z-10">
          <h2 className="text-3xl md:text-4xl xl:text-5xl font-serif text-white mb-4">
            Ils nous font confiance
          </h2>
          <p className="text-white/80 text-lg max-w-2xl mx-auto">
            Découvrez les expériences de nos clients dans nos villas d'exception
          </p>
        </div>

        <div className="relative max-w-3xl mx-auto">
          {/* Navigation */}
          <button 
            onClick={handlePrevious}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-12 z-20 text-white/50 hover:text-white transition-colors p-2"
            aria-label="Témoignage précédent"
          >
            <FaChevronLeft className="w-6 h-6" />
          </button>
          <button 
            onClick={handleNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-12 z-20 text-white/50 hover:text-white transition-colors p-2"
            aria-label="Témoignage suivant"
          >
            <FaChevronRight className="w-6 h-6" />
          </button>

          {/* Carrousel */}
          <div className="relative overflow-hidden rounded-2xl">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.3 }}
                className="w-full"
              >
                <div className="bg-[#1A365D]/20 backdrop-blur-xl p-8 shadow-xl border border-white/10">
                  <div className="flex flex-col md:flex-row items-center md:items-start gap-6 mb-6">
                    <div className="relative w-20 h-20 flex-shrink-0">
                      <div className="absolute inset-0 bg-luxury-gold/20 rounded-full blur-lg"></div>
                      <div className="relative w-20 h-20 rounded-full overflow-hidden border-2 border-luxury-gold">
                        <Image
                          src={testimonials[activeIndex].image}
                          alt={testimonials[activeIndex].name}
                          fill
                          className="object-cover"
                        />
                      </div>
                    </div>
                    <div className="text-center md:text-left">
                      <h3 className="text-xl font-semibold text-white">
                        {testimonials[activeIndex].name}
                      </h3>
                      <p className="text-white/70">{testimonials[activeIndex].role}</p>
                      <p className="text-luxury-gold font-medium text-sm mt-1">
                        {testimonials[activeIndex].location}
                      </p>
                    </div>
                  </div>

                  <div className="mb-6 relative">
                    <FaQuoteLeft className="absolute -top-3 -left-2 text-4xl text-luxury-gold/20" />
                    <p className="text-white/90 text-lg pl-8 italic">
                      {testimonials[activeIndex].quote}
                    </p>
                  </div>

                  <div className="flex justify-center md:justify-start items-center gap-1">
                    {[...Array(testimonials[activeIndex].rating)].map((_, i) => (
                      <FaStar key={i} className="text-luxury-gold w-5 h-5" />
                    ))}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Indicateurs */}
          <div className="flex justify-center gap-2 mt-6">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === activeIndex ? 'bg-luxury-gold w-6' : 'bg-white/30 hover:bg-white/50'
                }`}
                aria-label={`Aller au témoignage ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
