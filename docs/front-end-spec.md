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

## Guidelines UX

### Principes d'Interaction

#### Micro-animations

**Philosophy :** Animations subtiles qui guident l'utilisateur sans le distraire.

**Durées Standards :**
```css
--duration-instant: 100ms;   /* Feedback immédiat (hover, active) */
--duration-fast: 200ms;      /* Transitions rapides (slides, fades) */
--duration-normal: 300ms;    /* Transitions standard (modals, menus) */
--duration-slow: 500ms;      /* Animations importantes (page transitions) */
```

**Courbes d'accélération :**
```css
--ease-in: cubic-bezier(0.4, 0, 1, 1);           /* Démarrage lent */
--ease-out: cubic-bezier(0, 0, 0.2, 1);          /* Arrivée douce */
--ease-in-out: cubic-bezier(0.4, 0, 0.2, 1);     /* Standard */
--ease-spring: cubic-bezier(0.34, 1.56, 0.64, 1); /* Rebond subtil */
```

**Exemples d'Usage :**

```css
/* Hover sur bouton */
.button {
  transition: all var(--duration-instant) var(--ease-out);
}
.button:hover {
  transform: scale(1.02);
  box-shadow: var(--shadow-lg);
}

/* Apparition modal */
.modal {
  animation: fadeInScale var(--duration-normal) var(--ease-out);
}
@keyframes fadeInScale {
  from { opacity: 0; transform: scale(0.95); }
  to { opacity: 1; transform: scale(1); }
}

/* Navigation entre étapes */
.step-content {
  animation: slideIn var(--duration-fast) var(--ease-in-out);
}
@keyframes slideIn {
  from { transform: translateX(20px); opacity: 0; }
  to { transform: translateX(0); opacity: 1; }
}
```

---

#### Interactions Clavier

**Tous les éléments interactifs doivent être accessibles au clavier.**

| Élément | Action | Comportement |
|---------|--------|--------------|
| Bouton | Tab | Focus visible avec ring |
| Bouton | Enter/Space | Déclenche action |
| Input | Tab | Focus avec ring vert |
| Modal | Escape | Ferme le modal |
| Dropdown | Arrow Up/Down | Navigation options |
| Carousel | Arrow Left/Right | Navigation slides |

**Focus Visible :**
```css
*:focus-visible {
  outline: 2px solid var(--forest-green);
  outline-offset: 2px;
  border-radius: var(--radius-md);
}
```

---

#### États des Composants

**Boutons :**

| État | Style | Durée |
|------|-------|-------|
| Default | Couleur de base | - |
| Hover | Scale 1.02, shadow-lg | 100ms |
| Active/Click | Scale 0.98 | 100ms |
| Focus | Ring vert | - |
| Disabled | Opacity 0.5, cursor not-allowed | - |
| Loading | Spinner + texte "Chargement..." | - |

**Inputs :**

| État | Style |
|------|-------|
| Default | Border gray-200 |
| Focus | Ring-2 forest-green, border-forest-green |
| Error | Ring-2 error, border-error, texte rouge |
| Success | Border success, icône CheckCircle verte |
| Disabled | Background gray-100, cursor not-allowed |

**Cards :**

| État | Style |
|------|-------|
| Default | Shadow-sm |
| Hover | Scale 1.02, shadow-lg, cursor-pointer |
| Active/Selected | Border forest-green, shadow-green |

---

### Tone of Voice

**Principes :**
- Tutoiement moderne et accessible
- Professionnel mais chaleureux
- Rassurant et digne de confiance
- Concis et actionnable
- Pas de jargon technique

#### Messages Système

**Succès :**
```
✓ "Réservation confirmée !"
✓ "Votre paiement a été accepté"
✓ "Profil mis à jour avec succès"
✓ "Email envoyé, vérifiez votre boîte de réception"
```

**Erreurs :**
```
✗ "Cette adresse n'existe pas. Vérifiez votre saisie."
✗ "Ce créneau horaire n'est pas disponible. Essayez 15h00 ou 16h00."
✗ "Votre paiement n'a pas pu être traité. Vérifiez vos informations bancaires."
✗ "Connexion impossible. Vérifiez votre email et mot de passe."
```

