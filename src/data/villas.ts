import { Villa } from '@/types/villa';
import { getImagePath } from '@/utils/imagePath';

export const villas: Villa[] = [
  {
    id: "villa-citadelle",
    name: "Villa Citadelle",
    location: "Bonifacio",
    description: "Villa de charme située dans la vieille ville de Bonifacio avec vue imprenable sur les falaises.",
    pricePerNight: 950,
    images: [
      getImagePath('images/bonifacio-1.jpg'),
      getImagePath('images/house-1.jpg'),
      getImagePath('images/bonifacio-2.jpg')
    ],
    bedrooms: 3,
    bathrooms: 2,
    maxGuests: 6,
    amenities: ["WiFi", "Piscine", "Climatisation", "Vue mer", "Terrasse", "Animaux acceptés"],
    featured: true,
    surface: 180
  },
  {
    id: "villa-mare",
    name: "Villa Mare",
    location: "Porto-Vecchio",
    description: "Magnifique villa contemporaine avec accès direct à la plage de Santa Giulia.",
    pricePerNight: 1200,
    images: [
      getImagePath('images/porto-vecchio-1.jpg'),
      getImagePath('images/porto-vecchio-2.jpg'),
      getImagePath('images/house-2.jpg')
    ],
    bedrooms: 4,
    bathrooms: 3,
    maxGuests: 8,
    amenities: ["WiFi", "Piscine à débordement", "Climatisation", "Accès plage", "Jardin", "Animaux acceptés"],
    featured: true,
    surface: 250
  },
  {
    id: "villa-paradisu",
    name: "Villa Paradisu",
    location: "Bonifacio",
    description: "Villa d'exception nichée dans les hauteurs de Bonifacio avec vue panoramique sur la mer.",
    pricePerNight: 1100,
    images: [
      getImagePath('images/house-1.jpg'),
      getImagePath('images/house-2.jpg'),
      getImagePath('images/bonifacio-3.jpg')
    ],
    bedrooms: 3,
    bathrooms: 2,
    maxGuests: 6,
    amenities: ["WiFi", "Piscine", "Climatisation", "Vue mer", "Terrasse", "Parking"],
    featured: false,
    surface: 200
  },
  {
    id: "villa-sole",
    name: "Villa Sole",
    location: "Porto-Vecchio",
    description: "Villa moderne avec piscine chauffée, située à quelques minutes des plus belles plages.",
    pricePerNight: 850,
    images: [
      getImagePath('images/house-2.jpg'),
      getImagePath('images/house-3.jpg'),
      getImagePath('images/porto-vecchio-3.jpg')
    ],
    bedrooms: 2,
    bathrooms: 2,
    maxGuests: 4,
    amenities: ["WiFi", "Piscine chauffée", "Climatisation", "Jardin", "Parking", "Animaux acceptés"],
    featured: false,
    surface: 150
  },
  {
    id: "villa-marina",
    name: "Villa Marina",
    location: "Bonifacio",
    description: "Élégante villa avec vue sur le port de plaisance de Bonifacio.",
    pricePerNight: 980,
    images: [
      getImagePath('images/marina.jpg'),
      getImagePath('images/house-1.jpg'),
      getImagePath('images/bonifacio-4.jpg')
    ],
    bedrooms: 3,
    bathrooms: 2,
    maxGuests: 6,
    amenities: ["WiFi", "Piscine", "Climatisation", "Vue port", "Terrasse"],
    featured: false,
    surface: 190
  },
  {
    id: "villa-alba",
    name: "Villa Alba",
    location: "Calvi",
    description: "Villa de luxe face à la baie de Calvi avec vue imprenable sur la citadelle.",
    pricePerNight: 1300,
    images: [
      getImagePath('images/house-1.jpg'),
      getImagePath('images/house-2.jpg'),
      getImagePath('images/calvi-1.jpg')
    ],
    bedrooms: 5,
    bathrooms: 4,
    maxGuests: 10,
    amenities: ["WiFi", "Piscine à débordement", "Climatisation", "Vue mer", "Jardin", "Hammam", "Animaux acceptés"],
    featured: true,
    surface: 300
  },
  {
    id: "villa-stella",
    name: "Villa Stella",
    location: "Saint-Florent",
    description: "Charmante villa avec vue sur le golfe de Saint-Florent et les vignobles du Patrimonio.",
    pricePerNight: 890,
    images: [
      getImagePath('images/Saint-florent.jpg'),
      getImagePath('images/house-3.jpg'),
      getImagePath('images/saint-florent-1.jpg')
    ],
    bedrooms: 3,
    bathrooms: 2,
    maxGuests: 6,
    amenities: ["WiFi", "Piscine", "Climatisation", "Vue mer", "Terrasse", "Cave à vin"],
    featured: false,
    surface: 170
  },
  {
    id: "villa-serena",
    name: "Villa Serena",
    location: "Porto-Vecchio",
    description: "Villa de prestige située dans un domaine privé, à proximité de la plage de Palombaggia.",
    pricePerNight: 1400,
    images: [
      getImagePath('images/porto-vecchio-2.jpg'),
      getImagePath('images/house-1.jpg'),
      getImagePath('images/palombaggia-1.jpg')
    ],
    bedrooms: 4,
    bathrooms: 3,
    maxGuests: 8,
    amenities: ["WiFi", "Piscine", "Climatisation", "Accès plage", "Salle de sport", "Tennis"],
    featured: true,
    surface: 280
  },
  {
    id: "villa-imperiale",
    name: "Villa Impériale",
    location: "Ajaccio",
    description: "Somptueuse villa avec vue panoramique sur le golfe d'Ajaccio et les îles Sanguinaires.",
    pricePerNight: 1600,
    images: [
      getImagePath('images/house-1.jpg'),
      getImagePath('images/house-2.jpg'),
      getImagePath('images/ajaccio-1.jpg')
    ],
    bedrooms: 6,
    bathrooms: 5,
    maxGuests: 12,
    amenities: ["WiFi", "Piscine à débordement", "Spa", "Vue mer", "Jardin", "Salle de cinéma"],
    featured: true,
    surface: 350
  },
  {
    id: "villa-rousse",
    name: "Villa Rousse",
    location: "L'Île-Rousse",
    description: "Villa contemporaine surplombant la baie de L'Île-Rousse avec accès privé à la plage.",
    pricePerNight: 1150,
    images: [
      getImagePath('images/house-2.jpg'),
      getImagePath('images/house-3.jpg'),
      getImagePath('images/ile-rousse-1.jpg')
    ],
    bedrooms: 4,
    bathrooms: 3,
    maxGuests: 8,
    amenities: ["WiFi", "Piscine", "Plage privée", "Vue mer", "Terrasse", "Jardin méditerranéen"],
    featured: true,
    surface: 220
  },
  {
    id: "villa-bastia",
    name: "Villa Bastia",
    location: "Bastia",
    description: "Élégante villa de style toscan avec vue sur le vieux port de Bastia.",
    pricePerNight: 980,
    images: [
      getImagePath('images/house-3.jpg'),
      getImagePath('images/house-1.jpg'),
      getImagePath('images/bastia-1.jpg')
    ],
    bedrooms: 3,
    bathrooms: 2,
    maxGuests: 6,
    amenities: ["WiFi", "Piscine", "Vue port", "Terrasse", "Jardin", "Cave à vin"],
    featured: false,
    surface: 185
  },
  {
    id: "villa-propriano",
    name: "Villa Propriano",
    location: "Propriano",
    description: "Villa moderne avec vue imprenable sur le golfe de Propriano et accès direct à la plage.",
    pricePerNight: 1100,
    images: [
      getImagePath('images/house-1.jpg'),
      getImagePath('images/house-2.jpg'),
      getImagePath('images/propriano-1.jpg')
    ],
    bedrooms: 4,
    bathrooms: 3,
    maxGuests: 8,
    amenities: ["WiFi", "Piscine", "Accès plage", "Vue mer", "Jardin", "Salle de sport"],
    featured: false,
    surface: 240
  }
];
