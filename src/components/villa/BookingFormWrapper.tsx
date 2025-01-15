'use client';

import { Villa } from '@/types/villa';
import BookingForm from '@/components/booking/BookingForm';

interface BookingFormWrapperProps {
  villa: Villa;
}

export default function BookingFormWrapper({ villa }: BookingFormWrapperProps) {
  return (
    <BookingForm 
      villaId={villa.id} 
      pricePerNight={villa.pricePerNight} 
    />
  );
}