**Avertissements :**
```
⚠ "Annulation gratuite jusqu'à 12h avant votre course"
⚠ "Des frais de 15€ s'appliquent si vous annulez maintenant"
⚠ "Votre réservation n'a pas encore été confirmée par Rachel"
```

**Informations :**
```
ⓘ "Rachel vous contactera 30 min avant le départ"
ⓘ "Paiement sécurisé par Stripe. Vos données ne sont jamais stockées."
ⓘ "Un email de confirmation vous a été envoyé"
```

**Empty States :**
```
"Aucune réservation pour le moment"
→ "Réservez votre première course avec Rachel"

"Aucun historique"
→ "Vos courses passées s'afficheront ici"

"Aucune adresse favorite"
→ "Ajoutez vos adresses fréquentes pour réserver plus rapidement"
```

**Actions (CTA) :**
```
✓ "Réserver maintenant"
✓ "Confirmer et payer"
✓ "Voir les détails"
✓ "Télécharger la facture"
✓ "Modifier ma réservation"

✗ "Cliquez ici" (trop vague)
✗ "Soumettre" (trop technique)
✗ "Valider" (trop administratif)
```

---

### Loading States

**Principes :**
- Feedback immédiat (< 100ms)
- Skeleton screens plutôt que spinners
- Messages contextuels
- Pas de blocage interface si non nécessaire

#### Types de Loading

**1. Skeleton Screens (préféré)**

Utilisé pour : Chargement initial de contenu

```
┌─────────────────────────────────────┐
│ [████████░░░░░░░░░░░░░░░░░░]       │ ← Titre
│ [████░░░░░░░░░░░░]                 │ ← Sous-titre
│                                     │
│ [████████████████████░░░░░░░]      │ ← Texte
│ [████████████████░░░░░░░░░░]      │
│                                     │
│ [████████░░] [████████░░]          │ ← Boutons
└─────────────────────────────────────┘
```

**2. Spinner (si skeleton impossible)**

```tsx
<div className="flex items-center justify-center p-8">
  <Loader2 className="animate-spin text-forest-green" size={32} />
  <span className="ml-3 text-gray-600">Chargement...</span>
</div>
```

**3. Bouton Loading**

```tsx
<Button disabled>
  <Loader2 className="animate-spin mr-2" size={16} />
  Traitement en cours...
</Button>
```

**4. Progress Bar (pour uploads/processus longs)**

```tsx
<div className="w-full bg-gray-200 rounded-full h-2">
  <div 
    className="bg-forest-green h-2 rounded-full transition-all"
    style={{ width: `${progress}%` }}
  />
</div>
<p className="text-sm text-gray-600 mt-2">{progress}% - Génération de votre facture...</p>
```

#### Messages de Loading Contextuels

| Action | Message |
|--------|---------|
| Calcul trajet | "Calcul de l'itinéraire..." |
| Vérification dispo | "Vérification de la disponibilité..." |
| Création réservation | "Création de votre réservation..." |
| Traitement paiement | "Traitement sécurisé de votre paiement..." |
| Génération facture | "Génération de votre facture PDF..." |
| Chargement données | "Chargement de vos réservations..." |

---

### Error Handling

**Principes :**
- Message clair et actionnable
- Toujours proposer une solution
- Ton empathique, pas accusateur
- Icône visuelle appropriée

#### Types d'Erreurs

**Erreurs de Validation (Input) :**

```
Champ vide :
"L'adresse de départ est requise"

Format invalide :
"L'email doit être au format nom@exemple.com"

Valeur hors limites :
"Le nombre de passagers doit être entre 1 et 4"

Date passée :
"La date doit être dans le futur"
```

**Erreurs Métier :**

```
Créneau indisponible :
"Ce créneau horaire n'est pas disponible"
→ [Voir les créneaux disponibles]

Modification impossible :
"Impossible de modifier moins de 4h avant le départ"
→ [Contactez Rachel directement]

Annulation refusée :
"Annulation impossible moins de 2h avant le départ"
→ [Contacter le service client]
```

**Erreurs Techniques :**

