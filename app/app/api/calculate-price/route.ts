import { NextRequest, NextResponse } from 'next/server';

interface PriceCalculationRequest {
  origin: string;
  destination: string;
}

interface PriceCalculationResponse {
  price: number;
  distance: number;
  duration: number;
  distanceText: string;
  durationText: string;
}

export async function POST(request: NextRequest) {
  try {
    const body: PriceCalculationRequest = await request.json();
    const { origin, destination } = body;

    if (!origin || !destination) {
      return NextResponse.json({ error: 'Origin and destination are required' }, { status: 400 });
    }

    const apiKey = process.env.GOOGLE_MAPS_API_KEY || process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: 'Server configuration error' }, { status: 500 });
    }

    const url = new URL('https://maps.googleapis.com/maps/api/distancematrix/json');
    url.searchParams.append('origins', origin);
    url.searchParams.append('destinations', destination);
    url.searchParams.append('units', 'metric');
    url.searchParams.append('language', 'fr');
    url.searchParams.append('key', apiKey);

    const response = await fetch(url.toString());
    if (!response.ok) {
      throw new Error('Distance Matrix API request failed');
    }

    const data = await response.json();
    const element = data?.rows?.[0]?.elements?.[0];
    if (data?.status !== 'OK' || !element || element.status !== 'OK') {
      return NextResponse.json({ error: 'No route found between addresses' }, { status: 400 });
    }

    const distanceInKm = element.distance.value / 1000;
    const durationInMinutes = Math.round(element.duration.value / 60);

    const pricePerKm = 2;
    const minimumPrice = 15;
    let calculatedPrice = distanceInKm * pricePerKm;
    if (calculatedPrice < minimumPrice) {
      calculatedPrice = minimumPrice;
    }
    const finalPrice = Math.round(calculatedPrice / 5) * 5;

    const result: PriceCalculationResponse = {
      price: finalPrice,
      distance: Math.round(distanceInKm * 10) / 10,
      duration: durationInMinutes,
      distanceText: element.distance.text,
      durationText: element.duration.text,
    };

    return NextResponse.json(result);
  } catch (error) {
    console.error('Error calculating price:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
