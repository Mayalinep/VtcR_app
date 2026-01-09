# Project Brief: VTC Rachel - Application de Réservation

<!-- Powered by BMAD™ Core -->

## Executive Summary

**VTC Rachel** est une Progressive Web App (PWA) permettant aux clients de réserver facilement des courses de transport avec chauffeur (VTC). L'application offre une expérience utilisateur fluide et professionnelle avec réservation en ligne, paiement sécurisé, suivi en temps réel et gestion de profil client. L'objectif principal est de fournir une plateforme moderne et accessible qui digitalise le service VTC de Rachel et améliore l'expérience client tout en optimisant la gestion des réservations.

**Problème résolu :** Éliminer les frictions liées aux réservations téléphoniques ou par email, offrir une transparence complète sur les tarifs et disponibilités, et moderniser l'image du service VTC.

**Marché cible :** Clients professionnels et particuliers recherchant un service de VTC fiable et facile à réserver dans la région parisienne.

**Proposition de valeur :** Une application web intuitive, accessible depuis n'importe quel appareil, permettant de réserver, payer et gérer ses courses VTC en quelques clics, avec un service personnalisé et professionnel.

---

## Problem Statement

### État actuel et points de douleur

**Contexte de Rachel :**
Rachel est actuellement chauffeur VTC principalement sur Uber. Elle souhaite **se détacher de cette plateforme** pour :
- Échapper aux **commissions élevées d'Uber** (~25% par course)
- Réduire le **nombre de courses** (actuellement épuisée par le volume Uber)
- Se positionner sur un **service premium/luxe** avec des courses mieux rémunérées
- Développer sa **propre clientèle** et garder la relation directe

**Aujourd'hui :**
- Rachel dépend à ~90% d'Uber pour ses courses
- Elle donne parfois sa carte de visite pour être appelée directement
- Confirmations manuelles par téléphone pour les clients directs
- Aucun système de réservation en ligne propre
- Pas de visibilité sur l'historique client
- Gestion administrative chronophage

### Impact du problème

**Pour Rachel (situation critique) :**
- **Épuisement professionnel** : Volume de courses Uber trop élevé, rentabilité faible après commission
- **Dépendance financière** : 25% du CA part à Uber, réduisant drastiquement la rentabilité
- **Impossibilité de monter en gamme** : Uber impose un positionnement prix/volume incompatible avec le luxe
- **Pas de relation client** : Les clients sont "clients Uber", pas "clients Rachel"
- **Manque de flexibilité** : Subit l'algorithme Uber, ne choisit pas ses courses

**Pour les clients potentiels premium :**
- Pas de moyen de réserver Rachel directement
- Expérience Uber standardisée, pas de service personnalisé
- Pas d'historique/fidélisation avec Rachel spécifiquement

**Objectif chiffré de Rachel :**
- Passer de "X courses Uber/jour" à **5-10 courses premium/jour**
- **5 courses aéroport = journée rentable** (vs 15-20 courses Uber pour même CA)
- Réduire volume, augmenter qualité et marge

### Pourquoi les solutions existantes sont insuffisantes

- **Uber :** Commissions prohibitives (~25%), épuisement, pas de différenciation possible, relation client inexistante
- **Autres plateformes VTC (G7, Heetch) :** Même problème de commission et perte de marge
- **Site web statique + téléphone :** Pas assez moderne, confirmations manuelles = charge administrative
- **Pas de solution pour chauffeur indépendant** : Outils pros trop chers ou trop complexes

### Urgence et importance

**Urgence immédiate :**
- Rachel est **épuisée** par le rythme Uber actuel
- **Besoin de transition professionnelle** vers indépendance et montée en gamme
- Chaque mois sans solution = **25% du CA perdu** en commissions Uber
- Risque de **burn-out** si la situation perdure

**Importance stratégique :**
- Cette app n'est pas qu'un outil de réservation, c'est un **outil d'émancipation professionnelle**
- Permet à Rachel de construire **son propre business** premium
- Crée les bases pour **développer une petite flotte** à terme (collaborateurs VTC mentionnés)

