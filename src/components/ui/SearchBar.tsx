'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import HomeCalendar from './HomeCalendar';
import GuestCounter from './GuestCounter';
import { FaUser, FaMapMarkerAlt, FaPaw } from 'react-icons/fa';
import { fr } from 'date-fns/locale';
import { VILLES_CORSE } from '@/data/villes';
import './home-calendar.css';
import { DateRange } from 'react-day-picker';

interface DateRange {
  from: Date | null;
  to: Date | null;
}

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
          </div>

          {/* Colonne droite */}
          <div className="flex flex-col gap-6">
            {/* Voyageurs */}
            <div className="relative">
              <div
                onClick={() => setShowGuestCounter(true)}
                className="flex items-center gap-3 px-6 py-4 bg-white/5 hover:bg-white/10 rounded-2xl cursor-pointer transition-colors"
              >
                <FaUser className="text-white/80 text-xl" />
                <div>
                  <div className="text-white/80 font-medium mb-1">Voyageurs</div>
                  <div className="text-white text-lg">
                    {guests} voyageur{guests > 1 ? 's' : ''}
                  </div>
                </div>
              </div>
              {showGuestCounter && (
                <div className="absolute right-0 mt-2 p-4 bg-gray-900/95 backdrop-blur-sm rounded-xl shadow-xl">
                  <GuestCounter
                    value={guests}
                    onChange={setGuests}
                    min={1}
                    max={20}
                  />
                </div>
              )}
            </div>

            {/* Animaux */}
            <button
              onClick={() => setHasPets(!hasPets)}
              className={`flex items-center gap-2 px-6 py-3 rounded-2xl transition-all ${
                hasPets 
                  ? 'bg-luxury-gold text-white' 
                  : 'bg-white/5 hover:bg-white/10 text-white'
              }`}
            >
              <FaPaw className={`text-lg ${hasPets ? 'text-white' : 'text-white/80'}`} />
              <span className="font-medium">
                {hasPets ? 'Avec animaux' : 'Avez-vous des animaux ?'}
              </span>
            </button>

            {/* Bouton de recherche */}
            <button
              onClick={handleSearch}
              className="w-full py-4 bg-luxury-gold text-white rounded-2xl hover:bg-luxury-gold/90 transition-colors font-medium text-lg"
            >
              Rechercher
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
