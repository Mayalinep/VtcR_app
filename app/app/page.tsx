'use client';

import { useState } from 'react';
import Image from 'next/image';
import Navigation from './components/layout/Navigation';
import Footer from './components/layout/Footer';
import FadeIn from './components/animations/FadeIn';
import FadeInSection from './components/animations/FadeInSection';
import PriceEstimator from './components/forms/PriceEstimator';
import RouteMap from './components/RouteMap';
import HeroScrollIndicator from './components/ui/HeroScrollIndicator';
import Badge from './components/ui/Badge';
import Testimonials from './components/sections/Testimonials';
import { FEATURES_DATA } from './lib/data/features';
import { ZONES_DATA, ZONES_DESCRIPTION, ZONES_ADDITIONAL_TEXT } from './lib/data/zones';

export default function Home() {
  // État partagé entre PriceEstimator et RouteMap
  const [departurePlace, setDeparturePlace] = useState<google.maps.places.PlaceResult | null>(null);
  const [arrivalPlace, setArrivalPlace] = useState<google.maps.places.PlaceResult | null>(null);
  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      {/* Hero Section - Full-screen avec image VTC Rachel */}
      <main className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Image Background - Voiture VTC Rachel */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/vtc-rachel-car.png"
            alt="Voiture VTC Rachel - Berline premium Île-de-France"
            fill
            priority
            quality={85}
            className="object-cover object-center"
            sizes="100vw"
          />
          {/* Overlay gradient vert forêt - Style premium */}
          <div 
            className="absolute inset-0"
            style={{
              background: 'linear-gradient(to right, rgba(15, 76, 58, 0.85) 0%, rgba(15, 76, 58, 0.7) 40%, rgba(15, 76, 58, 0.4) 70%, transparent 100%)'
            }}
          />
        </div>

        {/* Contenu Hero par-dessus l'image */}
        <div className="relative z-10 max-w-7xl mx-auto w-full px-4 sm:px-6">
          {/* Hero aligné à gauche - Style Uber */}
          <div className="max-w-2xl text-left">
            <FadeIn delay={0.3}>
              <div className="inline-block px-4 py-2 rounded-full text-sm font-medium mb-8 backdrop-blur-sm"
                style={{ 
                  backgroundColor: 'rgba(212, 175, 55, 0.15)',
                  color: '#D4AF37',
                  border: '1px solid rgba(212, 175, 55, 0.3)'
                }}
              >
                🏆 Service Premium Île-de-France
              </div>
            </FadeIn>
            
            <FadeIn delay={0.5}>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight mb-6 tracking-tight text-white" style={{ fontFamily: 'var(--font-playfair)' }}>
                Votre chauffeur
                <br />
                de confiance
              </h1>
            </FadeIn>
            
            <FadeIn delay={0.7}>
              <p className="text-base sm:text-lg lg:text-xl text-white/90 mb-10 leading-relaxed max-w-xl">
                Réservez votre course VTC en quelques clics. Service professionnel, 
                confort premium, tarifs transparents.
              </p>
            </FadeIn>

            <FadeIn delay={0.9}>
              <div className="flex flex-col sm:flex-row gap-4 max-w-md sm:max-w-none">
                <button 
                  className="px-10 py-4 rounded-lg font-semibold transition-all hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl text-base"
                  style={{ 
                    backgroundColor: 'var(--gold-champagne)',
                    color: 'var(--forest-green)'
                  }}
                >
                  Réserver maintenant
                </button>
                <button 
                  className="px-10 py-3.5 rounded-lg font-medium transition-all hover:scale-105 active:scale-95 backdrop-blur-sm border-2 border-white text-white hover:bg-white/10 text-base"
                >
                  En savoir plus
                </button>
              </div>
            </FadeIn>
          </div>
        </div>

        {/* Flèche de scroll animée avec texte - Version blanche pour contraste */}
        <HeroScrollIndicator />
      </main>

      {/* Section Estimateur de prix - Split avec Map */}
      <section className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6" style={{ backgroundColor: '#FAFAF9' }}>
        <div className="max-w-7xl mx-auto">
          {/* Layout Split : Titre + Formulaire | Map */}
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
            {/* GAUCHE : Titre + Formulaire - 40% desktop, 100% mobile */}
            <div className="w-full lg:w-2/5">
              {/* Titre minimaliste - Style Uber (aligné à gauche sur tous écrans) */}
              <FadeInSection delay={0}>
                <div className="text-left mb-6">
                  <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-3" style={{ fontFamily: 'var(--font-playfair)' }}>
                    Réservez votre course
                  </h2>
                  <p className="text-gray-500 text-sm sm:text-base">
                    Tarif instantané • Réservation en 2 clics
                  </p>
                </div>
              </FadeInSection>

              {/* Formulaire */}
              <PriceEstimator 
                onDepartureChange={setDeparturePlace}
                onArrivalChange={setArrivalPlace}
              />
            </div>

            {/* DROITE : Map Google Interactive - Desktop uniquement (hidden mobile) */}
            <div className="hidden lg:block lg:w-3/5">
              <FadeInSection delay={0.2}>
                <div className="sticky top-24">
                  <RouteMap 
                    origin={departurePlace}
                    destination={arrivalPlace}
                    height={600}
                    className="shadow-lg border border-gray-200"
                  />
                </div>
              </FadeInSection>
            </div>
          </div>
        </div>
      </section>

      {/* Pourquoi nous choisir Section - Style Uber */}
      <FadeInSection delay={0}>
        <section className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6">
          <div className="max-w-6xl mx-auto">
            {/* Titre - Aligné à gauche sur tous écrans */}
            <div className="text-left mb-10 sm:mb-12">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-3" style={{ fontFamily: 'var(--font-playfair)' }}>
                Pourquoi choisir <span style={{ color: 'var(--forest-green)' }}>VTC Rachel</span> ?
              </h2>
              <p className="text-gray-600 text-sm sm:text-base max-w-3xl">
                Votre confort et votre sérénité au cœur de chaque trajet
              </p>
            </div>

            {/* 3 cartes style Uber */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10">
              {FEATURES_DATA.map((feature, i) => (
                <FadeInSection key={feature.id} delay={i * 0.15}>
                  <div className="text-left group">
                    {/* Icône */}
                    <div className="mb-3">
                      {feature.icon}
                    </div>

                    {/* Titre */}
                    <h3 className="text-base font-bold mb-2 text-gray-900">
                      {feature.title}
                    </h3>

                    {/* Description */}
                    <p className="text-xs text-gray-600 leading-snug mb-3">
                      {feature.description}
                    </p>

                    {/* Lien "En savoir plus" */}
                    <button className="text-xs font-medium text-gray-700 hover:text-gray-900 underline decoration-1 underline-offset-2 transition-colors">
                      En savoir plus
                    </button>
                  </div>
                </FadeInSection>
              ))}
            </div>
          </div>
        </section>
      </FadeInSection>

      {/* Témoignages */}
      <main className="px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          {/* Témoignages */}
          <FadeInSection delay={0}>
            <section className="mt-20 sm:mt-28 lg:mt-36">
              <div className="text-center mb-12 sm:mb-16 px-4">
                <Badge className="mb-6">
                  Ils nous font confiance
                </Badge>
                <h2 className="text-3xl sm:text-4xl font-bold mb-4" style={{ fontFamily: 'var(--font-playfair)' }}>
                  Ce que disent nos clients
                </h2>
                <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
                  Plus de 500 clients satisfaits en Île-de-France
                </p>
              </div>
              
              <Testimonials />
            </section>
          </FadeInSection>

          {/* Zones desservies */}
          <FadeInSection className="mt-16 sm:mt-24 lg:mt-32 p-6 sm:p-8 lg:p-12 rounded-2xl" style={{ backgroundColor: 'var(--gold-light)' }}>
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl sm:text-4xl font-bold mb-4" style={{ fontFamily: 'var(--font-playfair)', color: 'var(--forest-green)' }}>
                Zones desservies
              </h2>
              <p className="text-base sm:text-lg text-gray-700 mb-8">
                {ZONES_DESCRIPTION}
              </p>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 text-left">
                {ZONES_DATA.map((zone, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: 'var(--forest-green)' }} />
                    <span className="text-sm sm:text-base text-gray-700">{zone}</span>
                  </div>
                ))}
              </div>
              
              <p className="text-xs sm:text-sm text-gray-600 mt-6 sm:mt-8">
                {ZONES_ADDITIONAL_TEXT}
              </p>
            </div>
          </FadeInSection>

          {/* CTA Final */}
          <FadeInSection className="mt-20 sm:mt-28 lg:mt-36 text-center p-8 sm:p-12 lg:p-16 rounded-2xl" style={{ backgroundColor: 'var(--forest-green)' }}>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4" style={{ fontFamily: 'var(--font-playfair)' }}>
              Prêt à réserver votre course ?
            </h2>
            <p className="text-base sm:text-lg lg:text-xl text-white/80 mb-8 max-w-2xl mx-auto px-4">
              Profitez d&apos;un service de qualité avec un chauffeur professionnel
            </p>
            <div className="flex justify-center px-4">
              <button 
                className="w-full sm:w-auto max-w-md sm:max-w-none px-10 py-4 rounded-lg font-semibold transition-all hover:scale-105 shadow-xl active:scale-95"
                style={{ 
                  backgroundColor: 'var(--gold-champagne)',
                  color: 'var(--forest-green)'
                }}
              >
                Réserver maintenant
              </button>
            </div>
          </FadeInSection>
        </div>
      </main>

      <Footer />
    </div>
  );
}
