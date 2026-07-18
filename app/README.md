# VTC Rachel — Application Next.js

Code source de l’application. Vue d’ensemble : [`../README.md`](../README.md).

---

## Stack

- Next.js 16 (App Router) + React 19 + TypeScript
- Tailwind CSS 4 + Framer Motion
- Supabase (admin / B2B), Google Maps, Resend, Twilio, reCAPTCHA v3

---

## Démarrage

```bash
npm install
cp .env.example .env.local
npm run dev
```

Variables : [`.env.example`](./.env.example).

---

## Scripts

| Commande | Rôle |
|----------|------|
| `npm run dev` | Développement |
| `npm run build` | Build production |
| `npm start` | Servir le build |
| `npm run lint` | ESLint |
| `npm run fresh` | Clean `.next` + restart |

---

## Architecture (aperçu)

```
app/
├── app/                 # App Router
│   ├── api/             # calculate-price, send-reservation, admin/*, b2b/*
│   ├── components/      # layout, sections, forms, ui, animations
│   ├── lib/             # auth, supabase, i18n, data, utils, validations
│   ├── admin/           # Dashboard Rachel
│   ├── b2b/             # Dashboard hôtels
│   └── reserver/        # Demande de course B2C
├── middleware.ts
└── public/
```

---

## Design system (rappel)

Couleurs CSS (`globals.css`) : `--forest-green`, `--gold-champagne`.  
Données métier centralisées : `app/lib/data/` (pricing, FAQ, zones, témoignages).  
Constantes contact / marque : `app/lib/utils/constants.ts`.

---

## Notes

- L’estimateur appelle `/api/calculate-price` (Google Distance Matrix + fallback forfaits).
- Les demandes B2C passent par `/api/send-reservation` (email/SMS).
- Après envoi réussi → redirection `/confirmation`.
- Le formulaire Contact passe par `/api/send-contact` (Resend).
- Les courses hôtels B2B sont persistées dans Supabase (`b2b_reservations`).
