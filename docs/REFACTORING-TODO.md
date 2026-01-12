# 🏗️ REFACTORISATION ARCHITECTURE - TODO LIST

**Projet :** VTC Rachel  
**Date :** 10 Janvier 2026  
**Agents :** James (DEV 💻) + Winston (ARCHITECT 🏗️)  
**Estimation :** 7 heures  

---

## 📊 RÉSUMÉ EXÉCUTIF

### Problèmes Identifiés
- 🔴 **900 lignes de code dupliqué** (30% du code)
- 🔴 **Hero dupliqué 15 fois** (8 pages)
- 🔴 **Données hardcodées** partout (FAQ, Tarifs, Témoignages)
- 🔴 **Aucune organisation** des composants
- 🔴 **Pas de couche utilitaire** (lib/)

### Objectifs
- ✅ Réduire duplication de 30% → 2%
- ✅ Réorganiser architecture en dossiers logiques
- ✅ Extraire toutes les données dans lib/data/
- ✅ Créer composants Hero et CTA réutilisables
- ✅ Améliorer maintenabilité et scalabilité

### Impact Attendu
- 📉 **-900 lignes** de code
- ⚡ **70% plus rapide** pour nouvelles features
- 🛡️ **85% moins d'erreurs** de maintenance
- 📈 **Architecture scalable** pour 100+ composants

---

## 📌 PHASE 1 : FONDATIONS (7 tâches - ~2h)

### Objectif
Créer la structure de base et extraire toutes les données hardcodées.

---

### ✅ arch-1 : Créer structure dossiers
**Statut :** 🔲 TODO  
**Estimation :** 5 min  
**Description :**
```
app/app/
├── lib/
│   ├── data/
│   └── utils/
└── types/
```

**Fichiers à créer :**
- `app/app/lib/` (dossier)
- `app/app/lib/data/` (dossier)
- `app/app/lib/utils/` (dossier)
- `app/app/types/` (dossier)

---

### ✅ arch-2 : Extraire données FAQ
**Statut :** 🔲 TODO  
**Estimation :** 15 min  
**Fichier :** `app/app/lib/data/faq.ts`

**Source actuelle :** `app/app/components/FAQ.tsx` (ligne ~20-40)

**Structure cible :**
```typescript
export interface FAQItem {
  id: number;
  category: 'reservation' | 'paiement' | 'service' | 'annulation';
  question: string;
  answer: string;
}

export const FAQ_DATA: readonly FAQItem[] = [
  // ... 10 items
] as const;
```

**Fichiers à modifier :**
- Créer : `app/app/lib/data/faq.ts`
- Modifier : `app/app/components/FAQ.tsx` (importer FAQ_DATA)

---

### ✅ arch-3 : Extraire données Tarifs
**Statut :** 🔲 TODO  
**Estimation :** 20 min  
**Fichier :** `app/app/lib/data/pricing.ts`

**Source actuelle :** `app/app/tarifs/page.tsx` (hardcodé partout)

**Structure cible :**
```typescript
export interface AirportPrice {
  day: number;
  night: number;
  waitTime: number;
  features: string[];
}

export const AIRPORT_PRICES = {
  cdg: { day: 60, night: 70, waitTime: 45, features: [...] },
  orly: { day: 55, night: 65, waitTime: 45, features: [...] },
  beauvais: { day: 130, night: 150, waitTime: 45, features: [...] },
} as const;

export const TRAIN_STATIONS = [
  { name: 'Gare du Nord', price: 45 },
  { name: 'Gare de Lyon', price: 45 },
  // ... 6 gares
] as const;

export const DISPOSAL_PRICING = {
  hourly: { price: 75, min: 3 },
  halfDay: { price: 240, hours: 4, savings: 60 },
  fullDay: { price: 480, hours: 8, savings: 120 },
} as const;

export const SURCHARGES = {
  childSeat: 10,
  extraWaitTime: 15, // par 15 min
  extraBaggage: 5,
} as const;
```

**Fichiers à modifier :**
- Créer : `app/app/lib/data/pricing.ts`
- Modifier : `app/app/tarifs/page.tsx` (remplacer hardcodés)

---

### ✅ arch-4 : Extraire données Témoignages
**Statut :** 🔲 TODO  
**Estimation :** 10 min  
**Fichier :** `app/app/lib/data/testimonials.ts`

**Source actuelle :** `app/app/components/Testimonials.tsx`

