import { villas } from '@/data/villas';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { FaBed, FaBath, FaUsers } from 'react-icons/fa';
import { BsWifi, BsHouseDoor } from 'react-icons/bs';
import ReservationNavigation from '@/components/villa/ReservationNavigation';
import BookingFormWrapper from '@/components/villa/BookingFormWrapper';
import AmenitiesList from '@/components/villa/AmenitiesList';
import { getImagePath } from '@/utils/getImagePath';

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

  const defaultImage = getImagePath('/images/default-villa.jpg'); 
  const villaImage = villa.images && villa.images.length > 0 ? villa.images[0] : defaultImage;

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <ReservationNavigation />

      {/* Hero Section réduite */}
      <div className="relative h-[35vh] w-full">
        <Image
          src={villaImage}
          alt={villa.name}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/30 to-black/60" />
        <div className="absolute bottom-0 left-0 right-0 p-6">
          <div className="container mx-auto">
            <h1 className="text-3xl md:text-4xl font-serif mb-2 text-white">{villa.name}</h1>
            <p className="text-lg opacity-90 flex items-center text-white">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-luxury-gold mr-2"></span>
              {villa.location}
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-[1.5fr_1fr] gap-6">
          {/* Colonne gauche */}
          <div className="space-y-6">
            {/* Informations principales */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h2 className="text-xl font-serif mb-4">Informations sur la villa</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="flex items-center gap-3 p-3 rounded-lg bg-gray-50">
                  <FaBed className="w-5 h-5 text-luxury-gold" />
                  <span className="text-sm text-gray-600">{villa.bedrooms} ch.</span>
                </div>
                <div className="flex items-center gap-3 p-3 rounded-lg bg-gray-50">
                  <FaBath className="w-5 h-5 text-luxury-gold" />
                  <span className="text-sm text-gray-600">{villa.bathrooms} sdb.</span>
                </div>
                <div className="flex items-center gap-3 p-3 rounded-lg bg-gray-50">
                  <FaUsers className="w-5 h-5 text-luxury-gold" />
                  <span className="text-sm text-gray-600">{villa.maxGuests} pers.</span>
                </div>
                <div className="flex items-center gap-3 p-3 rounded-lg bg-gray-50">
                  <BsHouseDoor className="w-5 h-5 text-luxury-gold" />
                  <span className="text-sm text-gray-600">{villa.surface}m²</span>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h2 className="text-xl font-serif mb-4">Description</h2>
              <p className="text-sm text-gray-600 leading-relaxed">{villa.description}</p>
            </div>

            {/* Équipements */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h2 className="text-xl font-serif mb-4">Équipements</h2>
              <AmenitiesList amenities={villa.amenities} />
            </div>
          </div>

          {/* Colonne droite - Formulaire de réservation */}
          <div className="lg:sticky lg:top-4">
            <BookingFormWrapper villa={villa} />
          </div>
        </div>
      </div>
    </div>
  );
}
