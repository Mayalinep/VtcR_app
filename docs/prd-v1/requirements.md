# Requirements

## Functional Requirements

**Réservation & Booking**

- **FR1:** Le système permet aux utilisateurs de créer une réservation en spécifiant adresse de départ, adresse d'arrivée, date, heure, et nombre de passagers
- **FR2:** Le système intègre Google Places API pour l'autocomplétion des adresses lors de la saisie
- **FR3:** Le système calcule automatiquement la distance, le temps de trajet estimé et le prix via Google Distance Matrix API
- **FR4:** Le système affiche un récapitulatif complet de la réservation avant confirmation (trajet, prix, date/heure, options)
- **FR5:** Le système permet de sauvegarder des adresses favorites (domicile, travail, aéroports) pour réutilisation rapide
- **FR6:** Le système propose des options supplémentaires sélectionnables (siège enfant, bagages volumineux, temps d'attente prévu, notes spéciales)
- **FR7:** Le système affiche en temps réel la disponibilité de Rachel pour la date/heure demandée
- **FR8:** Le système empêche les réservations sur des créneaux déjà occupés ou bloqués
- **FR9:** Le système envoie une confirmation de réservation immédiate par email après validation

**Modification & Annulation**

- **FR10:** Les clients peuvent modifier une réservation jusqu'à 4h avant l'heure prévue sans frais
- **FR11:** Les clients peuvent annuler gratuitement jusqu'à 12h avant, avec frais d'annulation dégressifs ensuite
- **FR12:** Le système calcule et affiche automatiquement les frais d'annulation applicables selon le délai
- **FR13:** Toute modification ou annulation génère un email de confirmation automatique

**Authentication & Profils**

- **FR14:** Les utilisateurs peuvent créer un compte avec email/mot de passe
- **FR15:** Le système supporte l'authentification OAuth via Google Sign-In et Apple Sign-In
- **FR16:** Les utilisateurs peuvent se connecter et récupérer un mot de passe oublié via email
- **FR17:** Les utilisateurs peuvent modifier leurs informations personnelles (nom, email, téléphone, photo de profil)
- **FR18:** Les utilisateurs peuvent consulter l'historique complet de leurs réservations (passées et à venir)
- **FR19:** Les utilisateurs peuvent télécharger leurs factures au format PDF depuis l'historique
- **FR20:** Les utilisateurs peuvent gérer leurs moyens de paiement enregistrés (ajout, suppression, modification)

**Paiement**

- **FR21:** Le système intègre Stripe pour accepter les paiements par carte bancaire, Apple Pay et Google Pay
- **FR22:** Les clients peuvent payer immédiatement lors de la réservation ou choisir le paiement avant la course
- **FR23:** Le système envoie un rappel de paiement 24h avant la course si non payée
- **FR24:** Le système génère automatiquement une facture PDF après chaque paiement réussi
- **FR25:** Le système gère les webhooks Stripe pour confirmer les paiements de manière sécurisée
- **FR26:** Le système permet le remboursement automatique en cas d'annulation éligible
- **FR27:** Les factures incluent les informations légales complètes (SIRET, TVA si applicable, mentions obligatoires)

**Interface Administrateur (Rachel)**

- **FR28:** Rachel accède à un dashboard admin sécurisé avec authentification
- **FR29:** Le dashboard affiche toutes les réservations (en attente, confirmées, complétées, annulées) avec filtres et recherche
- **FR30:** Rachel peut voir les détails complets de chaque réservation (client, trajet, prix, statut paiement, notes)
- **FR31:** Rachel peut confirmer, refuser ou annuler une réservation avec notification automatique au client
- **FR32:** Rachel peut bloquer des créneaux horaires (congés, maintenance véhicule, indisponibilité)
- **FR33:** Rachel peut accéder aux coordonnées clients (téléphone, email) pour contact direct si nécessaire
- **FR34:** Le dashboard affiche des statistiques d'activité (nombre de courses, CA, taux d'annulation, clients récurrents)
- **FR35:** Rachel peut exporter les données de réservations et paiements pour comptabilité (CSV/Excel)

**Notifications & Communications**

- **FR36:** Le système envoie un email de confirmation immédiate après chaque réservation
- **FR37:** Le système envoie un rappel email 24h avant la course
- **FR38:** Le système envoie un rappel email 2h avant la course
- **FR39:** Le système notifie le client par email en cas de modification ou annulation par Rachel
- **FR40:** Rachel reçoit une notification email instantanée pour chaque nouvelle réservation
- **FR41:** Le système envoie un email de remerciement après la course avec demande d'avis (optionnel)
- **FR42:** Les emails utilisent des templates React Email avec design cohérent à l'app

**Maps & Calcul de Trajets**

- **FR43:** Le système affiche une carte interactive Google Maps lors de la réservation
- **FR44:** La carte visualise le trajet calculé entre départ et arrivée avec itinéraire
- **FR45:** Le système calcule la distance et le temps estimé en tenant compte du trafic temps réel
- **FR46:** Le système applique des règles de tarification configurables (prix au km, forfait mini, majorations)
- **FR47:** Le système gère les zones géographiques de service (Paris, Île-de-France, aéroports CDG/Orly)

**Contenu & Pages**

