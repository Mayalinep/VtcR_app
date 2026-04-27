import Image from 'next/image';
import Navigation from './components/layout/Navigation';
import Footer from './components/layout/Footer';
import FadeIn from './components/animations/FadeIn';
import FadeInSection from './components/animations/FadeInSection';
import PriceEstimator from './components/forms/PriceEstimator';
import HeroScrollIndicator from './components/ui/HeroScrollIndicator';
import Badge from './components/ui/Badge';
import Testimonials from './components/sections/Testimonials';
import { FEATURES_DATA } from './lib/data/features';
import {
  HOME_TRANSLATIONS,
  COMMON_TRANSLATIONS,
  type AppLocale,
  DEFAULT_LOCALE,
} from './lib/i18n';

interface HomeProps {
  locale?: AppLocale;
}

export default function Home({ locale = DEFAULT_LOCALE }: HomeProps) {
  const t = HOME_TRANSLATIONS[locale];
  const tc = COMMON_TRANSLATIONS[locale];
  // On garde les icônes SVG depuis FEATURES_DATA, et on prend les textes depuis les traductions.
  const featuresIcons = Object.fromEntries(FEATURES_DATA.map((f) => [f.id, f.icon]));

  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      {/* Hero Section */}
      <main className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/vtc-rachel-car.png"
            alt="Voiture VTC Rachel - Berline premium Île-de-France"
            fill
            priority
            quality={90}
            unoptimized
            className="object-cover object-center"
            sizes="100vw"
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                'linear-gradient(to right, rgba(15, 76, 58, 0.85) 0%, rgba(15, 76, 58, 0.7) 40%, rgba(15, 76, 58, 0.4) 70%, transparent 100%)',
            }}
          />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto w-full px-4 sm:px-6">
          <div className="max-w-2xl text-left">
            <FadeIn delay={0.3}>
              <div
                className="inline-block px-4 py-2 rounded-full text-sm font-medium mb-8 backdrop-blur-sm"
                style={{
                  backgroundColor: 'rgba(212, 175, 55, 0.15)',
                  color: '#D4AF37',
                  border: '1px solid rgba(212, 175, 55, 0.3)',
                }}
              >
                {t.heroBadge}
              </div>
            </FadeIn>

            <FadeIn delay={0.5}>
              <h1
                className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight mb-6 tracking-tight text-white"
                style={{ fontFamily: 'var(--font-playfair)' }}
              >
                {t.heroTitleLine1}
                <br />
                {t.heroTitleLine2}
              </h1>
            </FadeIn>

            <FadeIn delay={0.7}>
              <p className="text-base sm:text-lg lg:text-xl text-white/90 mb-10 leading-relaxed max-w-xl">
                {t.heroDescription}
              </p>
            </FadeIn>

            <FadeIn delay={0.9}>
              <div className="flex flex-col sm:flex-row gap-4 max-w-md sm:max-w-none">
                <a
                  href="#booking-estimator"
                  className="px-10 py-4 rounded-lg font-semibold transition-all hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl text-base"
                  style={{
                    backgroundColor: 'var(--gold-champagne)',
                    color: 'var(--forest-green)',
                  }}
                >
                  {tc.bookNow}
                </a>
                <a
                  href="#why-choose"
                  className="px-10 py-3.5 rounded-lg font-medium transition-all hover:scale-105 active:scale-95 backdrop-blur-sm border-2 border-white text-white hover:bg-white/10 text-base"
                >
                  {tc.learnMore}
                </a>
              </div>
            </FadeIn>
          </div>
        </div>

        <HeroScrollIndicator />
      </main>

      {/* Section Estimateur */}
      <section id="booking-estimator" className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6" style={{ backgroundColor: '#FAFAF9' }}>
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
            <div className="w-full lg:w-2/5">
              <FadeInSection delay={0}>
                <div className="text-left mb-6">
                  <h2
                    className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-3"
                    style={{ fontFamily: 'var(--font-playfair)' }}
                  >
                    {t.bookingTitle}
                  </h2>
                  <p className="text-gray-500 text-sm sm:text-base">{t.bookingSubtitle}</p>
                </div>
              </FadeInSection>

              <PriceEstimator />
            </div>

            <div className="hidden lg:block lg:w-3/5">
              <FadeInSection delay={0.2}>
                <div className="sticky top-24 h-[600px] rounded-2xl overflow-hidden shadow-lg border border-gray-200">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d335994.89219464146!2d2.2646348!3d48.8589465!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e66e1f06e2b005%3A0x40b82c3688c9460!2sParis%2C%20France!5e0!3m2!1sfr!2sfr!4v1704902400000!5m2!1sfr!2sfr"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen={false}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title={t.zonesTitle}
                  />
                </div>
              </FadeInSection>
            </div>
          </div>
        </div>
      </section>

      {/* Pourquoi nous choisir */}
      <FadeInSection delay={0}>
        <section id="why-choose" className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-left mb-10 sm:mb-12">
              <h2
                className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-3"
                style={{ fontFamily: 'var(--font-playfair)' }}
              >
                {t.whyChooseTitle}{' '}
                <span style={{ color: 'var(--forest-green)' }}>{t.whyChooseHighlight}</span> ?
              </h2>
              <p className="text-gray-600 text-sm sm:text-base max-w-3xl">
                {t.whyChooseSubtitle}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10">
              {t.features.map((feature, i) => (
                <FadeInSection key={feature.id} delay={i * 0.15}>
                  <div className="text-left group">
                    <div className="mb-3">{featuresIcons[feature.id]}</div>

                    <h3 className="text-base font-bold mb-2 text-gray-900">{feature.title}</h3>

                    <p className="text-xs text-gray-600 leading-snug mb-3">
                      {feature.description}
                    </p>

                    <button className="text-xs font-medium text-gray-700 hover:text-gray-900 underline decoration-1 underline-offset-2 transition-colors">
                      {tc.readMore}
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
          <FadeInSection delay={0}>
            <section className="mt-20 sm:mt-28 lg:mt-36">
              <div className="text-center mb-12 sm:mb-16 px-4">
                <Badge className="mb-6">{t.testimonialsBadge}</Badge>
                <h2
                  className="text-3xl sm:text-4xl font-bold mb-4"
                  style={{ fontFamily: 'var(--font-playfair)' }}
                >
                  {t.testimonialsTitle}
                </h2>
                <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
                  {t.testimonialsSubtitle}
                </p>
              </div>

              <Testimonials />
            </section>
          </FadeInSection>

          {/* Zones desservies */}
          <FadeInSection
            className="mt-16 sm:mt-24 lg:mt-32 p-6 sm:p-8 lg:p-12 rounded-2xl"
            style={{ backgroundColor: 'var(--gold-light)' }}
          >
            <div className="max-w-3xl mx-auto text-center">
              <h2
                className="text-3xl sm:text-4xl font-bold mb-4"
                style={{
                  fontFamily: 'var(--font-playfair)',
                  color: 'var(--forest-green)',
                }}
              >
                {t.zonesTitle}
              </h2>
              <p className="text-base sm:text-lg text-gray-700 mb-8">{t.zonesDescription}</p>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 text-left">
                {t.zones.map((zone, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <div
                      className="w-2 h-2 rounded-full flex-shrink-0"
                      style={{ backgroundColor: 'var(--forest-green)' }}
                    />
                    <span className="text-sm sm:text-base text-gray-700">{zone}</span>
                  </div>
                ))}
              </div>

              <p className="text-xs sm:text-sm text-gray-600 mt-6 sm:mt-8">{t.zonesAdditional}</p>
            </div>
          </FadeInSection>

          {/* CTA Final */}
          <FadeInSection
            className="mt-20 sm:mt-28 lg:mt-36 text-center p-8 sm:p-12 lg:p-16 rounded-2xl"
            style={{ backgroundColor: 'var(--forest-green)' }}
          >
            <h2
              className="text-3xl sm:text-4xl font-bold text-white mb-4"
              style={{ fontFamily: 'var(--font-playfair)' }}
            >
              {t.ctaTitle}
            </h2>
            <p className="text-base sm:text-lg lg:text-xl text-white/80 mb-8 max-w-2xl mx-auto px-4">
              {t.ctaDescription}
            </p>
            <div className="flex justify-center px-4">
              <a
                href="#booking-estimator"
                className="w-full sm:w-auto max-w-md sm:max-w-none px-10 py-4 rounded-lg font-semibold transition-all hover:scale-105 shadow-xl active:scale-95"
                style={{
                  backgroundColor: 'var(--gold-champagne)',
                  color: 'var(--forest-green)',
                }}
              >
                {tc.bookNow}
              </a>
            </div>
          </FadeInSection>
        </div>
      </main>

      <Footer />
    </div>
  );
}
