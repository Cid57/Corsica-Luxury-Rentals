'use client';

import { motion } from 'framer-motion';
import { BookingService, BookingActivity } from '@/types/booking';
import { FaEuroSign } from 'react-icons/fa';

interface PriceSummaryProps {
  basePrice: number;
  services: BookingService[];
  activities: BookingActivity[];
}

const formatPrice = (price: number) => {
  return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
};

const PriceSummary = ({ basePrice, services, activities }: PriceSummaryProps) => {
  const selectedServices = services.filter(service => service.selected);
  const selectedActivities = activities.filter(activity => activity.selected);
  
  const servicesTotal = selectedServices.reduce((acc, service) => acc + service.price, 0);
  const activitiesTotal = selectedActivities.reduce((acc, activity) => acc + activity.price, 0);
  const total = basePrice + servicesTotal + activitiesTotal;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="fixed bottom-0 right-0 left-0 bg-gradient-to-t from-white via-white to-white/95 border-t border-gray-200 shadow-xl backdrop-blur-sm"
    >
      <div className="max-w-7xl mx-auto p-4 md:p-6">
        <div className="flex items-start justify-between">
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <FaEuroSign className="text-2xl text-luxury-gold" />
              <h3 className="text-lg font-medium text-gray-900">Prix total estimé</h3>
            </div>
            <div className="flex items-baseline space-x-2">
              <span className="text-4xl font-serif font-medium text-luxury-gold">
                {formatPrice(total)}€
              </span>
              <span className="text-sm font-medium text-gray-500">TTC</span>
            </div>
          </div>

          {(selectedServices.length > 0 || selectedActivities.length > 0) && (
            <div className="text-right space-y-1.5">
              <p className="text-sm font-medium text-gray-600">
                Prix de base: <span className="text-gray-900">{formatPrice(basePrice)}€</span>
              </p>
              {servicesTotal > 0 && (
                <p className="text-sm font-medium text-gray-600">
                  Services: <span className="text-luxury-gold">+{formatPrice(servicesTotal)}€</span>
                </p>
              )}
              {activitiesTotal > 0 && (
                <p className="text-sm font-medium text-gray-600">
                  Activités: <span className="text-luxury-gold">+{formatPrice(activitiesTotal)}€</span>
                </p>
              )}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default PriceSummary;
