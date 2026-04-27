import Image from 'next/image';
import Link from 'next/link';
import Navigation from '../components/layout/Navigation';
import Footer from '../components/layout/Footer';
import Hero from '../components/sections/Hero';
import CTASection from '../components/sections/CTASection';
import FadeInSection from '../components/animations/FadeInSection';
import PricingCarousel from '../components/ui/PricingCarousel';
import { TARIFS_TRANSLATIONS, type AppLocale, DEFAULT_LOCALE, localizeHref } from '../lib/i18n';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Nos Tarifs | VTC Rachel",
  description: "Découvrez nos tarifs transparents pour vos courses VTC en Île-de-France : forfaits aéroports, mise à disposition, trajets longue distance.",
};

interface TarifsProps {
  locale?: AppLocale;
}

const CheckIcon = () => (
  <svg className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
  </svg>
);

export default function TarifsPage({ locale = DEFAULT_LOCALE }: TarifsProps) {
  const t = TARIFS_TRANSLATIONS[locale];

  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      <Hero
        badge={t.heroBadge}
        title={<>{t.heroTitleLine1}<br /><span style={{ color: 'var(--forest-green)' }}>{t.heroTitleLine2}</span></>}
        description={t.heroDescription}
      />

      {/* Forfaits Aéroports */}
      <section className="relative py-16 px-4 sm:px-6 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/tarif/aeroport.png"
            alt="Aéroport - Transferts VTC"
            fill
            unoptimized
            className="object-cover"
            quality={85}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-white/75 via-white/70 to-white/80" />
        </div>

        <div className="relative z-10 max-w-6xl mx-auto">
          <FadeInSection delay={0}>
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4" style={{ fontFamily: 'var(--font-playfair)', color: 'var(--forest-green)' }}>
                {t.airportsSectionTitle}
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">{t.airportsSectionSubtitle}</p>
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
                <p className="text-sm text-gray-600">{t.airportSubtitles.cdg}</p>
              </div>

              <div className="text-center mb-6 pb-6 border-b border-gray-200">
                <div className="text-3xl font-bold text-gray-700">{t.fromPrefix} 35€*</div>
                <div className="text-sm text-gray-500 mt-1">{t.priceIndicative}</div>
              </div>

              <ul className="space-y-3 text-sm text-gray-600 mb-6">
                {t.airportFeatures.map((feature) => (
                  <li key={feature} className="flex items-start gap-2">
                    <CheckIcon />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <Link href={localizeHref('/', locale)} className="mt-auto block text-center px-6 py-3 rounded-lg font-semibold transition-all hover:scale-105" style={{ backgroundColor: 'var(--forest-green)', color: 'white' }}>
                {t.bookButton}
              </Link>
            </div>

            {/* Orly */}
            <div className="relative bg-white border-2 rounded-2xl p-8 hover:border-forest-green transition-colors h-full flex flex-col" style={{ borderColor: 'var(--forest-green)' }}>
              <div className="absolute -top-3 sm:-top-4 left-1/2 transform -translate-x-1/2">
                <div className="px-4 py-1 rounded-full text-xs font-bold text-white" style={{ backgroundColor: 'var(--gold-champagne)' }}>
                  {t.popularBadge}
                </div>
              </div>

              <div className="text-center mb-6 mt-2 sm:mt-4">
                <div className="w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4" style={{ backgroundColor: 'var(--gold-champagne)' }}>
                  <svg className="w-8 h-8" style={{ color: 'var(--forest-green)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-2" style={{ color: 'var(--forest-green)' }}>Paris ↔ Orly</h3>
                <p className="text-sm text-gray-600">{t.airportSubtitles.orly}</p>
              </div>

              <div className="text-center mb-6 pb-6 border-b border-gray-200">
                <div className="text-3xl font-bold text-gray-700">{t.fromPrefix} 30€*</div>
                <div className="text-sm text-gray-500 mt-1">{t.priceIndicative}</div>
              </div>

              <ul className="space-y-3 text-sm text-gray-600 mb-6">
                {t.airportFeatures.map((feature) => (
                  <li key={feature} className="flex items-start gap-2">
                    <CheckIcon />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <Link href={localizeHref('/', locale)} className="mt-auto block text-center px-6 py-3 rounded-lg font-semibold transition-all hover:scale-105" style={{ backgroundColor: 'var(--forest-green)', color: 'white' }}>
                {t.bookButton}
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
                <p className="text-sm text-gray-600">{t.airportSubtitles.beauvais}</p>
              </div>

              <div className="text-center mb-6 md:min-h-[140px] md:flex md:flex-col md:justify-center">
                <div className="text-4xl font-bold" style={{ color: 'var(--forest-green)' }}>130€</div>
                <div className="text-sm text-gray-500 mt-1">{t.dayLabel}</div>
              </div>

              <div className="text-center mb-6 pb-6 border-b border-gray-200">
                <div className="text-3xl font-bold text-gray-700">150€</div>
                <div className="text-sm text-gray-500 mt-1">{t.nightLabel}</div>
              </div>

              <ul className="space-y-3 text-sm text-gray-600 mb-6">
                {t.airportFeatures.map((feature) => (
                  <li key={feature} className="flex items-start gap-2">
                    <CheckIcon />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <Link href={localizeHref('/', locale)} className="mt-auto block text-center px-6 py-3 rounded-lg font-semibold transition-all hover:scale-105" style={{ backgroundColor: 'var(--forest-green)', color: 'white' }}>
                {t.bookButton}
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
                {t.availabilitySectionTitle}
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">{t.availabilitySectionSubtitle}</p>
            </div>
          </FadeInSection>

          <PricingCarousel autoplayDelay={4000}>
            {t.availabilityCards.map((card, index) => {
              const isFeatured = index === 1;
              const prices = ['45€', '160€', '280€'];
              const icons = [
                <path key="clock" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />,
                <path key="sun" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />,
                <path key="star" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />,
              ];

              return (
                <div
                  key={card.title}
                  className={`${isFeatured ? 'relative' : ''} bg-white border-2 ${isFeatured ? '' : 'border-gray-200'} rounded-2xl p-8 hover:border-forest-green transition-colors h-full flex flex-col`}
                  style={isFeatured ? { borderColor: 'var(--forest-green)' } : {}}
                >
                  {isFeatured && (
                    <div className="absolute -top-3 sm:-top-4 left-1/2 transform -translate-x-1/2">
                      <div className="px-4 py-1 rounded-full text-xs font-bold text-white" style={{ backgroundColor: 'var(--gold-champagne)' }}>
                        {t.bestValueBadge}
                      </div>
                    </div>
                  )}

                  <div className={`text-center mb-6 ${isFeatured ? 'mt-2 sm:mt-4' : ''} md:min-h-[140px] md:flex md:flex-col md:justify-center`}>
                    <div
                      className="w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4"
                      style={{ backgroundColor: isFeatured ? 'var(--gold-champagne)' : 'var(--gold-light)' }}
                    >
                      <svg className="w-8 h-8" style={{ color: 'var(--forest-green)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        {icons[index]}
                      </svg>
                    </div>
                    <h3 className="text-xl font-bold mb-2" style={{ color: 'var(--forest-green)' }}>{card.title}</h3>
                    <p className="text-sm text-gray-600">{card.duration}</p>
                  </div>

                  <div className="text-center mb-6 pb-6 border-b border-gray-200 md:min-h-[130px]">
                    <div className="text-4xl font-bold" style={{ color: 'var(--forest-green)' }}>{prices[index]}</div>
                    <div className="text-sm text-gray-500 mt-1">{card.rateLabel}</div>
                    {card.kmBadge && (
                      <div className="inline-block mt-2 px-3 py-1 rounded-full text-xs font-semibold" style={{ backgroundColor: 'var(--gold-light)', color: 'var(--forest-green)' }}>
                        {card.kmBadge}
                      </div>
                    )}
                    {!card.kmBadge && (
                      <div className="inline-block mt-2 px-3 py-1 rounded-full text-xs font-semibold opacity-0 select-none" style={{ backgroundColor: 'var(--gold-light)', color: 'var(--forest-green)' }}>
                        –
                      </div>
                    )}
                  </div>

                  <ul className="space-y-3 text-sm text-gray-600 mb-6">
                    {card.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-2">
                        <CheckIcon />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </PricingCarousel>
        </div>
      </section>

      {/* Conditions tarifaires */}
      <section className="py-16 px-4 sm:px-6" style={{ backgroundColor: '#FAFAF9' }}>
        <div className="max-w-6xl mx-auto">
          <FadeInSection delay={0}>
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4" style={{ fontFamily: 'var(--font-playfair)', color: 'var(--forest-green)' }}>
                {t.optionsSectionTitle}
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">{t.optionsSectionSubtitle}</p>
            </div>
          </FadeInSection>

          <FadeInSection delay={0}>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl sm:text-2xl font-bold" style={{ color: 'var(--forest-green)' }}>
                {t.paidOptionsTitle}
              </h3>
              <span className="px-3 py-1 rounded-full text-xs font-semibold" style={{ backgroundColor: 'var(--gold-light)', color: 'var(--forest-green)' }}>
                {t.onDemandBadge}
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
                <h3 className="font-bold mb-2 text-center" style={{ color: 'var(--forest-green)' }}>{t.childSeat.title}</h3>
                <p className="text-2xl font-bold text-gray-900 mb-2 text-center">5€</p>
                <p className="text-sm text-gray-600 text-center">{t.childSeat.perLabel}</p>
              </div>
            </FadeInSection>

            <FadeInSection delay={0.1}>
              <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm h-full flex flex-col">
                <div className="w-12 h-12 mx-auto rounded-full flex items-center justify-center mb-4" style={{ backgroundColor: 'var(--gold-light)' }}>
                  <svg className="w-6 h-6" style={{ color: 'var(--forest-green)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="font-bold mb-2 text-center" style={{ color: 'var(--forest-green)' }}>{t.extraWait.title}</h3>
                <p className="text-2xl font-bold text-gray-900 mb-2 text-center">15€</p>
                <p className="text-sm text-gray-600 text-center">{t.extraWait.perLabel}</p>
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
                {t.includedTitle}
              </h2>

              <div className="grid sm:grid-cols-2 gap-6">
                {t.includedItems.map((item) => (
                  <div key={item.title} className="flex items-start gap-3">
                    <svg className="w-6 h-6 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <div>
                      <h3 className="font-semibold mb-1">{item.title}</h3>
                      <p className="text-sm text-white/80">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </FadeInSection>

      {/* CTA */}
      <FadeInSection delay={0}>
        <CTASection
          title={t.ctaTitle}
          description={t.ctaDescription}
          primaryButton={{ text: t.ctaPrimary, href: localizeHref('/', locale) }}
          secondaryButton={{ text: t.ctaSecondary, href: localizeHref('/contact', locale) }}
        />
      </FadeInSection>

      <Footer />
    </div>
  );
}
