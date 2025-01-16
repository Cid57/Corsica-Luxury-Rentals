'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { fr } from 'date-fns/locale';
import { addDays } from 'date-fns';
import { Villa } from '@/types/villa';
import { villas } from '@/data/villas';
import Link from 'next/link';
import { BsArrowLeft } from 'react-icons/bs';

interface CalendarClientProps {
  params: {
    id: string;
  };
}

export default function CalendarClient({ params }: CalendarClientProps) {
  const router = useRouter();
  const villa = villas.find(v => v.id === params.id);
  const [startDate, setStartDate] = useState<Date>(new Date());
  const [endDate, setEndDate] = useState<Date>(addDays(new Date(), 7));

  if (!villa) {
    return <div>Villa non trouvée</div>;
  }

  const numberOfNights = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
  const totalPrice = villa.pricePerNight * numberOfNights;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <Link 
            href={`/villas/${params.id}/reservation`}
            className="inline-flex items-center gap-2 text-luxury-gold hover:text-luxury-gold/80 mb-6"
          >
            <BsArrowLeft />
            <span>Retour aux détails</span>
          </Link>

          <div className="bg-white rounded-xl shadow-luxury p-6 sm:p-8 border border-luxury-gold/10">
            <div className="text-center mb-8">
              <h1 className="text-2xl font-serif text-gray-900 mb-2">Sélectionnez vos dates</h1>
              <p className="text-sm text-gray-600">Pour la villa {villa.name}</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              <div>
                <label className="block text-sm text-gray-600 mb-2">Date d'arrivée</label>
                <DatePicker
                  selected={startDate}
                  onChange={(date: Date) => setStartDate(date)}
                  selectsStart
                  startDate={startDate}
                  endDate={endDate}
                  minDate={new Date()}
                  locale={fr}
                  dateFormat="dd/MM/yyyy"
                  className="w-full p-3 border border-luxury-gold/20 rounded-lg focus:outline-none focus:border-luxury-gold focus:ring-1 focus:ring-luxury-gold"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-2">Date de départ</label>
                <DatePicker
                  selected={endDate}
                  onChange={(date: Date) => setEndDate(date)}
                  selectsEnd
                  startDate={startDate}
                  endDate={endDate}
                  minDate={addDays(startDate, 1)}
                  locale={fr}
                  dateFormat="dd/MM/yyyy"
                  className="w-full p-3 border border-luxury-gold/20 rounded-lg focus:outline-none focus:border-luxury-gold focus:ring-1 focus:ring-luxury-gold"
                />
              </div>
            </div>

            <div className="space-y-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-gray-600">Prix par nuit</span>
                  <span className="text-lg font-medium text-luxury-gold">{villa.pricePerNight}€</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Total pour {numberOfNights} nuits</span>
                  <span className="text-lg font-medium text-luxury-gold">{totalPrice}€</span>
                </div>
              </div>

              <button 
                className="w-full bg-luxury-gold text-white py-3 px-6 rounded-lg hover:bg-luxury-gold/90 transition-colors duration-300 font-medium"
                onClick={() => {
                  // Logique de réservation à implémenter
                  console.log('Réservation pour la villa:', villa.id);
                  console.log('Dates sélectionnées:', { startDate, endDate });
                  router.push(`/villas/${params.id}/reservation`);
                }}
              >
                Confirmer les dates
              </button>

              <div className="text-center text-xs text-gray-500">
                <p>Vous ne serez pas débité immédiatement</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