```
Erreur réseau :
"Impossible de se connecter au serveur"
→ [Réessayer] + "Vérifiez votre connexion internet"

Erreur serveur :
"Une erreur inattendue s'est produite"
→ [Réessayer] + "Si le problème persiste, contactez-nous"

Paiement échoué :
"Votre paiement n'a pas pu être traité"
→ "Vérifiez vos informations bancaires et réessayez"
→ [Modifier le moyen de paiement]
```

**Erreurs 404 :**

```
Page non trouvée :
"Cette page n'existe pas ou a été déplacée"
→ [Retour à l'accueil]

Réservation non trouvée :
"Cette réservation est introuvable"
→ [Voir mes réservations]
```

#### Format Visuel des Erreurs

```tsx
// Toast Error (temporaire, auto-dismiss)
<Toast variant="error">
  <XCircle size={20} />
  <div>
    <p className="font-medium">Erreur de paiement</p>
    <p className="text-sm">Vérifiez vos informations bancaires</p>
  </div>
</Toast>

// Inline Error (sous input)
<div className="flex items-center gap-2 text-error text-sm mt-1">
  <AlertCircle size={16} />
  <span>L'adresse de départ est requise</span>
</div>

// Modal Error (action bloquante)
<Modal>
  <div className="text-center">
    <XCircle size={48} className="text-error mx-auto mb-4" />
    <h3>Créneau indisponible</h3>
    <p>Une autre réservation existe à cet horaire</p>
    <Button onClick={showAlternatives}>Voir les créneaux disponibles</Button>
  </div>
</Modal>
```

---

### Success States

**Principes :**
- Célébration visuelle (mais subtile)
- Confirmation claire
- Prochaines étapes proposées

#### Animations de Succès

**Confetti (pour actions importantes) :**
```tsx
import confetti from 'canvas-confetti';

// Lors du paiement réussi
confetti({
  particleCount: 100,
  spread: 70,
  origin: { y: 0.6 },
  colors: ['#0F4C3A', '#D4AF37', '#16A34A']
});
```

**Checkmark animé :**
```tsx
<motion.div
  initial={{ scale: 0 }}
  animate={{ scale: 1 }}
  transition={{ type: "spring", duration: 0.5 }}
>
  <CheckCircle size={64} className="text-success" />
</motion.div>
```

#### Messages de Succès

```
Réservation créée :
"Réservation confirmée !"
→ "Un email de confirmation vous a été envoyé"
→ [Voir ma réservation] [Retour au dashboard]

Paiement accepté :
"Paiement accepté"
→ "Votre réservation est confirmée"
→ [Télécharger la facture]

Profil mis à jour :
"Modifications enregistrées"
→ Simple toast, auto-dismiss après 3s

Mot de passe réinitialisé :
"Email envoyé"
→ "Vérifiez votre boîte de réception"
```

---

## Accessibilité

### Standards WCAG 2.1 AA

**Objectif :** Application accessible à tous, y compris personnes en situation de handicap.

#### Contraste des Couleurs

**Ratios minimum requis :**

| Usage | Ratio | Couleurs VTC Rachel |
|-------|-------|---------------------|
| Texte normal (< 18px) | 4.5:1 | gray-900 sur white : 16:1 ✓ |
| Texte large (≥ 18px) | 3:1 | gray-600 sur white : 7:1 ✓ |
| Éléments UI (icônes, borders) | 3:1 | forest-green sur white : 6.5:1 ✓ |

**Vérification :**
- Utiliser [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/)
- Tester avec extension Chrome "WCAG Color contrast checker"

**Cas particuliers :**
- Or champagne sur blanc : 3.2:1 (OK pour texte large uniquement)
- Si utilisé pour texte petit → ajouter outline ou background foncé

---

#### Navigation Clavier

**Ordre de tabulation logique :**
1. Navigation principale
2. Contenu principal (skip link disponible)
3. Formulaires (ordre naturel de lecture)
4. Actions secondaires
5. Footer

**Skip Links :**
```tsx
<a 
  href="#main-content" 
  className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:bg-white focus:px-4 focus:py-2"
>
  Aller au contenu principal
</a>
```

**Focus Trap dans Modals :**
```tsx
// Utiliser Radix UI Dialog qui gère automatiquement
<Dialog.Root>
  <Dialog.Content>
    {/* Focus piégé ici, Tab circule uniquement dans modal */}
  </Dialog.Content>
</Dialog.Root>
```

