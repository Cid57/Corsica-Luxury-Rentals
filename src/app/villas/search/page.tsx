'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { villas } from '@/data/villas';
import { Villa } from '@/types/villa';
import Image from 'next/image';
import Link from 'next/link';
import { FaBed, FaUsers, FaBath, FaArrowLeft, FaChevronRight } from 'react-icons/fa';
import SearchBlockResults from '@/components/ui/SearchBlockResults';
import { getImagePath } from '@/utils/imagePath';

export default function SearchResults() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [filteredVillas, setFilteredVillas] = useState<Villa[]>([]);

  useEffect(() => {
    const location = searchParams.get('location')?.toLowerCase() || '';
    const guests = parseInt(searchParams.get('guests') || '0');
    const startDate = searchParams.get('startDate');
    const endDate = searchParams.get('endDate');

    const filteredVillas = villas.filter(villa => {
      const matchesLocation = location === '' || villa.location.toLowerCase().includes(location);
      const matchesGuests = guests === 0 || villa.maxGuests >= guests;
      return matchesLocation && matchesGuests;
    });

    setTimeout(() => {
      setFilteredVillas(filteredVillas);
      setIsLoading(false);
    }, 1000);
  }, [searchParams]);

  const formatDate = (dateStr: string | null) => {
    if (!dateStr) return '';
    try {
      return format(new Date(dateStr), 'd MMMM yyyy', { locale: fr });
    } catch (error) {
      console.error('Error formatting date:', error);
      return '';
    }
  };

  const handleBack = () => {
    router.back();
  };

  const handleVillaClick = (villaId: string) => {
    router.push(`/villas/${villaId}/reservation/`);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 pt-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
          <div className="animate-pulse space-y-8">
            <div className="h-12 bg-white/10 rounded-xl w-1/3"></div>
            <div className="h-6 bg-white/10 rounded-xl w-1/4"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-white/10 h-[400px] rounded-2xl"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 pt-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        <button 
          onClick={handleBack}
          className="text-white/80 hover:text-white mb-6 inline-flex items-center gap-2 transition-colors"
        >
          <FaArrowLeft />
          Retour
        </button>

        <div className="mb-12">
          <h1 className="text-4xl font-serif text-white mb-4">
            Villas disponibles à {searchParams.get('location')}
          </h1>
          
          <div className="flex items-center text-white/80 mb-8 space-x-2">
            <span>{formatDate(searchParams.get('startDate'))}</span>
            <span>→</span>
            <span>{formatDate(searchParams.get('endDate'))}</span>
            <span className="mx-2">•</span>
            <FaUsers className="mr-1" />
            <span>
              {searchParams.get('guests')} voyageur{Number(searchParams.get('guests')) > 1 ? 's' : ''}
            </span>
          </div>
        </div>

        {filteredVillas.length === 0 ? (
          <div className="text-center py-12">
            <h2 className="text-2xl text-white mb-4">Aucune villa ne correspond à vos critères</h2>
            <p className="text-white/80">Essayez de modifier vos critères de recherche</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredVillas.map((villa) => (
              <button 
                key={villa.id}
                onClick={() => handleVillaClick(villa.id)}
                className="group bg-white/10 backdrop-blur-sm rounded-2xl overflow-hidden hover:bg-white/20 transition-colors text-left"
              >
                <div className="relative h-64">
                  <Image
                    src={getImagePath(villa.images[0])}
                    alt={villa.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-serif text-white mb-2 group-hover:text-luxury-gold transition-colors">
                    {villa.name}
                  </h3>
                  <p className="text-white/60 mb-4">{villa.location}</p>
                  <div className="flex items-center gap-4 text-white/80">
                    <div className="flex items-center gap-1">
                      <FaBed />
                      <span>{villa.bedrooms}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <FaBath />
                      <span>{villa.bathrooms}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <FaUsers />
                      <span>{villa.maxGuests}</span>
                    </div>
                  </div>
                  <div className="mt-4 flex items-center justify-between">
                    <div>
                      <span className="text-2xl font-serif text-white">{villa.pricePerNight}€</span>
                      <span className="text-white/60 text-sm">/nuit</span>
                    </div>
                    <FaChevronRight className="text-luxury-gold" />
                  </div>
                </div>
              </button>
            ))}
          </div>
        )}

        <div className="mt-16">
          <SearchBlockResults />
        </div>
      </div>
    </div>
  );
}
