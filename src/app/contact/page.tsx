'use client';

import { useState } from 'react';
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaClock, FaChevronRight, FaWhatsapp, FaInstagram } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { getImagePath } from '@/utils/imagePath';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    preferredContact: 'email'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simuler un envoi
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 5000);
    console.log('Form submitted:', formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f8f3e9] via-white to-[#f8f3e9]">
      {/* Hero Section avec Parallax */}
      <div className="relative h-[600px] overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src={getImagePath('images/porto-vecchio-1.jpg')}
            alt="Vue aérienne de Porto-Vecchio"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/50" />
          {/* Pattern overlay */}
          <div 
            className="absolute inset-0 opacity-30"
            style={{
              backgroundImage: `url(${getImagePath('images/pattern-bg.jpg')})`,
              backgroundRepeat: 'repeat',
              backgroundSize: '100px'
            }}
          />
        </div>
        <div className="relative container mx-auto px-4 h-full flex flex-col justify-center items-center text-center pt-48">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-luxury-gold text-lg font-medium tracking-wider uppercase mb-4"
          >
            Contactez-nous
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-5xl md:text-6xl font-bold text-white mb-6"
          >
            Une Équipe à Votre Service
          </motion.h1>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className="w-24 h-1 bg-luxury-gold mb-8"
          />
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-xl md:text-2xl text-white/90 max-w-2xl mb-12 leading-relaxed"
          >
            Notre équipe est à votre disposition pour vous aider à trouver la villa de vos rêves en Corse
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="flex flex-wrap justify-center gap-8 mt-8"
          >
            <div className="bg-white/10 backdrop-blur-md px-8 py-6 rounded-xl text-center transform hover:scale-105 transition-all duration-300 border border-white/10">
              <div className="text-4xl font-bold text-luxury-gold mb-2">12+</div>
              <div className="text-white text-sm font-medium tracking-wide uppercase">Années d'expérience</div>
            </div>
            <div className="bg-white/10 backdrop-blur-md px-8 py-6 rounded-xl text-center transform hover:scale-105 transition-all duration-300 border border-white/10">
              <div className="text-4xl font-bold text-luxury-gold mb-2">100%</div>
              <div className="text-white text-sm font-medium tracking-wide uppercase">Satisfaction client</div>
            </div>
            <div className="bg-white/10 backdrop-blur-md px-8 py-6 rounded-xl text-center transform hover:scale-105 transition-all duration-300 border border-white/10">
              <div className="text-4xl font-bold text-luxury-gold mb-2">24/7</div>
              <div className="text-white text-sm font-medium tracking-wide uppercase">Support client</div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="mt-12"
          >
            <a
              href="#contact-form"
              className="bg-luxury-gold text-white px-8 py-4 rounded-full font-medium hover:bg-luxury-gold/90 transition-all duration-300 flex items-center gap-2 group"
            >
              Contactez-nous maintenant
              <FaChevronRight className="transform group-hover:translate-x-1 transition-transform duration-300" />
            </a>
          </motion.div>
        </div>
      </div>

      {/* Section Principale avec fond décoratif */}
      <div className="relative">
        <div 
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `url(${getImagePath('images/pattern-bg.jpg')})`,
            backgroundRepeat: 'repeat',
            backgroundSize: '100px'
          }}
        />
        <div className="container mx-auto px-4 py-16 relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Informations de Contact */}
            <div className="space-y-8">
              <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-luxury p-8 space-y-6 border border-luxury-gold/10">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Nos Coordonnées</h2>
                
                <div className="flex items-start space-x-4">
                  <div className="bg-[#f8f3e9] p-3 rounded-lg">
                    <FaPhone className="text-luxury-gold w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800">Téléphone</h3>
                    <p className="text-gray-600">+33 (0)4 95 XX XX XX</p>
                    <p className="text-sm text-gray-500 mt-1">Du lundi au samedi, 9h-19h</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-[#f8f3e9] p-3 rounded-lg">
                    <FaEnvelope className="text-luxury-gold w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800">Email</h3>
                    <p className="text-gray-600">contact@corsica-luxury.com</p>
                    <p className="text-sm text-gray-500 mt-1">Réponse sous 24h</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-[#f8f3e9] p-3 rounded-lg">
                    <FaMapMarkerAlt className="text-luxury-gold w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800">Adresse</h3>
                    <p className="text-gray-600">20169 Bonifacio, Corse</p>
                    <p className="text-sm text-gray-500 mt-1">Sur rendez-vous uniquement</p>
                  </div>
                </div>
              </div>

              {/* Réseaux Sociaux */}
              <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-luxury p-8 border border-luxury-gold/10">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Suivez-nous</h2>
                <div className="flex space-x-4">
                  <a href="#" className="bg-luxury-gold/10 p-4 rounded-lg hover:bg-luxury-gold hover:text-white transition-all duration-300">
                    <FaInstagram className="w-6 h-6" />
                  </a>
                  <a href="#" className="bg-luxury-gold/10 p-4 rounded-lg hover:bg-luxury-gold hover:text-white transition-all duration-300">
                    <FaWhatsapp className="w-6 h-6" />
                  </a>
                </div>
              </div>
            </div>

            {/* Formulaire de Contact */}
            <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-luxury p-8 border border-luxury-gold/10">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Envoyez-nous un message</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Nom complet</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg border border-luxury-gold/20 focus:ring-2 focus:ring-luxury-gold focus:border-transparent transition-all duration-300 bg-white"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg border border-luxury-gold/20 focus:ring-2 focus:ring-luxury-gold focus:border-transparent transition-all duration-300 bg-white"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Téléphone</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-luxury-gold/20 focus:ring-2 focus:ring-luxury-gold focus:border-transparent transition-all duration-300 bg-white"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Sujet</label>
                  <select
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-luxury-gold/20 focus:ring-2 focus:ring-luxury-gold focus:border-transparent transition-all duration-300 bg-white"
                    required
                  >
                    <option value="">Sélectionnez un sujet</option>
                    <option value="reservation">Réservation</option>
                    <option value="information">Demande d'information</option>
                    <option value="partnership">Partenariat</option>
                    <option value="other">Autre</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={4}
                    className="w-full px-4 py-3 rounded-lg border border-luxury-gold/20 focus:ring-2 focus:ring-luxury-gold focus:border-transparent transition-all duration-300 bg-white resize-none"
                    required
                  ></textarea>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Mode de contact préféré</label>
                  <div className="flex space-x-4">
                    <label className="flex items-center space-x-2">
                      <input
                        type="radio"
                        name="preferredContact"
                        value="email"
                        checked={formData.preferredContact === 'email'}
                        onChange={handleChange}
                        className="text-luxury-gold focus:ring-luxury-gold"
                      />
                      <span>Email</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input
                        type="radio"
                        name="preferredContact"
                        value="phone"
                        checked={formData.preferredContact === 'phone'}
                        onChange={handleChange}
                        className="text-luxury-gold focus:ring-luxury-gold"
                      />
                      <span>Téléphone</span>
                    </label>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full bg-luxury-gold text-white py-3 px-6 rounded-lg font-medium
                           hover:bg-luxury-gold/90 transition-all duration-300 flex items-center justify-center shadow-md hover:shadow-lg
                           ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
                >
                  {isSubmitting ? (
                    <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <>
                      Envoyer le message
                      <FaChevronRight className="ml-2" />
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Message de succès */}
      <AnimatePresence>
        {showSuccess && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-8 right-8 bg-green-500 text-white px-6 py-4 rounded-lg shadow-lg backdrop-blur-sm"
          >
            Message envoyé avec succès ! Nous vous répondrons dans les plus brefs délais.
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ContactPage;
