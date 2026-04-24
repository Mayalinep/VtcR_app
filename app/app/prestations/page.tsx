import Navigation from '../components/layout/Navigation';
import Footer from '../components/layout/Footer';
import Hero from '../components/sections/Hero';
import CTASection from '../components/sections/CTASection';
import FadeInSection from '../components/animations/FadeInSection';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Nos prestations | VTC Rachel',
  description:
    'Decouvrez les prestations VTC Rachel : transferts aeroports et gares, trajets inter-cites dans toute la France, mise a disposition et transport adolescent.',
};

const SERVICES = [
  {
    title: 'Aeroports et gares',
    description:
      "Nous assurons vos transferts depuis et vers les aeroports et gares avec une prise en charge ponctuelle, un suivi en temps reel et une communication claire avant l'arrivee du chauffeur.",
    points: [
      'Transferts CDG, Orly et principales gares parisiennes',
      'Accueil personnalise et aide aux bagages',
      'Ideal pour trajets professionnels, vacances et retours tardifs',
    ],
  },
  {
    title: 'Trajets inter-cites - Toute la France',
    description:
      "Au-dela de l'Ile-de-France, nous realisons vos deplacements vers d'autres villes de France dans un cadre confortable et serein.",
    points: [
      'Longues distances sur reservation',
      'Itineraires adaptes a vos contraintes horaires',
      'Solution fiable pour deplacements personnels ou business',
    ],
  },
  {
    title: 'Mise a disposition',
    description:
      "Un chauffeur dedie reste disponible sur la duree de votre choix pour vous accompagner sur plusieurs etapes de la journee ou de la soiree.",
    points: [
      "Formules a l'heure, demi-journee et journee",
      'Parfait pour evenements, reunions, shopping ou ceremonies',
      'Souplesse des arrets et des horaires selon votre programme',
    ],
  },
  {
    title: 'Transport adolescent',
    description:
      'Nous proposons un transport encadre pour les adolescents, avec des regles claires de securite et une coordination avec les parents.',
    points: [
      'Trajets ecole, activites et deplacements ponctuels',
      'Confirmation des horaires de prise en charge et depose',
      'Reservation avec informations parentales obligatoires',
    ],
  },
];

export default function PrestationsPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      <Hero
        badge="Services premium"
        title={
          <>
            Nos <span style={{ color: 'var(--forest-green)' }}>prestations</span>
          </>
        }
        description="Des solutions de transport fiables, elegantes et adaptees a chaque besoin."
      />

      <section className="py-16 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <FadeInSection delay={0}>
            <div className="text-center mb-12">
              <h2
                className="text-3xl sm:text-4xl font-bold mb-4"
                style={{ fontFamily: 'var(--font-playfair)', color: 'var(--forest-green)' }}
              >
                Un accompagnement sur mesure
              </h2>
              <p className="text-gray-600 max-w-3xl mx-auto">
                Chaque prestation est pensee pour allier ponctualite, confort et discretion.
                Vous beneficiez d&apos;un service humain, organise et adapte a votre contexte.
              </p>
            </div>
          </FadeInSection>

          <div className="grid md:grid-cols-2 gap-6">
            {SERVICES.map((service, index) => (
              <FadeInSection key={service.title} delay={index * 0.08}>
                <article className="h-full rounded-2xl border border-gray-200 p-6 sm:p-8 bg-white shadow-sm">
                  <h3
                    className="text-xl sm:text-2xl font-bold mb-3"
                    style={{ fontFamily: 'var(--font-playfair)', color: 'var(--forest-green)' }}
                  >
                    {service.title}
                  </h3>
                  <p className="text-gray-700 leading-relaxed mb-5">{service.description}</p>
                  <ul className="space-y-2 text-gray-700">
                    {service.points.map((point) => (
                      <li key={point} className="flex items-start gap-2">
                        <span
                          className="w-2 h-2 rounded-full mt-2 flex-shrink-0"
                          style={{ backgroundColor: 'var(--forest-green)' }}
                        />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </article>
              </FadeInSection>
            ))}
          </div>

          <FadeInSection delay={0.25}>
            <div className="mt-10 rounded-xl border border-amber-200 bg-amber-50 p-5 text-sm text-amber-900">
              Pour les prestations longues distances et le transport adolescent, une reservation
              anticipee est recommandee afin de garantir les meilleures conditions de prise en charge.
            </div>
          </FadeInSection>
        </div>
      </section>

      <FadeInSection delay={0}>
        <CTASection
          title="Besoin d'une prestation specifique ?"
          description="Contactez-nous pour organiser votre trajet avec une proposition adaptee."
          primaryButton={{
            text: 'Demander un devis',
            href: '/contact',
          }}
          secondaryButton={{
            text: 'Voir les tarifs',
            href: '/tarifs',
          }}
        />
      </FadeInSection>

      <Footer />
    </div>
  );
}
