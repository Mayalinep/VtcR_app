'use client';

import { useState } from 'react';
import Navigation from '../components/layout/Navigation';
import Footer from '../components/layout/Footer';
import { CONTACT } from '../lib/utils/constants';

export default function PartenairesPage() {
  const [hotelName, setHotelName] = useState('');
  const [password, setPassword] = useState('');
  const [notice, setNotice] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setNotice(
      `L’espace partenaire en ligne n’est pas disponible pour le moment. Pour réserver une course pour vos clients ou rejoindre le programme, contactez Rachel au ${CONTACT.phoneDisplay}.`
    );
  };

  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      <main className="pt-24 pb-16 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center">
          <div>
            <p
              className="text-sm font-semibold uppercase tracking-wide mb-3"
              style={{ color: 'var(--gold-champagne)' }}
            >
              Hôtels & conciergeries
            </p>
            <h1
              className="text-3xl sm:text-4xl font-bold mb-4"
              style={{ fontFamily: 'var(--font-playfair)', color: 'var(--forest-green)' }}
            >
              Programme partenaires
            </h1>
            <p className="text-gray-600 leading-relaxed mb-6">
              Réservez des transferts VTC pour vos clients depuis un espace dédié. L’accès en ligne
              est en cours de déploiement.
            </p>
            <a
              href={`tel:${CONTACT.phone.replace(/\s/g, '')}`}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-semibold text-white transition-all hover:scale-105"
              style={{ backgroundColor: 'var(--forest-green)' }}
            >
              Appeler Rachel — {CONTACT.phoneDisplay}
            </a>
          </div>

          <div className="rounded-2xl border border-gray-100 shadow-lg p-8 bg-gray-50">
            <h2 className="text-xl font-bold mb-2" style={{ fontFamily: 'var(--font-playfair)' }}>
              Connexion partenaire
            </h2>
            <p className="text-sm text-gray-600 mb-6">
              Identifiants fournis aux hôtels partenaires.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="hotelName" className="block text-sm font-medium text-gray-700 mb-1">
                  Nom de l&apos;hôtel
                </label>
                <input
                  id="hotelName"
                  type="text"
                  value={hotelName}
                  onChange={(e) => setHotelName(e.target.value)}
                  placeholder="Hôtel Lutétia"
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-forest-green focus:ring-2 focus:ring-forest-green/20 outline-none"
                />
              </div>
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                  Mot de passe
                </label>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-forest-green focus:ring-2 focus:ring-forest-green/20 outline-none"
                />
              </div>

              {notice && (
                <div className="p-4 rounded-lg bg-amber-50 border border-amber-200 text-sm text-amber-900">
                  {notice}
                </div>
              )}

              <button
                type="submit"
                className="w-full py-3 rounded-lg font-semibold text-white transition-all hover:opacity-90"
                style={{ backgroundColor: 'var(--forest-green)' }}
              >
                Se connecter
              </button>
            </form>

            <p className="text-xs text-gray-500 mt-6 text-center">
              Pas encore partenaire ? Contactez Rachel pour rejoindre le programme.
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
