# Vue d'Ensemble

## Stack Technique

**Application :** Next.js 14+ (App Router) + TypeScript  
**Base de Données :** PostgreSQL via Supabase  
**Authentication :** Supabase Auth  
**Paiements :** Stripe  
**Maps :** Google Maps Platform  
**Emails :** Resend  
**Hosting :** Vercel  

## Architecture Générale

```
┌─────────────────────────────────────────────────────────────┐
│                        CLIENT (PWA)                          │
│                   Next.js 14 + React                         │
│              (Server Components + Client)                    │
└────────────────────┬────────────────────────────────────────┘
                     │
                     │ HTTPS/API Calls
                     │
┌────────────────────▼────────────────────────────────────────┐
│                    NEXT.JS API ROUTES                        │
│              (Backend serverless functions)                  │
└─┬──────────┬──────────┬──────────┬──────────┬───────────────┘
  │          │          │          │          │
  │          │          │          │          │
  ▼          ▼          ▼          ▼          ▼
┌─────┐  ┌──────┐  ┌───────┐  ┌──────┐  ┌───────┐
│Supa │  │Stripe│  │Google │  │Resend│  │ ... │
│base │  │      │  │ Maps  │  │      │  │     │
└─────┘  └──────┘  └───────┘  └──────┘  └───────┘
   │
   │ PostgreSQL + Auth
   │
┌──▼──────────────────────────────────────────────────────────┐
│                    SUPABASE                                  │
│  PostgreSQL + Auth + Storage + Realtime                      │
└─────────────────────────────────────────────────────────────┘
```

---
