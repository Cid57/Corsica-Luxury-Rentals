'use client';

import Link from 'next/link';
import SearchBar from '@/components/ui/SearchBar';
import Features from './Features';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { getImagePath } from '@/utils/imagePath';

export default function Hero() {
  return (
    <>
      {/* Hero section avec image */}
      <section className="relative h-[80vh]">
        {/* Image de fond */}
        <div className="absolute inset-0">
          <Image
            src={getImagePath('/images/porto-vecchio-1.jpg')}
            alt="Vue de Porto-Vecchio"
            fill
            priority
            className="object-cover brightness-[0.6]"
            style={{ objectPosition: '50% 30%' }}
          />
        </div>
        
        {/* Overlay graduel */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-black/70" />

        {/* Contenu */}
        <div className="relative h-full flex flex-col items-center justify-center">
          <div className="container mx-auto px-6">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="max-w-4xl mx-auto text-center space-y-8"
            >
              <h1 className="text-5xl md:text-6xl xl:text-7xl font-serif text-white leading-tight tracking-tight">
                Découvrez <span className="text-luxury-gold drop-shadow-lg">l'Excellence</span><br />
                des Villas de Luxe en Corse
              </h1>
              <p className="text-xl text-gray-200 max-w-2xl mx-auto">
                Laissez-vous séduire par nos villas d'exception et vivez des moments inoubliables dans les plus beaux endroits de l'île de beauté
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Section de recherche */}
      <section className="bg-gradient-to-br from-[#2B4562] via-[#2B4562] to-[#C4A24D]/70 py-8">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center space-y-4 mb-6">
            <h2 className="text-3xl md:text-4xl xl:text-5xl font-medium text-white mb-2">
              Trouvez la Villa de vos Rêves
            </h2>
            <p className="text-lg text-gray-300">
              Découvrez notre sélection exclusive de villas de luxe en Corse
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6">
              <SearchBar />
            </div>
          </div>
        </div>
      </section>

      {/* Section Features */}
      <Features />
    </>
  );
}
