'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { getLocaleFromPath, localizeHref, FOOTER_TRANSLATIONS, NAV_TRANSLATIONS } from '../../lib/i18n';

export default function Footer() {
  const locale = getLocaleFromPath(usePathname() || '/');
  const t = FOOTER_TRANSLATIONS[locale];
  const nav = NAV_TRANSLATIONS[locale];
  const homeLabel = { fr: 'Accueil', en: 'Home', es: 'Inicio' }[locale];

  return (
    <footer className="border-t border-gray-100 py-12 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
          <div className="col-span-2 md:col-span-1">
            <div className="text-2xl font-semibold mb-3" style={{ color: 'var(--forest-green)', fontFamily: 'var(--font-playfair)' }}>
              VTC Rachel
            </div>
            <p className="text-sm text-gray-600">{t.tagline}</p>
          </div>

          <div>
            <h4 className="font-semibold mb-3 text-sm sm:text-base">{t.navTitle}</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li><Link href={localizeHref('/', locale)} className="hover:text-gray-900 inline-block py-0.5">{homeLabel}</Link></li>
              <li><a href={localizeHref('/a-propos', locale)} className="hover:text-gray-900 inline-block py-0.5">{nav.about}</a></li>
              <li><a href={localizeHref('/prestations', locale)} className="hover:text-gray-900 inline-block py-0.5">{nav.services}</a></li>
              <li><a href={localizeHref('/tarifs', locale)} className="hover:text-gray-900 inline-block py-0.5">{nav.tarifs}</a></li>
              <li><a href={localizeHref('/faq', locale)} className="hover:text-gray-900 inline-block py-0.5">{nav.faq}</a></li>
              <li><a href={localizeHref('/contact', locale)} className="hover:text-gray-900 inline-block py-0.5">{nav.contact}</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-3 text-sm sm:text-base">{t.legalTitle}</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li><a href={localizeHref('/cgv', locale)} className="hover:text-gray-900 inline-block py-0.5">{t.cgv}</a></li>
              <li><a href={localizeHref('/mentions-legales', locale)} className="hover:text-gray-900 inline-block py-0.5">{t.mentionsLegales}</a></li>
              <li><a href={localizeHref('/confidentialite', locale)} className="hover:text-gray-900 inline-block py-0.5">{t.confidentialite}</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-3 text-sm sm:text-base">{t.contactTitle}</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li className="py-0.5">contact@vtc-rachel.fr</li>
              <li className="py-0.5">+33 6 61 59 02 90</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-100 pt-6 text-center text-sm text-gray-500">
          © 2026 VTC Rachel. {t.rights}.
        </div>
      </div>
    </footer>
  );
}
