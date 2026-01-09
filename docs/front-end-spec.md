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

## Wireframes

### Vue d'Ensemble

Les wireframes suivants décrivent la structure et l'organisation des écrans principaux de l'application VTC Rachel. Chaque wireframe inclut :
- La disposition des éléments
- La hiérarchie visuelle
- Les interactions principales
- Les variations mobile/desktop

**Écrans documentés :**
1. Landing Page (page d'accueil publique)
2. Formulaire de réservation (3 étapes)
3. Dashboard client
4. Détail réservation
5. Dashboard admin Rachel

---

### 1. Landing Page

**Objectif :** Convertir les visiteurs en clients en présentant le service de manière professionnelle et en facilitant la première réservation.

**URL :** `/`

#### Structure de la Page

```
┌─────────────────────────────────────────────────────────────┐
│                        NAVIGATION                            │
│  Logo VTC Rachel    Tarifs  À propos  Contact   [Connexion] │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│                      HERO SECTION                            │
│  ┌──────────────────────┐  ┌─────────────────────────────┐  │
│  │                      │  │                             │  │
│  │  Image/Visuel        │  │  Titre Hero (Playfair)      │  │
│  │  (Voiture premium    │  │  "Votre chauffeur privé     │  │
│  │   ou Rachel)         │  │   en Île-de-France"         │  │
│  │                      │  │                             │  │
│  │  [Background avec    │  │  Sous-titre (Inter)         │  │
│  │   effet gradient]    │  │  "Service premium,          │  │
│  │                      │  │   réservation en 2 min"     │  │
│  └──────────────────────┘  │                             │  │
│                            │  [Réserver maintenant] ──┐  │  │
│                            │  (CTA Principal - Vert)   │  │  │
│                            │                           │  │  │
│                            │  Estimateur rapide tarif  │  │  │
│                            │  ┌─────────────────────┐  │  │  │
│                            │  │ Départ → Arrivée    │  │  │  │
│                            │  └─────────────────────┘  │  │  │
│                            │  Prix estimé : ~XX€      │  │  │
│                            └─────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│                  POURQUOI NOUS CHOISIR                       │
│               (Section avec fond gris-50)                    │
│                                                              │
│  Titre H2 : "Un service premium à votre service"            │
│                                                              │
│  Grid 2x2 (Desktop) / Stack (Mobile)                        │
│                                                              │
│  ┌─────────────────────┐  ┌─────────────────────┐          │
│  │ Card 1              │  │ Card 2              │          │
│  │ Icon: Shield        │  │ Icon: Star          │          │
│  │                     │  │                     │          │
│  │ Chauffeur VTC       │  │ Véhicule premium    │          │
│  │ professionnel       │  │ haut de gamme       │          │
│  │                     │  │                     │          │
│  │ Description courte  │  │ Description courte  │          │
│  └─────────────────────┘  └─────────────────────┘          │
│                                                              │
│  ┌─────────────────────┐  ┌─────────────────────┐          │
│  │ Card 3              │  │ Card 4              │          │
│  │ Icon: Clock         │  │ Icon: Euro          │          │
│  │                     │  │                     │          │
│  │ Ponctualité         │  │ Tarifs              │          │
│  │ garantie            │  │ transparents        │          │
│  │                     │  │                     │          │
│  │ Description courte  │  │ Description courte  │          │
│  └─────────────────────┘  └─────────────────────┘          │
│                                                              │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│                    ZONES DESSERVIES                          │
│                   (Section fond blanc)                       │
│                                                              │
│  Titre H2 : "Nous couvrons toute l'Île-de-France"           │
│                                                              │
│  ┌────────────────────────────────────────────────────┐     │
│  │                                                     │     │
│  │          Carte Google Maps Interactive             │     │
│  │                                                     │     │
│  │     (Région parisienne + aéroports CDG/Orly)       │     │
│  │                                                     │     │
│  └────────────────────────────────────────────────────┘     │
│                                                              │
│  Liste zones principales :                                  │
│  • Paris et petite couronne                                 │
│  • Aéroport Charles de Gaulle                               │
│  • Aéroport d'Orly                                          │
│  • Grandes villes Île-de-France                             │
│                                                              │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│                      TÉMOIGNAGES                             │
│               (Section avec fond gris-50)                    │
│                                                              │
│  Titre H2 : "Ce que disent nos clients"                     │
│                                                              │
│  Carousel (3 témoignages visibles, scroll horizontal)       │
│                                                              │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐                  │
│  │ Card     │  │ Card     │  │ Card     │                  │
│  │          │  │          │  │          │                  │
│  │ "Quote"  │  │ "Quote"  │  │ "Quote"  │                  │
│  │          │  │          │  │          │                  │
│  │ ─ Nom    │  │ ─ Nom    │  │ ─ Nom    │                  │
│  │   Client │  │   Client │  │   Client │                  │
│  │          │  │          │  │          │                  │
│  │ 5 étoiles│  │ 5 étoiles│  │ 5 étoiles│                  │
│  │ (icons)  │  │ (icons)  │  │ (icons)  │                  │
│  └──────────┘  └──────────┘  └──────────┘                  │
│                                                              │
│       [< Précédent]    [Suivant >]                          │
│                                                              │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│                      TARIFS                                  │
│                   (Section fond blanc)                       │
│                                                              │
│  Titre H2 : "Tarification claire et transparente"           │
│                                                              │
│  Grid 3 colonnes (Desktop) / Stack (Mobile)                 │
│                                                              │
│  ┌────────────┐  ┌────────────┐  ┌────────────┐            │
│  │ Trajet     │  │ Trajet     │  │ Trajet     │            │
│  │ Courte     │  │ Aéroport   │  │ Longue     │            │
│  │ distance   │  │ CDG/Orly   │  │ distance   │            │
│  │            │  │            │  │            │            │
│  │ À partir   │  │ À partir   │  │ À partir   │            │
│  │ de XX€     │  │ de XX€     │  │ de XX€     │            │
│  │            │  │  [Badge    │  │            │            │
│  │            │  │  "Populaire│  │            │            │
│  │            │  │   - Or]    │  │            │            │
│  │            │  │            │  │            │            │
│  │ • Détails  │  │ • Détails  │  │ • Détails  │            │
│  │ • Inclus   │  │ • Inclus   │  │ • Inclus   │            │
│  │            │  │            │  │            │            │
│  └────────────┘  └────────────┘  └────────────┘            │
│                                                              │
│  Note : "Tarifs hors majorations (nuit, bagages...)"        │
│                                                              │
│  [Calculer mon tarif] (CTA Secondaire - Or)                 │
│                                                              │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│                         CTA FINAL                            │
│                   (Section fond vert)                        │
│                                                              │
│  Titre H2 (blanc) : "Prêt à réserver votre course ?"        │
│                                                              │
│  Sous-titre (blanc) : "Réservation en ligne en 2 minutes"   │
│                                                              │
│  [Réserver maintenant] (CTA blanc sur fond vert)            │
│                                                              │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│                         FOOTER                               │
│                   (Section fond gris-900)                    │
│                                                              │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │ VTC Rachel   │  │ Navigation   │  │ Contact      │      │
│  │              │  │              │  │              │      │
│  │ Logo         │  │ • Tarifs     │  │ Téléphone    │      │
│  │              │  │ • À propos   │  │ Email        │      │
│  │ Description  │  │ • FAQ        │  │ Adresse      │      │
│  │ courte       │  │ • Contact    │  │              │      │
│  │              │  │              │  │ Réseaux      │      │
│  │              │  │ Légal :      │  │ sociaux      │      │
│  │              │  │ • CGV        │  │              │      │
│  │              │  │ • Mentions   │  │              │      │
│  │              │  │ • Cookies    │  │              │      │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
│                                                              │
│  Copyright © 2026 VTC Rachel. Tous droits réservés.         │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

#### Détails Interactions

**Navigation (Sticky) :**
- Fixée en haut lors du scroll
- Logo cliquable (retour home)
- Liens navigation avec hover effect (soulignement vert)
- Bouton "Connexion" style ghost
- Version mobile : Menu hamburger

**Hero Section :**
- Background avec gradient subtil ou photo haute qualité
- Titre en Playfair Display 64px (desktop) / 40px (mobile)
- CTA principal très visible, taille lg
- Estimateur rapide : 2 champs autocomplete + calcul instantané
- Animation d'entrée : Fade in + slide up

**Section "Pourquoi nous choisir" :**
- 4 cards avec icônes 32px
- Hover effect : ombre plus prononcée
- Spacing généreux entre cards

**Zones desservies :**
- Google Maps embed interactive
- Markers sur Paris, CDG, Orly
- Zoom/Pan activés

**Témoignages :**
- Carousel avec navigation fléchée
- Swipe horizontal sur mobile
- 5 étoiles visuelles (icônes Star remplies)
- Citation en italique

**Tarifs :**
- Card centrale avec badge "Populaire" en or
- Effet hover : scale + shadow
- CTA "Calculer mon tarif" ouvre modal avec estimateur

**CTA Final :**
- Section pleine largeur, fond vert foncé
- Texte blanc contrasté
- CTA inversé : bouton blanc avec texte vert

**Footer :**
- 3 colonnes (desktop) / stack (mobile)
- Liens avec hover effect
- Icônes réseaux sociaux
- Texte gris clair sur fond gris foncé

#### Versions Responsive

**Desktop (> 1024px) :**
- Navigation horizontale complète
- Hero : Image gauche + texte droite (50/50)
- Grids multi-colonnes
- Spacing généreux (80px entre sections)

**Tablet (768px - 1024px) :**
- Navigation compactée
- Hero : Image + texte stacked
- Grids 2 colonnes
- Spacing moyen (64px entre sections)

**Mobile (< 768px) :**
- Menu hamburger
- Hero : Texte sur image (overlay)
- Tout en colonne simple
- Spacing réduit (48px entre sections)
- CTA full-width

---

### 2. Formulaire de Réservation

**Objectif :** Permettre aux clients de réserver une course rapidement et simplement en 3 étapes maximum.

**URL :** `/booking` ou `/reserver`

**Parcours utilisateur :** 
1. Étape 1 : Où ? (Départ + Arrivée)
2. Étape 2 : Quand ? (Date, heure, options)
3. Étape 3 : Confirmation (Récapitulatif + Paiement)

#### Structure Générale

**Layout commun aux 3 étapes :**

```
┌─────────────────────────────────────────────────────────────┐
│                    NAVIGATION (Sticky)                       │
│  Logo VTC Rachel                    [< Retour]  [Mon compte] │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│                    STEPPER (Progression)                     │
│                                                              │
│    1 ───────────  2 ───────────  3                          │
│   Où ?         Quand ?      Confirmation                     │
│   [Active]      [Next]       [Disabled]                      │
│                                                              │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│                                                              │
│                   [CONTENU ÉTAPE]                            │
│                                                              │
│                    (voir détails ci-dessous)                 │
│                                                              │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│                    ACTIONS (Bottom)                          │
│                                                              │
│         [< Précédent]              [Suivant >]              │
│         (Ghost)                    (Primary)                 │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

---

#### Étape 1 : Où ?

**Objectif :** Capturer les adresses de départ et d'arrivée avec autocomplétion.

```
┌─────────────────────────────────────────────────────────────┐
│                      ÉTAPE 1 : OÙ ?                          │
│                                                              │
│  Titre H2 : "D'où partez-vous ?"                            │
│                                                              │
│  ┌────────────────────────────────────────────────────┐     │
│  │  [Icon MapPin]  Adresse de départ                  │     │
│  │  ____________________________________________      │     │
│  │                                                     │     │
│  │  (Autocomplétion Google Places)                    │     │
│  │                                                     │     │
│  └────────────────────────────────────────────────────┘     │
│                                                              │
│  Lien : "Utiliser ma position actuelle"                     │
│  (Icône Target + texte vert)                                │
│                                                              │
│  Adresses favorites (si connecté) :                         │
│  ┌─────────┐  ┌─────────┐  ┌─────────┐                     │
│  │ [Maison]│  │[Travail]│  │ [CDG]   │                     │
│  └─────────┘  └─────────┘  └─────────┘                     │
│                                                              │
│  ──────────────────────────────────────                     │
│                                                              │
│  Titre H2 : "Où allez-vous ?"                               │
│                                                              │
│  ┌────────────────────────────────────────────────────┐     │
│  │  [Icon MapPin]  Adresse d'arrivée                  │     │
│  │  ____________________________________________      │     │
│  │                                                     │     │
│  │  (Autocomplétion Google Places)                    │     │
│  │                                                     │     │
│  └────────────────────────────────────────────────────┘     │
│                                                              │
│  Adresses favorites (si connecté) :                         │
│  ┌─────────┐  ┌─────────┐  ┌─────────┐                     │
│  │ [Maison]│  │[Travail]│  │ [Orly]  │                     │
│  └─────────┘  └─────────┘  └─────────┘                     │
│                                                              │
│  ──────────────────────────────────────                     │
│                                                              │
│  Carte Interactive (Google Maps)                            │
│  ┌────────────────────────────────────────────────────┐     │
│  │                                                     │     │
│  │     [Pin Départ A]                                 │     │
│  │                                                     │     │
│  │            ~~~ Trajet ~~~                          │     │
│  │                                                     │     │
│  │                      [Pin Arrivée B]               │     │
│  │                                                     │     │
│  └────────────────────────────────────────────────────┘     │
│                                                              │
│  Calcul automatique affiché :                               │
│  ┌────────────────────────────────────────────────────┐     │
│  │  Distance : 25 km  |  Durée estimée : 35 min       │     │
│  └────────────────────────────────────────────────────┘     │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

**Interactions :**
- Autocomplétion en temps réel (Google Places API)
- Clic sur adresse favorite → remplissage auto
- Position actuelle → géolocalisation navigateur
- Dès que départ + arrivée remplis → calcul distance + affichage trajet sur carte
- Validation : Les deux champs doivent être remplis pour activer "Suivant"

---

#### Étape 2 : Quand ?

**Objectif :** Capturer date, heure, nombre de passagers et options supplémentaires.

```
┌─────────────────────────────────────────────────────────────┐
│                     ÉTAPE 2 : QUAND ?                        │
│                                                              │
│  Titre H2 : "Quand souhaitez-vous partir ?"                 │
│                                                              │
│  ┌──────────────────────┐  ┌──────────────────────┐        │
│  │  [Icon Calendar]     │  │  [Icon Clock]        │        │
│  │                      │  │                      │        │
│  │  Date                │  │  Heure               │        │
│  │  __________________  │  │  __________________  │        │
│  │                      │  │                      │        │
│  │  (Date Picker)       │  │  (Time Picker)       │        │
│  │                      │  │                      │        │
│  └──────────────────────┘  └──────────────────────┘        │
│                                                              │
│  Toggle :                                                    │
│  [ ] Réserver pour plus tard                                │
│  [X] Réserver maintenant (date/heure actuelles)             │
│                                                              │
│  ──────────────────────────────────────────                 │
│                                                              │
│  Titre H3 : "Détails du trajet"                             │
│                                                              │
│  ┌────────────────────────────────────────────────────┐     │
│  │  [Icon Users]  Nombre de passagers                 │     │
│  │                                                     │     │
│  │  [  -  ]    2    [  +  ]                           │     │
│  │                                                     │     │
│  └────────────────────────────────────────────────────┘     │
│                                                              │
│  Options supplémentaires (Checkboxes) :                     │
│                                                              │
│  [ ] Siège enfant (+10€)                                    │
│  [ ] Bagages volumineux                                     │
│  [ ] Temps d'attente prévu (+15€/15min)                     │
│  [ ] Animaux de compagnie                                   │
│                                                              │
│  ┌────────────────────────────────────────────────────┐     │
│  │  [Icon MessageSquare]  Notes spéciales (optionnel) │     │
│  │  ________________________________________________   │     │
│  │  ________________________________________________   │     │
│  │                                                     │     │
│  │  Ex: "Besoin d'aide avec valises", "Appeler       │     │
│  │  à l'arrivée", etc.                                │     │
│  └────────────────────────────────────────────────────┘     │
│                                                              │
│  ──────────────────────────────────────────                 │
│                                                              │
│  Récapitulatif du trajet (Card avec fond gris-50) :        │
│  ┌────────────────────────────────────────────────────┐     │
│  │  Départ : 15 Rue de la Paix, Paris                 │     │
│  │  Arrivée : Aéroport CDG Terminal 2E                │     │
│  │                                                     │     │
│  │  Distance : 25 km  |  Durée : 35 min               │     │
│  │  Date : 15 Jan 2026  |  Heure : 14:30              │     │
│  │  Passagers : 2                                      │     │
│  └────────────────────────────────────────────────────┘     │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

**Interactions :**
- Date Picker : Calendrier modal, dates passées désactivées
- Time Picker : Sélecteur avec créneaux 15 min
- Toggle "Maintenant" : Remplit automatiquement date/heure actuelles
- Compteur passagers : Min 1, Max 4 (selon véhicule)
- Options : Checkboxes avec prix affichés si applicable
- Champ notes : Textarea avec limite 200 caractères
- Validation disponibilité en temps réel → alerte si créneau occupé

---

#### Étape 3 : Confirmation & Paiement

**Objectif :** Récapitulatif complet + calcul prix + paiement sécurisé.

```
┌─────────────────────────────────────────────────────────────┐
│                  ÉTAPE 3 : CONFIRMATION                      │
│                                                              │
│  Titre H2 : "Récapitulatif de votre réservation"            │
│                                                              │
│  ┌────────────────────────────────────────────────────┐     │
│  │              RÉCAPITULATIF (Card)                   │     │
│  │                                                     │     │
│  │  [Icon MapPin] Trajet                               │     │
│  │  Départ : 15 Rue de la Paix, Paris                 │     │
│  │  Arrivée : Aéroport CDG Terminal 2E                │     │
│  │                                                     │     │
│  │  [Icon Calendar] Date & Heure                       │     │
│  │  Mercredi 15 Janvier 2026 à 14:30                  │     │
│  │                                                     │     │
│  │  [Icon Users] Passagers                             │     │
│  │  2 personnes                                        │     │
│  │                                                     │     │
│  │  [Icon Package] Options                             │     │
│  │  • Siège enfant (+10€)                              │     │
│  │  • Notes : "Besoin d'aide avec valises"            │     │
│  │                                                     │     │
│  │  ──────────────────────────────────────             │     │
│  │                                                     │     │
│  │  [Icon Calculator] Tarification                     │     │
│  │                                                     │     │
│  │  Course (25 km)                        65,00€      │     │
│  │  Siège enfant                          10,00€      │     │
│  │  ──────────────────────────────────────             │     │
│  │  Total                                 75,00€      │     │
│  │                                                     │     │
│  └────────────────────────────────────────────────────┘     │
│                                                              │
│  Lien : "Modifier les détails" (retour étape précédente)    │
│                                                              │
│  ──────────────────────────────────────────                 │
│                                                              │
│  Titre H3 : "Paiement"                                      │
│                                                              │
│  Mode de paiement :                                         │
│                                                              │
│  ( ) Payer maintenant (Recommandé)                          │
│      [Stripe Payment Element intégré]                       │
│      ┌──────────────────────────────────────┐              │
│      │  [Card icons: Visa MC Amex]          │              │
│      │  Numéro de carte                      │              │
│      │  ____________________________________  │              │
│      │                                        │              │
│      │  MM/YY    CVC     Code postal          │              │
│      │  ______   ______  __________________   │              │
│      │                                        │              │
│      │  [ ] Enregistrer pour prochaine fois  │              │
│      └──────────────────────────────────────┘              │
│                                                              │
│  ( ) Payer à bord (Espèces ou CB)                           │
│      Note : Un acompte de 20% sera demandé                  │
│                                                              │
│  ──────────────────────────────────────────                 │
│                                                              │
│  Checkbox obligatoire :                                     │
│  [X] J'accepte les Conditions Générales de Vente           │
│                                                              │
│  ──────────────────────────────────────────                 │
│                                                              │
│  [Confirmer et payer - 75,00€]                              │
│  (Bouton Primary, full-width, icône Lock)                   │
│                                                              │
│  Texte sécurité (petit, gris) :                             │
│  "Paiement sécurisé par Stripe. Vos données                │
│   bancaires ne sont jamais stockées."                       │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

**Interactions :**
- Récapitulatif non-éditable, juste consultation
- Lien "Modifier" → retour étape précédente avec données conservées
- Radio buttons pour choix mode paiement
- Stripe Payment Element : Intégration native Stripe (gère carte, Apple/Google Pay)
- Checkbox CGV : Obligatoire pour activer bouton
- Bouton final : Affiche prix total + icône cadenas
- Click → Processing state → Redirection confirmation

---

#### Page de Confirmation (Post-paiement)

**URL :** `/booking/confirmation/[id]`

```
┌─────────────────────────────────────────────────────────────┐
│                   CONFIRMATION                               │
│                                                              │
│  ┌────────────────────────────────────────────────────┐     │
│  │                                                     │     │
│  │           [Icon CheckCircle - Vert, 64px]          │     │
│  │                                                     │     │
│  │  Titre H1 : "Réservation confirmée !"              │     │
│  │                                                     │     │
│  │  Sous-titre : "Votre course a été réservée         │     │
│  │               avec succès"                          │     │
│  │                                                     │     │
│  │  Numéro de réservation : #RCH-2026-0142            │     │
│  │  (Police mono, background gris-100)                │     │
│  │                                                     │     │
│  └────────────────────────────────────────────────────┘     │
│                                                              │
│  Récapitulatif identique étape 3 (lecture seule)           │
│                                                              │
│  Actions :                                                   │
│  [Télécharger la facture] (Outline)                        │
│  [Ajouter au calendrier] (Outline)                          │
│  [Voir mes réservations] (Primary)                          │
│                                                              │
│  ──────────────────────────────────────────                 │
│                                                              │
│  Card info :                                                │
│  "Un email de confirmation a été envoyé à [email]"          │
│  "Rachel vous contactera 30 min avant le départ"            │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

#### Gestion des États

**Loading States :**
- Calcul trajet : Skeleton sur carte + distance
- Vérification disponibilité : Spinner sur bouton "Suivant"
- Traitement paiement : Bouton en état loading + texte "Traitement..."

**Error States :**
- Adresse invalide : Message sous input avec icône XCircle
- Créneau indisponible : Modal alerte avec proposition créneaux alternatifs
- Paiement échoué : Toast error + message explicatif
- Champs requis manquants : Bordure rouge + message

**Success States :**
- Transition étapes : Animation slide
- Paiement réussi : Confetti subtil + redirection confirmation

#### Versions Responsive

**Mobile (< 768px) :**
- Stepper horizontal compact (numéros seulement)
- Inputs full-width
- Carte plus petite (300px height)
- Boutons actions full-width stacked
- Récapitulatif collapsible

**Desktop (> 1024px) :**
- Layout 2 colonnes : Formulaire gauche (60%) + Récapitulatif sticky droite (40%)
- Carte plus grande (500px height)
- Stepper avec labels complets

---

### 3. Dashboard Client

**Objectif :** Page d'accueil après connexion, vue d'ensemble des réservations et accès rapides.

**URL :** `/dashboard` ou `/mon-espace`

**Accès :** Utilisateur authentifié uniquement

#### Structure de la Page

```
┌─────────────────────────────────────────────────────────────┐
│                    NAVIGATION (Sticky)                       │
│  Logo VTC Rachel    [Dashboard] Réservations Profil         │
│                                          [Photo + Prénom]    │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│                        HEADER                                │
│                                                              │
│  Titre H1 : "Bonjour, [Prénom]"                             │
│  Sous-titre : "Ravi de vous revoir"                         │
│                                                              │
│  [Nouvelle réservation] (CTA Primary, taille lg)            │
│                                                              │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│                  PROCHAINE COURSE (si existe)                │
│                   (Card elevated, fond blanc)                │
│                                                              │
│  Badge "À venir" (info)                                     │
│                                                              │
│  Titre H3 : "Votre prochaine course"                        │
│                                                              │
│  ┌────────────────────────────────────────────────────┐     │
│  │  [Icon Calendar] Mercredi 15 Janvier 2026         │     │
│  │  [Icon Clock] 14:30                                │     │
│  │                                                     │     │
│  │  [Icon MapPin] Trajet                              │     │
│  │  15 Rue de la Paix, Paris                          │     │
│  │  → Aéroport CDG Terminal 2E                        │     │
│  │                                                     │     │
│  │  [Icon Car] Distance : 25 km | Durée : 35 min      │     │
│  │                                                     │     │
│  │  Prix : 75,00€ | Statut : Payé                     │     │
│  │                                                     │     │
│  │  [Voir les détails] [Modifier] [Annuler]          │     │
│  │  (Primary)         (Outline)    (Ghost)            │     │
│  └────────────────────────────────────────────────────┘     │
│                                                              │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│                    STATISTIQUES RAPIDES                      │
│                   (3 cards en ligne)                         │
│                                                              │
│  ┌────────────┐  ┌────────────┐  ┌────────────┐            │
│  │ Card 1     │  │ Card 2     │  │ Card 3     │            │
│  │            │  │            │  │            │            │
│  │ [Icon Car] │  │ [Icon Map] │  │ [Icon Euro]│            │
│  │            │  │            │  │            │            │
│  │    12      │  │   340      │  │   890€     │            │
│  │  Courses   │  │  km        │  │  Dépensés  │            │
│  │            │  │  parcourus │  │  (2026)    │            │
│  └────────────┘  └────────────┘  └────────────┘            │
│                                                              │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│                    ACCÈS RAPIDES                             │
│                   (3 cards en ligne)                         │
│                                                              │
│  ┌────────────┐  ┌────────────┐  ┌────────────┐            │
│  │ [Icon      │  │ [Icon      │  │ [Icon      │            │
│  │  History]  │  │  MapPin]   │  │  Settings] │            │
│  │            │  │            │  │            │            │
│  │ Historique │  │ Adresses   │  │ Paramètres │            │
│  │ courses    │  │ favorites  │  │            │            │
│  │            │  │            │  │            │            │
│  │ [Voir →]   │  │ [Gérer →]  │  │ [Accéder →]│            │
│  └────────────┘  └────────────┘  └────────────┘            │
│                                                              │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│                  DERNIÈRES COURSES                           │
│                   (Section avec fond gris-50)                │
│                                                              │
│  Titre H2 : "Vos dernières courses"                         │
│                                                              │
│  Liste (3 dernières) :                                      │
│                                                              │
│  ┌────────────────────────────────────────────────────┐     │
│  │ Card Course 1                                       │     │
│  │                                                     │     │
│  │ [Badge "Terminée" - Success]                       │     │
│  │                                                     │     │
│  │ 10 Janvier 2026 | 09:30                            │     │
│  │ Paris Centre → CDG T2E                             │     │
│  │ 65,00€                                              │     │
│  │                                                     │     │
│  │ [Télécharger facture] [Réserver à nouveau]        │     │
│  └────────────────────────────────────────────────────┘     │
│                                                              │
│  ┌────────────────────────────────────────────────────┐     │
│  │ Card Course 2                                       │     │
│  │ ... (idem)                                          │     │
│  └────────────────────────────────────────────────────┘     │
│                                                              │
│  ┌────────────────────────────────────────────────────┐     │
│  │ Card Course 3                                       │     │
│  │ ... (idem)                                          │     │
│  └────────────────────────────────────────────────────┘     │
│                                                              │
│  [Voir tout l'historique →]                                 │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

#### Empty State (Nouveau client)

Si l'utilisateur n'a aucune réservation :

```
┌─────────────────────────────────────────────────────────────┐
│                    EMPTY STATE                               │
│                                                              │
│  [Illustration voiture ou map - 200px]                      │
│                                                              │
│  Titre H2 : "Aucune réservation pour le moment"             │
│                                                              │
│  Texte : "Réservez votre première course avec Rachel        │
│           et profitez d'un service premium"                 │
│                                                              │
│  [Réserver ma première course] (CTA Primary)                │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

#### Interactions

- CTA "Nouvelle réservation" : Redirige vers `/booking`
- Cards statistiques : Cliquables → détails (ex: "12 courses" → historique complet)
- Bouton "Modifier" prochaine course : Redirige vers formulaire pré-rempli
- Bouton "Annuler" : Ouvre modal confirmation avec calcul frais
- "Télécharger facture" : Génère PDF et télécharge
- "Réserver à nouveau" : Formulaire pré-rempli avec même trajet

#### Responsive

**Mobile :**
- Cards statistiques empilées (vertical stack)
- Prochaine course en version compactée
- Liste dernières courses : 2 affichées, scroll pour plus

**Desktop :**
- Layout 3 colonnes pour statistiques et accès rapides
- Prochaine course : Layout 2 colonnes (infos + map preview)

---

### 4. Détail Réservation

**Objectif :** Afficher toutes les informations d'une réservation spécifique avec actions possibles.

**URL :** `/bookings/[id]` ou `/reservations/[id]`

**Accès :** Utilisateur authentifié, propriétaire de la réservation

#### Structure de la Page

```
┌─────────────────────────────────────────────────────────────┐
│                    NAVIGATION                                │
│  [< Retour]  Logo VTC Rachel         [Mon compte]           │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│                        HEADER                                │
│                                                              │
│  Badge statut : [À venir] / [En cours] / [Terminée] / [Annulée] │
│  (Couleurs : info / warning / success / error)              │
│                                                              │
│  Titre H1 : "Réservation #RCH-2026-0142"                    │
│  (Police mono pour le numéro)                               │
│                                                              │
│  Sous-titre : "Réservée le 5 Janvier 2026 à 16:45"         │
│                                                              │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│                    INFORMATIONS COURSE                       │
│                   (Card principale)                          │
│                                                              │
│  Section : Date & Heure                                     │
│  ┌────────────────────────────────────────────────────┐     │
│  │  [Icon Calendar] Mercredi 15 Janvier 2026          │     │
│  │  [Icon Clock] 14:30                                │     │
│  └────────────────────────────────────────────────────┘     │
│                                                              │
│  Section : Trajet                                           │
│  ┌────────────────────────────────────────────────────┐     │
│  │  [Icon MapPin] Départ                              │     │
│  │  15 Rue de la Paix, 75002 Paris                    │     │
│  │                                                     │     │
│  │  [Icon ArrowDown]                                  │     │
│  │                                                     │     │
│  │  [Icon MapPin] Arrivée                             │     │
│  │  Aéroport Charles de Gaulle, Terminal 2E           │     │
│  │                                                     │     │
│  │  [Icon Route] Distance : 25 km                     │     │
│  │  [Icon Clock] Durée estimée : 35 min               │     │
│  └────────────────────────────────────────────────────┘     │
│                                                              │
│  Carte Interactive (Google Maps)                            │
│  ┌────────────────────────────────────────────────────┐     │
│  │  [Trajet affiché avec pins départ/arrivée]        │     │
│  └────────────────────────────────────────────────────┘     │
│                                                              │
│  Section : Détails                                          │
│  ┌────────────────────────────────────────────────────┐     │
│  │  [Icon Users] Passagers : 2 personnes              │     │
│  │  [Icon Package] Options :                          │     │
│  │    • Siège enfant (+10€)                           │     │
│  │  [Icon MessageSquare] Notes :                      │     │
│  │    "Besoin d'aide avec valises"                    │     │
│  └────────────────────────────────────────────────────┘     │
│                                                              │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│                    TARIFICATION                              │
│                   (Card avec fond gris-50)                   │
│                                                              │
│  Titre H3 : "Détail du prix"                                │
│                                                              │
│  Course (25 km)                        65,00€               │
│  Siège enfant                          10,00€               │
│  ──────────────────────────────────────                     │
│  Total                                 75,00€               │
│                                                              │
│  Statut paiement :                                          │
│  [Badge "Payé" - Success] ou [Badge "En attente" - Warning] │
│                                                              │
│  [Télécharger la facture] (Outline button)                 │
│                                                              │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│                    INFORMATIONS CHAUFFEUR                    │
│                   (Card)                                     │
│                                                              │
│  Titre H3 : "Votre chauffeur"                               │
│                                                              │
│  ┌──────────┐                                               │
│  │  Photo   │  Rachel                                       │
│  │  Rachel  │  Chauffeur VTC professionnel                 │
│  └──────────┘  Licence VTC : #XXXXXX                        │
│                                                              │
│  [Icon Phone] Appeler Rachel                                │
│  [Icon Mail] Envoyer un message                             │
│                                                              │
│  Note : "Rachel vous contactera 30 min avant le départ"    │
│                                                              │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│                    ACTIONS                                   │
│                   (Section buttons)                          │
│                                                              │
│  Si statut "À venir" :                                      │
│  [Modifier la réservation] (Outline)                        │
│  [Annuler la réservation] (Ghost, rouge)                    │
│  [Ajouter au calendrier] (Outline)                          │
│                                                              │
│  Si statut "Terminée" :                                     │
│  [Réserver à nouveau] (Primary)                             │
│  [Télécharger facture] (Outline)                            │
│  [Laisser un avis] (Outline)                                │
│                                                              │
│  Si statut "Annulée" :                                      │
│  [Réserver à nouveau] (Primary)                             │
│                                                              │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│                    HISTORIQUE MODIFICATIONS                  │
│                   (Card collapsible)                         │
│                                                              │
│  [Icon ChevronDown] Historique des modifications           │
│                                                              │
│  (Expand/Collapse)                                          │
│                                                              │
│  Timeline :                                                 │
│  • 5 Jan 2026, 16:45 - Réservation créée                   │
│  • 5 Jan 2026, 16:46 - Paiement confirmé (75,00€)          │
│  • 8 Jan 2026, 10:30 - Réservation confirmée par Rachel    │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

#### Modal Annulation

Quand utilisateur clique "Annuler" :

```
┌─────────────────────────────────────────────────────────────┐
│                    MODAL ANNULATION                          │
│                                                              │
│  Titre : "Annuler cette réservation ?"                      │
│                                                              │
│  Texte :                                                    │
│  "Êtes-vous sûr de vouloir annuler votre réservation       │
│   du 15 Janvier 2026 à 14:30 ?"                            │
│                                                              │
│  Card warning (fond jaune clair) :                          │
│  [Icon AlertTriangle]                                       │
│  Frais d'annulation : 15,00€ (20%)                          │
│  Remboursement : 60,00€                                     │
│                                                              │
│  Raison (optionnelle) :                                     │
│  [ ] Changement de programme                                │
│  [ ] Problème avec l'horaire                                │
│  [ ] Autre raison                                           │
│                                                              │
│  Textarea : "Précisez (optionnel)"                          │
│                                                              │
│  [Retour] (Outline)  [Confirmer l'annulation] (Error)      │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

#### Interactions

- Bouton "Modifier" : Redirige formulaire réservation pré-rempli
- Bouton "Annuler" : Ouvre modal avec calcul frais selon délai
- "Ajouter au calendrier" : Génère fichier .ics (Google/Apple/Outlook)
- "Télécharger facture" : PDF généré dynamiquement
- "Appeler Rachel" : Lance appel téléphonique (mobile) ou affiche numéro (desktop)
- "Réserver à nouveau" : Formulaire pré-rempli avec même trajet/options

---

### 5. Dashboard Admin Rachel

**Objectif :** Interface de gestion pour Rachel (vue d'ensemble, réservations, statistiques).

**URL :** `/admin/dashboard`

**Accès :** Rachel uniquement (rôle admin)

#### Structure de la Page

```
┌─────────────────────────────────────────────────────────────┐
│                    NAVIGATION ADMIN                          │
│  Logo VTC Rachel  [Dashboard] Réservations Clients Agenda   │
│                                          [Rachel - Admin]    │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│                        HEADER                                │
│                                                              │
│  Titre H1 : "Tableau de bord"                               │
│  Date actuelle : "Vendredi 10 Janvier 2026"                 │
│                                                              │
│  Période sélectionnée : [Aujourd'hui] [Semaine] [Mois]     │
│                                                              │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│                    ALERTES & NOTIFICATIONS                   │
│                   (Si nouvelles réservations)                │
│                                                              │
│  Card info (fond bleu clair) :                              │
│  [Icon Bell] 3 nouvelles réservations en attente            │
│  [Voir les réservations →]                                  │
│                                                              │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│                    STATISTIQUES CLÉS                         │
│                   (4 cards en ligne)                         │
│                                                              │
│  ┌────────────┐  ┌────────────┐  ┌────────────┐  ┌────────────┐
│  │ Card 1     │  │ Card 2     │  │ Card 3     │  │ Card 4     │
│  │            │  │            │  │            │  │            │
│  │ [Icon      │  │ [Icon      │  │ [Icon      │  │ [Icon      │
│  │  Calendar] │  │  Euro]     │  │  TrendUp]  │  │  Users]    │
│  │            │  │            │  │            │  │            │
│  │     8      │  │  1.240€    │  │    +15%    │  │    42      │
│  │  Courses   │  │  CA        │  │  vs mois   │  │  Clients   │
│  │  ce mois   │  │  ce mois   │  │  dernier   │  │  actifs    │
│  │            │  │            │  │            │  │            │
│  └────────────┘  └────────────┘  └────────────┘  └────────────┘
│                                                              │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│                    COURSES AUJOURD'HUI                       │
│                   (Section principale)                       │
│                                                              │
│  Titre H2 : "Vos courses du jour"  [+ Bloquer créneau]     │
│                                                              │
│  Timeline verticale :                                       │
│                                                              │
│  08:00 ────────────────────────────────                     │
│                                                              │
│  09:30 ┌─────────────────────────────────┐                 │
│        │ Course #RCH-0142 [Confirmée]    │                 │
│        │ M. Dupont (2 pass.)             │                 │
│        │ Paris 15e → CDG T2E             │                 │
│        │ 65€ | Payé                      │                 │
│        │ [Voir] [Contacter] [Annuler]   │                 │
│        └─────────────────────────────────┘                 │
│                                                              │
│  11:00 ────────────────────────────────                     │
│                                                              │
│  14:30 ┌─────────────────────────────────┐                 │
│        │ Course #RCH-0143 [En attente]   │                 │
│        │ Mme Martin (1 pass.)            │                 │
│        │ CDG T1 → Paris 8e               │                 │
│        │ 70€ | Non payé                  │                 │
│        │ [Confirmer] [Refuser]           │                 │
│        └─────────────────────────────────┘                 │
│                                                              │
│  16:00 ────────────────────────────────                     │
│                                                              │
│  19:00 [Créneau libre]                                      │
│        [+ Ajouter réservation manuelle]                     │
│                                                              │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│                    RÉSERVATIONS À VENIR                      │
│                   (Card liste)                               │
│                                                              │
│  Titre H3 : "Prochaines réservations"  [Voir tout →]       │
│                                                              │
│  Liste (5 prochaines) :                                     │
│                                                              │
│  ┌────────────────────────────────────────────────────┐     │
│  │ Demain, 16 Jan | 10:00                             │     │
│  │ #RCH-0144 | M. Bernard                             │     │
│  │ Paris → Orly | 55€ | Confirmée                     │     │
│  │ [Voir détails →]                                   │     │
│  └────────────────────────────────────────────────────┘     │
│                                                              │
│  (... 4 autres)                                             │
│                                                              │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│                    GRAPHIQUES ACTIVITÉ                       │
│                   (Section 2 colonnes)                       │
│                                                              │
│  ┌──────────────────────┐  ┌──────────────────────┐        │
│  │ Graphique 1          │  │ Graphique 2          │        │
│  │                      │  │                      │        │
│  │ CA par semaine       │  │ Courses par jour     │        │
│  │ (Bar chart)          │  │ (Line chart)         │        │
│  │                      │  │                      │        │
│  └──────────────────────┘  └──────────────────────┘        │
│                                                              │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│                    ACTIONS RAPIDES                           │
│                   (Section buttons)                          │
│                                                              │
│  [Bloquer un créneau] [Exporter données] [Paramètres]      │
│  (Outline)            (Outline)          (Outline)          │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

#### Page Gestion Réservations (Admin)

**URL :** `/admin/bookings`

```
┌─────────────────────────────────────────────────────────────┐
│                    GESTION RÉSERVATIONS                      │
│                                                              │
│  Titre H1 : "Réservations"                                  │
│                                                              │
│  Filtres :                                                  │
│  [Statut ▼] [Date ▼] [Client ▼]  [Recherche...]            │
│                                                              │
│  [Exporter CSV] [Exporter Excel]                            │
│                                                              │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│                    TABLE RÉSERVATIONS                        │
│                                                              │
│  ┌────┬──────────┬───────────┬────────┬────────┬────────┐  │
│  │ ID │ Date     │ Client    │ Trajet │ Prix   │ Statut │  │
│  ├────┼──────────┼───────────┼────────┼────────┼────────┤  │
│  │142 │15/01/26  │M. Dupont  │Paris→  │ 75€    │Confirmé│  │
│  │    │14:30     │06XXXXXX   │CDG     │        │[Badge] │  │
│  │    │          │           │        │        │[Voir]  │  │
│  ├────┼──────────┼───────────┼────────┼────────┼────────┤  │
│  │143 │15/01/26  │Mme Martin │CDG→    │ 70€    │Attente │  │
│  │    │14:30     │06YYYYYY   │Paris   │        │[Badge] │  │
│  │    │          │           │        │        │[Voir]  │  │
│  └────┴──────────┴───────────┴────────┴────────┴────────┘  │
│                                                              │
│  Pagination : [< Précédent] 1 2 3 ... 10 [Suivant >]       │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

#### Interactions Admin

- "Confirmer" réservation : Change statut + envoie email client
- "Refuser" réservation : Modal raison + remboursement auto + email
- "Bloquer créneau" : Modal sélection date/heure + raison
- "Contacter client" : Affiche numéro ou ouvre email
- "Exporter données" : Génère CSV/Excel avec filtres appliqués
- Statistiques cliquables : Ouvre détails/rapports

#### Responsive Admin

**Desktop prioritaire** (Rachel gère depuis ordinateur principalement)

**Mobile :**
- Navigation hamburger
- Statistiques empilées
- Timeline courses : Version compacte
- Table réservations : Cards scrollables horizontalement

---

## Sous-Étape 2 Complète : Wireframes

**Ce que nous venons de créer :**
- Landing Page (conversion visiteurs)
- Formulaire de réservation (3 étapes + confirmation)
- Dashboard client (vue d'ensemble perso)
- Détail réservation (infos complètes + actions)
- Dashboard admin Rachel (gestion business)

**Prochaine sous-étape** : Guidelines UX et interactions

---

*Document en cours de création - Section suivante à venir après validation*