- **FR48:** L'application inclut une landing page marketing présentant le service de Rachel
- **FR49:** L'application inclut une page "À propos" avec présentation de Rachel et du service
- **FR50:** L'application inclut une page "Tarifs" expliquant le modèle de prix et les zones couvertes
- **FR51:** L'application inclut les pages légales obligatoires (CGV, Mentions légales, Politique de confidentialité, Cookies)
- **FR52:** L'application inclut une page FAQ avec réponses aux questions courantes
- **FR53:** L'application inclut une page "Contact" avec formulaire et coordonnées

## Non-Functional Requirements

**Performance & Scalabilité**

- **NFR1:** Le First Contentful Paint (FCP) doit être < 1.5s sur connexion 4G
- **NFR2:** Le Time to Interactive (TTI) doit être < 3s sur mobile
- **NFR3:** Le score Lighthouse doit être > 90/100 (Performance, Accessibility, Best Practices, SEO)
- **NFR4:** La taille du bundle JavaScript initial doit être < 200kb (gzipped)
- **NFR5:** Le système doit supporter 100 utilisateurs simultanés sans dégradation
- **NFR6:** Le système doit pouvoir scale jusqu'à 500 réservations/mois sans changement d'architecture
- **NFR7:** Les images doivent être optimisées automatiquement (WebP, responsive, lazy loading)

**Sécurité & Confidentialité**

- **NFR8:** Toutes les communications doivent utiliser HTTPS (TLS 1.3 minimum)
- **NFR9:** Les mots de passe doivent être hashés avec bcrypt (minimum 10 rounds)
- **NFR10:** Les tokens JWT doivent expirer après 24h avec refresh token sécurisé
- **NFR11:** Le système doit implémenter le rate limiting sur les APIs sensibles (5 requêtes/min/IP)
- **NFR12:** Le système doit être conforme RGPD (consentement cookies, droit à l'oubli, export données)
- **NFR13:** Les données bancaires ne doivent JAMAIS transiter ou être stockées (délégation Stripe PCI-DSS)
- **NFR14:** Le système doit protéger contre les attaques OWASP Top 10 (XSS, CSRF, injection SQL)
- **NFR15:** Les données sensibles (tokens, API keys) doivent être stockées en variables d'environnement
- **NFR16:** Les sessions doivent être invalidées côté serveur lors de la déconnexion

**Accessibilité & UX**

- **NFR17:** L'application doit respecter les standards WCAG 2.1 niveau AA minimum
- **NFR18:** Tous les éléments interactifs doivent être accessibles au clavier
- **NFR19:** Les contrastes de couleurs doivent respecter le ratio minimum 4.5:1
- **NFR20:** Les formulaires doivent avoir des labels explicites et des messages d'erreur clairs
- **NFR21:** L'application doit être entièrement responsive (mobile, tablette, desktop : 320px à 2560px)
- **NFR22:** L'application doit fonctionner sur les navigateurs modernes (Chrome 90+, Safari 14+, Firefox 88+, Edge 90+)
- **NFR23:** L'interface doit rester fluide avec animations à 60 FPS minimum

**Disponibilité & Fiabilité**

- **NFR24:** Le système doit viser un uptime de 99.5% (downtime maximum ~3h45/mois)
- **NFR25:** Les erreurs critiques (paiement, réservation) doivent être loggées et alertées immédiatement
- **NFR26:** Le système doit avoir une stratégie de backup quotidien avec rétention 30 jours
- **NFR27:** Les webhooks Stripe doivent être idempotents (gestion des doublons)
- **NFR28:** Les emails transactionnels doivent avoir un taux de délivrabilité > 95%

**Maintenabilité & Qualité Code**

- **NFR29:** Le code doit être TypeScript avec strict mode activé (type-safety totale)
- **NFR30:** Le code doit respecter les conventions ESLint + Prettier configurées
- **NFR31:** Les composants React doivent être documentés avec JSDoc ou Storybook
- **NFR32:** La couverture de tests devrait viser > 70% pour la logique métier critique
- **NFR33:** Le code doit être versionné sur Git avec commits conventionnels (Conventional Commits)
- **NFR34:** L'architecture doit permettre l'ajout de nouveaux chauffeurs sans refonte majeure

**Coûts & Budget**

- **NFR35:** Les coûts d'infrastructure doivent rester dans les tiers gratuits au lancement (0€/mois)
- **NFR36:** L'utilisation de Google Maps API doit rester sous 15k requêtes/mois (crédits gratuits)
- **NFR37:** Les coûts Stripe doivent être couverts par les commissions incluses dans les prix
- **NFR38:** Le scaling au-delà des tiers gratuits doit être progressive et justifiée par le ROI

**SEO & Marketing**

- **NFR39:** L'application doit avoir des meta tags optimisés pour chaque page (title, description, OG)
- **NFR40:** L'application doit générer un sitemap.xml automatiquement
- **NFR41:** L'application doit implémenter le Schema.org markup pour rich snippets (LocalBusiness, Service)
- **NFR42:** Les URLs doivent être SEO-friendly (slugs lisibles, structure hiérarchique)
- **NFR43:** Le temps de chargement doit être optimisé pour le SEO (Core Web Vitals)

---
