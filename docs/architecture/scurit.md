# Sécurité

## Authentification

**Méthode :** Supabase Auth (JWT)

**Flow :**
1. Client s'inscrit/connecte via Supabase
2. Reçoit `access_token` (JWT, durée 1h) et `refresh_token`
3. Envoie `access_token` dans header `Authorization: Bearer <token>`
4. Backend vérifie token avec Supabase
5. Token expiré → Client utilise `refresh_token` pour renouveler

**Implémentation :**

```typescript
// lib/supabase/server.ts
import { createServerClient } from '@supabase/ssr';

export function createClient(cookieStore: any) {
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value;
        },
      },
    }
  );
}

// Vérification auth dans API route
export async function GET(request: NextRequest) {
  const supabase = createClient(cookies());
  
  const { data: { user }, error } = await supabase.auth.getUser();
  
  if (error || !user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  
  // User authentifié, continuer...
}
```

---

## Autorisation (RBAC)

**Rôles :**
- `client` : Utilisateurs standards
- `admin` : Rachel uniquement

**Permissions :**

| Action | Client | Admin |
|--------|--------|-------|
| Créer réservation | Oui (sa propre) | Oui (toutes) |
| Voir réservation | Oui (ses propres) | Oui (toutes) |
| Modifier réservation | Oui (avant confirmation) | Oui (toujours) |
| Annuler réservation | Oui (avec frais) | Oui (sans frais) |
| Confirmer réservation | Non | Oui |
| Accès dashboard admin | Non | Oui |
| Bloquer disponibilités | Non | Oui |
| Voir tous les clients | Non | Oui |

---

## Protection Données Sensibles

**Chiffrement :**
- HTTPS obligatoire (TLS 1.3)
- Données bancaires : JAMAIS stockées (Stripe PCI-DSS)
- Mots de passe : Hashés avec bcrypt (géré par Supabase)
- Tokens JWT : Signés avec secret serveur

**Variables d'Environnement :**

```bash
# .env.local (JAMAIS commité dans Git)

# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
SUPABASE_SERVICE_ROLE_KEY=eyJ... # SECRET côté serveur

# Stripe
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_... # SECRET
STRIPE_WEBHOOK_SECRET=whsec_... # SECRET

# Google Maps
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=AIza...

# Resend
RESEND_API_KEY=re_... # SECRET

# Rate Limiting (Upstash Redis)
UPSTASH_REDIS_URL=https://...
UPSTASH_REDIS_TOKEN=... # SECRET
```

---

## RGPD (Conformité)

### Données Personnelles Collectées

| Donnée | Usage | Base légale |
|--------|-------|-------------|
| Email, Nom, Prénom | Identification, contact | Contrat |
| Téléphone | Contact urgent | Contrat |
| Adresses trajet | Réalisation service | Contrat |
| Historique courses | Facturation, support | Contrat |
| IP, User Agent | Sécurité, logs | Intérêt légitime |
| Paiement (via Stripe) | Paiement sécurisé | Contrat |

### Droits des Utilisateurs

**Droit d'accès :**
- Endpoint `/api/users/profile/export` → JSON avec toutes données

**Droit de rectification :**
- Endpoint `/api/users/profile` (PATCH) → Modifier informations

**Droit à l'effacement :**
- Endpoint `/api/users/profile` (DELETE) → Soft delete + anonymisation

**Droit à la portabilité :**
- Export JSON des données personnelles

**Implémentation Soft Delete :**

```typescript
// Anonymiser au lieu de supprimer
export async function deleteUser(userId: string) {
  await supabase
    .from('users')
    .update({
      email: `deleted_${userId}@anonymized.local`,
      first_name: 'Utilisateur',
      last_name: 'Supprimé',
      phone: null,
      avatar_url: null,
      deleted_at: new Date().toISOString(),
      status: 'inactive'
    })
    .eq('id', userId);
  
  // Garder historique réservations pour comptabilité (obligation légale)
  // mais anonymiser données personnelles
}
```

### Durée de Conservation

- Données client actif : Tant que compte actif
- Données client supprimé : Anonymisées immédiatement sauf obligations légales
- Historique réservations : 10 ans (obligation comptable française)
- Logs techniques : 12 mois

### Cookies et Consentement

**Cookies essentiels (pas de consentement requis) :**
- Session auth (JWT)
- Préférences UI (thème, langue)

**Cookies analytics (consentement requis) :**
- Google Analytics / Plausible
- Banner de consentement obligatoire

**Implémentation :**

```typescript
// Utiliser une lib comme react-cookie-consent
import CookieConsent from 'react-cookie-consent';

<CookieConsent
  location="bottom"
  buttonText="J'accepte"
  declineButtonText="Je refuse"
  enableDeclineButton
  onAccept={() => {
    // Activer analytics
  }}
>
  Ce site utilise des cookies pour améliorer votre expérience.
  <a href="/legal/cookies">En savoir plus</a>
</CookieConsent>
```

---

## Protection contre Attaques

### XSS (Cross-Site Scripting)

**Protections :**
- React échappe automatiquement les variables
- Validation inputs côté serveur (Zod)
- Content Security Policy (CSP)

```typescript
// next.config.js
const securityHeaders = [
  {
    key: 'Content-Security-Policy',
    value: "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://maps.googleapis.com; style-src 'self' 'unsafe-inline';"
  }
];
```

### CSRF (Cross-Site Request Forgery)

**Protections :**
- Tokens CSRF sur mutations importantes
- SameSite cookies
- Vérification origin header

```typescript
// Middleware CSRF
export function verifyCsrfToken(request: NextRequest) {
  const csrfToken = request.headers.get('x-csrf-token');
  const sessionToken = request.cookies.get('csrf-token')?.value;
  
  if (csrfToken !== sessionToken) {
    return NextResponse.json({ error: 'CSRF token invalid' }, { status: 403 });
  }
}
```

### SQL Injection

**Protections :**
- Supabase utilise des requêtes paramétrées automatiquement
- JAMAIS de concaténation de strings SQL
- Validation stricte des inputs

### Rate Limiting (DDoS)

**Protections :**
- Upstash Redis pour rate limiting distribué
- Cloudflare en front (optionnel, protection DDoS L7)
- Limites par endpoint (voir section Rate Limiting)

---
