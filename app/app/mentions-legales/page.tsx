import Link from 'next/link';
import Navigation from '../components/layout/Navigation';
import Footer from '../components/layout/Footer';
import Hero from '../components/sections/Hero';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Mentions Légales | RACH SERVICES",
  description: "Mentions légales de RACH SERVICES - Informations légales, coordonnées de l'entreprise et conditions d'utilisation du site.",
};

const Section = ({ num, title, children }: { num: number; title: string; children: React.ReactNode }) => (
  <div className="mb-12">
    <h2 className="text-2xl font-bold mb-4" style={{ fontFamily: 'var(--font-playfair)', color: 'var(--forest-green)' }}>
      {num}. {title}
    </h2>
    {children}
  </div>
);

const P = ({ children }: { children: React.ReactNode }) => (
  <p className="text-gray-700 leading-relaxed mb-4">{children}</p>
);

export default function MentionsLegalesPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      <Hero
        badge="Informations légales"
        title={<>Mentions<br /><span style={{ color: 'var(--forest-green)' }}>Légales</span></>}
        description="Informations légales concernant RACH SERVICES et l'utilisation de ce site"
      />

      <section className="py-16 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">

          <Section num={1} title="Éditeur du site">
            <div className="space-y-2 text-gray-700 leading-relaxed">
              <p><strong>Raison sociale :</strong> RACH SERVICES</p>
              <p><strong>Responsable :</strong> Rachel Meganou</p>
              <p><strong>SIRET :</strong> 937 563 526</p>
              <p><strong>N° TVA intracommunautaire :</strong> FR 20937563526</p>
              <p><strong>Adresse :</strong> 14 Rue Pierre Larousse, 93300 Aubervilliers</p>
              <p><strong>Téléphone :</strong> 06 61 59 02 90</p>
              <p><strong>Email :</strong> <a href="mailto:rachtravelservices@gmail.com" className="hover:underline" style={{ color: 'var(--forest-green)' }}>rachtravelservices@gmail.com</a></p>
              <p><strong>Site web :</strong> www.rach-services.com</p>
            </div>
          </Section>

          <Section num={2} title="Directeur de publication">
            <P>Le directeur de la publication du site est <strong>Rachel Meganou</strong>, gérante de RACH SERVICES.</P>
          </Section>

          <Section num={3} title="Hébergement">
            <div className="space-y-2 text-gray-700 leading-relaxed">
              <p><strong>Hébergeur :</strong> Vercel Inc.</p>
              <p><strong>Adresse :</strong> 440 N Barranca Ave #4133, Covina, CA 91723, USA</p>
              <p><strong>Site web :</strong> <a href="https://vercel.com" target="_blank" rel="noopener noreferrer" className="hover:underline" style={{ color: 'var(--forest-green)' }}>vercel.com</a></p>
            </div>
          </Section>

          <Section num={4} title="Conception et développement">
            <div className="space-y-2 text-gray-700 leading-relaxed">
              <p><strong>Développement :</strong> Maya-Line Pelage</p>
              <p><strong>Contact :</strong> <a href="mailto:mayaline.pelage@gmail.com" className="hover:underline" style={{ color: 'var(--forest-green)' }}>mayaline.pelage@gmail.com</a></p>
              <p><strong>Polices :</strong> Fraunces, Inter, JetBrains Mono (Google Fonts)</p>
            </div>
          </Section>

          <Section num={5} title="Propriété intellectuelle">
            <P>L&apos;ensemble du contenu de ce site (textes, images, logos, graphismes, etc.) est la propriété exclusive de RACH SERVICES, sauf mention contraire.</P>
            <P>Toute reproduction, distribution, modification ou publication, même partielle, est strictement interdite sans l&apos;accord exprès écrit de RACH SERVICES.</P>
          </Section>

          <Section num={6} title="Protection des données personnelles">
            <P>Conformément au RGPD et à la loi Informatique et Libertés, vous disposez d&apos;un droit d&apos;accès, de rectification, de suppression et d&apos;opposition aux données personnelles vous concernant.</P>
            <P>Pour exercer ces droits : <a href="mailto:rachtravelservices@gmail.com" className="hover:underline" style={{ color: 'var(--forest-green)' }}>rachtravelservices@gmail.com</a></P>
            <P>Pour plus d&apos;informations, consultez notre <Link href="/confidentialite" className="hover:underline font-medium" style={{ color: 'var(--forest-green)' }}>Politique de confidentialité</Link>.</P>
          </Section>

          <Section num={7} title="Cookies">
            <P>Ce site utilise des cookies techniques nécessaires à son bon fonctionnement ainsi que Google reCAPTCHA pour la protection contre les formulaires automatisés.</P>
            <P>Vous pouvez désactiver les cookies dans les paramètres de votre navigateur, ce qui peut affecter certaines fonctionnalités du site.</P>
          </Section>

          <Section num={8} title="Limitation de responsabilité">
            <P>RACH SERVICES s&apos;efforce d&apos;assurer l&apos;exactitude des informations diffusées sur ce site mais ne peut garantir leur exhaustivité. RACH SERVICES décline toute responsabilité pour toute imprécision ou omission.</P>
            <P>RACH SERVICES ne saurait être tenue responsable des retards dus à des circonstances indépendantes de sa volonté (embouteillages, conditions météorologiques, force majeure).</P>
          </Section>

          <Section num={9} title="Droit applicable">
            <P>Les présentes mentions légales sont soumises au droit français. En cas de litige, les tribunaux compétents du lieu du siège social de RACH SERVICES (Seine-Saint-Denis) seront seuls compétents.</P>
          </Section>

          <div className="pt-8 border-t border-gray-200">
            <p className="text-sm text-gray-500">
              <strong>Dernière mise à jour :</strong> Juin 2026
            </p>
          </div>

        </div>
      </section>

      <Footer />
    </div>
  );
}
