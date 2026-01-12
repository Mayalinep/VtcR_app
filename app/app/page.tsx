import Navigation from './components/layout/Navigation';
import Footer from './components/layout/Footer';
import FadeIn from './components/animations/FadeIn';
import FadeInSection from './components/animations/FadeInSection';
import PriceEstimator from './components/forms/PriceEstimator';
import ScrollIndicator from './components/ui/ScrollIndicator';
import PulseCTA from './components/ui/PulseCTA';
import Testimonials from './components/Testimonials';

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      {/* Hero Section */}
      <main 
        className="min-h-screen flex items-center justify-center px-4 sm:px-6 relative"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 40L40 0H20L0 20M40 40V20L20 40' fill='%230F4C3A' fill-opacity='0.02' fill-rule='evenodd'/%3E%3C/svg%3E")`,
          backgroundColor: '#ffffff'
        }}
      >
        <div className="max-w-7xl mx-auto w-full">
          {/* Hero centré */}
          <div className="max-w-4xl mx-auto text-center">
            <FadeIn delay={0.4}>
              <div 
                className="inline-block px-4 py-1.5 rounded-full text-sm font-medium mb-10"
                style={{ 
                  backgroundColor: 'var(--gold-light)',
                  color: 'var(--forest-green)'
                }}
              >
                Service Premium Île-de-France
              </div>
            </FadeIn>
            
            <FadeIn delay={0.7}>
              <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold leading-tight mb-6 tracking-tight" style={{ fontFamily: 'var(--font-playfair)' }}>
                Votre chauffeur
                <br />
                <span style={{ color: 'var(--forest-green)' }}>de confiance</span>
              </h1>
            </FadeIn>
            
            <FadeIn delay={1}>
              <p className="text-base sm:text-lg lg:text-xl text-gray-600 mb-10 leading-relaxed max-w-2xl mx-auto px-4">
                Réservez votre course VTC en quelques clics. Service professionnel, 
                confort premium, tarifs transparents.
              </p>
            </FadeIn>

            <FadeIn delay={1.3}>
              <div className="flex flex-col sm:flex-row gap-4 justify-center px-4 max-w-md sm:max-w-none mx-auto">
                <PulseCTA
                  className="w-full sm:w-auto px-10 py-4 rounded-lg font-semibold text-white text-base"
                  style={{ backgroundColor: 'var(--forest-green)' }}
                >
                  Réserver maintenant
                </PulseCTA>
                <button 
                  className="w-full sm:w-auto px-10 py-3.5 rounded-lg font-medium transition-all hover:scale-105 border-2 active:scale-95"
                  style={{ 
                    borderColor: 'var(--forest-green)',
                    color: 'var(--forest-green)',
                    backgroundColor: 'transparent'
                  }}
                >
                  En savoir plus
                </button>
              </div>
            </FadeIn>
          </div>

          {/* Flèche de scroll animée */}
          <ScrollIndicator />
        </div>
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
              <PriceEstimator />
            </div>

            {/* DROITE : Map Google - Desktop uniquement (hidden mobile) */}
            <div className="hidden lg:block lg:w-3/5">
              <FadeInSection delay={0.2}>
                <div className="sticky top-24 h-[600px] rounded-2xl overflow-hidden shadow-lg border border-gray-200">
                  {/* Map Google statique - Centrée sur Île-de-France */}
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d335994.89219464146!2d2.2646348!3d48.8589465!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e66e1f06e2b005%3A0x40b82c3688c9460!2sParis%2C%20France!5e0!3m2!1sfr!2sfr!4v1704902400000!5m2!1sfr!2sfr"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen={false}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Zones desservies - Île-de-France"
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
              {[
                {
                  icon: (
                    <svg className="w-16 h-16" viewBox="0 0 64 64" fill="none">
                      <circle cx="32" cy="32" r="28" fill="#E8F5E9" />
                      <path d="M32 12L36 24L48 26L40 34L42 46L32 40L22 46L24 34L16 26L28 24L32 12Z" fill="var(--forest-green)" />
                    </svg>
                  ),
                  title: 'Chauffeur certifié et expérimenté',
                  description: '5 ans d\'expérience, formation continue, connaissance parfaite de l\'Île-de-France'
                },
                {
                  icon: (
                    <svg className="w-16 h-16" viewBox="0 0 64 64" fill="none">
                      <circle cx="32" cy="32" r="28" fill="#FFF9E6" />
                      <path d="M32 18C25.4 18 20 23.4 20 30C20 38 32 50 32 50C32 50 44 38 44 30C44 23.4 38.6 18 32 18ZM32 34C29.8 34 28 32.2 28 30C28 27.8 29.8 26 32 26C34.2 26 36 27.8 36 30C36 32.2 34.2 34 32 34Z" fill="var(--gold-champagne)" />
                    </svg>
                  ),
                  title: 'Service personnalisé',
                  description: 'Accueil sur-mesure, préférences mémorisées, attention aux détails'
                },
                {
                  icon: (
                    <svg className="w-16 h-16" viewBox="0 0 64 64" fill="none">
                      <circle cx="32" cy="32" r="28" fill="#E8F5E9" />
                      <path d="M32 16L26 22V28L20 32L26 36V42L32 48L38 42V36L44 32L38 28V22L32 16ZM32 26L36 30H38V34L32 38L26 34V30H28L32 26Z" fill="var(--forest-green)" />
                    </svg>
                  ),
                  title: 'Spécialiste des aéroports',
                  description: 'Suivi des vols en temps réel, aide aux bagages, connaissance des terminaux'
                }
              ].map((item, i) => (
                <FadeInSection key={i} delay={i * 0.15}>
                  <div className="text-left group">
                    {/* Icône plus petite */}
                    <div className="mb-3">
                      <div className="w-12 h-12">
                        {item.icon}
                      </div>
                    </div>

                    {/* Titre */}
                    <h3 className="text-base font-bold mb-2 text-gray-900">
                      {item.title}
                    </h3>

                    {/* Description */}
                    <p className="text-xs text-gray-600 leading-snug mb-3">
                      {item.description}
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
                <div 
                  className="inline-block px-4 py-1.5 rounded-full text-sm font-medium mb-6"
                  style={{ 
                    backgroundColor: 'var(--gold-light)',
                    color: 'var(--forest-green)'
                  }}
                >
                  Ils nous font confiance
                </div>
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
                Nous couvrons l&apos;ensemble de l&apos;Île-de-France
              </p>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 text-left">
                {[
                  'Paris intra-muros',
                  'Aéroport CDG',
                  'Aéroport Orly',
                  'La Défense',
                  'Versailles',
                  'Saint-Denis',
                  'Neuilly',
                  'Boulogne'
                ].map((zone, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: 'var(--forest-green)' }} />
                    <span className="text-sm sm:text-base text-gray-700">{zone}</span>
                  </div>
                ))}
              </div>
              
              <p className="text-xs sm:text-sm text-gray-600 mt-6 sm:mt-8">
                Et bien d&apos;autres destinations en Île-de-France
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
