import { NextRequest, NextResponse } from 'next/server';

/**
 * API Route : /api/calculate-price
 * 
 * Calcule le prix d'une course VTC en utilisant Google Distance Matrix API
 * 
 * Grille tarifaire de Rachel :
 * - 2€ par km (prix approximatif pour MVP)
 * - Prix minimum : 15€
 * - Arrondi au multiple de 5€ le plus proche
 * 
 * @param origin - Adresse de départ
 * @param destination - Adresse d'arrivée
 * @returns { price, distance, duration }
 */

interface PriceCalculationRequest {
  origin: string;
  destination: string;
}

interface PriceCalculationResponse {
  price: number;
  distance: number; // en km
  duration: number; // en minutes
  distanceText: string;
  durationText: string;
}

export async function POST(request: NextRequest) {
  try {
    // 1. Récupérer les données de la requête
    const body: PriceCalculationRequest = await request.json();
    const { origin, destination } = body;

    // 2. Valider les données
    if (!origin || !destination) {
      return NextResponse.json(
        { error: 'Origin and destination are required' },
        { status: 400 }
      );
    }

    // 3. Récupérer la clé API (côté serveur seulement)
    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
    
    if (!apiKey) {
      console.error('NEXT_PUBLIC_GOOGLE_MAPS_API_KEY is not defined');
      return NextResponse.json(
        { error: 'Server configuration error' },
        { status: 500 }
      );
    }

    // 4. Appeler Google Distance Matrix API
    const distanceMatrixUrl = new URL(
      'https://maps.googleapis.com/maps/api/distancematrix/json'
    );
    
    distanceMatrixUrl.searchParams.append('origins', origin);
    distanceMatrixUrl.searchParams.append('destinations', destination);
    distanceMatrixUrl.searchParams.append('units', 'metric');
    distanceMatrixUrl.searchParams.append('language', 'fr');
    distanceMatrixUrl.searchParams.append('key', apiKey);

    const response = await fetch(distanceMatrixUrl.toString());
    
    if (!response.ok) {
      throw new Error('Distance Matrix API request failed');
    }

    const data = await response.json();

    // 5. Vérifier la réponse
    if (data.status !== 'OK') {
      console.error('Distance Matrix API error:', data.status);
      return NextResponse.json(
        { error: 'Unable to calculate distance' },
        { status: 400 }
      );
    }

    const element = data.rows[0]?.elements[0];

    if (!element || element.status !== 'OK') {
      console.error('No route found between origin and destination');
      return NextResponse.json(
        { error: 'No route found between addresses' },
        { status: 400 }
      );
    }

    // 6. Extraire distance et durée
    const distanceInMeters = element.distance.value;
    const distanceInKm = distanceInMeters / 1000;
    const durationInSeconds = element.duration.value;
    const durationInMinutes = Math.round(durationInSeconds / 60);

    // 7. Calculer le prix selon la grille de Rachel
    const pricePerKm = 2; // 2€/km comme Rachel l'a dit
    const minimumPrice = 15; // Prix minimum
    
    let calculatedPrice = distanceInKm * pricePerKm;
    
    // Appliquer le prix minimum
    if (calculatedPrice < minimumPrice) {
      calculatedPrice = minimumPrice;
    }
    
    // Arrondir au multiple de 5€ le plus proche (pour un prix plus "pro")
    const finalPrice = Math.round(calculatedPrice / 5) * 5;

    // 8. Retourner le résultat
    const result: PriceCalculationResponse = {
      price: finalPrice,
      distance: Math.round(distanceInKm * 10) / 10, // Arrondi à 1 décimale
      duration: durationInMinutes,
      distanceText: element.distance.text,
      durationText: element.duration.text,
    };

    return NextResponse.json(result);

  } catch (error) {
    console.error('Error calculating price:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