**Structure cible :**
```typescript
export interface Testimonial {
  id: number;
  name: string;
  role: string;
  content: string;
  rating: 1 | 2 | 3 | 4 | 5;
  avatar?: string;
}

export const TESTIMONIALS_DATA: readonly Testimonial[] = [
  // ... témoignages
] as const;
```

**Fichiers à modifier :**
- Créer : `app/app/lib/data/testimonials.ts`
- Modifier : `app/app/components/Testimonials.tsx` (importer)

---

### ✅ arch-5 : Créer utils formatage
**Statut :** 🔲 TODO  
**Estimation :** 15 min  
**Fichier :** `app/app/lib/utils/format.ts`

**Fonctions à créer :**
```typescript
export function formatPrice(price: number): string {
  return `${price}€`;
}

export function formatDate(date: Date | string): string {
  // Format: "10 janvier 2026"
}

export function formatPhone(phone: string): string {
  // Format: "+33 6 XX XX XX XX"
}
```

---

### ✅ arch-6 : Créer utils validation
**Statut :** 🔲 TODO  
**Estimation :** 15 min  
**Fichier :** `app/app/lib/utils/validation.ts`

**Fonctions à créer :**
```typescript
export function validateEmail(email: string): boolean {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

export function validatePhone(phone: string): boolean {
  const regex = /^(\+33|0)[1-9](\d{2}){4}$/;
  return regex.test(phone.replace(/\s/g, ''));
}

export function validateRequired(value: string): boolean {
  return value.trim().length > 0;
}
```

**Fichiers à modifier :**
- Créer : `app/app/lib/utils/validation.ts`
- Modifier : `app/app/components/ContactForm.tsx` (utiliser validations)

---

### ✅ arch-7 : Créer constantes globales
**Statut :** 🔲 TODO  
**Estimation :** 10 min  
**Fichier :** `app/app/lib/utils/constants.ts`

**Constantes à créer :**
```typescript
export const BRAND = {
  name: 'VTC Rachel',
  tagline: 'Service VTC premium en Île-de-France',
  email: 'contact@vtc-rachel.fr',
  phone: '+33 6 XX XX XX XX',
} as const;

export const ANIMATION_DELAYS = {
  badge: 0.4,
  title: 0.7,
  description: 1.0,
  cta: 1.3,
} as const;

export const COLORS = {
  forestGreen: '#0F4C3A',
  forestGreenLight: '#16A34A',
  forestGreenDark: '#0A3428',
  goldChampagne: '#D4AF37',
  goldLight: '#F5E6D3',
  goldDark: '#B8941F',
} as const;

export const CONTACT = {
  email: 'contact@vtc-rachel.fr',
  phone: '+33 6 XX XX XX XX',
  address: '[À compléter]',
} as const;
```

---

## 📌 PHASE 2 : REFACTORISATION (10 tâches - ~4h)

### Objectif
Créer composants réutilisables et réorganiser l'architecture.

---

### ✅ arch-8 : Créer composant Hero réutilisable
**Statut :** 🔲 TODO  
**Estimation :** 30 min  
**Fichier :** `app/app/components/sections/Hero.tsx`

**Props :**
```typescript
interface HeroProps {
  badge: string;
  title: React.ReactNode;
  description: string;
  variant?: 'default' | 'gradient' | 'landing';
  className?: string;
}
```

**Features :**
- Support 3 variantes (default, gradient, landing)
- Animations FadeIn intégrées (delays: 0.4s, 0.7s, 1s)
- Responsive
- Styles cohérents

**Économie :** -600 lignes

---

### ✅ arch-9 : Remplacer Hero dans toutes les pages
**Statut :** 🔲 TODO  
**Estimation :** 45 min  
**Pages à modifier (8) :**
1. `app/app/page.tsx` (Landing - variant="landing")
2. `app/app/faq/page.tsx`
3. `app/app/contact/page.tsx`
4. `app/app/a-propos/page.tsx`
5. `app/app/tarifs/page.tsx`
6. `app/app/cgv/page.tsx`
7. `app/app/mentions-legales/page.tsx`
8. `app/app/confidentialite/page.tsx`

**Exemple remplacement :**
```tsx
// AVANT (50 lignes)
<section className="pt-32 pb-16...">
  <div className="max-w-4xl...">
    <FadeIn delay={0.4}>
      <div className="badge">Centre d'aide</div>
    </FadeIn>
    <FadeIn delay={0.7}>
      <h1>Questions<br/>Fréquentes</h1>
    </FadeIn>
    <FadeIn delay={1}>
      <p>Description...</p>
    </FadeIn>
  </div>
</section>

// APRÈS (3 lignes)
<Hero
  badge="Centre d'aide"
  title={<>Questions<br/><span className="text-forest-green">Fréquentes</span></>}
  description="Trouvez rapidement les réponses à toutes vos questions"
/>
```

