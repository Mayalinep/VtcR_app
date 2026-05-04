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
  estimationSource?: 'google' | 'fallback';
}

type DestinationPreset = {
  keywords: string[];
  price: number;
  distance: number;
  duration: number;
};

const DESTINATION_PRESETS: DestinationPreset[] = [
  { keywords: ['cdg', 'charles de gaulle', 'roissy'], price: 78, distance: 31, duration: 42 },
  { keywords: ['orly'], price: 65, distance: 23, duration: 36 },
  { keywords: ['beauvais'], price: 140, distance: 85, duration: 72 },
  { keywords: ['gare de lyon'], price: 24, distance: 9, duration: 24 },
  { keywords: ['gare du nord', 'gare nord'], price: 28, distance: 10, duration: 28 },
  { keywords: ['montparnasse'], price: 20, distance: 7, duration: 21 },
  { keywords: ['tour eiffel', 'eiffel'], price: 20, distance: 8, duration: 22 },
  { keywords: ['louvre'], price: 18, distance: 6, duration: 19 },
  { keywords: ['opera garnier', 'opera'], price: 22, distance: 7, duration: 21 },
  { keywords: ['versailles'], price: 95, distance: 36, duration: 55 },
  { keywords: ['disney', 'disneyland'], price: 142, distance: 48, duration: 62 },
];

function normalizeText(value: string): string {
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function extractDepartmentCode(text: string): number | null {
  const postal = text.match(/\b(75|77|78|91|92|93|94|95)\d{3}\b/);
  if (postal) return Number(postal[1]);
  const dept = text.match(/\b(75|77|78|91|92|93|94|95)\b/);
  if (dept) return Number(dept[1]);
  return null;
}

function roundToNearestFive(value: number): number {
  return Math.round(value / 5) * 5;
}

function estimateFallback(origin: string, destination: string): PriceCalculationResponse {
  const normalizedOrigin = normalizeText(origin);
  const normalizedDestination = normalizeText(destination);
  const merged = `${normalizedOrigin} ${normalizedDestination}`;

  const preset = DESTINATION_PRESETS.find((item) =>
    item.keywords.some((k) => normalizedDestination.includes(k) || merged.includes(k))
  );

  if (preset) {
    return {
      price: preset.price,
      distance: preset.distance,
      duration: preset.duration,
      distanceText: `~${preset.distance} km`,
      durationText: `~${preset.duration} min`,
      estimationSource: 'fallback',
    };
  }

  const originDept = extractDepartmentCode(normalizedOrigin);
  const destinationDept = extractDepartmentCode(normalizedDestination);
  const destinationInParis =
    normalizedDestination.includes('paris') || /\b75\d{3}\b/.test(normalizedDestination);

  let distance = 20;
  let duration = 35;
  let price = 45;

  if (destinationInParis) {
    distance = 10;
    duration = 24;
    price = 28;
  } else if (destinationDept !== null && [92, 93, 94].includes(destinationDept)) {
    distance = 18;
    duration = 33;
    price = 40;
  } else if (destinationDept !== null && [77, 78, 91, 95].includes(destinationDept)) {
    distance = 32;
    duration = 52;
    price = 68;
  }

  if (originDept !== null && destinationDept !== null && originDept === destinationDept) {
    price -= 8;
    distance = Math.max(6, distance - 5);
    duration = Math.max(15, duration - 7);
  }

  const finalPrice = Math.max(15, roundToNearestFive(price));
  return {
    price: finalPrice,
    distance: Math.round(distance * 10) / 10,
    duration: Math.round(duration),
    distanceText: `~${Math.round(distance)} km`,
    durationText: `~${Math.round(duration)} min`,
    estimationSource: 'fallback',
  };
}

export async function POST(request: NextRequest) {
  let origin = '';
  let destination = '';

  try {
    const body: PriceCalculationRequest = await request.json();
    origin = body.origin;
    destination = body.destination;

    if (!origin || !destination) {
      return NextResponse.json({ error: 'Origin and destination are required' }, { status: 400 });
    }

    const apiKey = process.env.GOOGLE_MAPS_API_KEY || process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
    if (!apiKey) {
      return NextResponse.json(estimateFallback(origin, destination));
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
      return NextResponse.json(estimateFallback(origin, destination));
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
      estimationSource: 'google',
    };

    return NextResponse.json(result);
  } catch (error) {
    console.error('Error calculating price:', error);
    if (origin && destination) {
      return NextResponse.json(estimateFallback(origin, destination));
    }
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
