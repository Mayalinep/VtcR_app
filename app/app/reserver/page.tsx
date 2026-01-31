'use client';

/**
 * Page de réservation VTC Rachel
 * 
 * Layout split :
 * - Gauche : Formulaire de réservation avec récap du trajet
 * - Droite : Contact Rachel + message rassurant (desktop uniquement)
 * 
 * Les données du trajet sont passées via URL query params :
 * ?departure=...&arrival=...&price=...&distance=...&duration=...
 */

import { Suspense, useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { GoogleReCaptchaProvider, useGoogleReCaptcha } from 'react-google-recaptcha-v3';
import Navigation from '@/app/components/layout/Navigation';
import Footer from '@/app/components/layout/Footer';
import AddressAutocomplete from '@/app/components/AddressAutocomplete';
import { motion } from 'framer-motion';

function ReservationContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { executeRecaptcha } = useGoogleReCaptcha();

  // Récupérer les données du trajet depuis l'URL
  const [departure, setDeparture] = useState(searchParams.get('departure') || '');
  const [arrival, setArrival] = useState(searchParams.get('arrival') || '');
  const [price, setPrice] = useState(Number(searchParams.get('price')) || 0);
  const [distance, setDistance] = useState(searchParams.get('distance') || '');
  const [duration, setDuration] = useState(searchParams.get('duration') || '');

  // État du formulaire client
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    date: '',
    time: '',
    passengers: 1,
    luggage: 0,
    comment: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);

  // Si pas de données de trajet, rediriger vers la home
  useEffect(() => {
    if (!departure || !arrival || !price) {
      router.push('/');
    }
  }, [departure, arrival, price, router]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      // Générer le token reCAPTCHA
      let recaptchaToken = undefined;
      
      if (executeRecaptcha) {
        try {
          recaptchaToken = await executeRecaptcha('submit_reservation');
          console.log('✅ Token reCAPTCHA généré');
        } catch (error) {
          console.warn('⚠️ reCAPTCHA error (on continue quand même):', error);
        }
      }

      const response = await fetch('/api/send-reservation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          departure,
          arrival,
          price,
          distance,
          duration,
          recaptchaToken,
        }),
      });

      if (!response.ok) {
        throw new Error('Erreur lors de l\'envoi de la réservation');
      }

      setShowSuccess(true);
    } catch (err) {
      setError('Une erreur est survenue. Veuillez réessayer.');
      console.error('Reservation error:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const today = new Date().toISOString().split('T')[0];

  // Affichage de la confirmation
  if (showSuccess) {
    return (
      <div className="min-h-screen bg-white">
        <Navigation />
        <div className="max-w-2xl mx-auto px-4 py-20 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="mb-6">
              <div className="w-20 h-20 mx-auto rounded-full flex items-center justify-center" style={{ backgroundColor: 'var(--gold-light)' }}>
                <svg className="w-10 h-10" style={{ color: 'var(--forest-green)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
            </div>
            <h1 className="text-3xl font-bold mb-4" style={{ fontFamily: 'var(--font-playfair)', color: 'var(--forest-green)' }}>
              Réservation envoyée !
            </h1>
            <p className="text-lg text-gray-600 mb-8">
              Rachel a bien reçu votre demande et vous contactera très prochainement.
            </p>
            <div className="bg-gray-50 rounded-xl p-6 mb-8">
              <p className="text-sm text-gray-700 mb-2">
                📧 Un email de confirmation vous a été envoyé
              </p>
              <p className="text-sm text-gray-700">
                📱 Rachel vous appellera pour confirmer les détails
              </p>
            </div>
            <button
              onClick={() => router.push('/')}
              className="px-8 py-3 rounded-lg font-semibold text-white transition-all hover:scale-105"
              style={{ backgroundColor: 'var(--forest-green)' }}
            >
              Retour à l'accueil
            </button>
          </motion.div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        {/* Titre */}
        <div className="text-center mb-10">
          <h1 className="text-3xl sm:text-4xl font-bold mb-3" style={{ fontFamily: 'var(--font-playfair)' }}>
            Finalisez votre réservation
          </h1>
          <p className="text-gray-600">
            Remplissez vos informations et Rachel vous contactera pour confirmer
          </p>
        </div>

        {/* Layout 2 colonnes */}
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
          {/* GAUCHE : Formulaire - 60% */}
          <div className="w-full lg:w-3/5">
            <motion.form
              onSubmit={handleSubmit}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-2xl p-6 lg:p-8 shadow-sm border border-gray-100"
            >
              {/* Récapitulatif du trajet (modifiable) */}
              <div className="mb-8 pb-8 border-b border-gray-200">
                <h3 className="text-lg font-bold mb-4" style={{ fontFamily: 'var(--font-playfair)' }}>
                  Votre trajet
                </h3>
                
                <div className="space-y-3">
                  {/* Départ */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Départ
                    </label>
                    <input
                      type="text"
                      value={departure}
                      onChange={(e) => setDeparture(e.target.value)}
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-sm"
                    />
                  </div>

                  {/* Arrivée */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Arrivée
                    </label>
                    <input
                      type="text"
                      value={arrival}
                      onChange={(e) => setArrival(e.target.value)}
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-sm"
                    />
                  </div>

                  {/* Infos du trajet */}
                  <div className="flex items-center gap-4 pt-3">
                    <div className="flex items-center gap-1.5 text-xs text-gray-600">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                      </svg>
                      <span>{distance}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-xs text-gray-600">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span>{duration}</span>
                    </div>
                    <div className="ml-auto">
                      <span className="text-2xl font-bold" style={{ color: 'var(--forest-green)' }}>
                        {price}€
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Informations client */}
              <div className="space-y-4">
                <h3 className="text-lg font-bold mb-4" style={{ fontFamily: 'var(--font-playfair)' }}>
                  Vos informations
                </h3>

                {/* Nom/Prénom */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                      Prénom *
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-sm"
                      placeholder="Jean"
                    />
                  </div>
                  <div>
                    <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
                      Nom *
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-sm"
                      placeholder="Dupont"
                    />
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-sm"
                    placeholder="jean.dupont@exemple.fr"
                  />
                </div>

                {/* Téléphone */}
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                    Téléphone *
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    pattern="[0-9]{10}"
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-sm"
                    placeholder="0612345678"
                  />
                  <p className="text-xs text-gray-500 mt-1">Format : 10 chiffres sans espaces</p>
                </div>

                {/* Date et Heure */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">
                      Date de la course *
                    </label>
                    <input
                      type="date"
                      id="date"
                      name="date"
                      value={formData.date}
                      onChange={handleChange}
                      min={today}
                      required
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-sm"
                    />
                  </div>
                  <div>
                    <label htmlFor="time" className="block text-sm font-medium text-gray-700 mb-1">
                      Heure de prise en charge *
                    </label>
                    <input
                      type="time"
                      id="time"
                      name="time"
                      value={formData.time}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-sm"
                    />
                  </div>
                </div>

                {/* Passagers et Bagages */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="passengers" className="block text-sm font-medium text-gray-700 mb-1">
                      Nombre de passagers *
                    </label>
                    <select
                      id="passengers"
                      name="passengers"
                      value={formData.passengers}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-sm"
                    >
                      <option value={1}>1 passager</option>
                      <option value={2}>2 passagers</option>
                      <option value={3}>3 passagers</option>
                      <option value={4}>4 passagers</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="luggage" className="block text-sm font-medium text-gray-700 mb-1">
                      Nombre de bagages
                    </label>
                    <select
                      id="luggage"
                      name="luggage"
                      value={formData.luggage}
                      onChange={handleChange}
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-sm"
                    >
                      <option value={0}>0 bagage</option>
                      <option value={1}>1 bagage</option>
                      <option value={2}>2 bagages</option>
                      <option value={3}>3 bagages</option>
                      <option value={4}>4+ bagages</option>
                    </select>
                  </div>
                </div>

                {/* Commentaire */}
                <div>
                  <label htmlFor="comment" className="block text-sm font-medium text-gray-700 mb-1">
                    Commentaire (optionnel)
                  </label>
                  <textarea
                    id="comment"
                    name="comment"
                    value={formData.comment}
                    onChange={handleChange}
                    rows={3}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-sm resize-none"
                    placeholder="Informations supplémentaires (siège bébé, animal, etc.)"
                  />
                </div>

                {/* Message d'erreur */}
                {error && (
                  <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                    <p className="text-sm text-red-800">{error}</p>
                  </div>
                )}

                {/* Boutons */}
                <div className="space-y-3 pt-4">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`
                      w-full py-3.5 rounded-lg font-semibold text-sm text-white 
                      transition-all duration-200
                      ${isSubmitting 
                        ? 'opacity-80 cursor-not-allowed' 
                        : 'opacity-100 hover:scale-[1.02] active:scale-[0.98] cursor-pointer'
                      }
                    `}
                    style={{ backgroundColor: 'var(--forest-green)' }}
                  >
                    {isSubmitting ? 'Envoi en cours...' : 'Confirmer la réservation'}
                  </button>
                  
                  <button
                    type="button"
                    onClick={() => router.back()}
                    disabled={isSubmitting}
                    className="w-full text-sm text-gray-600 hover:text-gray-900 font-medium transition-colors"
                  >
                    Retour
                  </button>
                </div>

                <p className="text-xs text-gray-500 text-center">
                  * Champs obligatoires
                </p>
              </div>
            </motion.form>
          </div>

          {/* DROITE : Contact Rachel - 40% (desktop uniquement) */}
          <div className="hidden lg:block lg:w-2/5">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="sticky top-24 space-y-6"
            >
              {/* Card Contact */}
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <h3 className="text-lg font-bold mb-4" style={{ fontFamily: 'var(--font-playfair)', color: 'var(--forest-green)' }}>
                  Une question ?
                </h3>
                <p className="text-gray-600 text-sm mb-6">
                  Vous avez un doute ou une demande particulière ? N'hésitez pas à contacter Rachel directement !
                </p>
                
                {/* Téléphone */}
                <a
                  href="tel:+33761890250"
                  className="flex items-center gap-3 p-4 rounded-lg border-2 transition-all mb-3 hover:scale-105"
                  style={{ borderColor: 'var(--gold-champagne)', backgroundColor: 'var(--gold-light)' }}
                >
                  <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ backgroundColor: 'var(--forest-green)' }}>
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs text-gray-600 mb-1">Appelez Rachel</p>
                    <p className="font-bold" style={{ color: 'var(--forest-green)' }}>+33 7 61 89 02 50</p>
                  </div>
                </a>

                {/* Disponibilité */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-xs text-gray-600 mb-2">
                    <span className="font-semibold">Disponibilité :</span>
                  </p>
                  <p className="text-xs text-gray-700">
                    📞 Lundi - Dimanche<br />
                    🕐 7h00 - 22h00
                  </p>
                </div>
              </div>

              {/* Card Rassurance */}
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <h3 className="text-lg font-bold mb-4" style={{ fontFamily: 'var(--font-playfair)', color: 'var(--forest-green)' }}>
                  Pourquoi nous choisir ?
                </h3>
                <ul className="space-y-3 text-sm text-gray-700">
                  <li className="flex items-start gap-2">
                    <svg className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: 'var(--gold-champagne)' }} fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span>Chauffeur professionnel et expérimenté</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <svg className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: 'var(--gold-champagne)' }} fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span>Véhicule premium et climatisé</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <svg className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: 'var(--gold-champagne)' }} fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span>Ponctualité garantie</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <svg className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: 'var(--gold-champagne)' }} fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span>Tarifs transparents sans surprise</span>
                  </li>
                </ul>
              </div>
            </motion.div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default function ReserverPage() {
  const recaptchaSiteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;

  if (!recaptchaSiteKey) {
    console.error('NEXT_PUBLIC_RECAPTCHA_SITE_KEY manquant');
    return <div>Erreur de configuration reCAPTCHA</div>;
  }

  return (
    <GoogleReCaptchaProvider reCaptchaKey={recaptchaSiteKey}>
      <Suspense fallback={<div>Chargement...</div>}>
        <ReservationContent />
      </Suspense>
    </GoogleReCaptchaProvider>
  );
}
