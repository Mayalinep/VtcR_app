# Epic 6: Notifications & Communications

**Epic Goal :** Implémenter le système d'emails transactionnels avec Resend et React Email, incluant confirmations de réservation, rappels, notifications pour Rachel, et emails de suivi.

## Story 6.1: Resend Integration & Email Setup

**As a** developer,  
**I want** to integrate Resend for sending emails,  
**so that** users and admin receive notifications.

**Acceptance Criteria:**

1. Create Resend account (resend.com)
2. Obtain API key (RESEND_API_KEY)
3. Add API key to environment variables
4. Install `resend` npm package
5. Install `@react-email/components` for email templates
6. Create Resend client in `/lib/email/client.ts`
7. Configure sender email:
   - Domain: yourdomain.com
   - From address: noreply@yourdomain.com or contact@yourdomain.com
   - Add domain to Resend, verify DNS records (SPF, DKIM)
8. Create email helper function `sendEmail({ to, subject, react })`:
   - Uses Resend API to send email
   - Accepts React component as email template
   - Returns success/error
9. Test email sending with simple test template
10. Verify emails arrive (check spam folder)
11. Test deliverability with mail-tester.com (score >8/10)

## Story 6.2: Email Templates with React Email

**As a** developer,  
**I want** to create beautiful email templates,  
**so that** all communications look professional.

**Acceptance Criteria:**

1. Create `/emails` folder for email templates
2. Create base email layout (`BaseEmail.tsx`):
   - Header with logo
   - Main content area
   - Footer with links, contact info, unsubscribe
   - Responsive design (mobile-friendly)
3. Style email templates with React Email components:
   - Use inline styles (email-safe)
   - Brand colors (forest green, gold, neutrals)
   - Typography (web-safe fonts)
4. Create email templates for:
   - Booking confirmation
   - Booking modification
   - Booking cancellation
   - Payment confirmation
   - Payment reminder
   - Pre-ride reminder
   - Post-ride thank you
   - Admin new booking notification
   - Password reset
5. Each template accepts props (data from database)
6. Use React Email preview feature for development:
   - `npm run email:dev` → Preview emails in browser
7. Test templates with various data
8. Verify rendering in different email clients:
   - Gmail, Outlook, Apple Mail, mobile
9. Ensure all links work (absolute URLs)
10. Test unsubscribe link (if applicable)

## Story 6.3: Booking Confirmation Email

**As a** user who just booked,  
**I want** to receive a confirmation email immediately,  
**so that** I have proof and details of my booking.

**Acceptance Criteria:**

1. Create `BookingConfirmationEmail.tsx` template
2. Email content:
   - Subject: "Réservation confirmée - [Booking Ref]"
   - Greeting: "Bonjour [Name],"
   - Message: "Votre réservation a été enregistrée avec succès."
   - Booking details card:
     - Booking reference
     - Pickup → Drop-off
     - Date & time
     - Passengers, options
     - Price
     - Payment status
   - Next steps:
     - "Rachel confirmera votre réservation prochainement."
     - If unpaid: "N'oubliez pas de payer avant [deadline]."
   - Action button: "Voir ma réservation" (links to booking detail page)
   - Contact info: Email, phone
   - Footer with legal links
3. Trigger email after booking creation:
   - In API route `/api/bookings` (POST), after DB insert
   - Call `sendEmail()` with BookingConfirmationEmail
4. Handle email sending errors gracefully:
   - Log error but don't fail booking creation
   - User still has booking, can see details in app
5. Test email sending with various booking types
6. Verify email arrives within 30 seconds
7. Test email display on mobile and desktop
8. Verify all links work correctly

## Story 6.4: Pre-Ride Reminder Emails

**As a** user with an upcoming booking,  
**I want** to receive reminders,  
**so that** I don't forget my ride.

**Acceptance Criteria:**

1. Create `ReminderEmail.tsx` template
2. Email content:
   - Subject: "Rappel : Votre course VTC demain/dans 2h"
   - Greeting: "Bonjour [Name],"
   - Message: "Rappel : Vous avez une course VTC prévue [when]."
   - Booking details (summary)
   - Action button: "Voir les détails"
   - Options to modify or cancel (with links)
   - Contact info if questions
3. Implement scheduled email system:
   - Option A: Cron job (Next.js API route + Vercel Cron)
   - Option B: Supabase pg_cron (database-level scheduling)
   - Option C: External service (e.g., Inngest, Trigger.dev)
4. Schedule reminders:
   - 24h before ride
   - 2h before ride
5. Create API route `/api/cron/send-reminders` (GET):
   - Fetch bookings scheduled in next 24h (not yet reminded)
   - Send 24h reminder emails
   - Mark as `reminder_24h_sent = true`
