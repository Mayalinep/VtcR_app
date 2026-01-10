'use client';

import { motion, useInView } from 'framer-motion';
import { ReactNode, useRef } from 'react';

interface FadeInSectionProps {
  children: ReactNode;
  delay?: number;
  className?: string;
  style?: React.CSSProperties;
}

/**
 * FadeInSection - Animation de fade-in déclenchée par le scroll
 * 
 * L'animation se déclenche à chaque fois que l'élément entre dans le viewport,
 * que ce soit en descendant ou en remontant la page (once: false).
 * 
 * @param {ReactNode} children - Contenu à animer
 * @param {number} delay - Délai avant le démarrage de l'animation (en secondes)
 * @param {string} className - Classes CSS additionnelles
 * @param {React.CSSProperties} style - Styles inline optionnels
 * 
 * @example
 * <FadeInSection delay={0.2}>
 *   <section>Contenu de la section</section>
 * </FadeInSection>
 */
export default function FadeInSection({ children, delay = 0, className = '', style }: FadeInSectionProps) {
  const ref = useRef(null);
  
  const isInView = useInView(ref, { 
    once: false, // Se rejoue à chaque scroll !
    amount: 0.25 // 25% de l'élément doit être visible pour déclencher
  });
  
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ 
        duration: 1.2,
        delay,
        opacity: { duration: 1.4, ease: [0.16, 1, 0.3, 1] },
        y: { duration: 1.2, ease: [0.16, 1, 0.3, 1] }
      }}
      className={className}
      style={style}
    >
      {children}
    </motion.div>
  );
}
