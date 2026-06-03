'use client';

import { useState } from 'react';
import PriceEstimator from '../forms/PriceEstimator';
import RouteMap from '../RouteMap';

export default function BookingSection() {
  const [departurePlace, setDeparturePlace] = useState<google.maps.places.PlaceResult | null>(null);
  const [arrivalPlace, setArrivalPlace] = useState<google.maps.places.PlaceResult | null>(null);

  return (
    <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
      <div className="w-full lg:w-2/5">
        <PriceEstimator
          onDepartureChange={setDeparturePlace}
          onArrivalChange={setArrivalPlace}
        />
      </div>

      <div className="hidden lg:block lg:w-3/5">
        <div className="sticky top-24 h-[600px] rounded-2xl overflow-hidden shadow-lg border border-gray-200">
          <RouteMap
            origin={departurePlace}
            destination={arrivalPlace}
            height={600}
            className="w-full h-full"
          />
        </div>
      </div>
    </div>
  );
}
