# Epic 3: Booking System Core

**Epic Goal :** Implémenter le système de réservation complet avec formulaire multi-étapes, intégration Google Maps (autocomplétion adresses, calcul trajet/prix), gestion des disponibilités, et sauvegarde en base de données. À la fin de cet Epic, les clients peuvent créer une réservation complète (sans paiement, traité en Epic 4).

## Story 3.1: Google Maps Integration & API Setup

**As a** developer,  
**I want** to integrate Google Maps Platform,  
**so that** users can search addresses and visualize routes.

**Acceptance Criteria:**

1. Create Google Cloud Project and enable APIs:
   - Places API (address autocomplete)
   - Distance Matrix API (route calculation)
   - Maps JavaScript API (map display)
   - Geocoding API (lat/lng conversion)
2. Generate API key and restrict it (HTTP referrers, API restrictions)
3. Add API key to environment variables (`NEXT_PUBLIC_GOOGLE_MAPS_API_KEY`)
4. Install `@googlemaps/js-api-loader` package
5. Create Google Maps wrapper component (`<GoogleMapWrapper />`)
6. Create Places Autocomplete component (`<PlacesAutocomplete />`)
7. Test API integration:
   - Autocomplete suggests addresses as user types
   - Selecting address returns full details (lat/lng, formatted address)
8. Create helper functions in `/lib/maps`:
   - `calculateRoute(origin, destination)` → distance, duration, price
   - `geocodeAddress(address)` → lat/lng
9. Monitor API usage (ensure staying under 15k requests/month free tier)
10. Implement error handling for API failures
11. Test with various Paris addresses (streets, landmarks, airports)

## Story 3.2: Booking Form - Step 1 (Addresses)

**As a** user,  
**I want** to enter my pickup and drop-off addresses,  
**so that** I can start booking a ride.

**Acceptance Criteria:**

1. Create `/book` page (authenticated route)
2. Implement multi-step form structure (Step 1 of 3)
3. Step 1 UI:
   - "Où allez-vous ?" heading
   - Pickup address input with Places Autocomplete
   - Drop-off address input with Places Autocomplete
   - "Utiliser ma position" button for pickup (Geolocation API)
   - Quick select buttons for saved addresses (if user has any)
   - "Continuer" button (disabled until both addresses filled)
4. Autocomplete behavior:
   - Dropdown shows suggestions as user types
   - Bias results to Paris/Île-de-France region
   - Show place icons (home, work, airport)
5. Swap addresses button (reverse pickup/drop-off)
6. Show small map preview with pins once both addresses selected
7. Validate addresses:
   - Must be within service area (Paris, IDF, CDG, Orly)
   - Show error if outside service area
8. Save selected addresses to form state (Zustand or React state)
9. On "Continuer", validate and proceed to Step 2
10. Responsive design (mobile-first)
11. Test autocomplete with various inputs
12. Test geolocation permission flow

## Story 3.3: Booking Form - Step 2 (Date, Time & Options)

**As a** user,  
**I want** to select when I need the ride and add options,  
**so that** the booking matches my needs.

**Acceptance Criteria:**

1. Navigate to Step 2 after completing Step 1
2. Show progress indicator (Step 2 of 3)
3. Step 2 UI:
   - "Quand ?" heading
   - Date picker (today + next 30 days, disable past dates)
   - Time picker (15-minute intervals, 24h format)
   - "Réserver maintenant" quick button (ASAP, +15 min from now)
4. Passenger count selector (1-4, default 1)
5. Options checkboxes:
   - Siège enfant
   - Bagages volumineux
   - Temps d'attente prévu (select: 0, 15, 30, 45, 60 min)
   - Notes spéciales (textarea, optional)
6. Real-time availability check:
   - Query `blocked_slots` table for selected datetime
   - Show warning if slot unavailable
   - Suggest alternative times if blocked
7. Validate datetime:
   - Must be at least 2h in future (configurable)
   - Cannot be more than 30 days ahead
8. Show route summary (from Step 1):
   - "Paris 15e → CDG Terminal 2E"
   - Estimated distance and duration
9. "Retour" button (back to Step 1, preserve data)
10. "Continuer" button (disabled until datetime selected)
11. Save selections to form state
12. On "Continuer", proceed to Step 3 (confirmation)
13. Test date/time picker UX on mobile and desktop
14. Test availability check with mock blocked slots

## Story 3.4: Price Calculation Engine

**As a** developer,  
**I want** to implement the pricing logic,  
**so that** users see accurate prices for their bookings.

**Acceptance Criteria:**

1. Create pricing configuration file (`/config/pricing.ts`):
   - Base price per km: €X (to be defined with Rachel)
   - Minimum fare: €Y
   - Time-based rate: €Z per minute
   - Airport surcharge: €A (CDG/Orly)
   - Night surcharge: +X% (22h-6h)
   - Weekend surcharge: +Y% (optional)
   - Options surcharges:
     - Siège enfant: +€5
     - Bagages volumineux: +€10
     - Temps d'attente: €15/h
