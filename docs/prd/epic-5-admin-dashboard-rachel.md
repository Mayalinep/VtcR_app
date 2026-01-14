# Epic 5: Admin Dashboard Rachel

**Epic Goal :** Créer l'interface administrateur permettant à Rachel de gérer les réservations, voir les statistiques, bloquer ses disponibilités, et communiquer avec les clients.

## Story 5.1: Admin Authentication & Access Control

**As a** Rachel (admin),  
**I want** to securely access my admin dashboard,  
**so that** I can manage bookings.

**Acceptance Criteria:**

1. Add `role` column to `users` table:
   - Values: 'client', 'admin'
   - Default: 'client'
2. Set Rachel's user role to 'admin' (manual DB update or seed script)
3. Create middleware check for admin routes:
   - Verify user is authenticated
   - Verify user.role = 'admin'
   - If not admin → redirect to home with error message
4. Create admin route group `/admin/*`
5. Create admin layout (`/app/(admin)/layout.tsx`):
   - Different from client app layout
   - Admin sidebar navigation
6. Admin sidebar items:
   - Dashboard (overview)
   - Réservations (booking management)
   - Clients (customer list)
   - Disponibilités (calendar/availability)
   - Paramètres (settings)
7. Add admin link in header (only visible to admin users):
   - "Admin" button → links to /admin/dashboard
