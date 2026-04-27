'use client';

import { useEffect, useRef, useState } from 'react';
import { APIProvider, useMapsLibrary } from '@vis.gl/react-google-maps';

interface AddressAutocompleteProps {
  placeholder?: string;
  onPlaceSelect: (place: google.maps.places.PlaceResult | null) => void;
  onInputChange?: (value: string) => void;
  initialValue?: string;
  className?: string;
  id?: string;
  disabled?: boolean;
}

function AutocompleteInput({
  placeholder = 'Entrez une adresse',
  onPlaceSelect,
  onInputChange,
  initialValue = '',
  className = '',
  id,
  disabled = false,
}: AddressAutocompleteProps) {
  const [inputValue, setInputValue] = useState(initialValue);
  const inputRef = useRef<HTMLInputElement>(null);
  const places = useMapsLibrary('places');

  useEffect(() => {
    setInputValue(initialValue);
  }, [initialValue]);

  useEffect(() => {
    if (!places || !inputRef.current) return;

    const autocomplete = new places.Autocomplete(inputRef.current, {
      componentRestrictions: { country: 'fr' },
      fields: ['formatted_address', 'geometry', 'place_id', 'name', 'address_components'],
    });

    const listener = autocomplete.addListener('place_changed', () => {
      const place = autocomplete.getPlace();
      if (place.geometry) {
        const nextValue = place.formatted_address || place.name || '';
        setInputValue(nextValue);
        onInputChange?.(nextValue);
        onPlaceSelect(place);
      } else {
        onPlaceSelect(null);
      }
    });

    return () => {
      listener.remove();
    };
  }, [places, onPlaceSelect, onInputChange]);

  return (
    <input
      ref={inputRef}
      id={id}
      type="text"
      value={inputValue}
      onChange={(e) => {
        setInputValue(e.target.value);
        onInputChange?.(e.target.value);
        // Si l'utilisateur tape manuellement, la sélection Google n'est plus fiable.
        onPlaceSelect(null);
      }}
      placeholder={placeholder}
      disabled={disabled}
      className={`w-full pr-4 py-3.5 text-sm text-gray-900 bg-gray-100 rounded-lg border-0 focus:bg-white focus:ring-2 focus:ring-gray-300 transition-all duration-200 outline-none placeholder:text-gray-500 disabled:opacity-60 ${className}`}
      autoComplete="off"
      aria-label={placeholder}
    />
  );
}

export default function AddressAutocomplete(props: AddressAutocompleteProps) {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

  if (!apiKey) {
    return (
      <input
        type="text"
        disabled
        placeholder={props.placeholder}
        className={`w-full pr-4 py-3.5 text-sm text-gray-900 bg-gray-100 rounded-lg border-0 outline-none placeholder:text-gray-500 disabled:opacity-60 ${props.className || ''}`}
        aria-label={props.placeholder}
      />
    );
  }

  return (
    <APIProvider apiKey={apiKey}>
      <AutocompleteInput {...props} />
    </APIProvider>
  );
}
