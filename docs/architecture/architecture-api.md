# Architecture API

## Principes

**Architecture :** RESTful API via Next.js API Routes  
**Format :** JSON  
**Authentication :** JWT via Supabase Auth  
**Validation :** Zod schemas  
**Error Handling :** Codes HTTP standards + messages clairs  

## Structure des Routes

```
/app/api/
├── auth/
│   ├── login/route.ts          # POST - Connexion
│   ├── register/route.ts       # POST - Inscription
│   ├── logout/route.ts         # POST - Déconnexion
│   ├── reset-password/route.ts # POST - Réinitialisation
│   └── verify-email/route.ts   # POST - Vérification email
│
├── users/
│   ├── [id]/route.ts           # GET, PATCH, DELETE - User par ID
│   ├── profile/route.ts        # GET, PATCH - Profil utilisateur
│   └── addresses/route.ts      # GET, POST - Adresses favorites
│       └── [id]/route.ts       # PATCH, DELETE - Adresse par ID
│
├── bookings/
│   ├── route.ts                # GET, POST - Liste et création
│   ├── [id]/route.ts           # GET, PATCH, DELETE - Booking par ID
│   ├── [id]/cancel/route.ts    # POST - Annuler réservation
│   ├── availability/route.ts   # POST - Vérifier disponibilité
│   └── estimate/route.ts       # POST - Estimer prix
│
├── payments/
│   ├── create-intent/route.ts  # POST - Créer Payment Intent Stripe
│   ├── confirm/route.ts        # POST - Confirmer paiement
│   └── webhooks/route.ts       # POST - Webhooks Stripe
│
├── invoices/
│   ├── [id]/route.ts           # GET - Facture par ID
│   └── [id]/download/route.ts  # GET - Télécharger PDF
│
├── reviews/
│   ├── route.ts                # GET, POST - Liste et création
│   └── [id]/route.ts           # PATCH, DELETE - Avis par ID
│
├── admin/
│   ├── dashboard/route.ts      # GET - Stats dashboard
│   ├── bookings/route.ts       # GET - Toutes réservations
│   ├── bookings/[id]/
│   │   ├── confirm/route.ts    # POST - Confirmer réservation
│   │   └── reject/route.ts     # POST - Refuser réservation
│   ├── availability/route.ts   # GET, POST - Gérer disponibilités
│   ├── availability/[id]/route.ts # PATCH, DELETE
│   └── export/route.ts         # GET - Exporter données
│
└── maps/
    ├── geocode/route.ts        # POST - Géocoder adresse
    ├── distance/route.ts       # POST - Calculer distance
    └── autocomplete/route.ts   # GET - Autocomplétion adresses
```

---

## Endpoints Détaillés

### Authentication

**POST `/api/auth/register`**

Inscription d'un nouveau client.

```typescript
// Request
{
  "email": "client@example.com",
  "password": "SecurePass123!",
  "first_name": "Jean",
  "last_name": "Dupont",
  "phone": "+33612345678"
}

// Response 201
{
  "success": true,
  "data": {
    "user": {
      "id": "uuid",
      "email": "client@example.com",
      "first_name": "Jean",
      "last_name": "Dupont",
      "role": "client"
    },
    "session": {
      "access_token": "jwt_token",
      "refresh_token": "refresh_token"
    }
  }
}

// Erreurs possibles
400 - Email déjà utilisé
422 - Données invalides
```

**POST `/api/auth/login`**

Connexion utilisateur.

```typescript
// Request
{
  "email": "client@example.com",
  "password": "SecurePass123!"
}

// Response 200
{
  "success": true,
  "data": {
    "user": { /* user object */ },
    "session": { /* session tokens */ }
  }
}

// Erreurs
401 - Identifiants incorrects
429 - Trop de tentatives (rate limit)
```

---

### Bookings

**POST `/api/bookings`**

Créer une nouvelle réservation.

