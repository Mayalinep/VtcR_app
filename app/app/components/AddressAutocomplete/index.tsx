'use client';

/**
 * AddressAutocomplete Component
 * 
 * Composant de saisie d'adresse avec autocomplétion Google Places API
 * Utilisé pour les champs "Départ" et "Arrivée" dans le formulaire d'estimation de prix
 * 
 * Features:
 * - Autocomplétion en temps réel via Google Places API
 * - Restriction géographique (France/IDF)
 * - Gestion des états (loading, error, selected)
 * - Accessible et responsive
 * 
 * @example
 * <AddressAutocomplete
 *   placeholder="Adresse de départ"
 *   onPlaceSelect={(place) => console.log(place)}
 * />
 */

import { useRef, useState, useEffect } from 'react';
import { APIProvider, useMapsLibrary } from '@vis.gl/react-google-maps';

interface AddressAutocompleteProps {
  /** Texte du placeholder */
  placeholder?: string;
  /** Callback appelé quand une adresse est sélectionnée */
  onPlaceSelect: (place: google.maps.places.PlaceResult | null) => void;
  /** Classe CSS personnalisée */
  className?: string;
  /** ID du champ (pour l'accessibilité) */
  id?: string;
}

/**
 * Composant interne qui utilise l'API Google Places
 * Doit être wrappé dans APIProvider
 */
function AutocompleteInput({
  placeholder = 'Entrez une adresse',
  onPlaceSelect,
  className = '',
  id,
}: AddressAutocompleteProps) {
  const [inputValue, setInputValue] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const places = useMapsLibrary('places');

  // État pour gérer l'autocomplete
  const [autocomplete, setAutocomplete] = useState<google.maps.places.Autocomplete | null>(null);

  // Initialiser l'autocomplete quand la bibliothèque Places est chargée
  useEffect(() => {
    if (!places || !inputRef.current) return;

    const autocompleteInstance = new places.Autocomplete(inputRef.current, {
      // Restriction géographique : France
      componentRestrictions: { country: 'fr' },
      // Pas de restriction de types = adresses + établissements + lieux
      // (aéroports, gares, hôtels, restaurants, etc.)
      // Champs à récupérer (pour optimiser les coûts)
      fields: ['formatted_address', 'geometry', 'place_id', 'name', 'address_components'],
    });

    // Écouter l'événement de sélection
    autocompleteInstance.addListener('place_changed', () => {
      const place = autocompleteInstance.getPlace();

      if (place.geometry) {
        onPlaceSelect(place);
        setInputValue(place.formatted_address || '');
      } else {
        onPlaceSelect(null);
      }
    });

    setAutocomplete(autocompleteInstance);
  }, [places, onPlaceSelect]);

  return (
    <div className="relative w-full">
      <input
        ref={inputRef}
        id={id}
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder={placeholder}
        className={`
          w-full px-4 py-3 
          border border-gray-300 rounded-lg
          focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent
          text-base
          placeholder:text-gray-400
          transition-all duration-200
          ${className}
        `}
        aria-label={placeholder}
        autoComplete="off"
      />
    </div>
  );
}

/**
 * Composant principal AddressAutocomplete
 * Wrap l'input avec le provider Google Maps API
 */
export default function AddressAutocomplete(props: AddressAutocompleteProps) {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

  if (!apiKey) {
    console.error('NEXT_PUBLIC_GOOGLE_MAPS_API_KEY is not defined in .env.local');
    return (
      <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
        <p className="text-red-800 text-sm">
          ⚠️ Google Maps API key is missing. Please add NEXT_PUBLIC_GOOGLE_MAPS_API_KEY to your .env.local file.
        </p>
      </div>
    );
  }

  return (
    <APIProvider apiKey={apiKey}>
      <AutocompleteInput {...props} />
    </APIProvider>
  );
}
