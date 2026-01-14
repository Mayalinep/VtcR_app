# Source Tree - VTC Rachel

<!-- Powered by BMAD™ Core -->

---

## Structure Actuelle du Projet

### Arborescence Complète

```
VtcR_app/
├── .bmad-core/                    # Méthodologie B-MAD
│   ├── agents/                    # Agents spécialisés
│   ├── tasks/                     # Tâches B-MAD
│   ├── templates/                 # Templates documents
│   └── core-config.yaml           # Configuration B-MAD
│
├── .cursor/                       # Règles Cursor IDE
│   └── rules/bmad/                # Agents B-MAD pour Cursor
│
├── app/                           # Application Next.js
│   ├── app/                       # App Router Next.js
│   │   ├── (marketing)/           # Pages publiques (route group)
│   │   │   ├── page.tsx          # Landing page (/)
│   │   │   ├── a-propos/         # Page À propos
│   │   │   ├── tarifs/           # Page Tarifs
│   │   │   ├── faq/              # Page FAQ
│   │   │   ├── contact/          # Page Contact
│   │   │   ├── cgv/              # Conditions Générales
│   │   │   ├── mentions-legales/ # Mentions légales
│   │   │   └── confidentialite/  # Politique confidentialité
│   │   │
│   │   ├── components/            # Composants React
│   │   │   ├── animations/       # FadeIn, FadeInSection
│   │   │   ├── forms/            # ContactForm, PriceEstimator
│   │   │   ├── layout/           # Navigation, Footer
│   │   │   ├── sections/         # Hero, CTASection, FAQ, Testimonials
│   │   │   ├── seo/              # StructuredData
│   │   │   └── ui/               # Badge, ScrollIndicator, etc.
│   │   │
│   │   ├── lib/                  # Utilitaires & Helpers
│   │   │   ├── data/             # Données statiques
│   │   │   │   ├── faq.ts
│   │   │   │   ├── testimonials.ts
│   │   │   │   ├── pricing.ts
│   │   │   │   ├── zones.ts
│   │   │   │   └── features.tsx
│   │   │   ├── seo/              # SEO helpers
│   │   │   │   └── schema.ts
│   │   │   └── utils/            # Utilitaires
│   │   │       ├── constants.ts
│   │   │       ├── format.ts
│   │   │       └── validation.ts
│   │   │
│   │   ├── types/                # TypeScript types
│   │   │   └── index.ts
│   │   │
│   │   ├── layout.tsx            # Root layout
│   │   ├── globals.css           # Styles globaux Tailwind
│   │   ├── robots.ts             # robots.txt généré
│   │   └── sitemap.ts            # sitemap.xml généré
│   │
│   ├── public/                   # Assets statiques
│   │   └── images/
│   │       ├── vtc-rachel-car.png
│   │       └── tarif/
│   │
│   ├── package.json
│   ├── tsconfig.json
│   ├── next.config.ts
│   ├── postcss.config.mjs
│   ├── eslint.config.mjs
│   └── .env.local                # Variables d'environnement (ignoré Git)
│
├── docs/                          # Documentation projet
│   ├── prd/                       # PRD shardé (Epics)
│   │   ├── epic-1-foundation-infrastructure.md
│   │   ├── epic-2-authentication-user-management.md
│   │   ├── epic-3-booking-system-core.md
│   │   ├── epic-4-payment-integration.md
│   │   ├── epic-5-admin-dashboard-rachel.md
│   │   ├── epic-6-notifications-communications.md
│   │   ├── epic-7-polish-performance-launch.md
│   │   └── index.md
│   │
│   ├── architecture/              # Architecture shardée
│   │   ├── vue-densemble.md
│   │   ├── base-de-donnes.md
│   │   ├── architecture-api.md
│   │   ├── scurit.md
│   │   ├── infrastructure.md
│   │   ├── coding-standards.md   # ✅ Créé
│   │   ├── tech-stack.md         # ✅ Créé
│   │   ├── source-tree.md        # ✅ Ce fichier
│   │   └── index.md
│   │
│   ├── brief.md                  # Project Brief
│   ├── prd.md                    # PRD complet (original)
│   ├── architecture.md            # Architecture complète (original)
│   ├── front-end-spec.md         # Spécifications UI/UX
│   ├── questions-rachel.md       # Questions pour Rachel
│   ├── reponses-provisoires.md   # Réponses par défaut
│   └── SEO-GUIDE.md              # Guide SEO
│
└── README.md                      # Documentation projet
```

---

## Structure Cible (Backend à créer)

### À Ajouter dans `app/app/`

