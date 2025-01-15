'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { FaQuoteLeft, FaStar } from 'react-icons/fa';
import { getImagePath } from '@/utils/imagePath';

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

  return (
    <section className="py-24 bg-gradient-to-br from-[#1A365D] via-[#1A365D]/90 to-luxury-gold/30">
      <div className="container mx-auto px-6">
        {/* Cercles décoratifs */}
        <div className="absolute left-0 top-0 w-96 h-96 bg-luxury-gold/10 rounded-full blur-3xl"></div>
        <div className="absolute right-0 bottom-0 w-96 h-96 bg-luxury-gold/10 rounded-full blur-3xl"></div>

        <div className="text-center mb-16 relative z-10">
          <h2 className="text-3xl md:text-4xl xl:text-5xl font-serif text-white mb-4">
            Ils nous font confiance
          </h2>
          <p className="text-white/80 text-lg max-w-2xl mx-auto">
            Découvrez les expériences de nos clients dans nos villas d'exception
          </p>
        </div>

        <div className="relative max-w-6xl mx-auto">
          {/* Carrousel */}
          <div className="relative overflow-hidden">
            <div 
              className="flex transition-transform duration-500 ease-out"
              style={{ transform: `translateX(-${activeIndex * 100}%)` }}
            >
              {testimonials.map((testimonial) => (
                <div
                  key={testimonial.id}
                  className="w-full flex-shrink-0 px-4"
                >
                  <div className="bg-[#1A365D]/20 backdrop-blur-xl rounded-2xl p-8 shadow-xl border border-white/10">
                    <div className="flex items-center gap-6 mb-6">
                      <div className="relative w-20 h-20">
                        <div className="absolute inset-0 bg-luxury-gold/20 rounded-full blur-lg"></div>
                        <div className="relative w-20 h-20 rounded-full overflow-hidden border-2 border-luxury-gold">
                          <Image
                            src={testimonial.image}
                            alt={testimonial.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-white">
                          {testimonial.name}
                        </h3>
                        <p className="text-white/70">{testimonial.role}</p>
                        <p className="text-luxury-gold font-medium text-sm mt-1">
                          {testimonial.location}
                        </p>
                      </div>
                    </div>

                    <div className="mb-6 relative">
                      <FaQuoteLeft className="absolute -top-3 -left-2 text-4xl text-luxury-gold/20" />
                      <p className="text-white/90 text-lg italic pl-8">
                        "{testimonial.quote}"
                      </p>
                    </div>

                    <div className="flex items-center gap-1">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <FaStar key={i} className="text-luxury-gold" />
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Navigation */}
            <div className="absolute top-1/2 left-4 right-4 -translate-y-1/2 flex justify-between pointer-events-none">
              <button
                onClick={() => setActiveIndex((current) => (current - 1 + testimonials.length) % testimonials.length)}
                className="w-12 h-12 rounded-full bg-[#1A365D]/30 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white hover:bg-[#1A365D]/50 transition-all pointer-events-auto"
              >
                ←
              </button>
              <button
                onClick={() => setActiveIndex((current) => (current + 1) % testimonials.length)}
                className="w-12 h-12 rounded-full bg-[#1A365D]/30 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white hover:bg-[#1A365D]/50 transition-all pointer-events-auto"
              >
                →
              </button>
            </div>

            {/* Indicateurs */}
            <div className="flex justify-center gap-3 mt-8">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveIndex(index)}
                  className={`w-3 h-3 rounded-full transition-all ${
                    index === activeIndex
                      ? 'bg-luxury-gold w-8'
                      : 'bg-white/30 hover:bg-white/50'
                  }`}
                  aria-label={`Voir le témoignage ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
