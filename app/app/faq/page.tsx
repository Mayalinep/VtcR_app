import Navigation from '../components/Navigation';
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

      {/* Footer */}
      <footer className="border-t border-gray-100 py-12 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
            <div className="col-span-2 md:col-span-1">
              <div className="text-2xl font-semibold mb-3" style={{ color: 'var(--forest-green)', fontFamily: 'var(--font-playfair)' }}>
                VTC Rachel
              </div>
              <p className="text-sm text-gray-600">
                Service VTC premium en Île-de-France
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-3 text-sm sm:text-base">Navigation</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><a href="/" className="hover:text-gray-900 inline-block py-0.5">Accueil</a></li>
                <li><a href="/a-propos" className="hover:text-gray-900 inline-block py-0.5">À propos</a></li>
                <li><a href="/tarifs" className="hover:text-gray-900 inline-block py-0.5">Tarifs</a></li>
                <li><a href="/faq" className="hover:text-gray-900 inline-block py-0.5">FAQ</a></li>
                <li><a href="/contact" className="hover:text-gray-900 inline-block py-0.5">Contact</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-3 text-sm sm:text-base">Légal</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><a href="/cgv" className="hover:text-gray-900 inline-block py-0.5">CGV</a></li>
                <li><a href="/mentions-legales" className="hover:text-gray-900 inline-block py-0.5">Mentions légales</a></li>
                <li><a href="/confidentialite" className="hover:text-gray-900 inline-block py-0.5">Confidentialité</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-3 text-sm sm:text-base">Contact</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="py-0.5">contact@vtc-rachel.fr</li>
                <li className="py-0.5">+33 6 XX XX XX XX</li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-100 pt-6 text-center text-sm text-gray-500">
            © 2026 VTC Rachel. Tous droits réservés.
          </div>
        </div>
      </footer>
    </div>
  );
}
