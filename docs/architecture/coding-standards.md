# Coding Standards - VTC Rachel

<!-- Powered by BMAD™ Core -->

---

## TypeScript Standards

### Configuration

**Strict Mode :** Activé (`"strict": true` dans `tsconfig.json`)

**Règles strictes :**
- ✅ `noImplicitAny` : Interdit les `any` implicites
- ✅ `strictNullChecks` : Gestion explicite des `null`/`undefined`
- ✅ `strictFunctionTypes` : Vérification stricte des types de fonctions
- ✅ `noUnusedLocals` : Erreur si variable locale non utilisée
- ✅ `noUnusedParameters` : Erreur si paramètre non utilisé

### Types & Interfaces

**Conventions de nommage :**
```typescript
// ✅ Interfaces : PascalCase avec suffix optionnel
interface User {
  id: string;
  email: string;
}

interface BookingFormData {
  departure: string;
  arrival: string;
}

// ✅ Types : PascalCase
type BookingStatus = 'pending' | 'confirmed' | 'completed' | 'cancelled';

// ✅ Enums : PascalCase
enum PaymentMethod {
  CARD = 'card',
  APPLE_PAY = 'apple_pay',
  GOOGLE_PAY = 'google_pay',
}
```

**Règles :**
- ✅ Préférer `interface` pour objets extensibles
- ✅ Préférer `type` pour unions, intersections, primitives
- ✅ Utiliser `const assertions` pour données immuables : `as const`
- ✅ Éviter `any` : utiliser `unknown` si type vraiment inconnu

---

## Naming Conventions

### Fichiers & Dossiers

**Fichiers :**
- ✅ Composants React : `PascalCase.tsx` (ex: `BookingForm.tsx`)
- ✅ Utils/Helpers : `camelCase.ts` (ex: `formatPrice.ts`)
- ✅ Types : `camelCase.ts` (ex: `booking.ts`)
- ✅ Pages Next.js : `page.tsx`, `layout.tsx`, `route.ts`
- ✅ Tests : `*.test.ts` ou `*.spec.ts`

**Dossiers :**
- ✅ `kebab-case` pour dossiers (ex: `booking-form/`, `user-profile/`)
- ✅ `PascalCase` pour dossiers de composants (ex: `components/BookingForm/`)

### Variables & Functions

**Variables :**
```typescript
// ✅ camelCase pour variables
const bookingPrice = 75.50;
const userEmail = 'client@example.com';

// ✅ UPPER_SNAKE_CASE pour constantes
const MAX_PASSENGERS = 4;
const DEFAULT_CURRENCY = 'EUR';
```

**Functions :**
```typescript
// ✅ camelCase pour fonctions
function calculatePrice(distance: number): number { }
function formatDate(date: Date): string { }

// ✅ PascalCase pour composants React
function BookingForm() { }
function UserProfile() { }
```

**Boolean :**
```typescript
// ✅ Préfixe is/has/should/can
const isConfirmed = true;
const hasChildSeat = false;
const shouldSendEmail = true;
const canCancel = false;
```

---

## Component Structure

### React Components

**Structure standard :**
```typescript
'use client'; // Si interactivité nécessaire

import { useState } from 'react';
import type { Booking } from '@/types/booking';

/**
 * BookingForm - Formulaire de réservation
 * 
 * @description Permet aux clients de créer une nouvelle réservation
 * @example
 * <BookingForm onSubmit={handleSubmit} />
 */
interface BookingFormProps {
  onSubmit: (data: BookingFormData) => void;
  initialData?: Partial<BookingFormData>;
}

export default function BookingForm({
  onSubmit,
  initialData,
}: BookingFormProps) {
  // 1. Hooks
  const [departure, setDeparture] = useState(initialData?.departure || '');
  
  // 2. Handlers
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ departure, arrival });
  };
  
  // 3. Render
  return (
    <form onSubmit={handleSubmit}>
      {/* ... */}
    </form>
  );
}
```

**Règles :**
- ✅ Server Components par défaut (pas de `'use client'` si pas nécessaire)
- ✅ `'use client'` uniquement si : hooks, événements, state, context
- ✅ Props typées avec `interface`
- ✅ JSDoc pour composants complexes
- ✅ Exports nommés pour composants réutilisables

### File Organization

**Ordre des imports :**
```typescript
// 1. React & Next.js
import { useState } from 'react';
import { useRouter } from 'next/navigation';

// 2. Libraries tierces
import { z } from 'zod';
import { motion } from 'framer-motion';

// 3. Internal modules (lib, components, types)
import { formatPrice } from '@/lib/utils/format';
import { Button } from '@/components/ui/Button';
import type { Booking } from '@/types/booking';

// 4. Relative imports
import './BookingForm.css';
```

---

## Code Style

### Formatting

**Outils :**
- ✅ **Prettier** : Formatage automatique (à configurer)
- ✅ **ESLint** : Linting (déjà configuré avec `eslint-config-next`)

**Règles :**
- ✅ 2 espaces d'indentation
- ✅ Pas de point-virgule (sauf si nécessaire)
- ✅ Guillemets simples pour strings
- ✅ Trailing commas dans objets/arrays multilignes

### Comments

**JSDoc pour fonctions publiques :**
```typescript
/**
 * Calcule le prix d'une course selon distance et options
 * 
 * @param distance - Distance en kilomètres
 * @param options - Options supplémentaires (siège enfant, etc.)
 * @returns Prix total en euros
 * 
 * @example
 * const price = calculatePrice(25, { hasChildSeat: true });
 * // Returns: 75.50
 */
export function calculatePrice(
  distance: number,
  options: BookingOptions
): number {
  // ...
}
```

