'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TESTIMONIALS_DATA } from '../lib/data/testimonials';

/**
 * Testimonials - Carrousel de témoignages clients
 * 
 * Affiche les avis clients sous forme de carrousel avec navigation.
 * Swipeable sur mobile, cliquable sur desktop.
 * 
 * @example
 * <Testimonials />
 */

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0
    })
  };

  const swipeConfidenceThreshold = 10000;
  const swipePower = (offset: number, velocity: number) => {
    return Math.abs(offset) * velocity;
  };

  const paginate = (newDirection: number) => {
    setDirection(newDirection);
    setCurrentIndex((prevIndex) => {
      let nextIndex = prevIndex + newDirection;
      if (nextIndex < 0) nextIndex = TESTIMONIALS_DATA.length - 1;
      if (nextIndex >= TESTIMONIALS_DATA.length) nextIndex = 0;
      return nextIndex;
    });
  };

  return (
    <div className="relative px-4 sm:px-6 overflow-hidden">
      <div className="max-w-4xl mx-auto">
        {/* Carrousel */}
        <div className="relative h-[320px] sm:h-[280px] flex items-center">
          <AnimatePresence initial={false} custom={direction}>
            <motion.div
              key={currentIndex}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.2 }
              }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={1}
              onDragEnd={(e, { offset, velocity }) => {
                const swipe = swipePower(offset.x, velocity.x);

                if (swipe < -swipeConfidenceThreshold) {
                  paginate(1);
                } else if (swipe > swipeConfidenceThreshold) {
                  paginate(-1);
                }
              }}
              className="absolute w-full"
            >
              <div 
                className="bg-white rounded-2xl p-8 sm:p-10 border border-gray-100 shadow-lg cursor-grab active:cursor-grabbing"
              >
                {/* Étoiles */}
                <div className="flex gap-1 mb-4">
                  {[...Array(TESTIMONIALS_DATA[currentIndex].rating)].map((_, i) => (
                    <svg
                      key={i}
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      style={{ color: 'var(--gold-champagne)' }}
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>

                {/* Texte */}
                <p className="text-gray-700 text-base sm:text-lg leading-relaxed mb-6 italic">
                  &ldquo;{TESTIMONIALS_DATA[currentIndex].text}&rdquo;
                </p>

                {/* Auteur */}
                <div className="flex items-center gap-4">
                  <div 
                    className="w-12 h-12 rounded-full flex items-center justify-center text-white font-semibold"
                    style={{ backgroundColor: 'var(--forest-green)' }}
                  >
                    {TESTIMONIALS_DATA[currentIndex].avatar}
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">
                      {TESTIMONIALS_DATA[currentIndex].name}
                    </div>
                    <div className="text-sm text-gray-500">
                      {TESTIMONIALS_DATA[currentIndex].location}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-center gap-6 mt-6">
          {/* Bouton Précédent */}
          <button
            onClick={() => paginate(-1)}
            className="w-10 h-10 rounded-full border-2 flex items-center justify-center transition-all hover:scale-110 active:scale-95"
            style={{ 
              borderColor: 'var(--forest-green)',
              color: 'var(--forest-green)'
            }}
            aria-label="Témoignage précédent"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          {/* Dots */}
          <div className="flex gap-2">
            {TESTIMONIALS_DATA.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setDirection(index > currentIndex ? 1 : -1);
                  setCurrentIndex(index);
                }}
                className="w-2 h-2 rounded-full transition-all"
                style={{
                  backgroundColor: index === currentIndex ? 'var(--forest-green)' : '#D1D5DB',
                  width: index === currentIndex ? '24px' : '8px'
                }}
                aria-label={`Aller au témoignage ${index + 1}`}
              />
            ))}
          </div>

          {/* Bouton Suivant */}
          <button
            onClick={() => paginate(1)}
            className="w-10 h-10 rounded-full border-2 flex items-center justify-center transition-all hover:scale-110 active:scale-95"
            style={{ 
              borderColor: 'var(--forest-green)',
              color: 'var(--forest-green)'
            }}
            aria-label="Témoignage suivant"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
