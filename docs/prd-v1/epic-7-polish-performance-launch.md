# Epic 7: Polish, Performance & Launch

**Epic Goal :** Optimiser les performances, finaliser la PWA, corriger les bugs, tester en profondeur, et déployer en production pour le lancement officiel.

## Story 7.1: Performance Optimization

**As a** user,  
**I want** the app to load and respond quickly,  
**so that** I have a smooth experience.

**Acceptance Criteria:**

1. Run Lighthouse audit on all major pages:
   - Landing page
   - Login/Signup
   - Dashboard
   - Booking form
   - Booking detail
   - Admin dashboard
2. Target Lighthouse scores (all pages):
   - Performance: >90
   - Accessibility: >90
   - Best Practices: >90
   - SEO: >90
3. Image optimization:
   - Audit all images (use next/image everywhere)
   - Convert to WebP
   - Provide proper width/height (prevent CLS)
   - Lazy load below-the-fold images
4. Code splitting:
   - Dynamic imports for heavy components (maps, charts, PDF generator)
   - Lazy load admin routes (separate bundle)
5. Font optimization:
   - Use next/font for Inter and Playfair Display
   - Preload critical fonts
   - Font subsetting if needed
6. JavaScript bundle optimization:
   - Analyze bundle with `@next/bundle-analyzer`
   - Tree-shake unused dependencies
   - Remove console.logs in production
7. API route optimization:
   - Add caching headers where appropriate
   - Optimize database queries (indexes, limit results)
   - Use Supabase RLS efficiently
8. Third-party script optimization:
   - Load Google Maps only when needed (booking page)
   - Load Stripe only on payment pages
9. Implement skeleton loaders everywhere (perceived performance)
10. Test on slow 3G connection (Lighthouse throttling)
11. Verify Core Web Vitals:
    - LCP < 2.5s
    - FID < 100ms
    - CLS < 0.1
12. Fix any performance issues identified

## Story 7.2: PWA Finalization & Offline Support

**As a** mobile user,  
**I want** the app to work offline and feel like a native app,  
**so that** I have a reliable experience.

**Acceptance Criteria:**

1. Verify PWA manifest is complete:
   - All required fields (name, short_name, icons, theme_color, etc.)
   - Icons in all sizes (192x192, 512x512, maskable)
   - Display: standalone
   - Start URL: /
2. Test PWA installation:
   - iOS Safari: Add to Home Screen
   - Chrome Android: Install prompt appears
   - Desktop Chrome: Install banner
3. Configure Service Worker caching strategy:
   - Cache static assets (JS, CSS, images)
   - Cache landing page for offline viewing
   - Network-first for API calls (with fallback)
   - Cache Google Fonts
4. Implement offline indicator:
   - Show banner when user goes offline
   - Hide when back online
5. Offline functionality:
   - User can view cached pages (landing, about)
   - User can view cached booking history (last fetched)
   - Booking creation queued if offline (sync when online - optional)
6. Test PWA features:
   - Install app on mobile
   - Use in airplane mode
   - Verify cached pages load
7. Add PWA meta tags:
   - `apple-mobile-web-app-capable`
   - `apple-mobile-web-app-status-bar-style`
   - Splash screens for iOS (various sizes)
8. Test standalone mode (no browser UI)
9. Verify app icon appears correctly on home screen
10. Test PWA update mechanism (Service Worker update prompt)

## Story 7.3: Bug Fixes & Edge Cases

**As a** developer,  
**I want** to identify and fix all known bugs,  
**so that** the app is stable for launch.

**Acceptance Criteria:**

1. Create bug tracking list (GitHub Issues or similar)
2. Test all user flows end-to-end:
   - Signup → Booking → Payment → View history
   - Login → Modify booking → Cancel
   - Admin: View booking → Confirm → Check calendar
3. Test error scenarios:
   - Network failures
   - API errors (Google Maps, Stripe)
   - Invalid form submissions
   - Payment failures
   - Database errors
