export interface BookingDate {
  startDate: Date;
  endDate: Date;
}

export interface BookingGuests {
  adults: number;
  children: number;
  infants: number;
}

export interface BookingPets {
  hasPets: boolean;
  count?: number;
  type?: string;
  additionalInfo?: string;
}

export interface BookingService {
  id: string;
  name: string;
  price: number;
  description: string;
  selected: boolean;
}

export interface BookingActivity {
  id: string;
  name: string;
  price: number;
  description: string;
  date?: Date;
  selected: boolean;
}

export interface BookingDetails {
  villaId: string;
  dates: BookingDate;
  guests: BookingGuests;
  pets: BookingPets;
  services: BookingService[];
  activities: BookingActivity[];
  totalPrice: number;
  status: 'pending' | 'confirmed' | 'cancelled';
}

export interface BookingFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  specialRequests?: string;
}

export interface BookingState extends BookingDetails, BookingFormData {
  step: number;
  isSubmitting: boolean;
  error?: string;
}
