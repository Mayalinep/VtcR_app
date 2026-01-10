'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * FAQ - Composant Questions Fréquentes
 * 
 * Affiche une liste de questions/réponses avec effet accordion.
 * Chaque question peut être expand/collapse individuellement.
 * 
 * @example
 * <FAQ />
 */

interface FAQItem {
  id: number;
  question: string;
  answer: string;
}

const faqData: FAQItem[] = [
  {
    id: 1,
    question: "Comment réserver une course ?",
    answer: "La réservation est simple et rapide : indiquez votre point de départ et destination, choisissez votre date et heure, puis confirmez votre réservation. Vous recevrez une confirmation immédiate par email."
  },
  {
    id: 2,
    question: "Quels sont les moyens de paiement acceptés ?",
    answer: "Nous acceptons les cartes bancaires (Visa, Mastercard, American Express), Apple Pay, Google Pay, ainsi que le paiement en espèces ou par carte à bord du véhicule. Le paiement en ligne est sécurisé via Stripe."
  },
  {
    id: 3,
    question: "Puis-je modifier ou annuler ma réservation ?",
    answer: "Oui, vous pouvez modifier votre réservation gratuitement jusqu'à 4h avant l'heure prévue. L'annulation est gratuite jusqu'à 12h avant, au-delà des frais d'annulation de 20% s'appliquent."
  },
  {
    id: 4,
    question: "Proposez-vous des sièges enfants ?",
    answer: "Oui, nous disposons de sièges enfants homologués (siège bébé, rehausseur). Pensez à le mentionner lors de votre réservation. Un supplément de 10€ s'applique par trajet."
  },
  {
    id: 5,
    question: "Quelles zones desservez-vous ?",
    answer: "Nous couvrons l'ensemble de l'Île-de-France : Paris intra-muros, petite et grande couronne, aéroports CDG et Orly, gares principales, et toutes les villes d'Île-de-France. Pour les destinations hors Île-de-France, contactez-nous."
  },
  {
    id: 6,
    question: "Êtes-vous disponible 24h/24 et 7j/7 ?",
    answer: "Oui, notre service de réservation en ligne est accessible 24h/24. Les courses peuvent être effectuées à toute heure, y compris la nuit et les weekends. Pour les réservations de dernière minute, il est préférable de nous contacter par téléphone."
  },
  {
    id: 7,
    question: "Suivez-vous les vols pour les transferts aéroport ?",
    answer: "Absolument ! Nous suivons votre vol en temps réel pour les transferts aéroport. En cas de retard ou d'avance, nous ajustons automatiquement l'heure de prise en charge sans frais supplémentaires."
  },
  {
    id: 8,
    question: "Quel type de véhicule utilisez-vous ?",
    answer: "Nous utilisons des véhicules premium récents (Mercedes Classe E ou équivalent), climatisés, spacieux et parfaitement entretenus. Confort et propreté garantis pour tous vos déplacements."
  },
  {
    id: 9,
    question: "Puis-je demander un arrêt en cours de route ?",
    answer: "Oui, vous pouvez demander un ou plusieurs arrêts lors de votre réservation. Un temps d'attente de 15 minutes est inclus gratuitement. Au-delà, un supplément de 15€ par tranche de 15 minutes s'applique."
  },
  {
    id: 10,
    question: "Comment obtenir une facture ?",
    answer: "Une facture détaillée est générée automatiquement après chaque course et envoyée par email. Vous pouvez également télécharger vos factures depuis votre espace client à tout moment."
  }
];

export default function FAQ() {
  const [openId, setOpenId] = useState<number | null>(null);

  const toggleQuestion = (id: number) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <div className="space-y-4">
      {faqData.map((item) => (
        <motion.div
          key={item.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: item.id * 0.05 }}
          className="border border-gray-200 rounded-xl overflow-hidden bg-white hover:shadow-md transition-shadow duration-300"
        >
          {/* Question - Cliquable */}
          <button
            onClick={() => toggleQuestion(item.id)}
            className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-gray-50 transition-colors duration-200"
            aria-expanded={openId === item.id}
          >
            <span className="font-semibold text-gray-900 pr-4">
              {item.question}
            </span>
            
            <motion.div
              animate={{ rotate: openId === item.id ? 180 : 0 }}
              transition={{ duration: 0.3 }}
              className="flex-shrink-0"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                style={{ color: 'var(--forest-green)' }}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2.5}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </motion.div>
          </button>

          {/* Réponse - Expandable */}
          <AnimatePresence>
            {openId === item.id && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="px-6 pb-5 text-gray-600 leading-relaxed">
                  {item.answer}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      ))}
    </div>
  );
}
