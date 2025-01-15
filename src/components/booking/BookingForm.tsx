'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { format, differenceInDays } from 'date-fns';
import { fr } from 'date-fns/locale';
import DateRangePicker from '@/components/ui/DateRangePicker';
import { motion } from 'framer-motion';
import { FaRegCalendarAlt, FaUsers, FaPaw, FaRegUser } from 'react-icons/fa';

interface DateRange {
  from: Date | null;
  to: Date | null;
}

interface BookingFormProps {
  villaId: string;
  pricePerNight: number;
}

interface Option {
  id: string;
  name: string;
  description: string;
  price: number;
  icon: React.ReactNode;
}

const luxuryOptions: Option[] = [
  {
    id: 'breakfast',
    name: 'Petit-déjeuner',
    description: 'Petit-déjeuner continental servi dans votre villa',
    price: 25,
    icon: '🥐'
  },
  {
    id: 'chef',
    name: 'Chef privé',
    description: 'Un chef étoilé cuisine pour vous',
    price: 150,
    icon: '👨‍🍳'
  },
  {
    id: 'massage',
    name: 'Massage',
    description: 'Massage relaxant d\'une heure',
    price: 80,
    icon: '💆‍♂️'
  },
  {
    id: 'car',
    name: 'Location de voiture',
    description: 'Voiture de luxe avec chauffeur',
    price: 200,
    icon: '🚗'
  }
];

interface BookingState {
  step: number;
  dates: DateRange;
  guests: {
    adults: number;
    children: number;
  };
  pets: {
    hasPets: boolean;
    count: number;
  };
  selectedOptions: string[];
  contact: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
  };
}

const INITIAL_STATE: BookingState = {
  step: 1,
  dates: {
    from: null,
    to: null
  },
  guests: {
    adults: 1,
    children: 0
  },
  pets: {
    hasPets: false,
    count: 0
  },
  selectedOptions: [],
  contact: {
    firstName: "",
    lastName: "",
    email: "",
    phone: ""
  }
};

