'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { BookingService, BookingActivity } from '@/types/booking';
import { FaUtensils, FaSpa, FaCar, FaConciergeBell, FaShip, FaWineGlass, FaHiking } from 'react-icons/fa';

interface ServiceSelectorProps {
  services: BookingService[];
  activities: BookingActivity[];
  onServiceToggle: (serviceId: string) => void;
  onActivityToggle: (activityId: string) => void;
}

const serviceIcons: { [key: string]: JSX.Element } = {
  'chef': <FaUtensils className="w-8 h-8 text-luxury-gold" />,
  'massage': <FaSpa className="w-8 h-8 text-luxury-gold" />,
  'transport': <FaCar className="w-8 h-8 text-luxury-gold" />,
  'conciergerie': <FaConciergeBell className="w-8 h-8 text-luxury-gold" />,
  'boat': <FaShip className="w-8 h-8 text-luxury-gold" />,
  'wine': <FaWineGlass className="w-8 h-8 text-luxury-gold" />,
  'randonnee': <FaHiking className="w-8 h-8 text-luxury-gold" />,
};

const ServiceSelector = ({
  services,
  activities,
  onServiceToggle,
  onActivityToggle,
}: ServiceSelectorProps) => {
  return (
    <div className="space-y-12">
      {/* Services */}
      <div>
        <h2 className="text-2xl font-serif font-medium mb-6">Services additionnels</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {services.map((service) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <button
                onClick={() => onServiceToggle(service.id)}
                className={`group w-full p-8 rounded-2xl text-left transition-all border-2 hover:shadow-lg ${
                  service.selected
                    ? 'bg-luxury-gold/5 border-luxury-gold shadow-luxury-gold/10'
                    : 'bg-white hover:bg-gray-50 border-gray-100 hover:border-luxury-gold/30'
                }`}
              >
                <div className="flex items-start gap-6">
                  <div className="flex-shrink-0">
                    {serviceIcons[service.id]}
                  </div>
                  <div className="flex-grow">
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="text-xl font-serif font-medium group-hover:text-luxury-gold transition-colors">
                        {service.name}
                      </h3>
                      <span className="text-luxury-gold font-medium text-lg">{service.price}€</span>
                    </div>
                    <p className="text-gray-600">{service.description}</p>

                    <div className="mt-4 flex items-center justify-between">
                      <span className="text-sm font-medium text-luxury-gold opacity-0 group-hover:opacity-100 transition-opacity">
                        {service.selected ? 'Sélectionné' : 'Sélectionner'}
                      </span>
                      <div
                        className={`w-6 h-6 rounded-full border-2 transition-all ${
                          service.selected
                            ? 'bg-luxury-gold border-luxury-gold scale-110'
                            : 'border-gray-300 group-hover:border-luxury-gold'
                        }`}
                      >
                        {service.selected && (
                          <svg
                            className="w-full h-full text-white p-1"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </button>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Activités */}
      <div>
        <h2 className="text-2xl font-serif font-medium mb-6">Activités</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {activities.map((activity) => (
            <motion.div
              key={activity.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <button
                onClick={() => onActivityToggle(activity.id)}
                className={`group w-full p-8 rounded-2xl text-left transition-all border-2 hover:shadow-lg ${
                  activity.selected
                    ? 'bg-luxury-gold/5 border-luxury-gold shadow-luxury-gold/10'
                    : 'bg-white hover:bg-gray-50 border-gray-100 hover:border-luxury-gold/30'
                }`}
              >
                <div className="flex items-start gap-6">
                  <div className="flex-shrink-0">
                    {serviceIcons[activity.id]}
                  </div>
                  <div className="flex-grow">
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="text-xl font-serif font-medium group-hover:text-luxury-gold transition-colors">
                        {activity.name}
                      </h3>
                      <span className="text-luxury-gold font-medium text-lg">{activity.price}€</span>
                    </div>
                    <p className="text-gray-600">{activity.description}</p>

                    <div className="mt-4 flex items-center justify-between">
                      <span className="text-sm font-medium text-luxury-gold opacity-0 group-hover:opacity-100 transition-opacity">
                        {activity.selected ? 'Sélectionné' : 'Sélectionner'}
                      </span>
                      <div
                        className={`w-6 h-6 rounded-full border-2 transition-all ${
                          activity.selected
                            ? 'bg-luxury-gold border-luxury-gold scale-110'
                            : 'border-gray-300 group-hover:border-luxury-gold'
                        }`}
                      >
                        {activity.selected && (
                          <svg
                            className="w-full h-full text-white p-1"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ServiceSelector;