**Comments inline :**
- ✅ Expliquer le **POURQUOI**, pas le **QUOI**
- ✅ Éviter les commentaires évidents
- ✅ Utiliser `// TODO:` pour tâches futures
- ✅ Utiliser `// FIXME:` pour bugs connus

---

## Error Handling

### Try-Catch

```typescript
// ✅ Toujours gérer les erreurs
async function createBooking(data: BookingFormData) {
  try {
    const response = await fetch('/api/bookings', {
      method: 'POST',
      body: JSON.stringify(data),
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    // ✅ Logger l'erreur
    console.error('Failed to create booking:', error);
    
    // ✅ Retourner erreur typée
    throw new BookingError('Failed to create booking', { cause: error });
  }
}
```

### Error Types

```typescript
// ✅ Créer types d'erreur spécifiques
class BookingError extends Error {
  constructor(
    message: string,
    public code: string,
    public details?: unknown
  ) {
    super(message);
    this.name = 'BookingError';
  }
}
```

---

## Database & API

### Supabase Queries

```typescript
// ✅ Toujours typer les réponses
import type { Database } from '@/types/database';

const { data, error } = await supabase
  .from('bookings')
  .select('*')
  .eq('user_id', userId)
  .returns<Database['public']['Tables']['bookings']['Row'][]>();

if (error) {
  throw new Error(`Database error: ${error.message}`);
}
```

### API Routes

```typescript
// ✅ Structure standard API Route
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

const createBookingSchema = z.object({
  departure: z.string().min(5),
  arrival: z.string().min(5),
});

export async function POST(request: NextRequest) {
  try {
    // 1. Validation
    const body = await request.json();
    const validatedData = createBookingSchema.parse(body);
    
    // 2. Auth check
    const user = await requireAuth(request);
    
    // 3. Business logic
    const booking = await createBooking(validatedData, user.id);
    
    // 4. Response
    return NextResponse.json(
      { success: true, data: booking },
      { status: 201 }
    );
  } catch (error) {
    // 5. Error handling
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, error: error.errors },
        { status: 422 }
      );
    }
    
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
```

---

## Testing Standards

### Unit Tests

```typescript
// ✅ Structure test Vitest
import { describe, it, expect } from 'vitest';
import { calculatePrice } from './pricing';

describe('calculatePrice', () => {
  it('should calculate base price correctly', () => {
    const price = calculatePrice(25);
    expect(price).toBe(62.50);
  });
  
  it('should add child seat fee', () => {
    const price = calculatePrice(25, { hasChildSeat: true });
    expect(price).toBe(72.50);
  });
});
```

---

## Security Rules

### Environment Variables

```typescript
// ✅ Toujours valider env vars
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
if (!supabaseUrl) {
  throw new Error('NEXT_PUBLIC_SUPABASE_URL is not set');
}

// ✅ Ne JAMAIS exposer secrets côté client
// ❌ MAUVAIS
const secretKey = process.env.STRIPE_SECRET_KEY; // Exposé !

// ✅ BON
const secretKey = process.env.STRIPE_SECRET_KEY; // Côté serveur uniquement
```

### Input Validation

```typescript
// ✅ Toujours valider avec Zod
import { z } from 'zod';

const bookingSchema = z.object({
  departure: z.string().min(5).max(500),
  arrival: z.string().min(5).max(500),
  pickup_datetime: z.string().datetime(),
});

// ✅ Sanitize user input
function sanitizeInput(input: string): string {
  return input.trim().replace(/[<>]/g, '');
}
```

---

## Performance Rules

### React Optimization

```typescript
// ✅ Utiliser useMemo pour calculs coûteux
const expensiveValue = useMemo(() => {
  return calculateComplexValue(data);
}, [data]);

// ✅ Utiliser useCallback pour handlers passés en props
const handleClick = useCallback(() => {
  // ...
}, [dependencies]);

// ✅ Lazy loading pour composants lourds
const HeavyComponent = lazy(() => import('./HeavyComponent'));
```

### Next.js Optimization

```typescript
// ✅ Server Components par défaut
export default async function BookingPage() {
  const bookings = await getBookings(); // Fetch côté serveur
  return <BookingList bookings={bookings} />;
}

// ✅ Image optimization
import Image from 'next/image';
<Image
  src="/images/car.png"
  alt="VTC Rachel"
  width={800}
  height={600}
  priority // Pour images above-the-fold
/>
```

---

## Git Conventions

### Commit Messages

**Format :** `type(scope): description`

**Types :**
- `feat:` - Nouvelle fonctionnalité
- `fix:` - Correction de bug
- `docs:` - Documentation
- `style:` - Formatage (Prettier)
- `refactor:` - Refactoring
- `test:` - Tests
- `chore:` - Maintenance

**Exemples :**
```
feat(booking): add price calculation engine
fix(auth): resolve login redirect issue
docs(readme): update setup instructions
refactor(components): extract Hero component
```

---

## Summary

**Règles principales :**
1. ✅ TypeScript strict mode activé
2. ✅ Server Components par défaut
3. ✅ Validation Zod pour toutes les entrées
4. ✅ Error handling explicite
5. ✅ JSDoc pour fonctions publiques
6. ✅ Tests unitaires pour logique critique
7. ✅ Commits conventionnels

**Outils :**
- TypeScript 5+ (strict)
- ESLint + Prettier
- Vitest (tests)
- Zod (validation)

---

*Document créé le : 2026-01-13*  
*Version : 1.0*
