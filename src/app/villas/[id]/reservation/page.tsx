'use client';

import { villas } from '@/data/villas';
import { notFound } from 'next/navigation';
import { FaBed, FaBath, FaUsers, FaMapMarkerAlt, FaInfoCircle } from 'react-icons/fa';
import { BsHouseDoor } from 'react-icons/bs';
import ReservationNavigation from '@/components/villa/ReservationNavigation';
import BookingFormWrapper from '@/components/villa/BookingFormWrapper';
import AmenitiesList from '@/components/villa/AmenitiesList';
import ImageGallery from '@/components/villa/ImageGallery';

interface PageProps {
  params: {
    id: string;
  };
}

export default function Page({ params }: PageProps) {
  const villa = villas.find(v => v.id === params.id);

  if (!villa) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-white">
      <ReservationNavigation />

      <main className="pt-20">
        {/* En-tête avec infos principales */}
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-serif text-gray-900">{villa.name}</h1>
              <div className="flex items-center mt-2 text-gray-600">
                <FaMapMarkerAlt className="text-luxury-gold mr-2" />
                <span>{villa.location}</span>
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-6 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <FaBed className="text-luxury-gold w-4 h-4" />
                <span>{villa.bedrooms} chambres</span>
              </div>
              <div className="flex items-center gap-2">
                <FaBath className="text-luxury-gold w-4 h-4" />
                <span>{villa.bathrooms} sdb</span>
              </div>
              <div className="flex items-center gap-2">
                <FaUsers className="text-luxury-gold w-4 h-4" />
                <span>{villa.maxGuests} pers. max</span>
              </div>
              <div className="flex items-center gap-2">
                <BsHouseDoor className="text-luxury-gold w-4 h-4" />
                <span>{villa.surface}m²</span>
              </div>
            </div>
          </div>
        </div>

        {/* Galerie d'images */}
        <div className="container mx-auto px-4 mb-12">
          <ImageGallery images={villa.images} villaName={villa.name} />
        </div>

        {/* Contenu principal */}
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-8">
            {/* Colonne gauche */}
            <div className="space-y-8">
              {/* Description */}
              <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100 hover:shadow-xl transition-shadow duration-300">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-full bg-luxury-gold/10 flex items-center justify-center">
                    <BsHouseDoor className="w-5 h-5 text-luxury-gold" />
                  </div>
                  <h2 className="text-2xl font-serif text-gray-900">À propos de la villa</h2>
                </div>
                <p className="text-gray-600 leading-relaxed">{villa.description}</p>
              </div>

              {/* Équipements */}
              <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100 hover:shadow-xl transition-shadow duration-300">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-full bg-luxury-gold/10 flex items-center justify-center">
                    <FaUsers className="w-5 h-5 text-luxury-gold" />
                  </div>
                  <h2 className="text-2xl font-serif text-gray-900">Équipements</h2>
                </div>
                <AmenitiesList amenities={villa.amenities} />
              </div>

              {/* Informations d'arrivée */}
              <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100 hover:shadow-xl transition-shadow duration-300">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-full bg-luxury-gold/10 flex items-center justify-center">
                    <FaInfoCircle className="w-5 h-5 text-luxury-gold" />
                  </div>
                  <h2 className="text-2xl font-serif text-gray-900">Informations d&apos;arrivée</h2>
                </div>
                <div className="space-y-6">
                  <div className="p-6 rounded-xl bg-gray-50 border border-gray-100">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-8 h-8 rounded-full bg-luxury-gold/10 flex items-center justify-center">
                        <FaBed className="w-4 h-4 text-luxury-gold" />
                      </div>
                      <h3 className="font-medium text-gray-900">Check-in</h3>
                    </div>
                    <p className="text-gray-600 text-lg ml-11">15h00</p>
                  </div>
                  <div className="p-6 rounded-xl bg-gray-50 border border-gray-100">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-8 h-8 rounded-full bg-luxury-gold/10 flex items-center justify-center">
                        <FaBed className="w-4 h-4 text-luxury-gold" />
                      </div>
                      <h3 className="font-medium text-gray-900">Check-out</h3>
                    </div>
                    <p className="text-gray-600 text-lg ml-11">11h00</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Colonne droite - Formulaire de réservation */}
            <div className="lg:sticky lg:top-28">
              <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
                <BookingFormWrapper villa={villa} />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
