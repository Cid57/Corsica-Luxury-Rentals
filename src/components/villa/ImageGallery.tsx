'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes, FaExpand } from 'react-icons/fa';
import { getImagePath } from '@/utils/imagePath';

interface ImageGalleryProps {
  images: string[];
  villaName: string;
}

export default function ImageGallery({ images, villaName }: ImageGalleryProps) {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [fullscreenIndex, setFullscreenIndex] = useState(0);

  const mainImage = images[0];
  const sideImages = images.slice(1, 3);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {/* Image principale */}
      <div className="relative h-[600px] md:h-[500px] rounded-2xl overflow-hidden group col-span-1">
        <Image
          src={getImagePath(mainImage)}
          alt={`${villaName} - Image principale`}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover"
          priority
          onClick={() => {
            setFullscreenIndex(0);
            setIsFullscreen(true);
          }}
        />
        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button
            onClick={() => {
              setFullscreenIndex(0);
              setIsFullscreen(true);
            }}
            className="absolute top-4 right-4 bg-white/10 backdrop-blur-sm p-2 rounded-full"
          >
            <FaExpand className="text-white text-xl" />
          </button>
        </div>
      </div>

      {/* Images secondaires */}
      <div className="grid grid-cols-1 gap-4 h-[600px] md:h-[500px]">
        {sideImages.map((image, index) => (
          <div key={image} className="relative h-full rounded-2xl overflow-hidden group">
            <Image
              src={getImagePath(image)}
              alt={`${villaName} - Image ${index + 2}`}
              fill
              sizes="(max-width: 768px) 100vw, 25vw"
              className="object-cover"
              onClick={() => {
                setFullscreenIndex(index + 1);
                setIsFullscreen(true);
              }}
            />
            <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <button
                onClick={() => {
                  setFullscreenIndex(index + 1);
                  setIsFullscreen(true);
                }}
                className="absolute top-4 right-4 bg-white/10 backdrop-blur-sm p-2 rounded-full"
              >
                <FaExpand className="text-white text-xl" />
              </button>
            </div>
          </div>
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
            <div className="relative w-full h-full max-w-7xl max-h-[90vh] mx-4">
              <Image
                src={getImagePath(images[fullscreenIndex])}
                alt={`${villaName} - Image en plein écran`}
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