2. Create `calculatePrice()` function:
   - Inputs: distance (km), duration (min), datetime, options, addresses
   - Apply base calculation: (km * rate) + (min * time_rate)
   - Apply minimum fare if below threshold
   - Apply surcharges if applicable (airport, night, weekend, options)
   - Return: { basePrice, surcharges[], totalPrice }
3. Call Google Distance Matrix API to get distance/duration
4. Display price breakdown in UI:
   - Base fare: €X
   - Airport surcharge: +€Y
   - Night surcharge: +€Z
   - Options: +€A
   - **Total: €TOTAL** (prominent display)
5. Recalculate price when:
   - Addresses change
   - DateTime changes (night/weekend detection)
   - Options change
6. Show "Calcul en cours..." skeleton while fetching route data
7. Handle edge cases:
   - API failure → Show error, suggest retry
   - Very long distance → Show warning, confirm intent
8. Store price in form state for later confirmation
9. Test price calculation with various scenarios:
   - Short trip Paris intra-muros
   - Long trip Paris → CDG
   - Night booking
   - Weekend with options
10. Verify calculations match expected formulas

## Story 3.5: Booking Form - Step 3 (Confirmation)

**As a** user,  
**I want** to review my booking details before confirming,  
**so that** I can ensure everything is correct.

**Acceptance Criteria:**

1. Navigate to Step 3 after completing Step 2
2. Show progress indicator (Step 3 of 3)
3. Display complete booking summary:
   - **Trajet:**
     - Pickup address (with map pin icon)
     - Drop-off address (with map pin icon)
     - Distance: X km, Duration: Y min
   - **Date et heure:**
     - Day, date, time formatted nicely
   - **Passagers:** X
   - **Options:** List selected options
   - **Notes:** Display if any
4. Display interactive map:
   - Show route between pickup and drop-off
   - Markers on both locations
   - Route polyline
   - Fit bounds to show entire route
5. Price breakdown card (prominent):
   - Base price
   - Surcharges (itemized)
   - **Total price** (large, bold)
6. Payment method selector:
   - "Payer maintenant" (radio button, default)
   - "Payer avant la course" (radio button)
   - Show selected payment method if saved (future epic)
7. Terms acceptance:
   - Checkbox: "J'accepte les CGV et la politique d'annulation"
   - Link to terms (open in modal or new tab)
8. Action buttons:
   - "Retour" (back to Step 2, preserve data)
   - "Confirmer la réservation" (primary, large)
     - Disabled until terms accepted
     - Show loading spinner on click
9. On confirm:
   - Validate all data one last time
   - Call API to create booking
   - If payment "now", redirect to payment (Epic 4)
   - If payment "later", show success page
10. Handle errors:
    - Slot no longer available → Show alert, back to Step 2
    - Server error → Show retry option
11. Responsive design for map + summary
12. Test confirmation flow end-to-end

## Story 3.6: Create Booking API & Database Persistence

**As a** developer,  
**I want** to save confirmed bookings to the database,  
**so that** they are persisted and accessible.

**Acceptance Criteria:**

1. Create API route `/api/bookings` (POST)
2. Validate request body with Zod schema:
   - user_id (from auth session)
   - pickup_address, pickup_lat, pickup_lng
   - dropoff_address, dropoff_lat, dropoff_lng
   - datetime (ISO string)
   - passenger_count
   - options (JSON: child_seat, luggage, wait_time, notes)
   - distance_km, duration_min
   - price_breakdown (JSON: base, surcharges, total)
   - payment_intent (enum: 'now', 'later')
3. Server-side validations:
   - User is authenticated
   - Datetime is in future (minimum 2h ahead)
   - Slot is available (check `blocked_slots`)
   - Addresses are within service area
4. Insert booking into `bookings` table:
   - Generate unique booking_id
   - Set status: 'pending' (awaiting confirmation)
   - Set created_at timestamp
5. Return response:
   - Success: { booking_id, status, message }
   - Error: { error, message }
6. Implement RLS policy:
   - User can insert their own bookings
   - User can read their own bookings
7. Transaction safety:
   - Use database transactions if multiple inserts
   - Rollback on error
8. Logging:
   - Log all booking creations (user_id, booking_id, timestamp)
   - Log errors with context
9. Test API endpoint:
   - Valid booking → 201 Created
   - Invalid data → 400 Bad Request
   - Unauthorized → 401 Unauthorized
   - Slot conflict → 409 Conflict
10. Test RLS: User A cannot see User B's bookings

## Story 3.7: Booking Confirmation Page

**As a** user,  
**I want** to see a confirmation after booking,  
**so that** I know my reservation was successful.

**Acceptance Criteria:**

1. Create `/book/success` page (authenticated)
2. Show success animation (confetti, checkmark, celebration)
3. Display confirmation message:
   - "Réservation confirmée !" (large heading)
   - "Nous avons bien reçu votre demande"
4. Show booking details card:
   - Booking reference number (e.g., "VTC-20260109-001")
   - Pickup address
   - Drop-off address
   - Date and time
   - Price
   - Status: "En attente de confirmation"
