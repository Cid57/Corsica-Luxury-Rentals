'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaPlus, FaMinus, FaWineGlass, FaCar, FaUtensils, FaConciergeBell } from 'react-icons/fa';

interface Service {
  id: string;
  name: string;
  description: string;
  price: number;
  icon: JSX.Element;
}

const availableServices: Service[] = [
  {
    id: 'wine',
    name: 'Cave à vin premium',
    description: 'Sélection de vins corses et internationaux',
    price: 150,
    icon: <FaWineGlass />,
  },
  {
    id: 'car',
    name: 'Location de voiture de luxe',
    description: 'Véhicule haut de gamme avec chauffeur',
    price: 300,
    icon: <FaCar />,
  },
  {
    id: 'chef',
    name: 'Chef à domicile',
    description: 'Chef étoilé pour vos repas',
    price: 250,
    icon: <FaUtensils />,
  },
  {
    id: 'concierge',
    name: 'Conciergerie privée',
    description: 'Service de conciergerie 24/7',
    price: 100,
    icon: <FaConciergeBell />,
  },
];

interface StayConfiguratorProps {
  basePrice: number;
}

export default function StayConfigurator({ basePrice }: StayConfiguratorProps) {
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [nights, setNights] = useState(1);

  const toggleService = (serviceId: string) => {
    setSelectedServices((prev) =>
      prev.includes(serviceId)
        ? prev.filter((id) => id !== serviceId)
        : [...prev, serviceId]
    );
  };

  const totalPrice =
    basePrice * nights +
    selectedServices.reduce((sum, serviceId) => {
      const service = availableServices.find((s) => s.id === serviceId);
      return sum + (service?.price || 0);
    }, 0);

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm">
      <h3 className="text-xl font-serif font-semibold mb-6">
        Configurez votre séjour
      </h3>

      {/* Sélecteur de nuits */}
      <div className="mb-6">
        <label className="block text-sm text-gray-600 mb-2">
          Durée du séjour
        </label>
        <div className="flex items-center gap-4">
          <button
            onClick={() => setNights(Math.max(1, nights - 1))}
            className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 transition-colors"
          >
            <FaMinus className="w-4 h-4" />
          </button>
          <span className="text-xl font-medium">{nights} nuit{nights > 1 ? 's' : ''}</span>
          <button
            onClick={() => setNights(nights + 1)}
            className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 transition-colors"
          >
            <FaPlus className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Services additionnels */}
      <div className="mb-6">
        <label className="block text-sm text-gray-600 mb-2">
          Services additionnels
        </label>
        <div className="space-y-3">
          {availableServices.map((service) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="relative"
            >
              <button
                onClick={() => toggleService(service.id)}
                className={`w-full p-4 rounded-xl border-2 transition-all ${
                  selectedServices.includes(service.id)
                    ? 'border-luxury-gold bg-luxury-gold/5'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="flex items-center gap-4">
                  <div className={`text-xl ${
                    selectedServices.includes(service.id)
                      ? 'text-luxury-gold'
                      : 'text-gray-400'
                  }`}>
                    {service.icon}
                  </div>
                  <div className="flex-1 text-left">
                    <div className="font-medium">{service.name}</div>
                    <div className="text-sm text-gray-500">
                      {service.description}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-medium">{service.price}€</div>
                    <div className="text-sm text-gray-500">par jour</div>
                  </div>
                </div>
              </button>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Total */}
      <div className="border-t border-gray-200 pt-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-gray-600">Prix de base ({nights} nuit{nights > 1 ? 's' : ''})</span>
          <span className="font-medium">{basePrice * nights}€</span>
        </div>
        {selectedServices.map((serviceId) => {
          const service = availableServices.find((s) => s.id === serviceId);
          if (!service) return null;
          return (
            <div key={serviceId} className="flex items-center justify-between mb-2">
              <span className="text-gray-600">{service.name}</span>
              <span className="font-medium">{service.price}€</span>
            </div>
          );
        })}
        <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-200">
          <span className="text-lg font-medium">Total</span>
          <span className="text-2xl font-semibold text-luxury-gold">
            {totalPrice}€
          </span>
        </div>
      </div>

      <button className="w-full mt-6 bg-luxury-gold text-white rounded-full py-3 font-medium hover:bg-luxury-gold/90 transition-colors">
        Réserver maintenant
      </button>
    </div>
  );
}
