import Navigation from '../components/layout/Navigation';
import Footer from '../components/layout/Footer';
import ContactForm from '../components/forms/ContactForm';
import Hero from '../components/sections/Hero';
import CTASection from '../components/sections/CTASection';
import FadeInSection from '../components/animations/FadeInSection';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Contact - Nous contacter | VTC Rachel",
  description: "Contactez VTC Rachel pour toute question sur nos services de chauffeur privé. Réponse rapide garantie par téléphone, email ou formulaire de contact.",
};

const mapsApiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
const mapsQuery = encodeURIComponent("Paris, Ile-de-France");
const mapsEmbedUrl = mapsApiKey
  ? `https://www.google.com/maps/embed/v1/place?key=${mapsApiKey}&q=${mapsQuery}&zoom=10`
  : null;

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      {/* Hero Section */}
      <Hero
        badge="Nous sommes à votre écoute"
        title={<>Contactez<br /><span style={{ color: 'var(--forest-green)' }}>VTC Rachel</span></>}
        description="Une question ? Un devis personnalisé ? Notre équipe vous répond rapidement"
      />

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
                    href="tel:+33661590290" 
                    className="text-gray-600 hover:text-forest-green transition-colors"
                  >
                    +33 6 61 59 02 90
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
            
            <div className="rounded-2xl overflow-hidden shadow-xl border border-gray-200 h-96 bg-gray-200">
              {mapsEmbedUrl ? (
                <iframe
                  title="Carte Google Maps - Zone de service VTC Rachel"
                  src={mapsEmbedUrl}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              ) : (
                <div className="h-full flex items-center justify-center px-6">
                  <div className="text-center">
                    <svg
                      className="w-16 h-16 mx-auto mb-4 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                    </svg>
                    <p className="text-gray-600 font-medium">
                      Carte indisponible en local
                    </p>
                    <p className="text-sm text-gray-500 mt-2">
                      Ajoutez `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY` dans votre fichier `.env.local`.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>
      </FadeInSection>

      {/* CTA Section */}
      <FadeInSection delay={0}>
        <CTASection
          title="Besoin d'une course immédiate ?"
          description="Appelez-nous directement pour une réservation rapide"
          primaryButton={{
            text: "Appeler maintenant",
            href: "tel:+33661590290"
          }}
          secondaryButton={{
            text: "Réserver en ligne",
            href: "/"
          }}
          className="my-16"
        />
      </FadeInSection>

      <Footer />
    </div>
  );
}
