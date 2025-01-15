'use client';

import { useState } from 'react';
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaClock, FaChevronRight } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simuler un envoi
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsSubmitting(false);
    console.log('Form submitted:', formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-gray-50 to-white">
      {/* Hero Section avec Parallax amélioré */}
      <div className="relative h-[500px] bg-primary overflow-hidden">
        <motion.div
          initial={{ scale: 1.1, opacity: 0.8 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.8, ease: "easeOut" }}
          className="absolute inset-0 bg-cover bg-center bg-fixed transform"
          style={{ 
            backgroundImage: 'url(/images/hero-bg.jpg)',
            backgroundPosition: '50% 30%'
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-transparent" />
        </motion.div>
        <div className="relative container mx-auto px-4 h-full flex items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="max-w-3xl"
          >
            <motion.span 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="inline-block text-luxury-gold text-lg font-medium mb-4"
            >
              Contactez-nous
            </motion.span>
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1 }}
              className="text-6xl md:text-7xl font-serif mb-8 text-white leading-tight"
            >
              Votre Luxe, <br />
              <span className="text-luxury-gold">Notre Passion</span>
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 1.2 }}
              className="text-xl text-gray-200 leading-relaxed max-w-2xl"
            >
              Notre équipe d'experts dédiée est à votre écoute pour créer votre séjour 
              d'exception en Corse. Découvrez l'art de vivre méditerranéen.
            </motion.p>
          </motion.div>
        </div>
        {/* Overlay décoratif */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent" />
      </div>

      {/* Contact Section with Floating Cards */}
      <div className="container mx-auto px-4 -mt-20 relative z-10 mb-24">
        {/* Quick Contact Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-24"
        >
          {[
            { icon: FaPhone, title: 'Téléphone', content: '+33 4 XX XX XX XX', color: 'from-blue-500 to-blue-600', delay: 0 },
            { icon: FaEnvelope, title: 'Email', content: 'contact@corsicaluxury.com', color: 'from-purple-500 to-purple-600', delay: 0.1 },
            { icon: FaMapMarkerAlt, title: 'Adresse', content: 'Porto-Vecchio, Corse', color: 'from-red-500 to-red-600', delay: 0.2 },
            { icon: FaClock, title: 'Horaires', content: 'Lun-Dim: 9h-20h', color: 'from-green-500 to-green-600', delay: 0.3 },
          ].map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 + item.delay }}
              whileHover={{ y: -5, scale: 1.02 }}
              className="bg-white rounded-2xl shadow-xl overflow-hidden group hover:shadow-2xl transition-all duration-300"
            >
              <div className={`p-8 bg-gradient-to-r ${item.color} group-hover:scale-105 transition-transform duration-300`}>
                <item.icon className="text-white text-4xl transform group-hover:scale-110 transition-transform duration-300" />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.content}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Contact Form Section */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="bg-white rounded-2xl shadow-xl p-8 lg:p-12 order-2 lg:order-1 hover:shadow-2xl transition-shadow duration-300"
          >
            <h2 className="text-4xl font-serif text-gray-900 mb-8">Envoyez-nous un message</h2>
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <motion.div 
                  className="space-y-2"
                  whileTap={{ scale: 0.995 }}
                >
                  <label htmlFor="name" className="text-sm font-medium text-gray-700">
                    Nom complet
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      onFocus={() => setFocusedField('name')}
                      onBlur={() => setFocusedField(null)}
                      className="w-full px-5 py-4 rounded-xl border border-gray-200 focus:ring-4 focus:ring-luxury-gold/20 focus:border-luxury-gold transition-all duration-200 bg-gray-50 focus:bg-white"
                      required
                    />
                    <AnimatePresence>
                      {focusedField === 'name' && (
                        <motion.span
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.8 }}
                          className="absolute right-4 top-1/2 -translate-y-1/2 text-luxury-gold"
                        >
                          <FaChevronRight />
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.div>

                <motion.div 
                  className="space-y-2"
                  whileTap={{ scale: 0.995 }}
                >
                  <label htmlFor="email" className="text-sm font-medium text-gray-700">
                    Email
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      onFocus={() => setFocusedField('email')}
                      onBlur={() => setFocusedField(null)}
                      className="w-full px-5 py-4 rounded-xl border border-gray-200 focus:ring-4 focus:ring-luxury-gold/20 focus:border-luxury-gold transition-all duration-200 bg-gray-50 focus:bg-white"
                      required
                    />
                    <AnimatePresence>
                      {focusedField === 'email' && (
                        <motion.span
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.8 }}
                          className="absolute right-4 top-1/2 -translate-y-1/2 text-luxury-gold"
                        >
                          <FaChevronRight />
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.div>
              </div>

              <motion.div 
                className="space-y-2"
                whileTap={{ scale: 0.995 }}
              >
                <label htmlFor="subject" className="text-sm font-medium text-gray-700">
                  Sujet
                </label>
                <div className="relative">
                  <select
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    onFocus={() => setFocusedField('subject')}
                    onBlur={() => setFocusedField(null)}
                    className="w-full px-5 py-4 rounded-xl border border-gray-200 focus:ring-4 focus:ring-luxury-gold/20 focus:border-luxury-gold transition-all duration-200 bg-gray-50 focus:bg-white appearance-none"
                    required
                  >
                    <option value="">Sélectionnez un sujet</option>
                    <option value="reservation">Réservation de villa</option>
                    <option value="information">Demande d'information</option>
                    <option value="concierge">Services de conciergerie</option>
                    <option value="partnership">Proposition de partenariat</option>
                    <option value="other">Autre demande</option>
                  </select>
                  <AnimatePresence>
                    {focusedField === 'subject' && (
                      <motion.span
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-luxury-gold"
                      >
                        <FaChevronRight />
                      </motion.span>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>

              <motion.div 
                className="space-y-2"
                whileTap={{ scale: 0.995 }}
              >
                <label htmlFor="message" className="text-sm font-medium text-gray-700">
                  Message
                </label>
                <div className="relative">
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    onFocus={() => setFocusedField('message')}
                    onBlur={() => setFocusedField(null)}
                    rows={6}
                    className="w-full px-5 py-4 rounded-xl border border-gray-200 focus:ring-4 focus:ring-luxury-gold/20 focus:border-luxury-gold transition-all duration-200 bg-gray-50 focus:bg-white resize-none"
                    required
                  />
                  <AnimatePresence>
                    {focusedField === 'message' && (
                      <motion.span
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        className="absolute right-4 top-6 text-luxury-gold"
                      >
                        <FaChevronRight />
                      </motion.span>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={isSubmitting}
                className={`w-full bg-gradient-to-r from-luxury-gold to-yellow-600 text-white py-5 px-8 rounded-xl font-medium 
                  hover:from-yellow-600 hover:to-luxury-gold transition-all duration-300 shadow-lg hover:shadow-xl 
                  disabled:opacity-70 disabled:cursor-not-allowed relative overflow-hidden group`}
              >
                <span className={`absolute inset-0 bg-white transform transition-transform duration-300 
                  ${isSubmitting ? 'translate-x-0' : '-translate-x-full'} group-hover:translate-x-0 opacity-10`} />
                <span className="relative inline-flex items-center justify-center">
                  {isSubmitting ? 'Envoi en cours...' : 'Envoyer le message'}
                </span>
              </motion.button>
            </form>
          </motion.div>

          {/* Map and Info Section */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="order-1 lg:order-2 space-y-8"
          >
            <div className="bg-white rounded-2xl shadow-xl p-8 lg:p-12 mb-8 hover:shadow-2xl transition-shadow duration-300">
              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1 }}
                className="text-4xl font-serif text-gray-900 mb-6"
              >
                Notre Bureau
              </motion.h2>
              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 1.2 }}
                className="text-gray-600 leading-relaxed mb-8"
              >
                Situé au cœur de Porto-Vecchio, notre bureau vous accueille dans un cadre luxueux et convivial. 
                Notre équipe multilingue est à votre disposition pour vous présenter notre collection de 
                villas d'exception et vous aider à organiser votre séjour de rêve en Corse.
              </motion.p>
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.4 }}
                className="h-[500px] rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300"
              >
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d24037.980414300533!2d9.259650274903839!3d41.59071843810624!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12d9c4cb5e449529%3A0x40819a5fd970520!2sPorto-Vecchio%2C%20France!5e0!3m2!1sfr!2sfr!4v1705220577175!5m2!1sfr!2sfr"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
