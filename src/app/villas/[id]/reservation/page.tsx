'use client';

import { villas } from '@/data/villas';
import { notFound } from 'next/navigation';
import { FaBed, FaBath, FaUsers, FaMapMarkerAlt } from 'react-icons/fa';
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
          <div className="grid grid-cols-1 lg:grid-cols-[1.5fr_1fr] gap-8">
            {/* Colonne gauche */}
            <div className="space-y-8">
              {/* Description */}
              <div className="bg-white rounded-xl shadow-sm p-8 border border-gray-100">
                <h2 className="text-2xl font-serif mb-6 text-gray-900">À propos de la villa</h2>
                <p className="text-gray-600 leading-relaxed">{villa.description}</p>
              </div>

              {/* Équipements */}
              <div className="bg-white rounded-xl shadow-sm p-8 border border-gray-100">
                <h2 className="text-2xl font-serif mb-6 text-gray-900">Équipements</h2>
                <AmenitiesList amenities={villa.amenities} />
              </div>
            </div>

            {/* Colonne droite - Formulaire de réservation */}
            <div className="lg:sticky lg:top-28">
              <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                <BookingFormWrapper villa={villa} />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