```typescript
// Request
{
  "pickup_address": "15 Rue de la Paix, 75002 Paris",
  "pickup_latitude": 48.8698,
  "pickup_longitude": 2.3318,
  "pickup_place_id": "ChIJ...",
  "dropoff_address": "Aéroport Charles de Gaulle, Terminal 2E",
  "dropoff_latitude": 49.0097,
  "dropoff_longitude": 2.5479,
  "dropoff_place_id": "ChIJ...",
  "pickup_datetime": "2026-01-15T14:30:00Z",
  "passengers_count": 2,
  "has_child_seat": true,
  "special_notes": "Besoin d'aide avec valises"
}

// Response 201
{
  "success": true,
  "data": {
    "booking": {
      "id": "uuid",
      "booking_number": "RCH-2026-0142",
      "status": "pending",
      "distance_km": 25.5,
      "duration_minutes": 35,
      "base_price": 65.00,
      "options_price": 10.00,
      "total_price": 75.00,
      "payment_status": "unpaid",
      // ... autres champs
    }
  }
}

// Erreurs
400 - Créneau indisponible
422 - Données invalides (adresses, date passée...)
409 - Conflit avec autre réservation
```

**GET `/api/bookings?status=confirmed&limit=10`**

Liste des réservations de l'utilisateur.

```typescript
// Query params
status?: 'pending' | 'confirmed' | 'in_progress' | 'completed' | 'cancelled'
limit?: number (default: 20)
offset?: number (default: 0)
sort?: 'pickup_datetime' | 'created_at' (default: 'pickup_datetime')
order?: 'asc' | 'desc' (default: 'desc')

// Response 200
{
  "success": true,
  "data": {
    "bookings": [ /* array of bookings */ ],
    "pagination": {
      "total": 42,
      "limit": 20,
      "offset": 0,
      "has_more": true
    }
  }
}
```

**PATCH `/api/bookings/[id]`**

Modifier une réservation (avant confirmation).

```typescript
// Request (champs modifiables)
{
  "pickup_datetime": "2026-01-15T16:00:00Z",
  "passengers_count": 3,
  "special_notes": "Nouveau texte"
}

// Response 200
{
  "success": true,
  "data": {
    "booking": { /* updated booking */ }
  }
}

// Erreurs
403 - Modification interdite (trop proche de l'heure)
404 - Réservation non trouvée
409 - Nouveau créneau indisponible
```

**POST `/api/bookings/[id]/cancel`**

Annuler une réservation.

```typescript
// Request
{
  "reason": "Changement de programme"
}

// Response 200
{
  "success": true,
  "data": {
    "booking": {
      "status": "cancelled",
      "cancelled_at": "2026-01-10T10:30:00Z",
      "cancellation_fee": 15.00,
      "refund_amount": 60.00
    }
  }
}
```

**POST `/api/bookings/estimate`**

Estimer le prix d'une course (sans créer).

```typescript
// Request
{
  "pickup_place_id": "ChIJ...",
  "dropoff_place_id": "ChIJ...",
  "pickup_datetime": "2026-01-15T14:30:00Z",
  "has_child_seat": true
}

// Response 200
{
  "success": true,
  "data": {
    "distance_km": 25.5,
    "duration_minutes": 35,
    "base_price": 65.00,
    "options_price": 10.00,
    "total_price": 75.00,
    "breakdown": {
      "distance_cost": 51.00,
      "base_fare": 14.00,
      "child_seat": 10.00
    }
  }
}
```

---

### Payments

**POST `/api/payments/create-intent`**

Créer un Payment Intent Stripe.

```typescript
// Request
{
  "booking_id": "uuid",
  "payment_method_id": "pm_..." // Optionnel si client enregistré
}

// Response 200
{
  "success": true,
  "data": {
    "client_secret": "pi_..._secret_...",
    "payment_intent_id": "pi_..."
  }
}
```

**POST `/api/payments/webhooks`**

Webhook Stripe pour événements paiement.

```typescript
// Gère les événements:
// - payment_intent.succeeded
// - payment_intent.payment_failed
// - charge.refunded

// Mise à jour automatique des statuts bookings et payments
```

---

### Admin

**GET `/api/admin/dashboard`**

Statistiques pour le dashboard admin.

```typescript
// Response 200
{
  "success": true,
  "data": {
    "stats": {
      "today_bookings": 3,
      "month_bookings": 28,
      "month_revenue": 1240.00,
      "pending_bookings": 2,
      "active_clients": 42
    },
    "upcoming_bookings": [ /* next 5 bookings */ ],
    "recent_activity": [ /* last 10 activities */ ]
  }
}

// Requiert: role = 'admin'
```

**POST `/api/admin/bookings/[id]/confirm`**

Confirmer une réservation (admin).

