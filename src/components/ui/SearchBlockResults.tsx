'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { FaMapMarkerAlt, FaCalendarAlt, FaUser, FaPaw, FaSearch } from 'react-icons/fa';
import { VILLES_CORSE } from '@/data/villes';
import { DateRange as ReactDateRange } from 'react-day-picker';
import HomeCalendar from './HomeCalendar';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

interface CustomDateRange {
  from?: Date;
  to?: Date;
}

export default function SearchBlockResults() {
  const router = useRouter();
  const [showLocationDropdown, setShowLocationDropdown] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);
  const [showGuestCounter, setShowGuestCounter] = useState(false);
  const [location, setLocation] = useState('');
  const [dateRange, setDateRange] = useState<CustomDateRange | undefined>();
  const [guests, setGuests] = useState(1);
  const [hasPets, setHasPets] = useState(false);

  const handleSearch = () => {
    const searchParams = new URLSearchParams();
    if (location) searchParams.set('location', location);
    if (dateRange?.from) searchParams.set('startDate', dateRange.from.toISOString());
    if (dateRange?.to) searchParams.set('endDate', dateRange.to.toISOString());
    searchParams.set('guests', guests.toString());
    if (hasPets) searchParams.set('pets', 'true');

    router.push(`/villas/search?${searchParams.toString()}`);
  };

  const formatDateRange = () => {
    if (!dateRange?.from) return 'Quand partez-vous ?';
    if (!dateRange.to) return format(dateRange.from, 'd MMMM yyyy', { locale: fr });
    return `${format(dateRange.from, 'd MMM', { locale: fr })} - ${format(dateRange.to, 'd MMM yyyy', { locale: fr })}`;
  };

  return (
    <div className="relative z-20 max-w-3xl mx-auto">
      <div className="bg-black/60 backdrop-blur-xl shadow-2xl rounded-2xl border border-white/20">
        <div className="p-6">
          <h2 className="text-xl font-serif text-white mb-4">Trouvez votre villa</h2>
          <div className="flex flex-col gap-4">
            {/* Location input */}
            <div className="relative">
              <div 
                onClick={() => setShowLocationDropdown(!showLocationDropdown)}
                className="flex items-center gap-3 bg-white/10 border border-white/20 rounded-xl px-4 py-3 focus-within:ring-2 focus-within:ring-luxury-gold/50 transition-all hover:bg-white/20 cursor-pointer"
              >
                <FaMapMarkerAlt className="text-white/60 text-lg flex-shrink-0" />
                <div className="flex-1">
                  <div className="text-white/60 text-sm font-medium">Destination</div>
                  <div className="text-white">
                    {location || 'Où souhaitez-vous aller ?'}
                  </div>
                </div>
              </div>
              {showLocationDropdown && (
                <div className="absolute z-20 w-full mt-2 bg-gray-900/95 backdrop-blur-sm border border-white/10 rounded-xl shadow-xl max-h-[320px] overflow-y-auto">
                  {VILLES_CORSE.map((ville) => (
                    <button
                      key={ville.nom}
                      className="w-full px-4 py-3 text-left hover:bg-white/5 text-white/90 transition-colors flex flex-col gap-0.5"
                      onClick={() => {
                        setLocation(ville.nom);
                        setShowLocationDropdown(false);
                      }}
                    >
                      <div className="font-medium">{ville.nom}</div>
                      <div className="text-sm text-white/60">{ville.region}</div>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Calendar */}
            <div className="relative">
              <button
                onClick={() => setShowCalendar(!showCalendar)}
                className="w-full flex items-center gap-3 bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-left focus:outline-none focus:ring-2 focus:ring-luxury-gold/50 transition-all hover:bg-white/20"
              >
                <FaCalendarAlt className="text-white/60 text-lg flex-shrink-0" />
                <div className="flex-1">
                  <div className="text-white/60 text-sm font-medium">Dates</div>
                  <div className="text-white">
                    {dateRange?.from
                      ? `${dateRange.from.toLocaleDateString()} - ${
                          dateRange.to ? dateRange.to.toLocaleDateString() : 'Choisir la date de départ'
                        }`
                      : 'Quand partez-vous ?'}
                  </div>
                </div>
              </button>
              {showCalendar && (
                <div className="absolute z-20 w-full mt-2">
                  <HomeCalendar
                    selected={dateRange}
                    onSelect={(range) => {
                      setDateRange(range);
                      setShowCalendar(false);
                    }}
                  />
                </div>
              )}
            </div>

            {/* Bottom row */}
            <div className="flex gap-3">
              {/* Guests counter */}
              <div className="flex-1 relative min-w-[140px]">
                <button
                  onClick={() => setShowGuestCounter(!showGuestCounter)}
                  className="w-full flex items-center gap-3 bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-left focus:outline-none focus:ring-2 focus:ring-luxury-gold/50 transition-all hover:bg-white/20"
                >
                  <FaUser className="text-white/60 text-lg flex-shrink-0" />
                  <div className="flex-1">
                    <div className="text-white/60 text-sm font-medium">Voyageurs</div>
                    <div className="text-white">
                      {guests} voyageur{guests > 1 ? 's' : ''}
                    </div>
                  </div>
                </button>
                {showGuestCounter && (
                  <div className="absolute z-20 w-full mt-2 bg-gray-900/95 backdrop-blur-sm border border-white/10 rounded-xl shadow-xl p-4">
                    <div className="flex items-center justify-between">
                      <span className="text-white">Voyageurs</span>
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => setGuests(Math.max(1, guests - 1))}
                          className="w-8 h-8 flex items-center justify-center rounded-full border border-white/20 text-white hover:bg-white/10 transition-colors"
                        >
                          -
                        </button>
                        <span className="text-white w-4 text-center">{guests}</span>
                        <button
                          onClick={() => setGuests(Math.min(20, guests + 1))}
                          className="w-8 h-8 flex items-center justify-center rounded-full border border-white/20 text-white hover:bg-white/10 transition-colors"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Pets toggle */}
              <button
                onClick={() => setHasPets(!hasPets)}
                className={`flex items-center gap-2 px-4 py-3 border rounded-xl transition-all ${
                  hasPets
                    ? 'bg-luxury-gold text-white border-luxury-gold hover:bg-luxury-gold/90'
                    : 'bg-white/10 text-white border-white/20 hover:bg-white/20'
                }`}
              >
                <FaPaw className="text-lg" />
                <span className="whitespace-nowrap text-sm">
                  {hasPets ? 'Avec animaux' : 'Animaux ?'}
                </span>
              </button>

              {/* Search button */}
              <button
                onClick={handleSearch}
                className="px-6 py-3 bg-luxury-gold text-white rounded-xl hover:bg-luxury-gold/90 transition-colors"
              >
                <FaSearch className="text-lg" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
