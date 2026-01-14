# Infrastructure

## Environnements

**Production :**
- URL : `https://vtc-rachel.fr`
- Hosting : Vercel (Edge Network)
- Database : Supabase Production
- Domaine : Cloudflare DNS

**Staging :**
- URL : `https://staging.vtc-rachel.fr`
- Hosting : Vercel Preview
- Database : Supabase Staging
- But : Tests avant déploiement prod

**Development :**
- URL : `http://localhost:3000`
- Database : Supabase Local (Docker) ou Staging
- But : Développement local

---

## Architecture Hosting

```
┌─────────────────────────────────────────────────────────────┐
│                      UTILISATEURS                            │
└────────────────────┬────────────────────────────────────────┘
                     │
                     │ HTTPS
                     │
┌────────────────────▼────────────────────────────────────────┐
│                  CLOUDFLARE DNS                              │
│              (Résolution domaine + CDN)                      │
└────────────────────┬────────────────────────────────────────┘
                     │
┌────────────────────▼────────────────────────────────────────┐
│                   VERCEL EDGE NETWORK                        │
│         (300+ Edge locations dans le monde)                  │
│                                                              │
│  ┌──────────────────────────────────────────────────────┐  │
│  │         Next.js Application (SSR + SSG)              │  │
│  │         - Server Components                          │  │
│  │         - API Routes (Serverless Functions)          │  │
│  │         - Static Assets (images, CSS, JS)            │  │
│  └──────────────────────────────────────────────────────┘  │
└───────────┬──────────────────────────────────────────┬──────┘
            │                                          │
            │ API Calls                               │ Assets
            │                                          │
┌───────────▼──────────────┐              ┌───────────▼──────────┐
│   SUPABASE (Backend)     │              │   VERCEL CDN         │
│   - PostgreSQL           │              │   - Images optimized │
│   - Auth                 │              │   - Static files     │
│   - Storage              │              └──────────────────────┘
│   - Realtime (optionnel) │
└──────────────────────────┘

┌──────────────────────────────────────────────────────────────┐
│              SERVICES EXTERNES (APIs)                         │
│                                                               │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐    │
│  │  Stripe  │  │  Google  │  │  Resend  │  │  Upstash │    │
│  │ (Payment)│  │  (Maps)  │  │  (Email) │  │  (Redis) │    │
│  └──────────┘  └──────────┘  └──────────┘  └──────────┘    │
└──────────────────────────────────────────────────────────────┘
```

---

## Déploiement

### Configuration Vercel

```json
// vercel.json
{
  "buildCommand": "npm run build",
  "devCommand": "npm run dev",
  "installCommand": "npm install",
  "framework": "nextjs",
  "regions": ["cdg1"], // Paris region (proche utilisateurs FR)
  "env": {
    "NEXT_PUBLIC_SUPABASE_URL": "@supabase-url",
    "NEXT_PUBLIC_SUPABASE_ANON_KEY": "@supabase-anon-key"
  }
}
```

### CI/CD Pipeline

**Automatic Deployments via Git :**

1. **Push sur `main` branch** → Déploiement Production automatique
2. **Push sur feature branch** → Preview deployment (URL temporaire)
3. **Pull Request** → Preview deployment + checks automatiques

**Checks avant déploiement :**
- Build réussi (TypeScript, ESLint)
- Tests unitaires passés
- Lighthouse CI > 90 (Performance, Accessibility)

```yaml
# .github/workflows/ci.yml (optionnel, Vercel fait déjà)
name: CI
on: [push, pull_request]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
      - run: npm ci
      - run: npm run lint
      - run: npm run test
      - run: npm run build
```

---

## Monitoring & Logs

### Vercel Analytics

**Inclus gratuitement :**
- Web Vitals (Core Web Vitals)
- Page views
- Unique visitors
- Top pages
- Devices / Browsers

### Sentry (Error Tracking)

**Pour capturer erreurs production :**

```typescript
// sentry.client.config.ts
import * as Sentry from '@sentry/nextjs';

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  environment: process.env.VERCEL_ENV || 'development',
  tracesSampleRate: 0.1, // 10% des requêtes
  enabled: process.env.NODE_ENV === 'production'
});
```

**Alertes :**
- Erreurs 500
- Taux d'erreur > 5%
- Performance dégradée
- Paiements échoués

### Supabase Logs

**Logs disponibles :**
- Database logs (queries lentes)
- Auth logs (connexions, échecs)
- API logs (requêtes, erreurs)

**Rétention :** 7 jours (gratuit), 90 jours (payant)

---

## Backups & Recovery

### Database Backups (Supabase)

**Automatique :**
- Daily backups (rétention 7 jours)
- Point-in-time recovery jusqu'à 7 jours en arrière

**Manuel :**
- Export SQL avant migrations importantes
- Stored localement + Git LFS

```bash
# Export backup manuel
supabase db dump -f backup_$(date +%Y%m%d).sql

# Restore backup
supabase db reset
psql -f backup_20260110.sql
```

### Code Backups

**Git :** Repository GitHub privé
- Commits réguliers
- Branches protégées (main)
- Reviews obligatoires

---

## Scalabilité

### Limites des Tiers Gratuits

**Vercel Hobby (gratuit) :**
- 100 GB bandwidth/mois
- Build time illimité
- Serverless functions : 100h/mois

**Supabase Free :**
- 500 MB database
- 2 GB bandwidth/mois
- 50k requêtes auth/mois

**Estimations VTC Rachel :**
- 300 réservations/mois → ~50 MB database
- 1000 visiteurs/mois → ~10 GB bandwidth
- **Conclusion : Tiers gratuits suffisants 12-18 mois**

### Plan de Scaling

**Si dépassement gratuit (> 500 réservations/mois) :**

1. **Upgrade Supabase Pro** : 25$/mois
   - 8 GB database
   - 50 GB bandwidth
   - Support prioritaire

2. **Upgrade Vercel Pro** : 20$/mois
   - 1 TB bandwidth
   - Analytics avancées
   - Password protection preview

**Coût total scaling :** ~45$/mois (largement couvert par CA)

### Optimisations Performances

**Caching :**
- Static pages (landing) → CDN Vercel (cache infini)
- API responses → Redis cache (5 min)
- Images → Vercel Image Optimization (auto)

**Database :**
- Indexes sur colonnes fréquentes (déjà définis)
- Connection pooling (Supabase)
- Requêtes optimisées (EXPLAIN ANALYZE)

---
