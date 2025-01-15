'use client';

import { useParams, useRouter } from 'next/navigation';
import { villas } from '@/data/villas';
import { 
  FaBed, 
  FaUsers, 
  FaBath, 
  FaWifi, 
  FaSwimmingPool, 
  FaParking, 
  FaDog, 
  FaArrowLeft,
  FaSnowflake,
  FaUmbrellaBeach,
  FaTree,
  FaMountain,
  FaShip,
  FaSpa
} from 'react-icons/fa';
import { notFound } from 'next/navigation';
import { motion } from 'framer-motion';
import ImageGallery from '@/components/villa/ImageGallery';
import StayConfigurator from '@/components/villa/StayConfigurator';
import Link from 'next/link';

export default function VillaDetail() {
  const params = useParams();
  const router = useRouter();
  const villa = villas.find(v => v.id === params.id);

  const handleBack = () => {
    router.back();
  };

  if (!villa) {
    notFound();
  }

  const amenityIcons: { [key: string]: JSX.Element } = {
    'WiFi': <FaWifi className="w-6 h-6" />,
    'Piscine': <FaSwimmingPool className="w-6 h-6" />,
    'Piscine à débordement': <FaSwimmingPool className="w-6 h-6" />,
    'Piscine chauffée': <FaSwimmingPool className="w-6 h-6" />,
    'Parking': <FaParking className="w-6 h-6" />,
    'Animaux acceptés': <FaDog className="w-6 h-6" />,
    'Climatisation': <FaSnowflake className="w-6 h-6" />,
    'Accès plage': <FaUmbrellaBeach className="w-6 h-6" />,
    'Jardin': <FaTree className="w-6 h-6" />,
    'Vue mer': <FaMountain className="w-6 h-6" />,
    'Vue port': <FaShip className="w-6 h-6" />,
    'Hammam': <FaSpa className="w-6 h-6" />,
  };

  return (
    <main className="min-h-screen pt-32 pb-16">
      <div className="container mx-auto px-4">
        {/* Bouton retour */}
        <div className="max-w-7xl mx-auto mb-6">
          <button
            onClick={handleBack}
            className="flex items-center text-gray-600 hover:text-luxury-gold transition-colors"
          >
            <FaArrowLeft className="mr-2" />
            Retour aux villas
          </button>
        </div>

        {/* En-tête */}
        <div className="max-w-7xl mx-auto mb-12">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div>
              <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4">
                {villa.name}
              </h1>
              <div className="flex items-center gap-4">
                <p className="text-gray-600">{villa.location}</p>
                <div className="flex items-center">
                  <span className="text-2xl font-serif text-luxury-gold">{villa.pricePerNight}€</span>
                  <span className="text-gray-500 ml-1">/ nuit</span>
                </div>
              </div>
            </div>
            <div className="flex flex-col items-end gap-2">
              <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-lg border border-gray-100 mb-2">
                <div className="text-center">
                  <p className="text-gray-600 text-sm">À partir de</p>
                  <p className="text-3xl font-serif text-luxury-gold">{villa.pricePerNight}€</p>
                  <p className="text-gray-500 text-sm">par nuit</p>
                </div>
              </div>
              <Link
                href={`/villas/${params.id}/reservation`}
                className="px-8 py-3 bg-luxury-gold text-white rounded-xl hover:bg-luxury-gold/90 transition-all duration-300 hover:scale-105 text-lg font-medium shadow-lg shadow-luxury-gold/20"
              >
                Réserver maintenant
              </Link>
            </div>
          </div>
        </div>

        {/* Galerie d'images */}
        <ImageGallery images={villa.images} villaName={villa.name} />

        {/* Description et caractéristiques */}
        <div className="max-w-7xl mx-auto mt-16 grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="md:col-span-2">
            <h2 className="text-3xl font-serif font-bold mb-6">À propos de la villa</h2>
            <div className="prose prose-lg">
              <p>
                {villa.description}
              </p>
              <p>
                Cette villa d'exception vous offre un cadre idyllique pour des vacances inoubliables en Corse. 
                Profitez d'une vue imprenable sur la mer Méditerranée et d'un confort absolu dans un environnement 
                luxueux et paisible.
              </p>
              <p>
                La villa dispose d'espaces de vie généreux, d'une décoration raffinée et d'équipements haut de gamme 
                pour répondre à toutes vos attentes.
              </p>
            </div>

            <div className="mt-12 bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
              <h3 className="text-2xl font-serif mb-6">Tarifs et disponibilités</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Prix par nuit</span>
                    <span className="text-xl font-serif text-luxury-gold">{villa.pricePerNight}€</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Séjour minimum</span>
                    <span>3 nuits</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Caution</span>
                    <span>{villa.pricePerNight * 2}€</span>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Arrivée</span>
                    <span>À partir de 16h</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Départ</span>
                    <span>Avant 11h</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Annulation</span>
                    <span>Flexible</span>
                  </div>
                </div>
              </div>
              <div className="mt-6 pt-6 border-t border-gray-100">
                <Link
                  href={`/villas/${params.id}/reservation`}
                  className="w-full flex justify-center items-center px-8 py-4 bg-luxury-gold text-white rounded-xl hover:bg-luxury-gold/90 transition-all duration-300 hover:scale-105 text-lg font-medium shadow-lg shadow-luxury-gold/20"
                >
                  Vérifier les disponibilités
                </Link>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-3xl font-serif font-bold mb-6">Caractéristiques</h2>
            <ul className="space-y-4">
              <li className="flex items-center">
                <FaBed className="h-6 w-6 mr-3 text-luxury-gold" />
                {villa.bedrooms} chambres
              </li>
              <li className="flex items-center">
                <FaUsers className="h-6 w-6 mr-3 text-luxury-gold" />
                {villa.maxGuests} personnes
              </li>
              <li className="flex items-center">
                <FaBath className="h-6 w-6 mr-3 text-luxury-gold" />
                {villa.bathrooms} salles de bain
              </li>
              {villa.amenities.map((amenity, index) => (
                <li key={index} className="flex items-center">
                  <span className="text-luxury-gold mr-3">
                    {amenityIcons[amenity] || <FaWifi className="h-6 w-6" />}
                  </span>
                  {amenity}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </main>
  );
}
