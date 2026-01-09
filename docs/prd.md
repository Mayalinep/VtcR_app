# VTC Rachel - Product Requirements Document (PRD)

<!-- Powered by BMAD™ Core -->

---

## Goals and Background Context

### Goals

- Permettre à Rachel de **se détacher d'Uber** et retrouver son indépendance professionnelle
- Réduire le volume de courses (de X/jour à 5-10 premium/jour) tout en **augmentant la rentabilité** (élimination commission 25%)
- Offrir aux clients une **expérience de réservation moderne, fluide et impressionnante** visuellement
- Établir une **relation client directe** permettant fidélisation et personnalisation du service
- Créer une **base pour montée en gamme** vers clientèle premium (affaires, aéroports, événements)
- Poser les **fondations d'une petite flotte** (possibilité d'ajouter des collaborateurs VTC)
- Générer un **portfolio professionnel exceptionnel** pour la développeuse (projet École 42)
- Démontrer la faisabilité d'une **stack moderne Next.js + Supabase** avec budget zéro

### Background Context

Rachel est chauffeur VTC actuellement dépendante d'Uber à ~90%. Elle subit des commissions élevées (~25% du CA) et un rythme épuisant avec un volume important de courses peu rémunératrices. Elle souhaite se réorienter vers un service premium avec moins de courses mais mieux payées, notamment en se spécialisant sur les trajets aéroports (5 courses aéroport = journée rentable). 

L'application VTC Rachel lui permettra de construire sa propre clientèle indépendante, d'offrir un service personnalisé haut de gamme, et de se positionner sur le segment premium tout en gardant le contrôle total de sa relation client. Le projet est développé dans le cadre d'un échange de services (développement contre publicité pour financer les études à l'École 42), avec pour ambition de créer une application aussi belle que fonctionnelle, utilisant les technologies les plus modernes du marché (Next.js 14, Supabase, Stripe).

### Change Log

| Date | Version | Description | Author |
|------|---------|-------------|--------|
| 2026-01-09 | 1.0 | Création initiale du PRD basé sur Project Brief validé | Équipe VTC Rachel |

---

## Requirements

### Functional Requirements

**Réservation & Booking**

- **FR1:** Le système permet aux utilisateurs de créer une réservation en spécifiant adresse de départ, adresse d'arrivée, date, heure, et nombre de passagers
- **FR2:** Le système intègre Google Places API pour l'autocomplétion des adresses lors de la saisie
- **FR3:** Le système calcule automatiquement la distance, le temps de trajet estimé et le prix via Google Distance Matrix API
- **FR4:** Le système affiche un récapitulatif complet de la réservation avant confirmation (trajet, prix, date/heure, options)
- **FR5:** Le système permet de sauvegarder des adresses favorites (domicile, travail, aéroports) pour réutilisation rapide
- **FR6:** Le système propose des options supplémentaires sélectionnables (siège enfant, bagages volumineux, temps d'attente prévu, notes spéciales)
- **FR7:** Le système affiche en temps réel la disponibilité de Rachel pour la date/heure demandée
- **FR8:** Le système empêche les réservations sur des créneaux déjà occupés ou bloqués
- **FR9:** Le système envoie une confirmation de réservation immédiate par email après validation

**Modification & Annulation**

- **FR10:** Les clients peuvent modifier une réservation jusqu'à 4h avant l'heure prévue sans frais
- **FR11:** Les clients peuvent annuler gratuitement jusqu'à 12h avant, avec frais d'annulation dégressifs ensuite
- **FR12:** Le système calcule et affiche automatiquement les frais d'annulation applicables selon le délai
- **FR13:** Toute modification ou annulation génère un email de confirmation automatique

**Authentication & Profils**

- **FR14:** Les utilisateurs peuvent créer un compte avec email/mot de passe
- **FR15:** Le système supporte l'authentification OAuth via Google Sign-In et Apple Sign-In
- **FR16:** Les utilisateurs peuvent se connecter et récupérer un mot de passe oublié via email
- **FR17:** Les utilisateurs peuvent modifier leurs informations personnelles (nom, email, téléphone, photo de profil)
- **FR18:** Les utilisateurs peuvent consulter l'historique complet de leurs réservations (passées et à venir)
- **FR19:** Les utilisateurs peuvent télécharger leurs factures au format PDF depuis l'historique
- **FR20:** Les utilisateurs peuvent gérer leurs moyens de paiement enregistrés (ajout, suppression, modification)

**Paiement**

- **FR21:** Le système intègre Stripe pour accepter les paiements par carte bancaire, Apple Pay et Google Pay
- **FR22:** Les clients peuvent payer immédiatement lors de la réservation ou choisir le paiement avant la course
- **FR23:** Le système envoie un rappel de paiement 24h avant la course si non payée
- **FR24:** Le système génère automatiquement une facture PDF après chaque paiement réussi
- **FR25:** Le système gère les webhooks Stripe pour confirmer les paiements de manière sécurisée
- **FR26:** Le système permet le remboursement automatique en cas d'annulation éligible
- **FR27:** Les factures incluent les informations légales complètes (SIRET, TVA si applicable, mentions obligatoires)

**Interface Administrateur (Rachel)**

- **FR28:** Rachel accède à un dashboard admin sécurisé avec authentification
- **FR29:** Le dashboard affiche toutes les réservations (en attente, confirmées, complétées, annulées) avec filtres et recherche
- **FR30:** Rachel peut voir les détails complets de chaque réservation (client, trajet, prix, statut paiement, notes)
- **FR31:** Rachel peut confirmer, refuser ou annuler une réservation avec notification automatique au client
- **FR32:** Rachel peut bloquer des créneaux horaires (congés, maintenance véhicule, indisponibilité)
- **FR33:** Rachel peut accéder aux coordonnées clients (téléphone, email) pour contact direct si nécessaire
- **FR34:** Le dashboard affiche des statistiques d'activité (nombre de courses, CA, taux d'annulation, clients récurrents)
- **FR35:** Rachel peut exporter les données de réservations et paiements pour comptabilité (CSV/Excel)

**Notifications & Communications**

- **FR36:** Le système envoie un email de confirmation immédiate après chaque réservation
- **FR37:** Le système envoie un rappel email 24h avant la course
- **FR38:** Le système envoie un rappel email 2h avant la course
- **FR39:** Le système notifie le client par email en cas de modification ou annulation par Rachel
- **FR40:** Rachel reçoit une notification email instantanée pour chaque nouvelle réservation
- **FR41:** Le système envoie un email de remerciement après la course avec demande d'avis (optionnel)
- **FR42:** Les emails utilisent des templates React Email avec design cohérent à l'app

**Maps & Calcul de Trajets**

- **FR43:** Le système affiche une carte interactive Google Maps lors de la réservation
- **FR44:** La carte visualise le trajet calculé entre départ et arrivée avec itinéraire
- **FR45:** Le système calcule la distance et le temps estimé en tenant compte du trafic temps réel
- **FR46:** Le système applique des règles de tarification configurables (prix au km, forfait mini, majorations)
- **FR47:** Le système gère les zones géographiques de service (Paris, Île-de-France, aéroports CDG/Orly)

**Contenu & Pages**

- **FR48:** L'application inclut une landing page marketing présentant le service de Rachel
- **FR49:** L'application inclut une page "À propos" avec présentation de Rachel et du service
- **FR50:** L'application inclut une page "Tarifs" expliquant le modèle de prix et les zones couvertes
- **FR51:** L'application inclut les pages légales obligatoires (CGV, Mentions légales, Politique de confidentialité, Cookies)
- **FR52:** L'application inclut une page FAQ avec réponses aux questions courantes
- **FR53:** L'application inclut une page "Contact" avec formulaire et coordonnées

### Non-Functional Requirements

**Performance & Scalabilité**

- **NFR1:** Le First Contentful Paint (FCP) doit être < 1.5s sur connexion 4G
- **NFR2:** Le Time to Interactive (TTI) doit être < 3s sur mobile
- **NFR3:** Le score Lighthouse doit être > 90/100 (Performance, Accessibility, Best Practices, SEO)
- **NFR4:** La taille du bundle JavaScript initial doit être < 200kb (gzipped)
- **NFR5:** Le système doit supporter 100 utilisateurs simultanés sans dégradation
- **NFR6:** Le système doit pouvoir scale jusqu'à 500 réservations/mois sans changement d'architecture
- **NFR7:** Les images doivent être optimisées automatiquement (WebP, responsive, lazy loading)

**Sécurité & Confidentialité**