---

## Proposed Solution

### Concept et approche

**VTC Rachel** est une Progressive Web App (PWA) qui permet aux clients de :
1. **Rechercher et réserver** une course en temps réel avec confirmation instantanée
2. **Payer en ligne** de manière sécurisée via carte bancaire ou Apple Pay/Google Pay
3. **Gérer leur profil** et consulter l'historique de leurs courses
4. **Suivre leur chauffeur** en temps réel le jour de la course
5. **Communiquer** directement avec le service via messagerie intégrée

### Différenciateurs clés

- **Service personnalisé :** Contrairement aux grandes plateformes, maintien d'une relation client directe et d'un service haut de gamme
- **0% de commission externe :** Solution propriétaire sans intermédiaire, maximisant la rentabilité
- **PWA moderne :** Fonctionne sur tous les appareils (mobile, tablette, desktop) sans téléchargement depuis les stores, installation simplifiée
- **Tarification transparente :** Calcul de tarif instantané avant confirmation, sans mauvaises surprises
- **Flexibilité :** Gestion autonome des modifications et annulations selon les conditions définies

### Pourquoi cette solution réussira

- **Expérience utilisateur optimale :** Interface moderne et intuitive inspirée des meilleures pratiques UX/UI
- **Technologie PWA :** Coûts de développement et maintenance réduits par rapport à des apps natives iOS/Android
- **Scalabilité :** Architecture permettant d'ajouter facilement de nouveaux chauffeurs ou fonctionnalités
- **Indépendance :** Rachel garde le contrôle total de sa relation client et de ses données

### Vision haut niveau

Une plateforme digitale complète qui devient l'interface principale entre Rachel et ses clients, permettant de gérer l'ensemble du cycle de vie d'une course (de la réservation au paiement) tout en offrant des outils d'analyse pour optimiser l'activité.

---

## Target Users

### Primary User Segment: Clients particuliers et professionnels

**Profil démographique :**
- Âge : 25-65 ans
- Localisation : Région parisienne et zones desservies par Rachel
- CSP : CSP+ (cadres, professions libérales, entrepreneurs)
- Équipement : Smartphone iOS/Android, accès internet

**Comportements et workflows actuels :**
- Utilisent déjà des services de VTC (Uber, G7) ou taxis pour leurs déplacements professionnels ou personnels
- Habitués aux applications mobiles pour leurs services quotidiens
- Recherchent un service fiable pour des occasions importantes (aéroport, événements, déplacements professionnels)
- Apprécient la qualité de service et la ponctualité

**Besoins et points de douleur spécifiques :**
- Besoin de **réserver rapidement** sans passer par téléphone
- Besoin de **transparence sur les tarifs** avant de confirmer
- Besoin de **traçabilité** de leurs dépenses (notamment pour notes de frais professionnelles)
- Besoin de **fiabilité** et de qualité de service (voiture propre, chauffeur professionnel)
- Besoin de **flexibilité** pour modifier ou annuler si nécessaire

**Objectifs :**
- Se déplacer de manière confortable et ponctuelle
- Gérer leurs réservations de transport de façon autonome
- Bénéficier d'un service personnalisé et de qualité
- Optimiser leurs dépenses de transport

### Secondary User Segment: Rachel (Administrateur/Chauffeur)

**Profil :**
- Propriétaire et chauffeur VTC
- Besoin de gérer son planning et ses réservations efficacement
- Accès depuis mobile et desktop pour flexibilité

**Besoins spécifiques :**
- **Dashboard administrateur** pour visualiser et gérer les réservations
- **Notifications** en temps réel des nouvelles réservations
- **Gestion des disponibilités** et du planning
- **Accès aux informations clients** pour le service
- **Rapports d'activité** et statistiques

*Note : L'interface administrateur sera développée dans une phase ultérieure. Le MVP se concentre sur l'expérience client.*

---

## Goals & Success Metrics

### Business Objectives

