import Image from 'next/image';
import Link from 'next/link';
import Navigation from '../components/layout/Navigation';
import Footer from '../components/layout/Footer';
import Hero from '../components/sections/Hero';
import CTASection from '../components/sections/CTASection';
import FadeInSection from '../components/animations/FadeInSection';
import PricingCarousel from '../components/ui/PricingCarousel';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Nos Tarifs | VTC Rachel",
  description: "Découvrez nos tarifs transparents pour vos courses VTC en Île-de-France : forfaits aéroports, mise à disposition, trajets longue distance.",
};

export default function TarifsPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      {/* Hero Section */}
      <Hero
        badge="Tarification transparente"
        title={<>Nos<br /><span style={{ color: 'var(--forest-green)' }}>Tarifs</span></>}
        description="Prix fixes, pas de surprise. Tous nos tarifs incluent les frais d'approche, d'autoroute et de stationnement"
      />

      {/* Forfaits Aéroports */}
      <section className="relative py-16 px-4 sm:px-6 overflow-hidden">
        {/* Image Background Aéroport */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/tarif/aeroport.png"
            alt="Aéroport - Transferts VTC"
            fill
            unoptimized
            className="object-cover"
            quality={85}
          />
          {/* Overlay pour lisibilité */}
          <div className="absolute inset-0 bg-gradient-to-b from-white/75 via-white/70 to-white/80" />
        </div>

        <div className="relative z-10 max-w-6xl mx-auto">
          <FadeInSection delay={0}>
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4" style={{ fontFamily: 'var(--font-playfair)', color: 'var(--forest-green)' }}>
                Forfaits Aéroports
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Tarifs fixes depuis ou vers les aéroports parisiens, valables pour 1 à 3 passagers
              </p>
            </div>
          </FadeInSection>

          <PricingCarousel autoplayDelay={4000}>
            {/* CDG */}
            <div className="bg-white border-2 border-gray-200 rounded-2xl p-8 hover:border-forest-green transition-colors h-full flex flex-col">
                <div className="text-center mb-6 mt-4">
                  <div className="w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4" style={{ backgroundColor: 'var(--gold-light)' }}>
                    <svg className="w-8 h-8" style={{ color: 'var(--forest-green)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold mb-2" style={{ color: 'var(--forest-green)' }}>Paris ↔ CDG</h3>
                  <p className="text-sm text-gray-600">Aéroport Charles de Gaulle</p>
                </div>
                
                <div className="text-center mb-6 pb-6 border-b border-gray-200">
                  <div className="text-3xl font-bold text-gray-700">À partir de 35€*</div>
                  <div className="text-sm text-gray-500 mt-1">Prix indicatif selon les conditions de circulation</div>
                </div>

                <ul className="space-y-3 text-sm text-gray-600 mb-6">
                  <li className="flex items-start gap-2">
                    <svg className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>1 à 3 passagers</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <svg className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>2 valises de taille standard</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <svg className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Accueil personnalisé avec pancarte</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <svg className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Suivi du vol en temps réel</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <svg className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Attente gratuite : 45 min</span>
                  </li>
                </ul>

                <Link
                  href="/"
                  className="mt-auto block text-center px-6 py-3 rounded-lg font-semibold transition-all hover:scale-105"
                  style={{ backgroundColor: 'var(--forest-green)', color: 'white' }}
                >
                  Réserver
                </Link>
            </div>

            {/* Orly */}
            <div className="relative bg-white border-2 rounded-2xl p-8 hover:border-forest-green transition-colors h-full flex flex-col" style={{ borderColor: 'var(--forest-green)' }}>
                <div className="absolute -top-3 sm:-top-4 left-1/2 transform -translate-x-1/2">
                  <div className="px-4 py-1 rounded-full text-xs font-bold text-white" style={{ backgroundColor: 'var(--gold-champagne)' }}>
                    POPULAIRE
                  </div>
                </div>
                
                <div className="text-center mb-6 mt-2 sm:mt-4">
                  <div className="w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4" style={{ backgroundColor: 'var(--gold-champagne)' }}>
                    <svg className="w-8 h-8" style={{ color: 'var(--forest-green)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold mb-2" style={{ color: 'var(--forest-green)' }}>Paris ↔ Orly</h3>
                  <p className="text-sm text-gray-600">Aéroport d&apos;Orly</p>
                </div>
                
                <div className="text-center mb-6 pb-6 border-b border-gray-200">
                  <div className="text-3xl font-bold text-gray-700">À partir de 30€*</div>
                  <div className="text-sm text-gray-500 mt-1">Prix indicatif selon les conditions de circulation</div>
                </div>

                <ul className="space-y-3 text-sm text-gray-600 mb-6">
                  <li className="flex items-start gap-2">
                    <svg className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>1 à 3 passagers</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <svg className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>2 valises de taille standard</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <svg className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Accueil personnalisé avec pancarte</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <svg className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Suivi du vol en temps réel</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <svg className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Attente gratuite : 45 min</span>
                  </li>
                </ul>

                <Link
                  href="/"
                  className="mt-auto block text-center px-6 py-3 rounded-lg font-semibold transition-all hover:scale-105"
                  style={{ backgroundColor: 'var(--forest-green)', color: 'white' }}
                >
                  Réserver
                </Link>
            </div>

            {/* Beauvais */}
            <div className="bg-white border-2 border-gray-200 rounded-2xl p-8 hover:border-forest-green transition-colors h-full flex flex-col">
                <div className="text-center mb-6 mt-4">
                  <div className="w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4" style={{ backgroundColor: 'var(--gold-light)' }}>
                    <svg className="w-8 h-8" style={{ color: 'var(--forest-green)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold mb-2" style={{ color: 'var(--forest-green)' }}>Paris ↔ Beauvais</h3>
                  <p className="text-sm text-gray-600">Aéroport de Beauvais</p>
                </div>
                
                <div className="text-center mb-6 md:min-h-[140px] md:flex md:flex-col md:justify-center">
                  <div className="text-4xl font-bold" style={{ color: 'var(--forest-green)' }}>130€</div>
                  <div className="text-sm text-gray-500 mt-1">Jour (6h-22h)</div>
                </div>

                <div className="text-center mb-6 pb-6 border-b border-gray-200">
                  <div className="text-3xl font-bold text-gray-700">150€</div>
                  <div className="text-sm text-gray-500 mt-1">Nuit (22h-6h)</div>
                </div>

                <ul className="space-y-3 text-sm text-gray-600 mb-6">
                  <li className="flex items-start gap-2">
                    <svg className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>1 à 3 passagers</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <svg className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>2 valises de taille standard</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <svg className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Accueil personnalisé avec pancarte</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <svg className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Suivi du vol en temps réel</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <svg className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Attente gratuite : 45 min</span>
                  </li>
                </ul>

                <Link
                  href="/"
                  className="mt-auto block text-center px-6 py-3 rounded-lg font-semibold transition-all hover:scale-105"
                  style={{ backgroundColor: 'var(--forest-green)', color: 'white' }}
                >
                  Réserver
                </Link>
            </div>
          </PricingCarousel>
        </div>
      </section>

      {/* Mise à disposition */}
      <section className="py-16 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <FadeInSection delay={0}>
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4" style={{ fontFamily: 'var(--font-playfair)', color: 'var(--forest-green)' }}>
                Mise à Disposition
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Pour vos événements, réunions d&apos;affaires ou journées shopping
              </p>
            </div>
          </FadeInSection>

          <PricingCarousel autoplayDelay={4000}>
            <div className="bg-white border-2 border-gray-200 rounded-2xl p-8 hover:border-forest-green transition-colors h-full flex flex-col">
                <div className="text-center mb-6">
                  <div className="w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4" style={{ backgroundColor: 'var(--gold-light)' }}>
                    <svg className="w-8 h-8" style={{ color: 'var(--forest-green)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold mb-2" style={{ color: 'var(--forest-green)' }}>À l&apos;heure</h3>
                  <p className="text-sm text-gray-600">1 heure</p>
                </div>
                
                <div className="text-center mb-6 pb-6 border-b border-gray-200 md:min-h-[130px]">
                  <div className="text-4xl font-bold" style={{ color: 'var(--forest-green)' }}>45€</div>
                  <div className="text-sm text-gray-500 mt-1">Par heure</div>
                  <div className="inline-block mt-2 px-3 py-1 rounded-full text-xs font-semibold opacity-0 select-none" style={{ backgroundColor: 'var(--gold-light)', color: 'var(--forest-green)' }}>
                    Placeholder
                  </div>
                </div>

                <ul className="space-y-3 text-sm text-gray-600 mb-6">
                  <li className="flex items-start gap-2">
                    <svg className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Max 20 km par heure</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <svg className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Chauffeur à disposition</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <svg className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Trajets multiples possibles</span>
                  </li>
                </ul>
            </div>

            <div className="relative bg-white border-2 rounded-2xl p-8 hover:border-forest-green transition-colors h-full flex flex-col" style={{ borderColor: 'var(--forest-green)' }}>
                <div className="absolute -top-3 sm:-top-4 left-1/2 transform -translate-x-1/2">
                  <div className="px-4 py-1 rounded-full text-xs font-bold text-white" style={{ backgroundColor: 'var(--gold-champagne)' }}>
                    MEILLEURE VALEUR
                  </div>
                </div>
                
                <div className="text-center mb-6 mt-2 sm:mt-4 md:mt-0 md:min-h-[140px] md:flex md:flex-col md:justify-center">
                  <div className="w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4" style={{ backgroundColor: 'var(--gold-champagne)' }}>
                    <svg className="w-8 h-8" style={{ color: 'var(--forest-green)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold mb-2" style={{ color: 'var(--forest-green)' }}>Demi-Journée</h3>
                  <p className="text-sm text-gray-600">4 heures</p>
                </div>
                
                <div className="text-center mb-6 pb-6 border-b border-gray-200 md:min-h-[130px]">
                  <div className="text-4xl font-bold" style={{ color: 'var(--forest-green)' }}>160€</div>
                  <div className="text-sm text-gray-500 mt-1">40€/heure</div>
                  <div className="inline-block mt-2 px-3 py-1 rounded-full text-xs font-semibold" style={{ backgroundColor: 'var(--gold-light)', color: 'var(--forest-green)' }}>
                    80 km max
                  </div>
                </div>

                <ul className="space-y-3 text-sm text-gray-600 mb-6">
                  <li className="flex items-start gap-2">
                    <svg className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>4 heures continues</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <svg className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Chauffeur à disposition</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <svg className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Idéal pour réunions</span>
                  </li>
                </ul>
            </div>

            <div className="bg-white border-2 border-gray-200 rounded-2xl p-8 hover:border-forest-green transition-colors h-full flex flex-col">
                <div className="text-center mb-6 md:min-h-[140px] md:flex md:flex-col md:justify-center">
                  <div className="w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4" style={{ backgroundColor: 'var(--gold-light)' }}>
                    <svg className="w-8 h-8" style={{ color: 'var(--forest-green)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold mb-2" style={{ color: 'var(--forest-green)' }}>Journée</h3>
                  <p className="text-sm text-gray-600">8 heures</p>
                </div>
                
                <div className="text-center mb-6 pb-6 border-b border-gray-200 md:min-h-[130px]">
                  <div className="text-4xl font-bold" style={{ color: 'var(--forest-green)' }}>280€</div>
                  <div className="text-sm text-gray-500 mt-1">35€/heure</div>
                  <div className="inline-block mt-2 px-3 py-1 rounded-full text-xs font-semibold opacity-0 select-none" style={{ backgroundColor: 'var(--gold-light)', color: 'var(--forest-green)' }}>
                    Placeholder
                  </div>
                </div>

                <ul className="space-y-3 text-sm text-gray-600 mb-6">
                  <li className="flex items-start gap-2">
                    <svg className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>8 heures continues</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <svg className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Chauffeur à disposition</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <svg className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Parfait pour événements</span>
                  </li>
                </ul>
            </div>
          </PricingCarousel>
        </div>
      </section>

      {/* Conditions tarifaires */}
      <section className="py-16 px-4 sm:px-6" style={{ backgroundColor: '#FAFAF9' }}>
        <div className="max-w-6xl mx-auto">
          <FadeInSection delay={0}>
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4" style={{ fontFamily: 'var(--font-playfair)', color: 'var(--forest-green)' }}>
                Conditions tarifaires
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Les options pouvant entrainer une facturation supplementaire.
              </p>
            </div>
          </FadeInSection>

          <FadeInSection delay={0}>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl sm:text-2xl font-bold" style={{ color: 'var(--forest-green)' }}>
                Options payantes
              </h3>
              <span className="px-3 py-1 rounded-full text-xs font-semibold" style={{ backgroundColor: 'var(--gold-light)', color: 'var(--forest-green)' }}>
                Selon besoin
              </span>
            </div>
          </FadeInSection>

          <div className="grid sm:grid-cols-2 gap-6 mb-10 bg-white/70 rounded-2xl border border-gray-200 p-4 sm:p-6">
            <FadeInSection delay={0}>
              <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm h-full flex flex-col">
                <div className="w-12 h-12 mx-auto rounded-full flex items-center justify-center mb-4" style={{ backgroundColor: 'var(--gold-light)' }}>
                  <svg className="w-6 h-6" style={{ color: 'var(--forest-green)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                </div>
                <h3 className="font-bold mb-2 text-center" style={{ color: 'var(--forest-green)' }}>Siège enfant</h3>
                <p className="text-2xl font-bold text-gray-900 mb-2 text-center">5€</p>
                <p className="text-sm text-gray-600 text-center">Par siège</p>
              </div>
            </FadeInSection>

            <FadeInSection delay={0.1}>
              <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm h-full flex flex-col">
                <div className="w-12 h-12 mx-auto rounded-full flex items-center justify-center mb-4" style={{ backgroundColor: 'var(--gold-light)' }}>
                  <svg className="w-6 h-6" style={{ color: 'var(--forest-green)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="font-bold mb-2 text-center" style={{ color: 'var(--forest-green)' }}>Attente supplémentaire</h3>
                <p className="text-2xl font-bold text-gray-900 mb-2 text-center">15€</p>
                <p className="text-sm text-gray-600 text-center">Par tranche de 20 min (après 10 min)</p>
              </div>
            </FadeInSection>
          </div>

        </div>
      </section>

      {/* Inclus dans tous nos tarifs */}
      <FadeInSection delay={0}>
        <section className="py-16 px-4 sm:px-6">
          <div className="max-w-4xl mx-auto">
            <div className="bg-gradient-to-br from-forest-green to-forest-green-light rounded-2xl p-8 sm:p-12 text-white">
              <h2 className="text-3xl font-bold mb-8 text-center" style={{ fontFamily: 'var(--font-playfair)' }}>
                Inclus dans Tous nos Tarifs
              </h2>
              
              <div className="grid sm:grid-cols-2 gap-6">
                <div className="flex items-start gap-3">
                  <svg className="w-6 h-6 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <div>
                    <h3 className="font-semibold mb-1">Véhicule Premium</h3>
                    <p className="text-sm text-white/80">Berline récente, climatisée et entretenue</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <svg className="w-6 h-6 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <div>
                    <h3 className="font-semibold mb-1">Chauffeur Professionnel</h3>
                    <p className="text-sm text-white/80">Expérimenté, courtois et discret</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <svg className="w-6 h-6 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <div>
                    <h3 className="font-semibold mb-1">Eau & Chargeurs</h3>
                    <p className="text-sm text-white/80">Bouteilles d&apos;eau et chargeurs USB/Lightning</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <svg className="w-6 h-6 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <div>
                    <h3 className="font-semibold mb-1">Wi-Fi à bord</h3>
                    <p className="text-sm text-white/80">Connexion internet haut débit</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <svg className="w-6 h-6 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <div>
                    <h3 className="font-semibold mb-1">Tous frais inclus</h3>
                    <p className="text-sm text-white/80">Autoroute, stationnement, carburant</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <svg className="w-6 h-6 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <div>
                    <h3 className="font-semibold mb-1">Annulation flexible</h3>
                    <p className="text-sm text-white/80">Gratuite jusqu&apos;à 24h avant</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </FadeInSection>

      {/* CTA */}
      <FadeInSection delay={0}>
        <CTASection
          title="Besoin d'un Devis Personnalisé ?"
          description="Contactez-nous pour obtenir un tarif adapté à vos besoins spécifiques"
          primaryButton={{
            text: "Réserver maintenant",
            href: "/"
          }}
          secondaryButton={{
            text: "Demander un devis",
            href: "/contact"
          }}
        />
      </FadeInSection>

      <Footer />
    </div>
  );
}
