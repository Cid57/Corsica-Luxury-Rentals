'use client';

import { useState, useCallback, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes, FaExpand, FaChevronLeft, FaChevronRight } from 'react-icons/fa';

interface ImageGalleryProps {
  images: string[];
  villaName: string;
}

export default function ImageGallery({ images, villaName }: ImageGalleryProps) {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [fullscreenIndex, setFullscreenIndex] = useState(0);

  const getImagePath = (path: string) => {
    return `${process.env.NODE_ENV === 'production' ? '/Corsica-Luxury-Rentals' : ''}${path}`;
  };

  const nextImage = useCallback(() => {
    setFullscreenIndex((prev) => (prev + 1) % images.length);
  }, [images.length]);

  const previousImage = useCallback(() => {
    setFullscreenIndex((prev) => (prev - 1 + images.length) % images.length);
  }, [images.length]);

  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    if (event.key === 'ArrowRight') {
      nextImage();
    } else if (event.key === 'ArrowLeft') {
      previousImage();
    } else if (event.key === 'Escape') {
      setIsFullscreen(false);
    }
  }, [nextImage, previousImage]);

  useEffect(() => {
    if (isFullscreen) {
      window.addEventListener('keydown', handleKeyDown);
      return () => window.removeEventListener('keydown', handleKeyDown);
    }
  }, [isFullscreen, handleKeyDown]);

  return (
    <div className="relative group">
      {/* Grille d'images */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-2 h-[300px] md:h-[400px]">
        {/* Image principale */}
        <div className="relative col-span-2 row-span-2 overflow-hidden rounded-lg cursor-pointer" 
             onClick={() => { setIsFullscreen(true); setFullscreenIndex(0); }}>
          <Image
            src={getImagePath(images[0])}
            alt={`${villaName} - Vue principale`}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 66vw"
          />
          <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
          <FaExpand className="absolute bottom-4 right-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-xl" />
        </div>

        {/* Images secondaires */}
        <div className="hidden md:block">
          <div className="relative h-[198px] overflow-hidden rounded-lg cursor-pointer mb-2" 
               onClick={() => { setIsFullscreen(true); setFullscreenIndex(1); }}>
            <Image
              src={getImagePath(images[1])}
              alt={`${villaName} - Vue secondaire 1`}
              fill
              className="object-cover"
              sizes="33vw"
            />
            <div className="absolute inset-0 bg-black opacity-0 hover:opacity-20 transition-opacity duration-300" />
          </div>
          <div className="relative h-[198px] overflow-hidden rounded-lg cursor-pointer" 
               onClick={() => { setIsFullscreen(true); setFullscreenIndex(2); }}>
            <Image
              src={getImagePath(images[2])}
              alt={`${villaName} - Vue secondaire 2`}
              fill
              className="object-cover"
              sizes="33vw"
            />
            <div className="absolute inset-0 bg-black opacity-0 hover:opacity-20 transition-opacity duration-300" />
            <div className="absolute inset-0 flex items-center justify-center">
              <button
                onClick={(e) => { e.stopPropagation(); setIsFullscreen(true); }}
                className="bg-white/80 backdrop-blur-sm px-4 py-2 rounded-lg text-sm font-medium
                         hover:bg-white transition-all duration-300 flex items-center gap-2"
              >
                <FaExpand className="w-4 h-4" />
                Voir plus
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Vue plein écran */}
      <AnimatePresence>
        {isFullscreen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-95 z-50 flex items-center justify-center"
            onClick={() => setIsFullscreen(false)}
          >
            {/* Bouton fermer */}
            <button
              className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors duration-200"
              onClick={() => setIsFullscreen(false)}
            >
              <FaTimes className="text-2xl" />
            </button>

            {/* Navigation */}
            <button
              className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:text-gray-300 transition-colors duration-200"
              onClick={(e) => { e.stopPropagation(); previousImage(); }}
            >
              <FaChevronLeft className="text-3xl" />
            </button>

            <button
              className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:text-gray-300 transition-colors duration-200"
              onClick={(e) => { e.stopPropagation(); nextImage(); }}
            >
              <FaChevronRight className="text-3xl" />
            </button>

            {/* Image */}
            <div className="relative w-full h-full max-w-6xl max-h-[85vh] mx-4" onClick={(e) => e.stopPropagation()}>
              <Image
                src={getImagePath(images[fullscreenIndex])}
                alt={`${villaName} - Image ${fullscreenIndex + 1}`}
                fill
                className="object-contain"
                sizes="100vw"
              />
              {/* Indicateur de position */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/50 backdrop-blur-sm px-3 py-1 rounded-full text-white text-sm">
                {fullscreenIndex + 1} / {images.length}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
