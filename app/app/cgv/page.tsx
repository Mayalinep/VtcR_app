import Navigation from '../components/layout/Navigation';
import Footer from '../components/layout/Footer';
import Hero from '../components/sections/Hero';
import CTASection from '../components/sections/CTASection';
import FadeInSection from '../components/animations/FadeInSection';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Conditions Générales de Vente | VTC Rachel",
  description: "Conditions Générales de Vente de VTC Rachel - Modalités de réservation, tarifs, annulation et conditions d'utilisation du service VTC.",
};

export default function CGVPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      {/* Hero Section */}
      <Hero
        badge="Conditions d'utilisation"
        title={<>Conditions Générales<br /><span style={{ color: 'var(--forest-green)' }}>de Vente</span></>}
        description="Modalités et conditions d'utilisation de nos services VTC"
      />

      {/* Contenu */}
      <section className="py-16 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <FadeInSection delay={0}>
            <div className="prose prose-lg max-w-none">
              
              {/* Préambule */}
              <div className="mb-12 p-6 rounded-xl bg-gray-50 border border-gray-200">
                <p className="text-gray-700 leading-relaxed mb-4">
                  Les présentes Conditions Générales de Vente (CGV) régissent les relations contractuelles entre 
                  <strong> VTC Rachel</strong> (ci-après « le Prestataire ») et toute personne (ci-après « le Client ») 
                  utilisant les services de transport avec chauffeur proposés.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  Toute réservation implique l&apos;acceptation sans réserve des présentes CGV.
                </p>
              </div>

              {/* Article 1 */}
              <div className="mb-12">
                <h2 className="text-2xl font-bold mb-4" style={{ fontFamily: 'var(--font-playfair)', color: 'var(--forest-green)' }}>
                  Article 1 - Objet
                </h2>
                <p className="text-gray-700 leading-relaxed">
                  VTC Rachel propose des services de transport de personnes avec chauffeur (VTC) en Île-de-France, 
                  conformément à la réglementation en vigueur. Les présentes CGV ont pour objet de définir les modalités 
                  de réservation et d&apos;exécution des prestations de transport.
                </p>
              </div>

              {/* Article 2 */}
              <div className="mb-12">
                <h2 className="text-2xl font-bold mb-4" style={{ fontFamily: 'var(--font-playfair)', color: 'var(--forest-green)' }}>
                  Article 2 - Réservation
                </h2>
                
                <h3 className="text-lg font-semibold mt-4 mb-2">2.1 Modalités de réservation</h3>
                <p className="text-gray-700 leading-relaxed mb-4">
                  La réservation peut être effectuée :
                </p>
                <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                  <li>En ligne via le site web www.vtc-rachel.fr</li>
                  <li>Par téléphone au +33 6 XX XX XX XX</li>
                  <li>Par email à contact@vtc-rachel.fr</li>
                </ul>

                <h3 className="text-lg font-semibold mt-6 mb-2">2.2 Confirmation</h3>
                <p className="text-gray-700 leading-relaxed">
                  Toute réservation fait l&apos;objet d&apos;une confirmation par email ou SMS indiquant les détails de la course 
                  (date, heure, lieux, tarif). Le Client doit vérifier l&apos;exactitude des informations communiquées.
                </p>

                <h3 className="text-lg font-semibold mt-6 mb-2">2.3 Délai de réservation</h3>
                <p className="text-gray-700 leading-relaxed">
                  Les réservations doivent être effectuées au minimum <strong>2 heures à l&apos;avance</strong>. 
                  Pour les courses immédiates, contacter directement par téléphone (sous réserve de disponibilité).
                </p>
              </div>

              {/* Article 3 */}
              <div className="mb-12">
                <h2 className="text-2xl font-bold mb-4" style={{ fontFamily: 'var(--font-playfair)', color: 'var(--forest-green)' }}>
                  Article 3 - Tarifs
                </h2>
                
                <h3 className="text-lg font-semibold mt-4 mb-2">3.1 Calcul du tarif</h3>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Le tarif est calculé sur la base de :
                </p>
                <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                  <li>La distance du trajet</li>
                  <li>Le temps de trajet estimé</li>
                  <li>Les options supplémentaires (siège enfant, bagages, etc.)</li>
                  <li>Les majorations éventuelles (nuit, jours fériés)</li>
                </ul>

                <h3 className="text-lg font-semibold mt-6 mb-2">3.2 Tarif indicatif</h3>
                <p className="text-gray-700 leading-relaxed">
                  Le tarif affiché lors de la réservation est <strong>indicatif</strong>. Le prix définitif peut varier en fonction 
                  du trajet réellement effectué (détours, embouteillages). Le Client en sera informé et devra accepter avant le départ.
                </p>

                <h3 className="text-lg font-semibold mt-6 mb-2">3.3 Majorations</h3>
                <div className="space-y-2 text-gray-700 mt-2">
                  <p><strong>Nuit (22h-6h) :</strong> +20%</p>
                  <p><strong>Dimanches et jours fériés :</strong> +15%</p>
                  <p><strong>Temps d&apos;attente (au-delà de 15 min) :</strong> 15€ par tranche de 15 minutes</p>
                  <p><strong>Siège enfant :</strong> +10€</p>
                </div>
              </div>

              {/* Article 4 */}
              <div className="mb-12">
                <h2 className="text-2xl font-bold mb-4" style={{ fontFamily: 'var(--font-playfair)', color: 'var(--forest-green)' }}>
                  Article 4 - Paiement
                </h2>
                
                <h3 className="text-lg font-semibold mt-4 mb-2">4.1 Moyens de paiement acceptés</h3>
                <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                  <li>Carte bancaire (Visa, Mastercard, American Express)</li>
                  <li>Apple Pay et Google Pay</li>
                  <li>Espèces</li>
                </ul>

                <h3 className="text-lg font-semibold mt-6 mb-2">4.2 Modalités de paiement</h3>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Le paiement peut s&apos;effectuer :
                </p>
                <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                  <li><strong>En ligne</strong> : au moment de la réservation (paiement sécurisé via Stripe)</li>
                  <li><strong>À bord</strong> : à la fin de la course (espèces ou carte bancaire)</li>
                </ul>

                <h3 className="text-lg font-semibold mt-6 mb-2">4.3 Facture</h3>
                <p className="text-gray-700 leading-relaxed">
                  Une facture est automatiquement générée et envoyée par email après chaque course. 
                  Elle est également accessible depuis l&apos;espace client.
                </p>
              </div>

              {/* Article 5 */}
              <div className="mb-12">
                <h2 className="text-2xl font-bold mb-4" style={{ fontFamily: 'var(--font-playfair)', color: 'var(--forest-green)' }}>
                  Article 5 - Modification et Annulation
                </h2>
                
                <h3 className="text-lg font-semibold mt-4 mb-2">5.1 Modification par le Client</h3>
                <p className="text-gray-700 leading-relaxed">
                  <strong>Gratuite jusqu&apos;à 4 heures avant</strong> l&apos;heure de prise en charge prévue. 
                  Au-delà, modification soumise à validation et frais éventuels.
                </p>

                <h3 className="text-lg font-semibold mt-6 mb-2">5.2 Annulation par le Client</h3>
                <div className="space-y-3 mt-4">
                  <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                    <p className="font-semibold text-green-900 mb-1">Plus de 12h avant : Gratuit</p>
                    <p className="text-sm text-green-700">Remboursement intégral</p>
                  </div>
                  
                  <div className="p-4 bg-orange-50 border border-orange-200 rounded-lg">
                    <p className="font-semibold text-orange-900 mb-1">Entre 4h et 12h avant : 20% du montant</p>
                    <p className="text-sm text-orange-700">Frais d&apos;annulation appliqués</p>
                  </div>
                  
                  <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                    <p className="font-semibold text-red-900 mb-1">Moins de 4h avant : 50% du montant</p>
                    <p className="text-sm text-red-700">Frais d&apos;annulation importants</p>
                  </div>
                  
                  <div className="p-4 bg-red-100 border border-red-300 rounded-lg">
                    <p className="font-semibold text-red-900 mb-1">No-show : 100% du montant</p>
                    <p className="text-sm text-red-800">Aucun remboursement</p>
                  </div>
                </div>

                <h3 className="text-lg font-semibold mt-6 mb-2">5.3 Annulation par le Prestataire</h3>
                <p className="text-gray-700 leading-relaxed">
                  En cas d&apos;annulation par VTC Rachel (indisponibilité, cas de force majeure), le Client est informé dans les plus brefs délais 
                  et intégralement remboursé.
                </p>
              </div>

              {/* Article 6 */}
              <div className="mb-12">
                <h2 className="text-2xl font-bold mb-4" style={{ fontFamily: 'var(--font-playfair)', color: 'var(--forest-green)' }}>
                  Article 6 - Obligations du Client
                </h2>
                <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                  <li>Être présent à l&apos;heure et au lieu convenus (tolérance de 15 minutes)</li>
                  <li>Fournir des informations exactes lors de la réservation</li>
                  <li>Respecter le véhicule et le chauffeur</li>
                  <li>Signaler tout bagage volumineux ou siège enfant lors de la réservation</li>
                  <li>Ne pas fumer, boire ou manger dans le véhicule</li>
                  <li>Respecter le nombre de passagers maximum (4 personnes)</li>
                </ul>
              </div>

              {/* Article 7 */}
              <div className="mb-12">
                <h2 className="text-2xl font-bold mb-4" style={{ fontFamily: 'var(--font-playfair)', color: 'var(--forest-green)' }}>
                  Article 7 - Obligations du Prestataire
                </h2>
                <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                  <li>Fournir un véhicule propre, confortable et en bon état</li>
                  <li>Respecter l&apos;horaire de prise en charge (tolérance de 10 minutes)</li>
                  <li>Conduire de manière sûre et professionnelle</li>
                  <li>Respecter le trajet optimal (sauf demande contraire du Client)</li>
                  <li>Assister le Client avec les bagages si nécessaire</li>
                </ul>
              </div>

              {/* Article 8 */}
              <div className="mb-12">
                <h2 className="text-2xl font-bold mb-4" style={{ fontFamily: 'var(--font-playfair)', color: 'var(--forest-green)' }}>
                  Article 8 - Responsabilité et Assurance
                </h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  VTC Rachel dispose d&apos;une assurance professionnelle couvrant les dommages corporels et matériels 
                  pouvant survenir durant le transport.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  Le Prestataire ne peut être tenu responsable des retards dus à des circonstances indépendantes de sa volonté 
                  (embouteillages, accidents, conditions météorologiques, etc.).
                </p>
              </div>

              {/* Article 9 */}
              <div className="mb-12">
                <h2 className="text-2xl font-bold mb-4" style={{ fontFamily: 'var(--font-playfair)', color: 'var(--forest-green)' }}>
                  Article 9 - Objets oubliés
                </h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  En cas d&apos;objets oubliés dans le véhicule, le Client doit contacter VTC Rachel dans les 48 heures. 
                </p>
                <p className="text-gray-700 leading-relaxed">
                  Les objets retrouvés sont conservés 30 jours. Au-delà, aucune réclamation ne sera acceptée. 
                  Les frais de réexpédition sont à la charge du Client.
                </p>
              </div>

              {/* Article 10 */}
              <div className="mb-12">
                <h2 className="text-2xl font-bold mb-4" style={{ fontFamily: 'var(--font-playfair)', color: 'var(--forest-green)' }}>
                  Article 10 - Réclamations
                </h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Toute réclamation doit être adressée par email à <a href="mailto:contact@vtc-rachel.fr" className="text-forest-green hover:underline">contact@vtc-rachel.fr</a> dans les 7 jours suivant la prestation.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  VTC Rachel s&apos;engage à apporter une réponse dans un délai maximum de 15 jours.
                </p>
              </div>

              {/* Article 11 */}
              <div className="mb-12">
                <h2 className="text-2xl font-bold mb-4" style={{ fontFamily: 'var(--font-playfair)', color: 'var(--forest-green)' }}>
                  Article 11 - Protection des données personnelles
                </h2>
                <p className="text-gray-700 leading-relaxed">
                  Les données personnelles collectées sont traitées conformément au RGPD et à notre 
                  <a href="/confidentialite" className="text-forest-green hover:underline font-medium"> Politique de confidentialité</a>.
                </p>
              </div>

              {/* Article 12 */}
              <div className="mb-12">
                <h2 className="text-2xl font-bold mb-4" style={{ fontFamily: 'var(--font-playfair)', color: 'var(--forest-green)' }}>
                  Article 12 - Droit applicable et juridiction
                </h2>
                <p className="text-gray-700 leading-relaxed">
                  Les présentes CGV sont soumises au droit français. En cas de litige, et après recherche d&apos;une solution amiable, 
                  les tribunaux français seront seuls compétents.
                </p>
              </div>

              {/* Date de mise à jour */}
              <div className="pt-8 border-t border-gray-200">
                <p className="text-sm text-gray-500">
                  <strong>Version :</strong> 1.0<br />
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
          title="Prêt à réserver en toute confiance ?"
          description="Réservez votre course en ligne en quelques clics"
          primaryButton={{
            text: "Réserver maintenant",
            href: "/"
          }}
        />
      </FadeInSection>

      <Footer />
    </div>
  );
}
