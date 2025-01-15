import { villas } from '@/data/villas';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { FaBed, FaBath, FaUsers } from 'react-icons/fa';
import { BsWifi, BsHouseDoor } from 'react-icons/bs';
import ReservationNavigation from '@/components/villa/ReservationNavigation';
import BookingFormWrapper from '@/components/villa/BookingFormWrapper';
import AmenitiesList from '@/components/villa/AmenitiesList';

interface PageProps {
  params: {
    id: string;
  };
}

export async function generateStaticParams() {
  return villas.map((villa) => ({
    id: villa.id,
  }));
}

export default function Page({ params }: PageProps) {
  const villa = villas.find(v => v.id === params.id);

  if (!villa) {
    notFound();
  }

  const defaultImage = '/Corsica-Luxury-Rentals/images/default-villa.jpg'; 
  const villaImage = villa.images && villa.images.length > 0 ? villa.images[0] : defaultImage;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Bouton retour */}
      <ReservationNavigation />

      {/* Hero Section avec image et titre */}
      <div className="relative h-[40vh] w-full">
        <Image
          src={villaImage}
          alt={villa.name}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" />
        <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
          <h1 className="text-4xl font-bold mb-2">{villa.name}</h1>
          <p className="text-xl opacity-90">{villa.location}</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-8">
          {/* Colonne gauche */}
          <div className="space-y-8">
            {/* Informations principales */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-2xl font-bold mb-4">Informations sur la villa</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="flex items-center gap-2">
                  <FaBed className="w-5 h-5 text-gray-600" />
                  <span>{villa.bedrooms} chambres</span>
                </div>
                <div className="flex items-center gap-2">
                  <FaBath className="w-5 h-5 text-gray-600" />
                  <span>{villa.bathrooms} SDB</span>
                </div>
                <div className="flex items-center gap-2">
                  <FaUsers className="w-5 h-5 text-gray-600" />
                  <span>{villa.maxGuests} pers. max</span>
                </div>
                <div className="flex items-center gap-2">
                  <BsHouseDoor className="w-5 h-5 text-gray-600" />
                  <span>{villa.surface} m²</span>
                </div>
              </div>
            </div>

            {/* Équipements */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-2xl font-bold mb-4">Équipements</h2>
              <AmenitiesList amenities={villa.amenities} />
            </div>

            {/* Description */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-2xl font-bold mb-4">Description</h2>
              <p className="text-gray-600 leading-relaxed">{villa.description}</p>
            </div>
          </div>

          {/* Colonne droite - Formulaire de réservation */}
          <div className="lg:sticky lg:top-8">
            <BookingFormWrapper villa={villa} />
          </div>
        </div>
      </div>
    </div>
  );
}
