export interface Villa {
  id: string;
  name: string;
  location: string;
  description: string;
  pricePerNight: number;
  bedrooms: number;
  bathrooms: number;
  maxGuests: number;
  images: string[];
  amenities: string[];
  rating?: number;
  reviews?: number;
  featured: boolean;
  surface: number;
}
