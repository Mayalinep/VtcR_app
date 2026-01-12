'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform, animate } from 'framer-motion';

/**
 * PriceEstimator - Estimateur de prix de course VTC (Version Uber-like)
 * 
 * Design minimaliste inspiré d'Uber avec flow progressif :
 * - État 1 : Formulaire + bouton "Voir les prix"
 * - État 2 : Prix affiché + bouton "Réserver maintenant"
 * 
 * Note : Utilise actuellement un calcul fictif (45-85€).
 * À remplacer par Google Distance Matrix API en production.
 */
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

  // Calcul fictif du prix
  const calculatePrice = () => {
    if (departure && arrival) {
      setIsCalculating(true);
      
      setTimeout(() => {
        const basePrice = Math.floor(Math.random() * 40) + 45;
        setEstimatedPrice(basePrice);
        setIsCalculating(false);
        
        animate(count, basePrice, {
          duration: 1,
          ease: "easeOut"
        });
      }, 500);
    }
  };

  // Reset pour modifier le trajet
  const resetEstimation = () => {
    setEstimatedPrice(null);
    setDisplayPrice(0);
  };

  const isFormValid = departure.trim() !== '' && arrival.trim() !== '';

  return (
    <div className="relative">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.5 }}
        className="bg-white rounded-2xl p-6 lg:p-8 shadow-sm border border-gray-100"
      >
        {/* Inputs - Style Uber minimaliste */}
        <div className="space-y-3 mb-6">
          {/* Départ */}
          <div className="relative">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="3" />
              </svg>
            </div>
            <input
              type="text"
              value={departure}
              onChange={(e) => {
                setDeparture(e.target.value);
                if (estimatedPrice) resetEstimation();
              }}
              placeholder="Adresse de départ"
              disabled={estimatedPrice !== null}
              className="w-full pl-12 pr-4 py-3.5 text-sm text-gray-900 bg-gray-100 rounded-lg border-0 focus:bg-white focus:ring-2 focus:ring-gray-300 transition-all duration-200 outline-none placeholder:text-gray-500 disabled:opacity-60"
            />
          </div>

          {/* Ligne de connexion verticale */}
          <div className="flex items-center gap-4 pl-5">
            <div className="w-px h-4 bg-gray-400" />
          </div>

          {/* Arrivée */}
          <div className="relative">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <input
              type="text"
              value={arrival}
              onChange={(e) => {
                setArrival(e.target.value);
                if (estimatedPrice) resetEstimation();
              }}
              placeholder="Destination"
              disabled={estimatedPrice !== null}
              className="w-full pl-12 pr-4 py-3.5 text-sm text-gray-900 bg-gray-100 rounded-lg border-0 focus:bg-white focus:ring-2 focus:ring-gray-300 transition-all duration-200 outline-none placeholder:text-gray-500 disabled:opacity-60"
            />
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
              className="overflow-hidden mb-6"
            >
              <div className="flex items-center justify-center gap-2 py-4">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  className="w-5 h-5 border-2 rounded-full"
                  style={{ 
                    borderColor: 'var(--forest-green)',
                    borderTopColor: 'transparent'
                  }}
                />
                <span className="text-sm text-gray-600">Calcul en cours...</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Prix estimé - Style Uber */}
        <AnimatePresence>
          {estimatedPrice && !isCalculating && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4 }}
              className="mb-6"
            >
              <div className="bg-gray-50 rounded-xl p-5">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium text-gray-600">
                    Tarif estimé
                  </span>
                  <span 
                    className="text-3xl font-bold"
                    style={{ 
                      color: 'var(--forest-green)',
                      fontFamily: 'var(--font-playfair)'
                    }}
                  >
                    {displayPrice}€
                  </span>
                </div>
                <p className="text-xs text-gray-500">
                  Prix indicatif toutes taxes comprises
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* CTA Progressif - Toujours VERT style Uber */}
        {!estimatedPrice ? (
          // État 1 : Bouton "Voir les prix" - TOUJOURS VERT
          <button
            onClick={calculatePrice}
            disabled={!isFormValid || isCalculating}
            className={`
              w-full py-3.5 rounded-lg font-semibold text-sm text-white 
              transition-all duration-200
              ${(!isFormValid || isCalculating) 
                ? 'opacity-80 cursor-not-allowed' 
                : 'opacity-100 hover:scale-[1.02] active:scale-[0.98] cursor-pointer'
              }
            `}
            style={{ backgroundColor: 'var(--forest-green)' }}
          >
            Voir les prix
          </button>
        ) : (
          // État 2 : Bouton "Réserver" + Lien modifier
          <div className="space-y-3">
            <button
              className="w-full py-3.5 rounded-lg font-semibold text-sm text-white transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] shadow-md"
              style={{ backgroundColor: 'var(--forest-green)' }}
            >
              Réserver maintenant
            </button>
            
            <button
              onClick={resetEstimation}
              className="w-full text-sm text-gray-600 hover:text-gray-900 font-medium transition-colors"
            >
              Modifier le trajet
            </button>
          </div>
        )}

        {/* Info discrète */}
        {!estimatedPrice && (
          <p className="text-xs text-gray-400 text-center mt-4">
            Sans engagement • Annulation gratuite jusqu'à 2h avant
          </p>
        )}
      </motion.div>
    </div>
  );
}