- **Augmenter le taux de conversion des demandes :** Passer de ~70% à 95% de conversion des demandes en réservations confirmées dans les 6 premiers mois
- **Réduire la charge administrative :** Libérer 15h/semaine de gestion manuelle des réservations pour Rachel
- **Augmenter le chiffre d'affaires :** +30% de CA sur 12 mois grâce à une meilleure disponibilité et une acquisition client facilitée
- **Améliorer la fidélisation client :** Atteindre un taux de clients récurrents de 40% (vs ~25% actuellement) grâce à l'expérience utilisateur améliorée
- **Collecter des données clients :** Construire une base de données exploitable pour marketing et optimisation du service

### User Success Metrics

- **Temps de réservation :** < 3 minutes du premier clic à la confirmation
- **Taux de complétion de réservation :** > 85% des utilisateurs qui commencent une réservation la finalisent
- **Satisfaction utilisateur :** NPS (Net Promoter Score) > 70
- **Taux de retour :** 60% des utilisateurs utilisent l'app au moins 2 fois dans les 6 mois
- **Taux d'adoption PWA :** 40% des utilisateurs installent la PWA sur leur écran d'accueil

### Key Performance Indicators (KPIs)

- **Nombre de réservations/mois :** Objectif de 150 réservations/mois après 6 mois (vs ~80 actuellement)
- **Taux d'annulation :** < 10% des réservations confirmées
- **Temps de réponse moyen :** Confirmation instantanée automatique (vs 2-4h actuellement)
- **Panier moyen :** Maintenir ou augmenter le panier moyen actuel via upselling (options supplémentaires)
- **Taux de paiement en ligne :** > 80% des réservations payées en ligne
- **Disponibilité de l'application :** Uptime > 99.5%

---

## MVP Scope

### Core Features (Must Have)

#### 1. Réservation de course
- **Fonctionnalité :** Formulaire de réservation permettant de saisir départ, arrivée, date/heure, nombre de passagers, options (siège bébé, bagages, etc.)
- **Rationale :** Cœur de l'application, remplace le processus manuel actuel
- **Détails :**
  - Saisie d'adresse avec autocomplétion Google Places
  - Calcul de trajet et estimation tarifaire instantanée
  - Sélection date/heure avec détection de disponibilité
  - Récapitulatif clair avant confirmation

#### 2. Système de paiement en ligne
- **Fonctionnalité :** Intégration Stripe pour paiement CB, Apple Pay, Google Pay
- **Rationale :** Élimine la gestion d'espèces et facilite la traçabilité
- **Détails :**
  - Paiement sécurisé conforme PCI-DSS
  - Reçu et facture générés automatiquement
  - Options de paiement immédiat ou différé (avant la course)

#### 3. Gestion de profil client
- **Fonctionnalité :** Création de compte, connexion, modification des informations personnelles
- **Rationale :** Facilite les réservations répétées et la fidélisation
- **Détails :**
  - Inscription rapide (email + mot de passe ou Google/Apple Sign-In)
  - Sauvegarde des adresses favorites
  - Historique des courses avec détails et factures
  - Gestion des moyens de paiement enregistrés

#### 4. Notifications et confirmations
- **Fonctionnalité :** Emails et notifications push pour confirmation, rappels et mises à jour
- **Rationale :** Maintient le client informé et réduit les no-shows
- **Détails :**
  - Email de confirmation immédiate après réservation
  - Rappel 24h et 2h avant la course
  - Notification d'arrivée du chauffeur
  - Confirmation de fin de course avec remerciement

#### 5. Interface responsive PWA
- **Fonctionnalité :** Design mobile-first optimisé pour tous les écrans
- **Rationale :** Accessibilité maximale sans développement d'apps natives
- **Détails :**
  - Installation sur écran d'accueil (Add to Home Screen)
  - Fonctionnement hors ligne partiel (consultation historique)
  - Performance optimisée (Lighthouse score > 90)
  - Compatible iOS Safari, Chrome Android, desktop browsers

