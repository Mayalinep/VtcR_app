# User Interface Design Goals

## Overall UX Vision

**Philosophie Design : "Luxe aspirationnel accessible"**

L'application doit **impressionner visuellement** tout en restant **extrêmement simple d'utilisation**. Le client doit se sentir dans un univers premium dès la landing page, avec une sensation de service haut de gamme modernisé. Chaque interaction doit être fluide, rapide et procurer une satisfaction immédiate.

**Principes directeurs :**
- **Minimalisme sophistiqué** : Beaucoup d'espace blanc, hiérarchie visuelle claire, pas de surcharge
- **Animations subtiles mais impressionnantes** : Transitions smooth, micro-interactions délicates
- **Rapidité perçue** : Feedback immédiat, skeleton loaders, optimistic UI
- **Confiance et réassurance** : Design professionnel, informations claires, transparence totale
- **Mobile-first absolu** : Pensé d'abord pour mobile, ensuite adapté desktop

**Références visuelles :**
- **Blacklane** : Élégance sobre, focus sur le service
- **Air France** : Sophistication française, bleu/blanc/or
- **Apple** : Minimalisme, attention au détail, animations fluides
- **Vercel** : Design system moderne, typographie soignée

## Key Interaction Paradigms

**1. Réservation en 3 étapes maximum**
```
Étape 1 : Où ? (Départ → Arrivée avec autocomplétion + map)
Étape 2 : Quand ? (Date/heure + options passagers/bagages)
Étape 3 : Confirmation (Récap + Prix + Paiement)
→ Confirmation instantanée !
```

