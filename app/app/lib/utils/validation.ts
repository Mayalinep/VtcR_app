/**
 * Validation Utils - Utilitaires de validation
 * 
 * Fonctions réutilisables pour valider emails, téléphones, champs requis...
 */

/**
 * Valide une adresse email
 * @param email - Email à valider
 * @returns true si l'email est valide, false sinon
 * @example validateEmail("test@example.com") // true
 * @example validateEmail("invalid-email") // false
 */
export function validateEmail(email: string): boolean {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

/**
 * Valide un numéro de téléphone français
 * Accepte les formats: 0612345678, +33612345678, 06 12 34 56 78
 * @param phone - Téléphone à valider
 * @returns true si le téléphone est valide, false sinon
 * @example validatePhone("0612345678") // true
 * @example validatePhone("+33612345678") // true
 * @example validatePhone("06 12 34 56 78") // true
 */
export function validatePhone(phone: string): boolean {
  // Supprimer tous les espaces et caractères non-numériques sauf +
  const cleaned = phone.replace(/[\s\-\.]/g, '');
  
  // Format français: 06/07 suivi de 8 chiffres
  const frenchFormat = /^0[6-7]\d{8}$/;
  
  // Format international: +336/7 suivi de 8 chiffres
  const internationalFormat = /^\+33[6-7]\d{8}$/;
  
  return frenchFormat.test(cleaned) || internationalFormat.test(cleaned);
}

/**
 * Valide qu'un champ n'est pas vide
 * @param value - Valeur à valider
 * @returns true si le champ contient du texte, false sinon
 * @example validateRequired("Hello") // true
 * @example validateRequired("   ") // false
 * @example validateRequired("") // false
 */
export function validateRequired(value: string): boolean {
  return value.trim().length > 0;
}

/**
 * Valide une longueur minimale
 * @param value - Valeur à valider
 * @param minLength - Longueur minimale requise
 * @returns true si la valeur a au moins minLength caractères
 * @example validateMinLength("Hello", 3) // true
 * @example validateMinLength("Hi", 3) // false
 */
export function validateMinLength(value: string, minLength: number): boolean {
  return value.trim().length >= minLength;
}

/**
 * Valide une longueur maximale
 * @param value - Valeur à valider
 * @param maxLength - Longueur maximale autorisée
 * @returns true si la valeur a au plus maxLength caractères
 */
export function validateMaxLength(value: string, maxLength: number): boolean {
  return value.trim().length <= maxLength;
}

/**
 * Valide un code postal français
 * @param postalCode - Code postal à valider
 * @returns true si le code postal est valide (5 chiffres)
 * @example validatePostalCode("75001") // true
 * @example validatePostalCode("1234") // false
 */
export function validatePostalCode(postalCode: string): boolean {
  const regex = /^[0-9]{5}$/;
  return regex.test(postalCode.trim());
}

/**
 * Valide une URL
 * @param url - URL à valider
 * @returns true si l'URL est valide
 * @example validateUrl("https://example.com") // true
 * @example validateUrl("not-a-url") // false
 */
export function validateUrl(url: string): boolean {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}
