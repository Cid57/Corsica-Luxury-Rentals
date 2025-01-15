'use client';

import { Villa } from '@/types/villa';
import Image from 'next/image';
import Link from 'next/link';
import { FaBed, FaBath, FaUsers } from 'react-icons/fa';

interface VillaCardProps {
  villa: Villa;
}

export default function VillaCard({ villa }: VillaCardProps) {
  return (
    <Link href={`/villas/${villa.id}`} className="group mx-auto w-full max-w-md">
      <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300">
        <div className="relative h-72">
          <div className="absolute top-4 right-4 z-10">
            <div className="bg-luxury-gold text-white px-4 py-1 rounded-full text-sm font-medium">
              {villa.pricePerNight}€ /nuit
            </div>
          </div>
          <Image
            src={villa.images[0]}
            alt={villa.name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
        
        <div className="p-6">
          <h3 className="text-xl font-serif font-semibold text-gray-900 mb-2">
            {villa.name}
          </h3>
          <p className="text-gray-600 text-sm mb-4">{villa.location}</p>
          
          <div className="flex items-center space-x-6 text-gray-600 text-sm">
            <div className="flex items-center space-x-2">
              <FaBed />
              <span>{villa.bedrooms}</span>
            </div>
            <div className="flex items-center space-x-2">
              <FaBath />
              <span>{villa.bathrooms}</span>
            </div>
            <div className="flex items-center space-x-2">
              <FaUsers />
              <span>{villa.maxGuests}</span>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-gray-100">
            <button className="w-full px-4 py-3 bg-gray-900 text-white rounded-full text-sm font-medium hover:bg-gray-800 transition-colors">
              Voir détails
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
}
