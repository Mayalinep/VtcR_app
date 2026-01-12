'use client';

import { motion } from 'framer-motion';

/**
 * HeroScrollIndicator - Flèche animée pour Hero avec image
 * 
 * Version blanche pour contraste optimal sur fond sombre.
 * Cliquable pour scroller automatiquement vers la section suivante.
 */
export default function HeroScrollIndicator() {
  const handleClick = () => {
    window.scrollTo({ top: window.innerHeight, behavior: 'smooth' });
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1, delay: 1.1 }}
      className="absolute bottom-2 sm:bottom-3 left-1/2 -translate-x-1/2"
    >
      <motion.div
        animate={{ y: [0, 6, 0] }}
        transition={{ 
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="flex flex-col items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity"
        onClick={handleClick}
      >
        <span className="text-xs sm:text-sm text-white/70 font-medium">
          Découvrez nos services
        </span>
        <svg 
          className="w-5 h-5 sm:w-6 sm:h-6 text-white/70" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M19 14l-7 7m0 0l-7-7m7 7V3" 
          />
        </svg>
      </motion.div>
    </motion.div>
  );
}
