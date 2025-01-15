'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import HomeCalendar from './HomeCalendar';
import GuestCounter from './GuestCounter';
import { FaUser, FaMapMarkerAlt, FaPaw, FaSearch } from 'react-icons/fa';
import { fr } from 'date-fns/locale';
import { VILLES_CORSE } from '@/data/villes';
import './home-calendar.css';
import { DateRange } from 'react-day-picker';

const LocationDropdown = ({ onSelect }: { onSelect: (ville: typeof VILLES_CORSE[0]) => void }) => {
  return (
    <div className="absolute z-10 w-full mt-2 bg-gray-900/95 backdrop-blur-sm rounded-2xl shadow-xl max-h-[320px] overflow-y-auto">
      {VILLES_CORSE.map((ville) => (
        <button
          key={ville.name}
          className="w-full px-6 py-3 text-left hover:bg-white/5 text-white/90 transition-colors"
          onClick={() => onSelect(ville)}
        >
          <div className="font-medium">{ville.name}</div>
          <div className="text-sm text-white/50">{ville.description}</div>
        </button>
      ))}
    </div>
  );
}

export default function SearchBar() {
  const [location, setLocation] = useState('');
  const [showLocationDropdown, setShowLocationDropdown] = useState(false);
  const [dates, setDates] = useState<DateRange | undefined>();
  const [guests, setGuests] = useState(1);
  const [showGuestCounter, setShowGuestCounter] = useState(false);
  const [hasPets, setHasPets] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowLocationDropdown(false);
        setShowGuestCounter(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSearch = () => {
    const searchParams = new URLSearchParams();
    if (location) searchParams.set('location', location);
    if (dates?.from) searchParams.set('startDate', dates.from.toISOString());
    if (dates?.to) searchParams.set('endDate', dates.to.toISOString());
    searchParams.set('guests', guests.toString());
    if (hasPets) searchParams.set('pets', 'true');

    router.push(`/villas/search?${searchParams.toString()}`);
  };

  return (
    <div className="w-full max-w-[1200px] mx-auto">
      <div ref={searchRef} className="relative flex flex-col gap-4 p-8 bg-white/10 backdrop-blur-sm rounded-[2rem]">
        <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-6">
          {/* Colonne gauche */}
          <div className="flex flex-col gap-6">
            {/* Destination */}
            <div className="relative">
              <div
                onClick={() => setShowLocationDropdown(true)}
                className="flex items-center gap-3 px-6 py-4 bg-white/5 hover:bg-white/10 rounded-2xl cursor-pointer transition-colors"
              >
                <FaMapMarkerAlt className="text-white/80 text-xl" />
                <div>
                  <div className="text-white/80 font-medium mb-1">Destination</div>
                  <div className="text-white text-lg">
                    {location || 'Où souhaitez-vous aller ?'}
                  </div>
                </div>
              </div>
              {showLocationDropdown && <LocationDropdown onSelect={(ville) => {
                setLocation(ville.name);
                setShowLocationDropdown(false);
              }} />}
            </div>

            {/* Dates */}
            <div className="relative bg-white/5 rounded-2xl p-4">
              <HomeCalendar
                selected={dates}
                onSelect={setDates}
              />
            </div>

            {/* Bottom row */}
            <div className="flex gap-4">
              {/* Guests counter */}
              <div className="flex-1 relative">
                <button
                  onClick={() => setShowGuestCounter(!showGuestCounter)}
                  className="w-full flex items-center gap-3 px-6 py-4 bg-white/5 hover:bg-white/10 rounded-2xl cursor-pointer transition-colors"
                >
                  <FaUser className="text-white/80 text-xl" />
                  <div>
                    <div className="text-white/80 font-medium mb-1">Voyageurs</div>
                    <div className="text-white text-lg">
                      {guests} {guests > 1 ? 'personnes' : 'personne'}
                    </div>
                  </div>
                </button>
                {showGuestCounter && (
                  <div className="absolute z-20 w-full mt-2 bg-gray-900/95 backdrop-blur-sm border border-white/10 rounded-xl shadow-xl p-4">
                    <GuestCounter
                      value={guests}
                      onChange={(value) => {
                        setGuests(value);
                        setShowGuestCounter(false);
                      }}
                      min={1}
                      max={20}
                    />
                  </div>
                )}
              </div>

              {/* Pets toggle */}
              <button
                onClick={() => setHasPets(!hasPets)}
                className={`flex items-center gap-3 px-6 py-4 rounded-2xl transition-all ${
                  hasPets
                    ? 'bg-luxury-gold text-white hover:bg-luxury-gold/90'
                    : 'bg-white/5 text-white hover:bg-white/10'
                }`}
              >
                <FaPaw className={`text-xl ${hasPets ? 'text-white' : 'text-white/80'}`} />
                <div>
                  <div className={`font-medium mb-1 ${hasPets ? 'text-white' : 'text-white/80'}`}>
                    Animaux
                  </div>
                  <div className="text-lg">
                    {hasPets ? 'Acceptés' : 'Non acceptés'}
                  </div>
                </div>
              </button>
            </div>
          </div>

          {/* Colonne droite */}
          <div className="flex items-end">
            <button
              onClick={handleSearch}
              className="w-full flex items-center justify-center gap-2 px-8 py-4 bg-luxury-gold hover:bg-luxury-gold/90 text-white rounded-2xl transition-colors text-lg"
            >
              <FaSearch />
              <span>Rechercher</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
