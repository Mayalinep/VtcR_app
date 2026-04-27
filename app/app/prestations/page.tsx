import Navigation from '../components/layout/Navigation';
import Footer from '../components/layout/Footer';
import Hero from '../components/sections/Hero';
import CTASection from '../components/sections/CTASection';
import FadeInSection from '../components/animations/FadeInSection';
import { PRESTATIONS_TRANSLATIONS, type AppLocale, DEFAULT_LOCALE, localizeHref } from '../lib/i18n';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Nos prestations | VTC Rachel',
  description:
    'Decouvrez les prestations VTC Rachel : transferts aeroports et gares, trajets inter-cites dans toute la France, mise a disposition et transport adolescent.',
};

interface PrestationsProps {
  locale?: AppLocale;
}

export default function PrestationsPage({ locale = DEFAULT_LOCALE }: PrestationsProps) {
  const t = PRESTATIONS_TRANSLATIONS[locale];

  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      <Hero
        badge={t.heroBadge}
        title={
          <>
            {t.heroTitleLine1} <span style={{ color: 'var(--forest-green)' }}>{t.heroTitleLine2}</span>
          </>
        }
        description={t.heroDescription}
      />

      <section className="py-16 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <FadeInSection delay={0}>
            <div className="text-center mb-12">
              <h2
                className="text-3xl sm:text-4xl font-bold mb-4"
                style={{ fontFamily: 'var(--font-playfair)', color: 'var(--forest-green)' }}
              >
                {t.sectionTitle}
              </h2>
              <p className="text-gray-600 max-w-3xl mx-auto">{t.sectionSubtitle}</p>
            </div>
          </FadeInSection>

          <div className="grid md:grid-cols-2 gap-6">
            {t.services.map((service, index) => (
              <FadeInSection key={service.title} delay={index * 0.08}>
                <article className="h-full rounded-2xl border border-gray-200 p-6 sm:p-8 bg-white shadow-sm">
                  <h3
                    className="text-xl sm:text-2xl font-bold mb-3"
                    style={{ fontFamily: 'var(--font-playfair)', color: 'var(--forest-green)' }}
                  >
                    {service.title}
                  </h3>
                  <p className="text-gray-700 leading-relaxed mb-5">{service.description}</p>
                  <ul className="space-y-2 text-gray-700">
                    {service.points.map((point) => (
                      <li key={point} className="flex items-start gap-2">
                        <span
                          className="w-2 h-2 rounded-full mt-2 flex-shrink-0"
                          style={{ backgroundColor: 'var(--forest-green)' }}
                        />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </article>
              </FadeInSection>
            ))}
          </div>

          <FadeInSection delay={0.25}>
            <div className="mt-10 rounded-xl border border-amber-200 bg-amber-50 p-5 text-sm text-amber-900">
              {t.notice}
            </div>
          </FadeInSection>
        </div>
      </section>

      <FadeInSection delay={0}>
        <CTASection
          title={t.ctaTitle}
          description={t.ctaDescription}
          primaryButton={{ text: t.ctaPrimary, href: localizeHref('/contact', locale) }}
          secondaryButton={{ text: t.ctaSecondary, href: localizeHref('/tarifs', locale) }}
        />
      </FadeInSection>

      <Footer />
    </div>
  );
}
