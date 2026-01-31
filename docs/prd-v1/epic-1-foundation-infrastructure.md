# Epic 1: Foundation & Infrastructure

**Epic Goal :** Établir l'infrastructure technique complète du projet avec Next.js 14, Supabase, et le design system. Livrer une landing page publique magnifique et performante qui présente le service de Rachel. À la fin de cet Epic, le projet est déployé en production avec une vitrine marketing fonctionnelle.

## Story 1.1: Project Setup & Tooling

**As a** developer,  
**I want** to initialize the Next.js project with all necessary tooling,  
**so that** I have a solid foundation to build upon.

**Acceptance Criteria:**

1. Create Next.js 14 project with TypeScript using `create-next-app`
2. Configure Tailwind CSS with custom theme (colors, fonts, spacing)
3. Install and configure ESLint + Prettier with consistent rules
4. Setup Supabase project and initialize client connection
5. Configure environment variables structure (.env.local, .env.example)
6. Initialize Git repository with proper .gitignore
7. Create GitHub repository and push initial commit
8. Setup Vercel project and connect to GitHub (auto-deploy)
9. Configure absolute imports (@/ alias for cleaner imports)
10. Install core dependencies: ShadCN UI, Lucide Icons, Framer Motion, Zod
11. Create basic folder structure (components, lib, types, hooks)
12. Verify dev server runs without errors (`npm run dev`)
13. Verify initial production build succeeds (`npm run build`)

## Story 1.2: Design System & UI Foundation

**As a** developer,  
**I want** to establish the design system with reusable UI components,  
**so that** the app has a consistent, beautiful, and maintainable UI.

**Acceptance Criteria:**

1. Initialize ShadCN UI and install base components (Button, Input, Card, etc.)
2. Customize ShadCN theme with VTC Rachel color palette (forest green, gold, neutrals)
3. Configure typography system (Inter primary, Playfair Display accents)
4. Create color tokens in tailwind.config.ts matching design specs
5. Implement base layout components (Container, Section, Grid)
6. Create reusable components:
   - Button (variants: primary, secondary, outline, ghost)
   - Input (with error states, labels)
   - Card (elevation, hover states)
   - Badge (status indicators)
   - Avatar (user profiles)
7. Implement dark mode toggle foundations (optional for MVP)
8. Create loading states (Skeleton components)
9. Implement Framer Motion animation presets (fade, slide, scale)
10. Document components with examples in /components/ui/README.md
11. Verify all components render correctly across viewport sizes
12. Test accessibility basics (keyboard navigation, ARIA)

## Story 1.3: Database Schema & Supabase Setup

**As a** developer,  
**I want** to design and implement the database schema,  
**so that** data is properly structured and relationships are clear.

**Acceptance Criteria:**

1. Design database schema for tables:
   - `users` (id, email, name, phone, avatar_url, created_at)
   - `bookings` (id, user_id, pickup_address, dropoff_address, datetime, price, status, created_at)
   - `saved_addresses` (id, user_id, label, address, latitude, longitude)
   - `blocked_slots` (id, start_time, end_time, reason)
2. Create SQL migrations in Supabase dashboard or via CLI
3. Implement Row Level Security (RLS) policies:
   - Users can only read/update their own profile
   - Users can only see their own bookings
   - Admin can see all bookings
4. Generate TypeScript types from Supabase schema
5. Create Supabase client helpers in /lib/supabase:
   - `createClient()` for client-side
   - `createServerClient()` for server-side
6. Test database connection from Next.js
7. Verify RLS policies work correctly (test with different users)
8. Document schema with ER diagram or Mermaid chart in /docs

## Story 1.4: Landing Page - Hero Section

**As a** potential client,  
**I want** to see an impressive hero section,  
**so that** I immediately understand the service and feel confident booking.

**Acceptance Criteria:**

1. Design and implement hero section with:
   - Large heading with Playfair Display: "Votre chauffeur de confiance en Île-de-France"
   - Subheading explaining premium VTC service
   - Primary CTA button: "Réserver maintenant" (links to /book, future story)
   - Secondary CTA: "En savoir plus" (scrolls to about section)
