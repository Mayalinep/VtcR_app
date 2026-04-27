import Navigation from '../components/layout/Navigation';
import Footer from '../components/layout/Footer';
import ContactForm from '../components/forms/ContactForm';
import Hero from '../components/sections/Hero';
import CTASection from '../components/sections/CTASection';
import FadeInSection from '../components/animations/FadeInSection';
import { CONTACT_TRANSLATIONS, type AppLocale, DEFAULT_LOCALE, localizeHref } from '../lib/i18n';
import type { Metadata } from 'next';
import { Suspense } from 'react';

export const metadata: Metadata = {
  title: "Contact - Nous contacter | VTC Rachel",
  description: "Contactez VTC Rachel pour toute question sur nos services de chauffeur privé. Réponse rapide garantie par téléphone, email ou formulaire de contact.",
};

const mapsQuery = encodeURIComponent("Paris, Ile-de-France");
const mapsEmbedUrl = `https://maps.google.com/maps?q=${mapsQuery}&t=&z=10&ie=UTF8&iwloc=&output=embed`;

interface ContactProps {
  locale?: AppLocale;
}

export default function ContactPage({ locale = DEFAULT_LOCALE }: ContactProps) {
  const t = CONTACT_TRANSLATIONS[locale];

  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      <Hero
        badge={t.heroBadge}
        title={<>{t.heroTitleLine1}<br /><span style={{ color: 'var(--forest-green)' }}>{t.heroTitleLine2}</span></>}
        description={t.heroDescription}
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
                    {t.formTitle}
                  </h2>
                  <p className="text-gray-600 mb-8">{t.formSubtitle}</p>

                  <Suspense fallback={<div className="text-sm text-gray-500">Chargement du formulaire...</div>}>
                    <ContactForm />
                  </Suspense>
                </div>
              </FadeInSection>
            </div>

            {/* Infos de contact - 2 colonnes */}
            <div className="lg:col-span-2 space-y-6">

              {/* Téléphone */}
              <FadeInSection delay={0.1}>
                <div className="bg-white rounded-xl border border-gray-100 p-6 hover:shadow-md transition-shadow">
                  <div className="w-12 h-12 rounded-lg flex items-center justify-center mb-4" style={{ backgroundColor: 'var(--gold-light)' }}>
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: 'var(--forest-green)' }}>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <h3 className="font-semibold text-lg mb-2">{t.phone.title}</h3>
                  <a href="tel:+33661590290" className="text-gray-600 hover:text-forest-green transition-colors">
                    +33 6 61 59 02 90
                  </a>
                  <p className="text-sm text-gray-500 mt-2">{t.phone.availability}</p>
                </div>
              </FadeInSection>

              {/* Email */}
              <FadeInSection delay={0.2}>
                <div className="bg-white rounded-xl border border-gray-100 p-6 hover:shadow-md transition-shadow">
                  <div className="w-12 h-12 rounded-lg flex items-center justify-center mb-4" style={{ backgroundColor: 'var(--gold-light)' }}>
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: 'var(--forest-green)' }}>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <h3 className="font-semibold text-lg mb-2">{t.email.title}</h3>
                  <a href="mailto:contact@vtc-rachel.fr" className="text-gray-600 hover:text-forest-green transition-colors break-all">
                    contact@vtc-rachel.fr
                  </a>
                  <p className="text-sm text-gray-500 mt-2">{t.email.responseTime}</p>
                </div>
              </FadeInSection>

              {/* Zone de service */}
              <FadeInSection delay={0.3}>
                <div className="bg-white rounded-xl border border-gray-100 p-6 hover:shadow-md transition-shadow">
                  <div className="w-12 h-12 rounded-lg flex items-center justify-center mb-4" style={{ backgroundColor: 'var(--gold-light)' }}>
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: 'var(--forest-green)' }}>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <h3 className="font-semibold text-lg mb-2">{t.address.title}</h3>
                  <p className="text-gray-600">{t.address.area}</p>
                  <p className="text-sm text-gray-500 mt-2">{t.address.airports}</p>
                </div>
              </FadeInSection>

              {/* Disponibilité */}
              <FadeInSection delay={0.4}>
                <div className="bg-white rounded-xl border border-gray-100 p-6 hover:shadow-md transition-shadow">
                  <div className="w-12 h-12 rounded-lg flex items-center justify-center mb-4" style={{ backgroundColor: 'var(--gold-light)' }}>
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: 'var(--forest-green)' }}>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="font-semibold text-lg mb-2">{t.hours.title}</h3>
                  <p className="text-gray-600">{t.hours.schedule}</p>
                  <p className="text-sm text-gray-500 mt-2">{t.hours.days}</p>
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
                {t.mapTitle}
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">{t.mapSubtitle}</p>
            </div>

            <div className="rounded-2xl overflow-hidden shadow-xl border border-gray-200 h-96 bg-gray-200">
              <iframe
                title="Carte Google Maps - Zone de service VTC Rachel"
                src={mapsEmbedUrl}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </section>
      </FadeInSection>

      {/* CTA Section */}
      <FadeInSection delay={0}>
        <CTASection
          title={t.ctaTitle}
          description={t.ctaDescription}
          primaryButton={{ text: t.ctaPrimary, href: 'tel:+33661590290' }}
          secondaryButton={{ text: t.ctaSecondary, href: localizeHref('/', locale) }}
          className="my-16"
        />
      </FadeInSection>

      <Footer />
    </div>
  );
}
