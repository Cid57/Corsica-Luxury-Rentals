'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Calendar from './calendar';
import GuestCounter from './GuestCounter';
import PetSelector from './PetSelector';
import { format, differenceInDays } from 'date-fns';
import { fr } from 'date-fns/locale';
import { FaSearch } from 'react-icons/fa';

const VILLES_CORSE = [
  {
    name: 'Porto-Vecchio',
    region: 'Corse-du-Sud',
    description: 'Station balnéaire prisée'
  },
  {
    name: 'Bonifacio',
    region: 'Corse-du-Sud',
    description: 'Cité médiévale perchée'
  },
  {
    name: 'Ajaccio',
    region: 'Corse-du-Sud',
    description: 'Capitale de la Corse'
  },
  {
    name: 'Calvi',
    region: 'Haute-Corse',
    description: 'Citadelle historique'
  },
  {
    name: "L'Île-Rousse",
    region: 'Haute-Corse',
    description: 'Port pittoresque'
  },
  {
    name: 'Bastia',
    region: 'Haute-Corse',
    description: 'Port principal'
  },
  {
    name: 'Saint-Florent',
    region: 'Haute-Corse',
    description: 'Village de charme'
  },
  {
    name: 'Propriano',
    region: 'Corse-du-Sud',
    description: 'Station balnéaire'
  }
];

export default function SearchBlock() {
  const router = useRouter();
  const [location, setLocation] = useState('');
  const [showLocationDropdown, setShowLocationDropdown] = useState(false);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [guests, setGuests] = useState(1);
  const [hasPets, setHasPets] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);
  const [showGuestCounter, setShowGuestCounter] = useState(false);
  const [filteredLocations, setFilteredLocations] = useState(VILLES_CORSE);

  const handleSearch = () => {
    const searchParams = new URLSearchParams();
    if (location) searchParams.set('location', location);
    if (startDate) searchParams.set('startDate', startDate.toISOString());
    if (endDate) searchParams.set('endDate', endDate.toISOString());
    searchParams.set('guests', guests.toString());
    if (hasPets) searchParams.set('pets', 'true');

    router.push(`/villas/search?${searchParams.toString()}`);
  };

  const handleDateChange = (dates: [Date | null, Date | null]) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
    if (start && end) {
      setShowCalendar(false);
    }
  };

  const formatDateRange = () => {
    if (!startDate) return 'Sélectionnez vos dates';
    if (!endDate) return format(startDate, 'dd MMM yyyy', { locale: fr });
    
    const nights = differenceInDays(endDate, startDate);
    return (
      <>
        {format(startDate, 'dd MMM', { locale: fr })} - {format(endDate, 'dd MMM yyyy', { locale: fr })}
        <span className="block text-sm text-white/70 mt-1">
          {nights} {nights > 1 ? 'nuits' : 'nuit'}
        </span>
      </>
    );
  };

  return (
    <div className="relative z-20">
      <div className="bg-black/60 backdrop-blur-xl shadow-2xl rounded-2xl border border-white/20">
        <div className="p-8">
          <h2 className="text-2xl font-serif text-white mb-6">Trouvez votre villa</h2>
          <div className="flex flex-col gap-6">
            {/* Location input */}
            <div className="relative">
              <input
                type="text"
                placeholder="Où souhaitez-vous séjourner ?"
                value={location}
                onChange={(e) => {
                  setLocation(e.target.value);
                  setShowLocationDropdown(true);
                  setFilteredLocations(
                    VILLES_CORSE.filter(ville =>
                      ville.name.toLowerCase().includes(e.target.value.toLowerCase()) ||
                      ville.region.toLowerCase().includes(e.target.value.toLowerCase()) ||
                      ville.description.toLowerCase().includes(e.target.value.toLowerCase())
                    )
                  );
                }}
                className="w-full bg-white/10 text-white placeholder-white/60 border border-white/20 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-luxury-gold/50 text-base transition-all hover:bg-white/20"
              />
              {showLocationDropdown && (
                <div className="absolute z-20 w-full mt-2 bg-gray-900/95 backdrop-blur-sm border border-white/10 rounded-xl shadow-xl max-h-60 overflow-y-auto">
                  {filteredLocations.map((ville) => (
                    <button
                      key={ville.name}
                      className="w-full px-4 py-3 text-left hover:bg-white/5 text-white/90 transition-colors"
                      onClick={() => {
                        setLocation(ville.name);
                        setShowLocationDropdown(false);
                      }}
                    >
                      <div className="font-medium">{ville.name}</div>
                      <div className="text-sm text-white/50">{ville.description}</div>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Calendar */}
            <div className="relative">
              <button
                onClick={() => setShowCalendar(!showCalendar)}
                className="w-full bg-white/10 text-white border border-white/20 rounded-xl px-4 py-3 text-left focus:outline-none focus:ring-2 focus:ring-luxury-gold/50 text-base transition-all hover:bg-white/20"
              >
                {formatDateRange()}
              </button>
              {showCalendar && (
                <div className="absolute z-20 mt-2 bg-gray-900/95 backdrop-blur-sm border border-white/10 rounded-xl shadow-xl p-4">
                  <Calendar
                    selected={startDate}
                    onChange={(dates) => handleDateChange(dates as [Date | null, Date | null])}
                    startDate={startDate}
                    endDate={endDate}
                    selectsRange
                    inline
                    minDate={new Date()}
                  />
                </div>
              )}
            </div>

            {/* Bottom row */}
            <div className="flex gap-4">
              {/* Guests counter */}
              <div className="flex-1 relative">
                <button
                  onClick={() => setShowGuestCounter(!showGuestCounter)}
                  className="w-full bg-white/10 text-white border border-white/20 rounded-xl px-4 py-3 text-left focus:outline-none focus:ring-2 focus:ring-luxury-gold/50 text-base transition-all hover:bg-white/20"
                >
                  {guests} {guests > 1 ? 'voyageurs' : 'voyageur'}
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
                className={`px-6 py-3 border rounded-xl transition-all ${
                  hasPets
                    ? 'bg-luxury-gold text-white border-luxury-gold hover:bg-luxury-gold/90'
                    : 'bg-white/10 text-white border-white/20 hover:bg-white/20'
                }`}
              >
                Animaux
              </button>
            </div>

            {/* Search button */}
            <button
              onClick={handleSearch}
              className="w-full bg-luxury-gold hover:bg-luxury-gold/90 text-white rounded-xl px-6 py-3.5 text-base font-medium transition-all hover:shadow-lg flex items-center justify-center gap-2 group"
            >
              <FaSearch className="group-hover:scale-110 transition-transform" />
              <span>Rechercher</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
