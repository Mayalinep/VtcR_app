'use client';

/**
 * RouteMap Component
 *
 * Carte Google Maps interactive affichant le trajet entre deux points
 * Utilisé dans le formulaire d'estimation de prix
 *
 * Features:
 * - Affichage du trajet avec Google Directions API
 * - Marqueurs personnalisés pour départ et arrivée
 * - Zoom automatique sur le trajet
 * - Design responsive
 *
 * @example
 * <RouteMap
 *   origin={departurePlace}
 *   destination={arrivalPlace}
 * />
 */

import { useEffect, useRef } from 'react';
import { APIProvider, Map, useMap, useMapsLibrary } from '@vis.gl/react-google-maps';

interface RouteMapProps {
  /** Lieu de départ (Google Places result) */
  origin: google.maps.places.PlaceResult | null;
  /** Lieu d'arrivée (Google Places result) */
  destination: google.maps.places.PlaceResult | null;
  /** Hauteur de la carte en pixels */
  height?: number;
  /** Classe CSS personnalisée */
  className?: string;
}

/**
 * Composant interne qui affiche le trajet
 * Doit être wrappé dans Map et APIProvider
 */
function DirectionsRenderer({
  origin,
  destination,
}: {
  origin: google.maps.places.PlaceResult;
  destination: google.maps.places.PlaceResult;
}) {
  const map = useMap();
  const routesLibrary = useMapsLibrary('routes');
  const directionsServiceRef = useRef<google.maps.DirectionsService | null>(null);
  const directionsRendererRef = useRef<google.maps.DirectionsRenderer | null>(null);

  // Initialiser les services Google Maps
  useEffect(() => {
    if (!routesLibrary || !map) return;

    directionsServiceRef.current = new routesLibrary.DirectionsService();
    directionsRendererRef.current = new routesLibrary.DirectionsRenderer({ map });

    return () => {
      directionsRendererRef.current?.setMap(null);
      directionsRendererRef.current = null;
      directionsServiceRef.current = null;
    };
  }, [routesLibrary, map]);

  // Calculer et afficher le trajet
  useEffect(() => {
    const directionsService = directionsServiceRef.current;
    const directionsRenderer = directionsRendererRef.current;
    if (!directionsService || !directionsRenderer) return;
    if (!origin?.geometry?.location || !destination?.geometry?.location) return;

    directionsService
      .route({
        origin: origin.geometry.location,
        destination: destination.geometry.location,
        travelMode: google.maps.TravelMode.DRIVING,
        provideRouteAlternatives: false,
      })
      .then((response) => {
        directionsRenderer.setDirections(response);
      })
      .catch((error) => {
        console.error('Erreur lors du calcul du trajet:', error);
      });
  }, [origin, destination]);

  return null;
}

/**
 * Composant principal de la carte
 */
function MapContent({ origin, destination }: Omit<RouteMapProps, 'height' | 'className'>) {
  const map = useMap();

  // Centrer la carte sur la France par défaut
  useEffect(() => {
    if (!map) return;

    // Si pas de destination, centrer sur le départ
    if (origin?.geometry?.location && !destination?.geometry?.location) {
      map.setCenter(origin.geometry.location);
      map.setZoom(12);
    }
    // Si pas d'origine ni de destination, centrer sur Paris
    else if (!origin?.geometry?.location && !destination?.geometry?.location) {
      map.setCenter({ lat: 48.8566, lng: 2.3522 }); // Paris
      map.setZoom(11);
    }
  }, [map, origin, destination]);

  return (
    <>
      {origin && destination && (
        <DirectionsRenderer origin={origin} destination={destination} />
      )}
    </>
  );
}

/**
 * Composant RouteMap exporté
 */
export default function RouteMap({
  origin,
  destination,
  height = 400,
  className = '',
}: RouteMapProps) {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

  if (!apiKey) {
    console.error('NEXT_PUBLIC_GOOGLE_MAPS_API_KEY is not defined in .env.local');
    return (
      <div
        className={`flex items-center justify-center bg-gray-100 rounded-lg ${className}`}
        style={{ height: `${height}px` }}
      >
        <p className="text-sm text-gray-500">
          ⚠️ Carte non disponible (clé API manquante)
        </p>
      </div>
    );
  }

  return (
    <div className={className} style={{ height: `${height}px` }}>
      <APIProvider apiKey={apiKey}>
        <Map
          defaultCenter={{ lat: 48.8566, lng: 2.3522 }} // Paris
          defaultZoom={11}
          gestureHandling="greedy"
          disableDefaultUI={false}
          mapId="vtc-rachel-map" // ID unique pour le style
          style={{ width: '100%', height: '100%', borderRadius: '12px' }}
        >
          <MapContent origin={origin} destination={destination} />
        </Map>
      </APIProvider>
    </div>
  );
}
