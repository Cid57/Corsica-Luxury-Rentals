'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

const images = [
  {
    src: '/images/porto-vecchio-1.jpg',
    alt: 'Porto-Vecchio',
    title: 'Porto-Vecchio',
    description: 'La perle de la Corse du Sud'
  },
  {
    src: '/images/bonifacio-1.jpg',
    alt: 'Bonifacio',
    title: 'Bonifacio',
    description: 'Cité médiévale perchée'
  },
  {
    src: '/images/Saint-florent.jpg',
    alt: 'Saint-Florent',
    title: 'Saint-Florent',
    description: 'Le petit Saint-Tropez corse'
  },
  {
    src: '/images/marina.jpg',
    alt: 'Marina',
    title: 'Marina',
    description: 'Ports de plaisance'
  },
  {
    src: '/images/porto-vecchio-2.jpg',
    alt: 'Porto-Vecchio Vue Mer',
    title: 'Porto-Vecchio',
    description: 'Vues imprenables'
  },
  {
    src: '/images/Fior1.jpg',
    alt: 'Fior di Lezza',
    title: 'Fior di Lezza',
    description: 'Luxe et tranquillité'
  }
];

export default function Gallery() {
  return (
    <div className="container mx-auto px-4 py-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center max-w-3xl mx-auto mb-16"
      >
        <h2 className="text-3xl md:text-4xl font-playfair text-gray-900 mb-4">
          Destinations de Rêve
        </h2>
        <p className="text-gray-600">
          Découvrez les plus beaux endroits de Corse où se situent nos villas d'exception
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {images.map((image, index) => (
          <motion.div
            key={image.src}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="group relative h-80 overflow-hidden rounded-xl shadow-lg hover:shadow-xl transition-shadow"
          >
            <Image
              src={image.src}
              alt={image.alt}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />
            <div className="absolute bottom-6 left-6 right-6">
              <h3 className="text-2xl font-playfair text-white mb-2">
                {image.title}
              </h3>
              <p className="text-white/80 text-sm">
                {image.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
