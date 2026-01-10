/**
 * Format Utils - Utilitaires de formatage
 * 
 * Fonctions réutilisables pour formater prix, dates, téléphones...
 */

/**
 * Formate un prix en euros
 * @param price - Prix à formater (nombre)
 * @returns Prix formaté avec symbole €
 * @example formatPrice(45) // "45€"
 * @example formatPrice(120.50) // "120.50€"
 */
export function formatPrice(price: number): string {
  return `${price}€`;
}

/**
 * Formate une date en français
 * @param date - Date à formater (Date ou string ISO)
 * @returns Date formatée en français (ex: "10 janvier 2026")
 * @example formatDate(new Date('2026-01-10')) // "10 janvier 2026"
 */
export function formatDate(date: Date | string): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  
  return new Intl.DateTimeFormat('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  }).format(dateObj);
}

/**
 * Formate une date avec l'heure
 * @param date - Date à formater
 * @returns Date et heure formatées (ex: "10 janvier 2026 à 14h30")
 */
export function formatDateTime(date: Date | string): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  
  return new Intl.DateTimeFormat('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }).format(dateObj);
}

/**
 * Formate un numéro de téléphone français
 * @param phone - Numéro brut (avec ou sans espaces)
 * @returns Numéro formaté (ex: "+33 6 12 34 56 78")
 * @example formatPhone("+33612345678") // "+33 6 12 34 56 78"
 * @example formatPhone("0612345678") // "+33 6 12 34 56 78"
 */
export function formatPhone(phone: string): string {
  // Supprimer tous les caractères non-numériques et le +
  const cleaned = phone.replace(/[^\d+]/g, '');
  
  // Convertir 06... en +336...
  if (cleaned.startsWith('0')) {
    const withoutZero = cleaned.substring(1);
    return `+33 ${withoutZero.match(/.{1,2}/g)?.join(' ') || withoutZero}`;
  }
  
  // Si déjà au format +33...
  if (cleaned.startsWith('+33')) {
    const digits = cleaned.substring(3);
    return `+33 ${digits.match(/.{1,2}/g)?.join(' ') || digits}`;
  }
  
  // Sinon retourner tel quel
  return phone;
}

/**
 * Formate une durée en minutes vers un format lisible
 * @param minutes - Durée en minutes
 * @returns Durée formatée (ex: "1h30", "45min")
 * @example formatDuration(90) // "1h30"
 * @example formatDuration(45) // "45min"
 */
export function formatDuration(minutes: number): string {
  if (minutes < 60) {
    return `${minutes}min`;
  }
  
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  
  if (remainingMinutes === 0) {
    return `${hours}h`;
  }
  
  return `${hours}h${remainingMinutes.toString().padStart(2, '0')}`;
}

/**
 * Formate une distance en km
 * @param distance - Distance en km
 * @returns Distance formatée (ex: "12 km", "125 km")
 */
export function formatDistance(distance: number): string {
  return `${Math.round(distance)} km`;
}
