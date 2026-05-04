'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import RachLogo from './RachLogo';
import {
  getLocaleFromPath,
  LANGUAGE_OPTIONS,
  localizeHref,
  NAV_TRANSLATIONS,
  switchLocalePath,
} from '../../lib/i18n';

/**
 * Navigation - Barre de navigation premium
 *
 * Adaptative :
 * - Mobile / tablette : menu hamburger
 * - lg (>=1024px) : nav complète compacte (tel en icône, langues, CTA)
 * - xl (>=1280px) : version confortable (tel complet + labels)
 */
export default function Navigation() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const locale = getLocaleFromPath(pathname || '/');
  const t = NAV_TRANSLATIONS[locale];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: t.tarifs, href: '/tarifs' },
    { label: t.about, href: '/a-propos' },
    { label: t.services, href: '/prestations' },
    { label: t.contact, href: '/contact' },
    { label: t.faq, href: '/faq' },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#0F4C3A]/80 backdrop-blur-xl shadow-lg'
          : 'bg-[#0F4C3A]/70 backdrop-blur-lg'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14 lg:h-16 gap-4">
          {/* Logo */}
          <a
            href={localizeHref('/', locale)}
            className="shrink-0 inline-flex items-center"
            aria-label="Rach Services — accueil"
          >
            <RachLogo size={38} theme="dark" variant="lockup" />
          </a>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-0.5">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={localizeHref(item.href, locale)}
                className="whitespace-nowrap px-2.5 py-1.5 text-sm text-white/90 hover:text-white hover:bg-white/10 rounded-md transition-all duration-200"
              >
                {item.label}
              </a>
            ))}
          </div>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center gap-2">
            {/* Téléphone */}
            <a
              href="tel:+33661590290"
              className="flex items-center gap-1.5 px-2 py-1.5 text-sm text-white/90 hover:text-white hover:bg-white/10 rounded-md transition-all duration-200"
              aria-label="+33 6 61 59 02 90"
              title="+33 6 61 59 02 90"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                />
              </svg>
              {/* Label visible seulement à partir de xl pour laisser de la place */}
              <span className="hidden xl:inline whitespace-nowrap">
                +33 6 61 59 02 90
              </span>
            </a>

            <div className="w-px h-5 bg-white/20" />

            {/* Langues */}
            <div className="flex items-center gap-0.5">
              {LANGUAGE_OPTIONS.map((option) => (
                <a
                  key={option.locale}
                  href={switchLocalePath(pathname || '/', option.locale)}
                  title={option.label}
                  aria-label={option.label}
                  className={`px-1.5 py-1 rounded-md text-base leading-none transition-all ${
                    option.locale === locale
                      ? 'bg-white/20'
                      : 'opacity-70 hover:opacity-100 hover:bg-white/10'
                  }`}
                >
                  {option.icon}
                </a>
              ))}
            </div>

            <div className="w-px h-5 bg-white/20" />

            <a
              href="/b2b/login"
              className="whitespace-nowrap px-4 py-2 text-sm text-white rounded-md font-semibold border border-white/35 bg-gradient-to-r from-[#2A8A6A] to-[#0F4C3A] shadow-[0_8px_24px_rgba(0,0,0,0.25)] transition-all duration-300 hover:from-[#36A47D] hover:to-[#145A45] hover:border-white/60 hover:-translate-y-0.5 hover:shadow-[0_12px_28px_rgba(0,0,0,0.35)]"
            >
              Espace partenaire
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="lg:hidden p-1.5 text-white hover:bg-white/10 rounded-md transition-colors active:scale-95"
            aria-label="Menu"
          >
            {menuOpen ? (
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{
              duration: 0.4,
              opacity: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
              height: { duration: 0.4, ease: [0.16, 1, 0.3, 1] },
            }}
            className="lg:hidden bg-[#0F4C3A]/98 backdrop-blur-lg border-t border-white/10 overflow-hidden"
          >
            <div className="px-4 py-6 space-y-1">
              {navItems.map((item, i) => (
                <motion.a
                  key={item.label}
                  href={localizeHref(item.href, locale)}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{
                    duration: 0.4,
                    delay: 0.1 + i * 0.05,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="block text-white py-3 px-4 rounded-lg hover:bg-white/10 transition-colors font-medium"
                >
                  {item.label}
                </motion.a>
              ))}

              <div className="h-px bg-white/10 my-4" />

              <motion.a
                href="tel:+33661590290"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.25 }}
                className="flex items-center gap-3 text-white/90 py-3 px-4 rounded-lg hover:bg-white/10 transition-colors"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
                <span>+33 6 61 59 02 90</span>
              </motion.a>

              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.3 }}
                className="px-4 py-3"
              >
                <div className="text-white/80 text-xs mb-2">Langue</div>
                <div className="flex items-center gap-2">
                  {LANGUAGE_OPTIONS.map((option) => (
                    <a
                      key={option.locale}
                      href={switchLocalePath(pathname || '/', option.locale)}
                      title={option.label}
                      aria-label={option.label}
                      className={`px-3 py-1.5 rounded-md text-lg leading-none transition-all ${
                        option.locale === locale
                          ? 'bg-white/20'
                          : 'opacity-70 hover:opacity-100 hover:bg-white/10'
                      }`}
                    >
                      {option.icon}
                    </a>
                  ))}
                </div>
              </motion.div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
