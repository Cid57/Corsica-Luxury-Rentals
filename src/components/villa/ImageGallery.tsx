'use client';

import { useState, useCallback } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes, FaExpand, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { getImagePath } from '@/utils/imagePath';

interface ImageGalleryProps {
  images: string[];
  villaName: string;
}

export default function ImageGallery({ images, villaName }: ImageGalleryProps) {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [fullscreenIndex, setFullscreenIndex] = useState(0);

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

  // Ajouter/supprimer les événements clavier
  useState(() => {
    if (isFullscreen) {
      window.addEventListener('keydown', handleKeyDown);
      return () => window.removeEventListener('keydown', handleKeyDown);
    }
  }, [isFullscreen, handleKeyDown]);

  return (
    <div className="relative group">
      {/* Grille d'images */}
      <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr_1fr] gap-2 h-[400px] md:h-[550px]">
        {/* Image principale */}
        <div className="relative overflow-hidden cursor-pointer">
          <Image
            src={getImagePath(images[0])}
            alt={`${villaName} - Image principale`}
            fill
            sizes="(max-width: 768px) 100vw, 66vw"
            className="object-cover hover:scale-105 transition-transform duration-700"
            priority
            onClick={() => {
              setFullscreenIndex(0);
              setIsFullscreen(true);
            }}
          />
        </div>

        {/* Images secondaires */}
        <div className="hidden md:grid grid-rows-2 gap-2">
          <div className="relative overflow-hidden cursor-pointer">
            <Image
              src={getImagePath(images[1])}
              alt={`${villaName} - Image 2`}
              fill
              sizes="25vw"
              className="object-cover hover:scale-105 transition-transform duration-700"
              onClick={() => {
                setFullscreenIndex(1);
                setIsFullscreen(true);
              }}
            />
          </div>
          <div className="relative overflow-hidden cursor-pointer">
            <Image
              src={getImagePath(images[2])}
              alt={`${villaName} - Image 3`}
              fill
              sizes="25vw"
              className="object-cover hover:scale-105 transition-transform duration-700"
              onClick={() => {
                setFullscreenIndex(2);
                setIsFullscreen(true);
              }}
            />
          </div>
        </div>

        {/* Dernière colonne avec bouton */}
        <div className="hidden md:grid grid-rows-2 gap-2">
          <div className="relative overflow-hidden cursor-pointer">
            <Image
              src={getImagePath(images[2])}
              alt={`${villaName} - Image 4`}
              fill
              sizes="25vw"
              className="object-cover hover:scale-105 transition-transform duration-700"
              onClick={() => {
                setFullscreenIndex(2);
                setIsFullscreen(true);
              }}
            />
          </div>
          <div className="relative overflow-hidden cursor-pointer">
            <div className="absolute inset-0 bg-black/40 z-10 flex items-center justify-center group-hover:bg-black/50 transition-colors duration-300">
              <button
                onClick={() => {
                  setFullscreenIndex(0);
                  setIsFullscreen(true);
                }}
                className="bg-white/90 backdrop-blur-sm px-6 py-3 rounded-lg shadow-lg 
                           hover:bg-white transition-all duration-300 
                           text-sm font-medium flex items-center gap-2"
              >
                <FaExpand className="w-4 h-4" />
                Voir toutes les photos
              </button>
            </div>
            <Image
              src={getImagePath(images[1])}
              alt={`${villaName} - Image 5`}
              fill
              sizes="25vw"
              className="object-cover"
            />
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
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-sm flex items-center justify-center"
          >
            {/* Bouton fermer */}
            <button
              onClick={() => setIsFullscreen(false)}
              className="absolute top-4 right-4 z-50 bg-white/10 hover:bg-white/20 backdrop-blur-sm p-3 rounded-full transition-colors duration-200"
            >
              <FaTimes className="text-white text-xl" />
            </button>

            {/* Navigation */}
            <button
              onClick={previousImage}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-50 bg-white/10 hover:bg-white/20 backdrop-blur-sm p-4 rounded-full transition-colors duration-200"
            >
              <FaChevronLeft className="text-white text-xl" />
            </button>

            <button
              onClick={nextImage}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-50 bg-white/10 hover:bg-white/20 backdrop-blur-sm p-4 rounded-full transition-colors duration-200"
            >
              <FaChevronRight className="text-white text-xl" />
            </button>

            {/* Container de l'image */}
            <motion.div
              key={fullscreenIndex}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.1 }}
              transition={{ duration: 0.3 }}
              className="relative w-full h-full max-w-7xl max-h-[90vh] mx-4"
            >
              <Image
                src={getImagePath(images[fullscreenIndex])}
                alt={`${villaName} - Image en plein écran`}
                fill
                sizes="100vw"
                className="object-contain"
                priority
              />
              
              {/* Indicateur de position */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/50 backdrop-blur-sm px-4 py-2 rounded-full text-white text-sm">
                {fullscreenIndex + 1} / {images.length}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
