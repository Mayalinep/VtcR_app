# VTC Rachel - Architecture Technique

<!-- Powered by BMAD™ Core -->

---

## Table des Matières

1. [Vue d'Ensemble](#vue-densemble)
2. [Base de Données](#base-de-données)
   - [Schéma des Tables](#schéma-des-tables)
   - [Relations](#relations)
   - [Indexes et Optimisations](#indexes-et-optimisations)
3. [Architecture API](#architecture-api)
4. [Sécurité](#sécurité)
5. [Infrastructure](#infrastructure)

---

## Vue d'Ensemble

### Stack Technique

**Application :** Next.js 14+ (App Router) + TypeScript  
**Base de Données :** PostgreSQL via Supabase  
**Authentication :** Supabase Auth  
**Paiements :** Stripe  
**Maps :** Google Maps Platform  
**Emails :** Resend  
**Hosting :** Vercel  

### Architecture Générale

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

## Base de Données

### Principes de Conception

**Normalisation :** Base de données normalisée (3NF) pour éviter redondance  
**Performances :** Indexes sur colonnes fréquemment requêtées  
**Sécurité :** Row Level Security (RLS) activée sur toutes les tables  
**Audit :** Colonnes `created_at` et `updated_at` sur toutes les tables  
**Soft Delete :** Utilisation de `deleted_at` pour suppressions logiques  

---

### Schéma des Tables

#### 1. Table `users` (Utilisateurs)

**Description :** Informations des clients et de Rachel (admin).

```sql
CREATE TABLE users (
  -- Identifiants
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email VARCHAR(255) UNIQUE NOT NULL,
  
  -- Informations personnelles
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  phone VARCHAR(20),
  avatar_url TEXT,
  
  -- Rôle et statut
  role VARCHAR(20) NOT NULL DEFAULT 'client', -- 'client' | 'admin'
  status VARCHAR(20) NOT NULL DEFAULT 'active', -- 'active' | 'inactive' | 'suspended'
  
  -- Préférences
  notifications_enabled BOOLEAN DEFAULT true,
  email_notifications BOOLEAN DEFAULT true,
  sms_notifications BOOLEAN DEFAULT false,
  
  -- Métadonnées
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  last_login_at TIMESTAMP WITH TIME ZONE,
  deleted_at TIMESTAMP WITH TIME ZONE
);

-- Indexes
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_role ON users(role);
CREATE INDEX idx_users_status ON users(status);
```

**Contraintes :**
- Email doit être valide (validation applicative)
- Phone doit être au format international (validation applicative)
- Role doit être 'client' ou 'admin'

---

#### 2. Table `addresses` (Adresses favorites)

**Description :** Adresses sauvegardées par les clients pour réutilisation rapide.

```sql
CREATE TABLE addresses (
  -- Identifiants
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  
  -- Informations adresse
  label VARCHAR(50) NOT NULL, -- 'Maison', 'Travail', 'Aéroport CDG', etc.
  address_line TEXT NOT NULL, -- Adresse complète formatée
  city VARCHAR(100) NOT NULL,
  postal_code VARCHAR(10),
  country VARCHAR(2) DEFAULT 'FR', -- Code ISO
  
  -- Coordonnées géographiques
  latitude DECIMAL(10, 8),
  longitude DECIMAL(11, 8),
  
  -- Google Places
  place_id VARCHAR(255), -- Google Place ID pour autocomplétion
  
  -- Métadonnées
  is_default BOOLEAN DEFAULT false, -- Adresse par défaut
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_addresses_user_id ON addresses(user_id);
CREATE INDEX idx_addresses_place_id ON addresses(place_id);
```

**Contraintes :**
- Un utilisateur peut avoir plusieurs adresses
- Un utilisateur ne peut avoir qu'une seule adresse par défaut

---

#### 3. Table `bookings` (Réservations)

**Description :** Réservations de courses des clients.

```sql
CREATE TABLE bookings (
  -- Identifiants
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  booking_number VARCHAR(20) UNIQUE NOT NULL, -- Format: RCH-YYYY-XXXX
  user_id UUID NOT NULL REFERENCES users(id),
  
  -- Trajet
  pickup_address TEXT NOT NULL,
  pickup_city VARCHAR(100) NOT NULL,
  pickup_latitude DECIMAL(10, 8),
  pickup_longitude DECIMAL(11, 8),
  pickup_place_id VARCHAR(255),
  
  dropoff_address TEXT NOT NULL,
  dropoff_city VARCHAR(100) NOT NULL,
  dropoff_latitude DECIMAL(10, 8),
  dropoff_longitude DECIMAL(11, 8),
  dropoff_place_id VARCHAR(255),
  
  -- Informations course
  distance_km DECIMAL(6, 2), -- Distance en kilomètres
  duration_minutes INTEGER, -- Durée estimée en minutes
  pickup_datetime TIMESTAMP WITH TIME ZONE NOT NULL,
  
  -- Passagers et options
  passengers_count INTEGER DEFAULT 1,
  has_child_seat BOOLEAN DEFAULT false,
  has_luggage BOOLEAN DEFAULT false,
  waiting_time_minutes INTEGER DEFAULT 0,
  has_pets BOOLEAN DEFAULT false,
  special_notes TEXT,
  
  -- Tarification
  base_price DECIMAL(10, 2) NOT NULL,
  options_price DECIMAL(10, 2) DEFAULT 0,
  total_price DECIMAL(10, 2) NOT NULL,
  currency VARCHAR(3) DEFAULT 'EUR',
  
  -- Statut
  status VARCHAR(20) NOT NULL DEFAULT 'pending', 
  -- 'pending' | 'confirmed' | 'in_progress' | 'completed' | 'cancelled'
  
  -- Paiement
  payment_status VARCHAR(20) NOT NULL DEFAULT 'unpaid',
  -- 'unpaid' | 'paid' | 'refunded' | 'partial_refund'
  payment_method VARCHAR(20), -- 'card' | 'apple_pay' | 'google_pay' | 'cash'
  
  -- Annulation
  cancelled_at TIMESTAMP WITH TIME ZONE,
  cancelled_by UUID REFERENCES users(id),
  cancellation_reason TEXT,
  cancellation_fee DECIMAL(10, 2) DEFAULT 0,
  
  -- Métadonnées
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  confirmed_at TIMESTAMP WITH TIME ZONE,
  completed_at TIMESTAMP WITH TIME ZONE
);

-- Indexes
CREATE INDEX idx_bookings_user_id ON bookings(user_id);
CREATE INDEX idx_bookings_booking_number ON bookings(booking_number);
CREATE INDEX idx_bookings_status ON bookings(status);
CREATE INDEX idx_bookings_pickup_datetime ON bookings(pickup_datetime);
CREATE INDEX idx_bookings_payment_status ON bookings(payment_status);
CREATE INDEX idx_bookings_created_at ON bookings(created_at DESC);
```

**Contraintes :**
- `booking_number` généré automatiquement (trigger)
- `pickup_datetime` doit être dans le futur (validation applicative)
- `total_price` = `base_price` + `options_price` (calculé)
- `passengers_count` entre 1 et 4

---

#### 4. Table `payments` (Paiements)

**Description :** Transactions de paiement Stripe.

```sql
CREATE TABLE payments (
  -- Identifiants
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  booking_id UUID NOT NULL REFERENCES bookings(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES users(id),
  
  -- Stripe
  stripe_payment_intent_id VARCHAR(255) UNIQUE,
  stripe_charge_id VARCHAR(255),
  stripe_customer_id VARCHAR(255),
  
  -- Montants
  amount DECIMAL(10, 2) NOT NULL,
  currency VARCHAR(3) DEFAULT 'EUR',
  
  -- Statut
  status VARCHAR(20) NOT NULL DEFAULT 'pending',
  -- 'pending' | 'processing' | 'succeeded' | 'failed' | 'refunded'
  
  -- Méthode
  payment_method VARCHAR(20), -- 'card' | 'apple_pay' | 'google_pay'
  card_brand VARCHAR(20), -- 'visa' | 'mastercard' | 'amex'
  card_last4 VARCHAR(4),
  
  -- Remboursement
  refund_amount DECIMAL(10, 2) DEFAULT 0,
  refund_reason TEXT,
  refunded_at TIMESTAMP WITH TIME ZONE,
  
  -- Erreurs
  failure_message TEXT,
  failure_code VARCHAR(50),
  
  -- Métadonnées
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  succeeded_at TIMESTAMP WITH TIME ZONE
);

-- Indexes
CREATE INDEX idx_payments_booking_id ON payments(booking_id);
CREATE INDEX idx_payments_user_id ON payments(user_id);
CREATE INDEX idx_payments_stripe_payment_intent_id ON payments(stripe_payment_intent_id);
CREATE INDEX idx_payments_status ON payments(status);
```

**Contraintes :**
- Un booking peut avoir plusieurs paiements (en cas d'échec puis retry)
- `amount` doit correspondre au `total_price` du booking

---

#### 5. Table `availability_blocks` (Blocages de disponibilité)

**Description :** Créneaux horaires bloqués par Rachel (congés, maintenance, etc.).

```sql
CREATE TABLE availability_blocks (
  -- Identifiants
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  admin_id UUID NOT NULL REFERENCES users(id),
  
  -- Période
  start_datetime TIMESTAMP WITH TIME ZONE NOT NULL,
  end_datetime TIMESTAMP WITH TIME ZONE NOT NULL,
  
  -- Informations
  reason VARCHAR(100) NOT NULL, -- 'Congés', 'Maintenance véhicule', etc.
  notes TEXT,
  
  -- Type
  block_type VARCHAR(20) DEFAULT 'unavailable',
  -- 'unavailable' | 'maintenance' | 'vacation'
  
  -- Métadonnées
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_availability_blocks_admin_id ON availability_blocks(admin_id);
CREATE INDEX idx_availability_blocks_datetime ON availability_blocks(start_datetime, end_datetime);
```

**Contraintes :**
- `end_datetime` doit être après `start_datetime`
- Pas de chevauchements de blocks (validation applicative)

---

#### 6. Table `invoices` (Factures)

**Description :** Factures générées pour les réservations payées.

```sql
CREATE TABLE invoices (
  -- Identifiants
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  invoice_number VARCHAR(20) UNIQUE NOT NULL, -- Format: INV-YYYY-XXXX
  booking_id UUID NOT NULL REFERENCES bookings(id),
  user_id UUID NOT NULL REFERENCES users(id),
  payment_id UUID REFERENCES payments(id),
  
  -- Montants
  subtotal DECIMAL(10, 2) NOT NULL,
  tax_rate DECIMAL(5, 2) DEFAULT 0, -- Taux TVA (ex: 20.00 pour 20%)
  tax_amount DECIMAL(10, 2) DEFAULT 0,
  total DECIMAL(10, 2) NOT NULL,
  currency VARCHAR(3) DEFAULT 'EUR',
  
  -- Informations légales
  siret VARCHAR(20),
  business_name VARCHAR(255),
  business_address TEXT,
  
  -- Fichier PDF
  pdf_url TEXT, -- URL du PDF généré et stocké
  
  -- Statut
  status VARCHAR(20) DEFAULT 'draft', -- 'draft' | 'sent' | 'paid' | 'void'
  
  -- Dates
  issue_date DATE NOT NULL,
  due_date DATE,
  paid_at TIMESTAMP WITH TIME ZONE,
  
  -- Métadonnées
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_invoices_invoice_number ON invoices(invoice_number);
CREATE INDEX idx_invoices_booking_id ON invoices(booking_id);
CREATE INDEX idx_invoices_user_id ON invoices(user_id);
CREATE INDEX idx_invoices_status ON invoices(status);
CREATE INDEX idx_invoices_issue_date ON invoices(issue_date DESC);
```

**Contraintes :**
- `invoice_number` généré automatiquement (trigger)
- Une réservation = une facture (relation 1:1)
- `total` = `subtotal` + `tax_amount`

---

#### 7. Table `reviews` (Avis clients)

**Description :** Avis et notes laissés par les clients après une course.

```sql
CREATE TABLE reviews (
  -- Identifiants
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  booking_id UUID NOT NULL UNIQUE REFERENCES bookings(id),
  user_id UUID NOT NULL REFERENCES users(id),
  
  -- Notation
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  
  -- Commentaire
  comment TEXT,
  
  -- Modération
  is_approved BOOLEAN DEFAULT false,
  is_visible BOOLEAN DEFAULT true,
  
  -- Métadonnées
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_reviews_booking_id ON reviews(booking_id);
CREATE INDEX idx_reviews_user_id ON reviews(user_id);
CREATE INDEX idx_reviews_rating ON reviews(rating);
CREATE INDEX idx_reviews_is_approved ON reviews(is_approved);
```

**Contraintes :**
- Un booking = un seul avis
- Rating entre 1 et 5
- Avis modérés avant affichage public

---

#### 8. Table `activity_logs` (Logs d'activité)

**Description :** Historique des actions importantes (audit trail).

```sql
CREATE TABLE activity_logs (
  -- Identifiants
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id),
  
  -- Action
  action_type VARCHAR(50) NOT NULL,
  -- 'booking_created' | 'booking_cancelled' | 'payment_succeeded' | etc.
  
  entity_type VARCHAR(50), -- 'booking' | 'user' | 'payment'
  entity_id UUID,
  
  -- Détails
  description TEXT,
  metadata JSONB, -- Données additionnelles flexibles
  
  -- Contexte
  ip_address INET,
  user_agent TEXT,
  
  -- Métadonnées
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_activity_logs_user_id ON activity_logs(user_id);
CREATE INDEX idx_activity_logs_action_type ON activity_logs(action_type);
CREATE INDEX idx_activity_logs_entity ON activity_logs(entity_type, entity_id);
CREATE INDEX idx_activity_logs_created_at ON activity_logs(created_at DESC);
```

---

### Relations

**Diagramme des Relations :**

```
users (1) ──────< (N) addresses
  │
  ├──────< (N) bookings
  │           │
  │           ├──────< (N) payments
  │           │
  │           ├────── (1) invoices
  │           │
  │           └────── (1) reviews
  │
  ├──────< (N) availability_blocks (admin uniquement)
  │
  └──────< (N) activity_logs
```

**Légende :**
- (1) : Relation un-à-un
- (N) : Relation un-à-plusieurs
- `<` : Direction de la relation

---

### Indexes et Optimisations

#### Indexes Composites (pour requêtes complexes)

```sql
-- Recherche de réservations par utilisateur et statut
CREATE INDEX idx_bookings_user_status 
ON bookings(user_id, status);

-- Recherche de réservations par date et statut
CREATE INDEX idx_bookings_date_status 
ON bookings(pickup_datetime DESC, status);

-- Statistiques de paiements par utilisateur
CREATE INDEX idx_payments_user_status 
ON payments(user_id, status, created_at DESC);
```

#### Partitioning (optionnel, si forte volumétrie)

Pour scaler au-delà de 100k réservations, partitionner par date :

```sql
-- Partition bookings par année
CREATE TABLE bookings_2026 PARTITION OF bookings
FOR VALUES FROM ('2026-01-01') TO ('2027-01-01');

CREATE TABLE bookings_2027 PARTITION OF bookings
FOR VALUES FROM ('2027-01-01') TO ('2028-01-01');
```

---

### Fonctions et Triggers

#### 1. Génération automatique du booking_number

```sql
CREATE OR REPLACE FUNCTION generate_booking_number()
RETURNS TRIGGER AS $$
BEGIN
  NEW.booking_number := 'RCH-' || 
                        TO_CHAR(NOW(), 'YYYY') || '-' || 
                        LPAD(nextval('booking_number_seq')::TEXT, 4, '0');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE SEQUENCE booking_number_seq START 1;

CREATE TRIGGER set_booking_number
BEFORE INSERT ON bookings
FOR EACH ROW
EXECUTE FUNCTION generate_booking_number();
```

#### 2. Mise à jour automatique de `updated_at`

```sql
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Appliquer à toutes les tables
CREATE TRIGGER update_users_updated_at
BEFORE UPDATE ON users
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_bookings_updated_at
BEFORE UPDATE ON bookings
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

-- Répéter pour toutes les tables...
```

#### 3. Vérification de chevauchement de disponibilités

```sql
CREATE OR REPLACE FUNCTION check_booking_availability()
RETURNS TRIGGER AS $$
BEGIN
  -- Vérifier si un bloc de disponibilité chevauche
  IF EXISTS (
    SELECT 1 FROM availability_blocks
    WHERE start_datetime <= NEW.pickup_datetime
      AND end_datetime >= NEW.pickup_datetime
  ) THEN
    RAISE EXCEPTION 'Ce créneau horaire n''est pas disponible';
  END IF;
  
  -- Vérifier si une autre réservation chevauche (même jour, +/- 2h)
  IF EXISTS (
    SELECT 1 FROM bookings
    WHERE id != NEW.id
      AND status IN ('confirmed', 'in_progress')
      AND pickup_datetime BETWEEN 
          NEW.pickup_datetime - INTERVAL '2 hours' AND 
          NEW.pickup_datetime + INTERVAL '2 hours'
  ) THEN
    RAISE EXCEPTION 'Une autre réservation existe à ce créneau';
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER check_availability
BEFORE INSERT OR UPDATE ON bookings
FOR EACH ROW
EXECUTE FUNCTION check_booking_availability();
```

---

### Row Level Security (RLS)

**Principe :** Chaque utilisateur ne peut accéder qu'à ses propres données.

#### Exemple : Table `bookings`

```sql
-- Activer RLS
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;

-- Policy : Les clients voient uniquement leurs réservations
CREATE POLICY "Users can view own bookings"
ON bookings FOR SELECT
USING (auth.uid() = user_id);

-- Policy : Les admins voient toutes les réservations
CREATE POLICY "Admins can view all bookings"
ON bookings FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM users
    WHERE users.id = auth.uid()
      AND users.role = 'admin'
  )
);

-- Policy : Insertion uniquement pour propriétaire
CREATE POLICY "Users can insert own bookings"
ON bookings FOR INSERT
WITH CHECK (auth.uid() = user_id);

-- Policy : Mise à jour uniquement pour propriétaire ou admin
CREATE POLICY "Users can update own bookings"
ON bookings FOR UPDATE
USING (auth.uid() = user_id OR EXISTS (
  SELECT 1 FROM users
  WHERE users.id = auth.uid()
    AND users.role = 'admin'
));
```

**Appliquer des policies similaires à toutes les tables sensibles.**

---

## Architecture API

### Principes

**Architecture :** RESTful API via Next.js API Routes  
**Format :** JSON  
**Authentication :** JWT via Supabase Auth  
**Validation :** Zod schemas  
**Error Handling :** Codes HTTP standards + messages clairs  

### Structure des Routes

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

### Endpoints Détaillés

#### Authentication

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

#### Bookings

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

#### Payments

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

#### Admin

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

### Middleware & Validation

#### Authentication Middleware

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

#### Validation Schemas (Zod)

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

### Error Handling

#### Format des Erreurs

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

#### Codes d'Erreur Standards

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

### Rate Limiting

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

## Sécurité

### Authentification

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

### Autorisation (RBAC)

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

### Protection Données Sensibles

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

### RGPD (Conformité)

#### Données Personnelles Collectées

| Donnée | Usage | Base légale |
|--------|-------|-------------|
| Email, Nom, Prénom | Identification, contact | Contrat |
| Téléphone | Contact urgent | Contrat |
| Adresses trajet | Réalisation service | Contrat |
| Historique courses | Facturation, support | Contrat |
| IP, User Agent | Sécurité, logs | Intérêt légitime |
| Paiement (via Stripe) | Paiement sécurisé | Contrat |

#### Droits des Utilisateurs

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

#### Durée de Conservation

- Données client actif : Tant que compte actif
- Données client supprimé : Anonymisées immédiatement sauf obligations légales
- Historique réservations : 10 ans (obligation comptable française)
- Logs techniques : 12 mois

#### Cookies et Consentement

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

### Protection contre Attaques

#### XSS (Cross-Site Scripting)

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

#### CSRF (Cross-Site Request Forgery)

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

#### SQL Injection

**Protections :**
- Supabase utilise des requêtes paramétrées automatiquement
- JAMAIS de concaténation de strings SQL
- Validation stricte des inputs

#### Rate Limiting (DDoS)

**Protections :**
- Upstash Redis pour rate limiting distribué
- Cloudflare en front (optionnel, protection DDoS L7)
- Limites par endpoint (voir section Rate Limiting)

---

## Infrastructure

### Environnements

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

### Architecture Hosting

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

### Déploiement

#### Configuration Vercel

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

#### CI/CD Pipeline

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

### Monitoring & Logs

#### Vercel Analytics

**Inclus gratuitement :**
- Web Vitals (Core Web Vitals)
- Page views
- Unique visitors
- Top pages
- Devices / Browsers

#### Sentry (Error Tracking)

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

#### Supabase Logs

**Logs disponibles :**
- Database logs (queries lentes)
- Auth logs (connexions, échecs)
- API logs (requêtes, erreurs)

**Rétention :** 7 jours (gratuit), 90 jours (payant)

---

### Backups & Recovery

#### Database Backups (Supabase)

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

#### Code Backups

**Git :** Repository GitHub privé
- Commits réguliers
- Branches protégées (main)
- Reviews obligatoires

---

### Scalabilité

#### Limites des Tiers Gratuits

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

#### Plan de Scaling

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

#### Optimisations Performances

**Caching :**
- Static pages (landing) → CDN Vercel (cache infini)
- API responses → Redis cache (5 min)
- Images → Vercel Image Optimization (auto)

**Database :**
- Indexes sur colonnes fréquentes (déjà définis)
- Connection pooling (Supabase)
- Requêtes optimisées (EXPLAIN ANALYZE)

---

## Architecture Technique Complète

**Ce que nous avons créé :**

### Base de Données
- 8 tables PostgreSQL complètes avec relations
- Indexes, triggers, RLS pour sécurité
- Fonctions de validation

### Architecture API
- Structure RESTful complète (30+ endpoints)
- Authentication JWT via Supabase
- Validation Zod, error handling
- Rate limiting, middleware

### Sécurité
- HTTPS, authentification, autorisation RBAC
- Protection XSS, CSRF, SQL injection
- RGPD conforme (droits utilisateurs, soft delete)
- Chiffrement données sensibles

### Infrastructure
- Hosting Vercel (Edge Network, serverless)
- Database Supabase (PostgreSQL managé)
- CI/CD automatique via Git
- Monitoring Sentry + Vercel Analytics
- Backups automatiques, plan de scaling

**Ready pour le développement !**

---

*Document complet - Architecture technique finalisée*