```typescript
// Request (optionnel)
{
  "notes": "Confirmé, tout est OK"
}

// Response 200
{
  "success": true,
  "data": {
    "booking": {
      "status": "confirmed",
      "confirmed_at": "2026-01-10T11:00:00Z"
    }
  }
}
```

**GET `/api/admin/export?format=csv&start_date=2026-01-01&end_date=2026-01-31`**

Exporter les données comptables.

```typescript
// Query params
format: 'csv' | 'excel'
start_date: ISO date
end_date: ISO date
type?: 'bookings' | 'payments' | 'invoices'

// Response 200
File download (CSV ou Excel)
```

---

## Middleware & Validation

### Authentication Middleware

```typescript
// lib/middleware/auth.ts
export async function requireAuth(request: NextRequest) {
  const token = request.headers.get('Authorization')?.replace('Bearer ', '');
  
  if (!token) {
    return NextResponse.json(
      { success: false, error: 'Authentication required' },
      { status: 401 }
    );
  }
  
  const { data: { user }, error } = await supabase.auth.getUser(token);
  
  if (error || !user) {
    return NextResponse.json(
      { success: false, error: 'Invalid token' },
      { status: 401 }
    );
  }
  
  return user;
}

export async function requireAdmin(request: NextRequest) {
  const user = await requireAuth(request);
  
  if (user.role !== 'admin') {
    return NextResponse.json(
      { success: false, error: 'Admin access required' },
      { status: 403 }
    );
  }
  
  return user;
}
```

### Validation Schemas (Zod)

```typescript
// lib/validations/booking.ts
import { z } from 'zod';

export const createBookingSchema = z.object({
  pickup_address: z.string().min(5).max(500),
  pickup_latitude: z.number().min(-90).max(90),
  pickup_longitude: z.number().min(-180).max(180),
  pickup_place_id: z.string().optional(),
  
  dropoff_address: z.string().min(5).max(500),
  dropoff_latitude: z.number().min(-90).max(90),
  dropoff_longitude: z.number().min(-180).max(180),
  dropoff_place_id: z.string().optional(),
  
  pickup_datetime: z.string().datetime().refine(
    (date) => new Date(date) > new Date(),
    { message: "La date doit être dans le futur" }
  ),
  
  passengers_count: z.number().int().min(1).max(4),
  has_child_seat: z.boolean().optional(),
  has_luggage: z.boolean().optional(),
  has_pets: z.boolean().optional(),
  special_notes: z.string().max(500).optional()
});

// Utilisation dans route
const validatedData = createBookingSchema.parse(await request.json());
```

---

## Error Handling

### Format des Erreurs

```typescript
// Success response
{
  "success": true,
  "data": { /* payload */ }
}

// Error response
{
  "success": false,
  "error": {
    "code": "BOOKING_UNAVAILABLE",
    "message": "Ce créneau horaire n'est pas disponible",
    "details": {
      "suggested_times": ["2026-01-15T15:00:00Z", "2026-01-15T16:00:00Z"]
    }
  }
}
```

### Codes d'Erreur Standards

| Code HTTP | Usage | Exemple |
|-----------|-------|---------|
| 200 | Succès | GET réussi |
| 201 | Créé | POST booking créé |
| 400 | Requête invalide | Données malformées |
| 401 | Non authentifié | Token manquant/invalide |
| 403 | Non autorisé | Accès admin requis |
| 404 | Non trouvé | Booking inexistant |
| 409 | Conflit | Créneau déjà pris |
| 422 | Validation échouée | Email invalide |
| 429 | Rate limit | Trop de requêtes |
| 500 | Erreur serveur | Erreur interne |

---

## Rate Limiting

**Protection contre abus :**

```typescript
// lib/rate-limit.ts
import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_URL,
  token: process.env.UPSTASH_REDIS_TOKEN,
});

// 10 requêtes par minute par IP
export const rateLimiter = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(10, '1 m'),
});

// Usage dans route
const identifier = request.ip ?? 'anonymous';
const { success } = await rateLimiter.limit(identifier);

if (!success) {
  return NextResponse.json(
    { error: 'Trop de requêtes, réessayez plus tard' },
    { status: 429 }
  );
}
```

**Limites spécifiques :**
- Auth endpoints : 5 requêtes / minute
- Booking creation : 3 requêtes / minute
- API générales : 60 requêtes / minute
- Admin endpoints : 100 requêtes / minute

---