**2. Feedback immédiat et rassurant**
- Chaque action → Animation de validation (checkmark animé, haptic feedback)
- Calcul prix → Skeleton loader puis apparition smooth du montant
- Formulaire → Validation temps réel avec messages constructifs (pas d'erreurs agressives)
- Paiement → Progression claire, messages rassurants

**3. Navigation intuitive**
- **Landing page** : Hero impactant → CTA "Réserver maintenant" ultra visible
- **App authentifiée** : Bottom navigation mobile (Dashboard, Réserver, Historique, Profil)
- **Desktop** : Sidebar élégante + contenu centré max-width 1200px
- **Breadcrumbs** pour orientation dans parcours multi-étapes

**4. Gestion des états**
- **Loading** : Skeleton screens (pas de spinners moches)
- **Empty states** : Illustrations sympas + CTA pour première action
- **Erreurs** : Messages friendly + suggestion solution + possibilité retry
- **Succès** : Confetti ou animation célébration + confirmation claire

**5. Progressive disclosure**
- Afficher l'essentiel d'abord, détails ensuite si demandé
- Options avancées dans accordéons/toggles discrets
- Aide contextuelle (tooltips, hints) accessible mais pas intrusive

## Core Screens and Views

**Pages Marketing (publiques) :**

1. **Landing Page / Home**
   - Hero section avec titre impactant + visual luxe + CTA principal
   - Section "Comment ça marche" (3 étapes illustrées)
   - Section "Pourquoi nous choisir" (différenciateurs vs Uber)
   - Section "Zones desservies" (carte Paris/IDF/aéroports)
   - Section "Témoignages" (social proof)
   - Section "Tarifs" (transparence, estimateur rapide)
   - Footer avec liens légaux + contact

2. **Page À propos**
   - Présentation Rachel (photo pro, parcours, valeurs)
   - Histoire et mission
   - Certifications / Licences VTC

3. **Page Tarifs**
   - Grille tarifaire claire
   - Calculateur d'estimation trajet
   - Explications majorations (nuit, bagages, etc.)
   - Zones couvertes

4. **Page FAQ**
   - Questions groupées par thème (accordéons)
   - Recherche

5. **Page Contact**
   - Formulaire simple
   - Coordonnées (téléphone, email)
   - Map avec zone de service

6. **Pages Légales**
   - CGV, Mentions légales, Politique confidentialité, Cookies

**Pages Application (authentifiées) :**

7. **Dashboard Client**
   - Prochaine course (si une à venir) : Carte avec infos essentielles
   - Statistiques perso (nombre de courses, km parcourus, économies vs Uber)
   - Accès rapides : "Nouvelle réservation", "Historique", "Adresses favorites"
   - Dernières courses (preview 3 dernières)

8. **Nouvelle Réservation**
   - Formulaire multi-étapes (départ, arrivée, date/heure, options)
   - Map interactive avec trajet visualisé
   - Calcul prix temps réel
   - Récapitulatif avant confirmation
   - Paiement Stripe Checkout

9. **Historique Réservations**
   - Liste filtrée/triable (toutes, à venir, passées, annulées)
   - Cards avec infos essentielles + actions (voir détails, télécharger facture, rebook)
   - Empty state si aucune réservation

10. **Détail Réservation**
    - Toutes infos complètes
    - Map avec trajet
    - Statut en temps réel
    - Actions selon statut (modifier, annuler, télécharger facture, contacter Rachel)

11. **Profil Utilisateur**
    - Informations personnelles (edit)
    - Photo de profil (upload)
    - Adresses favorites (CRUD)
    - Moyens de paiement (gestion via Stripe)
    - Paramètres (notifications, langue)
    - Déconnexion

12. **Paramètres**
    - Notifications (email, push)
    - Confidentialité
    - Supprimer compte

**Pages Admin Rachel (authentifiées) :**

13. **Dashboard Admin**
    - Vue d'ensemble : Courses du jour, semaine, mois
    - Statistiques (CA, nombre courses, clients récurrents)
    - Graphiques simples (évolution)
    - Alertes (nouvelles réservations, paiements en attente)

14. **Gestion Réservations**
    - Liste complète avec filtres avancés
    - Vue calendrier/planning
    - Actions bulk (confirmer plusieurs, exporter)

15. **Détail Réservation Admin**
    - Toutes infos + infos clients
    - Historique des modifications
    - Actions admin (confirmer, refuser, annuler, contacter client)

16. **Gestion Disponibilités**
    - Calendrier interactif
    - Bloquer/débloquer créneaux
    - Gestion congés

17. **Clients**
    - Liste clients avec stats
    - Recherche
    - Vue détail client (historique, coordonnées)

18. **Paramètres Admin**
    - Configuration tarifs
    - Zones de service
    - Templates emails
    - Profil Rachel

**Pages Spéciales :**

19. **Login / Sign Up**
    - Formulaires simples
    - OAuth buttons (Google, Apple)
    - Mot de passe oublié

20. **Page 404**
    - Illustration sympas
    - Liens utiles

21. **Page Maintenance**
    - Si downtime prévu

## Accessibility

**Niveau cible : WCAG 2.1 AA**

- **Contraste :** Ratio minimum 4.5:1 (texte normal), 3:1 (texte large)
- **Navigation clavier :** Tous éléments interactifs accessibles au Tab, focus visible
- **Screen readers :** ARIA labels appropriés, landmarks HTML5, alt texts sur images
- **Formulaires :** Labels explicites, messages erreur associés aux champs
- **Responsive :** Zoom 200% sans perte de contenu/fonctionnalité
- **Animations :** Respecter `prefers-reduced-motion` pour utilisateurs sensibles
- **Liens :** Textes descriptifs (pas de "cliquez ici")

**Tests accessibilité :**
- Axe DevTools pour audit automatique
- Tests clavier manuels
- Tests VoiceOver (iOS) / TalkBack (Android)

## Branding

**Nom commercial :** À définir (provisoirement "VTC Rachel" pour le développement)

**Palette de couleurs :**

```
Couleurs principales :
- Vert foncé : #0F4C3A (Forest Green) → Confiance, sérénité, validation
- Vert accent : #16A34A (Success Green) → Confirmations, CTA secondaires

Couleurs premium :
- Or champagne : #D4AF37 (Gold) → Accents luxe, badges, highlights
- Or clair : #F5E6D3 (Cream Gold) → Backgrounds subtils

Neutres :
- Blanc : #FFFFFF → Backgrounds principaux
- Gris très clair : #F8FAFC → Backgrounds alternés
- Gris clair : #E2E8F0 → Borders, dividers
- Gris moyen : #64748B → Textes secondaires
- Noir profond : #0F172A → Textes principaux, headings

États :
- Erreur : #DC2626 (Red)
- Warning : #F59E0B (Amber)
- Info : #3B82F6 (Blue)
```

**Typographie :**

```
Primaire (titres & body) : Inter
- Modern, lisible, web-optimized
- Variable font pour performance
- Weights : 400 (Regular), 500 (Medium), 600 (SemiBold), 700 (Bold)

Secondaire (accents luxe) : Playfair Display
- Serif élégant pour grands titres hero
- Weights : 600 (SemiBold), 700 (Bold)

Monospace (code, références) : JetBrains Mono
- Pour numéros de réservation, codes

Hierarchy :
- Hero (landing) : Playfair Display 56-72px Bold
- H1 : Inter 36-48px Bold
- H2 : Inter 30-36px SemiBold
- H3 : Inter 24-28px SemiBold
- Body : Inter 16px Regular
- Small : Inter 14px Regular
- Tiny : Inter 12px Medium
```

**Iconographie :**
- Lucide Icons (cohérent, moderne, SVG optimisé)
- Style line (pas de filled) pour élégance
- Taille standard : 20-24px
- Couleur : Hérite du texte parent

**Composants UI :**
- ShadCN UI comme base (customisé aux couleurs)
- Aceternity UI pour animations spectaculaires (hero, CTA)
- Radius : 8px (modéré, moderne)
- Shadows : Subtiles, multi-layer pour profondeur

**Tone of Voice :**
- Professionnel mais **chaleureux**
- Rassurant et **digne de confiance**
- Premium sans être **prétentieux ou froid**
- Tutoiement moderne et **accessible**

**Exemples de copy :**
- ❌ "Réservez dès maintenant votre trajet" (trop corporate)
- ✅ "Réservez votre prochaine course en 2 minutes"
- ❌ "Service VTC premium de luxe" (trop pompeux)
- ✅ "Votre chauffeur de confiance en Île-de-France"

## Target Devices and Platforms

**Progressive Web App (PWA) - Multi-plateforme**

**Priorité 1 : Mobile**
- iOS Safari 14+ (iPhone)
- Chrome Android 90+ (smartphones Android)
- Résolutions : 375px à 430px (iPhone SE à iPhone Pro Max)
- Touch-optimized : Zones touch 44x44px minimum
- Gestes natifs : Swipe back, pull to refresh

**Priorité 2 : Desktop**
- Chrome 90+, Firefox 88+, Safari 14+, Edge 90+
- Résolutions : 1280px à 2560px
- Layout adapté : Sidebar, multi-colonnes
- Hover states riches

**PWA Features :**
- **Installable** : Add to Home Screen (iOS et Android)
- **Offline** : Cache pages consultées, historique accessible
- **App-like** : Fullscreen, pas de barre navigateur
- **Icons** : Adaptive icons Android, Touch icons iOS
- **Splash screen** : Branded, cohérent

**Excluded :**
- Pas de support IE11 (navigateur obsolète)
- Pas de support Android < 7.0
- Pas d'optimisation tablette spécifique (responsive suffit)

---
