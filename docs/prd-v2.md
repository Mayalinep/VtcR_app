# VTC Rachel - Product Requirements Document (PRD) v2 - MVP Simplifié

<!-- Powered by BMAD™ Core -->

---

## Goals and Background Context

### Goals

- Fournir à Rachel un **site vitrine professionnel** pour présenter son service VTC premium
- Permettre aux clients potentiels d'**estimer instantanément le prix** d'une course (départ → arrivée → calcul automatique)
- Offrir un **formulaire de demande de réservation** simple qui envoie les détails à Rachel par email ET SMS
- Éliminer les frictions liées aux **réservations téléphoniques** (disponible 24/7 en ligne)
- Améliorer la **crédibilité et visibilité** de Rachel face aux grandes plateformes (Uber, G7)
- Servir de **support marketing** pour son partenariat hôtel (flyers avec QR code vers le site)
- Poser les bases pour **évolution future** vers automatisation si le business se développe
- Créer un **portfolio professionnel** pour la développeuse (projet École 42)

### Background Context

Rachel est chauffeur VTC dépendante d'Uber à ~90%, subissant des commissions de 25% et un rythme épuisant. Elle souhaite développer sa propre clientèle, notamment via un partenariat avec un hôtel où elle vise 5 courses aéroport par jour. 

Le site sera un outil de génération de leads : les clients potentiels découvrent le service, estiment le prix instantanément, et envoient une demande de réservation. Rachel reçoit la demande par **email ET SMS** pour notification instantanée, puis contacte le client directement pour confirmer. Le client reçoit un **message rassurant** ("Rachel vous contactera sous 2h") pour gérer l'attente. Pas besoin de gestion complexe au démarrage, mais l'architecture permet une **évolution facile vers l'automatisation** si le volume augmente.

### Change Log

| Date | Version | Description | Author |
|------|---------|-------------|--------|
| 2026-01-13 | 2.0 | PRD simplifié basé sur besoins réels de Rachel | Équipe VTC Rachel |
| 2026-01-09 | 1.0 | PRD initial complet (archivé dans prd-v1-archive.md) | Équipe VTC Rachel |

---

## Requirements

### Functional Requirements

**Site vitrine & Navigation**

- **FR1:** Le site affiche une landing page présentant le service VTC Rachel avec sections Hero, À propos, Tarifs, FAQ, Contact
- **FR2:** Le site inclut une navigation claire (menu) accessible sur tous les écrans
- **FR3:** Le site affiche les informations de contact (téléphone, email) visibles sur toutes les pages
- **FR4:** Le site affiche les zones desservies (Paris, IDF, aéroports CDG/Orly)
- **FR5:** Le site inclut les pages légales obligatoires (CGV, Mentions légales, Confidentialité)

**Estimation de prix (Landing page)**

- **FR6:** L'utilisateur peut entrer une adresse de départ avec autocomplétion Google Places API
- **FR7:** L'utilisateur peut entrer une adresse d'arrivée avec autocomplétion Google Places API
- **FR8:** Le système calcule automatiquement la distance via Google Distance Matrix API
- **FR9:** Le système affiche le prix estimé selon la grille tarifaire de Rachel (ex: 2€/km ou forfaits)
- **FR10:** Le système affiche la distance et le temps de trajet estimé
- **FR11:** L'utilisateur peut cliquer sur "Réserver maintenant" pour accéder à la page de réservation

**Page de réservation (/reserver) - Split screen**

- **FR12:** La page affiche un formulaire de réservation (côté gauche) et un bloc contact Rachel (côté droit)
- **FR13:** Le bloc contact affiche le téléphone de Rachel avec message "Une question ? N'hésitez pas à m'appeler !"
- **FR14:** Le formulaire de réservation collecte : nom, prénom, téléphone, email, date, heure, nombre de passagers
- **FR15:** Le formulaire permet d'ajouter des options : siège enfant, bagages volumineux, notes spéciales
- **FR16:** Le formulaire affiche un récapitulatif clair avant envoi (trajet, date/heure, prix, options)
- **FR17:** Le client choisit son mode de paiement : "En ligne" (futur) ou "En voiture"
- **FR18:** Le système valide tous les champs avant envoi (email valide, téléphone valide, date future)
- **FR19:** Le formulaire est protégé par Google reCAPTCHA v3 contre les bots et le spam

**Notifications**

