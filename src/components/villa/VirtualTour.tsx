'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

interface VirtualTourProps {
  images: string[];
  title: string;
}

export default function VirtualTour({ images, title }: VirtualTourProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  return (
    <div className="relative">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentImageIndex}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="relative aspect-[4/3] overflow-hidden rounded-lg"
        >
          <Image
            src={images[currentImageIndex]}
            alt={`Vue ${currentImageIndex + 1} de ${title}`}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority
          />
        </motion.div>
      </AnimatePresence>

      {/* Navigation points */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex items-center space-x-2 bg-black/50 rounded-full px-4 py-2">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentImageIndex(index)}
            className={`w-2 h-2 rounded-full transition-all ${
              index === currentImageIndex ? 'bg-white scale-125' : 'bg-white/50'
            }`}
            aria-label={`Image ${index + 1}`}
          />
        ))}
      </div>

      {/* Navigation arrows */}
      <button
        onClick={() => setCurrentImageIndex(prev => (prev === 0 ? images.length - 1 : prev - 1))}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/75 transition-colors"
        aria-label="Image précédente"
      >
        ←
      </button>
      <button
        onClick={() => setCurrentImageIndex(prev => (prev === images.length - 1 ? 0 : prev + 1))}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/75 transition-colors"
        aria-label="Image suivante"
      >
        →
      </button>

      <div className="mt-4 flex justify-between items-center text-sm text-gray-500">
        <span>Image {currentImageIndex + 1} sur {images.length}</span>
        <span>Utilisez les flèches pour naviguer</span>
      </div>
    </div>
  );
}
