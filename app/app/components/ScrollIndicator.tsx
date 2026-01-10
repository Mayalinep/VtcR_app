'use client';

import { motion } from 'framer-motion';

/**
 * ScrollIndicator - Flèche animée pour inciter au scroll
 * 
 * Affiche une flèche avec animation "bounce" en bas du Hero fullscreen.
 * Cliquable pour scroller automatiquement vers la section suivante.
 * 
 * @example
 * <ScrollIndicator />
 */
export default function ScrollIndicator() {
  const handleClick = () => {
    window.scrollTo({ top: window.innerHeight, behavior: 'smooth' });
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1, delay: 1.6 }}
      className="absolute bottom-8 left-1/2 -translate-x-1/2"
    >
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ 
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="flex flex-col items-center gap-2 cursor-pointer hover:opacity-70 transition-opacity"
        onClick={handleClick}
      >
        <span className="text-xs text-gray-400 font-medium">Découvrez nos services</span>
        <svg 
          className="w-5 h-5 text-gray-400" 
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
