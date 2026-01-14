import { z } from 'zod';

/**
 * Schema de validation pour le formulaire de contact
 * 
 * Utilise Zod pour validation type-safe côté client et serveur
 */
export const contactFormSchema = z.object({
  name: z
    .string()
    .min(2, 'Le nom doit contenir au moins 2 caractères')
    .max(100, 'Le nom ne peut pas dépasser 100 caractères')
    .trim(),
  
  email: z
    .string()
    .email('Adresse email invalide')
    .min(5, 'Email trop court')
    .max(255, 'Email trop long')
    .toLowerCase()
    .trim(),
  
  phone: z
    .string()
    .regex(
      /^(\+33|0)[6-7](\d{2}){4}$/,
      'Numéro de téléphone invalide. Format attendu: 06 12 34 56 78 ou +33 6 12 34 56 78'
    )
    .refine(
      (val) => {
        const cleaned = val.replace(/[\s\-\.]/g, '');
        return cleaned.length >= 10 && cleaned.length <= 13;
      },
      { message: 'Numéro de téléphone invalide' }
    ),
  
  subject: z
    .string()
    .min(1, 'Veuillez sélectionner un sujet')
    .refine(
      (val) => ['reservation', 'tarifs', 'service', 'partenariat', 'autre'].includes(val),
      { message: 'Sujet invalide' }
    ),
  
  message: z
    .string()
    .min(10, 'Le message doit contenir au moins 10 caractères')
    .max(1000, 'Le message ne peut pas dépasser 1000 caractères')
    .trim(),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;

/**
 * Valide les données du formulaire de contact
 * 
 * @param data - Données à valider
 * @returns Données validées ou erreurs
 */
export function validateContactForm(data: unknown) {
  return contactFormSchema.safeParse(data);
}
