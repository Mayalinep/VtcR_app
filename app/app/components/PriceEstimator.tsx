'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform, animate } from 'framer-motion';

export default function PriceEstimator() {
  const [departure, setDeparture] = useState('');
  const [arrival, setArrival] = useState('');
  const [estimatedPrice, setEstimatedPrice] = useState<number | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);
  
  // Animation du compteur de prix
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest));
  const [displayPrice, setDisplayPrice] = useState(0);

  useEffect(() => {
    const unsubscribe = rounded.on('change', (latest) => {
      setDisplayPrice(latest);
    });
    return () => unsubscribe();
  }, [rounded]);

  // Calcul fictif du prix (sera remplacé par Google Distance Matrix API plus tard)
  const calculatePrice = () => {
    if (departure && arrival) {
      setIsCalculating(true);
      
      // Simule un délai de calcul
      setTimeout(() => {
        // Prix de base entre 45€ et 85€ pour le MVP
        const basePrice = Math.floor(Math.random() * 40) + 45;
        setEstimatedPrice(basePrice);
        setIsCalculating(false);
        
        // Anime le compteur de 0 à basePrice
        animate(count, basePrice, {
          duration: 1,
          ease: "easeOut"
        });
      }, 500);
    }
  };

  return (
    <div className="relative">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.5 }}
        className="bg-white rounded-2xl p-6 lg:p-6 shadow-xl border border-gray-100"
      >
        {/* Badge */}
        <div 
          className="inline-block px-3 py-1 rounded-full text-xs font-medium mb-3 lg:mb-3"
          style={{ 
            backgroundColor: 'var(--gold-light)',
            color: 'var(--forest-green)'
          }}
        >
          Estimation gratuite
        </div>

        {/* Titre */}
        <h3 className="text-xl lg:text-xl font-bold mb-4 lg:mb-4" style={{ fontFamily: 'var(--font-playfair)' }}>
          Estimez votre course
        </h3>

        {/* Inputs */}
        <div className="space-y-3 lg:space-y-3 mb-4 lg:mb-4">
          {/* Départ */}
          <div>
            <label htmlFor="departure" className="block text-sm font-medium text-gray-700 mb-1.5">
              Départ
            </label>
            <div className="relative">
              <div className="absolute left-3 lg:left-3 top-1/2 -translate-y-1/2 text-gray-400">
                <svg className="w-4 h-4 lg:w-4 lg:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
                className="w-full pl-10 lg:pl-10 pr-3 py-2.5 lg:py-2.5 text-sm rounded-lg border border-gray-200 focus:border-forest-green focus:ring-2 focus:ring-forest-green/20 focus:shadow-md transition-all duration-300 outline-none hover:border-gray-300"
              />
            </div>
          </div>

          {/* Arrivée */}
          <div>
            <label htmlFor="arrival" className="block text-sm font-medium text-gray-700 mb-1.5">
              Arrivée
            </label>
            <div className="relative">
              <div className="absolute left-3 lg:left-3 top-1/2 -translate-y-1/2 text-gray-400">
                <svg className="w-4 h-4 lg:w-4 lg:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
                className="w-full pl-10 lg:pl-10 pr-3 py-2.5 lg:py-2.5 text-sm rounded-lg border border-gray-200 focus:border-forest-green focus:ring-2 focus:ring-forest-green/20 focus:shadow-md transition-all duration-300 outline-none hover:border-gray-300"
              />
            </div>
          </div>
        </div>

        {/* Calcul en cours */}
        <AnimatePresence>
          {isCalculating && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden mb-3 lg:mb-3"
            >
              <div className="flex items-center justify-center gap-2 py-2">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  className="w-4 h-4 border-2 border-forest-green border-t-transparent rounded-full"
                />
                <span className="text-sm text-gray-600">Calcul en cours...</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Prix estimé */}
        <AnimatePresence>
          {estimatedPrice && !isCalculating && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <div 
                className="p-3 lg:p-3 rounded-lg mb-3 lg:mb-3"
                style={{ backgroundColor: 'var(--gold-light)' }}
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium" style={{ color: 'var(--forest-green)' }}>
                    Prix estimé
                  </span>
                  <span className="text-xl lg:text-2xl font-bold" style={{ color: 'var(--forest-green)', fontFamily: 'var(--font-playfair)' }}>
                    {displayPrice}€
                  </span>
                </div>
                <p className="text-xs text-gray-600 mt-1.5">
                  Prix indicatif hors majorations (nuit, bagages...)
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* CTA */}
        <button
          className="w-full py-3 lg:py-3 rounded-lg font-semibold text-sm lg:text-base text-white transition-all duration-300 hover:scale-105 hover:shadow-xl active:scale-95 shadow-md"
          style={{ backgroundColor: 'var(--forest-green)' }}
        >
          Réserver cette course
        </button>

        {/* Info */}
        <p className="text-xs text-gray-500 text-center mt-3 lg:mt-3">
          Sans engagement • Annulation gratuite jusqu'à 2h avant
        </p>
      </motion.div>
    </div>
  );
}