#### 6. Gestion des modifications et annulations
- **Fonctionnalité :** Permettre aux clients de modifier ou annuler leurs réservations selon conditions
- **Rationale :** Flexibilité client et réduction de la charge administrative
- **Détails :**
  - Modification gratuite jusqu'à 4h avant la course
  - Annulation gratuite jusqu'à 12h avant, partielle ensuite
  - Interface simple pour effectuer les changements
  - Confirmation automatique des modifications

### Out of Scope for MVP

- **Interface administrateur complète** (Rachel gérera via base de données ou interface basique temporaire)
- **Suivi GPS en temps réel** du véhicule pendant la course (ajouté en Phase 2)
- **Messagerie in-app** entre client et chauffeur (SMS/appel téléphonique en attendant)
- **Programme de fidélité** et système de points
- **Réservations récurrentes** automatiques (ex : trajet domicile-bureau hebdomadaire)
- **Multi-chauffeurs** et gestion de flotte (MVP limité à Rachel seule)
- **Application mobile native** iOS/Android (PWA suffit pour le MVP)
- **Tarification dynamique** selon demande/offre (tarifs fixes pour démarrer)
- **Partage de course** entre plusieurs clients
- **Intégration avec calendriers** (Google Calendar, Outlook)

### MVP Success Criteria

Le MVP sera considéré comme réussi si, après 3 mois de mise en production :
- **50+ utilisateurs actifs** ont créé un compte et effectué au moins une réservation
- **Taux de conversion > 80%** des visiteurs qui commencent une réservation
- **0 incident de paiement** ou de sécurité majeur
- **Rachel économise 10h/semaine** en gestion administrative
- **Feedback utilisateur positif** (minimum 4/5 étoiles en moyenne)
- **Performance technique** : temps de chargement < 2s, disponibilité > 99%

---

## Post-MVP Vision

### Phase 2 Features

**Court terme (3-6 mois après MVP) :**

1. **Suivi en temps réel GPS**
   - Visualisation de la position du véhicule sur carte
   - Estimation d'arrivée mise à jour en temps réel
   - Partage du lien de suivi avec des tiers (famille, collègues)

2. **Interface administrateur Rachel**
   - Dashboard avec vue planning des réservations
   - Gestion des disponibilités et absences
   - Statistiques d'activité et rapports financiers
   - Gestion des clients et historique

3. **Messagerie in-app**
   - Chat temps réel entre client et chauffeur
   - Messages prédéfinis pour rapidité
   - Notifications push des nouveaux messages

4. **Programme de fidélité**
   - Système de points par course
   - Réductions pour clients réguliers
   - Parrainage avec bonus

5. **Réservations récurrentes**
   - Configuration de trajets réguliers (hebdomadaires, mensuels)
   - Gestion automatisée des répétitions
   - Facturation groupée

### Long-term Vision (1-2 ans)

- **Multi-chauffeurs / Petite flotte :** Si l'activité se développe, permettre à Rachel d'ajouter d'autres chauffeurs sous sa marque
- **API B2B :** Partenariats avec entreprises pour gestion de comptes pros (facturation groupée, reporting)
- **Expansion géographique :** Ouvrir le service à d'autres régions via partenariats avec chauffeurs indépendants
- **Services premium :** Véhicules luxe, chauffeurs multilingues, services spécialisés (mariages, événements)
- **Intelligence artificielle :** Prédiction de la demande, optimisation automatique du planning, tarification dynamique intelligente

### Expansion Opportunities

- **Marketplace de services VTC :** Devenir une plateforme pour chauffeurs VTC indépendants souhaitant échapper aux commissions des grands acteurs
- **Services complémentaires :** Conciergerie (réservation restaurants, théâtres), livraison de colis
- **White label :** Proposer la solution à d'autres chauffeurs VTC indépendants sous leur propre marque

---

## Technical Considerations

### Platform Requirements

- **Target Platforms :** Progressive Web App (PWA) compatible tous navigateurs modernes
  - iOS Safari (version 14+)
  - Chrome Android (version 90+)
  - Desktop browsers (Chrome, Firefox, Safari, Edge)
  
