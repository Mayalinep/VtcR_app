# VTC Rachel — Application de réservation VTC

Site web + dashboards pour le service VTC premium de Rachel en Île-de-France.  
Les clients estiment un prix, envoient une demande de course ; Rachel et les hôtels partenaires gèrent les réservations via des espaces dédiés.

Code applicatif dans [`app/`](./app/). Setup détaillé : [`app/README.md`](./app/README.md).

---

## Statut (juillet 2026)

| Domaine | État |
|--------|------|
| Site vitrine (landing, tarifs, FAQ, légales, SEO) | ✅ |
| Estimation Google Maps + page `/reserver` | ✅ |
| Emails Resend (B2C + B2B) | ✅ Testé |
| Dashboard admin Rachel | ✅ Testé (demandes hôtels, validation) |
| Dashboard B2B hôtels | ✅ Testé (création → Supabase → admin) |
| i18n FR / EN / ES | ✅ Partiel (légales encore en FR) |
| Page `/confirmation` | ✅ Après envoi de `/reserver` |
| Page Contact (formulaire) | ✅ Envoi email via Resend |
| Paiement Stripe / PWA | ❌ Hors MVP (Phase 2) |

---

## Stack technique

| Couche | Techno |
|--------|--------|
| App | **Next.js 16** (App Router) + **React 19** + TypeScript |
| UI | Tailwind CSS 4, Framer Motion |
| Maps | Google Maps Platform (Places, Distance Matrix, Directions) |
| Emails | Resend (HTTP) |
| SMS | Twilio (HTTP) |
| Anti-spam | Google reCAPTCHA v3 |
| DB / B2B | Supabase (PostgreSQL) — tables `hotels`, `b2b_reservations` |
| Auth admin / B2B | JWT (`jose`) + cookies + bcrypt |
| Hébergement prévu | Vercel |

---

## Démarrage rapide

```bash
cd app
npm install
cp .env.example .env.local   # puis renseigner les clés
npm run dev
```

Ouvrir [http://localhost:3000](http://localhost:3000).

| Route | Rôle |
|-------|------|
| `/` | Landing + estimateur |
| `/reserver` | Demande de réservation B2C |
| `/confirmation` | Confirmation après envoi |
| `/admin/login` | Espace Rachel |
| `/b2b/login` | Espace hôtel partenaire |
| `/en`, `/es` | Versions localisées |

Variables d’environnement : [`app/.env.example`](./app/.env.example).

---

## Structure du dépôt (public)

```
VtcR_app/
├── app/           # Application Next.js
├── README.md
└── .gitignore
```

La documentation produit / specs / outils internes (`docs/`, `.bmad-core/`, etc.) est **locale uniquement** et n’est pas versionnée sur GitHub.

---

## Scripts (`app/`)

```bash
npm run dev          # serveur de développement
npm run build        # build production
npm start            # servir le build
npm run lint         # ESLint
npm run fresh        # clean .next + restart
```

---

## Conventions Git

- `main` — production
- `feature/...` — fonctionnalités
- Commits : Conventional Commits (`feat:`, `fix:`, `docs:`, `refactor:`, …)

---

## Équipe

- **Product Owner :** Rachel (VTC)
- **Développement initial :** Maya

---

**Version app :** 0.1.0  
**Dernière mise à jour :** 2026-07-18
