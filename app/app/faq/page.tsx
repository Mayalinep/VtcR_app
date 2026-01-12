import Navigation from '../components/layout/Navigation';
import Footer from '../components/layout/Footer';
import FAQ from '../components/sections/FAQ';
import Hero from '../components/sections/Hero';
import CTASection from '../components/sections/CTASection';
import FadeInSection from '../components/animations/FadeInSection';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "FAQ - Questions Fréquentes | VTC Rachel",
  description: "Toutes les réponses à vos questions sur notre service VTC : réservation, tarifs, zones desservies, moyens de paiement, annulation et plus encore.",
};

export default function FAQPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      {/* Hero Section */}
      <Hero
        badge="Centre d'aide"
        title={<>Questions<br /><span style={{ color: 'var(--forest-green)' }}>Fréquentes</span></>}
        description="Trouvez rapidement les réponses à toutes vos questions sur notre service VTC"
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
          title="Vous ne trouvez pas la réponse ?"
          description="Notre équipe est à votre disposition pour répondre à toutes vos questions"
          primaryButton={{
            text: "Nous contacter",
            href: "/contact"
          }}
          secondaryButton={{
            text: "Appeler maintenant",
            href: "tel:+33612345678"
          }}
        />
      </FadeInSection>

      <Footer />
    </div>
  );
}
