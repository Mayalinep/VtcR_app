# Epic 4: Payment Integration

**Epic Goal :** Intégrer Stripe pour accepter les paiements par carte bancaire, Apple Pay et Google Pay. Implémenter les webhooks pour confirmation de paiement, générer des factures PDF automatiques, et gérer les remboursements en cas d'annulation.

## Story 4.1: Stripe Account Setup & Configuration

**As a** developer,  
**I want** to configure Stripe integration,  
**so that** the app can accept payments securely.

**Acceptance Criteria:**

1. Create Stripe account (or use existing)
2. Enable Test Mode for development
3. Obtain API keys:
   - Publishable key (NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY)
   - Secret key (STRIPE_SECRET_KEY)
   - Webhook secret (STRIPE_WEBHOOK_SECRET)
4. Add API keys to environment variables (Vercel and local)
5. Install `stripe` npm package (Node SDK)
6. Install `@stripe/stripe-js` (client SDK)
7. Create Stripe client in `/lib/stripe/client.ts`
8. Create Stripe server instance in `/lib/stripe/server.ts`
9. Configure Stripe account settings:
   - Business name: "VTC Rachel"
   - Currency: EUR
   - Payment methods: Card, Apple Pay, Google Pay
10. Enable webhook endpoint in Stripe dashboard (will configure in Story 4.5)
11. Test API connection (create test payment intent)
12. Document Stripe setup in README

## Story 4.2: Stripe Checkout Integration

**As a** user who wants to pay now,  
**I want** to complete payment securely,  
**so that** my booking is confirmed immediately.

**Acceptance Criteria:**

1. Create API route `/api/stripe/create-checkout-session` (POST)
2. Input: booking_id
3. Fetch booking details from database
4. Create Stripe Checkout Session:
   - Amount: booking total price (in cents)
   - Currency: EUR
   - Line items: Booking description with details
   - Customer email: user email
   - Success URL: `/bookings/[id]?payment=success`
   - Cancel URL: `/bookings/[id]?payment=cancelled`
   - Metadata: { booking_id, user_id }
5. Return Checkout Session URL to client
6. On client, redirect to Stripe Checkout:
   - Use `redirectToCheckout()` with session ID
7. Stripe Checkout page:
   - User enters card details
   - Apple Pay / Google Pay buttons automatically shown
   - Secure, PCI-compliant (handled by Stripe)
8. After payment:
   - If success → Redirect to success URL
   - If cancel → Redirect to cancel URL
9. Show payment status on booking detail page:
   - Success: "Paiement effectué avec succès !"
   - Cancelled: "Paiement annulé. Vous pouvez réessayer."
10. Do NOT update booking status yet (wait for webhook - Story 4.5)
11. Test checkout flow in Stripe Test Mode:
    - Use test card 4242 4242 4242 4242
    - Test successful payment
    - Test declined payment (4000 0000 0000 0002)
    - Test expired card
12. Verify Apple Pay works on Safari iOS
13. Verify Google Pay works on Chrome Android

## Story 4.3: Payment Status & Confirmation

**As a** developer,  
**I want** to track payment status for each booking,  
**so that** I know which bookings are paid.

**Acceptance Criteria:**

1. Add `payment_status` column to `bookings` table:
   - Values: 'unpaid', 'pending', 'paid', 'refunded', 'failed'
   - Default: 'unpaid'
2. Add `stripe_payment_intent_id` column (store Stripe reference)
3. Add `paid_at` timestamp column
4. Update booking detail page to show payment status:
   - Badge with color coding
   - "Payé" (green), "En attente" (yellow), "Non payé" (red)
5. If unpaid and booking confirmed:
   - Show "Payer maintenant" button prominently
   - Show deadline: "Paiement requis avant [date 24h avant course]"
6. If paid:
   - Show payment confirmation
   - Show "Télécharger la facture" button
7. Send payment confirmation email:
   - Trigger when payment_status changes to 'paid'
   - Include receipt, booking details
   - Attach PDF invoice
8. Add payment info to admin dashboard:
   - Show payment status for each booking
   - Filter by unpaid/paid
9. Test payment status updates:
   - Verify status changes after webhook
   - Verify UI reflects status correctly
10. Test with various timing (payment before/after booking)

## Story 4.4: Invoice Generation (PDF)

**As a** user who paid for a booking,  
**I want** to receive a PDF invoice,  
**so that** I have proof of payment and can expense it.

**Acceptance Criteria:**

1. Install PDF generation library (`@react-pdf/renderer` or `pdfkit`)
2. Create invoice template (`/lib/invoice/template.tsx`):
   - Header: "VTC Rachel" logo + business info
   - "FACTURE" title
   - Invoice number: Generated from booking_id + date
   - Date d'émission
   - Client info: Name, email
   - Booking details:
     - Trajet: Pickup → Drop-off
     - Date et heure
     - Distance, durée
   - Price breakdown table:
     - Base price
     - Surcharges (itemized)
     - Total HT
     - TVA (si applicable)
     - Total TTC (bold)
   - Payment method: "Carte bancaire via Stripe"
   - Legal footer: SIRET, TVA, mentions obligatoires
3. Create function `generateInvoice(booking_id)`:
   - Fetch booking + user data
   - Render PDF from template
   - Return PDF buffer
