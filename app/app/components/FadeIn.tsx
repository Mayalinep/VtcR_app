'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface FadeInProps {
  children: ReactNode;
  delay?: number;
  className?: string;
}

// Animation immédiate au chargement (pour Hero)
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
