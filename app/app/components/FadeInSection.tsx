'use client';

import { motion, useInView } from 'framer-motion';
import { ReactNode, useRef, useEffect, useState } from 'react';

interface FadeInSectionProps {
  children: ReactNode;
  delay?: number;
  className?: string;
}

/**
 * FadeInSection - Animation de fade-in déclenchée par le scroll
 * 
 * Utilisé pour les sections après le Hero. L'animation se déclenche uniquement
 * lorsque l'utilisateur a scrollé et que l'élément entre dans le viewport.
 * L'animation peut se répéter à chaque scroll (once: false).
 * 
 * @param {ReactNode} children - Contenu à animer
 * @param {number} delay - Délai avant le démarrage de l'animation (en secondes)
 * @param {string} className - Classes CSS additionnelles
 * 
 * @example
 * <FadeInSection delay={0.2}>
 *   <section>Contenu de la section</section>
 * </FadeInSection>
 */
export default function FadeInSection({ children, delay = 0, className = '' }: FadeInSectionProps) {
  const ref = useRef(null);
  const [hasScrolled, setHasScrolled] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setHasScrolled(true);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  const isInView = useInView(ref, { 
    once: false, // Se rejoue à chaque scroll !
    amount: 0.3
  });
  
  // Ne s'anime QUE si on a scrollé OU si c'est vraiment visible
  const shouldAnimate = hasScrolled && isInView;
  
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={shouldAnimate ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ 
        duration: 1.2,
        delay,
        opacity: { duration: 1.4, ease: [0.16, 1, 0.3, 1] },
        y: { duration: 1.2, ease: [0.16, 1, 0.3, 1] }
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
