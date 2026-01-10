'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface FadeInProps {
  children: ReactNode;
  delay?: number;
  className?: string;
}

/**
 * FadeIn - Animation de fade-in immédiate au chargement de la page
 * 
 * Utilisé pour les éléments du Hero qui doivent s'animer dès l'arrivée sur la page.
 * L'animation démarre automatiquement avec un délai optionnel.
 * 
 * @param {ReactNode} children - Contenu à animer
 * @param {number} delay - Délai avant le démarrage de l'animation (en secondes)
 * @param {string} className - Classes CSS additionnelles
 * 
 * @example
 * <FadeIn delay={0.4}>
 *   <h1>Titre du Hero</h1>
 * </FadeIn>
 */
export default function FadeIn({ children, delay = 0, className = '' }: FadeInProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: 1.4,
        delay,
        opacity: { duration: 1.6, ease: [0.16, 1, 0.3, 1] }, // Opacité encore plus lente
        y: { duration: 1.4, ease: [0.16, 1, 0.3, 1] }
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
