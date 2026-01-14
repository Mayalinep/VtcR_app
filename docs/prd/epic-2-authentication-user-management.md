# Epic 2: Authentication & User Management

**Epic Goal :** Permettre aux utilisateurs de créer un compte, se connecter avec email/mot de passe ou OAuth (Google/Apple), gérer leur profil, et sauvegarder leurs préférences. Implémenter la sécurité avec Row Level Security (RLS) et JWT. À la fin de cet Epic, les clients peuvent s'inscrire et accéder à leur espace personnel.

## Story 2.1: Sign Up with Email

**As a** new user,  
**I want** to create an account with my email and password,  
**so that** I can access the booking platform.

**Acceptance Criteria:**

1. Create `/sign-up` page with form:
   - Email input (validated format)
   - Password input (min 8 chars, shown/hide toggle)
   - Confirm password input (must match)
   - Name input (optional at signup, required later)
   - Terms & conditions checkbox (required)
2. Implement form validation with Zod schema
3. Show real-time validation errors (inline, friendly messages)
4. On submit, call Supabase Auth `signUp()` method
5. Handle success:
   - Show success message: "Compte créé ! Vérifiez votre email."
   - Redirect to email confirmation page
6. Handle errors:
   - Email already exists → "Cet email est déjà utilisé"
   - Invalid email → "Email invalide"
   - Weak password → "Mot de passe trop faible"
7. Supabase sends verification email automatically
8. Style form with ShadCN Input, Button components
9. Add link to login page: "Déjà un compte ? Connectez-vous"
10. Implement loading state (button disabled, spinner)
11. Test signup flow end-to-end
12. Accessibility: Form labels, error announcements, keyboard navigation

## Story 2.2: Email Verification & Login

**As a** user who just signed up,  
**I want** to verify my email and log in,  
**so that** I can access my account securely.

**Acceptance Criteria:**

1. User receives verification email from Supabase
2. Email contains verification link
3. Create `/auth/confirm` page:
   - Handles email verification token
   - Shows success message: "Email vérifié ! Vous pouvez vous connecter."
   - Link to login page
4. Create `/login` page with form:
   - Email input
   - Password input (with show/hide toggle)
   - "Mot de passe oublié ?" link
   - Submit button: "Se connecter"
5. Implement login with Supabase Auth `signInWithPassword()`
6. On success:
   - Store session (Supabase handles JWT cookies)
   - Redirect to /dashboard
7. On error:
   - Invalid credentials → "Email ou mot de passe incorrect"
   - Email not verified → "Veuillez vérifier votre email"
8. Add "Remember me" checkbox (session persistence)
9. Add link to signup: "Pas encore de compte ? Inscrivez-vous"
10. Implement loading state
11. Test login flow with verified and unverified accounts
12. Verify JWT token is stored securely (httpOnly cookie)

## Story 2.3: OAuth Sign In (Google & Apple)

**As a** user,  
**I want** to sign in with Google or Apple,  
**so that** I don't have to create yet another password.

**Acceptance Criteria:**

1. Enable Google OAuth provider in Supabase dashboard:
   - Configure OAuth app in Google Cloud Console
   - Add Client ID and Secret to Supabase
2. Enable Apple OAuth provider in Supabase dashboard:
   - Configure Sign in with Apple in Apple Developer Portal
   - Add credentials to Supabase
3. Add OAuth buttons to signup and login pages:
   - "Continuer avec Google" (Google logo)
   - "Continuer avec Apple" (Apple logo)
4. Implement OAuth flow with Supabase:
   - Call `signInWithOAuth({ provider: 'google' })`
   - Call `signInWithOAuth({ provider: 'apple' })`
5. Handle OAuth redirect:
   - User redirected to Google/Apple login
   - User approves permissions
   - Redirected back to app with token
   - Auto-login with Supabase
6. On first OAuth login:
   - User profile created automatically
   - Name/email prefilled from OAuth provider
7. On subsequent logins:
   - Existing account matched by email
   - User logged in directly
8. Handle errors:
   - OAuth cancelled → "Connexion annulée"
   - Provider error → "Erreur de connexion, réessayez"
9. Style OAuth buttons distinctly (brand colors)
10. Test OAuth flow on iOS Safari (Apple Sign In native)
11. Test OAuth flow on Chrome Android (Google Sign In)
12. Verify user data populated correctly from OAuth

## Story 2.4: Password Reset Flow

**As a** user who forgot my password,  
**I want** to reset it via email,  
**so that** I can regain access to my account.

**Acceptance Criteria:**

1. Create `/forgot-password` page with form:
   - Email input
   - Submit button: "Envoyer le lien de réinitialisation"
2. On submit, call Supabase `resetPasswordForEmail()`
3. Show success message: "Email envoyé ! Vérifiez votre boîte de réception."
4. Supabase sends password reset email
5. Create `/reset-password` page:
   - Handles reset token from email link
   - New password input
   - Confirm password input
   - Submit button: "Réinitialiser le mot de passe"
