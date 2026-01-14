# Technical Assumptions

## Repository Structure

**Type : Monorepo Next.js Fullstack**

```
/vtc-rachel
  ├── /app                          # Next.js App Router
  │   ├── /(marketing)              # Pages publiques (route group)
  │   │   ├── page.tsx              # Landing page (/)
  │   │   ├── about/page.tsx        # À propos
  │   │   ├── pricing/page.tsx      # Tarifs
  │   │   ├── faq/page.tsx          # FAQ
  │   │   ├── contact/page.tsx      # Contact
  │   │   └── legal/                # Pages légales
  │   │       ├── terms/page.tsx
  │   │       ├── privacy/page.tsx
  │   │       └── cookies/page.tsx
  │   │
  │   ├── /(app)                    # App authentifiée (route group)
  │   │   ├── layout.tsx            # Layout avec navigation app
  │   │   ├── dashboard/page.tsx    # Dashboard client
  │   │   ├── book/                 # Nouvelle réservation
  │   │   │   ├── page.tsx          # Formulaire
  │   │   │   └── confirm/page.tsx  # Confirmation
  │   │   ├── bookings/             # Historique
  │   │   │   ├── page.tsx          # Liste
  │   │   │   └── [id]/page.tsx     # Détail
  │   │   └── profile/              # Profil
  │   │       ├── page.tsx
  │   │       ├── addresses/page.tsx
  │   │       └── payment/page.tsx
  │   │
  │   ├── /(admin)                  # Interface admin Rachel
  │   │   ├── layout.tsx
  │   │   ├── dashboard/page.tsx
  │   │   ├── bookings/page.tsx
  │   │   ├── clients/page.tsx
  │   │   └── settings/page.tsx
  │   │
  │   ├── /api                      # API Routes
  │   │   ├── auth/                 # Authentication
  │   │   ├── bookings/             # CRUD réservations
  │   │   ├── pricing/              # Calcul prix
  │   │   ├── stripe/               # Webhooks Stripe
  │   │   └── maps/                 # Proxy Google Maps
  │   │
  │   ├── layout.tsx                # Root layout
  │   └── globals.css               # Styles globaux Tailwind
  │
  ├── /components
  │   ├── /ui                       # ShadCN UI components
  │   ├── /features                 # Feature components
  │   │   ├── /booking
  │   │   ├── /maps
  │   │   ├── /payment
  │   │   └── /auth
  │   ├── /layout                   # Layout components
  │   └── /marketing                # Marketing components
  │
  ├── /lib
  │   ├── /supabase                 # Supabase client & helpers
  │   ├── /stripe                   # Stripe client & helpers
  │   ├── /maps                     # Google Maps helpers
  │   ├── /email                    # Email templates & sender
  │   ├── /utils                    # Utilities génériques
  │   └── /validations              # Zod schemas
  │
  ├── /types                        # TypeScript types/interfaces
  │   ├── database.ts               # Supabase generated types
  │   ├── booking.ts
  │   ├── user.ts
  │   └── index.ts
  │
  ├── /public                       # Static assets
  │   ├── /images
  │   ├── /icons
  │   └── manifest.json             # PWA manifest
  │
  ├── /hooks                        # Custom React hooks
  ├── /store                        # Zustand stores
  ├── /config                       # App configuration
  ├── /middleware.ts                # Next.js middleware (auth, etc.)
  ├── next.config.js
  ├── tailwind.config.ts
  ├── tsconfig.json
  ├── package.json
  └── .env.local                    # Environment variables
```

## Service Architecture

**Type : Monolithe Next.js modulaire (Full-Stack)**

**Frontend (Next.js Client) :**
- Server Components par défaut (performance, SEO)
- Client Components pour interactivité (`'use client'`)
- Server Actions pour mutations type-safe
- API Routes pour endpoints REST tiers (webhooks, proxies)

**Backend (Next.js API + Supabase) :**
- Supabase PostgreSQL : Database principale
- Supabase Auth : Gestion authentification
- Supabase Storage : Fichiers (avatars, factures)
- Row Level Security (RLS) : Sécurité granulaire données

**Modules métier :**
```
Auth Module         → Supabase Auth (email, OAuth Google/Apple)
Users Module        → CRUD profils, préférences
Bookings Module     → CRUD réservations, calcul prix, disponibilités
Payments Module     → Stripe integration, webhooks, factures
Maps Module         → Google Maps API (Places, Distance Matrix)
Notifications Module → Resend (emails transactionnels)
Admin Module        → Dashboard Rachel, stats, gestion
```

**Data Flow Exemple (Nouvelle réservation) :**
```
1. Client remplit formulaire (Client Component)
2. Appel Server Action `createBooking()`
3. Server Action valide données (Zod)
4. Server Action appelle Google Maps API (calcul trajet/prix)
5. Server Action insère en DB Supabase
6. Server Action déclenche email confirmation (Resend)
7. Retour succès au Client
8. Client redirige vers page confirmation
```

## Testing Requirements

**Niveau testing :**
- Unit tests : Critique (fonctions utils, calcul prix, validations)
- Integration tests : Important (API routes, Server Actions)
- E2E tests : Optionnel MVP (Playwright pour parcours critiques)

**Outils :**
- **Vitest** : Tests unitaires (rapide, moderne)
- **React Testing Library** : Tests composants
- **Playwright** : E2E (optionnel post-MVP)
- **MSW** : Mock API externe (Google Maps, Stripe)

**Coverage cible :**
- Logique métier critique : > 80%
- Composants UI : > 50%
- Overall : > 70%

**CI/CD :**
- GitHub Actions : Tests auto sur chaque PR
- Vercel : Preview deployments par branche
- Production : Deploy auto sur merge main (après tests green)

## Additional Technical Assumptions

**Environment Variables :**
```
# Supabase
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=

# Stripe
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=

# Google Maps
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=

# Resend
RESEND_API_KEY=

# App
NEXT_PUBLIC_APP_URL=
```

**Monitoring & Logging :**
- **Vercel Analytics** : Performance monitoring (inclus)
- **Sentry** : Error tracking (tier gratuit, optionnel)
- **Console logs** : Structurés JSON en production
- **Supabase Logs** : Queries lentes, erreurs DB

**Backup & Recovery :**
- Supabase : Backups quotidiens automatiques (7 jours rétention gratuit)
- Code : GitHub (historique complet)
- Env vars : Vercel encrypted + documentation locale

**SEO & Meta :**
- `metadata` object dans chaque page (Next.js 14)
- Dynamic OG images (next/og)
- Sitemap auto-généré
- robots.txt configuré

**Internationalization :**
- MVP : Français uniquement
- Structure préparée pour i18n future (next-intl)

**Analytics :**
- Vercel Analytics (Web Vitals)
- Google Analytics 4 (optionnel)
- Plausible (alternative privacy-friendly)

---