4. Store invoices in Supabase Storage:
   - Bucket: `invoices`
   - Path: `invoices/{booking_id}.pdf`
   - Private (require auth to download)
5. Trigger invoice generation:
   - After payment confirmed (webhook Story 4.5)
   - Store invoice URL in `bookings` table
6. Create API route `/api/invoices/[booking_id]` (GET):
   - Verify user owns booking (RLS)
   - Retrieve PDF from storage
   - Return PDF file with proper headers
7. Add "Télécharger la facture" button on booking detail page:
   - Only visible if payment_status = 'paid'
   - Downloads PDF on click
8. Include invoice in payment confirmation email (attachment)
9. Test invoice generation:
   - Verify all data displays correctly
   - Test with various booking scenarios
10. Verify PDF is readable on mobile and desktop
11. Test download works across browsers

## Story 4.5: Stripe Webhooks & Payment Confirmation

**As a** developer,  
**I want** to handle Stripe webhooks reliably,  
**so that** booking and payment statuses are always in sync.

**Acceptance Criteria:**

1. Create webhook endpoint `/api/stripe/webhook` (POST)
2. Verify webhook signature (Stripe-Signature header):
   - Use `stripe.webhooks.constructEvent()`
   - Reject if signature invalid
3. Handle webhook events:
   - `checkout.session.completed`: Payment succeeded
   - `payment_intent.succeeded`: Payment confirmed
   - `payment_intent.payment_failed`: Payment failed
   - `charge.refunded`: Refund processed
4. On `checkout.session.completed`:
   - Extract booking_id from metadata
   - Update booking:
     - payment_status = 'paid'
     - status = 'confirmed' (if was pending)
     - stripe_payment_intent_id = event data
     - paid_at = now
   - Generate invoice (call generateInvoice())
   - Send payment confirmation email
   - Notify Rachel (new confirmed booking)
5. On `payment_intent.payment_failed`:
   - Update payment_status = 'failed'
   - Notify user (email: payment failed, try again)
6. On `charge.refunded`:
   - Update payment_status = 'refunded'
   - Notify user (email: refund processed)
7. Implement idempotency:
   - Store processed webhook IDs in database
   - Ignore duplicate webhooks
8. Logging:
   - Log all webhook events
   - Log processing results
9. Error handling:
   - If processing fails, return 500 (Stripe will retry)
   - If signature invalid, return 400
10. Configure webhook in Stripe dashboard:
    - URL: https://yourdomain.com/api/stripe/webhook
    - Events: Select relevant events
11. Test webhooks with Stripe CLI:
    - `stripe listen --forward-to localhost:3000/api/stripe/webhook`
    - Trigger test events
12. Test idempotency (send same webhook twice)
13. Verify database updates correctly after webhook

## Story 4.6: Refund Processing

**As a** user who cancelled a booking,  
**I want** to receive a refund if eligible,  
**so that** I'm not charged for a ride I didn't take.

**Acceptance Criteria:**

1. Create function `processRefund(booking_id, amount)`:
   - Fetch booking and payment_intent_id
   - Calculate refund amount based on cancellation policy:
     - >12h before: 100% refund
     - 4-12h before: 50% refund
     - <4h before: 0% refund
   - Call Stripe Refund API: `stripe.refunds.create()`
   - Return refund status
2. Update cancellation flow (Story 3.10):
   - After user confirms cancellation
   - If booking is paid, process refund automatically
   - Show refund amount in confirmation
3. Update booking on refund:
   - payment_status = 'refunded' (or 'partially_refunded')
   - refund_amount (store amount)
   - refunded_at timestamp
4. Send refund confirmation email:
   - "Votre remboursement a été traité"
   - Amount refunded
   - Processing time: 5-10 business days
5. Handle webhook `charge.refunded`:
   - Confirm refund processed
   - Update status if not already done
6. Admin view refunds:
   - Show refund amount in booking details
   - Filter/report on refunds
7. Edge cases:
   - Partial refunds
   - Refund failures (insufficient funds) → Log error, notify admin
8. Test refund flow:
   - Full refund (>12h cancellation)
   - Partial refund (4-12h cancellation)
   - No refund (<4h cancellation)
9. Verify refund appears in Stripe dashboard
10. Verify user receives email notification

## Story 4.7: Payment Method Management

**As a** user,  
**I want** to save my payment methods,  
**so that** future bookings are faster.

**Acceptance Criteria:**

1. Enable Stripe Customer feature:
   - Create Stripe Customer for each user on first payment
   - Store `stripe_customer_id` in `users` table
2. On Checkout Session creation:
   - Include `customer: stripe_customer_id`
   - Enable `save_payment_method: true`
3. After payment, payment method is saved to Stripe Customer
4. Create `/profile/payment-methods` page
5. Fetch saved payment methods via Stripe API:
   - `stripe.paymentMethods.list({ customer: stripe_customer_id })`
6. Display payment methods:
   - Card brand (Visa, Mastercard, Amex)
   - Last 4 digits
   - Expiry date
   - Default badge (if applicable)
7. Actions:
   - Set as default
   - Remove payment method
8. Add new payment method:
   - Use Stripe Payment Element
   - Save without charging
9. During booking, show saved payment methods:
   - User can select existing card
   - Or add new card
10. Use default payment method for one-click checkout (optional)
11. Test payment method management:
    - Add card
    - Set default
    - Remove card
12. Verify saved methods work for subsequent bookings

---
