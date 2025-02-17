import { Villa } from '@/types/villa';

export const villas: Villa[] = [
  {
    id: "villa-citadelle",
    name: "Villa Citadelle",
    location: "Bonifacio",
    description: "Villa de charme située dans la vieille ville de Bonifacio avec vue imprenable sur les falaises.",
    pricePerNight: 950,
    images: [
      'images/bonifacio-1.jpg',
      'images/house-1.jpg',
      'images/bonifacio-2.jpg'
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
      'images/porto-vecchio-1.jpg',
      'images/porto-vecchio-2.jpg',
      'images/house-2.jpg'
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
      'images/house-1.jpg',
      'images/house-2.jpg',
      'images/bonifacio-3.jpg'
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
      'images/house-2.jpg',
      'images/house-3.jpg',
      'images/porto-vecchio-3.jpg'
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
      'images/marina.jpg',
      'images/house-1.jpg',
      'images/bonifacio-4.jpg'
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
      'images/house-1.jpg',
      'images/house-2.jpg',
      'images/calvi-1.jpg'
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
      'images/Saint-florent.jpg',
      'images/house-3.jpg',
      'images/saint-florent-1.jpg'
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
      'images/porto-vecchio-2.jpg',
      'images/house-1.jpg',
      'images/palombaggia-1.jpg'
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
      'images/house-1.jpg',
      'images/house-2.jpg',
      'images/ajaccio-1.jpg'
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
      'images/house-2.jpg',
      'images/house-3.jpg',
      'images/ile-rousse-1.jpg'
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
      'images/house-3.jpg',
      'images/house-1.jpg',
      'images/bastia-1.jpg'
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
      'images/house-1.jpg',
      'images/house-2.jpg',
      'images/propriano-1.jpg'
    ],
    bedrooms: 4,
    bathrooms: 3,
    maxGuests: 8,
    amenities: ["WiFi", "Piscine", "Accès plage", "Vue mer", "Jardin", "Salle de sport"],
    featured: false,
    surface: 240
  }
];