8. Test access control:
   - Admin can access /admin/*
   - Regular user redirected if they try /admin/*
9. Create admin login flow (if Rachel uses separate account)
10. Document admin account setup in README

## Story 5.2: Admin Dashboard Overview

**As a** Rachel (admin),  
**I want** to see key metrics at a glance,  
**so that** I know how my business is performing.

**Acceptance Criteria:**

1. Create `/admin/dashboard` page
2. Display key metrics (cards):
   - **Réservations aujourd'hui:** Count + list
   - **Réservations cette semaine:** Count
   - **Réservations ce mois:** Count
   - **Chiffre d'affaires du mois:** Total € (paid bookings)
   - **Clients récurrents:** Count (users with >1 booking)
   - **Taux d'annulation:** % (cancelled / total)
3. Fetch data from Supabase:
   - Query bookings with filters (date ranges, status)
   - Aggregate functions (count, sum)
4. Display upcoming bookings (next 7 days):
   - List view with essential info
   - Click to view details
5. Display recent activity feed:
   - New bookings
   - Payments received
   - Cancellations
   - (Last 10 activities)
6. Charts (optional for MVP, use simple library like Recharts):
   - Bookings per week (line chart)
   - Revenue per month (bar chart)
7. Quick actions:
   - "Nouvelle réservation" (manual booking for phone requests)
   - "Bloquer un créneau"
8. Refresh data button or auto-refresh every 5 min
9. Responsive design (admin might use desktop mostly, but mobile should work)
10. Loading states for data fetching
11. Empty states if no data yet
12. Test dashboard with various data scenarios

## Story 5.3: Admin Booking Management

**As a** Rachel (admin),  
**I want** to view and manage all bookings,  
**so that** I can confirm, modify or cancel them as needed.

**Acceptance Criteria:**

1. Create `/admin/bookings` page
2. Display all bookings in table or cards:
   - Booking reference
   - Client name
   - Pickup → Drop-off (truncated)
   - Date & time
   - Status (badge)
   - Payment status (badge)
   - Actions (buttons)
3. Filters:
   - Status: All / Pending / Confirmed / Completed / Cancelled
   - Date range picker
   - Payment status: All / Paid / Unpaid
   - Search by client name or booking reference
4. Sorting:
   - By date (ascending/descending)
   - By status
   - By price
5. Pagination (20 bookings per page)
6. Actions per booking:
   - View details (opens detail page)
   - Confirm (if pending)
   - Cancel (with reason input)
   - Contact client (opens email)
7. Bulk actions (optional):
   - Select multiple bookings
   - Confirm all selected
   - Export selected to CSV
8. Booking detail page (`/admin/bookings/[id]`):
   - All booking info (same as client view)
   - Client info (name, email, phone)
   - Payment info (amount, status, Stripe link)
   - Admin notes (internal, not visible to client)
   - Action buttons: Confirm, Cancel, Edit
9. Confirm booking:
   - Update status to 'confirmed'
   - Send confirmation email to client
   - Show success message
10. Cancel booking (admin-initiated):
    - Input cancellation reason
    - Process refund if paid
    - Notify client via email
11. Edit booking (admin can override restrictions)
12. Test booking management flows
13. Verify email notifications sent correctly

## Story 5.4: Calendar View & Availability Management

**As a** Rachel (admin),  
**I want** to see my bookings in a calendar and block unavailable times,  
**so that** I manage my schedule effectively.

**Acceptance Criteria:**

1. Install calendar library (`react-big-calendar` or `@fullcalendar/react`)
2. Create `/admin/calendar` page
3. Display calendar with month/week/day views:
   - Month view: Default, shows all bookings as events
   - Week view: Detailed hourly schedule
   - Day view: Detailed view of single day
4. Calendar events:
   - Each booking is an event
   - Color-coded by status:
     - Confirmed: Green
     - Pending: Yellow
     - Completed: Grey
     - Cancelled: Red
   - Event shows: Time, pickup location, client name (truncated)
5. Click event → Open booking detail modal or page
6. Add "Bloquer un créneau" button:
   - Opens form: Start date/time, End date/time, Reason (optional)
   - Creates blocked slot in `blocked_slots` table
   - Blocked slots appear on calendar (different style, e.g., striped)
7. Drag and drop to reschedule booking (optional, advanced):
   - Drag event to new time slot
   - Confirm change → Update booking
   - Notify client of change
8. Manage blocked slots:
   - List view of all blocked slots
   - Edit or delete blocked slots
9. Sync with external calendar (optional, future):
   - Export to .ics file
   - Integrate with Google Calendar (via API)
10. Responsive design (calendar lib should handle this)
11. Test calendar with various booking densities
12. Test blocking slots and verify clients cannot book those times

## Story 5.5: Client Management & Communication

**As a** Rachel (admin),  
**I want** to view client information and contact them,  
**so that** I can provide personalized service.

**Acceptance Criteria:**

1. Create `/admin/clients` page
2. Display list of all clients (users with bookings):
   - Avatar
   - Name
   - Email
   - Phone
   - Total bookings count
   - Total spent (€)
   - Last booking date
   - Actions: View, Contact
3. Search clients by name or email
4. Filter by:
   - Clients with upcoming bookings
   - Clients with >X bookings (loyal customers)
   - Clients who haven't booked in 30+ days (re-engagement)
5. Client detail page (`/admin/clients/[id]`):
   - Full client profile info
   - Booking history (list all bookings)
   - Total statistics (count, total spent, average rating if ratings exist)
   - Saved addresses
   - Notes (admin can add internal notes about client)
6. Contact client:
   - "Email" button → Opens mailto link or email composer
   - "Phone" button → tel: link (opens phone app on mobile)
   - "SMS" button → sms: link (optional)
7. Add internal note:
   - Textarea input
   - Save note associated with client
   - Notes visible only to admin
8. Export client list to CSV (for marketing, analysis)
9. RGPD compliance:
   - Admin can export all client data (per RGPD request)
   - Admin can delete client account (anonymize bookings)
10. Test client management features
11. Verify contact methods work on mobile and desktop

## Story 5.6: Admin Settings & Configuration

**As a** Rachel (admin),  
**I want** to configure app settings,  
**so that** the system behaves according to my business rules.

**Acceptance Criteria:**

1. Create `/admin/settings` page
2. Settings sections:
   - **Profile:** Rachel's info (name, email, phone, photo)
   - **Pricing:** Configure pricing rules
   - **Service Areas:** Define covered zones
   - **Notifications:** Email preferences for admin
   - **Business Info:** SIRET, TVA, legal info (for invoices)
   - **Email Templates:** Customize email content (optional)
3. Pricing configuration:
   - Base rate per km (€)
   - Minimum fare (€)
   - Time rate per minute (€)
   - Airport surcharge (€)
   - Night surcharge (%)
   - Weekend surcharge (%)
   - Option surcharges (seat, luggage, wait time)
   - Save → Updates pricing config file or database
4. Service areas:
   - List of cities/zones covered
   - Add/remove zones
   - Define geographic boundaries (future: map editor)
5. Notification preferences:
   - Email for new booking: On/Off
   - Email for cancellation: On/Off
   - Daily summary email: On/Off (time picker)
6. Business info form:
   - Business name
   - SIRET number
   - TVA intracommunautaire (if applicable)
   - Address
   - Phone, email
   - (Used in invoices and legal pages)
7. Save settings:
   - Store in database (settings table or JSON column in users)
   - Show success toast
8. Email template customization (advanced, optional):
   - Edit email subjects and bodies
   - Preview email
   - Merge fields: {{client_name}}, {{booking_ref}}, etc.
9. Test settings updates
10. Verify pricing changes reflect in new bookings
11. Verify business info appears correctly on invoices

---