---

#### ARIA Labels & Roles

**Landmarks HTML5 :**
```tsx
<header role="banner">
  <nav role="navigation" aria-label="Navigation principale">
  </nav>
</header>

<main role="main" id="main-content">
  {/* Contenu principal */}
</main>

<aside role="complementary" aria-label="Informations complémentaires">
</aside>

<footer role="contentinfo">
</footer>
```

**Boutons & Actions :**
```tsx
// Bouton avec texte visible : OK
<button>Réserver</button>

// Bouton icône seule : ARIA label obligatoire
<button aria-label="Fermer le modal">
  <X size={20} />
</button>

// Lien externe : indiquer
<a href="..." target="_blank" rel="noopener noreferrer">
  En savoir plus
  <span className="sr-only">(ouvre dans un nouvel onglet)</span>
</a>
```

**Formulaires :**
```tsx
// Labels explicites (pas de placeholder uniquement)
<label htmlFor="email" className="block mb-2">
  Adresse email
</label>
<input 
  id="email" 
  type="email"
  aria-required="true"
  aria-invalid={hasError}
  aria-describedby={hasError ? "email-error" : undefined}
/>
{hasError && (
  <p id="email-error" role="alert" className="text-error">
    L'email doit être au format nom@exemple.com
  </p>
)}
```

**Live Regions (pour updates dynamiques) :**
```tsx
// Notification toast
<div role="alert" aria-live="assertive" aria-atomic="true">
  Réservation confirmée !
</div>

// Chargement
<div role="status" aria-live="polite" aria-atomic="true">
  <Loader2 className="animate-spin" />
  <span>Chargement des réservations...</span>
</div>
```

---

#### Screen Readers

**Texte caché visuellement mais accessible :**
```css
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}

.sr-only:focus {
  position: static;
  width: auto;
  height: auto;
  padding: inherit;
  margin: inherit;
  overflow: visible;
  clip: auto;
  white-space: normal;
}
```

**Images :**
```tsx
// Image décorative
<img src="..." alt="" role="presentation" />

// Image informative
<img src="voiture.jpg" alt="Véhicule Mercedes Classe E noir, intérieur cuir beige" />

// Logo
<img src="logo.svg" alt="VTC Rachel - Retour à l'accueil" />
```

---

#### Mouvements & Animations

**Respecter `prefers-reduced-motion` :**

```css
/* Animations normales */
.card {
  transition: transform 0.2s ease-out;
}
.card:hover {
  transform: scale(1.02);
}

/* Désactiver pour utilisateurs sensibles */
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
  
  .card:hover {
    transform: none; /* Pas de scale */
  }
}
```

**En React :**
```tsx
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

<motion.div
  animate={{ scale: prefersReducedMotion ? 1 : 1.02 }}
  transition={{ duration: prefersReducedMotion ? 0 : 0.2 }}
>
```

---

## Responsive Design

### Breakpoints

```css
/* Mobile First approach */
/* Mobile : Default (< 640px) */

/* Tablet */
@media (min-width: 640px) { /* sm */ }
@media (min-width: 768px) { /* md */ }

/* Desktop */
@media (min-width: 1024px) { /* lg */ }
@media (min-width: 1280px) { /* xl */ }
@media (min-width: 1536px) { /* 2xl */ }
```

**Tailwind CSS équivalent :**
```tsx
<div className="
  w-full              // Mobile : full width
  sm:w-1/2            // Tablet : 50%
  lg:w-1/3            // Desktop : 33%
">
```

---

### Layout Responsive

**Container :**
```css
.container {
  width: 100%;
  padding-left: 1.5rem; /* 24px */
  padding-right: 1.5rem;
  margin: 0 auto;
}

@media (min-width: 640px) {
  .container { max-width: 640px; }
}
@media (min-width: 768px) {
  .container { max-width: 768px; }
}
@media (min-width: 1024px) {
  .container { max-width: 1024px; }
}
@media (min-width: 1280px) {
  .container { max-width: 1200px; }
}
```

**Grilles Responsive :**
```tsx
// Auto-responsive avec Tailwind
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  {/* Cards */}
</div>

// Ou avec CSS Grid natif
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
}
```

