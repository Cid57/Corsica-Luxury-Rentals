'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { FaChevronLeft, FaChevronRight, FaTimes, FaExpand } from 'react-icons/fa';
import { getImagePath } from '@/utils/imagePath';

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
          src={getImagePath(images[currentImageIndex])}
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
      <div className="grid grid-cols-4 gap-4">
        {images.map((image, index) => (
          <button
            key={image}
            onClick={() => setCurrentImageIndex(index)}
            className={`relative h-24 rounded-lg overflow-hidden ${
              index === currentImageIndex ? 'ring-2 ring-luxury-gold' : ''
            }`}
          >
            <Image
              src={getImagePath(image)}
              alt={`${villaName} - Image ${index + 1}`}
              fill
              sizes="(max-width: 768px) 25vw, (max-width: 1200px) 20vw, 15vw"
              className="object-cover"
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
            className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center"
          >
            <button
              onClick={() => setIsFullscreen(false)}
              className="absolute top-4 right-4 bg-white/10 backdrop-blur-sm p-2 rounded-full"
            >
              <FaTimes className="text-white text-xl" />
            </button>
            <button
              onClick={previousImage}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/10 backdrop-blur-sm p-3 rounded-full"
            >
              <FaChevronLeft className="text-white text-xl" />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/10 backdrop-blur-sm p-3 rounded-full"
            >
              <FaChevronRight className="text-white text-xl" />
            </button>
            <div className="relative w-full h-full max-w-7xl max-h-[90vh] m-4">
              <Image
                src={getImagePath(images[currentImageIndex])}
                alt={`${villaName} - Image ${currentImageIndex + 1}`}
                fill
                sizes="100vw"
                className="object-contain"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
