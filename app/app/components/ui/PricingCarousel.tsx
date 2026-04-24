'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface PricingCarouselProps {
  children: React.ReactNode[];
  autoplayDelay?: number; // en millisecondes
  className?: string;
}

/**
 * PricingCarousel - Carousel automatique pour cartes de tarifs
 * 
 * Mobile: Carousel avec autoplay + swipe
 * Desktop: Grid classique (3 colonnes)
 * 
 * Features:
 * - Autoplay avec pause au hover/touch
 * - Swipe/drag navigation
 * - Dots de navigation
 * - Responsive
 */
export default function PricingCarousel({ 
  children, 
  autoplayDelay = 3000,
  className = ''
}: PricingCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [direction, setDirection] = useState(0);

  const slidesCount = children.length;

  // Navigation
  const goToSlide = useCallback((index: number) => {
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
  }, [currentIndex]);

  const nextSlide = useCallback(() => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % slidesCount);
  }, [slidesCount]);

  // Autoplay
  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      nextSlide();
    }, autoplayDelay);

    return () => clearInterval(interval);
  }, [currentIndex, isPaused, autoplayDelay, nextSlide]);

  // Variants pour animations
  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? '100%' : '-100%',
      opacity: 0
    }),
    center: {
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      x: direction > 0 ? '-100%' : '100%',
      opacity: 0
    })
  };

  return (
    <>
      {/* MOBILE: Carousel */}
      <div className={`md:hidden ${className}`}>
        <div 
          className="relative overflow-x-hidden overflow-y-visible px-4 pt-6"
          onTouchStart={() => setIsPaused(true)}
          onTouchEnd={() => setIsPaused(false)}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <AnimatePresence initial={false} custom={direction} mode="wait">
            <motion.div
              key={currentIndex}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.3 }
              }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.2}
              onDragEnd={(e, { offset, velocity }) => {
                const swipe = Math.abs(offset.x) * velocity.x;
                if (swipe < -500) {
                  nextSlide();
                } else if (swipe > 500 && currentIndex > 0) {
                  goToSlide(currentIndex - 1);
                }
              }}
              className="w-full"
            >
              {children[currentIndex]}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Dots Navigation */}
        <div className="flex justify-center gap-2 mt-6">
          {Array.from({ length: slidesCount }).map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`h-2 rounded-full transition-all duration-300 ${
                index === currentIndex 
                  ? 'w-8 bg-[#0F4C3A]' 
                  : 'w-2 bg-gray-300'
              }`}
              aria-label={`Aller à la carte ${index + 1}`}
            />
          ))}
        </div>

        {/* Indicateur autoplay */}
        <div className="text-center mt-4">
          <button
            onClick={() => setIsPaused(!isPaused)}
            className="text-xs text-gray-500 hover:text-gray-700 transition-colors"
          >
            {isPaused ? '▶ Reprendre' : '⏸ Pause'}
          </button>
        </div>
      </div>

      {/* DESKTOP: Grid classique */}
      <div className={`hidden md:grid md:grid-cols-3 gap-8 ${className}`}>
        {children}
      </div>
    </>
  );
}
