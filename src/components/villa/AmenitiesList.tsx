'use client';

import { motion } from 'framer-motion';
import { BsWifi } from 'react-icons/bs';
import { TbPool } from 'react-icons/tb';
import { MdPets, MdOutlineCleaningServices } from 'react-icons/md';

interface AmenitiesListProps {
  amenities: string[];
}

export default function AmenitiesList({ amenities }: { amenities: string[] }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
      {amenities.map((amenity, index) => (
        <div 
          key={index}
          className="flex items-center gap-2 p-2 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors duration-300"
        >
          {amenity === 'WiFi' && <BsWifi className="w-5 h-5 text-gray-600" />}
          {amenity === 'Piscine' && <TbPool className="w-5 h-5 text-gray-600" />}
          {amenity === 'Animaux acceptés' && <MdPets className="w-5 h-5 text-gray-600" />}
          {amenity === 'Service de ménage' && <MdOutlineCleaningServices className="w-5 h-5 text-gray-600" />}
          {!(amenity === 'WiFi' || amenity === 'Piscine' || amenity === 'Animaux acceptés' || amenity === 'Service de ménage') && <span className="w-1.5 h-1.5 rounded-full bg-luxury-gold"></span>}
          <span className="text-xs text-gray-600">{amenity}</span>
        </div>
      ))}
    </div>
  );
}
