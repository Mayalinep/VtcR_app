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
            
            <h1 className="text-7xl font-bold leading-tight mb-6 tracking-tight" style={{ fontFamily: 'var(--font-playfair)' }}>
              Votre chauffeur
              <br />
              <span style={{ color: 'var(--forest-green)' }}>de confiance</span>
            </h1>
            
            <p className="text-xl text-gray-600 mb-10 leading-relaxed max-w-2xl mx-auto">
              Réservez votre course VTC en quelques clics. Service professionnel, 
              confort premium, tarifs transparents.
            </p>

            <div className="flex gap-4 justify-center">
              <button 
                className="px-8 py-4 rounded-lg font-semibold text-white transition-all hover:scale-105 shadow-lg"
                style={{ backgroundColor: 'var(--forest-green)' }}
              >
                Réserver maintenant
              </button>
              <button 
                className="px-8 py-4 rounded-lg font-semibold transition-all hover:scale-105 border-2"
                style={{ 
                  borderColor: 'var(--forest-green)',
                  color: 'var(--forest-green)'
                }}
              >
                En savoir plus
              </button>
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
                title: 'Réservation Simple',
                description: 'En ligne en 2 minutes, confirmation instantanée'
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
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-100 py-8 px-6 mt-20">
        <div className="max-w-7xl mx-auto text-center text-sm text-gray-500">
          VTC Rachel - Service de transport avec chauffeur en Île-de-France
        </div>
      </footer>
    </div>
  );
}
