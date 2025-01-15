'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { FaChevronLeft, FaChevronRight, FaTimes, FaExpand } from 'react-icons/fa';

interface ImageGalleryProps {
  images: string[];
  villaName: string;
}

export default function ImageGallery({ images, villaName }: ImageGalleryProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const previousImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  return (
    <div className="space-y-4">
      {/* Image principale */}
      <div className="relative h-[600px] rounded-2xl overflow-hidden group">
        <Image
          src={images[currentImageIndex]}
          alt={`${villaName} - Image principale`}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 100vw"
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button
            onClick={() => setIsFullscreen(true)}
            className="absolute top-4 right-4 bg-white/10 backdrop-blur-sm p-2 rounded-full"
          >
            <FaExpand className="text-white text-xl" />
          </button>
        </div>
        <button
          onClick={previousImage}
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/10 backdrop-blur-sm p-3 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        >
          <FaChevronLeft className="text-white text-xl" />
        </button>
        <button
          onClick={nextImage}
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/10 backdrop-blur-sm p-3 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        >
          <FaChevronRight className="text-white text-xl" />
        </button>
      </div>

      {/* Miniatures */}
      <div className="flex space-x-4 overflow-x-auto pb-4">
        {images.map((image, index) => (
          <button
            key={index}
            onClick={() => setCurrentImageIndex(index)}
            className={`relative flex-shrink-0 w-32 h-24 rounded-lg overflow-hidden ${
              index === currentImageIndex ? 'ring-2 ring-luxury-gold' : ''
            }`}
          >
            <Image
              src={image}
              alt={`${villaName} - Miniature ${index + 1}`}
              fill
              sizes="(max-width: 768px) 33vw, (max-width: 1200px) 25vw, 20vw"
              className={`object-cover transition-all duration-300 ${
                currentImageIndex === index ? 'opacity-100' : 'opacity-50 hover:opacity-75'
              }`}
            />
          </button>
        ))}
      </div>

      {/* Vue plein écran */}
      <AnimatePresence>
        {isFullscreen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black z-50 flex items-center justify-center"
          >
            <button
              onClick={toggleFullscreen}
              className="absolute top-4 right-4 text-white hover:text-gray-300 z-10 bg-black/20 p-2 rounded-full"
            >
              <FaTimes className="w-6 h-6" />
            </button>

            <button
              onClick={previousImage}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:text-gray-300 z-10 bg-black/20 p-3 rounded-full"
            >
              <FaChevronLeft className="w-6 h-6" />
            </button>

            <button
              onClick={nextImage}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:text-gray-300 z-10 bg-black/20 p-3 rounded-full"
            >
              <FaChevronRight className="w-6 h-6" />
            </button>

            <motion.div
              key={currentImageIndex}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              className="relative w-full h-full"
            >
              <Image
                src={images[currentImageIndex]}
                alt={`${villaName} - Image ${currentImageIndex + 1}`}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 100vw"
                className="object-contain"
              />
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/50 px-4 py-2 rounded-full text-white text-sm">
                {currentImageIndex + 1} / {images.length}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
