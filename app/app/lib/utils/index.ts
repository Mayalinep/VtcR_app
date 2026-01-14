/**
 * Utils Index - Point d'entrée centralisé pour tous les utilitaires
 * 
 * Ce fichier exporte toutes les fonctions utilitaires du projet.
 * C'est la source unique de vérité pour les imports d'utilitaires.
 * 
 * @example
 * import { formatPrice, validateEmail, cn, BRAND } from '@/app/lib/utils';
 */

// Format utilities
export * from './format';

// Validation utilities
export * from './validation';

// Constants
export * from './constants';

// ShadCN UI utility (cn function)
export * from './cn';
