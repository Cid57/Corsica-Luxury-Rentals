'use client';

import { motion } from 'framer-motion';
import { 
  FaWifi, 
  FaSwimmingPool, 
  FaParking, 
  FaDog,
  FaSnowflake,
  FaUmbrellaBeach,
  FaTree,
  FaMountain,
  FaShip,
  FaSpa
} from 'react-icons/fa';

interface VillaAmenitiesProps {
  amenities: string[];
}

export default function VillaAmenities({ amenities }: VillaAmenitiesProps) {
  const amenityIcons: { [key: string]: JSX.Element } = {
    'WiFi': <FaWifi className="w-6 h-6" />,
    'Piscine': <FaSwimmingPool className="w-6 h-6" />,
    'Climatisation': <FaSnowflake className="w-6 h-6" />,
    'Parking': <FaParking className="w-6 h-6" />,
    'Animaux acceptés': <FaDog className="w-6 h-6" />,
    'Accès plage': <FaUmbrellaBeach className="w-6 h-6" />,
    'Jardin': <FaTree className="w-6 h-6" />,
    'Vue montagne': <FaMountain className="w-6 h-6" />,
    'Vue mer': <FaShip className="w-6 h-6" />,
    'Spa': <FaSpa className="w-6 h-6" />
  };

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {amenities.map((amenity, index) => (
        <motion.div
          key={index}
          className="flex items-center gap-3 p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <div className="text-luxury-gold">
            {amenityIcons[amenity]}
          </div>
          <span className="text-gray-700">{amenity}</span>
        </motion.div>
      ))}
    </div>
  );
}
