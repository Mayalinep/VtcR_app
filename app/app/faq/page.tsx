import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import FAQ from '../components/FAQ';
import FadeIn from '../components/FadeIn';
import FadeInSection from '../components/FadeInSection';
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
              Centre d&apos;aide
            </div>
          </FadeIn>
          
          <FadeIn delay={0.7}>
            <h1 className="text-4xl sm:text-5xl font-bold mb-6" style={{ fontFamily: 'var(--font-playfair)' }}>
              Questions
              <br />
              <span style={{ color: 'var(--forest-green)' }}>Fréquentes</span>
            </h1>
          </FadeIn>
          
          <FadeIn delay={1}>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Trouvez rapidement les réponses à toutes vos questions sur notre service VTC
            </p>
          </FadeIn>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <FAQ />
        </div>
      </section>

      {/* CTA Section */}
      <FadeInSection delay={0}>
        <section 
          className="mx-4 sm:mx-6 mb-16 p-12 rounded-2xl text-center"
          style={{ backgroundColor: 'var(--forest-green)' }}
        >
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4" style={{ fontFamily: 'var(--font-playfair)' }}>
              Vous ne trouvez pas la réponse ?
            </h2>
            <p className="text-lg text-white/80 mb-8">
              Notre équipe est à votre disposition pour répondre à toutes vos questions
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/contact"
                className="px-8 py-4 rounded-lg font-semibold transition-all hover:scale-105 shadow-xl active:scale-95"
                style={{ 
                  backgroundColor: 'var(--gold-champagne)',
                  color: 'var(--forest-green)'
                }}
              >
                Nous contacter
              </a>
              <a
                href="tel:+33612345678"
                className="px-8 py-4 rounded-lg font-semibold transition-all hover:scale-105 border-2 border-white text-white hover:bg-white/10 active:scale-95"
              >
                Appeler maintenant
              </a>
            </div>
          </div>
        </section>
      </FadeInSection>

      <Footer />
    </div>
  );
}
