'use client';

/**
 * Page de confirmation après envoi d'une demande de réservation.
 * Les données viennent de sessionStorage (écrites depuis /reserver).
 */

import { Suspense, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import Navigation from '@/app/components/layout/Navigation';
import Footer from '@/app/components/layout/Footer';
import { CONTACT } from '@/app/lib/utils/constants';
import {
  CONFIRMATION_STORAGE_KEY,
  type ConfirmationData,
} from '@/app/lib/confirmation';

function formatDateFr(dateStr: string): string {
  if (!dateStr) return '—';
  try {
    return new Date(`${dateStr}T12:00:00`).toLocaleDateString('fr-FR', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  } catch {
    return dateStr;
  }
}

function ConfirmationContent() {
  const router = useRouter();
  const [data, setData] = useState<ConfirmationData | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const raw = sessionStorage.getItem(CONFIRMATION_STORAGE_KEY);
      if (raw) {
        setData(JSON.parse(raw) as ConfirmationData);
        sessionStorage.removeItem(CONFIRMATION_STORAGE_KEY);
      }
    } catch {
      setData(null);
    } finally {
      setReady(true);
    }
  }, []);

  if (!ready) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-forest-green border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      <main className="max-w-2xl mx-auto px-4 pt-28 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className="text-center"
        >
          <div
            className="w-20 h-20 mx-auto mb-6 rounded-full flex items-center justify-center"
            style={{ backgroundColor: 'var(--gold-light)' }}
          >
            <motion.svg
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="w-10 h-10"
              style={{ color: 'var(--forest-green)' }}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </motion.svg>
          </div>

          <h1
            className="text-3xl sm:text-4xl font-bold mb-3"
            style={{ fontFamily: 'var(--font-playfair)', color: 'var(--forest-green)' }}
          >
            Demande envoyée avec succès !
          </h1>
          <p className="text-lg text-gray-600 mb-2">
            {data?.firstName
              ? `Merci ${data.firstName}, Rachel a bien reçu votre demande.`
              : 'Rachel a bien reçu votre demande.'}
          </p>
          <p className="text-base font-medium mb-10" style={{ color: 'var(--forest-green)' }}>
            Elle vous contactera sous 2 heures.
          </p>
        </motion.div>

        {data && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.4 }}
            className="rounded-2xl border border-gray-100 bg-gray-50 p-6 mb-8 text-left space-y-4"
          >
            <h2 className="text-lg font-bold" style={{ fontFamily: 'var(--font-playfair)' }}>
              Récapitulatif
            </h2>

            <div>
              <p className="text-xs uppercase tracking-wide text-gray-500 mb-1">Trajet</p>
              <p className="text-sm text-gray-900">
                <span className="font-medium">Départ :</span> {data.departure}
              </p>
              <p className="text-sm text-gray-900">
                <span className="font-medium">Arrivée :</span> {data.arrival}
              </p>
              {(data.distance || data.duration) && (
                <p className="text-sm text-gray-600 mt-1">
                  {[data.distance, data.duration].filter(Boolean).join(' · ')}
                </p>
              )}
            </div>

            <div>
              <p className="text-xs uppercase tracking-wide text-gray-500 mb-1">Date & heure</p>
              <p className="text-sm text-gray-900">
                {formatDateFr(data.date)} à {data.time}
              </p>
            </div>

            <div>
              <p className="text-xs uppercase tracking-wide text-gray-500 mb-1">Détails</p>
              <p className="text-sm text-gray-900">
                {data.passengers} passager{data.passengers > 1 ? 's' : ''} · {data.luggage} bagage
                {data.luggage > 1 ? 's' : ''}
              </p>
              {data.comment ? (
                <p className="text-sm text-gray-600 italic mt-1">&ldquo;{data.comment}&rdquo;</p>
              ) : null}
            </div>

            <div
              className="rounded-xl px-4 py-3 text-center"
              style={{ backgroundColor: 'var(--forest-green)' }}
            >
              <p className="text-sm text-white/80">Prix estimé</p>
              <p className="text-2xl font-bold" style={{ color: 'var(--gold-champagne)' }}>
                {data.price}€
              </p>
            </div>
          </motion.div>
        )}

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.25 }}
          className="rounded-xl border border-gray-100 p-5 mb-8 space-y-2 text-sm text-gray-700"
        >
          <p>📧 Un email de confirmation vous a été envoyé{data?.email ? ` à ${data.email}` : ''}.</p>
          <p>📞 Rachel vous appellera pour confirmer les détails de la course.</p>
        </motion.div>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <a
            href={`tel:${CONTACT.phone.replace(/\s/g, '')}`}
            className="inline-flex items-center justify-center px-8 py-3 rounded-lg font-semibold transition-all hover:scale-105"
            style={{
              backgroundColor: 'var(--gold-light)',
              color: 'var(--forest-green)',
              border: '2px solid var(--gold-champagne)',
            }}
          >
            Appeler Rachel ({CONTACT.phoneDisplay})
          </a>
          <Link
            href="/"
            className="inline-flex items-center justify-center px-8 py-3 rounded-lg font-semibold text-white transition-all hover:scale-105"
            style={{ backgroundColor: 'var(--forest-green)' }}
            onClick={() => router.refresh()}
          >
            Retour à l&apos;accueil
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default function ConfirmationPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-white flex items-center justify-center">
          <div className="w-8 h-8 border-2 border-forest-green border-t-transparent rounded-full animate-spin" />
        </div>
      }
    >
      <ConfirmationContent />
    </Suspense>
  );
}
