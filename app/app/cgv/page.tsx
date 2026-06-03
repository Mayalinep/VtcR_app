import type { ReactNode } from 'react';
import Link from 'next/link';
import Navigation from '../components/layout/Navigation';
import Footer from '../components/layout/Footer';
import Hero from '../components/sections/Hero';
import CTASection from '../components/sections/CTASection';
import FadeInSection from '../components/animations/FadeInSection';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Conditions Générales de Vente | RACH SERVICES",
  description: "Conditions Générales de Vente de RACH SERVICES - Modalités de réservation, tarifs, annulation et conditions d'utilisation du service VTC.",
};

const Section = ({ title, children }: { title: string; children: ReactNode }) => (
  <div className="mb-12">
    <h2 className="text-2xl font-bold mb-4" style={{ fontFamily: 'var(--font-playfair)', color: 'var(--forest-green)' }}>
      {title}
    </h2>
    {children}
  </div>
);

const P = ({ children }: { children: ReactNode }) => (
  <p className="text-gray-700 leading-relaxed mb-4">{children}</p>
);

const Li = ({ children }: { children: ReactNode }) => (
  <li className="flex items-start gap-2 text-gray-700">
    <span className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: 'var(--forest-green)' }} />
    <span>{children}</span>
  </li>
);

export default function CGVPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      <Hero
        badge="Conditions d'utilisation"
        title={<>Conditions Générales<br /><span style={{ color: 'var(--forest-green)' }}>de Vente</span></>}
        description="Modalités et conditions d'utilisation des services VTC de RACH SERVICES"
      />

      <section className="py-16 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <div className="max-w-none">

              {/* Identification */}
              <div className="mb-12 p-6 rounded-xl bg-gray-50 border border-gray-200">
                <h2 className="text-xl font-bold mb-4" style={{ color: 'var(--forest-green)' }}>RACH SERVICES</h2>
                <P>RACH SERVICES propose des services de transport en VTC (Voiture de Transport avec Chauffeur) uniquement sur réservation et à un tarif préétabli.</P>
                <ul className="space-y-1 text-gray-700 text-sm">
                  <li><strong>Siège social :</strong> 14 Rue Pierre Larousse, 93300 Aubervilliers</li>
                  <li><strong>N° SIRET :</strong> 937 563 526</li>
                  <li><strong>N° TVA intracommunautaire :</strong> FR 20937563526</li>
                  <li><strong>Téléphone :</strong> 06 61 59 02 90</li>
                  <li><strong>Email :</strong> <a href="mailto:rachtravelservices@gmail.com" className="hover:underline" style={{ color: 'var(--forest-green)' }}>rachtravelservices@gmail.com</a></li>
                  <li><strong>Site web :</strong> www.rach-services.com</li>
                </ul>
                <p className="text-gray-600 text-sm mt-4">
                  RACH SERVICES atteste avoir souscrit une assurance de responsabilité civile professionnelle (RC Pro) couvrant les risques liés à son activité de transport de personnes à titre onéreux, ainsi qu&apos;une assurance responsabilité civile de son véhicule.
                </p>
              </div>

              <Section title="Objet">
                <P>Les présentes Conditions Générales de Vente (CGV) ont pour vocation de déterminer les conditions contractuelles relatives à l&apos;ensemble des services de transport des personnes avec chauffeur (VTC) effectués par RACH SERVICES pour le compte de ses clients.</P>
                <P>Toute commande effectuée, que ce soit par téléphone, par email ou via le site web de la société, signifie que le client accepte sans conditions préalables ni exceptions les présentes CGV.</P>
              </Section>

              <Section title="Contrat de prestation de transport">
                <P>Le client peut effectuer une demande de réservation 24h/24 et 7j/7 par les moyens suivants :</P>
                <ul className="space-y-2 mb-4">
                  <Li>Téléphone : <strong>06 61 59 02 90</strong></Li>
                  <Li>Email : <strong>rachtravelservices@gmail.com</strong></Li>
                  <Li>Site web : <strong>www.rach-services.com</strong></Li>
                </ul>
                <P>Pour être validée, la demande de réservation doit obligatoirement comporter les informations suivantes, dont le client assume la responsabilité :</P>
                <ul className="space-y-2 mb-4">
                  <Li>Nom et prénom du client</Li>
                  <Li>Adresse email</Li>
                  <Li>Numéro de téléphone</Li>
                  <Li>Date et heure de prise en charge</Li>
                  <Li>Adresse exacte de destination</Li>
                  <Li>Nombre de passagers et de bagages (enfant / adulte)</Li>
                  <Li>Nature de la prestation (transfert, mise à disposition)</Li>
                  <Li>Besoin d&apos;un siège bébé le cas échéant</Li>
                </ul>
                <P>La commande ne devient ferme et définitive qu&apos;à la réception par le client d&apos;une <strong>confirmation écrite (SMS/email)</strong> émise par RACH SERVICES, mentionnant le prix de la course et les détails du transport.</P>
                <P>RACH SERVICES se réserve le droit de refuser toute commande en cas d&apos;indisponibilité du véhicule ou de force majeure.</P>
                <P>Il est obligatoire de réserver au moins <strong>24 heures à l&apos;avance</strong> via le site web, ou dans les derniers instants par téléphone selon les disponibilités.</P>
              </Section>

              <Section title="Tarifs">
                <P>Le site www.rach-services.com détermine le coût du service sur la base des informations fournies par le client. Les tarifs fixes sont privilégiés.</P>
                <P>Les prix mentionnés contiennent la TVA au taux applicable : <strong>10% pour les transferts</strong> et <strong>20% pour la mise à disposition</strong>.</P>
                <P>Sont inclus dans le prix : la prestation du chauffeur, le carburant, les frais de péage et les assurances des personnes transportées.</P>
                <P>Dans le cadre de la mise à disposition, les frais de stationnement, de restauration et d&apos;hébergement du chauffeur ne sont <strong>pas</strong> inclus.</P>

                <h3 className="text-lg font-semibold mt-6 mb-3" style={{ color: 'var(--forest-green)' }}>Mise à disposition — distances maximales</h3>
                <ul className="space-y-2 mb-4">
                  <Li>25 kilomètres pour 1h de mise à disposition</Li>
                  <Li>125 kilomètres pour 5h de mise à disposition</Li>
                  <Li>Chaque heure entamée est due dans son intégralité</Li>
                </ul>

                <h3 className="text-lg font-semibold mt-6 mb-3" style={{ color: 'var(--forest-green)' }}>Spécificités aéroports et gares</h3>
                <P>Merci d&apos;indiquer le numéro de vol ou de train dans la section « informations supplémentaires » lors de la réservation. Dès votre arrivée, allumez votre téléphone.</P>
                <P>Pour les vols sans bagages en soute, les 15 minutes d&apos;attente intégrées au trajet sont généralement suffisantes. Pour les bagages enregistrés ou les vols hors Europe, nous recommandons d&apos;inclure un délai supplémentaire de 30 minutes afin d&apos;éviter une facturation d&apos;attente.</P>
              </Section>

              <Section title="Paiement">
                <P>Le règlement s&apos;effectue lors de la prise en charge du client. Les moyens de paiement acceptés sont :</P>
                <ul className="space-y-2 mb-4">
                  <Li>Espèces</Li>
                  <Li>Carte bancaire (VISA, Mastercard) via dispositif sécurisé</Li>
                </ul>
                <P>En fournissant ses informations bancaires, le client donne son consentement préalable et inconditionnel pour que RACH SERVICES effectue une transaction sécurisée.</P>
                <P>Le contrat n&apos;est considéré comme établi que lorsque le paiement de la commande a été reçu.</P>
              </Section>

              <Section title="Annulation / Modification">
                <P>Le client peut annuler une réservation par email uniquement à <a href="mailto:rachtravelservices@gmail.com" className="hover:underline" style={{ color: 'var(--forest-green)' }}>rachtravelservices@gmail.com</a>, avant l&apos;heure indiquée sur le bon de réservation.</P>

                <div className="space-y-3 mt-4 mb-6">
                  <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                    <p className="font-semibold text-green-900">Plus de 48h avant : remboursement intégral (100%)</p>
                  </div>
                  <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                    <p className="font-semibold text-yellow-900">Plus de 24h avant : remboursement de 50%</p>
                  </div>
                  <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                    <p className="font-semibold text-red-900">Moins de 24h avant : aucun remboursement (0%)</p>
                  </div>
                </div>

                <P>Toute modification apportée au contrat pendant l&apos;exécution du service pourrait conduire à un ajustement du tarif convenu. RACH SERVICES se réserve le droit de rejeter ces changements.</P>
              </Section>

              <Section title="Retard / Majoration du prix">
                <P>Tout retard des passagers par rapport à l&apos;heure indiquée sur le bon de réservation entraîne une augmentation du coût, selon les conditions suivantes :</P>
                <ul className="space-y-2 mb-4">
                  <Li>Plus de 10 minutes de retard : <strong>+15€</strong></Li>
                  <Li>Plus de 30 minutes de retard : <strong>+25€</strong></Li>
                  <Li>Par demi-heure supplémentaire : <strong>+25€</strong></Li>
                </ul>
                <P>Ces majorations sont réglées au plus tard lors de la prise en charge dans le véhicule.</P>
                <P>Toute demande d&apos;assistance entre <strong>21h et 6h</strong> est soumise à une majoration de <strong>20%</strong>.</P>
                <P>Si le client ne se présente pas à l&apos;emplacement convenu dans les 15 premières minutes et qu&apos;il n&apos;y a pas de communication avec le chauffeur, la transaction sera considérée comme annulée, sans possibilité de reprogrammer et sans remboursement.</P>
              </Section>

              <Section title="Qualité de service">
                <P>RACH SERVICES s&apos;engage à effectuer ses services en accord avec le bon de réservation et en conformité avec toutes les normes et lois en vigueur. Le chauffeur est titulaire :</P>
                <ul className="space-y-2 mb-4">
                  <Li>D&apos;une carte professionnelle délivrée par la préfecture</Li>
                  <Li>D&apos;une attestation d&apos;immatriculation délivrée par le Ministère chargé des transports (pôle VTC)</Li>
                  <Li>D&apos;un macaron d&apos;immatriculation apposé au pare-brise du véhicule</Li>
                </ul>
                <P>En cas de recours à des sous-traitants, RACH SERVICES veille à ce que ces derniers respectent les mêmes critères de qualité.</P>
              </Section>

              <Section title="Responsabilité du client et des personnes transportées">
                <P>Le client s&apos;engage, pour lui-même et pour les passagers, à adopter un comportement irréprochable dès la prise en charge, notamment :</P>
                <ul className="space-y-2 mb-4">
                  <Li>Respect du code de la route (ceinture de sécurité, siège auto…)</Li>
                  <Li>Interdiction de consommer de l&apos;alcool à bord</Li>
                  <Li>Interdiction de fumer, manger ou manipuler des substances nocives</Li>
                  <Li>Les bagages sont autorisés et restent sous la responsabilité du client</Li>
                  <Li>RACH SERVICES ne peut être tenue responsable des dommages ou de la perte de bagages ou appareils électroniques</Li>
                </ul>

                <P>Toute détérioration du véhicule causée par le client sera entièrement à sa charge. En cas de dégradations importantes, les dommages seront facturés sur la base de l&apos;état réel des dégradations, du coût d&apos;immobilisation et de la perte potentielle de revenus sur les 3 derniers mois.</P>

                <div className="p-4 bg-red-50 border border-red-200 rounded-lg mt-4">
                  <p className="text-red-800 text-sm"><strong>En cas de vomi :</strong> nettoyage facturé <strong>150€ TTC</strong>, payable immédiatement par carte bancaire.</p>
                  <p className="text-red-800 text-sm mt-1"><strong>Annulation de la prestation suivante due à une dégradation :</strong> supplément fixe de <strong>150€</strong> exigible immédiatement.</p>
                </div>

                <p className="text-gray-700 leading-relaxed mt-4">RACH SERVICES se réserve le droit de refuser ou de déposer un passager ne respectant pas ces obligations, ou se trouvant en état d&apos;ébriété.</p>
              </Section>

              <Section title="Réclamations">
                <P>En cas de réclamation, le client doit adresser une demande écrite par email à <a href="mailto:rachtravelservices@gmail.com" className="hover:underline" style={{ color: 'var(--forest-green)' }}>rachtravelservices@gmail.com</a> ou par courrier recommandé au siège social, dans les <strong>5 jours</strong> suivant l&apos;exécution de la prestation.</P>
                <P>En cas de litige, les tribunaux compétents du lieu du siège social de RACH SERVICES (Seine-Saint-Denis) seront seuls compétents.</P>
              </Section>

              <Section title="Protection des données personnelles">
                <P>Les données personnelles collectées sont traitées conformément au RGPD et à notre <Link href="/confidentialite" className="hover:underline font-medium" style={{ color: 'var(--forest-green)' }}>Politique de confidentialité</Link>.</P>
              </Section>

              <div className="pt-8 border-t border-gray-200">
                <p className="text-sm text-gray-500">
                  <strong>Dernière mise à jour :</strong> Juin 2026
                </p>
              </div>

          </div>
        </div>
      </section>

      <FadeInSection delay={0}>
        <CTASection
          title="Prêt à réserver en toute confiance ?"
          description="Réservez votre course en ligne en quelques clics"
          primaryButton={{ text: "Réserver maintenant", href: "/" }}
        />
      </FadeInSection>

      <Footer />
    </div>
  );
}
