'use client';

import { villas } from '@/data/villas';
import { notFound, useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { FaBed, FaBath, FaUsers, FaArrowLeft } from 'react-icons/fa';
import { BsWifi, BsHouseDoor } from 'react-icons/bs';
import { TbPool } from 'react-icons/tb';
import { MdPets, MdOutlineCleaningServices } from 'react-icons/md';
import BookingForm from '@/components/booking/BookingForm';
import { motion } from 'framer-motion';

interface Params {
  id: string;
}

export default function Page() {
  const params = useParams() as { id: string };
  const router = useRouter();
  const villa = villas.find(v => v.id === params.id);

  if (!villa) {
    notFound();
  }

  const defaultImage = '/images/default-villa.jpg'; 
  const villaImage = villa.images && villa.images.length > 0 ? villa.images[0] : defaultImage;

  const handleBack = () => {
    router.back();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Bouton retour */}
      <button
        onClick={handleBack}
        className="fixed top-8 left-8 z-50 p-3 bg-white/80 backdrop-blur-sm rounded-full shadow-lg hover:scale-110 transition-all duration-300"
      >
        <FaArrowLeft className="w-6 h-6 text-gray-700" />
      </button>

      {/* Hero Section avec image et titre */}
      <div className="relative h-[40vh] w-full">
        <Image
          src={villaImage}
          alt={villa.name}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-transparent" />
        <div className="absolute inset-0 flex items-center justify-center text-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-4"
          >
            <h1 className="text-4xl md:text-5xl font-serif text-white">
              {villa.name}
            </h1>
            <p className="text-lg text-white/90">
              Réservez votre séjour de rêve
            </p>
          </motion.div>
        </div>
      </div>

      {/* Contenu principal */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Informations de la villa */}
          <div className="lg:col-span-1 space-y-6">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              {/* Prix par nuit */}
              <div className="bg-gradient-to-br from-luxury-gold/20 to-luxury-gold/5 rounded-2xl shadow-lg p-6 mb-8">
                <div className="text-center">
                  <h3 className="text-xl font-medium mb-2">Prix par nuit</h3>
                  <p className="text-3xl font-serif text-luxury-gold">{villa.pricePerNight}€</p>
                  <div className="flex justify-between items-center mt-4 pt-4 border-t border-luxury-gold/10">
                    <span className="text-gray-600">Séjour minimum</span>
                    <span>3 nuits</span>
                  </div>
                  <div className="flex justify-between items-center mt-2">
                    <span className="text-gray-600">Caution</span>
                    <span>{villa.pricePerNight * 2}€</span>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
                <h2 className="text-2xl font-serif mb-4">Détails de la villa</h2>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-luxury-gold/10 rounded-lg">
                      <BsHouseDoor className="w-5 h-5 text-luxury-gold" />
                    </div>
                    <span>{villa.surface} m²</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-luxury-gold/10 rounded-lg">
                      <FaBed className="w-5 h-5 text-luxury-gold" />
                    </div>
                    <span>{villa.bedrooms} chambres</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-luxury-gold/10 rounded-lg">
                      <FaBath className="w-5 h-5 text-luxury-gold" />
                    </div>
                    <span>{villa.bathrooms} salles de bain</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-luxury-gold/10 rounded-lg">
                      <FaUsers className="w-5 h-5 text-luxury-gold" />
                    </div>
                    <span>Jusqu'à {villa.maxGuests} voyageurs</span>
                  </div>
                </div>
              </div>

              <div className="mt-6 bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
                <h2 className="text-2xl font-serif mb-4">Équipements</h2>
                <div className="grid grid-cols-2 gap-4">
                  {villa.amenities.includes('Piscine') && (
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-luxury-gold/10 rounded-lg">
                        <TbPool className="w-5 h-5 text-luxury-gold" />
                      </div>
                      <span>Piscine</span>
                    </div>
                  )}
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-luxury-gold/10 rounded-lg">
                      <BsWifi className="w-5 h-5 text-luxury-gold" />
                    </div>
                    <span>Wi-Fi</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-luxury-gold/10 rounded-lg">
                      <MdPets className="w-5 h-5 text-luxury-gold" />
                    </div>
                    <span>Animaux acceptés</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-luxury-gold/10 rounded-lg">
                      <MdOutlineCleaningServices className="w-5 h-5 text-luxury-gold" />
                    </div>
                    <span>Ménage inclus</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Formulaire de réservation */}
          <motion.div 
            className="lg:col-span-2"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <BookingForm 
              villaId={villa.id} 
              pricePerNight={villa.pricePerNight} 
            />
          </motion.div>
        </div>
      </div>
    </div>
  );
}
