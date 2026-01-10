'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function PriceEstimator() {
  const [departure, setDeparture] = useState('');
  const [arrival, setArrival] = useState('');
  const [estimatedPrice, setEstimatedPrice] = useState<number | null>(null);

  // Calcul fictif du prix (sera remplacé par Google Distance Matrix API plus tard)
  const calculatePrice = () => {
    if (departure && arrival) {
      // Prix de base entre 45€ et 85€ pour le MVP
      const basePrice = Math.floor(Math.random() * 40) + 45;
      setEstimatedPrice(basePrice);
    }
  };

  return (
    <div className="relative">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.5 }}
        className="bg-white rounded-2xl p-6 sm:p-8 shadow-xl border border-gray-100"
      >
        {/* Badge */}
        <div 
          className="inline-block px-3 py-1 rounded-full text-xs font-medium mb-4"
          style={{ 
            backgroundColor: 'var(--gold-light)',
            color: 'var(--forest-green)'
          }}
        >
          Estimation gratuite
        </div>

        {/* Titre */}
        <h3 className="text-xl sm:text-2xl font-bold mb-6" style={{ fontFamily: 'var(--font-playfair)' }}>
          Estimez votre course
        </h3>

        {/* Inputs */}
        <div className="space-y-4 mb-6">
          {/* Départ */}
          <div>
            <label htmlFor="departure" className="block text-sm font-medium text-gray-700 mb-2">
              Départ
            </label>
            <div className="relative">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <input
                id="departure"
                type="text"
                value={departure}
                onChange={(e) => {
                  setDeparture(e.target.value);
                  setEstimatedPrice(null);
                }}
                onBlur={calculatePrice}
                placeholder="Ex: Paris 8e arrondissement"
                className="w-full pl-12 pr-4 py-3 rounded-lg border border-gray-200 focus:border-forest-green focus:ring-2 focus:ring-forest-green/20 transition-all outline-none"
              />
            </div>
          </div>

          {/* Arrivée */}
          <div>
            <label htmlFor="arrival" className="block text-sm font-medium text-gray-700 mb-2">
              Arrivée
            </label>
            <div className="relative">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <input
                id="arrival"
                type="text"
                value={arrival}
                onChange={(e) => {
                  setArrival(e.target.value);
                  setEstimatedPrice(null);
                }}
                onBlur={calculatePrice}
                placeholder="Ex: Aéroport CDG Terminal 2"
                className="w-full pl-12 pr-4 py-3 rounded-lg border border-gray-200 focus:border-forest-green focus:ring-2 focus:ring-forest-green/20 transition-all outline-none"
              />
            </div>
          </div>
        </div>

        {/* Prix estimé */}
        <AnimatePresence>
          {estimatedPrice && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <div 
                className="p-4 rounded-lg mb-4"
                style={{ backgroundColor: 'var(--gold-light)' }}
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium" style={{ color: 'var(--forest-green)' }}>
                    Prix estimé
                  </span>
                  <span className="text-2xl font-bold" style={{ color: 'var(--forest-green)', fontFamily: 'var(--font-playfair)' }}>
                    {estimatedPrice}€
                  </span>
                </div>
                <p className="text-xs text-gray-600 mt-2">
                  Prix indicatif hors majorations (nuit, bagages...)
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* CTA */}
        <button
          className="w-full py-3.5 rounded-lg font-semibold text-white transition-all hover:scale-105 active:scale-95 shadow-md"
          style={{ backgroundColor: 'var(--forest-green)' }}
        >
          Réserver cette course
        </button>

        {/* Info */}
        <p className="text-xs text-gray-500 text-center mt-4">
          Sans engagement • Annulation gratuite jusqu'à 2h avant
        </p>
      </motion.div>
    </div>
  );
}