4. Test edge cases:
   - Very long addresses (truncation, overflow)
   - Booking at midnight (date boundary)
   - Booking exactly 2h ahead (minimum time limit)
   - Multiple rapid bookings (race conditions)
   - Special characters in names/notes
   - Extremely long distance (validation)
5. Cross-browser testing:
   - Chrome, Firefox, Safari, Edge
   - iOS Safari, Chrome Android
6. Cross-device testing:
   - iPhone (various models)
   - Android phones (various sizes)
   - iPad/tablets
   - Desktop (various screen sizes)
7. Test with screen readers (VoiceOver, TalkBack)
8. Test keyboard-only navigation
9. Fix all identified bugs (prioritize by severity)
10. Verify fixes don't introduce new bugs (regression testing)
11. Document known limitations (if any remain)

## Story 7.4: Security Audit & Hardening

**As a** developer,  
**I want** to ensure the app is secure,  
**so that** user data and payments are protected.

**Acceptance Criteria:**

1. Run security checklist (OWASP Top 10):
   - ✅ SQL Injection: Supabase RLS + parameterized queries
   - ✅ XSS: React escapes by default, sanitize user input
   - ✅ CSRF: SameSite cookies, CSRF tokens if needed
   - ✅ Authentication: Secure JWT storage, httpOnly cookies
   - ✅ Sensitive data exposure: HTTPS only, no secrets in client code
   - ✅ Broken access control: RLS, middleware checks
   - ✅ Security misconfiguration: Review env vars, headers
   - ✅ Insecure deserialization: Validate all inputs
   - ✅ Using components with known vulnerabilities: `npm audit`
   - ✅ Insufficient logging & monitoring: Implement logging
2. Run `npm audit` and fix vulnerabilities
3. Review environment variables:
   - Ensure secrets not exposed in client
   - Use NEXT_PUBLIC_ prefix only for safe vars
4. Configure security headers (next.config.js):
   - Content-Security-Policy
   - X-Frame-Options: DENY
   - X-Content-Type-Options: nosniff
   - Referrer-Policy: strict-origin-when-cross-origin
5. Rate limiting:
   - Implement on sensitive endpoints (login, signup, booking)
   - Use Vercel Edge Config or middleware
6. Validate all API inputs with Zod
7. Sanitize user-generated content (notes, addresses)
8. Review Supabase RLS policies:
   - Test with different users
   - Ensure no data leakage
9. Review Stripe integration:
   - Verify webhooks use signature validation
   - Never trust client-side data for payments
10. Test authentication flows:
    - Try accessing protected routes without auth
    - Try SQL injection in forms
    - Try XSS payloads in inputs
11. Penetration testing (if budget allows, optional)
12. Document security measures in README

## Story 7.5: Analytics & Monitoring Setup

**As a** developer and business owner,  
**I want** to track usage and errors,  
**so that** I can improve the app and fix issues quickly.

**Acceptance Criteria:**

1. Enable Vercel Analytics (included free):
   - Track page views
   - Track Core Web Vitals
2. Install Google Analytics 4 (optional):
   - Create GA4 property
   - Add GA4 script with `next/script`
   - Track page views, events
3. Define key events to track:
   - Signup completed
   - Booking created
   - Payment completed
   - Booking cancelled
   - Admin action (confirm booking)
4. Implement event tracking:
   - Use `gtag()` or custom analytics function
   - Track conversions (booking → payment)
5. Setup error monitoring:
   - Option A: Sentry (error tracking SaaS)
   - Option B: Custom error logging to Supabase
6. Configure Sentry (if using):
   - Create Sentry project
   - Install `@sentry/nextjs`
   - Configure DSN in env vars
   - Test error reporting
7. Setup uptime monitoring:
   - Option A: Vercel built-in (deploy notifications)
   - Option B: UptimeRobot (free, ping every 5 min)
   - Option C: Pingdom, Better Uptime
8. Configure alerts:
   - Email if app goes down
   - Email on critical errors (payment failures)
9. Create admin stats dashboard (optional):
   - Show analytics data in admin panel
   - Track KPIs (bookings/week, conversion rate, etc.)