2. Integrate hero background:
   - High-quality image (Paris at night or luxury car)
   - Subtle gradient overlay for text readability
   - Parallax scroll effect (Aceternity UI or Framer Motion)
3. Implement responsive design:
   - Mobile: Stacked layout, full-width image
   - Tablet: Larger text, adjusted spacing
   - Desktop: Image right, text left (or full-width centered)
4. Add subtle animations:
   - Fade in on load
   - CTA buttons hover effects (scale, glow)
5. Optimize hero image:
   - Use next/image for automatic optimization
   - Lazy loading below fold
   - WebP format with fallback
6. Test performance: FCP < 1.5s, LCP < 2.5s
7. Verify hero displays correctly on all viewport sizes (320px to 2560px)
8. Accessibility check: Heading hierarchy (h1), alt texts, focus states

## Story 1.5: Landing Page - Services & Features

**As a** potential client,  
**I want** to understand what services are offered,  
**so that** I know if this VTC service meets my needs.

**Acceptance Criteria:**

1. Create "Comment ça marche" section with 3 steps: /*supprimer au final*/
   - Étape 1: "Réservez en ligne" (icon + description)
   - Étape 2: "Payez en toute sécurité" (icon + description)
   - Étape 3: "Profitez de votre trajet" (icon + description)
2. Create "Pourquoi nous choisir" section with 4-6 key differentiators:
   - Chauffeur professionnel fiable
   - Service personnalisé
   - Tarifs transparents
   - Spécialiste aéroports
   - (Add icons from Lucide for each)
3. Create "Zones desservies" section:
   - Static map image or simple Google Map embed
   - List of covered areas (Paris, IDF, CDG, Orly)
4. Implement scroll animations (Framer Motion):
   - Fade in sections as they enter viewport
   - Stagger animation for feature cards
5. Responsive grid layouts:
   - Mobile: Single column
   - Tablet: 2 columns
   - Desktop: 3-4 columns for features
6. Use ShadCN Card component for feature boxes
7. Add micro-interactions (hover effects on cards)
8. Verify readability and contrast ratios (WCAG AA)

## Story 1.6: Landing Page - Footer & Legal

**As a** website visitor,  
**I want** to access legal information and contact details,  
**so that** I can trust the service and contact if needed.

**Acceptance Criteria:**

1. Create footer component with sections:
   - Logo + tagline
   - Navigation links (À propos, Tarifs, FAQ, Contact)
   - Legal links (CGV, Mentions légales, Politique de confidentialité)
   - Contact info (email, phone)
   - Social media links (placeholder)
2. Create placeholder legal pages:
   - `/legal/terms` - CGV (Terms of Service)
   - `/legal/privacy` - Politique de confidentialité (RGPD compliant)
   - `/legal/cookies` - Politique cookies
   - (Placeholder content: "En cours de rédaction" + structure)
3. Implement footer design:
   - Dark background (forest green or near-black)
   - Light text with good contrast
   - Organized in columns (mobile: stacked, desktop: 4 columns)
4. Add copyright notice with current year (dynamic)
5. Footer sticky to bottom if page content is short
6. Links have hover states and are keyboard accessible
7. Test footer on all pages (consistent)
8. Legal pages have proper typography and readability

## Story 1.7: Navigation & Header

**As a** website visitor,  
**I want** to navigate easily between pages,  
**so that** I can find information and access key actions.

**Acceptance Criteria:**

1. Create header/navbar component with:
   - Logo (left) - links to home
   - Navigation links (center/right): Accueil, À propos, Tarifs, FAQ, Contact
   - CTA button (right): "Réserver" or "Connexion" (depending on auth state)
2. Implement responsive behavior:
   - Mobile: Hamburger menu (slide-in drawer or dropdown)
   - Tablet+: Horizontal menu
