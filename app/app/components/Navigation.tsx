'use client';

import { useState } from 'react';

export default function Navigation() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
        <div className="text-xl sm:text-2xl font-semibold tracking-tight" style={{ color: 'var(--forest-green)', fontFamily: 'var(--font-playfair)' }}>
          VTC Rachel
        </div>
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          <a href="#" className="text-gray-700 hover:text-gray-900 transition-colors">Tarifs</a>
          <a href="#" className="text-gray-700 hover:text-gray-900 transition-colors">À propos</a>
          <a href="#" className="text-gray-700 hover:text-gray-900 transition-colors">Contact</a>
          <button 
            className="px-6 py-2.5 rounded-lg font-medium text-white transition-all hover:scale-105"
            style={{ backgroundColor: 'var(--forest-green)' }}
          >
            Réserver
          </button>
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
      {menuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 shadow-lg">
          <div className="px-4 py-6 space-y-2">
            <a href="#" className="block text-gray-700 hover:text-gray-900 py-3 px-4 rounded-lg hover:bg-gray-50 transition-colors">Tarifs</a>
            <a href="#" className="block text-gray-700 hover:text-gray-900 py-3 px-4 rounded-lg hover:bg-gray-50 transition-colors">À propos</a>
            <a href="#" className="block text-gray-700 hover:text-gray-900 py-3 px-4 rounded-lg hover:bg-gray-50 transition-colors">Contact</a>
            <div className="pt-4">
              <button 
                className="w-full px-6 py-3.5 rounded-lg font-semibold text-white transition-all hover:scale-105 active:scale-95 shadow-md"
                style={{ backgroundColor: 'var(--forest-green)' }}
              >
                Réserver
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
