import Navigation from './components/Navigation';
import FadeIn from './components/FadeIn';
import FadeInSection from './components/FadeInSection';

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      {/* Hero Section */}
      <main className="pt-32 sm:pt-36 lg:pt-40 pb-12 sm:pb-20 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
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
                <button 
                  className="w-full sm:w-auto px-10 py-4 rounded-lg font-semibold text-white text-base transition-all hover:scale-105 shadow-lg active:scale-95"
                  style={{ backgroundColor: 'var(--forest-green)' }}
                >
                  Réserver maintenant
                </button>
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

      {/* Footer */}
      <footer className="border-t border-gray-100 py-8 sm:py-12 px-4 sm:px-6 mt-12 sm:mt-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 mb-6 sm:mb-8">
            <div className="col-span-2 md:col-span-1">
              <div className="text-xl sm:text-2xl font-semibold mb-3" style={{ color: 'var(--forest-green)', fontFamily: 'var(--font-playfair)' }}>
                VTC Rachel
              </div>
              <p className="text-sm text-gray-600">
                Service VTC premium en Île-de-France
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-2 sm:mb-3 text-sm sm:text-base">Navigation</h4>
              <ul className="space-y-1 sm:space-y-2 text-sm text-gray-600">
                <li><a href="#" className="hover:text-gray-900 inline-block py-0.5">Accueil</a></li>
                <li><a href="#" className="hover:text-gray-900 inline-block py-0.5">À propos</a></li>
                <li><a href="#" className="hover:text-gray-900 inline-block py-0.5">Tarifs</a></li>
                <li><a href="#" className="hover:text-gray-900 inline-block py-0.5">Contact</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-2 sm:mb-3 text-sm sm:text-base">Légal</h4>
              <ul className="space-y-1 sm:space-y-2 text-sm text-gray-600">
                <li><a href="#" className="hover:text-gray-900 inline-block py-0.5">CGV</a></li>
                <li><a href="#" className="hover:text-gray-900 inline-block py-0.5">Mentions légales</a></li>
                <li><a href="#" className="hover:text-gray-900 inline-block py-0.5">Confidentialité</a></li>
              </ul>
            </div>
            
            <div className="col-span-2 md:col-span-1">
              <h4 className="font-semibold mb-2 sm:mb-3 text-sm sm:text-base">Contact</h4>
              <ul className="space-y-1 sm:space-y-2 text-sm text-gray-600">
                <li className="py-0.5">contact@vtc-rachel.fr</li>
                <li className="py-0.5">+33 6 XX XX XX XX</li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-100 pt-4 sm:pt-6 text-center text-xs sm:text-sm text-gray-500">
            © 2026 VTC Rachel. Tous droits réservés.
          </div>
        </div>
      </footer>
    </div>
  );
}
