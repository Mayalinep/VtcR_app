'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface PulseCTAProps {
  children: ReactNode;
  className?: string;
  style?: React.CSSProperties;
  onClick?: () => void;
}

/**
 * PulseCTA - Bouton Call-to-Action avec animation pulse subtile
 * 
 * Bouton animé avec effet de "respiration" (pulse sur l'ombre) pour attirer
 * l'attention sans être agressif. Inclut des animations hover et tap.
 * 
 * @param {ReactNode} children - Texte ou contenu du bouton
 * @param {string} className - Classes Tailwind pour le styling
 * @param {React.CSSProperties} style - Styles inline (couleur de fond, etc.)
 * @param {Function} onClick - Fonction appelée au clic
 * 
 * @example
 * <PulseCTA
 *   className="px-10 py-4 rounded-lg font-semibold text-white"
 *   style={{ backgroundColor: 'var(--forest-green)' }}
 * >
 *   Réserver maintenant
 * </PulseCTA>
 */
export default function PulseCTA({ children, className = '', style, onClick }: PulseCTAProps) {
  return (
    <motion.button
      className={className}
      style={style}
      onClick={onClick}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      animate={{
        boxShadow: [
          '0 10px 15px -3px rgba(15, 76, 58, 0.3)',
          '0 10px 15px -3px rgba(15, 76, 58, 0.5)',
          '0 10px 15px -3px rgba(15, 76, 58, 0.3)'
        ]
      }}
      transition={{
        boxShadow: {
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        },
        scale: {
          duration: 0.2
        }
      }}
    >
      {children}
    </motion.button>
  );
}