10. Test analytics tracking (use GA Debugger extension)
11. Verify errors are captured in Sentry (throw test error)
12. Document analytics setup in README

## Story 7.6: Content & Copywriting

**As a** user,  
**I want** to read clear, helpful content,  
**so that** I understand the service and feel confident booking.

**Acceptance Criteria:**

1. Review and polish all copy:
   - Landing page (hero, features, CTAs)
   - About page (Rachel's story, mission)
   - FAQ page (common questions, helpful answers)
   - Legal pages (CGV, privacy policy, cookies)
2. Write FAQ content:
   - How do I book?
   - How do I pay?
   - Can I modify my booking?
   - What's the cancellation policy?
   - What areas do you cover?
   - Do you provide child seats?
   - How do I contact Rachel?
   - (10-15 questions total)
3. Write legal pages (or hire legal writer):
   - **CGV (Terms of Service):**
     - Service description
     - Booking conditions
     - Cancellation policy
     - Liability limitations
     - Dispute resolution
   - **Privacy Policy:**
     - RGPD compliant
     - What data is collected
     - How data is used
     - User rights (access, deletion, export)
     - Cookie usage
   - **Politique Cookies:**
     - What cookies are used
     - Essential vs optional cookies
     - Cookie consent management
4. Add cookie consent banner (if using tracking cookies):
   - Use library like `react-cookie-consent`
   - User must accept before GA/analytics load
5. Proofread all text (grammar, spelling, tone)
6. Ensure consistent tone of voice (professional, warm, friendly)
7. Add microcopy:
   - Form placeholders
   - Button labels
   - Error messages
   - Empty states
8. Test readability (use Hemingway Editor or similar)
9. Translate key pages if planning multi-language (future)
10. Get feedback from Rachel on all content

## Story 7.7: User Acceptance Testing (UAT) with Rachel

**As a** Rachel (product owner),  
**I want** to test the app thoroughly,  
**so that** I can confirm it meets my needs before launch.

**Acceptance Criteria:**

1. Prepare UAT plan:
   - List of test scenarios for Rachel to execute
   - Test data (create test bookings, users)
2. UAT scenarios:
   - **Client flow:** Signup, book, pay, view history, cancel
   - **Admin flow:** View dashboard, confirm booking, block slot, manage clients
   - **Notifications:** Verify emails received and accurate
   - **Edge cases:** Try invalid inputs, test error handling
3. Schedule UAT session with Rachel:
   - Guide her through scenarios
   - Observe her usage, note pain points
   - Record feedback (Google Doc or Notion)
4. Rachel tests on her own devices:
   - Her iPhone (primary device)
   - Her laptop (if she uses admin panel on desktop)
5. Collect feedback:
   - What works well
   - What's confusing
   - What's missing
   - UI/UX improvements
   - Content changes needed
6. Prioritize feedback:
   - Critical (must fix before launch)
   - Important (nice to have)
   - Future (post-MVP)
7. Implement critical fixes
8. Retest with Rachel after fixes
9. Get final approval from Rachel
10. Document feedback and changes made

## Story 7.8: Beta Testing with Real Clients

**As a** developer,  
**I want** to test with real clients before public launch,  
**so that** I validate the app works in real conditions.

**Acceptance Criteria:**

1. Select 5-10 beta testers:
   - Rachel's existing clients (willing to test)
   - Friends/family
   - Diverse user profiles (tech-savvy and not)
2. Create beta testing group:
   - Communication channel (WhatsApp group, email list)
   - Instructions document
3. Provide beta test instructions:
   - How to install PWA
   - Test scenarios to try
   - How to report bugs/feedback
4. Beta test period: 1-2 weeks
5. Monitor usage:
   - Track bookings created by beta testers
   - Check for errors in logs
   - Monitor performance metrics
6. Collect feedback:
   - Survey (Google Forms): Rate features, report issues
   - Direct messages: Detailed feedback
7. Analyze feedback:
   - Common pain points
   - Feature requests
   - Bugs reported
8. Fix critical bugs discovered
9. Implement quick wins (easy improvements)
10. Thank beta testers (discount, free ride, acknowledgment)
11. Document beta test learnings

## Story 7.9: Final Pre-Launch Checklist

**As a** developer preparing for launch,  
**I want** to complete all pre-launch tasks,  
**so that** nothing is forgotten.

**Acceptance Criteria:**

1. Technical checklist:
   - ✅ All features complete and tested
   - ✅ All bugs fixed (critical and high priority)
   - ✅ Performance targets met (Lighthouse >90)
   - ✅ PWA fully functional
   - ✅ SEO optimized (meta tags, sitemap, robots.txt)
   - ✅ Analytics configured and tracking
   - ✅ Error monitoring active
   - ✅ Backups configured
   - ✅ Security hardened
2. Content checklist:
   - ✅ All copy written and proofread
   - ✅ FAQ complete
   - ✅ Legal pages (CGV, privacy, cookies)
   - ✅ About page with Rachel's info
   - ✅ Contact page with accurate info
3. Integrations checklist:
   - ✅ Stripe production mode enabled
   - ✅ Stripe webhooks configured (production URL)
   - ✅ Google Maps API configured (production domain)
   - ✅ Resend domain verified and sender configured
   - ✅ Supabase production database ready
4. Domain & hosting checklist:
   - ✅ Custom domain purchased and configured
   - ✅ DNS records set (A, CNAME, TXT for email)
   - ✅ SSL certificate active (automatic with Vercel)
   - ✅ Vercel production environment configured
   - ✅ Environment variables set in Vercel production
5. Business checklist:
   - ✅ Rachel trained on admin panel
   - ✅ Admin account set up for Rachel
   - ✅ Payment account (Stripe) active and verified
   - ✅ Bank account connected to Stripe for payouts
   - ✅ Business insurance verified (if required)
6. Marketing checklist:
   - ✅ Social media accounts created (if planned)
   - ✅ Google My Business listing updated with website
   - ✅ Launch announcement prepared (email, social)
7. Documentation checklist:
   - ✅ README complete with setup instructions
   - ✅ User guide for Rachel (how to use admin)
   - ✅ Technical documentation for future dev
8. Final tests:
   - ✅ Test signup flow in production
   - ✅ Test booking + payment in production (use real card, small amount, refund after)
   - ✅ Test email deliverability in production
   - ✅ Test PWA installation in production
9. Backup plan:
   - ✅ Rollback procedure documented
   - ✅ Emergency contact plan if issues arise
10. GO/NO-GO decision meeting with Rachel

## Story 7.10: Launch & Post-Launch Monitoring

**As a** developer launching the app,  
**I want** to deploy to production and monitor closely,  
**so that** any issues are caught and fixed quickly.

**Acceptance Criteria:**

1. Deploy to production:
   - Merge final code to `main` branch
   - Verify Vercel auto-deploys
   - Verify production URL is live
2. Smoke test production:
   - Visit all major pages
   - Test signup/login
   - Create test booking
   - Test payment (small amount, refund)
   - Test admin panel
3. Announce launch:
   - Send email to beta testers: "We're live!"
   - Rachel announces to existing clients
   - Post on social media (if applicable)
   - Update Google My Business with link
4. Monitor intensively (first 48h):
   - Check error logs every few hours
   - Monitor Vercel deployment status
   - Check Stripe dashboard for payments
   - Monitor email deliverability (Resend dashboard)
5. Track key metrics (first week):
   - New signups
   - Bookings created
   - Payments completed
   - Errors reported
   - User feedback
6. Be ready for hotfixes:
   - Fix critical bugs immediately
   - Deploy hotfixes within hours if needed
7. Gather user feedback:
   - Monitor support emails
   - Check app reviews (if on stores, future)
   - Survey early users
8. Create post-launch report:
   - Metrics summary (signups, bookings, revenue)
   - Issues encountered and resolved
   - User feedback summary
   - Lessons learned
9. Plan iteration cycle:
   - Prioritize post-launch improvements
   - Schedule next development sprint
10. Celebrate launch with Rachel! 🎉

---