- **Browser/OS Support :** 
  - Responsive design mobile-first (320px à 2560px)
  - Support mode hors ligne partiel (Service Workers)
  - Installation sur écran d'accueil (PWA manifest)
  
- **Performance Requirements :**
  - First Contentful Paint (FCP) < 1.5s
  - Time to Interactive (TTI) < 3s
  - Lighthouse score > 90/100 (Performance, Accessibility, Best Practices, SEO)
  - Taille bundle JS < 200kb (gzipped)

### Technology Preferences

**Stack Fullstack Moderne Simplifiée :**

- **Frontend + Backend intégré :**
  - **Framework :** Next.js 14+ (App Router) avec TypeScript
    - Fullstack : Pages React + API Routes dans un seul projet
    - Server Components pour performance optimale
    - Server Actions pour mutations de données
    - Image optimization automatique
    - SEO optimisé nativement
  - **Styling :** Tailwind CSS (utility-first, responsive, productivité maximale)
  - **Component Libraries :** 
    - ShadCN UI (composants sophistiqués, personnalisables, TypeScript natif)
    - Aceternity UI (animations spectaculaires, effets visuels premium)
    - Magic UI (composants animés modernes)
  - **Animations :** Framer Motion (animations fluides, transitions page)
  - **Forms :** React Hook Form + Zod validation (type-safe, performant)
  - **State :** Zustand (simple, performant) ou React Context
  - **Maps :** Google Maps JavaScript API (Places, Distance Matrix, Geocoding)

- **Database + Backend Services :**
  - **Database :** Supabase (PostgreSQL managé)
    - PostgreSQL 15+ avec PostGIS pour géolocalisation
    - Authentication intégrée (email/password, OAuth Google/Apple)
    - Row Level Security (sécurité granulaire)
    - Realtime subscriptions (optionnel)
    - Storage pour fichiers (factures, avatars)
    - Dashboard admin intégré
  - **ORM/Client :** Supabase Client TypeScript (type-safe, généré automatiquement)

- **Services Externes :**
  - **Paiements :** Stripe (Checkout Sessions, Payment Intents, Webhooks)
  - **Emails :** Resend (100 emails/jour gratuits, React Email pour templates)
  - **Maps :** Google Maps Platform (200$/mois crédits gratuits = ~28k requêtes)
  - **Analytics :** Vercel Analytics (inclus) ou Plausible (privacy-friendly)

- **Hosting/Infrastructure (100% gratuit au démarrage) :**
  - **Application :** Vercel (Next.js natif, CDN global, HTTPS auto, déploiement git)
  - **Database :** Supabase (500 MB DB + 2 GB bandwidth gratuit)
  - **Domaine :** À acquérir (~10-15€/an, seul coût initial)
  - **DNS :** Cloudflare (gratuit, sécurité, performance)

**Rationale de cette stack :**
- ✅ **Monorepo simplifié** : 1 projet au lieu de 2 (front + back séparés)
- ✅ **Maintenance réduite** : Moins de configuration, architecture claire
- ✅ **Performance automatique** : Next.js optimise images, code splitting, SSR
- ✅ **Type-safety totale** : TypeScript frontend + backend + database
- ✅ **Coûts = 0€/mois** jusqu'à traction significative
- ✅ **Scalabilité** : Tient jusqu'à 10k+ utilisateurs sans changement
- ✅ **DX exceptionnelle** : Hot reload, debugging facile, documentation riche
- ✅ **Design premium** : ShadCN + Aceternity = composants niveau pro
- ✅ **Stack 2024-2025** : Technos les plus demandées sur le marché

### Architecture Considerations

- **Repository Structure :** 
  - **Monorepo Next.js** (structure simplifiée, tout-en-un)
    ```
    /vtc-rachel
      /app                 # App Router Next.js
        /(marketing)       # Pages publiques (landing, about)
        /(app)             # App authentifiée (dashboard, bookings)
        /api               # API Routes (backend)
      /components
        /ui                # ShadCN UI components
        /features          # Feature components (booking, maps)
      /lib
        /supabase         # Database client
        /stripe           # Payment client
        /utils            # Utilities
      /types              # TypeScript types partagés
      /public             # Assets statiques
    ```
  - Avantages : 1 projet, 1 déploiement, code partagé naturellement, maintenance ultra simple