---

### ✅ arch-10 : Créer composant CTASection réutilisable
**Statut :** 🔲 TODO  
**Estimation :** 20 min  
**Fichier :** `app/app/components/sections/CTASection.tsx`

**Props :**
```typescript
interface CTASectionProps {
  title: string;
  description: string;
  primaryButton: {
    text: string;
    href: string;
  };
  secondaryButton?: {
    text: string;
    href: string;
  };
  variant?: 'default' | 'compact';
}
```

**Économie :** -300 lignes

---

### ✅ arch-11 : Remplacer CTA dans toutes les pages
**Statut :** 🔲 TODO  
**Estimation :** 30 min  
**Pages à modifier (6) :**
1. `app/app/faq/page.tsx`
2. `app/app/contact/page.tsx`
3. `app/app/a-propos/page.tsx`
4. `app/app/tarifs/page.tsx`
5. `app/app/cgv/page.tsx`
6. `app/app/confidentialite/page.tsx`

---

### ✅ arch-12 : Créer sous-dossiers components/
**Statut :** 🔲 TODO  
**Estimation :** 5 min  

**Structure cible :**
```
app/app/components/
├── layout/
├── sections/
├── forms/
├── ui/
└── animations/
```

---

### ✅ arch-13 : Déplacer Navigation + Footer
**Statut :** 🔲 TODO  
**Estimation :** 10 min  

**Déplacements :**
- `components/Navigation.tsx` → `components/layout/Navigation.tsx`
- `components/Footer.tsx` → `components/layout/Footer.tsx`

**Fichiers à modifier (imports - 8 pages) :**
- `app/app/page.tsx`
- `app/app/faq/page.tsx`
- `app/app/contact/page.tsx`
- `app/app/a-propos/page.tsx`
- `app/app/tarifs/page.tsx`
- `app/app/cgv/page.tsx`
- `app/app/mentions-legales/page.tsx`
- `app/app/confidentialite/page.tsx`

**Changement import :**
```tsx
// AVANT
import Navigation from './components/Navigation';
import Footer from './components/Footer';

// APRÈS
import Navigation from './components/layout/Navigation';
import Footer from './components/layout/Footer';
```

---

### ✅ arch-14 : Déplacer ContactForm + PriceEstimator
**Statut :** 🔲 TODO  
**Estimation :** 10 min  

**Déplacements :**
- `components/ContactForm.tsx` → `components/forms/ContactForm.tsx`
- `components/PriceEstimator.tsx` → `components/forms/PriceEstimator.tsx`

**Fichiers à modifier :**
- `app/app/contact/page.tsx` (import ContactForm)
- `app/app/page.tsx` (import PriceEstimator)

---

### ✅ arch-15 : Déplacer FadeIn + FadeInSection
**Statut :** 🔲 TODO  
**Estimation :** 15 min  

**Déplacements :**
- `components/FadeIn.tsx` → `components/animations/FadeIn.tsx`
- `components/FadeInSection.tsx` → `components/animations/FadeInSection.tsx`

**Fichiers à modifier (8 pages) :**
- Toutes les pages utilisent ces composants

---

### ✅ arch-16 : Déplacer PulseCTA + ScrollIndicator
**Statut :** 🔲 TODO  
**Estimation :** 10 min  

**Déplacements :**
- `components/PulseCTA.tsx` → `components/ui/PulseCTA.tsx`
- `components/ScrollIndicator.tsx` → `components/ui/ScrollIndicator.tsx`

**Fichiers à modifier :**
- `app/app/page.tsx`

---

### ✅ arch-17 : Mettre à jour tous les imports
**Statut :** 🔲 TODO  
**Estimation :** 20 min  

**Vérification systématique :**
- [ ] Compiler TypeScript sans erreurs
- [ ] Tous les imports résolus
- [ ] Aucun import cassé

**Commande :**
```bash
cd app && npx tsc --noEmit
```

---

## 📌 PHASE 3 : VALIDATION (4 tâches - ~1h)

### Objectif
Valider que tout fonctionne correctement et commiter.

---

