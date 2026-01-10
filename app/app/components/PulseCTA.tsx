'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface PulseCTAProps {
  children: ReactNode;
  className?: string;
  style?: React.CSSProperties;
  onClick?: () => void;
}

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