5. Show next steps:
   - "Rachel va confirmer votre réservation prochainement"
   - "Vous recevrez un email de confirmation"
   - If payment "later": "Paiement requis 24h avant la course"
6. Action buttons:
   - "Voir mes réservations" (link to /bookings)
   - "Retour à l'accueil" (link to /dashboard)
   - "Réserver une autre course" (link to /book)
7. Send confirmation email (trigger from API):
   - Email with booking details
   - Link to view booking
   - Contact info for questions
8. If payment "now" was selected:
   - Show "Procéder au paiement" button
   - Redirect to Stripe Checkout (Epic 4)
9. Responsive design
10. Test confirmation page displays correctly
11. Verify email is sent (check spam folder too)

## Story 3.8: Booking History & List View

**As a** user,  
**I want** to see all my bookings (upcoming and past),  
**so that** I can track my rides.

**Acceptance Criteria:**

1. Create `/bookings` page (authenticated)
2. Fetch user's bookings from Supabase (RLS filters automatically)
3. Display bookings in categorized lists:
   - **À venir** (upcoming): status = 'confirmed', datetime >= now
   - **En attente** (pending): status = 'pending'
   - **Passées** (past): status = 'completed' or datetime < now
   - **Annulées** (cancelled): status = 'cancelled'
4. Each booking card shows:
   - Booking reference
   - Pickup → Drop-off (short format)
   - Date and time
   - Price
   - Status badge (color-coded)
   - Action button: "Voir détails"
5. Empty states for each category:
   - "Aucune réservation à venir"
   - Illustration + CTA to book
6. Filters/Sorting (optional for MVP):
   - Sort by date (ascending/descending)
   - Filter by status
7. Pagination or infinite scroll if many bookings
8. Loading skeleton while fetching data
9. Pull to refresh on mobile
10. Card click opens booking detail page
11. Responsive grid (1 col mobile, 2-3 cols desktop)
12. Test with various booking counts (0, 1, 10, 50)

## Story 3.9: Booking Detail View

**As a** user,  
**I want** to view full details of a specific booking,  
**so that** I have all the information I need.

**Acceptance Criteria:**

1. Create `/bookings/[id]` dynamic route (authenticated)
2. Fetch booking by ID from Supabase (RLS ensures user owns it)
3. Display comprehensive booking information:
   - Booking reference (large, copyable)
   - Status badge (prominent)
   - **Trajet:**
     - Pickup address (full)
     - Drop-off address (full)
     - Distance, duration
   - **Date et heure:**
     - Full formatted date/time
   - **Détails:**
     - Passengers
     - Options selected
     - Notes
   - **Prix:**
     - Price breakdown (base + surcharges)
     - Total
     - Payment status (paid/unpaid)
4. Show interactive map with route
5. Timeline/History section:
   - Booking created: [datetime]
   - Confirmed by Rachel: [datetime] (if applicable)
   - Paid: [datetime] (if applicable)
   - Completed: [datetime] (if applicable)
6. Action buttons (conditional based on status):
   - **If pending or confirmed:**
     - "Modifier" (if > 4h before ride)
     - "Annuler" (with cancellation policy info)
   - **If payment unpaid:**
     - "Payer maintenant"
   - **If completed:**
     - "Télécharger la facture" (PDF)
     - "Réserver à nouveau" (pre-fill form with same details)
7. Contact options:
   - "Contacter Rachel" button (opens email or phone)
8. 404 page if booking not found or unauthorized
9. Responsive design
10. Test detail page with bookings in various states
11. Verify RLS prevents viewing other users' bookings

## Story 3.10: Modify & Cancel Booking

**As a** user,  
**I want** to modify or cancel my booking if needed,  
**so that** I have flexibility with my plans.

**Acceptance Criteria:**

1. Add "Modifier" button on booking detail page
2. Modification rules:
   - Only allowed if booking status = 'pending' or 'confirmed'
   - Only allowed if > 4h before scheduled time
   - Cannot modify if already in progress or completed
3. On click "Modifier":
   - Open modification form (similar to booking form)
   - Pre-fill with current booking data
   - Allow changing: addresses, datetime, options
   - Recalculate price if changes affect pricing
4. Save modification:
   - Update booking in database
   - Log modification in history (old values → new values)
   - Send update email to user and Rachel
   - Show success message
5. Add "Annuler" button on booking detail page
6. Cancellation rules:
   - Free cancellation if > 12h before ride
   - 50% fee if 4-12h before ride
   - 100% fee if < 4h before ride (no refund)
7. On click "Annuler":
   - Show confirmation dialog with cancellation policy
   - Display applicable cancellation fee
   - Require confirmation: "Oui, annuler"
8. Process cancellation:
   - Update booking status to 'cancelled'
   - Calculate and process refund if applicable (Epic 4 - Stripe)
   - Log cancellation with reason (optional user input)
   - Send cancellation email to user and Rachel
   - Show cancellation confirmation
9. Once cancelled, booking cannot be modified or cancelled again
10. Test modification flow (change date, address, options)
11. Test cancellation with various timing scenarios
12. Verify refund amounts calculated correctly

---
