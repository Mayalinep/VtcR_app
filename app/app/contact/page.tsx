import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import ContactForm from '../components/ContactForm';
import FadeIn from '../components/FadeIn';
import FadeInSection from '../components/FadeInSection';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Contact - Nous contacter | VTC Rachel",
  description: "Contactez VTC Rachel pour toute question sur nos services de chauffeur privé. Réponse rapide garantie par téléphone, email ou formulaire de contact.",
};

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      {/* Hero Section */}
      <section className="pt-32 pb-16 px-4 sm:px-6 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-4xl mx-auto text-center">
          <FadeIn delay={0.4}>
            <div 
              className="inline-block px-4 py-1.5 rounded-full text-sm font-medium mb-6"
              style={{ 
                backgroundColor: 'var(--gold-light)',
                color: 'var(--forest-green)'
              }}
            >
              Nous sommes à votre écoute
            </div>
          </FadeIn>
          
          <FadeIn delay={0.7}>
            <h1 className="text-4xl sm:text-5xl font-bold mb-6" style={{ fontFamily: 'var(--font-playfair)' }}>
              Contactez
              <br />
              <span style={{ color: 'var(--forest-green)' }}>VTC Rachel</span>
            </h1>
          </FadeIn>
          
          <FadeIn delay={1}>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Une question ? Un devis personnalisé ? Notre équipe vous répond rapidement
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16">
            
            {/* Formulaire - 3 colonnes */}
            <div className="lg:col-span-3">
              <FadeInSection delay={0}>
                <div className="bg-white rounded-2xl border border-gray-100 p-8 shadow-lg">
                  <h2 className="text-2xl font-bold mb-2" style={{ fontFamily: 'var(--font-playfair)' }}>
                    Envoyez-nous un message
                  </h2>
                  <p className="text-gray-600 mb-8">
                    Remplissez ce formulaire et nous vous répondrons dans les plus brefs délais
                  </p>
                  
                  <ContactForm />
                </div>
              </FadeInSection>
            </div>

            {/* Infos de contact - 2 colonnes */}
            <div className="lg:col-span-2 space-y-6">
              
              {/* Téléphone */}
              <FadeInSection delay={0.1}>
                <div className="bg-white rounded-xl border border-gray-100 p-6 hover:shadow-md transition-shadow">
                  <div 
                    className="w-12 h-12 rounded-lg flex items-center justify-center mb-4"
                    style={{ backgroundColor: 'var(--gold-light)' }}
                  >
                    <svg 
                      className="w-6 h-6" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                      style={{ color: 'var(--forest-green)' }}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <h3 className="font-semibold text-lg mb-2">Téléphone</h3>
                  <a 
                    href="tel:+33612345678" 
                    className="text-gray-600 hover:text-forest-green transition-colors"
                  >
                    +33 6 12 34 56 78
                  </a>
                  <p className="text-sm text-gray-500 mt-2">
                    Disponible 7j/7, 24h/24
                  </p>
                </div>
              </FadeInSection>

              {/* Email */}
              <FadeInSection delay={0.2}>
                <div className="bg-white rounded-xl border border-gray-100 p-6 hover:shadow-md transition-shadow">
                  <div 
                    className="w-12 h-12 rounded-lg flex items-center justify-center mb-4"
                    style={{ backgroundColor: 'var(--gold-light)' }}
                  >
                    <svg 
                      className="w-6 h-6" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                      style={{ color: 'var(--forest-green)' }}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <h3 className="font-semibold text-lg mb-2">Email</h3>
                  <a 
                    href="mailto:contact@vtc-rachel.fr" 
                    className="text-gray-600 hover:text-forest-green transition-colors break-all"
                  >
                    contact@vtc-rachel.fr
                  </a>
                  <p className="text-sm text-gray-500 mt-2">
                    Réponse sous 24h
                  </p>
                </div>
              </FadeInSection>

              {/* Adresse */}
              <FadeInSection delay={0.3}>
                <div className="bg-white rounded-xl border border-gray-100 p-6 hover:shadow-md transition-shadow">
                  <div 
                    className="w-12 h-12 rounded-lg flex items-center justify-center mb-4"
                    style={{ backgroundColor: 'var(--gold-light)' }}
                  >
                    <svg 
                      className="w-6 h-6" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                      style={{ color: 'var(--forest-green)' }}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <h3 className="font-semibold text-lg mb-2">Zone de service</h3>
                  <p className="text-gray-600">
                    Paris et Île-de-France
                  </p>
                  <p className="text-sm text-gray-500 mt-2">
                    Aéroports CDG & Orly
                  </p>
                </div>
              </FadeInSection>

              {/* Horaires */}
              <FadeInSection delay={0.4}>
                <div className="bg-white rounded-xl border border-gray-100 p-6 hover:shadow-md transition-shadow">
                  <div 
                    className="w-12 h-12 rounded-lg flex items-center justify-center mb-4"
                    style={{ backgroundColor: 'var(--gold-light)' }}
                  >
                    <svg 
                      className="w-6 h-6" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                      style={{ color: 'var(--forest-green)' }}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="font-semibold text-lg mb-2">Disponibilité</h3>
                  <p className="text-gray-600">
                    Service 24h/24
                  </p>
                  <p className="text-sm text-gray-500 mt-2">
                    7 jours sur 7, week-ends et jours fériés
                  </p>
                </div>
              </FadeInSection>

            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <FadeInSection delay={0}>
        <section className="py-16 px-4 sm:px-6 bg-gray-50">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold mb-4" style={{ fontFamily: 'var(--font-playfair)' }}>
                Notre zone de service
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Nous couvrons l&apos;ensemble de l&apos;Île-de-France
              </p>
            </div>
            
            {/* Placeholder pour Google Maps */}
            <div className="rounded-2xl overflow-hidden shadow-xl border border-gray-200 h-96 bg-gray-200 flex items-center justify-center">
              <div className="text-center">
                <svg 
                  className="w-16 h-16 mx-auto mb-4 text-gray-400" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                </svg>
                <p className="text-gray-500 font-medium">
                  Google Maps à intégrer
                </p>
                <p className="text-sm text-gray-400 mt-2">
                  Paris et Île-de-France
                </p>
              </div>
            </div>
          </div>
        </section>
      </FadeInSection>

      {/* CTA Section */}
      <FadeInSection delay={0}>
        <section 
          className="mx-4 sm:mx-6 my-16 p-12 rounded-2xl text-center"
          style={{ backgroundColor: 'var(--forest-green)' }}
        >
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4" style={{ fontFamily: 'var(--font-playfair)' }}>
              Besoin d&apos;une course immédiate ?
            </h2>
            <p className="text-lg text-white/80 mb-8">
              Appelez-nous directement pour une réservation rapide
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="tel:+33612345678"
                className="px-8 py-4 rounded-lg font-semibold transition-all hover:scale-105 shadow-xl active:scale-95"
                style={{ 
                  backgroundColor: 'var(--gold-champagne)',
                  color: 'var(--forest-green)'
                }}
              >
                <span className="flex items-center justify-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  Appeler maintenant
                </span>
              </a>
              <a
                href="/"
                className="px-8 py-4 rounded-lg font-semibold transition-all hover:scale-105 border-2 border-white text-white hover:bg-white/10 active:scale-95"
              >
                Réserver en ligne
              </a>
            </div>
          </div>
        </section>
      </FadeInSection>

      <Footer />
    </div>
  );
}
