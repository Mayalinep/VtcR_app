import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import FadeIn from '../components/FadeIn';
import FadeInSection from '../components/FadeInSection';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Mentions Légales | VTC Rachel",
  description: "Mentions légales de VTC Rachel - Informations légales, coordonnées de l'entreprise et conditions d'utilisation du site.",
};

export default function MentionsLegalesPage() {
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
              Informations légales
            </div>
          </FadeIn>
          
          <FadeIn delay={0.7}>
            <h1 className="text-4xl sm:text-5xl font-bold mb-6" style={{ fontFamily: 'var(--font-playfair)' }}>
              Mentions
              <br />
              <span style={{ color: 'var(--forest-green)' }}>Légales</span>
            </h1>
          </FadeIn>
          
          <FadeIn delay={1}>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Informations légales concernant VTC Rachel et l&apos;utilisation de ce site
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Contenu */}
      <section className="py-16 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <FadeInSection delay={0}>
            <div className="prose prose-lg max-w-none">
              
              {/* Éditeur du site */}
              <div className="mb-12">
                <h2 className="text-2xl font-bold mb-4" style={{ fontFamily: 'var(--font-playfair)', color: 'var(--forest-green)' }}>
                  1. Éditeur du site
                </h2>
                <div className="space-y-2 text-gray-700 leading-relaxed">
                  <p><strong>Raison sociale :</strong> VTC Rachel (Auto-Entreprise)</p>
                  <p><strong>Responsable :</strong> Rachel [Nom]</p>
                  <p><strong>SIRET :</strong> [À compléter]</p>
                  <p><strong>Adresse :</strong> [Adresse à compléter]</p>
                  <p><strong>Email :</strong> contact@vtc-rachel.fr</p>
                  <p><strong>Téléphone :</strong> +33 6 XX XX XX XX</p>
                  <p><strong>Licence VTC :</strong> [Numéro à compléter]</p>
                </div>
              </div>

              {/* Directeur de publication */}
              <div className="mb-12">
                <h2 className="text-2xl font-bold mb-4" style={{ fontFamily: 'var(--font-playfair)', color: 'var(--forest-green)' }}>
                  2. Directeur de publication
                </h2>
                <p className="text-gray-700 leading-relaxed">
                  Le directeur de la publication du site est Rachel [Nom], gérante de VTC Rachel.
                </p>
              </div>

              {/* Hébergement */}
              <div className="mb-12">
                <h2 className="text-2xl font-bold mb-4" style={{ fontFamily: 'var(--font-playfair)', color: 'var(--forest-green)' }}>
                  3. Hébergement
                </h2>
                <div className="space-y-2 text-gray-700 leading-relaxed">
                  <p><strong>Hébergeur :</strong> Vercel Inc.</p>
                  <p><strong>Adresse :</strong> 440 N Barranca Ave #4133, Covina, CA 91723, USA</p>
                  <p><strong>Site web :</strong> <a href="https://vercel.com" target="_blank" rel="noopener noreferrer" className="text-forest-green hover:underline">vercel.com</a></p>
                </div>
              </div>

              {/* Propriété intellectuelle */}
              <div className="mb-12">
                <h2 className="text-2xl font-bold mb-4" style={{ fontFamily: 'var(--font-playfair)', color: 'var(--forest-green)' }}>
                  4. Propriété intellectuelle
                </h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  L&apos;ensemble du contenu de ce site (textes, images, vidéos, logos, graphismes, etc.) est la propriété exclusive de VTC Rachel, 
                  sauf mention contraire.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  Toute reproduction, distribution, modification, adaptation, retransmission ou publication, même partielle, de ces différents éléments 
                  est strictement interdite sans l&apos;accord exprès par écrit de VTC Rachel.
                </p>
              </div>

              {/* Données personnelles */}
              <div className="mb-12">
                <h2 className="text-2xl font-bold mb-4" style={{ fontFamily: 'var(--font-playfair)', color: 'var(--forest-green)' }}>
                  5. Protection des données personnelles
                </h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Conformément au Règlement Général sur la Protection des Données (RGPD) et à la loi Informatique et Libertés, 
                  vous disposez d&apos;un droit d&apos;accès, de rectification, de suppression et d&apos;opposition aux données personnelles vous concernant.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  Pour exercer ces droits, vous pouvez nous contacter à l&apos;adresse : <a href="mailto:contact@vtc-rachel.fr" className="text-forest-green hover:underline">contact@vtc-rachel.fr</a>
                </p>
                <p className="text-gray-700 leading-relaxed mt-4">
                  Pour plus d&apos;informations, consultez notre <a href="/confidentialite" className="text-forest-green hover:underline font-medium">Politique de confidentialité</a>.
                </p>
              </div>

              {/* Cookies */}
              <div className="mb-12">
                <h2 className="text-2xl font-bold mb-4" style={{ fontFamily: 'var(--font-playfair)', color: 'var(--forest-green)' }}>
                  6. Cookies
                </h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Ce site utilise des cookies pour améliorer l&apos;expérience utilisateur et réaliser des statistiques de visites.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  Vous pouvez à tout moment désactiver ces cookies dans les paramètres de votre navigateur. 
                  Cependant, cela peut affecter le bon fonctionnement de certaines fonctionnalités du site.
                </p>
              </div>

              {/* Limitation de responsabilité */}
              <div className="mb-12">
                <h2 className="text-2xl font-bold mb-4" style={{ fontFamily: 'var(--font-playfair)', color: 'var(--forest-green)' }}>
                  7. Limitation de responsabilité
                </h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  VTC Rachel s&apos;efforce d&apos;assurer l&apos;exactitude et la mise à jour des informations diffusées sur ce site, 
                  mais ne peut garantir l&apos;exactitude, la précision ou l&apos;exhaustivité des informations mises à disposition.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  En conséquence, VTC Rachel décline toute responsabilité pour toute imprécision, inexactitude ou omission 
                  portant sur des informations disponibles sur ce site.
                </p>
              </div>

              {/* Droit applicable */}
              <div className="mb-12">
                <h2 className="text-2xl font-bold mb-4" style={{ fontFamily: 'var(--font-playfair)', color: 'var(--forest-green)' }}>
                  8. Droit applicable
                </h2>
                <p className="text-gray-700 leading-relaxed">
                  Les présentes mentions légales sont soumises au droit français. 
                  En cas de litige, les tribunaux français seront seuls compétents.
                </p>
              </div>

              {/* Crédits */}
              <div className="mb-12">
                <h2 className="text-2xl font-bold mb-4" style={{ fontFamily: 'var(--font-playfair)', color: 'var(--forest-green)' }}>
                  9. Crédits
                </h2>
                <div className="space-y-2 text-gray-700 leading-relaxed">
                  <p><strong>Conception et développement :</strong> [Votre nom/entreprise]</p>
                  <p><strong>Icônes :</strong> Lucide Icons</p>
                  <p><strong>Polices :</strong> Inter (Google Fonts), Playfair Display (Google Fonts)</p>
                </div>
              </div>

              {/* Date de mise à jour */}
              <div className="pt-8 border-t border-gray-200">
                <p className="text-sm text-gray-500">
                  <strong>Dernière mise à jour :</strong> Janvier 2026
                </p>
              </div>

            </div>
          </FadeInSection>
        </div>
      </section>

      <Footer />
    </div>
  );
}
