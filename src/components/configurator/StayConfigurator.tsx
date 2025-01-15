'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaDog } from 'react-icons/fa';
import { BookingService, BookingActivity } from '@/types/booking';
import ServiceSelector from '@/components/booking/ServiceSelector';

interface ConfigStep {
  id: number;
  title: string;
  description: string;
}

const CONFIGURATION_STEPS: ConfigStep[] = [
  {
    id: 1,
    title: "Type de séjour",
    description: "Choisissez le style de vacances"
  },
  {
    id: 2,
    title: "Services",
    description: "Personnalisez votre expérience"
  },
  {
    id: 3,
    title: "Animaux",
    description: "Voyagez-vous avec des animaux ?"
  },
  {
    id: 4,
    title: "Activités",
    description: "Découvrez les activités"
  },
  {
    id: 5,
    title: "Récapitulatif",
    description: "Vérifiez les détails"
  }
];

export default function StayConfigurator() {
  const [currentStep, setCurrentStep] = useState(1);
  const [stayType, setStayType] = useState<string>('');
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [selectedActivities, setSelectedActivities] = useState<string[]>([]);
  const [hasPets, setHasPets] = useState(false);
  const [petDetails, setPetDetails] = useState({
    count: 1,
    type: '',
    additionalInfo: '',
  });

  const STAY_TYPES = [
    {
      id: 'detente',
      title: 'Détente & Bien-être',
      description: 'Un séjour axé sur la relaxation et le repos',
      icon: '🌅'
    },
    {
      id: 'aventure',
      title: 'Aventure & Sport',
      description: 'Des activités sportives et des découvertes',
      icon: '🏃‍♂️'
    },
    {
      id: 'culture',
      title: 'Culture & Patrimoine',
      description: 'Exploration du patrimoine corse',
      icon: '🏛️'
    },
    {
      id: 'gastronomie',
      title: 'Gastronomie',
      description: 'Découverte des saveurs corses',
      icon: '🍷'
    }
  ];

  const services: BookingService[] = [
    {
      id: 'chef',
      name: 'Chef privé',
      description: 'Un chef à domicile pour vos repas',
      price: 350,
      selected: selectedServices.includes('chef')
    },
    {
      id: 'massage',
      name: 'Massage & Spa',
      description: 'Séances de massage à la villa',
      price: 120,
      selected: selectedServices.includes('massage')
    },
    {
      id: 'voiture',
      name: 'Location de voiture',
      description: 'Véhicule luxueux avec chauffeur',
      price: 200,
      selected: selectedServices.includes('voiture')
    },
    {
      id: 'conciergerie',
      name: 'Conciergerie',
      description: 'Service de conciergerie 24/7',
      price: 100,
      selected: selectedServices.includes('conciergerie')
    }
  ];

  const activities: BookingActivity[] = [
    {
      id: 'bateau',
      name: 'Sortie en bateau',
      description: 'Découverte des calanques',
      price: 450,
      selected: selectedActivities.includes('bateau')
    },
    {
      id: 'plongee',
      name: 'Plongée',
      description: 'Exploration des fonds marins',
      price: 120,
      selected: selectedActivities.includes('plongee')
    },
    {
      id: 'randonnee',
      name: 'Randonnée guidée',
      description: 'Parcours personnalisés',
      price: 80,
      selected: selectedActivities.includes('randonnee')
    },
    {
      id: 'degustation',
      name: 'Dégustation de vins',
      description: 'Découverte des vins corses',
      price: 90,
      selected: selectedActivities.includes('degustation')
    }
  ];

  const handleServiceToggle = (serviceId: string) => {
    setSelectedServices(prev =>
      prev.includes(serviceId)
        ? prev.filter(id => id !== serviceId)
        : [...prev, serviceId]
    );
  };

  const handleActivityToggle = (activityId: string) => {
    setSelectedActivities(prev =>
      prev.includes(activityId)
        ? prev.filter(id => id !== activityId)
        : [...prev, activityId]
    );
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {STAY_TYPES.map((type) => (
              <button
                key={type.id}
                onClick={() => setStayType(type.id)}
                className={`p-6 rounded-xl text-left transition-all ${
                  stayType === type.id
                    ? 'bg-luxury-gold/10 border-luxury-gold'
                    : 'bg-white hover:bg-gray-50'
                } border-2`}
              >
                <div className="text-3xl mb-2">{type.icon}</div>
                <h3 className="text-xl font-serif font-semibold mb-2">{type.title}</h3>
                <p className="text-gray-600">{type.description}</p>
              </button>
            ))}
          </div>
        );
      case 2:
        return (
          <ServiceSelector
            services={services}
            activities={activities}
            onServiceToggle={handleServiceToggle}
            onActivityToggle={handleActivityToggle}
          />
        );
      case 3:
        return (
          <div className="space-y-6">
            <div className="flex items-center space-x-4 mb-6">
              <FaDog className="text-3xl text-luxury-gold" />
              <div>
                <h3 className="text-xl font-serif">Voyagez-vous avec des animaux ?</h3>
                <p className="text-gray-600 text-sm">Certaines villas acceptent les animaux de compagnie</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={() => setHasPets(true)}
                className={`p-6 rounded-xl text-left transition-all border-2 ${
                  hasPets
                    ? 'bg-luxury-gold/10 border-luxury-gold'
                    : 'bg-white hover:bg-gray-50 border-gray-200'
                }`}
              >
                Oui, je voyage avec des animaux
              </button>
              <button
                onClick={() => {
                  setHasPets(false);
                  setPetDetails({ count: 1, type: '', additionalInfo: '' });
                }}
                className={`p-6 rounded-xl text-left transition-all border-2 ${
                  !hasPets
                    ? 'bg-luxury-gold/10 border-luxury-gold'
                    : 'bg-white hover:bg-gray-50 border-gray-200'
                }`}
              >
                Non, pas d'animaux
              </button>
            </div>

            {hasPets && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-4 mt-6"
              >
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Nombre d'animaux
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="3"
                    value={petDetails.count}
                    onChange={(e) => setPetDetails(prev => ({
                      ...prev,
                      count: parseInt(e.target.value)
                    }))}
                    className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-luxury-gold focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Type d'animal
                  </label>
                  <input
                    type="text"
                    placeholder="Ex: Chien, Chat..."
                    value={petDetails.type}
                    onChange={(e) => setPetDetails(prev => ({
                      ...prev,
                      type: e.target.value
                    }))}
                    className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-luxury-gold focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Informations supplémentaires
                  </label>
                  <textarea
                    placeholder="Taille, race, besoins particuliers..."
                    value={petDetails.additionalInfo}
                    onChange={(e) => setPetDetails(prev => ({
                      ...prev,
                      additionalInfo: e.target.value
                    }))}
                    className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-luxury-gold focus:border-transparent"
                    rows={3}
                  />
                </div>
              </motion.div>
            )}
          </div>
        );
      case 4:
        return (
          <ServiceSelector
            services={services}
            activities={activities}
            onServiceToggle={handleServiceToggle}
            onActivityToggle={handleActivityToggle}
          />
        );
      case 5:
        return (
          <div className="space-y-8">
            <div className="bg-white p-6 rounded-xl border-2">
              <h3 className="text-xl font-serif font-semibold mb-4">Type de séjour</h3>
              <p className="text-gray-600">
                {STAY_TYPES.find((type) => type.id === stayType)?.title || 'Non sélectionné'}
              </p>
            </div>

            {selectedServices.length > 0 && (
              <div className="bg-white p-6 rounded-xl border-2">
                <h3 className="text-xl font-serif font-semibold mb-4">Services sélectionnés</h3>
                <ul className="space-y-2">
                  {selectedServices.map((serviceId) => {
                    const service = services.find((s) => s.id === serviceId);
                    return (
                      <li key={serviceId} className="flex justify-between items-center">
                        <span className="text-gray-600">{service?.name}</span>
                        <span className="text-luxury-gold font-medium">{service?.price}€</span>
                      </li>
                    );
                  })}
                </ul>
              </div>
            )}

            {hasPets && (
              <div className="bg-white p-6 rounded-xl border-2">
                <h3 className="text-xl font-serif font-semibold mb-4">Animaux de compagnie</h3>
                <div className="space-y-2">
                  <p className="text-gray-600">
                    {petDetails.count} {petDetails.count > 1 ? 'animaux' : 'animal'} - {petDetails.type}
                  </p>
                  {petDetails.additionalInfo && (
                    <p className="text-gray-500 text-sm">{petDetails.additionalInfo}</p>
                  )}
                </div>
              </div>
            )}

            {selectedActivities.length > 0 && (
              <div className="bg-white p-6 rounded-xl border-2">
                <h3 className="text-xl font-serif font-semibold mb-4">Activités sélectionnées</h3>
                <ul className="space-y-2">
                  {selectedActivities.map((activityId) => {
                    const activity = activities.find((a) => a.id === activityId);
                    return (
                      <li key={activityId} className="flex justify-between items-center">
                        <span className="text-gray-600">{activity?.name}</span>
                        <span className="text-luxury-gold font-medium">{activity?.price}€</span>
                      </li>
                    );
                  })}
                </ul>
              </div>
            )}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="max-w-5xl mx-auto">
      {/* En-tête */}
      <div className="text-center mb-16">
        <h1 className="text-4xl font-serif font-medium mb-4">Configurez votre séjour idéal</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Personnalisez chaque aspect de votre séjour en Corse pour une expérience unique et mémorable.
          Suivez les étapes ci-dessous pour créer le voyage de vos rêves.
        </p>
      </div>

      {/* Barre de progression */}
      <div className="mb-20">
        <div className="flex justify-between items-start relative">
          {/* Ligne de progression */}
          <div className="absolute top-[25px] left-0 right-0 h-0.5 bg-gray-200" />
          <div 
            className="absolute top-[25px] left-0 h-0.5 bg-luxury-gold transition-all duration-300"
            style={{ 
              width: `${((currentStep - 1) / (CONFIGURATION_STEPS.length - 1)) * 100}%`
            }}
          />

          {/* Étapes */}
          {CONFIGURATION_STEPS.map((step) => (
            <div key={step.id} className="relative flex flex-col items-center" style={{ width: '20%' }}>
              {/* Cercle avec numéro */}
              <div
                className={`w-12 h-12 rounded-full flex items-center justify-center text-sm font-medium z-10 bg-white border-2 transition-colors ${
                  step.id === currentStep
                    ? 'border-luxury-gold text-luxury-gold'
                    : step.id < currentStep
                    ? 'border-green-500 bg-green-500 text-white'
                    : 'border-gray-200 text-gray-600'
                }`}
              >
                {step.id < currentStep ? '✓' : step.id}
              </div>

              {/* Titre et description en dessous */}
              <div className="text-center mt-4">
                <p className="font-medium text-sm">{step.title}</p>
                <p className="text-xs text-gray-500 mt-1 max-w-[120px] mx-auto">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Contenu de l'étape */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          {renderStepContent()}
        </motion.div>
      </AnimatePresence>

      {/* Navigation */}
      <div className="mt-8 flex justify-between">
        <button
          onClick={() => setCurrentStep((prev) => Math.max(1, prev - 1))}
          disabled={currentStep === 1}
          className="px-6 py-2 rounded-xl bg-gray-100 text-gray-600 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-200 transition-colors"
        >
          Précédent
        </button>
        <button
          onClick={() => setCurrentStep((prev) => Math.min(CONFIGURATION_STEPS.length, prev + 1))}
          disabled={currentStep === CONFIGURATION_STEPS.length}
          className="px-6 py-2 rounded-xl bg-luxury-gold text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-luxury-gold/90 transition-colors"
        >
          {currentStep === CONFIGURATION_STEPS.length ? 'Terminer' : 'Suivant'}
        </button>
      </div>
    </div>
  );
}
