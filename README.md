# VTC Rachel - Application de Réservation VTC

Application web (PWA) permettant aux clients de réserver des courses VTC avec Rachel en Île-de-France.

## 📋 Documentation

- **[Project Brief](./docs/brief.md)** - Vision, objectifs et contexte du projet
- **[PRD (Product Requirements Document)](./docs/prd.md)** - Spécifications fonctionnelles complètes

## 🏗️ Statut du Projet

**Phase actuelle :** Planification (Phase 1 de BMAD Method)

- ✅ Project Brief créé
- ✅ PRD complet (7 Epics, 50+ User Stories)
- 🔄 Front-End Specification (à venir)
- 🔄 Architecture technique (à venir)
- ⏳ Développement (démarrage prévu après validation)

## 🛠️ Stack Technique (Prévue)

- **Frontend:** Next.js 14 (App Router) + TypeScript + Tailwind CSS
- **UI Components:** ShadCN UI + Aceternity UI
- **Backend:** Next.js API Routes + Supabase
- **Database:** PostgreSQL (Supabase)
- **Auth:** Supabase Auth (Email + OAuth Google/Apple)
- **Paiements:** Stripe
- **Maps:** Google Maps Platform (Places, Distance Matrix)
- **Emails:** Resend + React Email
- **Hébergement:** Vercel (Frontend) + Supabase (Backend/DB)

## 🎯 Objectifs MVP

Permettre à Rachel de :
- Se détacher d'Uber et devenir indépendante
- Gérer 5-10 courses premium/jour (vs volume élevé Uber)
- Fidéliser sa clientèle avec service personnalisé
- Monter en gamme vers clientèle affaires/aéroports

Permettre aux clients de :
- Réserver en ligne en 2 minutes
- Payer en ligne (CB, Apple Pay, Google Pay)
- Gérer leur profil et historique
- Modifier/annuler selon conditions

## 📱 Features Principales (MVP)

1. **Réservation de course** avec Google Maps et calcul prix automatique
2. **Paiement en ligne** sécurisé via Stripe
3. **Gestion de profil** client avec adresses favorites
4. **Dashboard admin** pour Rachel (gestion réservations, calendrier)
5. **Notifications email** (confirmations, rappels)
6. **PWA** installable sur mobile

## 📈 Méthodologie

Ce projet suit la **BMAD Method** (Build-Measure-Analyze-Deploy) :
- Phase de planification complète avant développement
- Stories développées séquentiellement
- Tests et validation à chaque étape
- Déploiement continu

## 👥 Équipe

- **Développeur:** Étudiante École 42 (fullstack)
- **Product Owner:** Rachel (propriétaire VTC)
- **Méthodologie:** BMAD Method

## 📅 Timeline Prévue

- **Total MVP:** 3-4 mois
- **Epic 1 (Foundation):** 2-3 semaines
- **Epic 2 (Auth):** 2-3 semaines
- **Epic 3 (Booking):** 3-4 semaines
- **Epic 4 (Payment):** 2-3 semaines
- **Epic 5 (Admin):** 2-3 semaines
- **Epic 6 (Notifications):** 1-2 semaines
- **Epic 7 (Launch):** 2-3 semaines

## 💰 Budget

- **Développement:** 0€ (échange de services)
- **Infrastructure:** 0€/mois au démarrage (tiers gratuits)
- **Domaine:** ~10-15€/an (seul coût initial)

## 📝 Conventions Git

- **Branches:** 
  - `main` - Production
  - `develop` - Développement
  - `feature/epic-X-story-Y` - Features
- **Commits:** Conventional Commits
  - `feat:` - Nouvelle fonctionnalité
  - `fix:` - Correction de bug
  - `docs:` - Documentation
  - `style:` - Formatage
  - `refactor:` - Refactoring
  - `test:` - Tests
  - `chore:` - Maintenance

## 🚀 Prochaines Étapes

1. Créer Front-End Specification (design system, wireframes)
2. Créer Architecture Document (database schema, API design)
3. Valider avec PO (Rachel)
4. Sharding des documents
5. Setup projet Next.js
6. Développement Epic 1

---

**Version:** 0.1.0 (Planning Phase)  
**Dernière mise à jour:** 2026-01-09