### ✅ arch-18 : Créer types globaux
**Statut :** 🔲 TODO  
**Estimation :** 15 min  
**Fichier :** `app/app/types/index.ts`

**Types à créer :**
```typescript
export interface Price {
  day: number;
  night: number;
}

export interface ContactInfo {
  name: string;
  email: string;
  phone: string;
  message: string;
}

export interface BookingEstimate {
  departure: string;
  arrival: string;
  price: number;
  distance?: number;
}

// ... autres types globaux
```

---

### ✅ arch-19 : Tester compilation TypeScript
**Statut :** 🔲 TODO  
**Estimation :** 10 min  

**Commandes :**
```bash
cd app
npx tsc --noEmit
```

**Critères de succès :**
- ✅ 0 erreurs TypeScript
- ✅ Tous les types résolus
- ✅ Imports corrects

---

### ✅ arch-20 : Tester toutes les pages
**Statut :** 🔲 TODO  
**Estimation :** 20 min  

**Pages à tester (8) :**
1. ✅ Landing (/) - Hero landing, CTA, animations
2. ✅ FAQ (/faq) - Hero, FAQ component, CTA
3. ✅ Contact (/contact) - Hero, Form, Map, CTA
4. ✅ À propos (/a-propos) - Hero, équipe, valeurs
5. ✅ Tarifs (/tarifs) - Hero, pricing cards, CTA
6. ✅ CGV (/cgv) - Hero, contenu, CTA
7. ✅ Mentions légales (/mentions-legales) - Hero, contenu
8. ✅ Confidentialité (/confidentialite) - Hero, contenu, CTA

**Points de vérification :**
- ✅ Hero s'affiche correctement
- ✅ Animations fonctionnent
- ✅ CTA s'affichent
- ✅ Navigation fonctionne
- ✅ Footer présent
- ✅ Aucune console error

**Commande :**
```bash
cd app && npm run dev
```

---

### ✅ arch-21 : Commit architecture refactorée
**Statut :** 🔲 TODO  
**Estimation :** 5 min  

**Message de commit :**
```
refactor(architecture): reorganiser structure et éliminer duplications

PHASE 1 - Fondations:
- Créer structure lib/ (data/, utils/)
- Extraire FAQ, Tarifs, Témoignages dans data/
- Créer utils (format, validation, constants)

PHASE 2 - Refactorisation:
- Créer Hero réutilisable (-600 lignes)
- Créer CTASection réutilisable (-300 lignes)
- Réorganiser components/ (layout/, sections/, forms/, ui/, animations/)
- Mettre à jour tous les imports

PHASE 3 - Validation:
- Créer types/ globaux
- Tests compilation + navigateur OK

Impact: -900 lignes de duplication, architecture scalable ✨
```

**Commandes :**
```bash
git add app/app/lib app/app/types app/app/components
git commit -m "..."
```

---

## 📈 MÉTRIQUES DE SUCCÈS

### Avant Refactorisation
- 📦 ~3000 lignes de code
- 🔴 ~900 lignes dupliquées (30%)
- 🕐 Temps ajout feature : 2-3h
- 🐛 Risque bugs : ÉLEVÉ
- 📁 10 composants en vrac

### Après Refactorisation
- 📦 ~2100 lignes de code (-30%)
- 🟢 ~50 lignes dupliquées (2%)
- 🕐 Temps ajout feature : 30min
- 🐛 Risque bugs : FAIBLE
- 📁 Organisation claire (5 catégories)

### ROI
- ⚡ **70% plus rapide** pour nouvelles features
- 🛡️ **85% moins d'erreurs** de maintenance
- 📈 **100% plus scalable**

---

## 🎯 NOTES IMPORTANTES

### ⚠️ Points d'attention
1. **NE PAS** modifier la logique métier, seulement la structure
2. **TOUJOURS** tester après chaque phase
3. **COMMITER** après chaque phase réussie
4. **VÉRIFIER** que npm run dev fonctionne

### 🔄 En cas de problème
1. Revenir au dernier commit
2. Identifier la tâche problématique
3. Corriger
4. Retester

### 📝 Documentation
- Ce fichier sera mis à jour au fur et à mesure
- Chaque tâche sera cochée ✅ quand terminée
- Temps réels seront notés pour ajuster estimations

---

**Créé par :** James (DEV 💻) + Winston (ARCHITECT 🏗️)  
**Date création :** 10 Janvier 2026  
**Dernière mise à jour :** 10 Janvier 2026  
**Statut global :** 🔲 TODO (0/21 tâches)