export default function BookingForm({ villaId, pricePerNight }: BookingFormProps) {
  const [booking, setBooking] = useState<BookingState>(INITIAL_STATE);
  const router = useRouter();

  const handleDateChange = (dates: DateRange) => {
    setBooking(prev => ({
      ...prev,
      dates
    }));
  };

  const calculateTotalPrice = () => {
    if (!booking.dates.from || !booking.dates.to) return 0;
    
    const nights = differenceInDays(booking.dates.to, booking.dates.from);
    const basePrice = nights * pricePerNight;
    
    const optionsPrice = booking.selectedOptions.reduce((total, optionId) => {
      const option = luxuryOptions.find(opt => opt.id === optionId);
      if (option) {
        return total + (option.price * nights);
      }
      return total;
    }, 0);

    return basePrice + optionsPrice;
  };

  const toggleOption = (optionId: string) => {
    setBooking(prev => ({
      ...prev,
      selectedOptions: prev.selectedOptions.includes(optionId)
        ? prev.selectedOptions.filter(id => id !== optionId)
        : [...prev.selectedOptions, optionId]
    }));
  };

  const handleDateSelect = (newDates: DateRange | undefined) => {
    if (!newDates) return;
    
    setBooking(prev => ({
      ...prev,
      dates: {
        from: newDates.from || null,
        to: newDates.to || null
      }
    }));
  };

  const validateBooking = (): boolean => {
    if (!booking.dates.from || !booking.dates.to) {
      alert('Veuillez sélectionner vos dates de séjour');
      return false;
    }
    if (booking.guests.adults < 1) {
      alert('Il doit y avoir au moins un adulte');
      return false;
    }
    if (!booking.contact.email || !booking.contact.phone) {
      alert('Veuillez remplir vos informations de contact');
      return false;
    }
    return true;
  };

  const handleSubmit = async () => {
    if (!validateBooking()) return;
    
    try {
      // TODO: Implement actual booking submission
      // Simulation d'une requête API
      await new Promise(resolve => setTimeout(resolve, 1000));
      alert('Réservation confirmée !');
      router.push('/confirmation');
    } catch (error) {
      alert('Une erreur est survenue lors de la réservation');
    }
  };

  const renderCurrentStep = () => {
    switch (booking.step) {
      case 1:
        return (
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 }
            }}
            className="space-y-8"
          >
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
              <h3 className="text-2xl font-serif mb-6">Dates de séjour</h3>
              <div className="relative">
                <div className="w-full p-4 bg-white border border-gray-200 rounded-xl text-gray-900">
                  <DateRangePicker
                    selected={booking.dates}
                    onChange={handleDateChange}
                  />
                </div>
              </div>
            </div>

            {booking.dates.from && booking.dates.to && (
              <>
                <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
                  <h3 className="text-2xl font-serif mb-6">Options de luxe</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {luxuryOptions.map(option => (
                      <div
                        key={option.id}
                        onClick={() => toggleOption(option.id)}
                        className={`p-6 rounded-xl border-2 transition-all duration-300 cursor-pointer hover:scale-[1.02] ${
                          booking.selectedOptions.includes(option.id)
                            ? 'border-luxury-gold bg-luxury-gold/5'
                            : 'border-gray-200 hover:border-luxury-gold/50'
                        }`}
                      >
                        <div className="flex items-start space-x-4">
                          <span className="text-3xl">{option.icon}</span>
                          <div className="flex-1">
                            <h4 className="font-medium text-lg">{option.name}</h4>
                            <p className="text-gray-600 text-sm mt-1">{option.description}</p>
                            <p className="text-luxury-gold font-medium mt-2">{option.price}€ / nuit</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-gradient-to-br from-luxury-gold/20 to-luxury-gold/5 rounded-2xl p-8 shadow-lg">
                  <div className="flex justify-between items-center">
                    <div>
                      <h4 className="text-xl font-medium">Récapitulatif</h4>
                      <p className="text-gray-600 mt-1">
                        {format(booking.dates.from, 'dd MMMM yyyy', { locale: fr })} - {format(booking.dates.to, 'dd MMMM yyyy', { locale: fr })}
                      </p>
                      <p className="text-sm text-gray-500 mt-1">
                        {differenceInDays(booking.dates.to, booking.dates.from)} nuits
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-600">Prix total</p>
                      <p className="text-3xl font-serif text-luxury-gold">{calculateTotalPrice()}€</p>
                    </div>
                  </div>
                  {booking.selectedOptions.length > 0 && (
                    <div className="mt-4 pt-4 border-t border-luxury-gold/20">
                      <p className="text-sm font-medium mb-2">Options sélectionnées:</p>
                      <div className="flex flex-wrap gap-2">
                        {booking.selectedOptions.map(optionId => {
                          const option = luxuryOptions.find(opt => opt.id === optionId);
                          return option && (
                            <span
                              key={optionId}
                              className="inline-flex items-center px-3 py-1 rounded-full bg-luxury-gold/10 text-luxury-gold text-sm"
                            >
                              {option.icon} {option.name}
                            </span>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              </>
            )}
          </motion.div>
        );
      case 2:
        return (
          <motion.div 
            className="space-y-8"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 }
            }}
            transition={{ duration: 0.4 }}
          >
            <div className="flex items-center space-x-4 border-b border-gray-100 pb-6">
              <div className="p-3 bg-luxury-gold/10 rounded-xl">
                <FaRegUser className="w-6 h-6 text-luxury-gold" />
              </div>
              <div>
                <h2 className="text-2xl font-serif">Vos informations</h2>
                <p className="text-gray-500 mt-1">Remplissez vos coordonnées</p>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
              <form className="space-y-6">
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-600 mb-2">
                      Prénom
                    </label>
                    <input
                      type="text"
                      className="w-full p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-luxury-gold focus:border-transparent transition-all duration-200"
                      value={booking.contact.firstName}
                      onChange={(e) => setBooking(prev => ({ 
                        ...prev, 
                        contact: { 
                          ...prev.contact, 
                          firstName: e.target.value 
                        } 
                      }))}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-600 mb-2">
                      Nom
                    </label>
                    <input
                      type="text"
                      className="w-full p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-luxury-gold focus:border-transparent transition-all duration-200"
                      value={booking.contact.lastName}
                      onChange={(e) => setBooking(prev => ({ 
                        ...prev, 
                        contact: { 
                          ...prev.contact, 
                          lastName: e.target.value 
                        } 
                      }))}
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    className="w-full p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-luxury-gold focus:border-transparent transition-all duration-200"
                    value={booking.contact.email}
                    onChange={(e) => setBooking(prev => ({ 
                      ...prev, 
                      contact: { 
                        ...prev.contact, 
                        email: e.target.value 
                      } 
                    }))}
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-2">
                    Téléphone
                  </label>
                  <input
                    type="tel"
                    className="w-full p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-luxury-gold focus:border-transparent transition-all duration-200"
                    value={booking.contact.phone}
                    onChange={(e) => setBooking(prev => ({ 
                      ...prev, 
                      contact: { 
                        ...prev.contact, 
                        phone: e.target.value 
                      } 
                    }))}
                    required
                  />
                </div>
              </form>
            </div>
          </motion.div>
        );
      case 3:
        return (
          <motion.div 
            className="space-y-8"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 }
            }}
            transition={{ duration: 0.4 }}
          >
            <div className="flex items-center space-x-4 border-b border-gray-100 pb-6">
              <div className="p-3 bg-luxury-gold/10 rounded-xl">
                <FaRegCalendarAlt className="w-6 h-6 text-luxury-gold" />
              </div>
              <div>
                <h2 className="text-2xl font-serif">Récapitulatif</h2>
                <p className="text-gray-500 mt-1">Vérifiez les détails de votre réservation</p>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 space-y-6">
              {booking.dates.from && booking.dates.to && (
                <div className="flex justify-between items-center pb-6 border-b border-gray-100">
                  <div className="flex items-center space-x-4">
                    <div className="p-2 bg-luxury-gold/10 rounded-lg">
                      <FaRegCalendarAlt className="w-5 h-5 text-luxury-gold" />
                    </div>
                    <span className="text-gray-600">Dates</span>
                  </div>
                  <span className="font-medium">
                    {format(booking.dates.from, 'dd MMMM yyyy', { locale: fr })} - {format(booking.dates.to, 'dd MMMM yyyy', { locale: fr })}
                  </span>
                </div>
              )}
              
              <div className="flex justify-between items-center pb-6 border-b border-gray-100">
                <div className="flex items-center space-x-4">
                  <div className="p-2 bg-luxury-gold/10 rounded-lg">
                    <FaUsers className="w-5 h-5 text-luxury-gold" />
                  </div>
                  <span className="text-gray-600">Voyageurs</span>
                </div>
                <span className="font-medium">{booking.guests.adults} adultes, {booking.guests.children} enfants</span>
              </div>
              
              <div className="flex justify-between items-center pb-6 border-b border-gray-100">
                <div className="flex items-center space-x-4">
                  <div className="p-2 bg-luxury-gold/10 rounded-lg">
                    <FaPaw className="w-5 h-5 text-luxury-gold" />
                  </div>
                  <span className="text-gray-600">Animaux</span>
                </div>
                <span className="font-medium">{booking.pets.hasPets ? `${booking.pets.count} animal(aux)` : 'Non'}</span>
              </div>
              
              <div className="flex justify-between items-center pt-4">
                <span className="text-xl font-medium">Total</span>
                <span className="text-2xl font-serif text-luxury-gold">{calculateTotalPrice()}€</span>
              </div>
            </div>
          </motion.div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="max-w-3xl mx-auto bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-gray-100/50 p-8 space-y-8">
      {/* Progress Steps */}
      <div className="flex justify-between items-center">
        {[1, 2, 3].map((number) => (
          <div
            key={number}
            className={`flex items-center ${
              number < 3 ? 'flex-1' : ''
            }`}
          >
            <div
              className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 ${
                booking.step >= number
                  ? 'bg-luxury-gold text-white shadow-lg shadow-luxury-gold/20'
                  : 'bg-gray-100 text-gray-400'
              }`}
            >
              {number}
            </div>
            {number < 3 && (
              <div
                className={`flex-1 h-1 mx-4 rounded-full transition-all duration-300 ${
                  booking.step > number ? 'bg-luxury-gold' : 'bg-gray-200'
                }`}
              />
            )}
          </div>
        ))}
      </div>

      {/* Form Content */}
      {renderCurrentStep()}

      {/* Navigation */}
      <div className="flex justify-between pt-8">
        {booking.step > 1 && (
          <button
            onClick={() => setBooking(prev => ({ ...prev, step: prev.step - 1 }))}
            className="px-8 py-4 border-2 border-luxury-gold text-luxury-gold rounded-xl hover:bg-luxury-gold hover:text-white transition-all duration-300 hover:scale-105"
          >
            Retour
          </button>
        )}
        {booking.step < 3 ? (
          <button
            onClick={() => setBooking(prev => ({ ...prev, step: prev.step + 1 }))}
            className="ml-auto px-8 py-4 bg-luxury-gold text-white rounded-xl hover:bg-luxury-gold/90 transition-all duration-300 hover:scale-105 shadow-lg shadow-luxury-gold/20"
          >
            Continuer
          </button>
        ) : (
          <button
            onClick={handleSubmit}
            className="ml-auto px-8 py-4 bg-luxury-gold text-white rounded-xl hover:bg-luxury-gold/90 transition-all duration-300 hover:scale-105 shadow-lg shadow-luxury-gold/20"
          >
            Confirmer la réservation
          </button>
        )}
      </div>
    </div>
  );
}
