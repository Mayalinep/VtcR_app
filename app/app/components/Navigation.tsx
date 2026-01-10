'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * Navigation - Barre de navigation responsive avec menu hamburger
 * 
 * Navigation fixe en haut de page avec :
 * - Desktop : Logo + liens + bouton CTA
 * - Mobile : Logo + hamburger menu (slide-down animé)
 * 
 * @example
 * <Navigation />
 */
export default function Navigation() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
        <a href="/" className="text-xl sm:text-2xl font-semibold tracking-tight" style={{ color: 'var(--forest-green)', fontFamily: 'var(--font-playfair)' }}>
          VTC Rachel
        </a>
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          <a href="/tarifs" className="text-gray-700 hover:text-gray-900 transition-colors">Tarifs</a>
          <a href="/a-propos" className="text-gray-700 hover:text-gray-900 transition-colors">À propos</a>
          <a href="/contact" className="text-gray-700 hover:text-gray-900 transition-colors">Contact</a>
          <a 
            href="/"
            className="px-6 py-2.5 rounded-lg font-medium text-white transition-all hover:scale-105 inline-block"
            style={{ backgroundColor: 'var(--forest-green)' }}
          >
            Réserver
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden p-3 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors active:scale-95"
          aria-label="Menu"
        >
          {menuOpen ? (
            <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ 
              duration: 0.5,
              opacity: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
              height: { duration: 0.5, ease: [0.16, 1, 0.3, 1] }
            }}
            className="md:hidden bg-white border-t border-gray-100 shadow-lg overflow-hidden"
          >
            <motion.div 
              initial={{ y: -15 }}
              animate={{ y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="px-4 py-6 space-y-2"
            >
              {[
                { label: 'Tarifs', href: '/tarifs' },
                { label: 'À propos', href: '/a-propos' },
                { label: 'Contact', href: '/contact' }
              ].map((item, i) => (
                <motion.a
                  key={item.label}
                  href={item.href}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ 
                    duration: 0.5, 
                    delay: 0.15 + i * 0.08,
                    opacity: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
                    x: { duration: 0.5, ease: [0.16, 1, 0.3, 1] }
                  }}
                  className="block text-gray-700 hover:text-gray-900 py-3 px-4 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  {item.label}
                </motion.a>
              ))}
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ 
                  duration: 0.6, 
                  delay: 0.4,
                  ease: [0.16, 1, 0.3, 1]
                }}
                className="pt-4"
              >
                <a 
                  href="/"
                  className="block w-full px-6 py-3.5 rounded-lg font-semibold text-white transition-all hover:scale-105 active:scale-95 shadow-md text-center"
                  style={{ backgroundColor: 'var(--forest-green)' }}
                >
                  Réserver
                </a>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
