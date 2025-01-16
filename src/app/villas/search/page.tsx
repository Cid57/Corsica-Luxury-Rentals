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

export default function SearchResults() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [filteredVillas, setFilteredVillas] = useState<Villa[]>([]);

  useEffect(() => {
    const location = searchParams.get('location')?.toLowerCase();
    const guests = Number(searchParams.get('guests')) || 1;
    const startDate = searchParams.get('startDate');
    const endDate = searchParams.get('endDate');

    // Ajout d'un délai artificiel pour éviter le chargement trop rapide
    setTimeout(() => {
      const results = villas.filter(villa => {
        // Vérifie si la location correspond (insensible à la casse)
        const locationMatch = !location || villa.location.toLowerCase().includes(location);
        // Vérifie si la villa peut accueillir le nombre de voyageurs
        const capacityMatch = villa.maxGuests >= guests;
        
        // On peut ajouter d'autres critères ici si nécessaire
        return locationMatch && capacityMatch;
      });

      setFilteredVillas(results);
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

        <SearchBlockResults />

        <div className="mt-12">
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

          {filteredVillas.length === 0 ? (
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 text-center max-w-2xl mx-auto">
              <h2 className="text-2xl font-serif text-white mb-4">
                Aucune villa disponible
              </h2>
              <p className="text-white/80 mb-6">
                Nous n'avons pas trouvé de villa correspondant à vos critères.
                Essayez de modifier vos dates ou votre lieu de séjour.
              </p>
              <button
                onClick={handleBack}
                className="inline-flex items-center gap-2 px-6 py-3 bg-luxury-gold text-white rounded-xl hover:bg-luxury-gold/90 transition-colors"
              >
                Modifier la recherche
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredVillas.map((villa) => (
                <div 
                  key={villa.id}
                  className="group bg-white/10 backdrop-blur-sm rounded-2xl overflow-hidden border border-white/10 hover:border-white/20 transition-all"
                >
                  <div className="relative h-64">
                    <Image
                      src={villa.images[0]}
                      alt={villa.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-2xl font-serif text-white mb-2">{villa.name}</h3>
                    <p className="text-white/80 mb-4 line-clamp-2">{villa.description}</p>
                    <div className="flex items-center gap-6 text-white/60">
                      <div className="flex items-center gap-2">
                        <FaBed />
                        <span>{villa.bedrooms} ch.</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <FaBath />
                        <span>{villa.bathrooms} sdb.</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <FaUsers />
                        <span>{villa.maxGuests} pers.</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between mt-6">
                      <div className="flex items-center text-gray-600 text-sm space-x-4">
                        <div className="flex items-center space-x-1">
                          <FaBed />
                          <span>{villa.bedrooms} ch.</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <FaBath />
                          <span>{villa.bathrooms} sdb.</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <FaUsers />
                          <span>{villa.maxGuests} pers.</span>
                        </div>
                      </div>
                      <Link
                        href={`/villas/${villa.id}/reservation`}
                        className="flex items-center text-luxury-gold hover:text-luxury-gold/80 transition-colors duration-300"
                      >
                        <span className="mr-2">Voir détails</span>
                        <FaChevronRight className="text-sm" />
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