- **FR20:** Quand une demande est envoyée, Rachel reçoit un **email** avec tous les détails de la réservation
- **FR21:** Quand une demande est envoyée, Rachel reçoit un **SMS** avec un résumé et lien vers l'email
- **FR22:** Le client reçoit un email de confirmation avec récapitulatif et message "Rachel vous contactera sous 2h"
- **FR23:** Les emails utilisent des templates professionnels avec le branding VTC Rachel

**Page de confirmation (/confirmation)**

- **FR24:** Après envoi réussi, l'utilisateur est redirigé vers une page de confirmation dédiée
- **FR25:** La page de confirmation affiche un message de succès avec animation
- **FR26:** La page affiche le récapitulatif complet de la demande envoyée
- **FR27:** La page affiche les prochaines étapes ("Rachel vous contactera sous 2h")
- **FR28:** La page affiche le téléphone de Rachel avec CTA "Appeler si urgent"

**Contenu & SEO**

- **FR29:** Le site est optimisé pour le référencement Google (meta tags, sitemap, structured data)
- **FR30:** Le site affiche des témoignages clients (si disponibles)
- **FR31:** Le site affiche la grille tarifaire complète (forfaits aéroports, majorations)
- **FR32:** Le site inclut une FAQ avec réponses aux questions courantes

---

### Non-Functional Requirements

**Performance & Accessibilité**

- **NFR1:** Le site doit charger en moins de 2 secondes (First Contentful Paint)
- **NFR2:** Le site doit être 100% responsive (mobile, tablette, desktop)
- **NFR3:** Le site doit respecter les standards d'accessibilité WCAG 2.1 niveau AA minimum
- **NFR4:** Le site doit fonctionner sur tous les navigateurs modernes (Chrome, Safari, Firefox, Edge)

**Sécurité & Protection**

- **NFR5:** Toutes les communications doivent utiliser HTTPS
- **NFR6:** Les données du formulaire doivent être validées côté serveur (protection injection)
- **NFR7:** Le site doit protéger contre le spam avec Google reCAPTCHA v3 (invisible, gratuit, efficace)
- **NFR8:** Les emails doivent être envoyés via un service sécurisé (Resend ou équivalent)
- **NFR9:** Le site doit être conforme RGPD (consentement cookies, politique confidentialité)

**Fiabilité**

- **NFR10:** L'envoi d'email ET SMS doit avoir un taux de délivrabilité > 95%
- **NFR11:** Le site doit avoir un uptime > 99% (disponibilité 24/7)
- **NFR12:** Le calcul de prix doit être exact et cohérent avec la grille tarifaire de Rachel
- **NFR13:** Si l'envoi d'email échoue, le système doit réessayer automatiquement (3 tentatives)

**Coûts & Budget**

- **NFR14:** Les coûts d'infrastructure doivent rester à 0€/mois au lancement
- **NFR15:** L'utilisation de Google Maps API doit rester dans les limites gratuites (200$/mois crédits)
- **NFR16:** Le site doit être hébergeable gratuitement sur Vercel (plan Hobby)
- **NFR17:** Les SMS doivent utiliser un service économique (Twilio : ~0.05€/SMS)

**Évolutivité**

- **NFR18:** Le code doit permettre d'ajouter facilement un système d'acompte en ligne (Stripe) en Phase 2
- **NFR19:** Le code doit permettre d'ajouter facilement un dashboard admin simple en Phase 2
- **NFR20:** Le code doit permettre d'ajouter une base de données (Supabase) sans refonte majeure

---

## User Interface Design Goals

### Overall UX Vision

**Philosophie Design : "Site vitrine premium accessible"**

L'application VTC Rachel doit être un **site vitrine simple mais impressionnant** qui inspire confiance et professionnalisme. L'objectif est de créer une expérience qui rassure le client, affiche clairement les informations essentielles, et rend l'estimation de prix + demande de réservation **extrêmement simple** (moins de 2 minutes).

**Principes directeurs :**
- **Confiance avant tout** : Design professionnel, témoignages, photos qualité, infos claires
- **Simplicité radicale** : Formulaires simples, pas de navigation complexe
- **Rapidité perçue** : Estimation de prix instantanée (< 1 seconde), feedback immédiat
- **Mobile-first absolu** : La plupart des clients réserveront depuis leur chambre d'hôtel (mobile)
- **Rassurance continue** : Messages clairs à chaque étape ("Rachel vous contactera", "Demande envoyée")

