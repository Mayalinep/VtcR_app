# Tech Stack - VTC Rachel

<!-- Powered by BMAD™ Core -->

---

## Vue d'Ensemble

**Type :** Fullstack Monorepo Next.js  
**Architecture :** Serverless (Vercel) + Managed Database (Supabase)  
**Budget :** 0€/mois au démarrage (tiers gratuits)

---

## Frontend

### Framework Core

**Next.js 16.1.1** (App Router)
- ✅ Server Components par défaut (performance, SEO)
- ✅ Server Actions pour mutations type-safe
- ✅ API Routes pour endpoints REST
- ✅ Image optimization automatique
- ✅ Font optimization (next/font)
- ✅ Metadata API pour SEO

**React 19.2.3**
- ✅ Server Components
- ✅ Client Components (`'use client'`)
- ✅ Hooks standards (useState, useEffect, etc.)

### Styling

**Tailwind CSS 4.x**
- ✅ Utility-first CSS
- ✅ Responsive design mobile-first
- ✅ Dark mode ready (si besoin futur)
- ✅ Custom colors définis (forest-green, gold-champagne)

**PostCSS** (via `@tailwindcss/postcss`)
- ✅ Processing CSS

### Animations

**Framer Motion 12.25.0**
- ✅ Animations fluides
- ✅ Transitions page
- ✅ Micro-interactions
- ✅ Performance optimisée (60 FPS)

### UI Components

**ShadCN UI** (à installer)
- ✅ Composants accessibles
- ✅ Personnalisables
- ✅ TypeScript natif

**Aceternity UI** (optionnel)
- ✅ Animations spectaculaires
- ✅ Effets visuels premium

---

## Backend

### Database

**Supabase (PostgreSQL 15+)**
- ✅ Database managée PostgreSQL
- ✅ Row Level Security (RLS)
- ✅ Auth intégrée (email, OAuth)
- ✅ Storage pour fichiers
- ✅ Realtime subscriptions (optionnel)
- ✅ Dashboard admin intégré

**ORM/Client :**
- Supabase Client TypeScript (type-safe, généré automatiquement)

### Authentication

**Supabase Auth**
- ✅ Email/Password
- ✅ OAuth Google Sign-In
- ✅ OAuth Apple Sign-In
- ✅ Magic Links (optionnel)
- ✅ JWT tokens (access + refresh)
- ✅ Session management

---

## Services Externes

### Paiements

**Stripe**
- ✅ Checkout Sessions
- ✅ Payment Intents
- ✅ Webhooks (événements paiement)
- ✅ Apple Pay / Google Pay
- ✅ PCI-DSS compliant (pas de stockage CB)

**Fonctionnalités :**
- Paiement immédiat ou différé
- Remboursements automatiques
- Factures PDF générées

### Maps & Géolocalisation

**Google Maps Platform**
- ✅ Places API (autocomplétion adresses)
- ✅ Distance Matrix API (calcul distance/temps)
- ✅ Geocoding API (adresse → coordonnées)
- ✅ Maps JavaScript API (cartes interactives)

**Quotas gratuits :**
- 200$/mois crédits gratuits (~28k requêtes)

### Emails

**Resend**
- ✅ API moderne pour emails transactionnels
- ✅ React Email templates
- ✅ 100 emails/jour gratuits
- ✅ Taux de délivrabilité élevé

**Templates :**
- Confirmation réservation
- Rappels (24h, 2h avant)
- Annulation/modification
- Factures PDF

### Rate Limiting

**Upstash Redis** (optionnel)
- ✅ Rate limiting distribué
- ✅ Protection DDoS
- ✅ Limites par endpoint

---

## Infrastructure

### Hosting

**Vercel**
- ✅ Edge Network (300+ locations)
- ✅ Serverless Functions
- ✅ CDN global
- ✅ HTTPS automatique
- ✅ Preview deployments (par branche)
- ✅ Analytics inclus

**Tier :** Hobby (gratuit)
- 100 GB bandwidth/mois
- Build time illimité
- Serverless functions : 100h/mois

### DNS & Domaine

**Cloudflare** (recommandé)
- ✅ DNS gratuit
- ✅ Protection DDoS
- ✅ Performance (CDN)

**Domaine :**
- À acquérir (~10-15€/an)
- Exemple : `vtcrachel.fr`

---

## Development Tools

### Language & Type Checking

**TypeScript 5.x**
- ✅ Strict mode activé
- ✅ Type-safety totale
- ✅ IntelliSense complet

**ESLint 9.x**
- ✅ `eslint-config-next` (règles Next.js)
- ✅ Linting automatique

### Package Manager

**npm** (ou **pnpm** si préféré)
- ✅ Gestion dépendances
- ✅ Scripts package.json

### Version Control

**Git + GitHub**
- ✅ Repository privé
- ✅ Conventional Commits
- ✅ Branches : `main`, `develop`, `feature/*`

---