- **NFR8:** Toutes les communications doivent utiliser HTTPS (TLS 1.3 minimum)
- **NFR9:** Les mots de passe doivent être hashés avec bcrypt (minimum 10 rounds)
- **NFR10:** Les tokens JWT doivent expirer après 24h avec refresh token sécurisé
- **NFR11:** Le système doit implémenter le rate limiting sur les APIs sensibles (5 requêtes/min/IP)
- **NFR12:** Le système doit être conforme RGPD (consentement cookies, droit à l'oubli, export données)
- **NFR13:** Les données bancaires ne doivent JAMAIS transiter ou être stockées (délégation Stripe PCI-DSS)
- **NFR14:** Le système doit protéger contre les attaques OWASP Top 10 (XSS, CSRF, injection SQL)
- **NFR15:** Les données sensibles (tokens, API keys) doivent être stockées en variables d'environnement
- **NFR16:** Les sessions doivent être invalidées côté serveur lors de la déconnexion

**Accessibilité & UX**

- **NFR17:** L'application doit respecter les standards WCAG 2.1 niveau AA minimum
- **NFR18:** Tous les éléments interactifs doivent être accessibles au clavier
- **NFR19:** Les contrastes de couleurs doivent respecter le ratio minimum 4.5:1
- **NFR20:** Les formulaires doivent avoir des labels explicites et des messages d'erreur clairs
- **NFR21:** L'application doit être entièrement responsive (mobile, tablette, desktop : 320px à 2560px)
- **NFR22:** L'application doit fonctionner sur les navigateurs modernes (Chrome 90+, Safari 14+, Firefox 88+, Edge 90+)
- **NFR23:** L'interface doit rester fluide avec animations à 60 FPS minimum

**Disponibilité & Fiabilité**

- **NFR24:** Le système doit viser un uptime de 99.5% (downtime maximum ~3h45/mois)
- **NFR25:** Les erreurs critiques (paiement, réservation) doivent être loggées et alertées immédiatement
- **NFR26:** Le système doit avoir une stratégie de backup quotidien avec rétention 30 jours
- **NFR27:** Les webhooks Stripe doivent être idempotents (gestion des doublons)
- **NFR28:** Les emails transactionnels doivent avoir un taux de délivrabilité > 95%

**Maintenabilité & Qualité Code**

- **NFR29:** Le code doit être TypeScript avec strict mode activé (type-safety totale)
- **NFR30:** Le code doit respecter les conventions ESLint + Prettier configurées
- **NFR31:** Les composants React doivent être documentés avec JSDoc ou Storybook
- **NFR32:** La couverture de tests devrait viser > 70% pour la logique métier critique
- **NFR33:** Le code doit être versionné sur Git avec commits conventionnels (Conventional Commits)
- **NFR34:** L'architecture doit permettre l'ajout de nouveaux chauffeurs sans refonte majeure

**Coûts & Budget**

- **NFR35:** Les coûts d'infrastructure doivent rester dans les tiers gratuits au lancement (0€/mois)
- **NFR36:** L'utilisation de Google Maps API doit rester sous 15k requêtes/mois (crédits gratuits)
- **NFR37:** Les coûts Stripe doivent être couverts par les commissions incluses dans les prix
- **NFR38:** Le scaling au-delà des tiers gratuits doit être progressive et justifiée par le ROI

**SEO & Marketing**

- **NFR39:** L'application doit avoir des meta tags optimisés pour chaque page (title, description, OG)
- **NFR40:** L'application doit générer un sitemap.xml automatiquement
- **NFR41:** L'application doit implémenter le Schema.org markup pour rich snippets (LocalBusiness, Service)
- **NFR42:** Les URLs doivent être SEO-friendly (slugs lisibles, structure hiérarchique)
- **NFR43:** Le temps de chargement doit être optimisé pour le SEO (Core Web Vitals)

---

## User Interface Design Goals

### Overall UX Vision

**Philosophie Design : "Luxe aspirationnel accessible"**

L'application doit **impressionner visuellement** tout en restant **extrêmement simple d'utilisation**. Le client doit se sentir dans un univers premium dès la landing page, avec une sensation de service haut de gamme modernisé. Chaque interaction doit être fluide, rapide et procurer une satisfaction immédiate.

**Principes directeurs :**
- **Minimalisme sophistiqué** : Beaucoup d'espace blanc, hiérarchie visuelle claire, pas de surcharge
- **Animations subtiles mais impressionnantes** : Transitions smooth, micro-interactions délicates
- **Rapidité perçue** : Feedback immédiat, skeleton loaders, optimistic UI
- **Confiance et réassurance** : Design professionnel, informations claires, transparence totale
- **Mobile-first absolu** : Pensé d'abord pour mobile, ensuite adapté desktop

**Références visuelles :**
- **Blacklane** : Élégance sobre, focus sur le service
- **Air France** : Sophistication française, bleu/blanc/or
- **Apple** : Minimalisme, attention au détail, animations fluides
- **Vercel** : Design system moderne, typographie soignée

### Key Interaction Paradigms

**1. Réservation en 3 étapes maximum**
```
Étape 1 : Où ? (Départ → Arrivée avec autocomplétion + map)
Étape 2 : Quand ? (Date/heure + options passagers/bagages)
Étape 3 : Confirmation (Récap + Prix + Paiement)
→ Confirmation instantanée !
```

**2. Feedback immédiat et rassurant**
- Chaque action → Animation de validation (checkmark animé, haptic feedback)
- Calcul prix → Skeleton loader puis apparition smooth du montant
- Formulaire → Validation temps réel avec messages constructifs (pas d'erreurs agressives)
- Paiement → Progression claire, messages rassurants

**3. Navigation intuitive**
- **Landing page** : Hero impactant → CTA "Réserver maintenant" ultra visible
- **App authentifiée** : Bottom navigation mobile (Dashboard, Réserver, Historique, Profil)
- **Desktop** : Sidebar élégante + contenu centré max-width 1200px
- **Breadcrumbs** pour orientation dans parcours multi-étapes

**4. Gestion des états**
- **Loading** : Skeleton screens (pas de spinners moches)
- **Empty states** : Illustrations sympas + CTA pour première action
- **Erreurs** : Messages friendly + suggestion solution + possibilité retry
- **Succès** : Confetti ou animation célébration + confirmation claire

**5. Progressive disclosure**
- Afficher l'essentiel d'abord, détails ensuite si demandé
- Options avancées dans accordéons/toggles discrets
- Aide contextuelle (tooltips, hints) accessible mais pas intrusive

### Core Screens and Views

**Pages Marketing (publiques) :**

1. **Landing Page / Home**
   - Hero section avec titre impactant + visual luxe + CTA principal
   - Section "Comment ça marche" (3 étapes illustrées)
   - Section "Pourquoi nous choisir" (différenciateurs vs Uber)
   - Section "Zones desservies" (carte Paris/IDF/aéroports)
   - Section "Témoignages" (social proof)
   - Section "Tarifs" (transparence, estimateur rapide)
   - Footer avec liens légaux + contact

2. **Page À propos**
   - Présentation Rachel (photo pro, parcours, valeurs)
   - Histoire et mission
   - Certifications / Licences VTC

3. **Page Tarifs**
   - Grille tarifaire claire
   - Calculateur d'estimation trajet
   - Explications majorations (nuit, bagages, etc.)
   - Zones couvertes

4. **Page FAQ**
   - Questions groupées par thème (accordéons)
   - Recherche

5. **Page Contact**
   - Formulaire simple
   - Coordonnées (téléphone, email)
   - Map avec zone de service

6. **Pages Légales**
   - CGV, Mentions légales, Politique confidentialité, Cookies

**Pages Application (authentifiées) :**

7. **Dashboard Client**
   - Prochaine course (si une à venir) : Carte avec infos essentielles
   - Statistiques perso (nombre de courses, km parcourus, économies vs Uber)
   - Accès rapides : "Nouvelle réservation", "Historique", "Adresses favorites"
   - Dernières courses (preview 3 dernières)

8. **Nouvelle Réservation**
   - Formulaire multi-étapes (départ, arrivée, date/heure, options)
   - Map interactive avec trajet visualisé
   - Calcul prix temps réel
   - Récapitulatif avant confirmation
   - Paiement Stripe Checkout

9. **Historique Réservations**
   - Liste filtrée/triable (toutes, à venir, passées, annulées)
   - Cards avec infos essentielles + actions (voir détails, télécharger facture, rebook)
   - Empty state si aucune réservation

10. **Détail Réservation**
    - Toutes infos complètes
    - Map avec trajet
    - Statut en temps réel
    - Actions selon statut (modifier, annuler, télécharger facture, contacter Rachel)

11. **Profil Utilisateur**
    - Informations personnelles (edit)
    - Photo de profil (upload)
    - Adresses favorites (CRUD)
    - Moyens de paiement (gestion via Stripe)
    - Paramètres (notifications, langue)
    - Déconnexion

12. **Paramètres**
    - Notifications (email, push)
    - Confidentialité
    - Supprimer compte

**Pages Admin Rachel (authentifiées) :**

13. **Dashboard Admin**
    - Vue d'ensemble : Courses du jour, semaine, mois
    - Statistiques (CA, nombre courses, clients récurrents)
    - Graphiques simples (évolution)
    - Alertes (nouvelles réservations, paiements en attente)

14. **Gestion Réservations**
    - Liste complète avec filtres avancés
    - Vue calendrier/planning
    - Actions bulk (confirmer plusieurs, exporter)

15. **Détail Réservation Admin**
    - Toutes infos + infos clients
    - Historique des modifications
    - Actions admin (confirmer, refuser, annuler, contacter client)

16. **Gestion Disponibilités**
    - Calendrier interactif
    - Bloquer/débloquer créneaux
    - Gestion congés

17. **Clients**
    - Liste clients avec stats
    - Recherche
    - Vue détail client (historique, coordonnées)

18. **Paramètres Admin**
    - Configuration tarifs
    - Zones de service
    - Templates emails
    - Profil Rachel

**Pages Spéciales :**

19. **Login / Sign Up**
    - Formulaires simples
    - OAuth buttons (Google, Apple)
    - Mot de passe oublié

20. **Page 404**
    - Illustration sympas
    - Liens utiles

21. **Page Maintenance**
    - Si downtime prévu

### Accessibility

**Niveau cible : WCAG 2.1 AA**

- **Contraste :** Ratio minimum 4.5:1 (texte normal), 3:1 (texte large)
- **Navigation clavier :** Tous éléments interactifs accessibles au Tab, focus visible
- **Screen readers :** ARIA labels appropriés, landmarks HTML5, alt texts sur images
- **Formulaires :** Labels explicites, messages erreur associés aux champs
- **Responsive :** Zoom 200% sans perte de contenu/fonctionnalité
- **Animations :** Respecter `prefers-reduced-motion` pour utilisateurs sensibles
- **Liens :** Textes descriptifs (pas de "cliquez ici")

**Tests accessibilité :**
- Axe DevTools pour audit automatique
- Tests clavier manuels
- Tests VoiceOver (iOS) / TalkBack (Android)

### Branding

**Nom commercial :** À définir (provisoirement "VTC Rachel" pour le développement)

**Palette de couleurs :**

```
Couleurs principales :
- Vert foncé : #0F4C3A (Forest Green) → Confiance, sérénité, validation
- Vert accent : #16A34A (Success Green) → Confirmations, CTA secondaires

Couleurs premium :
- Or champagne : #D4AF37 (Gold) → Accents luxe, badges, highlights
- Or clair : #F5E6D3 (Cream Gold) → Backgrounds subtils

Neutres :
- Blanc : #FFFFFF → Backgrounds principaux
- Gris très clair : #F8FAFC → Backgrounds alternés
- Gris clair : #E2E8F0 → Borders, dividers
- Gris moyen : #64748B → Textes secondaires
- Noir profond : #0F172A → Textes principaux, headings

États :
- Erreur : #DC2626 (Red)
- Warning : #F59E0B (Amber)
- Info : #3B82F6 (Blue)
```

**Typographie :**

```
Primaire (titres & body) : Inter
- Modern, lisible, web-optimized
- Variable font pour performance
- Weights : 400 (Regular), 500 (Medium), 600 (SemiBold), 700 (Bold)

Secondaire (accents luxe) : Playfair Display
- Serif élégant pour grands titres hero
- Weights : 600 (SemiBold), 700 (Bold)

Monospace (code, références) : JetBrains Mono
- Pour numéros de réservation, codes

Hierarchy :
- Hero (landing) : Playfair Display 56-72px Bold
- H1 : Inter 36-48px Bold
- H2 : Inter 30-36px SemiBold
- H3 : Inter 24-28px SemiBold
- Body : Inter 16px Regular
- Small : Inter 14px Regular
- Tiny : Inter 12px Medium
```

**Iconographie :**
- Lucide Icons (cohérent, moderne, SVG optimisé)
- Style line (pas de filled) pour élégance
- Taille standard : 20-24px
- Couleur : Hérite du texte parent

**Composants UI :**
- ShadCN UI comme base (customisé aux couleurs)
- Aceternity UI pour animations spectaculaires (hero, CTA)
- Radius : 8px (modéré, moderne)
- Shadows : Subtiles, multi-layer pour profondeur

**Tone of Voice :**
- Professionnel mais **chaleureux**
- Rassurant et **digne de confiance**
- Premium sans être **prétentieux ou froid**
- Tutoiement moderne et **accessible**

**Exemples de copy :**
- ❌ "Réservez dès maintenant votre trajet" (trop corporate)
- ✅ "Réservez votre prochaine course en 2 minutes"
- ❌ "Service VTC premium de luxe" (trop pompeux)
- ✅ "Votre chauffeur de confiance en Île-de-France"

### Target Devices and Platforms

**Progressive Web App (PWA) - Multi-plateforme**

**Priorité 1 : Mobile**
- iOS Safari 14+ (iPhone)
- Chrome Android 90+ (smartphones Android)
- Résolutions : 375px à 430px (iPhone SE à iPhone Pro Max)
- Touch-optimized : Zones touch 44x44px minimum
- Gestes natifs : Swipe back, pull to refresh

**Priorité 2 : Desktop**
- Chrome 90+, Firefox 88+, Safari 14+, Edge 90+
- Résolutions : 1280px à 2560px
- Layout adapté : Sidebar, multi-colonnes
- Hover states riches

**PWA Features :**
- **Installable** : Add to Home Screen (iOS et Android)
- **Offline** : Cache pages consultées, historique accessible
- **App-like** : Fullscreen, pas de barre navigateur
- **Icons** : Adaptive icons Android, Touch icons iOS
- **Splash screen** : Branded, cohérent

**Excluded :**
- Pas de support IE11 (navigateur obsolète)
- Pas de support Android < 7.0
- Pas d'optimisation tablette spécifique (responsive suffit)

---

## Technical Assumptions

### Repository Structure

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

### Service Architecture

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

### Testing Requirements

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

### Additional Technical Assumptions

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

## Epic List

Voici la liste des Epics séquentiels pour le MVP. Chaque Epic livre une fonctionnalité end-to-end déployable et testable.

**Epic 1: Foundation & Infrastructure**
*Établir les fondations techniques du projet : setup Next.js, Supabase, design system, landing page fonctionnelle.*

**Epic 2: Authentication & User Management**
*Permettre aux utilisateurs de créer un compte, se connecter, gérer leur profil et leurs préférences.*

**Epic 3: Booking System Core**
*Implémenter le cœur fonctionnel : formulaire de réservation avec Google Maps, calcul de prix, sauvegarde en DB.*

**Epic 4: Payment Integration**
*Intégrer Stripe pour accepter les paiements CB/Apple Pay/Google Pay avec génération de factures automatiques.*

**Epic 5: Admin Dashboard Rachel**
*Créer l'interface admin permettant à Rachel de visualiser, gérer les réservations et bloquer ses disponibilités.*

**Epic 6: Notifications & Communications**
*Implémenter le système d'emails transactionnels (confirmations, rappels, notifications Rachel).*

**Epic 7: Polish, Performance & Launch**
*Optimiser les performances, finaliser PWA, corriger bugs, tests finaux, déploiement production.*

---

## Epic 1: Foundation & Infrastructure

**Epic Goal :** Établir l'infrastructure technique complète du projet avec Next.js 14, Supabase, et le design system. Livrer une landing page publique magnifique et performante qui présente le service de Rachel. À la fin de cet Epic, le projet est déployé en production avec une vitrine marketing fonctionnelle.

### Story 1.1: Project Setup & Tooling

**As a** developer,  
**I want** to initialize the Next.js project with all necessary tooling,  
**so that** I have a solid foundation to build upon.

**Acceptance Criteria:**

1. Create Next.js 14 project with TypeScript using `create-next-app`
2. Configure Tailwind CSS with custom theme (colors, fonts, spacing)
3. Install and configure ESLint + Prettier with consistent rules
4. Setup Supabase project and initialize client connection
5. Configure environment variables structure (.env.local, .env.example)
6. Initialize Git repository with proper .gitignore
7. Create GitHub repository and push initial commit
8. Setup Vercel project and connect to GitHub (auto-deploy)
9. Configure absolute imports (@/ alias for cleaner imports)
10. Install core dependencies: ShadCN UI, Lucide Icons, Framer Motion, Zod
11. Create basic folder structure (components, lib, types, hooks)
12. Verify dev server runs without errors (`npm run dev`)
13. Verify initial production build succeeds (`npm run build`)

### Story 1.2: Design System & UI Foundation

**As a** developer,  
**I want** to establish the design system with reusable UI components,  
**so that** the app has a consistent, beautiful, and maintainable UI.

**Acceptance Criteria:**

1. Initialize ShadCN UI and install base components (Button, Input, Card, etc.)
2. Customize ShadCN theme with VTC Rachel color palette (forest green, gold, neutrals)
3. Configure typography system (Inter primary, Playfair Display accents)
4. Create color tokens in tailwind.config.ts matching design specs
5. Implement base layout components (Container, Section, Grid)
6. Create reusable components:
   - Button (variants: primary, secondary, outline, ghost)
   - Input (with error states, labels)
   - Card (elevation, hover states)
   - Badge (status indicators)
   - Avatar (user profiles)
7. Implement dark mode toggle foundations (optional for MVP)
8. Create loading states (Skeleton components)
9. Implement Framer Motion animation presets (fade, slide, scale)
10. Document components with examples in /components/ui/README.md
11. Verify all components render correctly across viewport sizes
12. Test accessibility basics (keyboard navigation, ARIA)

### Story 1.3: Database Schema & Supabase Setup

**As a** developer,  
**I want** to design and implement the database schema,  
**so that** data is properly structured and relationships are clear.

**Acceptance Criteria:**

1. Design database schema for tables:
   - `users` (id, email, name, phone, avatar_url, created_at)
   - `bookings` (id, user_id, pickup_address, dropoff_address, datetime, price, status, created_at)
   - `saved_addresses` (id, user_id, label, address, latitude, longitude)
   - `blocked_slots` (id, start_time, end_time, reason)
2. Create SQL migrations in Supabase dashboard or via CLI
3. Implement Row Level Security (RLS) policies:
   - Users can only read/update their own profile
   - Users can only see their own bookings
   - Admin can see all bookings
4. Generate TypeScript types from Supabase schema
5. Create Supabase client helpers in /lib/supabase:
   - `createClient()` for client-side
   - `createServerClient()` for server-side
6. Test database connection from Next.js
7. Verify RLS policies work correctly (test with different users)
8. Document schema with ER diagram or Mermaid chart in /docs

### Story 1.4: Landing Page - Hero Section

**As a** potential client,  
**I want** to see an impressive hero section,  
**so that** I immediately understand the service and feel confident booking.

**Acceptance Criteria:**

1. Design and implement hero section with:
   - Large heading with Playfair Display: "Votre chauffeur de confiance en Île-de-France"
   - Subheading explaining premium VTC service
   - Primary CTA button: "Réserver maintenant" (links to /book, future story)
   - Secondary CTA: "En savoir plus" (scrolls to about section)
2. Integrate hero background:
   - High-quality image (Paris at night or luxury car)
   - Subtle gradient overlay for text readability
   - Parallax scroll effect (Aceternity UI or Framer Motion)
3. Implement responsive design:
   - Mobile: Stacked layout, full-width image
   - Tablet: Larger text, adjusted spacing
   - Desktop: Image right, text left (or full-width centered)
4. Add subtle animations:
   - Fade in on load
   - CTA buttons hover effects (scale, glow)
5. Optimize hero image:
   - Use next/image for automatic optimization
   - Lazy loading below fold
   - WebP format with fallback
6. Test performance: FCP < 1.5s, LCP < 2.5s
7. Verify hero displays correctly on all viewport sizes (320px to 2560px)
8. Accessibility check: Heading hierarchy (h1), alt texts, focus states

### Story 1.5: Landing Page - Services & Features

**As a** potential client,  
**I want** to understand what services are offered,  
**so that** I know if this VTC service meets my needs.

**Acceptance Criteria:**

1. Create "Comment ça marche" section with 3 steps:
   - Étape 1: "Réservez en ligne" (icon + description)
   - Étape 2: "Payez en toute sécurité" (icon + description)
   - Étape 3: "Profitez de votre trajet" (icon + description)
2. Create "Pourquoi nous choisir" section with 4-6 key differentiators:
   - Chauffeur professionnel fiable
   - Service personnalisé
   - Tarifs transparents
   - Spécialiste aéroports
   - (Add icons from Lucide for each)
3. Create "Zones desservies" section:
   - Static map image or simple Google Map embed
   - List of covered areas (Paris, IDF, CDG, Orly)
4. Implement scroll animations (Framer Motion):
   - Fade in sections as they enter viewport
   - Stagger animation for feature cards
5. Responsive grid layouts:
   - Mobile: Single column
   - Tablet: 2 columns
   - Desktop: 3-4 columns for features
6. Use ShadCN Card component for feature boxes
7. Add micro-interactions (hover effects on cards)
8. Verify readability and contrast ratios (WCAG AA)

### Story 1.6: Landing Page - Footer & Legal

**As a** website visitor,  
**I want** to access legal information and contact details,  
**so that** I can trust the service and contact if needed.

**Acceptance Criteria:**

1. Create footer component with sections:
   - Logo + tagline
   - Navigation links (À propos, Tarifs, FAQ, Contact)
   - Legal links (CGV, Mentions légales, Politique de confidentialité)
   - Contact info (email, phone)
   - Social media links (placeholder)
2. Create placeholder legal pages:
   - `/legal/terms` - CGV (Terms of Service)
   - `/legal/privacy` - Politique de confidentialité (RGPD compliant)
   - `/legal/cookies` - Politique cookies
   - (Placeholder content: "En cours de rédaction" + structure)
3. Implement footer design:
   - Dark background (forest green or near-black)
   - Light text with good contrast
   - Organized in columns (mobile: stacked, desktop: 4 columns)
4. Add copyright notice with current year (dynamic)
5. Footer sticky to bottom if page content is short
6. Links have hover states and are keyboard accessible
7. Test footer on all pages (consistent)
8. Legal pages have proper typography and readability

### Story 1.7: Navigation & Header

**As a** website visitor,  
**I want** to navigate easily between pages,  
**so that** I can find information and access key actions.

**Acceptance Criteria:**

1. Create header/navbar component with:
   - Logo (left) - links to home
   - Navigation links (center/right): Accueil, À propos, Tarifs, FAQ, Contact
   - CTA button (right): "Réserver" or "Connexion" (depending on auth state)
2. Implement responsive behavior:
   - Mobile: Hamburger menu (slide-in drawer or dropdown)
   - Tablet+: Horizontal menu
3. Sticky header on scroll (with smooth transition)
4. Active link highlighting (current page)
5. Smooth scroll to sections if same page (e.g., home sections)
6. Logo and navigation have hover states
7. Header background:
   - Transparent with backdrop blur initially
   - Solid background on scroll
8. Mobile menu:
   - Animated open/close (Framer Motion)
   - Close on link click or outside click
   - Overlay dims background
9. Accessibility:
   - Keyboard navigation works
   - Mobile menu toggle has ARIA labels
   - Focus trap in mobile menu
10. Test header across all viewport sizes

### Story 1.8: SEO & Meta Configuration

**As a** developer and business owner,  
**I want** the site to be SEO-optimized,  
**so that** potential clients can find us on Google.

**Acceptance Criteria:**

1. Configure Next.js metadata in root layout:
   - Site title: "VTC Rachel - Chauffeur VTC Premium Paris & Île-de-France"
   - Description: SEO-optimized description (150-160 characters)
   - Keywords (optional but good practice)
   - OG tags (title, description, image)
   - Twitter card tags
2. Create custom metadata for each page (landing, about, pricing, etc.)
3. Generate dynamic OG image for social shares (next/og or static image)
4. Create `/robots.txt` allowing all bots
5. Create `/sitemap.xml` with all public pages
6. Implement JSON-LD structured data (Schema.org):
   - LocalBusiness
   - Service
7. Configure canonical URLs
8. Verify meta tags with browser inspector and social media debuggers
9. Test Open Graph preview (Facebook, Twitter, LinkedIn)
10. Verify sitemap is accessible and valid
11. Run Lighthouse SEO audit: Score > 90

### Story 1.9: Performance Optimization & PWA Setup

**As a** mobile user,  
**I want** the app to load fast and be installable,  
**so that** I have a smooth, app-like experience.

**Acceptance Criteria:**

1. Install and configure `next-pwa` plugin
2. Create `/public/manifest.json` with PWA configuration:
   - App name, short_name, description
   - Theme color (forest green), background color
   - Display: standalone
   - Icons (192x192, 512x512, maskable)
3. Create app icons in multiple sizes:
   - Use logo + green background
   - Generate with PWA asset generator tool
4. Configure Service Worker for offline support:
   - Cache static assets (images, fonts, JS/CSS)
   - Cache landing page for offline viewing (optional)
5. Optimize images:
   - Use next/image for all images
   - Convert to WebP
   - Provide width/height to avoid CLS
6. Optimize fonts:
   - Use next/font for Inter and Playfair Display
   - Preload critical fonts
7. Code splitting:
   - Dynamic imports for heavy components
   - Lazy load below-fold sections
8. Run Lighthouse audit:
   - Performance: > 90
   - Accessibility: > 90
   - Best Practices: > 90
   - SEO: > 90
9. Test PWA installation on mobile (iOS Safari, Chrome Android)
10. Verify app opens in standalone mode after install
11. Test offline functionality (landing page cached)

### Story 1.10: Deployment & Monitoring Setup

**As a** developer,  
**I want** the site deployed and monitored,  
**so that** it's live and I can track performance/errors.

**Acceptance Criteria:**

1. Configure Vercel project settings:
   - Production branch: main
   - Auto-deploy enabled
   - Preview deployments enabled for all branches
2. Set environment variables in Vercel dashboard:
   - NEXT_PUBLIC_SUPABASE_URL
   - NEXT_PUBLIC_SUPABASE_ANON_KEY
   - (Add placeholder values for future: Stripe, Google Maps, etc.)
3. Configure custom domain (if available) or use Vercel domain
4. Enable HTTPS (automatic with Vercel)
5. Setup Vercel Analytics (included, enable in dashboard)
6. Configure error logging:
   - Console errors logged
   - Consider Sentry integration (optional)
7. Test production deployment:
   - Push to main triggers deploy
   - Site accessible at production URL
   - No console errors
   - All pages load correctly
8. Test preview deployment:
   - Create feature branch
   - Push commit
   - Verify preview URL works
9. Document deployment process in README.md
10. Share production URL with Rachel for feedback

---

## Epic 2: Authentication & User Management

**Epic Goal :** Permettre aux utilisateurs de créer un compte, se connecter avec email/mot de passe ou OAuth (Google/Apple), gérer leur profil, et sauvegarder leurs préférences. Implémenter la sécurité avec Row Level Security (RLS) et JWT. À la fin de cet Epic, les clients peuvent s'inscrire et accéder à leur espace personnel.

### Story 2.1: Sign Up with Email

**As a** new user,  
**I want** to create an account with my email and password,  
**so that** I can access the booking platform.

**Acceptance Criteria:**

1. Create `/sign-up` page with form:
   - Email input (validated format)
   - Password input (min 8 chars, shown/hide toggle)
   - Confirm password input (must match)
   - Name input (optional at signup, required later)
   - Terms & conditions checkbox (required)
2. Implement form validation with Zod schema
3. Show real-time validation errors (inline, friendly messages)
4. On submit, call Supabase Auth `signUp()` method
5. Handle success:
   - Show success message: "Compte créé ! Vérifiez votre email."
   - Redirect to email confirmation page
6. Handle errors:
   - Email already exists → "Cet email est déjà utilisé"
   - Invalid email → "Email invalide"
   - Weak password → "Mot de passe trop faible"
7. Supabase sends verification email automatically
8. Style form with ShadCN Input, Button components
9. Add link to login page: "Déjà un compte ? Connectez-vous"
10. Implement loading state (button disabled, spinner)
11. Test signup flow end-to-end
12. Accessibility: Form labels, error announcements, keyboard navigation

### Story 2.2: Email Verification & Login

**As a** user who just signed up,  
**I want** to verify my email and log in,  
**so that** I can access my account securely.

**Acceptance Criteria:**

1. User receives verification email from Supabase
2. Email contains verification link
3. Create `/auth/confirm` page:
   - Handles email verification token
   - Shows success message: "Email vérifié ! Vous pouvez vous connecter."
   - Link to login page
4. Create `/login` page with form:
   - Email input
   - Password input (with show/hide toggle)
   - "Mot de passe oublié ?" link
   - Submit button: "Se connecter"
5. Implement login with Supabase Auth `signInWithPassword()`
6. On success:
   - Store session (Supabase handles JWT cookies)
   - Redirect to /dashboard
7. On error:
   - Invalid credentials → "Email ou mot de passe incorrect"
   - Email not verified → "Veuillez vérifier votre email"
8. Add "Remember me" checkbox (session persistence)
9. Add link to signup: "Pas encore de compte ? Inscrivez-vous"
10. Implement loading state
11. Test login flow with verified and unverified accounts
12. Verify JWT token is stored securely (httpOnly cookie)

### Story 2.3: OAuth Sign In (Google & Apple)

**As a** user,  
**I want** to sign in with Google or Apple,  
**so that** I don't have to create yet another password.

**Acceptance Criteria:**

1. Enable Google OAuth provider in Supabase dashboard:
   - Configure OAuth app in Google Cloud Console
   - Add Client ID and Secret to Supabase
2. Enable Apple OAuth provider in Supabase dashboard:
   - Configure Sign in with Apple in Apple Developer Portal
   - Add credentials to Supabase
3. Add OAuth buttons to signup and login pages:
   - "Continuer avec Google" (Google logo)
   - "Continuer avec Apple" (Apple logo)
4. Implement OAuth flow with Supabase:
   - Call `signInWithOAuth({ provider: 'google' })`
   - Call `signInWithOAuth({ provider: 'apple' })`
5. Handle OAuth redirect:
   - User redirected to Google/Apple login
   - User approves permissions
   - Redirected back to app with token
   - Auto-login with Supabase
6. On first OAuth login:
   - User profile created automatically
   - Name/email prefilled from OAuth provider
7. On subsequent logins:
   - Existing account matched by email
   - User logged in directly
8. Handle errors:
   - OAuth cancelled → "Connexion annulée"
   - Provider error → "Erreur de connexion, réessayez"
9. Style OAuth buttons distinctly (brand colors)
10. Test OAuth flow on iOS Safari (Apple Sign In native)
11. Test OAuth flow on Chrome Android (Google Sign In)
12. Verify user data populated correctly from OAuth

### Story 2.4: Password Reset Flow

**As a** user who forgot my password,  
**I want** to reset it via email,  
**so that** I can regain access to my account.

**Acceptance Criteria:**

1. Create `/forgot-password` page with form:
   - Email input
   - Submit button: "Envoyer le lien de réinitialisation"
2. On submit, call Supabase `resetPasswordForEmail()`
3. Show success message: "Email envoyé ! Vérifiez votre boîte de réception."
4. Supabase sends password reset email
5. Create `/reset-password` page:
   - Handles reset token from email link
   - New password input
   - Confirm password input
   - Submit button: "Réinitialiser le mot de passe"
6. Validate new password (min 8 chars, match confirmation)
7. On submit, call Supabase `updateUser({ password: newPassword })`
8. On success:
   - Show message: "Mot de passe changé avec succès !"
   - Auto-login user
   - Redirect to /dashboard
9. On error:
   - Invalid token → "Lien expiré, demandez-en un nouveau"
   - Weak password → Validation error
10. Add rate limiting on password reset requests (prevent spam)
11. Test complete password reset flow
12. Verify old password no longer works after reset

### Story 2.5: Protected Routes & Middleware

**As a** developer,  
**I want** to protect authenticated routes,  
**so that** only logged-in users can access them.

**Acceptance Criteria:**

1. Create Next.js middleware (`/middleware.ts`)
2. Check for Supabase session on every request
3. Protected route groups:
   - `/dashboard/*` requires auth
   - `/book/*` requires auth
   - `/bookings/*` requires auth
   - `/profile/*` requires auth
4. If no session and accessing protected route:
   - Redirect to `/login?redirect=/original-path`
5. After login, redirect back to original path
6. Public routes accessible without auth:
   - Landing page, about, pricing, FAQ, contact, legal
7. Create `useAuth()` custom hook:
   - Returns `{ user, session, loading, signOut }`
   - Fetches current user from Supabase
8. Create `AuthProvider` context:
   - Wraps app
   - Provides auth state globally
9. Show loading state while checking auth
10. Test protected route redirection
11. Test "redirect after login" functionality
12. Verify middleware doesn't slow down requests (< 50ms overhead)

### Story 2.6: User Profile Page

**As a** logged-in user,  
**I want** to view and edit my profile,  
**so that** my information is up-to-date.

**Acceptance Criteria:**

1. Create `/profile` page (authenticated route)
2. Display current user information:
   - Avatar (profile picture)
   - Name
   - Email (read-only or with re-verification flow)
   - Phone number
3. Implement edit form with validation
4. Avatar upload:
   - Click avatar to upload new image
   - Use Supabase Storage for avatar storage
   - Crop/resize image on client (use library like react-easy-crop)
   - Update `avatar_url` in database
5. Name and phone editable:
   - Validate phone format (French +33)
   - Save button updates Supabase `users` table
6. Show success toast: "Profil mis à jour !"
7. Show error toast if update fails
8. Implement loading state while saving
9. Add "Déconnexion" button:
   - Calls Supabase `signOut()`
   - Redirects to home page
10. Style with ShadCN Card, Avatar, Input components
11. Responsive design (mobile-friendly)
12. Test profile update flow
13. Verify avatar displays correctly across app

### Story 2.7: Saved Addresses Management

**As a** user,  
**I want** to save my frequent addresses (home, work, airport),  
**so that** I can book faster without retyping them.

**Acceptance Criteria:**

1. Create `/profile/addresses` page (nested route)
2. Display list of saved addresses:
   - Label (e.g., "Maison", "Bureau", "CDG Terminal 2E")
   - Full address
   - Edit and delete buttons
3. Add "Nouvelle adresse" button
4. Create add/edit address form:
   - Label input (text)
   - Address input with Google Places autocomplete
   - Save latitude/longitude from Places API
5. On save:
   - Insert into `saved_addresses` table (Supabase)
   - Show success toast
   - Refresh address list
6. On edit:
   - Pre-fill form with existing data
   - Update in database on save
7. On delete:
   - Show confirmation dialog: "Supprimer cette adresse ?"
   - Delete from database
   - Remove from list
8. Empty state:
   - "Aucune adresse sauvegardée"
   - Illustration + CTA to add first address
9. Limit to 10 saved addresses per user (validation)
10. Style with ShadCN Card, Dialog, Input
11. Test CRUD operations on saved addresses
12. Verify addresses respect RLS policies (user sees only their own)

### Story 2.8: Account Settings & Preferences

**As a** user,  
**I want** to manage my account settings,  
**so that** I can customize my experience and privacy.

**Acceptance Criteria:**

1. Create `/profile/settings` page
2. Notification preferences:
   - Email notifications (toggle on/off)
     - Confirmation emails
     - Reminder emails
     - Marketing emails (opt-in)
   - Save to `users` table (notification_preferences JSON column)
3. Language preference (if i18n planned):
   - Dropdown: Français, English
   - Save to preferences
4. Privacy settings:
   - "Autoriser les données d'analyse" (analytics opt-in/out)
   - Save preference
5. Danger zone:
   - "Supprimer mon compte" button (red, secondary)
   - Confirmation dialog with password re-entry
   - On confirm:
     - Delete user bookings (or anonymize)
     - Delete user profile
     - Delete from Supabase Auth
     - Sign out and redirect to home
6. Show success/error toasts for each action
7. Implement loading states
8. Style with ShadCN Switch, Select, Dialog
9. Test all settings save correctly
10. Test account deletion flow (use test account)
11. Verify RGPD compliance (user can delete their data)

---

## Epic 3: Booking System Core

**Epic Goal :** Implémenter le système de réservation complet avec formulaire multi-étapes, intégration Google Maps (autocomplétion adresses, calcul trajet/prix), gestion des disponibilités, et sauvegarde en base de données. À la fin de cet Epic, les clients peuvent créer une réservation complète (sans paiement, traité en Epic 4).

### Story 3.1: Google Maps Integration & API Setup

**As a** developer,  
**I want** to integrate Google Maps Platform,  
**so that** users can search addresses and visualize routes.

**Acceptance Criteria:**

1. Create Google Cloud Project and enable APIs:
   - Places API (address autocomplete)
   - Distance Matrix API (route calculation)
   - Maps JavaScript API (map display)
   - Geocoding API (lat/lng conversion)
2. Generate API key and restrict it (HTTP referrers, API restrictions)
3. Add API key to environment variables (`NEXT_PUBLIC_GOOGLE_MAPS_API_KEY`)
4. Install `@googlemaps/js-api-loader` package
5. Create Google Maps wrapper component (`<GoogleMapWrapper />`)
6. Create Places Autocomplete component (`<PlacesAutocomplete />`)
7. Test API integration:
   - Autocomplete suggests addresses as user types
   - Selecting address returns full details (lat/lng, formatted address)
8. Create helper functions in `/lib/maps`:
   - `calculateRoute(origin, destination)` → distance, duration, price
   - `geocodeAddress(address)` → lat/lng
9. Monitor API usage (ensure staying under 15k requests/month free tier)
10. Implement error handling for API failures
11. Test with various Paris addresses (streets, landmarks, airports)

### Story 3.2: Booking Form - Step 1 (Addresses)

**As a** user,  
**I want** to enter my pickup and drop-off addresses,  
**so that** I can start booking a ride.

**Acceptance Criteria:**

1. Create `/book` page (authenticated route)
2. Implement multi-step form structure (Step 1 of 3)
3. Step 1 UI:
   - "Où allez-vous ?" heading
   - Pickup address input with Places Autocomplete
   - Drop-off address input with Places Autocomplete
   - "Utiliser ma position" button for pickup (Geolocation API)
   - Quick select buttons for saved addresses (if user has any)
   - "Continuer" button (disabled until both addresses filled)
4. Autocomplete behavior:
   - Dropdown shows suggestions as user types
   - Bias results to Paris/Île-de-France region
   - Show place icons (home, work, airport)
5. Swap addresses button (reverse pickup/drop-off)
6. Show small map preview with pins once both addresses selected
7. Validate addresses:
   - Must be within service area (Paris, IDF, CDG, Orly)
   - Show error if outside service area
8. Save selected addresses to form state (Zustand or React state)
9. On "Continuer", validate and proceed to Step 2
10. Responsive design (mobile-first)
11. Test autocomplete with various inputs
12. Test geolocation permission flow

### Story 3.3: Booking Form - Step 2 (Date, Time & Options)

**As a** user,  
**I want** to select when I need the ride and add options,  
**so that** the booking matches my needs.

**Acceptance Criteria:**

1. Navigate to Step 2 after completing Step 1
2. Show progress indicator (Step 2 of 3)
3. Step 2 UI:
   - "Quand ?" heading
   - Date picker (today + next 30 days, disable past dates)
   - Time picker (15-minute intervals, 24h format)
   - "Réserver maintenant" quick button (ASAP, +15 min from now)
4. Passenger count selector (1-4, default 1)
5. Options checkboxes:
   - Siège enfant
   - Bagages volumineux
   - Temps d'attente prévu (select: 0, 15, 30, 45, 60 min)
   - Notes spéciales (textarea, optional)
6. Real-time availability check:
   - Query `blocked_slots` table for selected datetime
   - Show warning if slot unavailable
   - Suggest alternative times if blocked
7. Validate datetime:
   - Must be at least 2h in future (configurable)
   - Cannot be more than 30 days ahead
8. Show route summary (from Step 1):
   - "Paris 15e → CDG Terminal 2E"
   - Estimated distance and duration
9. "Retour" button (back to Step 1, preserve data)
10. "Continuer" button (disabled until datetime selected)
11. Save selections to form state
12. On "Continuer", proceed to Step 3 (confirmation)
13. Test date/time picker UX on mobile and desktop
14. Test availability check with mock blocked slots

### Story 3.4: Price Calculation Engine

**As a** developer,  
**I want** to implement the pricing logic,  
**so that** users see accurate prices for their bookings.

**Acceptance Criteria:**

1. Create pricing configuration file (`/config/pricing.ts`):
   - Base price per km: €X (to be defined with Rachel)
   - Minimum fare: €Y
   - Time-based rate: €Z per minute
   - Airport surcharge: €A (CDG/Orly)
   - Night surcharge: +X% (22h-6h)
   - Weekend surcharge: +Y% (optional)
   - Options surcharges:
     - Siège enfant: +€5
     - Bagages volumineux: +€10
     - Temps d'attente: €15/h
2. Create `calculatePrice()` function:
   - Inputs: distance (km), duration (min), datetime, options, addresses
   - Apply base calculation: (km * rate) + (min * time_rate)
   - Apply minimum fare if below threshold
   - Apply surcharges if applicable (airport, night, weekend, options)
   - Return: { basePrice, surcharges[], totalPrice }
3. Call Google Distance Matrix API to get distance/duration
4. Display price breakdown in UI:
   - Base fare: €X
   - Airport surcharge: +€Y
   - Night surcharge: +€Z
   - Options: +€A
   - **Total: €TOTAL** (prominent display)
5. Recalculate price when:
   - Addresses change
   - DateTime changes (night/weekend detection)
   - Options change
6. Show "Calcul en cours..." skeleton while fetching route data
7. Handle edge cases:
   - API failure → Show error, suggest retry
   - Very long distance → Show warning, confirm intent
8. Store price in form state for later confirmation
9. Test price calculation with various scenarios:
   - Short trip Paris intra-muros
   - Long trip Paris → CDG
   - Night booking
   - Weekend with options
10. Verify calculations match expected formulas

### Story 3.5: Booking Form - Step 3 (Confirmation)

**As a** user,  
**I want** to review my booking details before confirming,  
**so that** I can ensure everything is correct.

**Acceptance Criteria:**

1. Navigate to Step 3 after completing Step 2
2. Show progress indicator (Step 3 of 3)
3. Display complete booking summary:
   - **Trajet:**
     - Pickup address (with map pin icon)
     - Drop-off address (with map pin icon)
     - Distance: X km, Duration: Y min
   - **Date et heure:**
     - Day, date, time formatted nicely
   - **Passagers:** X
   - **Options:** List selected options
   - **Notes:** Display if any
4. Display interactive map:
   - Show route between pickup and drop-off
   - Markers on both locations
   - Route polyline
   - Fit bounds to show entire route
5. Price breakdown card (prominent):
   - Base price
   - Surcharges (itemized)
   - **Total price** (large, bold)
6. Payment method selector:
   - "Payer maintenant" (radio button, default)
   - "Payer avant la course" (radio button)
   - Show selected payment method if saved (future epic)
7. Terms acceptance:
   - Checkbox: "J'accepte les CGV et la politique d'annulation"
   - Link to terms (open in modal or new tab)
8. Action buttons:
   - "Retour" (back to Step 2, preserve data)
   - "Confirmer la réservation" (primary, large)
     - Disabled until terms accepted
     - Show loading spinner on click
9. On confirm:
   - Validate all data one last time
   - Call API to create booking
   - If payment "now", redirect to payment (Epic 4)
   - If payment "later", show success page
10. Handle errors:
    - Slot no longer available → Show alert, back to Step 2
    - Server error → Show retry option
11. Responsive design for map + summary
12. Test confirmation flow end-to-end

### Story 3.6: Create Booking API & Database Persistence

**As a** developer,  
**I want** to save confirmed bookings to the database,  
**so that** they are persisted and accessible.

**Acceptance Criteria:**

1. Create API route `/api/bookings` (POST)
2. Validate request body with Zod schema:
   - user_id (from auth session)
   - pickup_address, pickup_lat, pickup_lng
   - dropoff_address, dropoff_lat, dropoff_lng
   - datetime (ISO string)
   - passenger_count
   - options (JSON: child_seat, luggage, wait_time, notes)
   - distance_km, duration_min
   - price_breakdown (JSON: base, surcharges, total)
   - payment_intent (enum: 'now', 'later')
3. Server-side validations:
   - User is authenticated
   - Datetime is in future (minimum 2h ahead)
   - Slot is available (check `blocked_slots`)
   - Addresses are within service area
4. Insert booking into `bookings` table:
   - Generate unique booking_id
   - Set status: 'pending' (awaiting confirmation)
   - Set created_at timestamp
5. Return response:
   - Success: { booking_id, status, message }
   - Error: { error, message }
6. Implement RLS policy:
   - User can insert their own bookings
   - User can read their own bookings
7. Transaction safety:
   - Use database transactions if multiple inserts
   - Rollback on error
8. Logging:
   - Log all booking creations (user_id, booking_id, timestamp)
   - Log errors with context
9. Test API endpoint:
   - Valid booking → 201 Created
   - Invalid data → 400 Bad Request
   - Unauthorized → 401 Unauthorized
   - Slot conflict → 409 Conflict
10. Test RLS: User A cannot see User B's bookings

### Story 3.7: Booking Confirmation Page

**As a** user,  
**I want** to see a confirmation after booking,  
**so that** I know my reservation was successful.

**Acceptance Criteria:**

1. Create `/book/success` page (authenticated)
2. Show success animation (confetti, checkmark, celebration)
3. Display confirmation message:
   - "Réservation confirmée !" (large heading)
   - "Nous avons bien reçu votre demande"
4. Show booking details card:
   - Booking reference number (e.g., "VTC-20260109-001")
   - Pickup address
   - Drop-off address
   - Date and time
   - Price
   - Status: "En attente de confirmation"
5. Show next steps:
   - "Rachel va confirmer votre réservation prochainement"
   - "Vous recevrez un email de confirmation"
   - If payment "later": "Paiement requis 24h avant la course"
6. Action buttons:
   - "Voir mes réservations" (link to /bookings)
   - "Retour à l'accueil" (link to /dashboard)
   - "Réserver une autre course" (link to /book)
7. Send confirmation email (trigger from API):
   - Email with booking details
   - Link to view booking
   - Contact info for questions
8. If payment "now" was selected:
   - Show "Procéder au paiement" button
   - Redirect to Stripe Checkout (Epic 4)
9. Responsive design
10. Test confirmation page displays correctly
11. Verify email is sent (check spam folder too)

### Story 3.8: Booking History & List View

**As a** user,  
**I want** to see all my bookings (upcoming and past),  
**so that** I can track my rides.

**Acceptance Criteria:**

1. Create `/bookings` page (authenticated)
2. Fetch user's bookings from Supabase (RLS filters automatically)
3. Display bookings in categorized lists:
   - **À venir** (upcoming): status = 'confirmed', datetime >= now
   - **En attente** (pending): status = 'pending'
   - **Passées** (past): status = 'completed' or datetime < now
   - **Annulées** (cancelled): status = 'cancelled'
4. Each booking card shows:
   - Booking reference
   - Pickup → Drop-off (short format)
   - Date and time
   - Price
   - Status badge (color-coded)
   - Action button: "Voir détails"
5. Empty states for each category:
   - "Aucune réservation à venir"
   - Illustration + CTA to book
6. Filters/Sorting (optional for MVP):
   - Sort by date (ascending/descending)
   - Filter by status
7. Pagination or infinite scroll if many bookings
8. Loading skeleton while fetching data
9. Pull to refresh on mobile
10. Card click opens booking detail page
11. Responsive grid (1 col mobile, 2-3 cols desktop)
12. Test with various booking counts (0, 1, 10, 50)

### Story 3.9: Booking Detail View

**As a** user,  
**I want** to view full details of a specific booking,  
**so that** I have all the information I need.

**Acceptance Criteria:**

1. Create `/bookings/[id]` dynamic route (authenticated)
2. Fetch booking by ID from Supabase (RLS ensures user owns it)
3. Display comprehensive booking information:
   - Booking reference (large, copyable)
   - Status badge (prominent)
   - **Trajet:**
     - Pickup address (full)
     - Drop-off address (full)
     - Distance, duration
   - **Date et heure:**
     - Full formatted date/time
   - **Détails:**
     - Passengers
     - Options selected
     - Notes
   - **Prix:**
     - Price breakdown (base + surcharges)
     - Total
     - Payment status (paid/unpaid)
4. Show interactive map with route
5. Timeline/History section:
   - Booking created: [datetime]
   - Confirmed by Rachel: [datetime] (if applicable)
   - Paid: [datetime] (if applicable)
   - Completed: [datetime] (if applicable)
6. Action buttons (conditional based on status):
   - **If pending or confirmed:**
     - "Modifier" (if > 4h before ride)
     - "Annuler" (with cancellation policy info)
   - **If payment unpaid:**
     - "Payer maintenant"
   - **If completed:**
     - "Télécharger la facture" (PDF)
     - "Réserver à nouveau" (pre-fill form with same details)
7. Contact options:
   - "Contacter Rachel" button (opens email or phone)
8. 404 page if booking not found or unauthorized
9. Responsive design
10. Test detail page with bookings in various states
11. Verify RLS prevents viewing other users' bookings

### Story 3.10: Modify & Cancel Booking

**As a** user,  
**I want** to modify or cancel my booking if needed,  
**so that** I have flexibility with my plans.

**Acceptance Criteria:**

1. Add "Modifier" button on booking detail page
2. Modification rules:
   - Only allowed if booking status = 'pending' or 'confirmed'
   - Only allowed if > 4h before scheduled time
   - Cannot modify if already in progress or completed
3. On click "Modifier":
   - Open modification form (similar to booking form)
   - Pre-fill with current booking data
   - Allow changing: addresses, datetime, options
   - Recalculate price if changes affect pricing
4. Save modification:
   - Update booking in database
   - Log modification in history (old values → new values)
   - Send update email to user and Rachel
   - Show success message
5. Add "Annuler" button on booking detail page
6. Cancellation rules:
   - Free cancellation if > 12h before ride
   - 50% fee if 4-12h before ride
   - 100% fee if < 4h before ride (no refund)
7. On click "Annuler":
   - Show confirmation dialog with cancellation policy
   - Display applicable cancellation fee
   - Require confirmation: "Oui, annuler"
8. Process cancellation:
   - Update booking status to 'cancelled'
   - Calculate and process refund if applicable (Epic 4 - Stripe)
   - Log cancellation with reason (optional user input)
   - Send cancellation email to user and Rachel
   - Show cancellation confirmation
9. Once cancelled, booking cannot be modified or cancelled again
10. Test modification flow (change date, address, options)
11. Test cancellation with various timing scenarios
12. Verify refund amounts calculated correctly

---

## Epic 4: Payment Integration

**Epic Goal :** Intégrer Stripe pour accepter les paiements par carte bancaire, Apple Pay et Google Pay. Implémenter les webhooks pour confirmation de paiement, générer des factures PDF automatiques, et gérer les remboursements en cas d'annulation.

### Story 4.1: Stripe Account Setup & Configuration

**As a** developer,  
**I want** to configure Stripe integration,  
**so that** the app can accept payments securely.

**Acceptance Criteria:**

1. Create Stripe account (or use existing)
2. Enable Test Mode for development
3. Obtain API keys:
   - Publishable key (NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY)
   - Secret key (STRIPE_SECRET_KEY)
   - Webhook secret (STRIPE_WEBHOOK_SECRET)
4. Add API keys to environment variables (Vercel and local)
5. Install `stripe` npm package (Node SDK)
6. Install `@stripe/stripe-js` (client SDK)
7. Create Stripe client in `/lib/stripe/client.ts`
8. Create Stripe server instance in `/lib/stripe/server.ts`
9. Configure Stripe account settings:
   - Business name: "VTC Rachel"
   - Currency: EUR
   - Payment methods: Card, Apple Pay, Google Pay
10. Enable webhook endpoint in Stripe dashboard (will configure in Story 4.5)
11. Test API connection (create test payment intent)
12. Document Stripe setup in README

### Story 4.2: Stripe Checkout Integration

**As a** user who wants to pay now,  
**I want** to complete payment securely,  
**so that** my booking is confirmed immediately.

**Acceptance Criteria:**

1. Create API route `/api/stripe/create-checkout-session` (POST)
2. Input: booking_id
3. Fetch booking details from database
4. Create Stripe Checkout Session:
   - Amount: booking total price (in cents)
   - Currency: EUR
   - Line items: Booking description with details
   - Customer email: user email
   - Success URL: `/bookings/[id]?payment=success`
   - Cancel URL: `/bookings/[id]?payment=cancelled`
   - Metadata: { booking_id, user_id }
5. Return Checkout Session URL to client
6. On client, redirect to Stripe Checkout:
   - Use `redirectToCheckout()` with session ID
7. Stripe Checkout page:
   - User enters card details
   - Apple Pay / Google Pay buttons automatically shown
   - Secure, PCI-compliant (handled by Stripe)
8. After payment:
   - If success → Redirect to success URL
   - If cancel → Redirect to cancel URL
9. Show payment status on booking detail page:
   - Success: "Paiement effectué avec succès !"
   - Cancelled: "Paiement annulé. Vous pouvez réessayer."
10. Do NOT update booking status yet (wait for webhook - Story 4.5)
11. Test checkout flow in Stripe Test Mode:
    - Use test card 4242 4242 4242 4242
    - Test successful payment
    - Test declined payment (4000 0000 0000 0002)
    - Test expired card
12. Verify Apple Pay works on Safari iOS
13. Verify Google Pay works on Chrome Android

### Story 4.3: Payment Status & Confirmation

**As a** developer,  
**I want** to track payment status for each booking,  
**so that** I know which bookings are paid.

**Acceptance Criteria:**

1. Add `payment_status` column to `bookings` table:
   - Values: 'unpaid', 'pending', 'paid', 'refunded', 'failed'
   - Default: 'unpaid'
2. Add `stripe_payment_intent_id` column (store Stripe reference)
3. Add `paid_at` timestamp column
4. Update booking detail page to show payment status:
   - Badge with color coding
   - "Payé" (green), "En attente" (yellow), "Non payé" (red)
5. If unpaid and booking confirmed:
   - Show "Payer maintenant" button prominently
   - Show deadline: "Paiement requis avant [date 24h avant course]"
6. If paid:
   - Show payment confirmation
   - Show "Télécharger la facture" button
7. Send payment confirmation email:
   - Trigger when payment_status changes to 'paid'
   - Include receipt, booking details
   - Attach PDF invoice
8. Add payment info to admin dashboard:
   - Show payment status for each booking
   - Filter by unpaid/paid
9. Test payment status updates:
   - Verify status changes after webhook
   - Verify UI reflects status correctly
10. Test with various timing (payment before/after booking)

### Story 4.4: Invoice Generation (PDF)

**As a** user who paid for a booking,  
**I want** to receive a PDF invoice,  
**so that** I have proof of payment and can expense it.

**Acceptance Criteria:**

1. Install PDF generation library (`@react-pdf/renderer` or `pdfkit`)
2. Create invoice template (`/lib/invoice/template.tsx`):
   - Header: "VTC Rachel" logo + business info
   - "FACTURE" title
   - Invoice number: Generated from booking_id + date
   - Date d'émission
   - Client info: Name, email
   - Booking details:
     - Trajet: Pickup → Drop-off
     - Date et heure
     - Distance, durée
   - Price breakdown table:
     - Base price
     - Surcharges (itemized)
     - Total HT
     - TVA (si applicable)
     - Total TTC (bold)
   - Payment method: "Carte bancaire via Stripe"
   - Legal footer: SIRET, TVA, mentions obligatoires
3. Create function `generateInvoice(booking_id)`:
   - Fetch booking + user data
   - Render PDF from template
   - Return PDF buffer
4. Store invoices in Supabase Storage:
   - Bucket: `invoices`
   - Path: `invoices/{booking_id}.pdf`
   - Private (require auth to download)
5. Trigger invoice generation:
   - After payment confirmed (webhook Story 4.5)
   - Store invoice URL in `bookings` table
6. Create API route `/api/invoices/[booking_id]` (GET):
   - Verify user owns booking (RLS)
   - Retrieve PDF from storage
   - Return PDF file with proper headers
7. Add "Télécharger la facture" button on booking detail page:
   - Only visible if payment_status = 'paid'
   - Downloads PDF on click
8. Include invoice in payment confirmation email (attachment)
9. Test invoice generation:
   - Verify all data displays correctly
   - Test with various booking scenarios
10. Verify PDF is readable on mobile and desktop
11. Test download works across browsers

### Story 4.5: Stripe Webhooks & Payment Confirmation

**As a** developer,  
**I want** to handle Stripe webhooks reliably,  
**so that** booking and payment statuses are always in sync.

**Acceptance Criteria:**

1. Create webhook endpoint `/api/stripe/webhook` (POST)
2. Verify webhook signature (Stripe-Signature header):
   - Use `stripe.webhooks.constructEvent()`
   - Reject if signature invalid
3. Handle webhook events:
   - `checkout.session.completed`: Payment succeeded
   - `payment_intent.succeeded`: Payment confirmed
   - `payment_intent.payment_failed`: Payment failed
   - `charge.refunded`: Refund processed
4. On `checkout.session.completed`:
   - Extract booking_id from metadata
   - Update booking:
     - payment_status = 'paid'
     - status = 'confirmed' (if was pending)
     - stripe_payment_intent_id = event data
     - paid_at = now
   - Generate invoice (call generateInvoice())
   - Send payment confirmation email
   - Notify Rachel (new confirmed booking)
5. On `payment_intent.payment_failed`:
   - Update payment_status = 'failed'
   - Notify user (email: payment failed, try again)
6. On `charge.refunded`:
   - Update payment_status = 'refunded'
   - Notify user (email: refund processed)
7. Implement idempotency:
   - Store processed webhook IDs in database
   - Ignore duplicate webhooks
8. Logging:
   - Log all webhook events
   - Log processing results
9. Error handling:
   - If processing fails, return 500 (Stripe will retry)
   - If signature invalid, return 400
10. Configure webhook in Stripe dashboard:
    - URL: https://yourdomain.com/api/stripe/webhook
    - Events: Select relevant events
11. Test webhooks with Stripe CLI:
    - `stripe listen --forward-to localhost:3000/api/stripe/webhook`
    - Trigger test events
12. Test idempotency (send same webhook twice)
13. Verify database updates correctly after webhook

### Story 4.6: Refund Processing

**As a** user who cancelled a booking,  
**I want** to receive a refund if eligible,  
**so that** I'm not charged for a ride I didn't take.

**Acceptance Criteria:**

1. Create function `processRefund(booking_id, amount)`:
   - Fetch booking and payment_intent_id
   - Calculate refund amount based on cancellation policy:
     - >12h before: 100% refund
     - 4-12h before: 50% refund
     - <4h before: 0% refund
   - Call Stripe Refund API: `stripe.refunds.create()`
   - Return refund status
2. Update cancellation flow (Story 3.10):
   - After user confirms cancellation
   - If booking is paid, process refund automatically
   - Show refund amount in confirmation
3. Update booking on refund:
   - payment_status = 'refunded' (or 'partially_refunded')
   - refund_amount (store amount)
   - refunded_at timestamp
4. Send refund confirmation email:
   - "Votre remboursement a été traité"
   - Amount refunded
   - Processing time: 5-10 business days
5. Handle webhook `charge.refunded`:
   - Confirm refund processed
   - Update status if not already done
6. Admin view refunds:
   - Show refund amount in booking details
   - Filter/report on refunds
7. Edge cases:
   - Partial refunds
   - Refund failures (insufficient funds) → Log error, notify admin
8. Test refund flow:
   - Full refund (>12h cancellation)
   - Partial refund (4-12h cancellation)
   - No refund (<4h cancellation)
9. Verify refund appears in Stripe dashboard
10. Verify user receives email notification

### Story 4.7: Payment Method Management

**As a** user,  
**I want** to save my payment methods,  
**so that** future bookings are faster.

**Acceptance Criteria:**

1. Enable Stripe Customer feature:
   - Create Stripe Customer for each user on first payment
   - Store `stripe_customer_id` in `users` table
2. On Checkout Session creation:
   - Include `customer: stripe_customer_id`
   - Enable `save_payment_method: true`
3. After payment, payment method is saved to Stripe Customer
4. Create `/profile/payment-methods` page
5. Fetch saved payment methods via Stripe API:
   - `stripe.paymentMethods.list({ customer: stripe_customer_id })`
6. Display payment methods:
   - Card brand (Visa, Mastercard, Amex)
   - Last 4 digits
   - Expiry date
   - Default badge (if applicable)
7. Actions:
   - Set as default
   - Remove payment method
8. Add new payment method:
   - Use Stripe Payment Element
   - Save without charging
9. During booking, show saved payment methods:
   - User can select existing card
   - Or add new card
10. Use default payment method for one-click checkout (optional)
11. Test payment method management:
    - Add card
    - Set default
    - Remove card
12. Verify saved methods work for subsequent bookings

---

## Epic 5: Admin Dashboard Rachel

**Epic Goal :** Créer l'interface administrateur permettant à Rachel de gérer les réservations, voir les statistiques, bloquer ses disponibilités, et communiquer avec les clients.

### Story 5.1: Admin Authentication & Access Control

**As a** Rachel (admin),  
**I want** to securely access my admin dashboard,  
**so that** I can manage bookings.

**Acceptance Criteria:**

1. Add `role` column to `users` table:
   - Values: 'client', 'admin'
   - Default: 'client'
2. Set Rachel's user role to 'admin' (manual DB update or seed script)
3. Create middleware check for admin routes:
   - Verify user is authenticated
   - Verify user.role = 'admin'
   - If not admin → redirect to home with error message
4. Create admin route group `/admin/*`
5. Create admin layout (`/app/(admin)/layout.tsx`):
   - Different from client app layout
   - Admin sidebar navigation
6. Admin sidebar items:
   - Dashboard (overview)
   - Réservations (booking management)
   - Clients (customer list)
   - Disponibilités (calendar/availability)
   - Paramètres (settings)
7. Add admin link in header (only visible to admin users):
   - "Admin" button → links to /admin/dashboard
8. Test access control:
   - Admin can access /admin/*
   - Regular user redirected if they try /admin/*
9. Create admin login flow (if Rachel uses separate account)
10. Document admin account setup in README

### Story 5.2: Admin Dashboard Overview

**As a** Rachel (admin),  
**I want** to see key metrics at a glance,  
**so that** I know how my business is performing.

**Acceptance Criteria:**

1. Create `/admin/dashboard` page
2. Display key metrics (cards):
   - **Réservations aujourd'hui:** Count + list
   - **Réservations cette semaine:** Count
   - **Réservations ce mois:** Count
   - **Chiffre d'affaires du mois:** Total € (paid bookings)
   - **Clients récurrents:** Count (users with >1 booking)
   - **Taux d'annulation:** % (cancelled / total)
3. Fetch data from Supabase:
   - Query bookings with filters (date ranges, status)
   - Aggregate functions (count, sum)
4. Display upcoming bookings (next 7 days):
   - List view with essential info
   - Click to view details
5. Display recent activity feed:
   - New bookings
   - Payments received
   - Cancellations
   - (Last 10 activities)
6. Charts (optional for MVP, use simple library like Recharts):
   - Bookings per week (line chart)
   - Revenue per month (bar chart)
7. Quick actions:
   - "Nouvelle réservation" (manual booking for phone requests)
   - "Bloquer un créneau"
8. Refresh data button or auto-refresh every 5 min
9. Responsive design (admin might use desktop mostly, but mobile should work)
10. Loading states for data fetching
11. Empty states if no data yet
12. Test dashboard with various data scenarios

### Story 5.3: Admin Booking Management

**As a** Rachel (admin),  
**I want** to view and manage all bookings,  
**so that** I can confirm, modify or cancel them as needed.

**Acceptance Criteria:**

1. Create `/admin/bookings` page
2. Display all bookings in table or cards:
   - Booking reference
   - Client name
   - Pickup → Drop-off (truncated)
   - Date & time
   - Status (badge)
   - Payment status (badge)
   - Actions (buttons)
3. Filters:
   - Status: All / Pending / Confirmed / Completed / Cancelled
   - Date range picker
   - Payment status: All / Paid / Unpaid
   - Search by client name or booking reference
4. Sorting:
   - By date (ascending/descending)
   - By status
   - By price
5. Pagination (20 bookings per page)
6. Actions per booking:
   - View details (opens detail page)
   - Confirm (if pending)
   - Cancel (with reason input)
   - Contact client (opens email)
7. Bulk actions (optional):
   - Select multiple bookings
   - Confirm all selected
   - Export selected to CSV
8. Booking detail page (`/admin/bookings/[id]`):
   - All booking info (same as client view)
   - Client info (name, email, phone)
   - Payment info (amount, status, Stripe link)
   - Admin notes (internal, not visible to client)
   - Action buttons: Confirm, Cancel, Edit
9. Confirm booking:
   - Update status to 'confirmed'
   - Send confirmation email to client
   - Show success message
10. Cancel booking (admin-initiated):
    - Input cancellation reason
    - Process refund if paid
    - Notify client via email
11. Edit booking (admin can override restrictions)
12. Test booking management flows
13. Verify email notifications sent correctly

### Story 5.4: Calendar View & Availability Management

**As a** Rachel (admin),  
**I want** to see my bookings in a calendar and block unavailable times,  
**so that** I manage my schedule effectively.

**Acceptance Criteria:**

1. Install calendar library (`react-big-calendar` or `@fullcalendar/react`)
2. Create `/admin/calendar` page
3. Display calendar with month/week/day views:
   - Month view: Default, shows all bookings as events
   - Week view: Detailed hourly schedule
   - Day view: Detailed view of single day
4. Calendar events:
   - Each booking is an event
   - Color-coded by status:
     - Confirmed: Green
     - Pending: Yellow
     - Completed: Grey
     - Cancelled: Red
   - Event shows: Time, pickup location, client name (truncated)
5. Click event → Open booking detail modal or page
6. Add "Bloquer un créneau" button:
   - Opens form: Start date/time, End date/time, Reason (optional)
   - Creates blocked slot in `blocked_slots` table
   - Blocked slots appear on calendar (different style, e.g., striped)
7. Drag and drop to reschedule booking (optional, advanced):
   - Drag event to new time slot
   - Confirm change → Update booking
   - Notify client of change
8. Manage blocked slots:
   - List view of all blocked slots
   - Edit or delete blocked slots
9. Sync with external calendar (optional, future):
   - Export to .ics file
   - Integrate with Google Calendar (via API)
10. Responsive design (calendar lib should handle this)
11. Test calendar with various booking densities
12. Test blocking slots and verify clients cannot book those times

### Story 5.5: Client Management & Communication

**As a** Rachel (admin),  
**I want** to view client information and contact them,  
**so that** I can provide personalized service.

**Acceptance Criteria:**

1. Create `/admin/clients` page
2. Display list of all clients (users with bookings):
   - Avatar
   - Name
   - Email
   - Phone
   - Total bookings count
   - Total spent (€)
   - Last booking date
   - Actions: View, Contact
3. Search clients by name or email
4. Filter by:
   - Clients with upcoming bookings
   - Clients with >X bookings (loyal customers)
   - Clients who haven't booked in 30+ days (re-engagement)
5. Client detail page (`/admin/clients/[id]`):
   - Full client profile info
   - Booking history (list all bookings)
   - Total statistics (count, total spent, average rating if ratings exist)
   - Saved addresses
   - Notes (admin can add internal notes about client)
6. Contact client:
   - "Email" button → Opens mailto link or email composer
   - "Phone" button → tel: link (opens phone app on mobile)
   - "SMS" button → sms: link (optional)
7. Add internal note:
   - Textarea input
   - Save note associated with client
   - Notes visible only to admin
8. Export client list to CSV (for marketing, analysis)
9. RGPD compliance:
   - Admin can export all client data (per RGPD request)
   - Admin can delete client account (anonymize bookings)
10. Test client management features
11. Verify contact methods work on mobile and desktop

### Story 5.6: Admin Settings & Configuration

**As a** Rachel (admin),  
**I want** to configure app settings,  
**so that** the system behaves according to my business rules.

**Acceptance Criteria:**

1. Create `/admin/settings` page
2. Settings sections:
   - **Profile:** Rachel's info (name, email, phone, photo)
   - **Pricing:** Configure pricing rules
   - **Service Areas:** Define covered zones
   - **Notifications:** Email preferences for admin
   - **Business Info:** SIRET, TVA, legal info (for invoices)
   - **Email Templates:** Customize email content (optional)
3. Pricing configuration:
   - Base rate per km (€)
   - Minimum fare (€)
   - Time rate per minute (€)
   - Airport surcharge (€)
   - Night surcharge (%)
   - Weekend surcharge (%)
   - Option surcharges (seat, luggage, wait time)
   - Save → Updates pricing config file or database
4. Service areas:
   - List of cities/zones covered
   - Add/remove zones
   - Define geographic boundaries (future: map editor)
5. Notification preferences:
   - Email for new booking: On/Off
   - Email for cancellation: On/Off
   - Daily summary email: On/Off (time picker)
6. Business info form:
   - Business name
   - SIRET number
   - TVA intracommunautaire (if applicable)
   - Address
   - Phone, email
   - (Used in invoices and legal pages)
7. Save settings:
   - Store in database (settings table or JSON column in users)
   - Show success toast
8. Email template customization (advanced, optional):
   - Edit email subjects and bodies
   - Preview email
   - Merge fields: {{client_name}}, {{booking_ref}}, etc.
9. Test settings updates
10. Verify pricing changes reflect in new bookings
11. Verify business info appears correctly on invoices

---

## Epic 6: Notifications & Communications

**Epic Goal :** Implémenter le système d'emails transactionnels avec Resend et React Email, incluant confirmations de réservation, rappels, notifications pour Rachel, et emails de suivi.

### Story 6.1: Resend Integration & Email Setup

**As a** developer,  
**I want** to integrate Resend for sending emails,  
**so that** users and admin receive notifications.

**Acceptance Criteria:**

1. Create Resend account (resend.com)
2. Obtain API key (RESEND_API_KEY)
3. Add API key to environment variables
4. Install `resend` npm package
5. Install `@react-email/components` for email templates
6. Create Resend client in `/lib/email/client.ts`
7. Configure sender email:
   - Domain: yourdomain.com
   - From address: noreply@yourdomain.com or contact@yourdomain.com
   - Add domain to Resend, verify DNS records (SPF, DKIM)
8. Create email helper function `sendEmail({ to, subject, react })`:
   - Uses Resend API to send email
   - Accepts React component as email template
   - Returns success/error
9. Test email sending with simple test template
10. Verify emails arrive (check spam folder)
11. Test deliverability with mail-tester.com (score >8/10)

### Story 6.2: Email Templates with React Email

**As a** developer,  
**I want** to create beautiful email templates,  
**so that** all communications look professional.

**Acceptance Criteria:**

1. Create `/emails` folder for email templates
2. Create base email layout (`BaseEmail.tsx`):
   - Header with logo
   - Main content area
   - Footer with links, contact info, unsubscribe
   - Responsive design (mobile-friendly)
3. Style email templates with React Email components:
   - Use inline styles (email-safe)
   - Brand colors (forest green, gold, neutrals)
   - Typography (web-safe fonts)
4. Create email templates for:
   - Booking confirmation
   - Booking modification
   - Booking cancellation
   - Payment confirmation
   - Payment reminder
   - Pre-ride reminder
   - Post-ride thank you
   - Admin new booking notification
   - Password reset
5. Each template accepts props (data from database)
6. Use React Email preview feature for development:
   - `npm run email:dev` → Preview emails in browser
7. Test templates with various data
8. Verify rendering in different email clients:
   - Gmail, Outlook, Apple Mail, mobile
9. Ensure all links work (absolute URLs)
10. Test unsubscribe link (if applicable)

### Story 6.3: Booking Confirmation Email

**As a** user who just booked,  
**I want** to receive a confirmation email immediately,  
**so that** I have proof and details of my booking.

**Acceptance Criteria:**

1. Create `BookingConfirmationEmail.tsx` template
2. Email content:
   - Subject: "Réservation confirmée - [Booking Ref]"
   - Greeting: "Bonjour [Name],"
   - Message: "Votre réservation a été enregistrée avec succès."
   - Booking details card:
     - Booking reference
     - Pickup → Drop-off
     - Date & time
     - Passengers, options
     - Price
     - Payment status
   - Next steps:
     - "Rachel confirmera votre réservation prochainement."
     - If unpaid: "N'oubliez pas de payer avant [deadline]."
   - Action button: "Voir ma réservation" (links to booking detail page)
   - Contact info: Email, phone
   - Footer with legal links
3. Trigger email after booking creation:
   - In API route `/api/bookings` (POST), after DB insert
   - Call `sendEmail()` with BookingConfirmationEmail
4. Handle email sending errors gracefully:
   - Log error but don't fail booking creation
   - User still has booking, can see details in app
5. Test email sending with various booking types
6. Verify email arrives within 30 seconds
7. Test email display on mobile and desktop
8. Verify all links work correctly

### Story 6.4: Pre-Ride Reminder Emails

**As a** user with an upcoming booking,  
**I want** to receive reminders,  
**so that** I don't forget my ride.

**Acceptance Criteria:**

1. Create `ReminderEmail.tsx` template
2. Email content:
   - Subject: "Rappel : Votre course VTC demain/dans 2h"
   - Greeting: "Bonjour [Name],"
   - Message: "Rappel : Vous avez une course VTC prévue [when]."
   - Booking details (summary)
   - Action button: "Voir les détails"
   - Options to modify or cancel (with links)
   - Contact info if questions
3. Implement scheduled email system:
   - Option A: Cron job (Next.js API route + Vercel Cron)
   - Option B: Supabase pg_cron (database-level scheduling)
   - Option C: External service (e.g., Inngest, Trigger.dev)
4. Schedule reminders:
   - 24h before ride
   - 2h before ride
5. Create API route `/api/cron/send-reminders` (GET):
   - Fetch bookings scheduled in next 24h (not yet reminded)
   - Send 24h reminder emails
   - Mark as `reminder_24h_sent = true`
6. Create API route `/api/cron/send-urgent-reminders` (GET):
   - Fetch bookings in next 2h (not yet urgent reminded)
   - Send 2h reminder emails
   - Mark as `reminder_2h_sent = true`
7. Configure Vercel Cron (vercel.json):
   - Schedule `/api/cron/send-reminders` daily at 9 AM
   - Schedule `/api/cron/send-urgent-reminders` every hour
8. Add reminder tracking to bookings table:
   - `reminder_24h_sent` (boolean)
   - `reminder_2h_sent` (boolean)
9. Test reminders:
   - Create booking tomorrow → Should receive 24h reminder
   - Create booking in 1h → Should receive 2h reminder
10. Verify cron jobs run correctly (check Vercel logs)
11. Test reminder opt-out (if user disabled email notifications)

### Story 6.5: Admin Notifications (New Booking, Cancellation)

**As a** Rachel (admin),  
**I want** to be notified immediately of new bookings and cancellations,  
**so that** I can respond quickly.

**Acceptance Criteria:**

1. Create `AdminNewBookingEmail.tsx` template
2. Email content:
   - Subject: "Nouvelle réservation - [Booking Ref]"
   - Message: "Vous avez une nouvelle réservation !"
   - Booking details (full)
   - Client info (name, email, phone)
   - Payment status
   - Action button: "Confirmer la réservation" (links to admin booking detail)
3. Trigger after booking creation:
   - In `/api/bookings` POST route
   - Send to Rachel's admin email
4. Create `AdminCancellationEmail.tsx` template
5. Email content:
   - Subject: "Réservation annulée - [Booking Ref]"
   - Message: "Une réservation a été annulée."
   - Booking details
   - Client info
   - Cancellation reason (if provided)
   - Refund amount (if applicable)
6. Trigger after cancellation:
   - In cancellation API route
   - Send to Rachel's admin email
7. Configure admin email preferences:
   - Rachel can enable/disable notifications in `/admin/settings`
   - Check preferences before sending
8. Test admin notifications:
   - Create booking → Rachel receives email
   - Cancel booking → Rachel receives cancellation email
9. Verify admin can disable notifications if desired
10. Consider SMS notifications (optional, future with Twilio)

### Story 6.6: Payment Confirmation & Receipt Email

**As a** user who just paid,  
**I want** to receive a payment receipt,  
**so that** I have proof of payment and my invoice.

**Acceptance Criteria:**

1. Create `PaymentConfirmationEmail.tsx` template
2. Email content:
   - Subject: "Paiement confirmé - [Booking Ref]"
   - Greeting: "Bonjour [Name],"
   - Message: "Votre paiement de [Amount]€ a été accepté."
   - Payment details:
     - Amount paid
     - Payment method (last 4 digits of card)
     - Payment date
   - Booking details (summary)
   - Action button: "Télécharger la facture"
   - Thank you message
3. Attach PDF invoice:
   - Use Resend attachments feature
   - Include generated invoice PDF (Story 4.4)
4. Trigger email after webhook confirms payment:
   - In `/api/stripe/webhook`, on `checkout.session.completed`
   - After updating booking status
   - Call `sendEmail()` with attachment
5. Test payment confirmation email:
   - Complete test payment
   - Verify email arrives with PDF attachment
6. Test PDF attachment opens correctly from email
7. Verify email displays correctly with attachment

### Story 6.7: Post-Ride Thank You & Feedback Request

**As a** business owner (Rachel),  
**I want** to thank clients after their ride and request feedback,  
**so that** I improve service and encourage repeat bookings.

**Acceptance Criteria:**

1. Create `PostRideThankYouEmail.tsx` template
2. Email content:
   - Subject: "Merci pour votre confiance !"
   - Greeting: "Bonjour [Name],"
   - Thank you message: "Merci d'avoir choisi VTC Rachel pour votre trajet."
   - Recap: Brief booking details
   - Feedback request:
     - "Comment s'est passé votre trajet ?"
     - Link to feedback form or rating (optional, future story)
   - Promotional content (optional):
     - "Recommandez-nous à vos amis !" (referral, future)
     - Special offer for next booking
   - Action button: "Réserver à nouveau"
3. Trigger email after ride completion:
   - Option A: Manual (Rachel marks booking complete)
   - Option B: Automatic (24h after scheduled ride time)
4. Create cron job `/api/cron/send-post-ride-emails`:
   - Fetch bookings completed 24h ago (not yet thanked)
   - Send thank you emails
   - Mark as `thank_you_sent = true`
5. Schedule cron job (run daily)
6. Test thank you email:
   - Mark booking complete → Should receive email 24h later
7. Track feedback responses (future: feedback system)
8. A/B test subject lines and content (future optimization)

---

## Epic 7: Polish, Performance & Launch

**Epic Goal :** Optimiser les performances, finaliser la PWA, corriger les bugs, tester en profondeur, et déployer en production pour le lancement officiel.

### Story 7.1: Performance Optimization

**As a** user,  
**I want** the app to load and respond quickly,  
**so that** I have a smooth experience.

**Acceptance Criteria:**

1. Run Lighthouse audit on all major pages:
   - Landing page
   - Login/Signup
   - Dashboard
   - Booking form
   - Booking detail
   - Admin dashboard
2. Target Lighthouse scores (all pages):
   - Performance: >90
   - Accessibility: >90
   - Best Practices: >90
   - SEO: >90
3. Image optimization:
   - Audit all images (use next/image everywhere)
   - Convert to WebP
   - Provide proper width/height (prevent CLS)
   - Lazy load below-the-fold images
4. Code splitting:
   - Dynamic imports for heavy components (maps, charts, PDF generator)
   - Lazy load admin routes (separate bundle)
5. Font optimization:
   - Use next/font for Inter and Playfair Display
   - Preload critical fonts
   - Font subsetting if needed
6. JavaScript bundle optimization:
   - Analyze bundle with `@next/bundle-analyzer`
   - Tree-shake unused dependencies
   - Remove console.logs in production
7. API route optimization:
   - Add caching headers where appropriate
   - Optimize database queries (indexes, limit results)
   - Use Supabase RLS efficiently
8. Third-party script optimization:
   - Load Google Maps only when needed (booking page)
   - Load Stripe only on payment pages
9. Implement skeleton loaders everywhere (perceived performance)
10. Test on slow 3G connection (Lighthouse throttling)
11. Verify Core Web Vitals:
    - LCP < 2.5s
    - FID < 100ms
    - CLS < 0.1
12. Fix any performance issues identified

### Story 7.2: PWA Finalization & Offline Support

**As a** mobile user,  
**I want** the app to work offline and feel like a native app,  
**so that** I have a reliable experience.

**Acceptance Criteria:**

1. Verify PWA manifest is complete:
   - All required fields (name, short_name, icons, theme_color, etc.)
   - Icons in all sizes (192x192, 512x512, maskable)
   - Display: standalone
   - Start URL: /
2. Test PWA installation:
   - iOS Safari: Add to Home Screen
   - Chrome Android: Install prompt appears
   - Desktop Chrome: Install banner
3. Configure Service Worker caching strategy:
   - Cache static assets (JS, CSS, images)
   - Cache landing page for offline viewing
   - Network-first for API calls (with fallback)
   - Cache Google Fonts
4. Implement offline indicator:
   - Show banner when user goes offline
   - Hide when back online
5. Offline functionality:
   - User can view cached pages (landing, about)
   - User can view cached booking history (last fetched)
   - Booking creation queued if offline (sync when online - optional)
6. Test PWA features:
   - Install app on mobile
   - Use in airplane mode
   - Verify cached pages load
7. Add PWA meta tags:
   - `apple-mobile-web-app-capable`
   - `apple-mobile-web-app-status-bar-style`
   - Splash screens for iOS (various sizes)
8. Test standalone mode (no browser UI)
9. Verify app icon appears correctly on home screen
10. Test PWA update mechanism (Service Worker update prompt)

### Story 7.3: Bug Fixes & Edge Cases

**As a** developer,  
**I want** to identify and fix all known bugs,  
**so that** the app is stable for launch.

**Acceptance Criteria:**

1. Create bug tracking list (GitHub Issues or similar)
2. Test all user flows end-to-end:
   - Signup → Booking → Payment → View history
   - Login → Modify booking → Cancel
   - Admin: View booking → Confirm → Check calendar
3. Test error scenarios:
   - Network failures
   - API errors (Google Maps, Stripe)
   - Invalid form submissions
   - Payment failures
   - Database errors
4. Test edge cases:
   - Very long addresses (truncation, overflow)
   - Booking at midnight (date boundary)
   - Booking exactly 2h ahead (minimum time limit)
   - Multiple rapid bookings (race conditions)
   - Special characters in names/notes
   - Extremely long distance (validation)
5. Cross-browser testing:
   - Chrome, Firefox, Safari, Edge
   - iOS Safari, Chrome Android
6. Cross-device testing:
   - iPhone (various models)
   - Android phones (various sizes)
   - iPad/tablets
   - Desktop (various screen sizes)
7. Test with screen readers (VoiceOver, TalkBack)
8. Test keyboard-only navigation
9. Fix all identified bugs (prioritize by severity)
10. Verify fixes don't introduce new bugs (regression testing)
11. Document known limitations (if any remain)

### Story 7.4: Security Audit & Hardening

**As a** developer,  
**I want** to ensure the app is secure,  
**so that** user data and payments are protected.

**Acceptance Criteria:**

1. Run security checklist (OWASP Top 10):
   - ✅ SQL Injection: Supabase RLS + parameterized queries
   - ✅ XSS: React escapes by default, sanitize user input
   - ✅ CSRF: SameSite cookies, CSRF tokens if needed
   - ✅ Authentication: Secure JWT storage, httpOnly cookies
   - ✅ Sensitive data exposure: HTTPS only, no secrets in client code
   - ✅ Broken access control: RLS, middleware checks
   - ✅ Security misconfiguration: Review env vars, headers
   - ✅ Insecure deserialization: Validate all inputs
   - ✅ Using components with known vulnerabilities: `npm audit`
   - ✅ Insufficient logging & monitoring: Implement logging
2. Run `npm audit` and fix vulnerabilities
3. Review environment variables:
   - Ensure secrets not exposed in client
   - Use NEXT_PUBLIC_ prefix only for safe vars
4. Configure security headers (next.config.js):
   - Content-Security-Policy
   - X-Frame-Options: DENY
   - X-Content-Type-Options: nosniff
   - Referrer-Policy: strict-origin-when-cross-origin
5. Rate limiting:
   - Implement on sensitive endpoints (login, signup, booking)
   - Use Vercel Edge Config or middleware
6. Validate all API inputs with Zod
7. Sanitize user-generated content (notes, addresses)
8. Review Supabase RLS policies:
   - Test with different users
   - Ensure no data leakage
9. Review Stripe integration:
   - Verify webhooks use signature validation
   - Never trust client-side data for payments
10. Test authentication flows:
    - Try accessing protected routes without auth
    - Try SQL injection in forms
    - Try XSS payloads in inputs
11. Penetration testing (if budget allows, optional)
12. Document security measures in README

### Story 7.5: Analytics & Monitoring Setup

**As a** developer and business owner,  
**I want** to track usage and errors,  
**so that** I can improve the app and fix issues quickly.

**Acceptance Criteria:**

1. Enable Vercel Analytics (included free):
   - Track page views
   - Track Core Web Vitals
2. Install Google Analytics 4 (optional):
   - Create GA4 property
   - Add GA4 script with `next/script`
   - Track page views, events
3. Define key events to track:
   - Signup completed
   - Booking created
   - Payment completed
   - Booking cancelled
   - Admin action (confirm booking)
4. Implement event tracking:
   - Use `gtag()` or custom analytics function
   - Track conversions (booking → payment)
5. Setup error monitoring:
   - Option A: Sentry (error tracking SaaS)
   - Option B: Custom error logging to Supabase
6. Configure Sentry (if using):
   - Create Sentry project
   - Install `@sentry/nextjs`
   - Configure DSN in env vars
   - Test error reporting
7. Setup uptime monitoring:
   - Option A: Vercel built-in (deploy notifications)
   - Option B: UptimeRobot (free, ping every 5 min)
   - Option C: Pingdom, Better Uptime
8. Configure alerts:
   - Email if app goes down
   - Email on critical errors (payment failures)
9. Create admin stats dashboard (optional):
   - Show analytics data in admin panel
   - Track KPIs (bookings/week, conversion rate, etc.)
10. Test analytics tracking (use GA Debugger extension)
11. Verify errors are captured in Sentry (throw test error)
12. Document analytics setup in README

### Story 7.6: Content & Copywriting

**As a** user,  
**I want** to read clear, helpful content,  
**so that** I understand the service and feel confident booking.

**Acceptance Criteria:**

1. Review and polish all copy:
   - Landing page (hero, features, CTAs)
   - About page (Rachel's story, mission)
   - FAQ page (common questions, helpful answers)
   - Legal pages (CGV, privacy policy, cookies)
2. Write FAQ content:
   - How do I book?
   - How do I pay?
   - Can I modify my booking?
   - What's the cancellation policy?
   - What areas do you cover?
   - Do you provide child seats?
   - How do I contact Rachel?
   - (10-15 questions total)
3. Write legal pages (or hire legal writer):
   - **CGV (Terms of Service):**
     - Service description
     - Booking conditions
     - Cancellation policy
     - Liability limitations
     - Dispute resolution
   - **Privacy Policy:**
     - RGPD compliant
     - What data is collected
     - How data is used
     - User rights (access, deletion, export)
     - Cookie usage
   - **Politique Cookies:**
     - What cookies are used
     - Essential vs optional cookies
     - Cookie consent management
4. Add cookie consent banner (if using tracking cookies):
   - Use library like `react-cookie-consent`
   - User must accept before GA/analytics load
5. Proofread all text (grammar, spelling, tone)
6. Ensure consistent tone of voice (professional, warm, friendly)
7. Add microcopy:
   - Form placeholders
   - Button labels
   - Error messages
   - Empty states
8. Test readability (use Hemingway Editor or similar)
9. Translate key pages if planning multi-language (future)
10. Get feedback from Rachel on all content

### Story 7.7: User Acceptance Testing (UAT) with Rachel

**As a** Rachel (product owner),  
**I want** to test the app thoroughly,  
**so that** I can confirm it meets my needs before launch.

**Acceptance Criteria:**

1. Prepare UAT plan:
   - List of test scenarios for Rachel to execute
   - Test data (create test bookings, users)
2. UAT scenarios:
   - **Client flow:** Signup, book, pay, view history, cancel
   - **Admin flow:** View dashboard, confirm booking, block slot, manage clients
   - **Notifications:** Verify emails received and accurate
   - **Edge cases:** Try invalid inputs, test error handling
3. Schedule UAT session with Rachel:
   - Guide her through scenarios
   - Observe her usage, note pain points
   - Record feedback (Google Doc or Notion)
4. Rachel tests on her own devices:
   - Her iPhone (primary device)
   - Her laptop (if she uses admin panel on desktop)
5. Collect feedback:
   - What works well
   - What's confusing
   - What's missing
   - UI/UX improvements
   - Content changes needed
6. Prioritize feedback:
   - Critical (must fix before launch)
   - Important (nice to have)
   - Future (post-MVP)
7. Implement critical fixes
8. Retest with Rachel after fixes
9. Get final approval from Rachel
10. Document feedback and changes made

### Story 7.8: Beta Testing with Real Clients

**As a** developer,  
**I want** to test with real clients before public launch,  
**so that** I validate the app works in real conditions.

**Acceptance Criteria:**

1. Select 5-10 beta testers:
   - Rachel's existing clients (willing to test)
   - Friends/family
   - Diverse user profiles (tech-savvy and not)
2. Create beta testing group:
   - Communication channel (WhatsApp group, email list)
   - Instructions document
3. Provide beta test instructions:
   - How to install PWA
   - Test scenarios to try
   - How to report bugs/feedback
4. Beta test period: 1-2 weeks
5. Monitor usage:
   - Track bookings created by beta testers
   - Check for errors in logs
   - Monitor performance metrics
6. Collect feedback:
   - Survey (Google Forms): Rate features, report issues
   - Direct messages: Detailed feedback
7. Analyze feedback:
   - Common pain points
   - Feature requests
   - Bugs reported
8. Fix critical bugs discovered
9. Implement quick wins (easy improvements)
10. Thank beta testers (discount, free ride, acknowledgment)
11. Document beta test learnings

### Story 7.9: Final Pre-Launch Checklist

**As a** developer preparing for launch,  
**I want** to complete all pre-launch tasks,  
**so that** nothing is forgotten.

**Acceptance Criteria:**

1. Technical checklist:
   - ✅ All features complete and tested
   - ✅ All bugs fixed (critical and high priority)
   - ✅ Performance targets met (Lighthouse >90)
   - ✅ PWA fully functional
   - ✅ SEO optimized (meta tags, sitemap, robots.txt)
   - ✅ Analytics configured and tracking
   - ✅ Error monitoring active
   - ✅ Backups configured
   - ✅ Security hardened
2. Content checklist:
   - ✅ All copy written and proofread
   - ✅ FAQ complete
   - ✅ Legal pages (CGV, privacy, cookies)
   - ✅ About page with Rachel's info
   - ✅ Contact page with accurate info
3. Integrations checklist:
   - ✅ Stripe production mode enabled
   - ✅ Stripe webhooks configured (production URL)
   - ✅ Google Maps API configured (production domain)
   - ✅ Resend domain verified and sender configured
   - ✅ Supabase production database ready
4. Domain & hosting checklist:
   - ✅ Custom domain purchased and configured
   - ✅ DNS records set (A, CNAME, TXT for email)
   - ✅ SSL certificate active (automatic with Vercel)
   - ✅ Vercel production environment configured
   - ✅ Environment variables set in Vercel production
5. Business checklist:
   - ✅ Rachel trained on admin panel
   - ✅ Admin account set up for Rachel
   - ✅ Payment account (Stripe) active and verified
   - ✅ Bank account connected to Stripe for payouts
   - ✅ Business insurance verified (if required)
6. Marketing checklist:
   - ✅ Social media accounts created (if planned)
   - ✅ Google My Business listing updated with website
   - ✅ Launch announcement prepared (email, social)
7. Documentation checklist:
   - ✅ README complete with setup instructions
   - ✅ User guide for Rachel (how to use admin)
   - ✅ Technical documentation for future dev
8. Final tests:
   - ✅ Test signup flow in production
   - ✅ Test booking + payment in production (use real card, small amount, refund after)
   - ✅ Test email deliverability in production
   - ✅ Test PWA installation in production
9. Backup plan:
   - ✅ Rollback procedure documented
   - ✅ Emergency contact plan if issues arise
10. GO/NO-GO decision meeting with Rachel

### Story 7.10: Launch & Post-Launch Monitoring

**As a** developer launching the app,  
**I want** to deploy to production and monitor closely,  
**so that** any issues are caught and fixed quickly.

**Acceptance Criteria:**

1. Deploy to production:
   - Merge final code to `main` branch
   - Verify Vercel auto-deploys
   - Verify production URL is live
2. Smoke test production:
   - Visit all major pages
   - Test signup/login
   - Create test booking
   - Test payment (small amount, refund)
   - Test admin panel
3. Announce launch:
   - Send email to beta testers: "We're live!"
   - Rachel announces to existing clients
   - Post on social media (if applicable)
   - Update Google My Business with link
4. Monitor intensively (first 48h):
   - Check error logs every few hours
   - Monitor Vercel deployment status
   - Check Stripe dashboard for payments
   - Monitor email deliverability (Resend dashboard)
5. Track key metrics (first week):
   - New signups
   - Bookings created
   - Payments completed
   - Errors reported
   - User feedback
6. Be ready for hotfixes:
   - Fix critical bugs immediately
   - Deploy hotfixes within hours if needed
7. Gather user feedback:
   - Monitor support emails
   - Check app reviews (if on stores, future)
   - Survey early users
8. Create post-launch report:
   - Metrics summary (signups, bookings, revenue)
   - Issues encountered and resolved
   - User feedback summary
   - Lessons learned
9. Plan iteration cycle:
   - Prioritize post-launch improvements
   - Schedule next development sprint
10. Celebrate launch with Rachel! 🎉

---

## Checklist Results Report

*[This section will be populated after running the PM checklist to validate the PRD]*

**PM Checklist Status:** Pending

**Key Validation Points:**
- ✅ All Epic Goals are clear and achievable
- ✅ User Stories follow proper format (As a... I want... So that...)
- ✅ Acceptance Criteria are specific, measurable, and testable
- ✅ Epic sequencing is logical (Foundation → Auth → Core Features → Payment → Admin → Notifications → Polish)
- ✅ MVP scope is realistic for a solo developer (3-4 months timeline)
- ✅ Technical stack is modern and well-justified (Next.js + Supabase + Stripe)
- ✅ Non-functional requirements cover security, performance, accessibility
- ⚠️ Pricing model details need confirmation with Rachel (FR46)
- ⚠️ Service area boundaries need precise definition (FR47)
- ⚠️ Legal content (CGV, Privacy) needs professional review or legal consultation

**Recommendations:**
1. Schedule pricing discussion with Rachel before Epic 3 (Story 3.4)
2. Define precise service area coordinates for Google Maps validation
3. Consider hiring legal consultant for CGV/Privacy policy (Story 7.6)
4. Plan regular check-ins with Rachel during development (bi-weekly demos)
5. Create a staging environment for Rachel to test before UAT (Story 7.7)

---

## Next Steps

### UX Expert Prompt

**Context:** This PRD defines a comprehensive VTC booking platform with 7 Epics and 50+ User Stories.

**Your Mission:** Create the **Front-End Specification Document** that will guide the visual design and user experience implementation. 

**Focus Areas:**
1. **Design System:**
   - Complete component library (buttons, inputs, cards, modals, etc.)
   - Color palette with exact hex values and usage guidelines
   - Typography system (font scales, weights, line heights)
   - Spacing system (margins, paddings, grid)
   - Icon set and illustration style
   
2. **Wireframes & Mockups:**
   - All pages from User Stories (landing, dashboard, booking flow, admin)
   - Desktop and mobile versions
   - Interactive states (hover, focus, active, disabled, error)
   - Loading states and skeleton screens
   - Empty states with helpful guidance
   
3. **User Flows:**
   - Booking flow (Step 1 → 2 → 3 → Payment → Confirmation)
   - Signup/Login flows (including OAuth)
   - Profile management flows
   - Admin workflows (confirm booking, manage calendar)
   - Error recovery flows
   
4. **Responsive Design:**
   - Breakpoints definition (mobile, tablet, desktop)
   - Component adaptations per breakpoint
   - Touch targets for mobile (44px minimum)
   - Navigation patterns (mobile: bottom nav, desktop: sidebar)
   
5. **Animations & Micro-interactions:**
   - Page transitions (route changes)
   - Component animations (modals, toasts, dropdowns)
   - Loading animations (skeleton screens, spinners)
   - Success celebrations (confetti, checkmarks)
   - Interactive feedback (button press, input focus)
   
6. **Accessibility Guidelines:**
   - WCAG 2.1 AA compliance specifics
   - Keyboard navigation flows
   - Screen reader considerations
   - Focus management patterns
   - Color contrast ratios for all text

**Reference:**
- Brand colors: Forest Green (#0F4C3A), Gold (#D4AF37), White, Neutrals
- Inspiration: Blacklane, Air France, Apple design language
- Priority: Design must "bluffe" (impress) while remaining intuitive

**Deliverables:**
- `docs/frontend-spec.md` with all specifications
- Figma/Sketch files (optional) or detailed wireframes in markdown
- Component specifications for ShadCN UI customization

---

### Architect Prompt

**Context:** This PRD defines a VTC booking platform built with Next.js 14 (App Router), Supabase, Stripe, and Google Maps.

**Your Mission:** Create the **Technical Architecture Document** that will guide the implementation of all 50+ User Stories.

**Focus Areas:**
1. **System Architecture:**
   - Next.js 14 App Router structure (detailed file organization)
   - Server Components vs Client Components strategy
   - Server Actions for mutations
   - API Routes for external webhooks and proxies
   - Middleware for authentication and authorization
   
2. **Database Architecture:**
   - Complete PostgreSQL schema (all tables, columns, types, constraints)
   - Relationships and foreign keys
   - Indexes for query optimization
   - Row Level Security (RLS) policies for each table
   - Migration strategy
   - Triggers and functions (if any)
   
3. **Authentication & Authorization:**
   - Supabase Auth flow (JWT, refresh tokens)
   - OAuth providers integration (Google, Apple)
   - Session management (cookies, storage)
   - Role-based access control (client vs admin)
   - Protected routes implementation (middleware)
   
4. **External Integrations:**
   - **Stripe:** Payment flow, webhooks, refunds, customers
   - **Google Maps:** API usage strategy, caching, rate limiting
   - **Resend:** Email sending, templates, deliverability
   - **Supabase Storage:** File uploads (avatars, invoices)
   
5. **API Design:**
   - REST API endpoints (list all routes)
   - Request/response schemas (TypeScript interfaces)
   - Validation strategy (Zod schemas)
   - Error handling patterns
   - Rate limiting implementation
   
6. **State Management:**
   - Client-side state (Zustand stores structure)
   - Server-side state (React Server Components)
   - Form state (React Hook Form patterns)
   - Optimistic UI updates
   
7. **Performance Optimizations:**
   - Code splitting strategy
   - Image optimization (next/image configuration)
   - Font optimization (next/font setup)
   - Bundle analysis and reduction
   - Caching strategies (browser, CDN, database)
   
8. **Security Architecture:**
   - OWASP Top 10 mitigation strategies
   - Input validation and sanitization
   - XSS and CSRF protection
   - Secrets management (environment variables)
   - Security headers configuration
   
9. **DevOps & Deployment:**
   - CI/CD pipeline (GitHub Actions + Vercel)
   - Environment management (dev, staging, production)
   - Database migrations workflow
   - Monitoring and logging strategy
   - Backup and disaster recovery
   
10. **Testing Strategy:**
    - Unit tests (Vitest)
    - Integration tests (API routes, Server Actions)
    - E2E tests (Playwright, optional)
    - Test coverage targets
    - CI test automation

**Technical Constraints:**
- Budget: €0/month initially (use free tiers)
- Timeline: 3-4 months solo development
- Developer: Junior (École 42 student, first production app)
- Scalability: Support 500 bookings/month without infrastructure changes

**Deliverables:**
- `docs/architecture.md` with complete technical specification
- Database schema diagram (ERD)
- System architecture diagrams (components, data flow)
- API endpoint documentation
- Deployment guide

---

*Document Version: 1.0*  
*Created: 2026-01-09*  
*Status: Complete - Ready for Review*  
*Next Step: PM Validation → UX Expert → Architect*

---

## Checklist Results Report

*[Ce rapport sera généré après validation du PRD avec le PM Checklist]*

---

## Next Steps

### UX Expert Prompt

Veuillez créer la **Front-End Specification** détaillée en vous basant sur ce PRD. Focus sur :
- Design system complet (composants, variants, states)
- Wireframes de toutes les pages core
- User flows illustrés (booking, signup, payment)
- Responsive breakpoints et adaptations
- Animations et micro-interactions
- Accessibility guidelines détaillées

### Architect Prompt

Veuillez créer l'**Architecture Document** technique en vous basant sur ce PRD. Focus sur :
- Architecture Next.js détaillée (App Router, Server Components, API Routes)
- Schéma de base de données PostgreSQL complet avec relations
- Intégrations tierces (Supabase Auth, Stripe, Google Maps, Resend)
- Security architecture (RLS, JWT, API rate limiting)
- Deployment architecture (Vercel, CI/CD, environments)
- Performance optimizations (caching, code splitting, image optimization)
- Error handling et logging strategy

---

*Document créé le : 2026-01-09*  
*Version : 1.0*  
*Statut : Draft - En attente validation*  
*Auteur : Équipe VTC Rachel*