**Références d'inspiration :**
- **Uber** : Simplicité du formulaire (2 champs, prix immédiat)
- **Booking.com** : Messages rassurants ("Confirmation sous 2h")
- **Apple** : Minimalisme, attention au détail
- **Design actuel** : Garder le design premium existant (vert forêt + or champagne)

---

### Key Interaction Paradigms

**1. Estimation en 10 secondes (Landing page)**
```
Landing page → Formulaire d'estimation visible
├─ Champ "Départ" (autocomplétion Google Places)
├─ Champ "Arrivée" (autocomplétion Google Places)
├─ Bouton "Voir le prix" (vert, large)
└─ Prix affiché instantanément avec distance/temps
    └─ Bouton "Réserver maintenant" apparaît
```

**2. Page de réservation split screen (/reserver)**
```
Page dédiée avec layout split (Desktop)
├─ GAUCHE : Formulaire de réservation
│   ├─ Nom, prénom, téléphone, email
│   ├─ Date, heure
│   ├─ Passagers, options (bagages, siège enfant)
│   ├─ Notes spéciales
│   ├─ Choix paiement (en voiture par défaut)
│   ├─ Récapitulatif automatique
│   └─ Bouton "Envoyer la demande"
│
└─ DROITE : Bloc contact Rachel (sticky)
    ├─ Photo Rachel (optionnel)
    ├─ "Une question ?"
    ├─ Téléphone : 06 XX XX XX XX
    ├─ "Disponible 24/7"
    └─ "N'hésitez pas à m'appeler !"

Mobile : Formulaire en haut, bloc contact en bas
```

**3. Page de confirmation (/confirmation)**
```
Page de succès (après envoi)
├─ ✅ Animation de succès
├─ Message : "Demande envoyée avec succès !"
├─ Message : "Rachel vous contactera sous 2h"
├─ Récapitulatif complet de la demande
├─ "Un email de confirmation vous a été envoyé"
├─ CTA : "Appeler Rachel maintenant" (si urgent)
└─ Prochaines étapes (what happens next)
```

**4. Feedback rassurant à chaque étape**
```
Calcul prix → Loader 1s → Prix affiché ✅
Envoi demande → Loader 1-2s → Redirection confirmation ✅
Email envoyé → Notification client immédiate ✅
```

---

### Core Screens and Views

**Pages existantes (à garder) :**
1. ✅ Landing Page - Hero + Estimation prix + Features
2. ✅ Page Tarifs - Grille tarifaire
3. ✅ Page À propos - Présentation Rachel
4. ✅ Page FAQ - Questions fréquentes
5. ✅ Page Contact - Formulaire contact
6. ✅ Pages légales (CGV, Mentions légales, Confidentialité)

**Nouvelles pages à créer :**
7. 🆕 Page Réservation (`/reserver`) - Split screen (formulaire + contact Rachel)
8. 🆕 Page Confirmation (`/confirmation`) - Message de succès + récapitulatif

---

### Accessibility

**WCAG 2.1 niveau AA**
- Contrastes de couleurs respectés (vert forêt + blanc)
- Navigation au clavier fonctionnelle
- Labels explicites sur tous les champs de formulaire
- Messages d'erreur clairs et constructifs
- Textes alternatifs sur toutes les images

---

### Branding

**Déjà défini et implémenté :**
- **Couleurs** : Vert forêt (#0F4C3A) + Or champagne (#D4AF37)
- **Typographie** : Inter (texte) + Playfair Display (titres)
- **Style** : Minimalisme sophistiqué, luxe accessible
- **Animations** : Subtiles, fluides (Framer Motion)

**À compléter avec Rachel :**
- Logo VTC Rachel (si existe)
- Photos professionnelles (voiture, Rachel)
- Slogan précis

---

### Target Devices and Platforms

**Web Responsive (mobile-first)**
- **Priorité 1** : Mobile (80% des clients réserveront depuis smartphone)
- **Priorité 2** : Desktop (clients en préparation de voyage)
- **Support** : iOS Safari, Chrome Android, Chrome Desktop, Firefox, Edge

---

## Technical Assumptions

_(Section en cours - sera complétée après validation)_

---

*Document créé le : 2026-01-13*  
*Version : 2.0 (MVP Simplifié)*  
*Auteur : Équipe VTC Rachel*  
*Statut : Draft en cours*
