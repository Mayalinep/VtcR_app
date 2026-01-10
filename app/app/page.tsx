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

      {/* Section Estimateur de prix */}
      <section className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6" style={{ backgroundColor: '#FAFAF9' }}>
        <div className="max-w-4xl mx-auto">
          <FadeInSection delay={0}>
            <div className="text-center mb-8">
              <h2 className="text-3xl sm:text-4xl font-bold mb-4" style={{ fontFamily: 'var(--font-playfair)' }}>
                Estimez votre course
              </h2>
              <p className="text-gray-600 text-base sm:text-lg">
                Obtenez un tarif instantané et transparent pour votre trajet
              </p>
            </div>
          </FadeInSection>
          
          <div className="max-w-2xl mx-auto">
            <PriceEstimator />
          </div>
        </div>
      </section>

      {/* Pourquoi nous choisir Section */}
      <FadeInSection delay={0}>
        <section className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              {/* Colonne gauche - Texte */}
              <div>
                <div 
                  className="inline-block px-4 py-1.5 rounded-full text-sm font-medium mb-6"
                  style={{ 
                    backgroundColor: 'var(--gold-light)',
                    color: 'var(--forest-green)'
                  }}
                >
                  Votre partenaire de confiance
                </div>
                
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6" style={{ fontFamily: 'var(--font-playfair)' }}>
                  Pourquoi choisir
                  <br />
                  <span style={{ color: 'var(--forest-green)' }}>VTC Rachel</span> ?
                </h2>
                
                <p className="text-gray-600 text-base sm:text-lg mb-8 leading-relaxed">
                  Un service VTC premium qui place votre confort et votre sérénité au cœur de chaque trajet.
                </p>

                <div className="space-y-5">
                  {[
                    {
                      title: 'Chauffeur certifié et expérimenté',
                      description: '5 ans d\'expérience, formation continue, connaissance parfaite de l\'Île-de-France'
                    },
                    {
                      title: 'Service personnalisé',
                      description: 'Accueil sur-mesure, préférences mémorisées, attention aux détails'
                    },
                    {
                      title: 'Spécialiste des aéroports',
                      description: 'Suivi des vols en temps réel, aide aux bagages, connaissance des terminaux'
                    },
                    {
                      title: 'Ponctualité garantie',
                      description: 'Engagement de respect des horaires, itinéraires optimisés, marge de sécurité'
                    }
                  ].map((item, i) => (
                    <div key={i} className="flex gap-4">
                      <div className="flex-shrink-0 mt-1">
                        <svg 
                          className="w-6 h-6" 
                          fill="none" 
                          stroke="currentColor" 
                          viewBox="0 0 24 24"
                          style={{ color: 'var(--forest-green)' }}
                        >
                          <path 
                            strokeLinecap="round" 
                            strokeLinejoin="round" 
                            strokeWidth={2.5} 
                            d="M5 13l4 4L19 7" 
                          />
                        </svg>
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-1">{item.title}</h3>
                        <p className="text-sm text-gray-600 leading-relaxed">{item.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Colonne droite - Visuel */}
              <div className="relative">
                <div 
                  className="aspect-square rounded-2xl flex items-center justify-center"
                  style={{ backgroundColor: 'var(--gold-light)' }}
                >
                  <svg 
                    className="w-32 h-32 sm:w-40 sm:h-40 lg:w-48 lg:h-48"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    style={{ color: 'var(--forest-green)', opacity: 0.3 }}
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={0.5}
                      d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                    />
                  </svg>
                </div>
                
                {/* Badge flottant */}
                <div 
                  className="absolute -bottom-6 -right-6 px-6 py-4 rounded-xl shadow-xl"
                  style={{ backgroundColor: 'var(--forest-green)' }}
                >
                  <div className="text-white text-center">
                    <div className="text-3xl font-bold" style={{ fontFamily: 'var(--font-playfair)' }}>5+</div>
                    <div className="text-xs font-medium">Ans d'expérience</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </FadeInSection>

      {/* Comment ça marche Section */}
      <main className="px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          {/* Comment ça marche */}
          <div className="mt-20 sm:mt-28 lg:mt-36">
            <FadeInSection delay={0} className="text-center mb-12 sm:mb-16 px-4">
              <div 
                className="inline-block px-4 py-1.5 rounded-full text-sm font-medium mb-6"
                style={{ 
                  backgroundColor: 'var(--gold-light)',
                  color: 'var(--forest-green)'
                }}
              >
                Simple et Rapide
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold mb-4" style={{ fontFamily: 'var(--font-playfair)' }}>
                Comment ça marche ?
              </h2>
              <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
                Réservez votre course en 3 étapes simples
              </p>
            </FadeInSection>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
              {[
                {
                  step: '01',
                  title: 'Choisissez votre trajet',
                  description: 'Indiquez votre point de départ et votre destination. Nous calculons instantanément le prix.'
                },
                {
                  step: '02',
                  title: 'Sélectionnez la date',
                  description: 'Choisissez quand vous souhaitez partir. Réservation immédiate ou planifiée à l\'avance.'
                },
                {
                  step: '03',
                  title: 'Confirmez et payez',
                  description: 'Validation en un clic, paiement sécurisé. Recevez votre confirmation par email.'
                }
              ].map((step, i) => (
                <FadeInSection key={i} delay={i * 0.2}>
                  <div 
                    className="relative p-6 sm:p-8 rounded-xl bg-white border border-gray-100 hover:shadow-md transition-shadow duration-300"
                  >
                    <div 
                      className="text-5xl sm:text-6xl font-bold mb-4 opacity-10"
                      style={{ 
                        fontFamily: 'var(--font-playfair)',
                        color: 'var(--forest-green)'
                      }}
                    >
                      {step.step}
                    </div>
                    <h3 className="text-lg sm:text-xl font-semibold mb-3">{step.title}</h3>
                    <p className="text-sm sm:text-base text-gray-600 leading-relaxed">{step.description}</p>
                  </div>
                </FadeInSection>
              ))}
            </div>
          </div>

          {/* Features */}
          <div className="mt-16 sm:mt-24 lg:mt-32 grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {[
              {
                title: 'Service Premium',
                description: 'Véhicule haut de gamme, chauffeur professionnel'
              },
              {
                title: 'Disponible 24/7',
                description: 'Réservation en ligne à toute heure, même le weekend'
              },
              {
                title: 'Tarifs Transparents',
                description: 'Prix fixe, aucune surprise, paiement sécurisé'
              }
            ].map((feature, i) => (
              <FadeInSection key={i} delay={i * 0.2}>
                <div 
                  className="p-6 sm:p-8 rounded-xl border border-gray-100 hover:border-gray-200 hover:shadow-md transition-all duration-300"
                >
                  <div 
                    className="w-12 h-12 rounded-lg mb-4 flex items-center justify-center"
                    style={{ backgroundColor: 'var(--gold-light)' }}
                  >
                    <div 
                      className="w-6 h-6 rounded-full"
                      style={{ backgroundColor: 'var(--gold)' }}
                    />
                  </div>
                  <h3 className="text-lg sm:text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-sm sm:text-base text-gray-600 leading-relaxed">{feature.description}</p>
                </div>
              </FadeInSection>
            ))}
          </div>

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
                  backgroundColor: 'var(--gold)',
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