6. Create API route `/api/cron/send-urgent-reminders` (GET):
   - Fetch bookings in next 2h (not yet urgent reminded)
   - Send 2h reminder emails
   - Mark as `reminder_2h_sent = true`
7. Configure Vercel Cron (vercel.json):
   - Schedule `/api/cron/send-reminders` daily at 9 AM
   - Schedule `/api/cron/send-urgent-reminders` every hour
8. Add reminder tracking to bookings table:
   - `reminder_24h_sent` (boolean)
   - `reminder_2h_sent` (boolean)
9. Test reminders:
   - Create booking tomorrow → Should receive 24h reminder
   - Create booking in 1h → Should receive 2h reminder
10. Verify cron jobs run correctly (check Vercel logs)
11. Test reminder opt-out (if user disabled email notifications)

## Story 6.5: Admin Notifications (New Booking, Cancellation)

**As a** Rachel (admin),  
**I want** to be notified immediately of new bookings and cancellations,  
**so that** I can respond quickly.

**Acceptance Criteria:**

1. Create `AdminNewBookingEmail.tsx` template
2. Email content:
   - Subject: "Nouvelle réservation - [Booking Ref]"
   - Message: "Vous avez une nouvelle réservation !"
   - Booking details (full)
   - Client info (name, email, phone)
   - Payment status
   - Action button: "Confirmer la réservation" (links to admin booking detail)
3. Trigger after booking creation:
   - In `/api/bookings` POST route
   - Send to Rachel's admin email
4. Create `AdminCancellationEmail.tsx` template
5. Email content:
   - Subject: "Réservation annulée - [Booking Ref]"
   - Message: "Une réservation a été annulée."
   - Booking details
   - Client info
   - Cancellation reason (if provided)
   - Refund amount (if applicable)
6. Trigger after cancellation:
   - In cancellation API route
   - Send to Rachel's admin email
7. Configure admin email preferences:
   - Rachel can enable/disable notifications in `/admin/settings`
   - Check preferences before sending
8. Test admin notifications:
   - Create booking → Rachel receives email
   - Cancel booking → Rachel receives cancellation email
9. Verify admin can disable notifications if desired
10. Consider SMS notifications (optional, future with Twilio)

## Story 6.6: Payment Confirmation & Receipt Email

**As a** user who just paid,  
**I want** to receive a payment receipt,  
**so that** I have proof of payment and my invoice.

**Acceptance Criteria:**

1. Create `PaymentConfirmationEmail.tsx` template
2. Email content:
   - Subject: "Paiement confirmé - [Booking Ref]"
   - Greeting: "Bonjour [Name],"
   - Message: "Votre paiement de [Amount]€ a été accepté."
   - Payment details:
     - Amount paid
     - Payment method (last 4 digits of card)
     - Payment date
   - Booking details (summary)
   - Action button: "Télécharger la facture"
   - Thank you message
3. Attach PDF invoice:
   - Use Resend attachments feature
   - Include generated invoice PDF (Story 4.4)
4. Trigger email after webhook confirms payment:
   - In `/api/stripe/webhook`, on `checkout.session.completed`
   - After updating booking status
   - Call `sendEmail()` with attachment
5. Test payment confirmation email:
   - Complete test payment
   - Verify email arrives with PDF attachment
6. Test PDF attachment opens correctly from email
7. Verify email displays correctly with attachment

## Story 6.7: Post-Ride Thank You & Feedback Request

**As a** business owner (Rachel),  
**I want** to thank clients after their ride and request feedback,  
**so that** I improve service and encourage repeat bookings.

**Acceptance Criteria:**

1. Create `PostRideThankYouEmail.tsx` template
2. Email content:
   - Subject: "Merci pour votre confiance !"
   - Greeting: "Bonjour [Name],"
   - Thank you message: "Merci d'avoir choisi VTC Rachel pour votre trajet."
   - Recap: Brief booking details
   - Feedback request:
     - "Comment s'est passé votre trajet ?"
     - Link to feedback form or rating (optional, future story)
   - Promotional content (optional):
     - "Recommandez-nous à vos amis !" (referral, future)
     - Special offer for next booking
   - Action button: "Réserver à nouveau"
3. Trigger email after ride completion:
   - Option A: Manual (Rachel marks booking complete)
   - Option B: Automatic (24h after scheduled ride time)
4. Create cron job `/api/cron/send-post-ride-emails`:
   - Fetch bookings completed 24h ago (not yet thanked)
   - Send thank you emails
   - Mark as `thank_you_sent = true`
5. Schedule cron job (run daily)
6. Test thank you email:
   - Mark booking complete → Should receive email 24h later
7. Track feedback responses (future: feedback system)
8. A/B test subject lines and content (future optimization)

---