3. Sticky header on scroll (with smooth transition)
4. Active link highlighting (current page)
5. Smooth scroll to sections if same page (e.g., home sections)
6. Logo and navigation have hover states
7. Header background:
   - Transparent with backdrop blur initially
   - Solid background on scroll
8. Mobile menu:
   - Animated open/close (Framer Motion)
   - Close on link click or outside click
   - Overlay dims background
9. Accessibility:
   - Keyboard navigation works
   - Mobile menu toggle has ARIA labels
   - Focus trap in mobile menu
10. Test header across all viewport sizes

## Story 1.8: SEO & Meta Configuration

**As a** developer and business owner,  
**I want** the site to be SEO-optimized,  
**so that** potential clients can find us on Google.

**Acceptance Criteria:**

1. Configure Next.js metadata in root layout:
   - Site title: "VTC Rachel - Chauffeur VTC Premium Paris & Île-de-France"
   - Description: SEO-optimized description (150-160 characters)
   - Keywords (optional but good practice)
   - OG tags (title, description, image)
   - Twitter card tags
2. Create custom metadata for each page (landing, about, pricing, etc.)
3. Generate dynamic OG image for social shares (next/og or static image)
4. Create `/robots.txt` allowing all bots
5. Create `/sitemap.xml` with all public pages
6. Implement JSON-LD structured data (Schema.org):
   - LocalBusiness
   - Service
7. Configure canonical URLs
8. Verify meta tags with browser inspector and social media debuggers
9. Test Open Graph preview (Facebook, Twitter, LinkedIn)
10. Verify sitemap is accessible and valid
11. Run Lighthouse SEO audit: Score > 90

## Story 1.9: Performance Optimization & PWA Setup

**As a** mobile user,  
**I want** the app to load fast and be installable,  
**so that** I have a smooth, app-like experience.

**Acceptance Criteria:**

1. Install and configure `next-pwa` plugin
2. Create `/public/manifest.json` with PWA configuration:
   - App name, short_name, description
   - Theme color (forest green), background color
   - Display: standalone
   - Icons (192x192, 512x512, maskable)
3. Create app icons in multiple sizes:
   - Use logo + green background
   - Generate with PWA asset generator tool
4. Configure Service Worker for offline support:
   - Cache static assets (images, fonts, JS/CSS)
   - Cache landing page for offline viewing (optional)
5. Optimize images:
   - Use next/image for all images
   - Convert to WebP
   - Provide width/height to avoid CLS
6. Optimize fonts:
   - Use next/font for Inter and Playfair Display
   - Preload critical fonts
7. Code splitting:
   - Dynamic imports for heavy components
   - Lazy load below-fold sections
8. Run Lighthouse audit:
   - Performance: > 90
   - Accessibility: > 90
   - Best Practices: > 90
   - SEO: > 90
9. Test PWA installation on mobile (iOS Safari, Chrome Android)
10. Verify app opens in standalone mode after install
11. Test offline functionality (landing page cached)

## Story 1.10: Deployment & Monitoring Setup

**As a** developer,  
**I want** the site deployed and monitored,  
**so that** it's live and I can track performance/errors.

**Acceptance Criteria:**

1. Configure Vercel project settings:
   - Production branch: main
   - Auto-deploy enabled
   - Preview deployments enabled for all branches
2. Set environment variables in Vercel dashboard:
   - NEXT_PUBLIC_SUPABASE_URL
   - NEXT_PUBLIC_SUPABASE_ANON_KEY
   - (Add placeholder values for future: Stripe, Google Maps, etc.)
3. Configure custom domain (if available) or use Vercel domain
4. Enable HTTPS (automatic with Vercel)
5. Setup Vercel Analytics (included, enable in dashboard)
6. Configure error logging:
   - Console errors logged
   - Consider Sentry integration (optional)
7. Test production deployment:
   - Push to main triggers deploy
   - Site accessible at production URL
   - No console errors
   - All pages load correctly
8. Test preview deployment:
   - Create feature branch
   - Push commit
   - Verify preview URL works
9. Document deployment process in README.md
10. Share production URL with Rachel for feedback

---
