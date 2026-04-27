import Link from 'next/link';
import Navigation from '../components/layout/Navigation';
import Footer from '../components/layout/Footer';
import Hero from '../components/sections/Hero';
import FadeInSection from '../components/animations/FadeInSection';
import { ABOUT_TRANSLATIONS, type AppLocale, DEFAULT_LOCALE, localizeHref } from '../lib/i18n';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "À Propos | VTC Rachel",
  description: "Découvrez VTC Rachel, notre histoire, nos valeurs et notre engagement pour un service de transport premium en Île-de-France.",
};

const valueIcons = [
  <path key="check" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />,
  <path key="clock" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />,
  <path key="people" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />,
  <path key="shield" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />,
  <path key="smile" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />,
  <path key="globe" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />,
];

const whyIcons = [
  <path key="star" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />,
  <path key="coin" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />,
  <path key="phone" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />,
  <path key="heart" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />,
];

interface AProposProps {
  locale?: AppLocale;
}

export default function AProposPage({ locale = DEFAULT_LOCALE }: AProposProps) {
  const t = ABOUT_TRANSLATIONS[locale];

  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      <Hero
        badge={t.heroBadge}
        title={<>{t.heroTitleLine1}<br /><span style={{ color: 'var(--forest-green)' }}>{t.heroTitleLine2}</span></>}
        description={t.heroDescription}
      />

      {/* Notre Histoire */}
      <section className="py-16 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <FadeInSection delay={0}>
              <div>
                <h2 className="text-3xl font-bold mb-6" style={{ fontFamily: 'var(--font-playfair)', color: 'var(--forest-green)' }}>
                  {t.storyTitle}
                </h2>
                <div className="space-y-4 text-gray-700 leading-relaxed">
                  <p>{t.storyP1}</p>
                  <p>{t.storyP2}</p>
                  <p>{t.storyP3}</p>
                </div>
              </div>
            </FadeInSection>

            <FadeInSection delay={0.2}>
              <div className="relative">
                <div className="aspect-[4/5] rounded-2xl bg-gradient-to-br from-forest-green to-forest-green-light flex items-center justify-center shadow-2xl">
                  <div className="text-center text-white p-8">
                    <svg className="w-24 h-24 mx-auto mb-4 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    <p className="text-sm opacity-80">Photo Rachel</p>
                    <p className="text-xs opacity-60 mt-2">[À remplacer]</p>
                  </div>
                </div>
                <div className="absolute -bottom-6 -right-6 px-6 py-4 rounded-xl shadow-xl" style={{ backgroundColor: 'var(--gold-champagne)' }}>
                  <div className="text-center">
                    <div className="text-3xl font-bold" style={{ color: 'var(--forest-green)' }}>2020</div>
                    <div className="text-sm font-medium" style={{ color: 'var(--forest-green)' }}>{t.teamFounderBadge === 'Founder' ? 'Founded' : t.teamFounderBadge === 'Fundadora' ? 'Fundación' : 'Fondation'}</div>
                  </div>
                </div>
              </div>
            </FadeInSection>
          </div>
        </div>
      </section>

      {/* Nos Valeurs */}
      <section className="py-16 px-4 sm:px-6" style={{ backgroundColor: '#FAFAF9' }}>
        <div className="max-w-6xl mx-auto">
          <FadeInSection delay={0}>
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4" style={{ fontFamily: 'var(--font-playfair)', color: 'var(--forest-green)' }}>
                {t.valuesSectionTitle}
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">{t.valuesSectionSubtitle}</p>
            </div>
          </FadeInSection>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {t.values.map((value, i) => (
              <FadeInSection key={value.title} delay={i * 0.1}>
                <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow h-full flex flex-col">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center mb-4" style={{ backgroundColor: 'var(--gold-light)' }}>
                    <svg className="w-6 h-6" style={{ color: 'var(--forest-green)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      {valueIcons[i]}
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold mb-3" style={{ color: 'var(--forest-green)' }}>{value.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{value.description}</p>
                </div>
              </FadeInSection>
            ))}
          </div>
        </div>
      </section>

      {/* Notre Équipe */}
      <section className="py-16 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <FadeInSection delay={0}>
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4" style={{ fontFamily: 'var(--font-playfair)', color: 'var(--forest-green)' }}>
                {t.teamSectionTitle}
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">{t.teamSectionSubtitle}</p>
            </div>
          </FadeInSection>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Rachel - Fondatrice */}
            <FadeInSection delay={0}>
              <div className="text-center">
                <div className="relative mb-6 inline-block">
                  <div className="w-48 h-48 rounded-full bg-gradient-to-br from-forest-green to-forest-green-light flex items-center justify-center shadow-xl mx-auto">
                    <svg className="w-20 h-20 text-white opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                  <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 px-4 py-1 rounded-full text-xs font-semibold whitespace-nowrap shadow-lg" style={{ backgroundColor: 'var(--gold-champagne)', color: 'var(--forest-green)' }}>
                    {t.teamFounderBadge}
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-2" style={{ color: 'var(--forest-green)' }}>Rachel</h3>
                <p className="text-sm text-gray-600 mb-3">{t.teamRachelRole}</p>
                <p className="text-sm text-gray-600 leading-relaxed">{t.teamRachelDescription}</p>
              </div>
            </FadeInSection>

            {/* Placeholder équipe future */}
            <FadeInSection delay={0.2}>
              <div className="text-center">
                <div className="relative mb-6 inline-block">
                  <div className="w-48 h-48 rounded-full bg-gray-100 flex items-center justify-center shadow-lg mx-auto border-2 border-dashed border-gray-300">
                    <div className="text-center text-gray-400">
                      <svg className="w-16 h-16 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4v16m8-8H4" />
                      </svg>
                      <p className="text-xs">{t.teamSoonTitle}</p>
                    </div>
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-2 text-gray-400">{t.teamSoonTitle}</h3>
                <p className="text-sm text-gray-500 mb-3">{t.teamSoonRole}</p>
                <p className="text-sm text-gray-500 leading-relaxed">{t.teamSoonDescription}</p>
              </div>
            </FadeInSection>

            <FadeInSection delay={0.4}>
              <div className="text-center">
                <div className="relative mb-6 inline-block">
                  <div className="w-48 h-48 rounded-full bg-gray-100 flex items-center justify-center shadow-lg mx-auto border-2 border-dashed border-gray-300">
                    <div className="text-center text-gray-400">
                      <svg className="w-16 h-16 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4v16m8-8H4" />
                      </svg>
                      <p className="text-xs">{t.teamJoinTitle}</p>
                    </div>
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-2 text-gray-400">{t.teamJoinTitle}</h3>
                <p className="text-sm text-gray-500 mb-3">{t.teamJoinRole}</p>
                <p className="text-sm text-gray-500 leading-relaxed">{t.teamJoinDescription}</p>
              </div>
            </FadeInSection>
          </div>
        </div>
      </section>

      {/* Pourquoi nous choisir */}
      <section className="py-16 px-4 sm:px-6" style={{ backgroundColor: '#FAFAF9' }}>
        <div className="max-w-6xl mx-auto">
          <FadeInSection delay={0}>
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4" style={{ fontFamily: 'var(--font-playfair)', color: 'var(--forest-green)' }}>
                {t.whySectionTitle}
              </h2>
            </div>
          </FadeInSection>

          <div className="grid md:grid-cols-2 gap-8">
            {t.whyItems.map((item, i) => (
              <FadeInSection key={item.title} delay={i * 0.1}>
                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ backgroundColor: 'var(--gold-light)' }}>
                      <svg className="w-6 h-6" style={{ color: 'var(--forest-green)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        {whyIcons[i]}
                      </svg>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold mb-2" style={{ color: 'var(--forest-green)' }}>{item.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{item.description}</p>
                  </div>
                </div>
              </FadeInSection>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <FadeInSection delay={0}>
        <section className="py-16 px-4 sm:px-6">
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-4xl font-bold mb-2" style={{ color: 'var(--forest-green)' }}>2020</div>
                <div className="text-sm text-gray-600">{t.statsYearLabel}</div>
              </div>
              <div>
                <div className="text-4xl font-bold mb-2" style={{ color: 'var(--forest-green)' }}>500+</div>
                <div className="text-sm text-gray-600">{t.statsRidesLabel}</div>
              </div>
              <div>
                <div className="text-4xl font-bold mb-2" style={{ color: 'var(--forest-green)' }}>4.9/5</div>
                <div className="text-sm text-gray-600">{t.statsRatingLabel}</div>
              </div>
              <div>
                <div className="text-4xl font-bold mb-2" style={{ color: 'var(--forest-green)' }}>100%</div>
                <div className="text-sm text-gray-600">{t.statsClientsLabel}</div>
              </div>
            </div>
          </div>
        </section>
      </FadeInSection>

      {/* CTA */}
      <FadeInSection delay={0}>
        <section className="mx-4 sm:mx-6 mb-16 p-12 rounded-2xl text-center" style={{ backgroundColor: 'var(--forest-green)' }}>
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4" style={{ fontFamily: 'var(--font-playfair)' }}>
              {t.ctaTitle}
            </h2>
            <p className="text-lg text-white/80 mb-8">{t.ctaDescription}</p>
            <Link
              href={localizeHref('/', locale)}
              className="inline-block px-8 py-4 rounded-lg font-semibold transition-all hover:scale-105 shadow-xl active:scale-95"
              style={{ backgroundColor: 'var(--gold-champagne)', color: 'var(--forest-green)' }}
            >
              {t.ctaPrimary}
            </Link>
          </div>
        </section>
      </FadeInSection>

      <Footer />
    </div>
  );
}
