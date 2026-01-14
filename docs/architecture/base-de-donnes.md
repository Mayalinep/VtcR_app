# Base de Données

## Principes de Conception

**Normalisation :** Base de données normalisée (3NF) pour éviter redondance  
**Performances :** Indexes sur colonnes fréquemment requêtées  
**Sécurité :** Row Level Security (RLS) activée sur toutes les tables  
**Audit :** Colonnes `created_at` et `updated_at` sur toutes les tables  
**Soft Delete :** Utilisation de `deleted_at` pour suppressions logiques  

---

## Schéma des Tables

### 1. Table `users` (Utilisateurs)

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

### 2. Table `addresses` (Adresses favorites)

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

### 3. Table `bookings` (Réservations)

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

### 4. Table `payments` (Paiements)

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

### 5. Table `availability_blocks` (Blocages de disponibilité)

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

### 6. Table `invoices` (Factures)

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

### 7. Table `reviews` (Avis clients)

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

### 8. Table `activity_logs` (Logs d'activité)

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

## Relations

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

## Indexes et Optimisations

### Indexes Composites (pour requêtes complexes)

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

### Partitioning (optionnel, si forte volumétrie)

Pour scaler au-delà de 100k réservations, partitionner par date :

```sql
-- Partition bookings par année
CREATE TABLE bookings_2026 PARTITION OF bookings
FOR VALUES FROM ('2026-01-01') TO ('2027-01-01');

CREATE TABLE bookings_2027 PARTITION OF bookings
FOR VALUES FROM ('2027-01-01') TO ('2028-01-01');
```

---

## Fonctions et Triggers

### 1. Génération automatique du booking_number

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

### 2. Mise à jour automatique de `updated_at`

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

### 3. Vérification de chevauchement de disponibilités

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

## Row Level Security (RLS)

**Principe :** Chaque utilisateur ne peut accéder qu'à ses propres données.

### Exemple : Table `bookings`

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