- **Service Architecture :**
  - **Monolithe Next.js modulaire** (idéal pour MVP et croissance)
  - **API Routes** : Endpoints REST dans `/app/api`
  - **Server Actions** : Mutations côté serveur type-safe
  - **Server Components** : Fetch data côté serveur (performance)
  - Modules séparés : Auth (Supabase), Bookings, Payments (Stripe), Maps, Notifications
  - Scalabilité : Next.js scale horizontalement facilement (Vercel gère automatiquement)

- **Integration Requirements :**
  - **Stripe :** Paiements (Checkout API, Payment Intents, Webhooks)
  - **Google Maps Platform :** Places API, Distance Matrix API, Geocoding API, Maps JavaScript API
  - **Email service :** SendGrid / Resend API (templates transactionnels)
  - **SMS :** Twilio pour notifications SMS critiques (optionnel MVP)
  - **Firebase :** Push notifications PWA (FCM)
  - **Analytics :** Google Analytics 4 ou Plausible (privacy-friendly)

- **Security/Compliance :**
  - **HTTPS obligatoire** (TLS 1.3)
  - **RGPD compliant :** Consentement cookies, droit à l'oubli, export données
  - **PCI-DSS :** Délégué à Stripe (no card storage)
  - **OWASP Top 10 :** Protection XSS, CSRF, injection SQL, rate limiting
  - **Authentication :** Bcrypt hash passwords, JWT tokens, secure cookies
  - **Data backup :** Snapshots quotidiens database, retention 30 jours

---

## Constraints & Assumptions

### Constraints

- **Budget :**
  - **Développement : 0€** (échange de services - développement contre publicité pour financer études)
  - **Coûts mensuels récurrents : 0€ au démarrage**
    - Vercel : Gratuit (hobby tier)
    - Supabase : Gratuit (500 MB DB, 2 GB bandwidth)
    - Google Maps : 200$/mois crédits gratuits (~28k requêtes)
    - Resend : 100 emails/jour gratuits
    - **Seul coût : Domaine ~10-15€/an**
  - **Coûts évolutifs selon traction :**
    - Stripe : 1.4% + 0.25€ par transaction (payé par commissions)
    - Au-delà gratuit : ~50-100€/mois (mais ROI positif à ce stade)
  - **Budget design :** Template premium (30-50€) envisageable si besoin, sinon ShadCN/Aceternity gratuits

- **Timeline :**
  - **Contrainte forte : Le plus tôt possible** (Rachel épuisée, besoin de quitter Uber)
  - **Timeline réaliste développeur débutant ambitieux :**
    - **Semaines 1-2 :** Setup Next.js, Supabase, design system, landing page
    - **Semaines 3-4 :** Authentication, profil client, dashboard
    - **Semaines 5-7 :** Formulaire réservation + Google Maps + calcul tarifaire
    - **Semaines 8-9 :** Intégration Stripe, paiements, webhooks
    - **Semaines 10-11 :** Interface admin Rachel, gestion réservations
    - **Semaines 12-13 :** Notifications, emails, optimisations
    - **Semaines 14-15 :** Tests finaux, corrections, PWA optimizations
    - **Semaine 16 :** Beta testing, ajustements, lancement
  - **Objectif : MVP en production en 3-4 mois** (apprentissage inclus)

- **Resources :**
  - **Développeur fullstack :** 1 personne (étudiante École 42, débutante mais motivée)
  - **Learning curve :** Première app fullstack production, apprentissage progressif
  - **Design UI/UX :** Autodidacte avec ShadCN UI + inspiration Dribbble/Behance
  - **Rachel (Product Owner) :** 
    - Disponibilité pour feedback ponctuel
    - Pas très tech-savvy (UX doit être ultra intuitive)
    - Testera en fin de dev, captures d'écran pendant développement
  - **Beta testers :** Clients existants de Rachel disponibles pour tests

