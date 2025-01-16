'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import HomeCalendar from './HomeCalendar';
import GuestCounter from './GuestCounter';
import { FaUser, FaMapMarkerAlt, FaPaw, FaSearch, FaCalendarAlt } from 'react-icons/fa';
import { fr } from 'date-fns/locale';
import { VILLES_CORSE } from '@/data/villes';
import styles from './SearchBar.module.css';
import './home-calendar.css';
import { format } from 'date-fns';
import { DateRange } from 'react-day-picker';

const LocationDropdown = ({ onSelect, searchTerm }: { onSelect: (ville: typeof VILLES_CORSE[0]) => void, searchTerm: string }) => {
  const filteredVilles = VILLES_CORSE.filter(ville => 
    ville.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
    ville.region.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className={`absolute top-full left-0 mt-2 w-full max-h-[300px] overflow-y-auto bg-[#2B4562] border border-luxury-gold/20 rounded-xl shadow-lg z-50 ${styles.customScrollbar}`}>
      <div className="p-2">
        {filteredVilles.length > 0 ? (
          filteredVilles.map((ville) => (
            <button
              key={ville.nom}
              onClick={() => onSelect(ville)}
              className="w-full text-left px-4 py-3 hover:bg-white/5 text-white rounded-lg transition-colors duration-300 flex items-center space-x-3 backdrop-blur-sm"
            >
              <div>
                <div className="font-medium">{ville.nom}</div>
                <div className="text-sm text-white/60">{ville.region}</div>
              </div>
            </button>
          ))
        ) : (
          <div className="text-white/60 text-center py-4">
            Aucune ville trouvée
          </div>
        )}
      </div>
    </div>
  );
}

export default function SearchBar() {
  const [location, setLocation] = useState('');
  const [showLocationDropdown, setShowLocationDropdown] = useState(false);
  const [dates, setDates] = useState<{ from?: Date; to?: Date }>();
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

  const formatDateRange = () => {
    if (dates?.from && dates?.to) {
      return `${format(dates.from, 'dd/MM/yyyy')} - ${format(dates.to, 'dd/MM/yyyy')}`;
    }
    return 'Sélectionnez vos dates';
  };

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
      <div ref={searchRef} className="relative flex flex-col gap-6">
        <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-8">
          {/* Colonne gauche */}
          <div className="flex flex-col gap-6">
            {/* Destination */}
            <div className="relative">
              <button 
                onClick={() => {
                  const inputElement = document.getElementById('location-input') as HTMLInputElement;
                  if (inputElement) {
                    inputElement.focus();
                  }
                  setShowLocationDropdown(true);
                }}
                className="w-full flex items-center gap-4 px-6 py-5 bg-black/20 hover:bg-black/30 rounded-2xl transition-all duration-300 border border-white/20"
              >
                <FaMapMarkerAlt className="text-luxury-gold text-xl flex-shrink-0" />
                <div className="flex-grow text-left">
                  <div className="text-white text-xs uppercase tracking-wide mb-1">DESTINATION</div>
                  <input
                    id="location-input"
                    type="text"
                    value={location}
                    onChange={(e) => {
                      setLocation(e.target.value);
                      setShowLocationDropdown(true);
                    }}
                    onFocus={() => setShowLocationDropdown(true)}
                    placeholder="Où souhaitez-vous aller ?"
                    className="w-full bg-transparent text-white text-sm focus:outline-none placeholder-white/80 cursor-text"
                  />
                </div>
              </button>
              {showLocationDropdown && <LocationDropdown 
                searchTerm={location}
                onSelect={(ville) => {
                  setLocation(ville.nom);
                  setShowLocationDropdown(false);
                }} 
              />}
            </div>

            {/* Dates */}
            <div className="relative">
              <div className="text-white text-xs uppercase tracking-wide mb-3">
                <div className="flex items-center space-x-2 px-6">
                  <FaCalendarAlt className="text-luxury-gold text-sm" />
                  <span>Dates</span>
                </div>
              </div>
              <HomeCalendar
                selected={dates}
                onSelect={setDates}
              />
            </div>
          </div>

          {/* Colonne droite */}
          <div className="flex flex-col justify-between gap-6">
            {/* Voyageurs */}
            <div className="relative">
              <div
                onClick={() => setShowGuestCounter(true)}
                className="flex items-center gap-4 px-6 py-5 bg-white/5 hover:bg-white/10 rounded-2xl cursor-pointer transition-all duration-300 border border-white/10"
              >
                <FaUser className="text-luxury-gold text-xl" />
                <div>
                  <div className="text-white text-xs uppercase tracking-wide mb-1">VOYAGEURS</div>
                  <div className="text-white text-sm">
                    {guests} voyageur{guests > 1 ? 's' : ''}
                  </div>
                </div>
              </div>
              {showGuestCounter && (
                <div className="absolute right-0 mt-2 p-4 bg-gray-900/95 backdrop-blur-md rounded-xl border border-white/10 shadow-2xl">
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
            <div
              onClick={() => setHasPets(!hasPets)}
              className={`flex items-center gap-4 px-6 py-5 ${hasPets ? 'bg-black/30' : 'bg-black/20'} hover:bg-black/30 rounded-2xl cursor-pointer transition-all duration-300 border ${hasPets ? 'border-white/40' : 'border-white/20'}`}
            >
              <FaPaw className="text-luxury-gold text-xl" />
              <div>
                <div className="text-white text-xs uppercase tracking-wide mb-1">ANIMAUX</div>
                <div className="text-white text-sm">
                  {hasPets ? 'Avec animaux' : 'Sans animaux'}
                </div>
              </div>
            </div>

            {/* Bouton de recherche */}
            <button
              onClick={handleSearch}
              className="w-full md:w-auto px-8 py-4 bg-white text-[#2B4562] hover:bg-white/90 rounded-2xl font-medium flex items-center justify-center gap-2 transition-all duration-300"
            >
              <FaSearch className="text-lg" />
              <span>Rechercher</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