6. Validate new password (min 8 chars, match confirmation)
7. On submit, call Supabase `updateUser({ password: newPassword })`
8. On success:
   - Show message: "Mot de passe changé avec succès !"
   - Auto-login user
   - Redirect to /dashboard
9. On error:
   - Invalid token → "Lien expiré, demandez-en un nouveau"
   - Weak password → Validation error
10. Add rate limiting on password reset requests (prevent spam)
11. Test complete password reset flow
12. Verify old password no longer works after reset

## Story 2.5: Protected Routes & Middleware

**As a** developer,  
**I want** to protect authenticated routes,  
**so that** only logged-in users can access them.

**Acceptance Criteria:**

1. Create Next.js middleware (`/middleware.ts`)
2. Check for Supabase session on every request
3. Protected route groups:
   - `/dashboard/*` requires auth
   - `/book/*` requires auth
   - `/bookings/*` requires auth
   - `/profile/*` requires auth
4. If no session and accessing protected route:
   - Redirect to `/login?redirect=/original-path`
5. After login, redirect back to original path
6. Public routes accessible without auth:
   - Landing page, about, pricing, FAQ, contact, legal
7. Create `useAuth()` custom hook:
   - Returns `{ user, session, loading, signOut }`
   - Fetches current user from Supabase
8. Create `AuthProvider` context:
   - Wraps app
   - Provides auth state globally
9. Show loading state while checking auth
10. Test protected route redirection
11. Test "redirect after login" functionality
12. Verify middleware doesn't slow down requests (< 50ms overhead)

## Story 2.6: User Profile Page

**As a** logged-in user,  
**I want** to view and edit my profile,  
**so that** my information is up-to-date.

**Acceptance Criteria:**

1. Create `/profile` page (authenticated route)
2. Display current user information:
   - Avatar (profile picture)
   - Name
   - Email (read-only or with re-verification flow)
   - Phone number
3. Implement edit form with validation
4. Avatar upload:
   - Click avatar to upload new image
   - Use Supabase Storage for avatar storage
   - Crop/resize image on client (use library like react-easy-crop)
   - Update `avatar_url` in database
5. Name and phone editable:
   - Validate phone format (French +33)
   - Save button updates Supabase `users` table
6. Show success toast: "Profil mis à jour !"
7. Show error toast if update fails
8. Implement loading state while saving
9. Add "Déconnexion" button:
   - Calls Supabase `signOut()`
   - Redirects to home page
10. Style with ShadCN Card, Avatar, Input components
11. Responsive design (mobile-friendly)
12. Test profile update flow
13. Verify avatar displays correctly across app

## Story 2.7: Saved Addresses Management

**As a** user,  
**I want** to save my frequent addresses (home, work, airport),  
**so that** I can book faster without retyping them.

**Acceptance Criteria:**

1. Create `/profile/addresses` page (nested route)
2. Display list of saved addresses:
   - Label (e.g., "Maison", "Bureau", "CDG Terminal 2E")
   - Full address
   - Edit and delete buttons
3. Add "Nouvelle adresse" button
4. Create add/edit address form:
   - Label input (text)
   - Address input with Google Places autocomplete
   - Save latitude/longitude from Places API
5. On save:
   - Insert into `saved_addresses` table (Supabase)
   - Show success toast
   - Refresh address list
6. On edit:
   - Pre-fill form with existing data
   - Update in database on save
7. On delete:
   - Show confirmation dialog: "Supprimer cette adresse ?"
   - Delete from database
   - Remove from list
8. Empty state:
   - "Aucune adresse sauvegardée"
   - Illustration + CTA to add first address
9. Limit to 10 saved addresses per user (validation)
10. Style with ShadCN Card, Dialog, Input
11. Test CRUD operations on saved addresses
12. Verify addresses respect RLS policies (user sees only their own)

## Story 2.8: Account Settings & Preferences

**As a** user,  
**I want** to manage my account settings,  
**so that** I can customize my experience and privacy.

**Acceptance Criteria:**

1. Create `/profile/settings` page
2. Notification preferences:
   - Email notifications (toggle on/off)
     - Confirmation emails
     - Reminder emails
     - Marketing emails (opt-in)
   - Save to `users` table (notification_preferences JSON column)
3. Language preference (if i18n planned):
   - Dropdown: Français, English
   - Save to preferences
4. Privacy settings:
   - "Autoriser les données d'analyse" (analytics opt-in/out)
   - Save preference
5. Danger zone:
   - "Supprimer mon compte" button (red, secondary)
   - Confirmation dialog with password re-entry
   - On confirm:
     - Delete user bookings (or anonymize)
     - Delete user profile
     - Delete from Supabase Auth
     - Sign out and redirect to home
6. Show success/error toasts for each action
7. Implement loading states
8. Style with ShadCN Switch, Select, Dialog
9. Test all settings save correctly
10. Test account deletion flow (use test account)
11. Verify RGPD compliance (user can delete their data)

---