- **Technical :**
  - Compatibilité navigateurs modernes uniquement (pas de support IE11)
  - Dépendance aux APIs tierces (Google Maps, Stripe) : nécessite connexion internet
  - Géolocalisation nécessaire pour certaines fonctionnalités
  - Limites de tarification des APIs (quotas Google Maps, Stripe)

### Key Assumptions

- **Rachel a les licences VTC nécessaires** et est en règle avec la réglementation (pas de problème légal)
- **Zone de service définie** : Région parisienne + aéroports (pas de longue distance initiale)
- **Rachel assure elle-même les courses** pour le MVP (pas de sous-traitance à d'autres chauffeurs)
- **Clients cibles ont un smartphone** et sont à l'aise avec les applications web
- **Volume de réservations gérable** par Rachel seule (< 300 courses/mois)
- **Tarification actuelle de Rachel** est compétitive et peut être maintenue sans commission plateforme
- **Rachel peut répondre aux demandes** dans un délai raisonnable (notifications, préparation véhicule)
- **Pas de concurrence locale agressive** avec marketing massif des grands acteurs
- **Pas de contraintes réglementaires bloquantes** pour l'exploitation d'une plateforme de réservation propriétaire
- **Budget marketing initial modeste** : croissance organique via clients existants et bouche-à-oreille

---

## Risks & Open Questions

### Key Risks

- **Adoption utilisateur :** Les clients habitués à téléphoner pourraient résister au changement digital
  - *Impact :* Faible taux d'utilisation, ROI insuffisant
  - *Mitigation :* Phase de transition avec double canal (app + téléphone), formation client, incentives pour première réservation en ligne

- **Dépendance aux APIs tierces :** Stripe ou Google Maps pourrait modifier pricing ou limites
  - *Impact :* Augmentation des coûts mensuels, nécessité de rearchitecture
  - *Mitigation :* Monitoring des quotas, plans de secours (alternatives APIs), négociation volumes

- **Gestion de la disponibilité :** Overbooking ou sous-utilisation si gestion calendrier inadéquate
  - *Impact :* Clients mécontents, revenus perdus
  - *Mitigation :* Système de créneaux horaires strict, buffer entre courses, blocage automatique calendrier

- **Sécurité et données personnelles :** Fuite de données clients, fraude paiement
  - *Impact :* Perte de confiance, amendes RGPD, responsabilité légale
  - *Mitigation :* Audit sécurité pré-lancement, tests de pénétration, conformité RGPD stricte, monitoring 24/7

- **Performance et scalabilité :** Croissance rapide pourrait saturer l'infrastructure
  - *Impact :* App lente ou inaccessible, perte de clients
  - *Mitigation :* Architecture scalable dès le départ, monitoring performances, load testing

- **Complexité technique sous-estimée :** Calcul tarifaire, gestion disponibilités plus complexe que prévu
  - *Impact :* Dépassement timeline et budget
  - *Mitigation :* POC sur fonctionnalités critiques en amont, développement itératif avec validation continue

### Open Questions

- **Tarification exacte :** Quel est le modèle tarifaire précis de Rachel ? (forfait, kilométrage, temps, majorations nuit/weekend ?)
- **Zones de service :** Périmètre géographique exact ? Restrictions certaines zones ? Longue distance acceptée ?
- **Gestion des indisponibilités :** Comment Rachel gère-t-elle ses congés, absences, maintenance véhicule ? Système de blocage calendrier nécessaire ?
- **Options et services supplémentaires :** Quels sont exactement les services proposés ? (siège enfant, bagages volumineux, animaux, personnes à mobilité réduite, etc.)
- **Politique d'annulation :** Quelles sont les règles précises ? Remboursement complet/partiel/aucun selon délai ?
- **Paiement :** Acceptation paiement immédiat uniquement ou également paiement après course ? Gestion des notes de frais professionnelles ?
- **Design et branding :** Rachel a-t-elle une charte graphique, logo, couleurs existantes à respecter ?
- **Contenu légal :** CGV, mentions légales, politique de confidentialité - sont-ils déjà rédigés ou à créer ?
- **Backup driver :** Si Rachel est malade/indisponible, y a-t-il un plan B ou l'app doit-elle simplement bloquer les réservations ?

### Areas Needing Further Research

- **Benchmark concurrence locale :** Identifier les autres VTC indépendants avec solutions digitales dans la zone
- **Analyse juridique :** Vérifier les obligations légales spécifiques à une plateforme de réservation VTC (assurance, responsabilité, contrat avec clients)
- **Optimisation SEO local :** Stratégie pour apparaître dans recherches "VTC + [ville]" sur Google
- **Accessibilité :** Niveau d'accessibilité WCAG requis ? Clients avec handicap à prévoir spécifiquement ?
- **Load testing :** Validation des performances avec simulation de charge (100+ utilisateurs simultanés)
- **Beta testing structure :** Protocole exact pour phase de test (durée, critères de succès, mécanisme de feedback)

---

## Appendices

### A. Research Summary

**Analyse du site concurrent vtc-femmes-paris.com :**
- Service de VTC spécialisé femmes
- Fonctionnalités standards : réservation, paiement, gestion profil
- Points forts identifiés : Design professionnel, clarté de l'offre, mise en avant de la sécurité
- Opportunités d'amélioration : UX mobile, instantanéité de confirmation, fonctionnalités modernes (PWA, push notifications)

**Tendances marché VTC :**
- Croissance continue malgré saturation grandes plateformes
- Demande pour services personnalisés et "de proximité"
- Importance de la qualité de service vs prix bas
- Digitalisation incontournable pour rester compétitif

### B. Stakeholder Input

**Rachel (Cliente/Propriétaire) :**
- Volonté de moderniser son service
- Besoin de réduire charge administrative
- Souhait de garder relation client directe (vs délégation à plateforme)
- Importance de la qualité et professionnalisme

### C. References

- Site concurrent : https://www.vtc-femmes-paris.com/
- Documentation Stripe : https://stripe.com/docs
- Documentation Google Maps Platform : https://developers.google.com/maps
- PWA Best Practices : https://web.dev/progressive-web-apps/
- BMAD Method : `.bmad-core/` documentation

---

## Next Steps

### Immediate Actions

1. **Validation du Project Brief avec Rachel :** Organiser réunion pour valider vision, scope, contraintes et répondre aux questions ouvertes
2. **Clarification modèle tarifaire :** Documenter précisément les règles de calcul de prix
3. **Récupération des assets :** Logo, charte graphique, contenu légal existant de Rachel
4. **Sélection beta testers :** Identifier 10-15 clients existants volontaires pour phase de test
5. **Validation budget et timeline :** Confirmation formelle des ressources et délais
6. **Setup environnement de développement :** Repository, outils, accès APIs nécessaires

### PM Handoff

Ce Project Brief fournit le contexte complet pour **VTC Rachel - Application de Réservation**. 

**Pour le Product Manager :** Veuillez démarrer en "Mode Génération PRD". Passez en revue ce brief en détail et travaillez avec l'équipe pour créer le PRD (Product Requirements Document) section par section selon le template BMAD. Demandez toute clarification nécessaire ou suggérez des améliorations basées sur votre expertise.

**Points d'attention particuliers pour le PRD :**
- Détailler précisément le système de calcul tarifaire et de disponibilités
- Spécifier les user stories pour chaque persona (client principal, Rachel admin)
- Définir les critères d'acceptation pour chaque fonctionnalité core
- Élaborer les User Interface Design Goals pour guider l'UX Expert
- Documenter les Technical Assumptions en détail pour l'Architect

---

*Document créé le : [Date]*  
*Version : 1.0*  
*Auteur : Équipe projet VTC Rachel*  
*Statut : Draft pour validation*
