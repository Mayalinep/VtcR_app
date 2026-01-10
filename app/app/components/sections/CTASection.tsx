import React from 'react';

/**
 * CTASection - Section Call-to-Action réutilisable
 * 
 * Composant CTA générique pour inciter à l'action.
 * Supporte bouton primaire et optionnel secondaire.
 * 
 * @example
 * <CTASection
 *   title="Prêt à réserver votre course ?"
 *   description="Contactez-nous dès maintenant"
 *   primaryButton={{
 *     text: "Réserver maintenant",
 *     href: "/"
 *   }}
 *   secondaryButton={{
 *     text: "Nous contacter",
 *     href: "/contact"
 *   }}
 * />
 */

interface ButtonConfig {
  text: string;
  href: string;
}

export interface CTASectionProps {
  /** Titre principal du CTA */
  title: string;
  
  /** Description sous le titre */
  description: string;
  
  /** Bouton primaire (obligatoire) */
  primaryButton: ButtonConfig;
  
  /** Bouton secondaire (optionnel) */
  secondaryButton?: ButtonConfig;
  
  /** Variante visuelle */
  variant?: 'default' | 'compact';
  
  /** Classes CSS additionnelles */
  className?: string;
}

export default function CTASection({
  title,
  description,
  primaryButton,
  secondaryButton,
  variant = 'default',
  className = '',
}: CTASectionProps) {
  const paddingClasses = variant === 'compact' ? 'p-8 sm:p-10' : 'p-12';

  return (
    <section 
      className={`mx-4 sm:mx-6 mb-16 ${paddingClasses} rounded-2xl text-center ${className}`}
      style={{ backgroundColor: 'var(--forest-green)' }}
    >
      <div className="max-w-3xl mx-auto">
        <h2 
          className="text-3xl sm:text-4xl font-bold text-white mb-4" 
          style={{ fontFamily: 'var(--font-playfair)' }}
        >
          {title}
        </h2>
        <p className="text-lg text-white/80 mb-8">
          {description}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          {/* Bouton primaire */}
          <a
            href={primaryButton.href}
            className="inline-block px-8 py-4 rounded-lg font-semibold transition-all hover:scale-105 shadow-xl active:scale-95"
            style={{ 
              backgroundColor: 'var(--gold-champagne)',
              color: 'var(--forest-green)'
            }}
          >
            {primaryButton.text}
          </a>
          
          {/* Bouton secondaire (optionnel) */}
          {secondaryButton && (
            <a
              href={secondaryButton.href}
              className="inline-block px-8 py-4 rounded-lg font-semibold transition-all hover:scale-105 shadow-xl active:scale-95 bg-white"
              style={{ color: 'var(--forest-green)' }}
            >
              {secondaryButton.text}
            </a>
          )}
        </div>
      </div>
    </section>
  );
}
