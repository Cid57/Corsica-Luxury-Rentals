'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaDog, FaInfoCircle } from 'react-icons/fa';

interface ConfigStep {
  id: number;
  title: string;
  description: string;
}

const CONFIGURATION_STEPS: ConfigStep[] = [
  {
    id: 1,
    title: "Type de séjour",
    description: "Choisissez le style de vacances qui vous correspond"
  },
  {
    id: 2,
    title: "Services supplémentaires",
    description: "Personnalisez votre expérience avec nos services"
  },
  {
    id: 3,
    title: "Des animaux ?",
    description: "Indiquez si vous voyagez avec des animaux de compagnie"
  },
  {
    id: 4,
    title: "Activités",
    description: "Découvrez les activités disponibles"
  },
  {
    id: 5,
    title: "Récapitulatif",
    description: "Vérifiez les détails de votre séjour personnalisé"
  }
];

export default function StayConfigurator() {
  const [currentStep, setCurrentStep] = useState(1);
  const [stayType, setStayType] = useState<string>('');
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [selectedActivities, setSelectedActivities] = useState<string[]>([]);
  const [pets, setPets] = useState({
    hasPets: false,
    count: 0,
    type: '',
    additionalInfo: ''
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

  const SERVICES = [
    {
      id: 'chef',
      title: 'Chef privé',
      description: 'Un chef à domicile pour vos repas',
      price: '350€/jour'
    },
    {
      id: 'massage',
      title: 'Massage & Spa',
      description: 'Séances de massage à la villa',
      price: '120€/séance'
    },
    {
      id: 'voiture',
      title: 'Location de voiture',
      description: 'Véhicule luxueux avec chauffeur',
      price: '200€/jour'
    },
    {
      id: 'conciergerie',
      title: 'Conciergerie',
      description: 'Service de conciergerie 24/7',
      price: '100€/jour'
    }
  ];

  const ACTIVITIES = [
    {
      id: 'bateau',
      title: 'Sortie en bateau',
      description: 'Découverte des calanques',
      price: '450€'
    },
    {
      id: 'plongee',
      title: 'Plongée',
      description: 'Exploration des fonds marins',
      price: '120€'
    },
    {
      id: 'randonnee',
      title: 'Randonnée guidée',
      description: 'Découverte des sentiers corses',
      price: '80€'
    },
    {
      id: 'degustation',
      title: 'Dégustation de vins',
      description: 'Découverte des vins corses',
      price: '90€'
    }
  ];

  const handleServiceSelection = (serviceId: string) => {
    console.log('Service sélectionné:', serviceId);
    setSelectedServices((prev) => {
      const newSelection = prev.includes(serviceId)
        ? prev.filter((id) => id !== serviceId)
        : [...prev, serviceId];
      console.log('Nouvelle sélection de services:', newSelection);
      return newSelection;
    });
  };

  const handleActivitySelection = (activityId: string) => {
    console.log('Activité sélectionnée:', activityId);
    setSelectedActivities((prev) => {
      const newSelection = prev.includes(activityId)
        ? prev.filter((id) => id !== activityId)
        : [...prev, activityId];
      console.log('Nouvelle sélection d\'activités:', newSelection);
      return newSelection;
    });
  };

  const renderPetsSection = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-xl p-8 shadow-sm">
        <div className="flex items-center space-x-4 mb-6">
          <FaDog className="text-3xl text-luxury-gold" />
          <div>
            <h3 className="text-2xl font-serif">Animaux de compagnie</h3>
            <p className="text-gray-600">Certaines de nos villas acceptent les animaux de compagnie</p>
          </div>
        </div>

        <div className="space-y-6">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setPets(prev => ({ ...prev, hasPets: true }))}
              className={`flex-1 p-4 rounded-lg border-2 transition-all ${
                pets.hasPets
                  ? 'bg-luxury-gold/10 border-luxury-gold'
                  : 'hover:bg-gray-50 border-gray-200'
              }`}
            >
              Oui, je voyage avec des animaux
            </button>
            <button
              onClick={() => setPets(prev => ({ ...prev, hasPets: false, count: 0, type: '', additionalInfo: '' }))}
              className={`flex-1 p-4 rounded-lg border-2 transition-all ${
                !pets.hasPets
                  ? 'bg-luxury-gold/10 border-luxury-gold'
                  : 'hover:bg-gray-50 border-gray-200'
              }`}
            >
              Non, pas d'animaux
            </button>
          </div>

          {pets.hasPets && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-4"
            >
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nombre d'animaux
                </label>
                <input
                  type="number"
                  min="1"
                  max="3"
                  value={pets.count}
                  onChange={(e) => setPets(prev => ({ ...prev, count: parseInt(e.target.value) }))}
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
                  value={pets.type}
                  onChange={(e) => setPets(prev => ({ ...prev, type: e.target.value }))}
                  className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-luxury-gold focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Informations supplémentaires
                </label>
                <textarea
                  placeholder="Taille, race, besoins particuliers..."
                  value={pets.additionalInfo}
                  onChange={(e) => setPets(prev => ({ ...prev, additionalInfo: e.target.value }))}
                  className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-luxury-gold focus:border-transparent"
                  rows={3}
                />
              </div>

              <div className="bg-blue-50 p-4 rounded-lg flex items-start space-x-3">
                <FaInfoCircle className="text-blue-500 mt-1" />
                <p className="text-sm text-blue-700">
                  Des frais supplémentaires peuvent s'appliquer. Certaines villas peuvent avoir des restrictions spécifiques concernant les animaux.
                </p>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );

  const renderStayTypes = () => (
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

  const renderServices = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {SERVICES.map((service) => (
        <button
          key={service.id}
          onClick={() => handleServiceSelection(service.id)}
          className={`p-6 rounded-xl text-left transition-all ${
            selectedServices.includes(service.id)
              ? 'bg-luxury-gold/10 border-luxury-gold shadow-lg'
              : 'bg-white hover:bg-gray-50'
          } border-2 hover:shadow-md`}
        >
          <h3 className="text-xl font-serif font-semibold mb-2">{service.title}</h3>
          <p className="text-gray-600 mb-2">{service.description}</p>
          <p className="text-luxury-gold font-medium">{service.price}</p>
          {/* Indicateur visuel de sélection */}
          <div className="mt-4 flex justify-end">
            <div className={`w-6 h-6 rounded-full border-2 transition-all ${
              selectedServices.includes(service.id)
                ? 'bg-luxury-gold border-luxury-gold'
                : 'border-gray-300'
            }`}>
              {selectedServices.includes(service.id) && (
                <svg className="w-full h-full text-white p-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              )}
            </div>
          </div>
        </button>
      ))}
    </div>
  );

  const renderActivities = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {ACTIVITIES.map((activity) => (
        <button
          key={activity.id}
          onClick={() => handleActivitySelection(activity.id)}
          className={`p-6 rounded-xl text-left transition-all ${
            selectedActivities.includes(activity.id)
              ? 'bg-luxury-gold/10 border-luxury-gold shadow-lg'
              : 'bg-white hover:bg-gray-50'
          } border-2 hover:shadow-md`}
        >
          <h3 className="text-xl font-serif font-semibold mb-2">{activity.title}</h3>
          <p className="text-gray-600 mb-2">{activity.description}</p>
          <p className="text-luxury-gold font-medium">{activity.price}</p>
          {/* Indicateur visuel de sélection */}
          <div className="mt-4 flex justify-end">
            <div className={`w-6 h-6 rounded-full border-2 transition-all ${
              selectedActivities.includes(activity.id)
                ? 'bg-luxury-gold border-luxury-gold'
                : 'border-gray-300'
            }`}>
              {selectedActivities.includes(activity.id) && (
                <svg className="w-full h-full text-white p-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              )}
            </div>
          </div>
        </button>
      ))}
    </div>
  );

  const renderSummary = () => (
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
              const service = SERVICES.find((s) => s.id === serviceId);
              return (
                <li key={serviceId} className="flex justify-between items-center">
                  <span className="text-gray-600">{service?.title}</span>
                  <span className="text-luxury-gold font-medium">{service?.price}</span>
                </li>
              );
            })}
          </ul>
        </div>
      )}

      {selectedActivities.length > 0 && (
        <div className="bg-white p-6 rounded-xl border-2">
          <h3 className="text-xl font-serif font-semibold mb-4">Activités sélectionnées</h3>
          <ul className="space-y-2">
            {selectedActivities.map((activityId) => {
              const activity = ACTIVITIES.find((a) => a.id === activityId);
              return (
                <li key={activityId} className="flex justify-between items-center">
                  <span className="text-gray-600">{activity?.title}</span>
                  <span className="text-luxury-gold font-medium">{activity?.price}</span>
                </li>
              );
            })}
          </ul>
        </div>
      )}

      {pets.hasPets && (
        <div className="bg-white p-6 rounded-xl border-2">
          <h3 className="text-xl font-serif font-semibold mb-4">Animaux de compagnie</h3>
          <p className="text-gray-600">
            Nombre d'animaux : {pets.count}
          </p>
          <p className="text-gray-600">
            Type d'animal : {pets.type}
          </p>
          <p className="text-gray-600">
            Informations supplémentaires : {pets.additionalInfo}
          </p>
        </div>
      )}
    </div>
  );

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1:
        return renderStayTypes();
      case 2:
        return renderServices();
      case 3:
        return renderPetsSection();
      case 4:
        return renderActivities();
      case 5:
        return renderSummary();
      default:
        return null;
    }
  };

  return (
    <div className="max-w-5xl mx-auto">
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
            <div key={step.id} className="relative flex flex-col items-center px-8">
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

              {/* Titre et description */}
              <div className="text-center mt-6">
                <p className="font-medium text-sm mb-2">{step.title}</p>
                <p className="text-xs text-gray-500 max-w-[150px] mx-auto leading-relaxed">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Contenu */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          {renderCurrentStep()}
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
          onClick={() => {
            if (currentStep === CONFIGURATION_STEPS.length) {
              // Handle final submission
              console.log('Configuration finale:', {
                stayType,
                selectedServices,
                selectedActivities,
                pets
              });
            } else {
              setCurrentStep((prev) => Math.min(CONFIGURATION_STEPS.length, prev + 1));
            }
          }}
          className="px-6 py-2 rounded-xl bg-luxury-gold text-white hover:bg-luxury-gold/90 transition-colors"
        >
          {currentStep === CONFIGURATION_STEPS.length ? 'Terminer' : 'Suivant'}
        </button>
      </div>
    </div>
  );
}
