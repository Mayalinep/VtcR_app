/**
 * Utils Entry Point - Point d'entrée pour ShadCN UI
 * 
 * Ce fichier réexporte la fonction cn() depuis app/app/lib/utils/cn.ts
 * pour maintenir la compatibilité avec ShadCN UI qui s'attend à @/lib/utils
 * 
 * NOTE: La source de vérité est dans app/app/lib/utils/
 * Tous les utilitaires sont centralisés dans app/app/lib/utils/index.ts
 * 
 * @see app/app/lib/utils/index.ts pour tous les utilitaires disponibles
 */
export { cn } from '@/app/lib/utils/cn';
