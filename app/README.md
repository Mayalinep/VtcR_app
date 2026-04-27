# VTC Rachel - Application Web

Application de réservation VTC premium pour l'Île-de-France.

---

## 📚 Table des matières

- [Stack Technique](#-stack-technique)
- [Architecture](#-architecture)
- [Composants](#-composants)
- [Design System](#-design-system)
- [Conventions](#-conventions)
- [Scripts](#-scripts)
- [Déploiement](#-déploiement)

---

## 🛠 Stack Technique

- **Framework** : Next.js 14 (App Router)
- **Language** : TypeScript (strict mode)
- **Styling** : Tailwind CSS
- **Animations** : Framer Motion
- **Backend** : Supabase (à venir)
- **Paiement** : Stripe (à venir)
- **Maps** : Google Maps Platform (à venir)
- **Hosting** : Vercel

---

## 📁 Architecture

```
/app
  /components        # Composants réutilisables
    FadeIn.tsx       # Animation au chargement
    FadeInSection.tsx # Animation au scroll
    Navigation.tsx   # Barre de navigation
    PriceEstimator.tsx # Estimateur de prix
    PulseCTA.tsx     # Bouton CTA animé
    ScrollIndicator.tsx # Flèche de scroll
  
  layout.tsx         # Layout racine (fonts, metadata)
  page.tsx           # Page d'accueil (Landing)
  globals.css        # Styles globaux + variables CSS
```

---

## 🧩 Composants

### **Navigation**
Barre de navigation responsive avec menu hamburger.

```tsx
<Navigation />
```

**Features** :
- Fixed top
- Desktop : Logo + liens + bouton CTA
- Mobile : Hamburger menu avec slide-down animé

---

### **FadeIn**
Animation de fade-in au chargement de la page.

```tsx
<FadeIn delay={0.4}>
  <h1>Titre</h1>
</FadeIn>
```

**Props** :
- `children` : Contenu à animer
- `delay` : Délai en secondes (défaut: 0)
- `className` : Classes CSS additionnelles

**Usage** : Éléments du Hero qui s'animent immédiatement.

---

### **FadeInSection**
Animation de fade-in déclenchée par le scroll.

```tsx
<FadeInSection delay={0.2}>
  <section>Contenu</section>
</FadeInSection>
```

**Props** :
- `children` : Contenu à animer
- `delay` : Délai en secondes (défaut: 0)
- `className` : Classes CSS additionnelles

**Usage** : Sections après le Hero (détecte si l'utilisateur a scrollé).

---

### **PulseCTA**
Bouton CTA avec animation pulse subtile.

```tsx
<PulseCTA
  className="px-10 py-4 rounded-lg font-semibold text-white"
  style={{ backgroundColor: 'var(--forest-green)' }}
>
  Réserver maintenant
</PulseCTA>
```

**Props** :
- `children` : Texte du bouton
- `className` : Classes Tailwind
- `style` : Styles inline
- `onClick` : Handler de clic

**Features** :
- Animation pulse sur l'ombre (2s loop)
- Hover scale (1.05)
- Tap scale (0.95)

---

### **ScrollIndicator**
Flèche animée pour inciter au scroll.

```tsx
<ScrollIndicator />
```

**Features** :
- Animation bounce (y: 0 → 8 → 0)
- Cliquable (scroll auto vers section suivante)
- Apparaît après 1.6s

---

### **PriceEstimator**
Estimateur de prix de course VTC.

```tsx
<PriceEstimator />
```

**Features** :
- 2 inputs (départ/arrivée) avec focus states élégants
- Loader pendant calcul (0.5s)
- Animation du prix (compteur 0€ → prix final)
- Bouton CTA pour réserver

**Note** : Utilise actuellement un calcul fictif (45-85€).  
À remplacer par **Google Distance Matrix API** en production.

---

## 🎨 Design System

### **Couleurs (CSS Variables)**

Définies dans `globals.css` :

```css
--forest-green: #0F4C3A       /* Couleur principale */
--forest-green-light: #16A34A
--forest-green-dark: #0A3428

--gold-champagne: #D4AF37      /* Couleur secondaire */
--gold-light: #F5E6D3
--gold-dark: #B8941F

--background: #ffffff
--foreground: #0F172A
```

**Usage** :
```tsx
style={{ backgroundColor: 'var(--forest-green)' }}
style={{ color: 'var(--gold-champagne)' }}
```

---

### **Typographie**

- **Sans-serif** : Inter (body text)
- **Serif** : Playfair Display (titres, prix)

**Usage** :
```tsx
style={{ fontFamily: 'var(--font-playfair)' }}
```

---

### **Breakpoints Tailwind**

- `sm` : 640px
- `md` : 768px
- `lg` : 1024px
- `xl` : 1280px

**Exemple** :
```tsx
className="text-4xl sm:text-5xl lg:text-7xl"
```

---

### **Animations**

**Durées standard** :
- Rapide : `duration-200` (hover, tap)
- Normal : `duration-300` (transitions)
- Lent : `duration-500` (fade-in)

**Easing** :
- Framer Motion : `[0.16, 1, 0.3, 1]` (cubic-bezier élégant)

---

## 📐 Conventions

### **Composants**

1. Toujours ajouter `'use client'` si utilise React hooks ou Framer Motion
2. Utiliser TypeScript avec interfaces pour les props
3. Ajouter JSDoc pour la documentation
4. Naming : PascalCase pour les composants

### **Styles**

1. Tailwind CSS en priorité
2. Variables CSS pour les couleurs de marque
3. Classes utilitaires pour le responsive
4. Éviter les styles inline sauf pour les couleurs custom

### **Animations**

1. `FadeIn` pour le Hero (animation immédiate)
2. `FadeInSection` pour les sections (animation au scroll)
3. Délais échelonnés pour éviter les animations simultanées
4. Toujours tester en `prefers-reduced-motion`

---

## 🚀 Scripts

```bash
# Développement
npm run dev

# Build production
npm run build

# Démarrer en production
npm start

# Linter
npm run lint
```

---

## 🌍 Déploiement

### **Vercel (recommandé)**

1. Connecter le repo GitHub
2. Vercel détecte automatiquement Next.js
3. Deploy automatique à chaque push sur `main`

### **Variables d'environnement (à configurer)**

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=

# Stripe
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=
STRIPE_SECRET_KEY=

# Google Maps
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=
```

---

## 📝 Notes pour les devs

### **Estimateur de prix**

Actuellement, le calcul est **fictif** (45-85€ aléatoire).

**Pour intégrer l'API Google** :

1. Activer **Distance Matrix API** dans Google Cloud Console
2. Créer une route API Next.js : `/app/api/estimate/route.ts`
3. Remplacer `calculatePrice()` dans `PriceEstimator.tsx`

**Exemple de calcul réel** :
```typescript
const baseRate = 2; // €/km
const minimumFare = 35; // €
const distance = await getDistanceFromGoogleAPI(departure, arrival);
const price = Math.max(minimumFare, distance * baseRate);
```

### **Pattern géométrique du Hero**

Le Hero utilise un pattern SVG inline (lignes diagonales).  
Source : [Hero Patterns](https://heropatterns.com/)

Pour changer :
1. Aller sur Hero Patterns
2. Choisir un pattern
3. Définir la couleur `#0F4C3A` et opacité `0.02`
4. Copier le code dans `page.tsx` (ligne 17)

---

## 🔒 Sécurité

- Toujours valider les inputs côté serveur
- Utiliser HTTPS en production
- Ne jamais exposer les clés secrètes (Stripe, Supabase)
- Implémenter CSRF protection (inclus dans Next.js)

---

## 📚 Ressources

- [Docs Next.js](https://nextjs.org/docs)
- [Docs Framer Motion](https://www.framer.com/motion/)
- [Docs Tailwind CSS](https://tailwindcss.com/docs)
- [PRD complet](../docs/prd.md)
- [Front-End Spec](../docs/front-end-spec.md)

---

**Maintenu par** : VTC Rachel Team  
**Statut de mise à jour** : En cours
