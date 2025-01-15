'use client';

import { villas } from '@/data/villas';
import Image from 'next/image';
import Link from 'next/link';
import { FaBed, FaUsers, FaBath } from 'react-icons/fa';

export default function AllVillas() {
  return (
    <div className="min-h-screen bg-gray-50/50">
      <div className="mx-auto max-w-[2000px] px-8 lg:px-16 py-12">
        <div className="flex flex-col items-center mb-12">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-center mb-4">
            Nos villas
          </h1>
          <p className="text-gray-600 text-center mb-8 max-w-2xl">
            Explorez notre collection complète de villas de luxe en Corse. 
            Chaque propriété a été soigneusement sélectionnée pour vous offrir une expérience inoubliable.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
          {villas.map((villa) => (
            <Link href={`/villas/${villa.id}`} key={villa.id} className="group mx-auto w-full max-w-md">
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
                      <FaBed className="text-luxury-gold" />
                      <span>{villa.bedrooms} chambres</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <FaBath className="text-luxury-gold" />
                      <span>{villa.bathrooms} SDB</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <FaUsers className="text-luxury-gold" />
                      <span>Capacité maximale : {villa.maxGuests} personnes</span>
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
          ))}
        </div>
      </div>
    </div>
  );
}