---

### Navigation Responsive

**Desktop :**
```tsx
<nav className="hidden lg:flex items-center gap-8">
  <a href="/tarifs">Tarifs</a>
  <a href="/about">À propos</a>
  <a href="/contact">Contact</a>
  <Button>Connexion</Button>
</nav>
```

**Mobile (Hamburger Menu) :**
```tsx
<Sheet>
  <SheetTrigger className="lg:hidden">
    <Menu size={24} />
  </SheetTrigger>
  <SheetContent side="right">
    <nav className="flex flex-col gap-6 mt-8">
      <a href="/tarifs">Tarifs</a>
      <a href="/about">À propos</a>
      <a href="/contact">Contact</a>
      <Button className="w-full">Connexion</Button>
    </nav>
  </SheetContent>
</Sheet>
```

---

### Typography Responsive

**Fluid Typography (avec clamp) :**
```css
/* Hero title : 40px mobile → 64px desktop */
.text-hero {
  font-size: clamp(2.5rem, 5vw, 4rem);
}

/* H1 : 32px mobile → 48px desktop */
.text-h1 {
  font-size: clamp(2rem, 4vw, 3rem);
}

/* Body : 14px mobile → 16px desktop */
.text-body {
  font-size: clamp(0.875rem, 1vw, 1rem);
}
```

**Tailwind CSS équivalent :**
```tsx
<h1 className="text-4xl sm:text-5xl lg:text-6xl">
  {/* 36px → 48px → 60px */}
</h1>
```

---

### Touch Targets (Mobile)

**Minimum 44x44px pour zone cliquable :**

```css
/* Boutons */
button {
  min-height: 44px;
  min-width: 44px;
  padding: 12px 24px;
}

/* Liens dans navigation */
nav a {
  padding: 12px 16px;
  display: inline-block;
}

/* Checkbox/Radio */
input[type="checkbox"],
input[type="radio"] {
  width: 24px;
  height: 24px;
  /* Avec padding autour pour atteindre 44px total */
}
```

---

### Images Responsive

**Next.js Image Component :**
```tsx
import Image from 'next/image';

<Image 
  src="/voiture.jpg"
  alt="Véhicule premium"
  width={1200}
  height={800}
  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
  priority={false} // true pour hero image
  quality={85}
/>
```

**Formats modernes automatiques :**
- Next.js convertit automatiquement en WebP/AVIF
- Lazy loading par défaut (sauf priority={true})
- Responsive srcset généré automatiquement

---

### Test Devices

**Résolutions à tester :**

| Device | Résolution | Breakpoint |
|--------|-----------|------------|
| iPhone SE | 375 × 667 | Mobile |
| iPhone 14 | 390 × 844 | Mobile |
| iPhone 14 Pro Max | 430 × 932 | Mobile |
| iPad Mini | 768 × 1024 | Tablet |
| iPad Pro | 1024 × 1366 | Tablet/Desktop |
| Laptop | 1280 × 720 | Desktop |
| Desktop | 1920 × 1080 | Desktop |

**Outils de test :**
- Chrome DevTools (Device Mode)
- BrowserStack (vrais devices)
- Responsively App (multi-screen)

---

## Front-End Specification Complète

**Ce que nous avons créé :**

### Design System
- Palette de couleurs (Vert forêt + Or champagne)
- Typographie (Inter + Playfair Display)
- Spacing, shadows, composants UI
- Iconographie Lucide

### Wireframes (5 écrans)
- Landing Page
- Formulaire de réservation (3 étapes)
- Dashboard client
- Détail réservation
- Dashboard admin Rachel

### Guidelines UX
- Micro-animations (durées, courbes)
- Tone of voice (messages, copy)
- Loading states (skeletons, spinners)
- Error handling (messages contextuels)
- Success states (célébrations)

### Accessibilité
- WCAG 2.1 AA conforme
- Navigation clavier complète
- ARIA labels appropriés
- Screen readers optimisés
- Respect prefers-reduced-motion

### Responsive Design
- Breakpoints mobile-first
- Layouts adaptatifs
- Typography fluide
- Touch targets optimisés
- Images responsive

**Ready pour le développement !**

---

*Document complet - Spécification Front-End finalisée*
