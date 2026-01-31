'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * Navigation - Barre de navigation moderne style Uber
 * 
 * Navigation premium avec fond vert semi-transparent (glassmorphism)
 * Inspirée d'Uber mais adaptée à VTC Rachel
 * 
 * Features:
 * - Fond vert foncé avec blur au scroll
 * - Liens : Tarifs, À propos, Contact, FAQ
 * - Bouton téléphone cliquable
 * - Responsive avec menu hamburger élégant
 * - Micro-animations au hover
 * 
 * @example
 * <Navigation />
 */
export default function Navigation() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Détection du scroll pour ajuster l'opacité
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-[#0F4C3A]/80 backdrop-blur-xl shadow-lg' 
          : 'bg-[#0F4C3A]/70 backdrop-blur-lg'
      }`}
    >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14 lg:h-16">
          
          {/* Logo */}
          <a 
            href="/" 
            className="text-lg lg:text-xl font-bold tracking-tight text-white hover:text-white/80 transition-colors duration-200"
            style={{ fontFamily: 'var(--font-playfair)' }}
          >
            VTC Rachel
          </a>
          
          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-0.5">
            {[
              { label: 'Tarifs', href: '/tarifs' },
              { label: 'À propos', href: '/a-propos' },
              { label: 'Contact', href: '/contact' },
              { label: 'FAQ', href: '/faq' }
            ].map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="px-3 py-1.5 text-sm text-white/90 hover:text-white hover:bg-white/10 rounded-md transition-all duration-200"
              >
                {item.label}
              </a>
            ))}
          </div>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center gap-3">
            {/* Téléphone */}
            <a
              href="tel:+33661590290"
              className="flex items-center gap-1.5 px-3 py-1.5 text-sm text-white/90 hover:text-white hover:bg-white/10 rounded-md transition-all duration-200"
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
              <span>+33 6 61 59 02 90</span>
            </a>

          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="lg:hidden p-1.5 text-white hover:bg-white/10 rounded-md transition-colors active:scale-95"
            aria-label="Menu"
          >
            {menuOpen ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
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
              height: { duration: 0.4, ease: [0.16, 1, 0.3, 1] }
            }}
            className="lg:hidden bg-[#0F4C3A]/98 backdrop-blur-lg border-t border-white/10 overflow-hidden"
          >
            <div className="px-4 py-6 space-y-1">
              {/* Navigation Links */}
              {[
                { label: 'Tarifs', href: '/tarifs' },
                { label: 'À propos', href: '/a-propos' },
                { label: 'Contact', href: '/contact' },
                { label: 'FAQ', href: '/faq' }
              ].map((item, i) => (
                <motion.a
                  key={item.label}
                  href={item.href}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ 
                    duration: 0.4, 
                    delay: 0.1 + i * 0.05,
                    ease: [0.16, 1, 0.3, 1]
                  }}
                  className="block text-white py-3 px-4 rounded-lg hover:bg-white/10 transition-colors font-medium"
                >
                  {item.label}
                </motion.a>
              ))}

              {/* Divider */}
              <div className="h-px bg-white/10 my-4" />

              {/* Contact Info Mobile */}
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

            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
