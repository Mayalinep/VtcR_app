export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="text-2xl font-semibold tracking-tight" style={{ color: 'var(--forest-green)', fontFamily: 'var(--font-playfair)' }}>
            VTC Rachel
          </div>
          <button 
            className="px-6 py-2.5 rounded-lg font-medium text-white transition-all hover:scale-105"
            style={{ backgroundColor: 'var(--forest-green)' }}
          >
            Réserver
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          {/* Hero centré */}
          <div className="max-w-4xl mx-auto text-center">
            <div 
              className="inline-block px-4 py-1.5 rounded-full text-sm font-medium mb-8"
              style={{ 
                backgroundColor: 'var(--gold-light)',
                color: 'var(--forest-green)'
              }}
            >
              Service Premium Île-de-France
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold leading-tight mb-6 tracking-tight" style={{ fontFamily: 'var(--font-playfair)' }}>
              Votre chauffeur
              <br />
              <span style={{ color: 'var(--forest-green)' }}>de confiance</span>
            </h1>
            
            <p className="text-base sm:text-lg lg:text-xl text-gray-600 mb-10 leading-relaxed max-w-2xl mx-auto px-4">
              Réservez votre course VTC en quelques clics. Service professionnel, 
              confort premium, tarifs transparents.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center px-4">
              <button 
                className="w-full sm:w-auto px-8 py-4 rounded-lg font-semibold text-white transition-all hover:scale-105 shadow-lg"
                style={{ backgroundColor: 'var(--forest-green)' }}
              >
                Réserver maintenant
              </button>
              <button 
                className="w-full sm:w-auto px-8 py-4 rounded-lg font-semibold transition-all hover:scale-105 border-2"
                style={{ 
                  borderColor: 'var(--forest-green)',
                  color: 'var(--forest-green)'
                }}
              >
                En savoir plus
              </button>
            </div>
          </div>

          {/* Comment ça marche */}
          <div className="mt-32">
            <div className="text-center mb-16">
              <div 
                className="inline-block px-4 py-1.5 rounded-full text-sm font-medium mb-4"
                style={{ 
                  backgroundColor: 'var(--gold-light)',
                  color: 'var(--forest-green)'
                }}
              >
                Simple et Rapide
              </div>
              <h2 className="text-4xl font-bold mb-4" style={{ fontFamily: 'var(--font-playfair)' }}>
                Comment ça marche ?
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Réservez votre course en 3 étapes simples
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
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
                <div 
                  key={i}
                  className="relative p-8 rounded-xl bg-white border border-gray-100"
                >
                  <div 
                    className="text-6xl font-bold mb-4 opacity-10"
                    style={{ 
                      fontFamily: 'var(--font-playfair)',
                      color: 'var(--forest-green)'
                    }}
                  >
                    {step.step}
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{step.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Features */}
          <div className="mt-32 grid grid-cols-1 md:grid-cols-3 gap-8">
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
              <div 
                key={i}
                className="p-8 rounded-xl border border-gray-100 hover:border-gray-200 transition-all"
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
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>

          {/* Zones desservies */}
          <div className="mt-32 p-12 rounded-2xl" style={{ backgroundColor: 'var(--gold-light)' }}>
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-4xl font-bold mb-4" style={{ fontFamily: 'var(--font-playfair)', color: 'var(--forest-green)' }}>
                Zones desservies
              </h2>
              <p className="text-lg text-gray-700 mb-8">
                Nous couvrons l&apos;ensemble de l&apos;Île-de-France
              </p>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-left">
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
                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: 'var(--forest-green)' }} />
                    <span className="text-gray-700">{zone}</span>
                  </div>
                ))}
              </div>
              
              <p className="text-sm text-gray-600 mt-8">
                Et bien d&apos;autres destinations en Île-de-France
              </p>
            </div>
          </div>

          {/* CTA Final */}
          <div className="mt-32 text-center p-16 rounded-2xl" style={{ backgroundColor: 'var(--forest-green)' }}>
            <h2 className="text-4xl font-bold text-white mb-4" style={{ fontFamily: 'var(--font-playfair)' }}>
              Prêt à réserver votre course ?
            </h2>
            <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
              Profitez d&apos;un service de qualité avec un chauffeur professionnel
            </p>
            <button 
              className="px-10 py-4 rounded-lg font-semibold transition-all hover:scale-105 shadow-xl"
              style={{ 
                backgroundColor: 'var(--gold)',
                color: 'var(--forest-green)'
              }}
            >
              Réserver maintenant
            </button>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-100 py-12 px-6 mt-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="text-2xl font-semibold mb-4" style={{ color: 'var(--forest-green)', fontFamily: 'var(--font-playfair)' }}>
                VTC Rachel
              </div>
              <p className="text-sm text-gray-600">
                Service VTC premium en Île-de-France
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-3">Navigation</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><a href="#" className="hover:text-gray-900">Accueil</a></li>
                <li><a href="#" className="hover:text-gray-900">À propos</a></li>
                <li><a href="#" className="hover:text-gray-900">Tarifs</a></li>
                <li><a href="#" className="hover:text-gray-900">Contact</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-3">Légal</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><a href="#" className="hover:text-gray-900">CGV</a></li>
                <li><a href="#" className="hover:text-gray-900">Mentions légales</a></li>
                <li><a href="#" className="hover:text-gray-900">Confidentialité</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-3">Contact</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>contact@vtc-rachel.fr</li>
                <li>+33 6 XX XX XX XX</li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-100 pt-8 text-center text-sm text-gray-500">
            © 2026 VTC Rachel. Tous droits réservés.
          </div>
        </div>
      </footer>
    </div>
  );
}