```
app/app/
├── (app)/                         # App authentifiée (route group)
│   ├── layout.tsx                # Layout avec navigation app
│   ├── dashboard/
│   │   └── page.tsx              # Dashboard client
│   ├── book/                     # Nouvelle réservation
│   │   ├── page.tsx              # Formulaire multi-étapes
│   │   └── confirm/
│   │       └── page.tsx          # Confirmation
│   ├── bookings/                 # Historique réservations
│   │   ├── page.tsx              # Liste
│   │   └── [id]/
│   │       └── page.tsx          # Détail réservation
│   └── profile/                  # Profil utilisateur
│       ├── page.tsx
│       ├── addresses/
│       │   └── page.tsx          # Adresses favorites
│       └── payment/
│           └── page.tsx          # Moyens de paiement
│
├── (admin)/                      # Interface admin Rachel
│   ├── layout.tsx
│   ├── dashboard/
│   │   └── page.tsx              # Dashboard admin
│   ├── bookings/
│   │   ├── page.tsx              # Toutes réservations
│   │   └── [id]/
│   │       └── page.tsx          # Détail réservation
│   ├── clients/
│   │   └── page.tsx              # Liste clients
│   └── settings/
│       └── page.tsx              # Paramètres
│
├── api/                          # API Routes (Backend)
│   ├── auth/
│   │   ├── register/
│   │   │   └── route.ts          # POST /api/auth/register
│   │   ├── login/
│   │   │   └── route.ts          # POST /api/auth/login
│   │   ├── logout/
│   │   │   └── route.ts          # POST /api/auth/logout
│   │   └── reset-password/
│   │       └── route.ts          # POST /api/auth/reset-password
│   │
│   ├── bookings/
│   │   ├── route.ts              # GET, POST /api/bookings
│   │   ├── [id]/
│   │   │   ├── route.ts          # GET, PATCH, DELETE
│   │   │   └── cancel/
│   │   │       └── route.ts      # POST /api/bookings/[id]/cancel
│   │   ├── availability/
│   │   │   └── route.ts          # POST /api/bookings/availability
│   │   └── estimate/
│   │       └── route.ts          # POST /api/bookings/estimate
│   │
│   ├── payments/
│   │   ├── create-intent/
│   │   │   └── route.ts          # POST /api/payments/create-intent
│   │   ├── confirm/
│   │   │   └── route.ts          # POST /api/payments/confirm
│   │   └── webhooks/
│   │       └── route.ts          # POST /api/payments/webhooks
│   │
│   ├── users/
│   │   ├── profile/
│   │   │   └── route.ts          # GET, PATCH /api/users/profile
│   │   └── addresses/
│   │       ├── route.ts          # GET, POST
│   │       └── [id]/
│   │           └── route.ts      # PATCH, DELETE
│   │
│   ├── admin/
│   │   ├── dashboard/
│   │   │   └── route.ts          # GET /api/admin/dashboard
│   │   ├── bookings/
│   │   │   ├── route.ts          # GET /api/admin/bookings
│   │   │   └── [id]/
│   │   │       ├── confirm/
│   │   │       │   └── route.ts
│   │   │       └── reject/
│   │   │           └── route.ts
│   │   ├── availability/
│   │   │   ├── route.ts          # GET, POST
│   │   │   └── [id]/
│   │   │       └── route.ts      # PATCH, DELETE
│   │   └── export/
│   │       └── route.ts          # GET /api/admin/export
│   │
│   └── maps/
│       ├── geocode/
│       │   └── route.ts          # POST /api/maps/geocode
│       ├── distance/
│       │   └── route.ts          # POST /api/maps/distance
│       └── autocomplete/
│           └── route.ts          # GET /api/maps/autocomplete
│
├── lib/
│   ├── supabase/                 # Supabase client & helpers
│   │   ├── client.ts             # Client Supabase (browser)
│   │   ├── server.ts             # Client Supabase (server)
│   │   └── types.ts              # Types générés Supabase
│   │
│   ├── stripe/                   # Stripe helpers
│   │   ├── client.ts             # Client Stripe
│   │   └── webhooks.ts           # Webhook handlers
│   │
│   ├── maps/                     # Google Maps helpers
│   │   ├── places.ts             # Places API
│   │   ├── distance.ts           # Distance Matrix API
│   │   └── geocoding.ts          # Geocoding API
│   │
│   ├── email/                    # Email helpers
│   │   ├── client.ts             # Resend client
│   │   └── templates/            # React Email templates
│   │       ├── booking-confirmation.tsx
│   │       ├── booking-reminder.tsx
│   │       └── invoice.tsx
│   │
│   ├── validations/              # Zod schemas
│   │   ├── booking.ts
│   │   ├── user.ts
│   │   └── payment.ts
│   │
│   └── middleware/               # Middleware helpers
│       ├── auth.ts               # requireAuth, requireAdmin
│       └── rate-limit.ts         # Rate limiting
│
├── hooks/                        # Custom React hooks
│   ├── useAuth.ts
│   ├── useBooking.ts
│   └── useMaps.ts
│
└── store/                        # Zustand stores (optionnel)
    ├── authStore.ts
    └── bookingStore.ts
```

