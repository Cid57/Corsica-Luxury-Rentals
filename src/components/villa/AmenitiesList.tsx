'use client';

import { motion } from 'framer-motion';
import { BsWifi } from 'react-icons/bs';
import { TbPool } from 'react-icons/tb';
import { MdPets, MdOutlineCleaningServices } from 'react-icons/md';

interface AmenitiesListProps {
  amenities: string[];
}

export default function AmenitiesList({ amenities }: AmenitiesListProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
      {amenities.map((amenity, index) => (
        <motion.div
          key={index}
          className="flex items-center gap-2 p-3 bg-gray-50 rounded-xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          {amenity === 'WiFi' && <BsWifi className="w-5 h-5 text-gray-600" />}
          {amenity === 'Piscine' && <TbPool className="w-5 h-5 text-gray-600" />}
          {amenity === 'Animaux acceptés' && <MdPets className="w-5 h-5 text-gray-600" />}
          {amenity === 'Service de ménage' && <MdOutlineCleaningServices className="w-5 h-5 text-gray-600" />}
          <span>{amenity}</span>
        </motion.div>
      ))}
    </div>
  );
}