## Testing (À configurer)

### Unit Tests

**Vitest** (recommandé)
- ✅ Rapide (Vite-based)
- ✅ Compatible Jest API
- ✅ Coverage reports

**React Testing Library**
- ✅ Tests composants
- ✅ Accessibilité

### E2E Tests (Optionnel post-MVP)

**Playwright**
- ✅ Tests navigateur
- ✅ Parcours critiques (réservation, paiement)

### Mocking

**MSW (Mock Service Worker)**
- ✅ Mock APIs externes (Google Maps, Stripe)
- ✅ Tests isolés

---

## Monitoring & Analytics

### Performance

**Vercel Analytics** (inclus)
- ✅ Web Vitals (FCP, LCP, CLS)
- ✅ Page views
- ✅ Real User Monitoring

### Error Tracking

**Sentry** (optionnel)
- ✅ Error tracking production
- ✅ Stack traces
- ✅ Alertes

### Logs

**Console logs structurés**
- ✅ JSON format en production
- ✅ Supabase logs (queries, auth)

---

## Environment Variables

### Structure `.env.local`

```bash
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
SUPABASE_SERVICE_ROLE_KEY=eyJ... # SECRET (serveur uniquement)

# Stripe
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_... # SECRET (serveur uniquement)
STRIPE_WEBHOOK_SECRET=whsec_... # SECRET (serveur uniquement)

# Google Maps
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=AIza...

# Resend
RESEND_API_KEY=re_... # SECRET (serveur uniquement)

# Upstash Redis (optionnel)
UPSTASH_REDIS_URL=https://...
UPSTASH_REDIS_TOKEN=... # SECRET

# App
NEXT_PUBLIC_APP_URL=https://vtcrachel.fr
```

**Règles :**
- ✅ `NEXT_PUBLIC_*` = Exposé côté client (peut être vu dans le code)
- ✅ Sans préfixe = Secret serveur uniquement (jamais exposé)
- ✅ `.env.local` dans `.gitignore` (jamais commité)

---

## Versions Actuelles

### Dependencies (package.json)

```json
{
  "dependencies": {
    "framer-motion": "^12.25.0",
    "next": "16.1.1",
    "react": "19.2.3",
    "react-dom": "19.2.3"
  },
  "devDependencies": {
    "@tailwindcss/postcss": "^4",
    "@types/node": "^20",
    "@types/react": "^19",
    "@types/react-dom": "^19",
    "eslint": "^9",
    "eslint-config-next": "16.1.1",
    "tailwindcss": "^4",
    "typescript": "^5"
  }
}
```

### À Installer (Backend)

```bash
# Supabase
npm install @supabase/supabase-js @supabase/ssr

# Stripe
npm install stripe @stripe/stripe-js

# Google Maps
npm install @react-google-maps/api

# Resend
npm install resend react-email

# Validation
npm install zod

# State Management (optionnel)
npm install zustand

# Forms
npm install react-hook-form @hookform/resolvers
```

---

## Configuration Files

### next.config.ts

```typescript
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    domains: ['maps.googleapis.com'],
    formats: ['image/avif', 'image/webp'],
  },
  // PWA (à configurer)
  // ...
};

export default nextConfig;
```

### tsconfig.json

```json
{
  "compilerOptions": {
    "strict": true,
    "paths": {
      "@/*": ["./*"]
    }
  }
}
```

### tailwind.config.ts

```typescript
import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'forest-green': '#0F4C3A',
        'gold-champagne': '#D4AF37',
        // ...
      },
    },
  },
};

export default config;
```

---

## Coûts & Scaling

### Tiers Gratuits (0€/mois)

**Vercel Hobby :**
- 100 GB bandwidth/mois
- Serverless functions : 100h/mois

**Supabase Free :**
- 500 MB database
- 2 GB bandwidth/mois
- 50k requêtes auth/mois

**Google Maps :**
- 200$/mois crédits gratuits (~28k requêtes)

**Resend :**
- 100 emails/jour gratuits

### Scaling (Si > 500 réservations/mois)

**Supabase Pro :** 25$/mois
- 8 GB database
- 50 GB bandwidth

**Vercel Pro :** 20$/mois
- 1 TB bandwidth
- Analytics avancées

**Total scaling :** ~45$/mois (largement couvert par CA)

---

## Summary

**Stack complète :**
- Frontend : Next.js 16 + React 19 + Tailwind CSS 4
- Backend : Next.js API Routes + Supabase
- Database : PostgreSQL (Supabase)
- Auth : Supabase Auth
- Paiements : Stripe
- Maps : Google Maps Platform
- Emails : Resend
- Hosting : Vercel
- Monitoring : Vercel Analytics

**Budget :** 0€/mois au démarrage (domaine ~15€/an)

**Scalabilité :** Jusqu'à 10k+ utilisateurs sans changement d'architecture

---

*Document créé le : 2026-01-13*  
*Version : 1.0*