---

## Organisation des Composants

### Structure `components/`

```
components/
├── ui/                           # Composants UI de base (ShadCN)
│   ├── Button.tsx
│   ├── Input.tsx
│   ├── Card.tsx
│   └── ...
│
├── features/                     # Composants métier
│   ├── booking/
│   │   ├── BookingForm.tsx
│   │   ├── BookingSteps.tsx
│   │   ├── AddressInput.tsx      # Avec Google Places
│   │   ├── DatePicker.tsx
│   │   └── PriceDisplay.tsx
│   │
│   ├── maps/
│   │   ├── MapView.tsx
│   │   └── RouteDisplay.tsx
│   │
│   ├── payment/
│   │   ├── StripeCheckout.tsx
│   │   └── PaymentMethods.tsx
│   │
│   └── auth/
│       ├── LoginForm.tsx
│       ├── SignUpForm.tsx
│       └── PasswordResetForm.tsx
│
├── layout/                       # Layout components
│   ├── Navigation.tsx            # ✅ Existe
│   ├── Footer.tsx                # ✅ Existe
│   ├── AppNavigation.tsx         # Navigation app authentifiée
│   └── AdminSidebar.tsx          # Sidebar admin
│
├── sections/                     # Sections marketing
│   ├── Hero.tsx                  # ✅ Existe
│   ├── CTASection.tsx            # ✅ Existe
│   ├── FAQ.tsx                   # ✅ Existe
│   └── Testimonials.tsx          # ✅ Existe
│
└── animations/                   # Animations
    ├── FadeIn.tsx                # ✅ Existe
    └── FadeInSection.tsx         # ✅ Existe
```

---

## Fichiers de Configuration

### Root Level

```
VtcR_app/
├── .gitignore                    # Fichiers ignorés Git
├── .env.local                    # Variables d'environnement (SECRET)
├── .env.example                  # Template env vars (sans valeurs)
├── README.md                     # Documentation projet
└── package.json                  # Dependencies root (si monorepo)
```

### App Level (`app/`)

```
app/
├── .env.local                    # Env vars app
├── .env.example                  # Template
├── next.config.ts                # Config Next.js
├── tsconfig.json                 # Config TypeScript
├── tailwind.config.ts            # Config Tailwind
├── postcss.config.mjs            # Config PostCSS
├── eslint.config.mjs              # Config ESLint
└── .gitignore                    # Ignore .next/, node_modules/
```

---

## Conventions de Nommage

### Fichiers

- **Pages :** `page.tsx`, `layout.tsx`, `route.ts`
- **Composants :** `PascalCase.tsx` (ex: `BookingForm.tsx`)
- **Utils :** `camelCase.ts` (ex: `formatPrice.ts`)
- **Types :** `camelCase.ts` (ex: `booking.ts`)
- **Hooks :** `useCamelCase.ts` (ex: `useAuth.ts`)

### Dossiers

- **Route groups :** `(marketing)`, `(app)`, `(admin)`
- **Dynamic routes :** `[id]`, `[slug]`
- **Composants :** `kebab-case` ou `PascalCase`

---

## Fichiers à Créer (Backend)

### Priorité 1 : Foundation

```
app/app/
├── lib/supabase/
│   ├── client.ts                 # Client browser
│   └── server.ts                 # Client server
│
├── lib/validations/
│   ├── booking.ts                # Zod schemas booking
│   └── user.ts                   # Zod schemas user
│
├── api/auth/
│   └── login/
│       └── route.ts              # Premier endpoint
│
└── middleware.ts                 # Next.js middleware (auth)
```

### Priorité 2 : Booking System

```
app/app/
├── lib/maps/
│   ├── places.ts
│   └── distance.ts
│
├── api/bookings/
│   ├── route.ts
│   └── estimate/
│       └── route.ts
│
└── components/features/booking/
    └── BookingForm.tsx
```

---

## Summary

**Structure actuelle :**
- ✅ Frontend marketing complet (8 pages)
- ✅ Composants réutilisables organisés
- ✅ Données extraites dans `lib/data/`
- ✅ SEO configuré

**À créer (Backend) :**
- ❌ API Routes (`app/api/`)
- ❌ Supabase client (`lib/supabase/`)
- ❌ Pages app authentifiée (`app/(app)/`)
- ❌ Pages admin (`app/(admin)/`)
- ❌ Composants métier (`components/features/`)

**Organisation :**
- Route groups pour séparer marketing/app/admin
- Composants par feature (booking, payment, auth)
- Utils par domaine (supabase, stripe, maps)

---

*Document créé le : 2026-01-13*  
*Version : 1.0*
