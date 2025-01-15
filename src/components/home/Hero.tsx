'use client';

import Link from 'next/link';
import SearchBar from '../ui/SearchBar';
import { motion } from 'framer-motion';

export default function Hero() {
  return (
    <>
      {/* Hero section avec image */}
      <section className="relative h-screen">
        {/* Image de fond avec effet parallaxe */}
        <div 
          className="absolute inset-0 bg-[url('/images/porto-vecchio-1.jpg')] bg-cover bg-fixed bg-center brightness-[0.6]"
          style={{ backgroundPosition: '50% 30%' }}
        />
        
        {/* Overlay graduel amélioré */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-black/70" />

        {/* Contenu */}
        <div className="relative h-full flex flex-col items-center justify-center">
          <div className="container mx-auto px-6 -mt-20">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="max-w-4xl mx-auto text-center space-y-8"
            >
              <h1 className="text-5xl md:text-6xl xl:text-7xl font-serif text-white leading-tight tracking-tight">
                Découvrez <span className="text-luxury-gold drop-shadow-lg">l'Excellence</span>
                <br />
                des Villas de Luxe en Corse
              </h1>
              
              <p className="text-xl xl:text-2xl text-white/95 max-w-2xl mx-auto font-light leading-relaxed">
                Laissez-vous séduire par nos villas d'exception et vivez des moments inoubliables 
                dans les plus beaux endroits de l'île de beauté
              </p>
            </motion.div>
          </div>
        </div>

        {/* Flèche animée pour indiquer de scroller */}
        <motion.div 
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
        >
          <div className="w-8 h-8 border-r-2 border-b-2 border-white/80 transform rotate-45"></div>
        </motion.div>
      </section>

      {/* Section de recherche */}
      <section className="relative bg-gradient-to-br from-[#1A365D]/95 via-[#1A365D]/90 to-luxury-gold/30 py-20 overflow-hidden">
        <div className="container mx-auto px-6">
          {/* Cercles décoratifs avec animation réduite */}
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-luxury-gold/20 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-luxury-gold/20 rounded-full blur-3xl"></div>
          
          <div className="relative z-10">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="max-w-4xl mx-auto"
            >
              <div className="text-center mb-12">
                <h2 className="text-4xl md:text-5xl xl:text-6xl font-serif text-white mb-6 drop-shadow-lg">
                  Trouvez la Villa de vos Rêves
                </h2>
                <p className="text-white/90 text-xl max-w-2xl mx-auto font-light">
                  Découvrez notre sélection exclusive de villas de luxe en Corse
                </p>
              </div>
              <SearchBar />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Section des avantages */}
      <section className="bg-white py-24">
        <div className="container mx-auto px-6">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl xl:text-6xl font-serif text-center mb-20"
          >
            Une Expérience de Location Unique
          </motion.h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {[
              {
                icon: "🏡",
                title: "Villas d'Exception",
                description: "Propriétés méticuleusement choisies, minutieusement préparées pour votre séjour"
              },
              {
                icon: "👤",
                title: "Service Conciergerie",
                description: "À votre disposition 24h/24 et 7j/7 pour répondre à toutes vos demandes"
              },
              {
                icon: "💝",
                title: "Expériences Uniques",
                description: "Des moments inoubliables avec nos activités et services sur-mesure"
              },
              {
                icon: "🌟",
                title: "Garantie Qualité",
                description: "Des standards élevés pour vous garantir un séjour d'exception"
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="flex flex-col items-center text-center space-y-4 group"
              >
                <motion.div 
                  whileHover={{ scale: 1.1 }}
                  className="w-20 h-20 flex items-center justify-center rounded-full bg-luxury-gold/10 group-hover:bg-luxury-gold/20 transition-colors"
                >
                  <span className="text-3xl">{item.icon}</span>
                </motion.div>
                <h3 className="text-xl font-medium">{item.title}</h3>
                <p className="text-gray-600">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
