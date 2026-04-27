import Navigation from '../components/layout/Navigation';
import Footer from '../components/layout/Footer';
import FAQ from '../components/sections/FAQ';
import Hero from '../components/sections/Hero';
import CTASection from '../components/sections/CTASection';
import FadeInSection from '../components/animations/FadeInSection';
import { FAQ_PAGE_TRANSLATIONS, type AppLocale, DEFAULT_LOCALE, localizeHref } from '../lib/i18n';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "FAQ - Questions Fréquentes | VTC Rachel",
  description: "Toutes les réponses à vos questions sur notre service VTC : réservation, tarifs, zones desservies, moyens de paiement, annulation et plus encore.",
};

interface FAQProps {
  locale?: AppLocale;
}

export default function FAQPage({ locale = DEFAULT_LOCALE }: FAQProps) {
  const t = FAQ_PAGE_TRANSLATIONS[locale];

  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      <Hero
        badge={t.heroBadge}
        title={<>{t.heroTitleLine1}<br /><span style={{ color: 'var(--forest-green)' }}>{t.heroTitleLine2}</span></>}
        description={t.heroDescription}
      />

      {/* FAQ Section */}
      <section className="py-16 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <FAQ />
        </div>
      </section>

      {/* CTA Section */}
      <FadeInSection delay={0}>
        <CTASection
          title={t.ctaTitle}
          description={t.ctaDescription}
          primaryButton={{ text: t.ctaPrimary, href: localizeHref('/contact', locale) }}
          secondaryButton={{ text: t.ctaSecondary, href: 'tel:+33661590290' }}
        />
      </FadeInSection>

      <Footer />
    </div>
  );
}
