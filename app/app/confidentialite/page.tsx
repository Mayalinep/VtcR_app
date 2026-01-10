import Navigation from '../components/layout/Navigation';
import Footer from '../components/layout/Footer';
import Hero from '../components/sections/Hero';
import CTASection from '../components/sections/CTASection';
import FadeInSection from '../components/animations/FadeInSection';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Politique de Confidentialité | VTC Rachel",
  description: "Politique de confidentialité de VTC Rachel - Comment nous collectons, utilisons et protégeons vos données personnelles conformément au RGPD.",
};

export default function ConfidentialitePage() {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      {/* Hero Section */}
      <Hero
        badge="Protection des données"
        title={<>Politique de<br /><span style={{ color: 'var(--forest-green)' }}>Confidentialité</span></>}
        description="Comment nous protégeons et utilisons vos données personnelles"
      />

      {/* Contenu */}
      <section className="py-16 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <FadeInSection delay={0}>
            <div className="prose prose-lg max-w-none">
              
              {/* Introduction */}
              <div className="mb-12 p-6 rounded-xl bg-gray-50 border border-gray-200">
                <p className="text-gray-700 leading-relaxed mb-4">
                  VTC Rachel attache une grande importance à la protection de vos données personnelles. 
                  Cette politique de confidentialité vous informe sur la manière dont nous collectons, utilisons, 
                  stockons et protégeons vos informations personnelles.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  Cette politique est conforme au <strong>Règlement Général sur la Protection des Données (RGPD)</strong> 
                  et à la loi Informatique et Libertés.
                </p>
              </div>

              {/* Responsable du traitement */}
              <div className="mb-12">
                <h2 className="text-2xl font-bold mb-4" style={{ fontFamily: 'var(--font-playfair)', color: 'var(--forest-green)' }}>
                  1. Responsable du traitement des données
                </h2>
                <div className="space-y-2 text-gray-700 leading-relaxed">
                  <p><strong>Responsable :</strong> VTC Rachel - Rachel [Nom]</p>
                  <p><strong>Email :</strong> <a href="mailto:contact@vtc-rachel.fr" className="text-forest-green hover:underline">contact@vtc-rachel.fr</a></p>
                  <p><strong>Téléphone :</strong> +33 6 XX XX XX XX</p>
                </div>
              </div>

              {/* Données collectées */}
              <div className="mb-12">
                <h2 className="text-2xl font-bold mb-4" style={{ fontFamily: 'var(--font-playfair)', color: 'var(--forest-green)' }}>
                  2. Données personnelles collectées
                </h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Nous collectons les données suivantes uniquement lorsque vous utilisez nos services :
                </p>
                
                <div className="space-y-4">
                  <div className="border-l-4 border-forest-green pl-4">
                    <h3 className="font-semibold text-gray-900 mb-2">Lors de la réservation</h3>
                    <ul className="list-disc list-inside text-gray-700 space-y-1">
                      <li>Nom et prénom</li>
                      <li>Email</li>
                      <li>Numéro de téléphone</li>
                      <li>Adresses de départ et d&apos;arrivée</li>
                      <li>Date et heure de la course</li>
                      <li>Informations de paiement (via Stripe sécurisé)</li>
                    </ul>
                  </div>

                  <div className="border-l-4 border-forest-green pl-4">
                    <h3 className="font-semibold text-gray-900 mb-2">Création de compte</h3>
                    <ul className="list-disc list-inside text-gray-700 space-y-1">
                      <li>Adresses favorites</li>
                      <li>Historique des courses</li>
                      <li>Préférences de notification</li>
                    </ul>
                  </div>

                  <div className="border-l-4 border-forest-green pl-4">
                    <h3 className="font-semibold text-gray-900 mb-2">Données techniques</h3>
                    <ul className="list-disc list-inside text-gray-700 space-y-1">
                      <li>Adresse IP</li>
                      <li>Type de navigateur</li>
                      <li>Données de navigation (cookies)</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Finalités */}
              <div className="mb-12">
                <h2 className="text-2xl font-bold mb-4" style={{ fontFamily: 'var(--font-playfair)', color: 'var(--forest-green)' }}>
                  3. Finalités du traitement
                </h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Vos données personnelles sont collectées et utilisées pour les finalités suivantes :
                </p>
                <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                  <li>Traitement et gestion de vos réservations</li>
                  <li>Communication sur vos courses (confirmations, rappels)</li>
                  <li>Facturation et gestion comptable</li>
                  <li>Amélioration de nos services</li>
                  <li>Respect des obligations légales et réglementaires</li>
                  <li>Prévention de la fraude</li>
                </ul>
              </div>

              {/* Base légale */}
              <div className="mb-12">
                <h2 className="text-2xl font-bold mb-4" style={{ fontFamily: 'var(--font-playfair)', color: 'var(--forest-green)' }}>
                  4. Base légale du traitement
                </h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Le traitement de vos données repose sur :
                </p>
                <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                  <li><strong>L&apos;exécution du contrat</strong> : pour la réalisation de votre course</li>
                  <li><strong>Votre consentement</strong> : pour l&apos;envoi de communications marketing (si accepté)</li>
                  <li><strong>Nos obligations légales</strong> : conservation des données comptables (10 ans)</li>
                  <li><strong>Notre intérêt légitime</strong> : prévention de la fraude, amélioration du service</li>
                </ul>
              </div>

              {/* Conservation */}
              <div className="mb-12">
                <h2 className="text-2xl font-bold mb-4" style={{ fontFamily: 'var(--font-playfair)', color: 'var(--forest-green)' }}>
                  5. Durée de conservation
                </h2>
                <div className="space-y-3 text-gray-700">
                  <p className="leading-relaxed">
                    <strong>Données client actif :</strong> Tant que votre compte est actif
                  </p>
                  <p className="leading-relaxed">
                    <strong>Données comptables :</strong> 10 ans (obligation légale)
                  </p>
                  <p className="leading-relaxed">
                    <strong>Données marketing :</strong> 3 ans après le dernier contact
                  </p>
                  <p className="leading-relaxed">
                    <strong>Logs techniques :</strong> 12 mois maximum
                  </p>
                </div>
              </div>

              {/* Destinataires */}
              <div className="mb-12">
                <h2 className="text-2xl font-bold mb-4" style={{ fontFamily: 'var(--font-playfair)', color: 'var(--forest-green)' }}>
                  6. Destinataires des données
                </h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Vos données personnelles peuvent être transmises à :
                </p>
                <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                  <li><strong>Personnel de VTC Rachel</strong> : pour la réalisation de votre course</li>
                  <li><strong>Stripe</strong> : traitement sécurisé des paiements</li>
                  <li><strong>Google Maps</strong> : calcul d&apos;itinéraires</li>
                  <li><strong>Service d&apos;emailing</strong> : envoi de notifications</li>
                  <li><strong>Hébergeur (Vercel)</strong> : stockage des données</li>
                </ul>
                <p className="text-gray-700 leading-relaxed mt-4">
                  <strong>Aucune donnée n&apos;est vendue ou louée à des tiers.</strong>
                </p>
              </div>

              {/* Vos droits */}
              <div className="mb-12">
                <h2 className="text-2xl font-bold mb-4" style={{ fontFamily: 'var(--font-playfair)', color: 'var(--forest-green)' }}>
                  7. Vos droits
                </h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Conformément au RGPD, vous disposez des droits suivants :
                </p>
                
                <div className="space-y-3">
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <h3 className="font-semibold text-gray-900 mb-1">Droit d&apos;accès</h3>
                    <p className="text-sm text-gray-700">Obtenir une copie de toutes vos données personnelles</p>
                  </div>
                  
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <h3 className="font-semibold text-gray-900 mb-1">Droit de rectification</h3>
                    <p className="text-sm text-gray-700">Corriger des données inexactes ou incomplètes</p>
                  </div>
                  
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <h3 className="font-semibold text-gray-900 mb-1">Droit à l&apos;effacement</h3>
                    <p className="text-sm text-gray-700">Demander la suppression de vos données (sauf obligations légales)</p>
                  </div>
                  
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <h3 className="font-semibold text-gray-900 mb-1">Droit à la portabilité</h3>
                    <p className="text-sm text-gray-700">Récupérer vos données dans un format structuré</p>
                  </div>
                  
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <h3 className="font-semibold text-gray-900 mb-1">Droit d&apos;opposition</h3>
                    <p className="text-sm text-gray-700">Refuser le traitement de vos données pour certaines finalités</p>
                  </div>
                  
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <h3 className="font-semibold text-gray-900 mb-1">Droit de limitation</h3>
                    <p className="text-sm text-gray-700">Limiter temporairement le traitement de vos données</p>
                  </div>
                </div>

                <div className="mt-6 p-6 bg-forest-green/5 border border-forest-green/20 rounded-xl">
                  <p className="text-gray-700 leading-relaxed mb-3">
                    <strong>Pour exercer vos droits :</strong>
                  </p>
                  <p className="text-gray-700 leading-relaxed">
                    Envoyez un email à <a href="mailto:contact@vtc-rachel.fr" className="text-forest-green hover:underline font-medium">contact@vtc-rachel.fr</a> avec une copie de votre pièce d&apos;identité.
                  </p>
                  <p className="text-sm text-gray-600 mt-3">
                    Délai de réponse : 1 mois maximum
                  </p>
                </div>
              </div>

              {/* Sécurité */}
              <div className="mb-12">
                <h2 className="text-2xl font-bold mb-4" style={{ fontFamily: 'var(--font-playfair)', color: 'var(--forest-green)' }}>
                  8. Sécurité des données
                </h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Nous mettons en œuvre des mesures techniques et organisationnelles appropriées pour protéger vos données :
                </p>
                <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                  <li>Chiffrement HTTPS (TLS 1.3)</li>
                  <li>Paiements sécurisés via Stripe (PCI-DSS)</li>
                  <li>Mots de passe hashés (bcrypt)</li>
                  <li>Accès restreint aux données personnelles</li>
                  <li>Sauvegardes régulières</li>
                  <li>Monitoring et détection des intrusions</li>
                </ul>
              </div>

              {/* Cookies */}
              <div className="mb-12">
                <h2 className="text-2xl font-bold mb-4" style={{ fontFamily: 'var(--font-playfair)', color: 'var(--forest-green)' }}>
                  9. Cookies et traceurs
                </h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Notre site utilise des cookies pour :
                </p>
                <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                  <li><strong>Cookies essentiels</strong> : nécessaires au fonctionnement (authentification, panier)</li>
                  <li><strong>Cookies analytiques</strong> : statistiques de visite (avec votre consentement)</li>
                </ul>
                <p className="text-gray-700 leading-relaxed mt-4">
                  Vous pouvez gérer vos préférences cookies à tout moment via le bandeau de consentement ou les paramètres de votre navigateur.
                </p>
              </div>

              {/* Réclamation */}
              <div className="mb-12">
                <h2 className="text-2xl font-bold mb-4" style={{ fontFamily: 'var(--font-playfair)', color: 'var(--forest-green)' }}>
                  10. Droit de réclamation
                </h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Si vous estimez que vos droits ne sont pas respectés, vous pouvez introduire une réclamation auprès de la <strong>CNIL</strong> :
                </p>
                <div className="space-y-2 text-gray-700">
                  <p><strong>CNIL</strong> - Commission Nationale de l&apos;Informatique et des Libertés</p>
                  <p>3 Place de Fontenoy - TSA 80715 - 75334 PARIS CEDEX 07</p>
                  <p>Site web : <a href="https://www.cnil.fr" target="_blank" rel="noopener noreferrer" className="text-forest-green hover:underline">www.cnil.fr</a></p>
                </div>
              </div>

              {/* Modifications */}
              <div className="mb-12">
                <h2 className="text-2xl font-bold mb-4" style={{ fontFamily: 'var(--font-playfair)', color: 'var(--forest-green)' }}>
                  11. Modifications de la politique
                </h2>
                <p className="text-gray-700 leading-relaxed">
                  Nous nous réservons le droit de modifier cette politique de confidentialité à tout moment. 
                  En cas de modification substantielle, nous vous en informerons par email ou via un bandeau sur le site.
                </p>
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

      {/* CTA */}
      <FadeInSection delay={0}>
        <CTASection
          title="Des questions sur vos données ?"
          description="Notre équipe est à votre disposition pour répondre à toutes vos questions"
          primaryButton={{
            text: "Nous contacter",
            href: "/contact"
          }}
        />
      </FadeInSection>

      <Footer />
    </div>
  );
}
