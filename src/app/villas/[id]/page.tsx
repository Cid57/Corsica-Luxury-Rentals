import { villas } from '@/data/villas';
import { 
  FaBed, 
  FaUsers, 
  FaBath
} from 'react-icons/fa';
import { notFound } from 'next/navigation';
import ImageGallery from '@/components/villa/ImageGallery';
import StayConfigurator from '@/components/villa/StayConfigurator';
import VillaAmenities from '@/components/villa/VillaAmenities';
import Link from 'next/link';
import { FaArrowLeft } from 'react-icons/fa';
import { Villa } from '@/types/villa';

export async function generateStaticParams() {
  return villas.map((villa) => ({
    id: villa.id,
  }));
}

interface PageProps {
  params: {
    id: string;
  };
}

export default function VillaDetail({ params }: PageProps) {
  const villa = villas.find((v) => v.id === params.id) as Villa;

  if (!villa) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Bouton retour */}
        <Link href="/villas" className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6 transition-colors">
          <FaArrowLeft />
          <span>Retour aux villas</span>
        </Link>

        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">{villa.name}</h1>
          <p className="text-xl text-gray-600">{villa.location}</p>
        </div>

        <ImageGallery images={villa.images} villaName={villa.name} />

        <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-8 mt-8">
          <div className="space-y-8">
            {/* Caractéristiques principales */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-2xl font-bold mb-6">Caractéristiques</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div className="flex items-center gap-3">
                  <FaBed className="w-6 h-6 text-luxury-gold" />
                  <div>
                    <p className="font-medium">{villa.bedrooms}</p>
                    <p className="text-sm text-gray-600">Chambres</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <FaBath className="w-6 h-6 text-luxury-gold" />
                  <div>
                    <p className="font-medium">{villa.bathrooms}</p>
                    <p className="text-sm text-gray-600">Salles de bain</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <FaUsers className="w-6 h-6 text-luxury-gold" />
                  <div>
                    <p className="font-medium">{villa.maxGuests}</p>
                    <p className="text-sm text-gray-600">Voyageurs</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Équipements */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-2xl font-bold mb-6">Équipements</h2>
              <VillaAmenities amenities={villa.amenities} />
            </div>

            {/* Description */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-2xl font-bold mb-4">Description</h2>
              <p className="text-gray-600 leading-relaxed whitespace-pre-line">
                {villa.description}
              </p>
            </div>
          </div>

          {/* Configurateur de séjour */}
          <div className="lg:sticky lg:top-8">
            <StayConfigurator basePrice={villa.pricePerNight} />
          </div>
        </div>
      </div>
    </div>
  );
}
