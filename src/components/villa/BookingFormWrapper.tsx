'use client';

import { Villa } from '@/types/villa';
import BookingForm from '@/components/booking/BookingForm';
import { FaInfoCircle } from 'react-icons/fa';

interface BookingFormWrapperProps {
  villa: Villa;
}

export default function BookingFormWrapper({ villa }: BookingFormWrapperProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <div className="flex items-center justify-between mb-4">
        <div>
          <span className="text-2xl font-serif text-gray-900">{villa.pricePerNight}€</span>
          <span className="text-sm text-gray-500 ml-1">/ nuit</span>
        </div>
        <div className="px-3 py-1 bg-luxury-gold/10 text-luxury-gold rounded-full text-xs font-medium">
          Disponible
        </div>
      </div>

      <div className="space-y-4">
        <div className="p-3 rounded-lg bg-gray-50 border border-gray-100">
          <div className="flex items-center gap-2 text-gray-600 mb-1">
            <FaInfoCircle className="text-luxury-gold w-4 h-4" />
            <span className="text-xs font-medium">Informations</span>
          </div>
          <ul className="text-xs text-gray-500 space-y-1">
            <li>• Check-in: 15h00</li>
            <li>• Check-out: 11h00</li>
          </ul>
        </div>

        <BookingForm 
          villaId={villa.id} 
          pricePerNight={villa.pricePerNight}
        />

        <p className="text-center text-xs text-gray-500">
          Vous ne serez pas débité immédiatement
        </p>
      </div>
    </div>
  );
}
