# VTC Rachel - Front-End Specification

<!-- Powered by BMAD™ Core -->

---

## Table des Matières

1. [Design System](#design-system)
   - [Palette de Couleurs](#palette-de-couleurs)
   - [Typographie](#typographie)
   - [Spacing & Layout](#spacing--layout)
   - [Iconographie](#iconographie)
   - [Composants UI de Base](#composants-ui-de-base)
2. [Wireframes](#wireframes)
3. [Guidelines UX](#guidelines-ux)
4. [Accessibilité](#accessibilité)
5. [Responsive Design](#responsive-design)

---

## Design System

### Vue d'Ensemble

**Philosophie Design : "Luxe Aspirationnel Accessible"**

L'application VTC Rachel adopte une approche de design **minimaliste sophistiquée** qui communique professionnalisme, confiance et modernité. L'objectif est de créer une expérience qui impressionne visuellement tout en restant extrêmement simple d'utilisation.

**Principes Directeurs :**
- **Minimalisme sophistiqué** : Beaucoup d'espace blanc, hiérarchie visuelle claire
- **Animations subtiles** : Transitions fluides, micro-interactions délicates
- **Rapidité perçue** : Feedback immédiat, skeleton loaders, optimistic UI
- **Confiance** : Design professionnel, informations claires, transparence totale
- **Mobile-first** : Pensé d'abord pour mobile, ensuite adapté desktop

**Références d'Inspiration :**
- **Blacklane** : Élégance sobre, focus service
- **Air France** : Sophistication française
- **Apple** : Minimalisme, attention au détail
- **Vercel** : Design system moderne

---

### Palette de Couleurs

#### Couleurs Principales

```css
/* Primaires - Vert (Confiance, Sérénité) */
--forest-green: #0F4C3A;        /* Couleur principale, CTA primaires, headers */
--forest-green-light: #16A34A;   /* Hover states, accents */
--forest-green-dark: #0A3428;    /* Textes sur fonds verts */

/* Premium - Or (Luxe, Excellence) */
--gold-champagne: #D4AF37;       /* Accents luxe, badges, highlights */
--gold-light: #F5E6D3;           /* Backgrounds subtils, hover cards */
--gold-dark: #B8941F;            /* Borders, icons premium */
```

#### Couleurs Neutres

```css
/* Backgrounds & Surfaces */
--white: #FFFFFF;                /* Background principal */
--gray-50: #F8FAFC;              /* Background alterné */
--gray-100: #F1F5F9;             /* Background cards */
--gray-200: #E2E8F0;             /* Borders, dividers */

/* Textes */
--gray-600: #64748B;             /* Texte secondaire */
--gray-700: #475569;             /* Texte tertiaire */
--gray-900: #0F172A;             /* Texte principal, headings */
```

#### Couleurs d'États

```css
/* Success */
--success: #16A34A;              /* Confirmations, validations */
--success-light: #BBF7D0;        /* Success backgrounds */
--success-dark: #15803D;         /* Success borders */

/* Error */
--error: #DC2626;                /* Erreurs, alertes critiques */
--error-light: #FEE2E2;          /* Error backgrounds */
--error-dark: #991B1B;           /* Error borders */

/* Warning */
--warning: #F59E0B;              /* Avertissements */
--warning-light: #FEF3C7;        /* Warning backgrounds */
--warning-dark: #D97706;         /* Warning borders */

/* Info */
--info: #3B82F6;                 /* Informations */
--info-light: #DBEAFE;           /* Info backgrounds */
--info-dark: #1E40AF;            /* Info borders */
```

#### Règles d'Usage

| Usage | Couleur | Exemple |
|-------|---------|---------|
| **CTA Principal** | `forest-green` | Bouton "Réserver maintenant" |
| **CTA Secondaire** | `gold-champagne` | Bouton "En savoir plus" |
| **CTA Tertiaire** | `gray-900` outline | Bouton "Annuler" |
| **Liens** | `forest-green` avec underline au hover | Liens texte |
| **Badges Premium** | `gold-champagne` background | Badge "VIP", "Client fidèle" |
| **Success States** | `success` | Validation formulaire, confirmation |
| **Backgrounds** | `white` / `gray-50` alterné | Pages, cards |
| **Borders** | `gray-200` | Séparations, cards |

---

### Typographie

#### Familles de Polices

```css
/* Police Principale - Inter (Sans-serif moderne) */
--font-primary: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
/* Usage : Titres, body, UI */

/* Police Secondaire - Playfair Display (Serif élégant) */
--font-secondary: 'Playfair Display', Georgia, serif;
/* Usage : Hero titles, grands titres landing page */

/* Police Monospace - JetBrains Mono */
--font-mono: 'JetBrains Mono', 'Courier New', monospace;
/* Usage : Codes réservation, numéros, data technique */
```

#### Échelle Typographique

| Niveau | Taille | Line Height | Weight | Usage |
|--------|--------|-------------|--------|-------|
| **Hero** | 56-72px | 1.1 | 700 (Bold) | Titre principal landing (Playfair) |
| **H1** | 36-48px | 1.2 | 700 (Bold) | Titres de pages (Inter) |
| **H2** | 30-36px | 1.3 | 600 (SemiBold) | Sections principales |
| **H3** | 24-28px | 1.4 | 600 (SemiBold) | Sous-sections |
| **H4** | 20-22px | 1.4 | 600 (SemiBold) | Cards headers |
| **Body Large** | 18px | 1.6 | 400 (Regular) | Paragraphes importants |
| **Body** | 16px | 1.6 | 400 (Regular) | Texte principal |
| **Body Small** | 14px | 1.5 | 400 (Regular) | Labels, captions |
| **Caption** | 12px | 1.4 | 500 (Medium) | Metadata, timestamps |

#### Poids de Polices (Inter)

```css
--font-weight-regular: 400;
--font-weight-medium: 500;
--font-weight-semibold: 600;
--font-weight-bold: 700;
```

#### Classes Utilitaires

```css
/* Titres */
.text-hero { font-family: var(--font-secondary); font-size: 64px; font-weight: 700; }
.text-h1 { font-size: 48px; font-weight: 700; line-height: 1.2; }
.text-h2 { font-size: 36px; font-weight: 600; line-height: 1.3; }
.text-h3 { font-size: 28px; font-weight: 600; line-height: 1.4; }

/* Body */
.text-body-lg { font-size: 18px; line-height: 1.6; }
.text-body { font-size: 16px; line-height: 1.6; }
.text-body-sm { font-size: 14px; line-height: 1.5; }
.text-caption { font-size: 12px; font-weight: 500; line-height: 1.4; }
```

---

### Spacing & Layout

#### Échelle de Spacing

Basée sur un **système d'échelle 4px** pour cohérence et harmonie.

```css
--space-1: 4px;    /* 0.25rem */
--space-2: 8px;    /* 0.5rem */
--space-3: 12px;   /* 0.75rem */
--space-4: 16px;   /* 1rem - Base unit */
--space-5: 20px;   /* 1.25rem */
--space-6: 24px;   /* 1.5rem */
--space-8: 32px;   /* 2rem */
--space-10: 40px;  /* 2.5rem */
--space-12: 48px;  /* 3rem */
--space-16: 64px;  /* 4rem */
--space-20: 80px;  /* 5rem */
--space-24: 96px;  /* 6rem */
```

#### Règles de Spacing

| Usage | Spacing | Exemple |
|-------|---------|---------|
| **Padding bouton** | `space-3` vertical, `space-6` horizontal | 12px × 24px |
| **Margin cards** | `space-6` | 24px entre cards |
| **Padding cards** | `space-6` | 24px intérieur |
| **Sections page** | `space-16` / `space-20` | 64px / 80px entre sections |
| **Padding page** | `space-6` mobile, `space-12` desktop | 24px / 48px |
| **Gap grids** | `space-4` / `space-6` | 16px / 24px |

#### Grid System

```css
/* Container principal */
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 var(--space-6); /* 24px */
}

/* Desktop large */
@media (min-width: 1440px) {
  .container { max-width: 1280px; }
}

/* Grille flexible */
.grid-2 { display: grid; grid-template-columns: repeat(2, 1fr); gap: var(--space-6); }
.grid-3 { display: grid; grid-template-columns: repeat(3, 1fr); gap: var(--space-6); }
.grid-4 { display: grid; grid-template-columns: repeat(4, 1fr); gap: var(--space-6); }

/* Responsive */
@media (max-width: 768px) {
  .grid-2, .grid-3, .grid-4 { grid-template-columns: 1fr; }
}
```

#### Border Radius

```css
--radius-sm: 4px;    /* Petits éléments (badges, pills) */
--radius-md: 8px;    /* Standard (buttons, inputs, cards) */
--radius-lg: 12px;   /* Cards importantes */
--radius-xl: 16px;   /* Modals, grandes surfaces */
--radius-full: 9999px; /* Pills, avatars circulaires */
```

#### Shadows

Système de **shadows multi-couches** pour profondeur subtile.

```css
/* Élévations */
--shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
--shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
--shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
--shadow-xl: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);

/* Shadow colorée (accents) */
--shadow-gold: 0 4px 14px 0 rgba(212, 175, 55, 0.25);
--shadow-green: 0 4px 14px 0 rgba(15, 76, 58, 0.25);
```

**Usage :**
- `shadow-sm` : Inputs, petites cards
- `shadow-md` : Buttons, cards standard
- `shadow-lg` : Cards hover, dropdowns
- `shadow-xl` : Modals, popovers
- `shadow-gold` : CTA premium, badges
- `shadow-green` : CTA principal

---

### Iconographie

#### Bibliothèque : Lucide Icons

**Rationale :** Icônes modernes, cohérentes, optimisées SVG, open-source.

**Configuration :**
```tsx
import { MapPin, Calendar, User, CreditCard, Check } from 'lucide-react';

// Taille standard
<MapPin size={20} />        // UI générale
<Calendar size={24} />      // Emphasis
<User size={16} />          // Petits contextes
```

#### Tailles Standards

| Contexte | Taille | Usage |
|----------|--------|-------|
| **Tiny** | 16px | Labels inline, breadcrumbs |
| **Small** | 20px | Buttons, inputs, navigation |
| **Medium** | 24px | Section headers, cards emphasis |
| **Large** | 32px | Empty states, illustrations |
| **XL** | 48px | Hero sections, grandes illustrations |

#### Style

- **Line icons** (pas de filled) pour élégance et légèreté
- **Stroke width : 2px** (standard Lucide)
- **Couleur :** Hérite du parent (currentColor)

#### Icons Clés du Projet

| Fonctionnalité | Icon | Import |
|----------------|------|--------|
| **Localisation** | MapPin | `lucide-react` |
| **Calendrier** | Calendar | `lucide-react` |
| **Heure** | Clock | `lucide-react` |
| **Utilisateur** | User | `lucide-react` |
| **Paiement** | CreditCard | `lucide-react` |
| **Validation** | CheckCircle | `lucide-react` |
| **Erreur** | XCircle | `lucide-react` |
| **Navigation** | Menu, X, ChevronRight | `lucide-react` |
| **Voiture** | Car | `lucide-react` |
| **Téléphone** | Phone | `lucide-react` |
| **Email** | Mail | `lucide-react` |

---

### Composants UI de Base

#### Bibliothèques Utilisées

1. **ShadCN UI** : Base de composants (customisables, accessibles, TypeScript)
2. **Aceternity UI** : Animations spectaculaires (hero sections, CTA)
3. **Framer Motion** : Animations personnalisées

#### Composants Core

##### 1. Buttons

**Variants :**

```tsx
// Primary (CTA principal)
<Button variant="primary" size="lg">
  Réserver maintenant
</Button>
// Style: bg-forest-green, text-white, hover:bg-forest-green-light, shadow-md

// Secondary (CTA secondaire)
<Button variant="secondary" size="md">
  En savoir plus
</Button>
// Style: bg-gold-champagne, text-gray-900, hover:bg-gold-dark

// Outline (actions tertiaires)
<Button variant="outline" size="md">
  Annuler
</Button>
// Style: border-gray-200, text-gray-900, hover:bg-gray-50

// Ghost (navigation, subtle actions)
<Button variant="ghost" size="sm">
  Modifier
</Button>
// Style: transparent, hover:bg-gray-100
```

**Tailles :**
- `sm` : padding 8px × 16px, text 14px
- `md` : padding 12px × 24px, text 16px (default)
- `lg` : padding 16px × 32px, text 18px

**États :**
- Hover : Changement couleur + scale(1.02)
- Active : scale(0.98)
- Disabled : opacity 0.5, cursor not-allowed
- Loading : Spinner + texte "Chargement..."

##### 2. Inputs

```tsx
<Input
  type="text"
  placeholder="Adresse de départ"
  icon={<MapPin size={20} />}
/>
```

**Style :**
- Border : `border-gray-200`, radius `radius-md`
- Focus : `ring-2 ring-forest-green`, border `border-forest-green`
- Error : `ring-2 ring-error`, border `border-error`
- Height : 48px (touch-friendly)
- Padding : `space-4` (16px)
- Icon : À gauche avec `space-3` de marge

##### 3. Cards

```tsx
<Card variant="default" hover>
  <CardHeader>
    <CardTitle>Titre de la card</CardTitle>
  </CardHeader>
  <CardContent>
    Contenu...
  </CardContent>
</Card>
```

**Variants :**
- `default` : bg-white, border-gray-200, shadow-sm
- `elevated` : bg-white, shadow-lg
- `premium` : bg-gold-light, border-gold-dark

**Hover :**
- Default → Elevated : scale(1.02), shadow-lg
- Transition smooth 200ms

##### 4. Badges

```tsx
<Badge variant="success">Confirmé</Badge>
<Badge variant="premium">VIP</Badge>
```

**Variants :**
- `success` : bg-success-light, text-success-dark
- `error` : bg-error-light, text-error-dark
- `warning` : bg-warning-light, text-warning-dark
- `info` : bg-info-light, text-info-dark
- `premium` : bg-gold-champagne, text-gray-900

**Style :**
- Padding : `space-1` × `space-3` (4px × 12px)
- Border radius : `radius-sm`
- Font : 12px, weight 500, uppercase

##### 5. Modals / Dialogs

```tsx
<Dialog open={isOpen} onOpenChange={setIsOpen}>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Titre du modal</DialogTitle>
    </DialogHeader>
    {/* Content */}
    <DialogFooter>
      <Button>Confirmer</Button>
    </DialogFooter>
  </DialogContent>
</Dialog>
```

**Style :**
- Background : white
- Max-width : 500px (small), 800px (large)
- Border radius : `radius-xl`
- Shadow : `shadow-xl`
- Overlay : bg-black opacity 40%
- Animation : Fade + scale depuis centre

##### 6. Toast Notifications

```tsx
toast.success("Réservation confirmée !");
toast.error("Une erreur est survenue");
```

**Positions :** Top-right (desktop), top-center (mobile)

**Style :**
- Success : bg-success, icon CheckCircle
- Error : bg-error, icon XCircle
- Duration : 4000ms auto-dismiss

---

## Sous-Étape 1 Complète : Design System

**Ce que nous venons de créer :**
- Palette de couleurs complète (principales, neutres, états)
- Typographie (familles, échelle, poids)
- Spacing & Layout (grille, containers, shadows)
- Iconographie (Lucide Icons, tailles, usage)
- Composants UI de base (buttons, inputs, cards, badges, modals, toasts)

**Note importante** : Pas d'emojis dans l'interface finale (univers premium/luxe). Utilisation exclusive d'icônes Lucide pour maintenir un style professionnel et élégant.

**Prochaine sous-étape** : Wireframes des écrans principaux

---

*Document en cours de création - Section suivante à venir après validation*
