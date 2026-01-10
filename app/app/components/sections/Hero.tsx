import React from 'react';
import FadeIn from '../animations/FadeIn';

/**
 * Hero - Section héro réutilisable
 * 
 * Composant Hero générique utilisable sur toutes les pages.
 * Supporte 3 variantes : default, gradient, landing
 * 
 * @example
 * <Hero
 *   badge="Centre d'aide"
 *   title={<>Questions<br/><span className="text-forest-green">Fréquentes</span></>}
 *   description="Trouvez rapidement les réponses à toutes vos questions"
 * />
 * 
 * @example
 * <Hero
 *   variant="landing"
 *   badge="VTC Premium"
 *   title="Votre confort, notre priorité"
 *   description="Service VTC haut de gamme en Île-de-France"
 * />
 */

export interface HeroProps {
  /** Badge affiché au-dessus du titre */
  badge: string;
  
  /** Titre principal (peut contenir du JSX pour styling) */
  title: React.ReactNode;
  
  /** Description sous le titre */
  description: string;
  
  /** Variante visuelle */
  variant?: 'default' | 'gradient' | 'landing';
  
  /** Classes CSS additionnelles */
  className?: string;
}

export default function Hero({
  badge,
  title,
  description,
  variant = 'default',
  className = '',
}: HeroProps) {
  // Déterminer les classes de background selon la variante
  const backgroundClasses = {
    default: 'bg-gradient-to-b from-gray-50 to-white',
    gradient: 'bg-gradient-to-b from-gray-50 to-white',
    landing: 'bg-gradient-to-br from-white via-gray-50 to-white',
  }[variant];

  // Déterminer le padding selon la variante
  const paddingClasses = variant === 'landing' 
    ? 'pt-32 sm:pt-40 pb-20 sm:pb-28' 
    : 'pt-32 pb-16';

  return (
    <section className={`${paddingClasses} px-4 sm:px-6 ${backgroundClasses} ${className}`}>
      <div className="max-w-4xl mx-auto text-center">
        {/* Badge */}
        <FadeIn delay={0.4}>
          <div 
            className="inline-block px-4 py-1.5 rounded-full text-sm font-medium mb-6"
            style={{ 
              backgroundColor: 'var(--gold-light)',
              color: 'var(--forest-green)'
            }}
          >
            {badge}
          </div>
        </FadeIn>
        
        {/* Titre */}
        <FadeIn delay={0.7}>
          <h1 
            className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight" 
            style={{ fontFamily: 'var(--font-playfair)' }}
          >
            {title}
          </h1>
        </FadeIn>
        
        {/* Description */}
        <FadeIn delay={1}>
          <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            {description}
          </p>
        </FadeIn>
      </div>
    </section>
  );
}
