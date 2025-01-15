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

  const amenityIcons: { [key: string]: JSX.Element } = {
    'WiFi': <FaWifi className="w-6 h-6" />,
    'Piscine': <FaSwimmingPool className="w-6 h-6" />,
    'Climatisation': <FaSnowflake className="w-6 h-6" />,
    'Parking': <FaParking className="w-6 h-6" />,
    'Animaux acceptés': <FaDog className="w-6 h-6" />,
    'Accès plage': <FaUmbrellaBeach className="w-6 h-6" />,
    'Jardin': <FaTree className="w-6 h-6" />,
    'Vue mer': <FaMountain className="w-6 h-6" />,
    'Vue port': <FaShip className="w-6 h-6" />,
    'Spa': <FaSpa className="w-6 h-6" />,
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-8">
        {/* Bouton retour */}
        <Link href="/villas" className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-6 transition-colors">
          <FaArrowLeft />
          <span>Retour aux villas</span>
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-8">
          {/* Colonne gauche */}
          <div className="space-y-8">
            <div>
              <h1 className="text-4xl font-bold mb-4">{villa.name}</h1>
              <p className="text-xl text-white/80">{villa.location}</p>
            </div>

            <ImageGallery images={villa.images} villaName={villa.name} />

            <div>
              <h2 className="text-2xl font-bold mb-4">Description</h2>
              <p className="text-white/80 leading-relaxed">{villa.description}</p>
            </div>

            {/* Caractéristiques principales */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-white/5 p-4 rounded-xl">
                <div className="flex items-center gap-2 mb-2">
                  <FaBed className="w-5 h-5 text-luxury-gold" />
                  <span className="font-medium">Chambres</span>
                </div>
                <p className="text-2xl font-bold">{villa.bedrooms}</p>
              </div>
              <div className="bg-white/5 p-4 rounded-xl">
                <div className="flex items-center gap-2 mb-2">
                  <FaBath className="w-5 h-5 text-luxury-gold" />
                  <span className="font-medium">Salles de bain</span>
                </div>
                <p className="text-2xl font-bold">{villa.bathrooms}</p>
              </div>
              <div className="bg-white/5 p-4 rounded-xl">
                <div className="flex items-center gap-2 mb-2">
                  <FaUsers className="w-5 h-5 text-luxury-gold" />
                  <span className="font-medium">Capacité</span>
                </div>
                <p className="text-2xl font-bold">{villa.maxGuests} pers.</p>
              </div>
              <div className="bg-white/5 p-4 rounded-xl">
                <div className="flex items-center gap-2 mb-2">
                  <FaDog className="w-5 h-5 text-luxury-gold" />
                  <span className="font-medium">Animaux</span>
                </div>
                <p className="text-2xl font-bold">{villa.amenities.includes('Animaux acceptés') ? 'Oui' : 'Non'}</p>
              </div>
            </div>

            {/* Équipements */}
            <div>
              <h2 className="text-2xl font-bold mb-4">Équipements</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {villa.amenities.map((amenity) => (
                  <motion.div
                    key={amenity}
                    className="flex items-center gap-3 bg-white/5 p-4 rounded-xl"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    {amenityIcons[amenity] || <FaWifi className="w-6 h-6" />}
                    <span>{amenity}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* Colonne droite */}
          <div className="lg:sticky lg:top-8 space-y-6">
            <StayConfigurator basePrice={villa.pricePerNight} />
          </div>
        </div>
      </div>
    </div>
  );
}
