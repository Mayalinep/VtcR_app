'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence, useMotionValue, useTransform, animate } from 'framer-motion';
import AddressAutocomplete from '@/app/components/AddressAutocomplete';

/**
 * PriceEstimator - Estimateur de prix de course VTC (Version Uber-like)
 * 
 * Design minimaliste inspiré d'Uber avec flow progressif :
 * - État 1 : Formulaire + bouton "Voir les prix"
 * - État 2 : Prix affiché + bouton "Réserver maintenant"
 * 
 * Features :
 * - Autocomplétion Google Places API pour adresses
 * - Calcul de prix réel via Google Distance Matrix API
 * - Animation fluide du prix
 * - Design Uber-like minimaliste
 */

interface PriceEstimatorProps {
  /** Callback appelé quand le départ change (pour mettre à jour la carte) */
  onDepartureChange?: (place: google.maps.places.PlaceResult | null) => void;
  /** Callback appelé quand l'arrivée change (pour mettre à jour la carte) */
  onArrivalChange?: (place: google.maps.places.PlaceResult | null) => void;
}

export default function PriceEstimator({
  onDepartureChange,
  onArrivalChange,
}: PriceEstimatorProps = {}) {
  const router = useRouter();
  
  // États pour les lieux sélectionnés (pas juste des strings)
  const [departurePlace, setDeparturePlace] = useState<google.maps.places.PlaceResult | null>(null);
  const [arrivalPlace, setArrivalPlace] = useState<google.maps.places.PlaceResult | null>(null);
  const [estimatedPrice, setEstimatedPrice] = useState<number | null>(null);
  const [distance, setDistance] = useState<string | null>(null);
  const [duration, setDuration] = useState<string | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
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

  // Calcul RÉEL du prix via Google Distance Matrix API
  const calculatePrice = async () => {
    if (!departurePlace || !arrivalPlace) return;
    
    setIsCalculating(true);
    setError(null);
    
    try {
      const response = await fetch('/api/calculate-price', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          origin: departurePlace.formatted_address,
          destination: arrivalPlace.formatted_address,
        }),
      });
      
      if (!response.ok) {
        throw new Error('Erreur lors du calcul du prix');
      }
      
      const data = await response.json();
      
      setEstimatedPrice(data.price);
      setDistance(data.distanceText);
      setDuration(data.durationText);
      setIsCalculating(false);
      
      // Animation du compteur
      animate(count, data.price, {
        duration: 1,
        ease: "easeOut"
      });
    } catch (err) {
      setError('Impossible de calculer le prix. Veuillez réessayer.');
      setIsCalculating(false);
      console.error('Prix calculation error:', err);
    }
  };

  // Reset pour modifier le trajet
  const resetEstimation = () => {
    setEstimatedPrice(null);
    setDistance(null);
    setDuration(null);
    setDisplayPrice(0);
    setError(null);
  };

  const isFormValid = departurePlace !== null && arrivalPlace !== null;

  // Fonction pour rediriger vers la page de réservation
  const handleReservation = () => {
    if (!departurePlace || !arrivalPlace || !estimatedPrice || !distance || !duration) return;

    const params = new URLSearchParams({
      departure: departurePlace.formatted_address || '',
      arrival: arrivalPlace.formatted_address || '',
      price: estimatedPrice.toString(),
      distance: distance,
      duration: duration,
    });

    router.push(`/reserver?${params.toString()}`);
  };

  return (
    <div className="relative">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.5 }}
        className="bg-white rounded-2xl p-6 lg:p-8 shadow-sm border border-gray-100"
      >
        {/* Inputs - Style Uber minimaliste avec autocomplétion Google */}
        <div className="space-y-3 mb-6">
          {/* Départ */}
          <div className="relative">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 z-10 pointer-events-none">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="3" />
              </svg>
            </div>
            <AddressAutocomplete
              placeholder="Adresse de départ"
              onPlaceSelect={(place) => {
                setDeparturePlace(place);
                onDepartureChange?.(place); // Notifier la page parent
                if (estimatedPrice) resetEstimation();
              }}
              className="pl-12 bg-gray-100 focus:bg-white disabled:opacity-60"
              id="departure-input"
            />
          </div>

          {/* Ligne de connexion verticale */}
          <div className="flex items-center gap-4 pl-5">
            <div className="w-px h-4 bg-gray-400" />
          </div>

          {/* Arrivée */}
          <div className="relative">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 z-10 pointer-events-none">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <AddressAutocomplete
              placeholder="Destination"
              onPlaceSelect={(place) => {
                setArrivalPlace(place);
                onArrivalChange?.(place); // Notifier la page parent
                if (estimatedPrice) resetEstimation();
              }}
              className="pl-12 bg-gray-100 focus:bg-white disabled:opacity-60"
              id="arrival-input"
            />
          </div>
        </div>

        {/* Message d'erreur */}
        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-sm text-red-800">{error}</p>
          </div>
        )}

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
                <div className="flex items-center justify-between mb-3">
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
                
                {/* Détails du trajet */}
                {distance && duration && (
                  <div className="flex items-center gap-4 mb-2 pb-3 border-b border-gray-200">
                    <div className="flex items-center gap-1.5 text-xs text-gray-600">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                      </svg>
                      <span>{distance}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-xs text-gray-600">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span>{duration}</span>
                    </div>
                  </div>
                )}
                
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
              onClick={handleReservation}
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
