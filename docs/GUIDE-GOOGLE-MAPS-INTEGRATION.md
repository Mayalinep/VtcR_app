# Guide Technique : Intégration Google Maps API

**Pour :** Développeurs débutants
**Niveau :** Pédagogique avec explications détaillées
**Objectif :** Comprendre comment fonctionne Google Maps API et l'implémenter correctement

---

## 📚 Table des matières

1. [Comprendre Google Maps Platform](#1-comprendre-google-maps-platform)
2. [Les APIs dont on a besoin](#2-les-apis-dont-on-a-besoin)
3. [Architecture de sécurité](#3-architecture-de-sécurité)
4. [Guide de configuration](#4-guide-de-configuration)
5. [Implémentation technique](#5-implémentation-technique)
6. [Debugging et troubleshooting](#6-debugging-et-troubleshooting)

---

## 1. Comprendre Google Maps Platform

### Qu'est-ce que c'est ?

**Google Maps Platform** est un ensemble de services web (APIs) fournis par Google qui permettent d'intégrer des fonctionnalités de cartographie et de géolocalisation dans nos applications.

### Comment ça marche ?

```
┌─────────────────┐
│  Ton site web   │
└────────┬────────┘
         │ 1. Requête HTTP avec ta clé API
         ▼
┌─────────────────────────┐
│  Google Maps Platform   │
│  (Serveurs de Google)   │
└────────┬────────────────┘
         │ 2. Réponse JSON avec les données
         ▼
┌─────────────────┐
│  Ton site web   │
│  (Affiche les   │
│   résultats)    │
└─────────────────┘
```

**Principe de base :**
- Tu fais une **requête HTTP** à Google avec ta **clé API**
- Google vérifie que ta clé est valide
- Google te renvoie les **données** (distance, adresses, etc.)
- Tu **paies** selon le nombre de requêtes (mais 200$/mois gratuits)

### Pourquoi une clé API ?

La clé API sert à :
- **Identifier** qui utilise le service (toi ? Rachel ? un hackeur ?)
- **Facturer** la bonne personne
- **Limiter** l'usage si dépassement de quota
- **Sécuriser** pour éviter les abus

**Important :** Cette clé est comme un mot de passe bancaire. Ne JAMAIS la mettre en public (GitHub, code frontend visible, etc.).

---

## 2. Les APIs dont on a besoin

Google Maps Platform contient **18 APIs différentes**. On n'en utilise que **2** pour notre projet.

### 2.1 Places API (Autocomplete)

**À quoi ça sert ?**
Quand l'utilisateur tape "Tour Eif", l'API suggère "Tour Eiffel, Paris" automatiquement.

**Exemple de requête :**
```
GET https://maps.googleapis.com/maps/api/place/autocomplete/json
  ?input=Tour+Eif
  &key=TA_CLE_API
  &components=country:fr
```

**Exemple de réponse :**
```json
{
  "predictions": [
    {
      "description": "Tour Eiffel, Avenue Anatole France, Paris, France",
      "place_id": "ChIJLU7jZClu5kcR4PcOOO6p3I0"
    },
    {
      "description": "Avenue de la Tour Eiffel, Paris, France",
      "place_id": "ChIJd_Y0eZxv5kcRYYIHYgqGArw"
    }
  ]
}
```

**Pourquoi on en a besoin ?**
- Évite les fautes de frappe ("par1s" → suggère "Paris")
- Donne des adresses complètes et précises
- Meilleure expérience utilisateur (moins de clics)

**Coût :** ~2.83€ pour 1000 requêtes (mais inclus dans les 200$ gratuits)

---

### 2.2 Distance Matrix API

**À quoi ça sert ?**
Calcule la **distance réelle** (en km) et le **temps de trajet** entre 2 adresses en suivant les routes.

**Différence avec calcul basique :**
```
Calcul "à vol d'oiseau" (formule haversine) :
  Paris → Versailles = 14 km

Calcul Google Maps (routes réelles) :
  Paris → Versailles = 23 km (suit les routes, autoroutes, etc.)
```

**Exemple de requête :**
```
GET https://maps.googleapis.com/maps/api/distancematrix/json
  ?origins=Tour+Eiffel,Paris
  &destinations=Chateau+de+Versailles
  &key=TA_CLE_API
  &mode=driving
```

**Exemple de réponse :**
```json
{
  "rows": [
    {
      "elements": [
        {
          "distance": {
            "text": "23.1 km",
            "value": 23100
          },
          "duration": {
            "text": "35 mins",
            "value": 2100
          },
          "status": "OK"
        }
      ]
    }
  ]
}
```

**Pourquoi on en a besoin ?**
- Calcul **précis** de la distance (pas à vol d'oiseau)
- Prend en compte **les routes** (autoroutes, périph, etc.)
- Permet de calculer : `Prix = distance.value / 1000 * 2` (2€/km)

**Coût :** ~5€ pour 1000 requêtes (mais inclus dans les 200$ gratuits)

---

## 3. Architecture de sécurité

### ⚠️ PIÈGE À ÉVITER (très important)

**JAMAIS faire ça :**
```tsx
// ❌ MAUVAIS - Clé API visible dans le code frontend
const response = await fetch(
  `https://maps.googleapis.com/maps/api/distancematrix/json?key=AIzaSyABC123...`
);
```

**Pourquoi c'est dangereux ?**
- Le code frontend est **visible** par tout le monde (DevTools → Sources)
- N'importe qui peut **copier ta clé API**
- Un bot peut faire **100 000 requêtes** et te coûter 500€
- Google **ne rembourse pas** les abus

### ✅ Architecture sécurisée (ce qu'on fait)

```
┌────────────────────────────────────────────────────────────┐
│                      NAVIGATEUR (Public)                    │
│                                                             │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  PriceEstimator Component (Frontend React)           │  │
│  │                                                       │  │
│  │  const data = await fetch('/api/calculate-price', {  │  │
│  │    method: 'POST',                                    │  │
│  │    body: JSON.stringify({ from, to })                │  │
│  │  })                                                   │  │
│  │                                                       │  │
│  │  ❌ PAS DE CLÉ API ICI                                │  │
│  └──────────────────────────────────────────────────────┘  │
│                           │                                 │
└───────────────────────────┼─────────────────────────────────┘
                            │ HTTP POST { from, to }
                            │ (pas de clé API)
                            ▼
┌────────────────────────────────────────────────────────────┐
│              SERVEUR NEXT.JS (Privé - Vercel)              │
│                                                             │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  /api/calculate-price/route.ts (Backend Node.js)     │  │
│  │                                                       │  │
│  │  const apiKey = process.env.GOOGLE_MAPS_API_KEY      │  │
│  │  ✅ Clé API lue depuis variables d'environnement      │  │
│  │                                                       │  │
│  │  const response = await fetch(                       │  │
│  │    `https://maps.googleapis.com/...?key=${apiKey}`   │  │
│  │  )                                                    │  │
│  └──────────────────────────────────────────────────────┘  │
│                           │                                 │
└───────────────────────────┼─────────────────────────────────┘
                            │ HTTP GET avec clé API
                            │ (depuis serveur sécurisé)
                            ▼
┌────────────────────────────────────────────────────────────┐
│              GOOGLE MAPS API (Serveurs Google)             │
│                                                             │
│  - Vérifie la clé API                                      │
│  - Calcule la distance                                     │
│  - Retourne { distance: 23100, duration: 2100 }           │
│                                                             │
└────────────────────────────────────────────────────────────┘
```

**Flux de données :**
1. **Frontend** → Envoie `{ from: "Paris", to: "Versailles" }` à ton API
2. **Ton API (Backend)** → Lit la clé API depuis `.env`, appelle Google Maps
3. **Google Maps** → Retourne la distance à ton API
4. **Ton API** → Calcule le prix, retourne au Frontend
5. **Frontend** → Affiche le prix

**Avantages :**
- ✅ Clé API jamais exposée au public
- ✅ Tu peux ajouter des **vérifications** (rate limiting, validation)
- ✅ Tu peux **cacher** les prix calculés (économise des appels Google)
- ✅ Tu contrôles **qui peut utiliser** ton API (CORS, auth, etc.)

---

## 4. Guide de configuration

### Étape 1 : Créer le compte Google Cloud

**Pour Rachel (à faire une seule fois) :**

1. Aller sur https://console.cloud.google.com/
2. Se connecter avec un compte Google (ou en créer un)
3. Accepter les conditions d'utilisation
4. Configurer le compte de facturation :
   - Carte bancaire requise (mais **200$/mois gratuits**)
   - Aucun prélèvement automatique sans confirmation
   - Google prévient avant de facturer

### Étape 2 : Créer un projet

1. En haut de la page, cliquer sur "Sélectionner un projet" → "Nouveau projet"
2. Nom du projet : **"VTC Rachel Website"** (ou ce que tu veux)
3. Cliquer sur "Créer"

### Étape 3 : Activer les APIs

1. Menu hamburger (☰) → "APIs et services" → "Bibliothèque"
2. Chercher **"Places API"** → Cliquer → Activer
3. Chercher **"Distance Matrix API"** → Cliquer → Activer

### Étape 4 : Créer une clé API

1. Menu hamburger (☰) → "APIs et services" → "Identifiants"
2. Cliquer sur "Créer des identifiants" → "Clé API"
3. Une clé apparaît : `AIzaSyABC123xyz...` → **Copier**

### Étape 5 : Restreindre la clé (TRÈS IMPORTANT)

**Pourquoi ?** Pour éviter qu'un voleur utilise ta clé pour autre chose.

1. Cliquer sur la clé créée pour l'éditer
2. **Restrictions d'API** :
   - Sélectionner "Limiter la clé aux APIs sélectionnées"
   - Cocher uniquement :
     - ✅ Places API
     - ✅ Distance Matrix API
3. **Restrictions d'application** (optionnel mais recommandé) :
   - Sélectionner "Adresses IP" ou "Référents HTTP"
   - Ajouter : `vercel.app/*` (ou ton domaine)
4. Cliquer sur "Enregistrer"

### Étape 6 : Donner la clé à la dev (toi)

Rachel doit t'envoyer la clé de manière **sécurisée** :
- ✅ Email chiffré
- ✅ Message Signal/WhatsApp (qui s'efface)
- ✅ En personne (elle te montre, tu copies)
- ❌ PAS par SMS
- ❌ PAS par Messenger/Instagram
- ❌ PAS dans un Google Doc public

---

## 5. Implémentation technique

### 5.1 Configuration des variables d'environnement

**Fichier : `.env.local` (à créer à la racine du projet `app/`)**

```bash
# Google Maps API Key (de Rachel)
GOOGLE_MAPS_API_KEY=AIzaSyABC123xyz...

# Prix par kilomètre (en euros)
PRICE_PER_KM=2

# Prix minimum (optionnel, pour les courses très courtes)
MINIMUM_PRICE=15
```

**Important :**
- Ce fichier est dans `.gitignore` → **ne sera jamais sur GitHub**
- Sur Vercel, tu ajouteras ces variables dans les "Environment Variables"

**Fichier : `.env.example` (à créer pour documentation)**

```bash
# Google Maps API Key
GOOGLE_MAPS_API_KEY=votre_cle_api_ici

# Configuration tarifs
PRICE_PER_KM=2
MINIMUM_PRICE=15
```

Celui-ci **peut être sur GitHub** car il ne contient pas la vraie clé.

---

### 5.2 Créer l'API Route Next.js

**Fichier : `app/api/calculate-price/route.ts`**

```typescript
import { NextRequest, NextResponse } from 'next/server';

/**
 * API Route : Calcul de prix de course VTC
 *
 * Ce que fait cette API :
 * 1. Reçoit les adresses de départ et d'arrivée depuis le frontend
 * 2. Appelle Google Distance Matrix API (avec la clé secrète)
 * 3. Calcule le prix : distance × 2€/km
 * 4. Retourne le prix au frontend
 *
 * Sécurité : La clé API Google n'est JAMAIS exposée au navigateur
 */

// Configuration
const GOOGLE_MAPS_API_KEY = process.env.GOOGLE_MAPS_API_KEY;
const PRICE_PER_KM = parseFloat(process.env.PRICE_PER_KM || '2');
const MINIMUM_PRICE = parseFloat(process.env.MINIMUM_PRICE || '15');

// Types TypeScript pour la réponse Google
interface GoogleDistanceMatrixResponse {
  rows: Array<{
    elements: Array<{
      distance?: {
        text: string;  // "23.1 km"
        value: number; // 23100 (en mètres)
      };
      duration?: {
        text: string;  // "35 mins"
        value: number; // 2100 (en secondes)
      };
      status: string;  // "OK" | "ZERO_RESULTS" | "NOT_FOUND"
    }>;
  }>;
  status: string;
}

/**
 * POST /api/calculate-price
 *
 * Body attendu :
 * {
 *   "departure": "Tour Eiffel, Paris",
 *   "arrival": "Château de Versailles, Versailles"
 * }
 *
 * Réponse :
 * {
 *   "success": true,
 *   "data": {
 *     "distance": 23.1,       // en km
 *     "duration": 35,         // en minutes
 *     "price": 46.2,          // en euros
 *     "formattedDistance": "23.1 km",
 *     "formattedDuration": "35 min"
 *   }
 * }
 */
export async function POST(request: NextRequest) {
  try {
    // 1. Vérifier que la clé API existe
    if (!GOOGLE_MAPS_API_KEY) {
      console.error('❌ GOOGLE_MAPS_API_KEY manquante dans .env');
      return NextResponse.json(
        { success: false, error: 'Configuration serveur manquante' },
        { status: 500 }
      );
    }

    // 2. Parser le body de la requête
    const body = await request.json();
    const { departure, arrival } = body;

    // 3. Valider les données
    if (!departure || !arrival) {
      return NextResponse.json(
        {
          success: false,
          error: 'Adresses de départ et d\'arrivée requises'
        },
        { status: 400 }
      );
    }

    // 4. Construire l'URL de l'API Google
    const googleApiUrl = new URL(
      'https://maps.googleapis.com/maps/api/distancematrix/json'
    );

    googleApiUrl.searchParams.append('origins', departure);
    googleApiUrl.searchParams.append('destinations', arrival);
    googleApiUrl.searchParams.append('mode', 'driving'); // En voiture
    googleApiUrl.searchParams.append('language', 'fr');  // Réponses en français
    googleApiUrl.searchParams.append('key', GOOGLE_MAPS_API_KEY);

    // 5. Appeler l'API Google Maps
    console.log('📍 Calcul de distance:', { departure, arrival });

    const response = await fetch(googleApiUrl.toString());

    if (!response.ok) {
      throw new Error(`Google API error: ${response.status}`);
    }

    const data: GoogleDistanceMatrixResponse = await response.json();

    // 6. Vérifier le statut de la réponse
    if (data.status !== 'OK') {
      console.error('❌ Google API status:', data.status);
      return NextResponse.json(
        {
          success: false,
          error: 'Impossible de calculer l\'itinéraire'
        },
        { status: 400 }
      );
    }

    // 7. Extraire la distance et la durée
    const element = data.rows[0]?.elements[0];

    if (!element || element.status !== 'OK' || !element.distance) {
      return NextResponse.json(
        {
          success: false,
          error: 'Trajet introuvable entre ces deux adresses'
        },
        { status: 400 }
      );
    }

    // 8. Calculer le prix
    const distanceInMeters = element.distance.value;
    const distanceInKm = distanceInMeters / 1000; // Convertir mètres → km

    const durationInSeconds = element.duration?.value || 0;
    const durationInMinutes = Math.round(durationInSeconds / 60);

    // Prix = distance × tarif par km (minimum 15€)
    let calculatedPrice = distanceInKm * PRICE_PER_KM;

    // Appliquer le prix minimum
    if (calculatedPrice < MINIMUM_PRICE) {
      calculatedPrice = MINIMUM_PRICE;
    }

    // Arrondir à 2 décimales
    const price = Math.round(calculatedPrice * 100) / 100;

    // 9. Construire la réponse
    const result = {
      distance: Math.round(distanceInKm * 10) / 10, // 1 décimale
      duration: durationInMinutes,
      price: price,
      formattedDistance: `${Math.round(distanceInKm * 10) / 10} km`,
      formattedDuration: `${durationInMinutes} min`,
      breakdown: {
        distanceKm: distanceInKm,
        pricePerKm: PRICE_PER_KM,
        basePrice: distanceInKm * PRICE_PER_KM,
        minimumPrice: MINIMUM_PRICE,
        appliedMinimum: calculatedPrice < MINIMUM_PRICE
      }
    };

    console.log('✅ Prix calculé:', result);

    return NextResponse.json({
      success: true,
      data: result
    });

  } catch (error) {
    console.error('❌ Erreur API calculate-price:', error);

    return NextResponse.json(
      {
        success: false,
        error: 'Erreur lors du calcul de prix'
      },
      { status: 500 }
    );
  }
}
```

**Explications ligne par ligne :**

- **Ligne 8-10** : On lit les variables d'environnement (clé API, tarifs)
- **Ligne 13-24** : On définit les types TypeScript pour la réponse Google (pour avoir l'autocomplétion)
- **Ligne 48-54** : On vérifie que la clé API est présente (sinon erreur 500)
- **Ligne 57-60** : On récupère `departure` et `arrival` depuis le body JSON
- **Ligne 63-70** : On valide que les deux adresses sont fournies
- **Ligne 73-80** : On construit l'URL avec les paramètres (comme des query params)
- **Ligne 83-91** : On fait la requête HTTP à Google
- **Ligne 94-102** : On vérifie que Google a bien répondu (status OK)
- **Ligne 105-115** : On extrait la distance et la durée de la réponse
- **Ligne 118-129** : On calcule le prix : `distance × 2€` avec minimum 15€
- **Ligne 132-145** : On construit l'objet de réponse avec toutes les infos
- **Ligne 150** : On retourne le JSON au frontend

---

### 5.3 Modifier le PriceEstimator (Frontend)

**Fichier : `app/app/components/forms/PriceEstimator.tsx`**

On remplace le calcul fictif par un vrai appel API.

**Modifications à faire :**

```typescript
// AVANT (calcul fictif)
const calculatePrice = () => {
  if (departure && arrival) {
    setIsCalculating(true);

    setTimeout(() => {
      const basePrice = Math.floor(Math.random() * 40) + 45;
      setEstimatedPrice(basePrice);
      setIsCalculating(false);

      animate(count, basePrice, {
        duration: 1,
        ease: "easeOut"
      });
    }, 500);
  }
};
```

**APRÈS (vraie API) :**

```typescript
// État pour stocker les détails du trajet
const [tripDetails, setTripDetails] = useState<{
  distance: string;
  duration: string;
} | null>(null);

const calculatePrice = async () => {
  if (!departure || !arrival) return;

  setIsCalculating(true);

  try {
    // Appel à notre API backend
    const response = await fetch('/api/calculate-price', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        departure: departure,
        arrival: arrival
      })
    });

    const result = await response.json();

    if (result.success && result.data) {
      // On a reçu le prix !
      const { price, formattedDistance, formattedDuration } = result.data;

      // Animation du compteur de prix
      setEstimatedPrice(price);
      animate(count, price, {
        duration: 1,
        ease: "easeOut"
      });

      // Stocker les détails
      setTripDetails({
        distance: formattedDistance,
        duration: formattedDuration
      });
    } else {
      // Erreur du backend
      alert(`Erreur : ${result.error || 'Impossible de calculer le prix'}`);
    }
  } catch (error) {
    // Erreur réseau
    console.error('Erreur lors du calcul:', error);
    alert('Erreur de connexion. Veuillez réessayer.');
  } finally {
    setIsCalculating(false);
  }
};
```

**Affichage des détails du trajet (dans le JSX) :**

```tsx
{estimatedPrice && tripDetails && !isCalculating && (
  <motion.div
    initial={{ opacity: 0, y: -10 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -10 }}
    transition={{ duration: 0.4 }}
    className="mb-6"
  >
    <div className="bg-gray-50 rounded-xl p-5">
      <div className="flex items-center justify-between mb-3">
        <span className="text-sm font-medium text-gray-600">
          Tarif estimé
        </span>
        <span
          className="text-3xl font-bold"
          style={{
            color: 'var(--forest-green)',
            fontFamily: 'var(--font-playfair)'
          }}
        >
          {displayPrice}€
        </span>
      </div>

      {/* Détails du trajet */}
      <div className="flex items-center gap-4 text-xs text-gray-500 mb-2">
        <div className="flex items-center gap-1">
          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
          </svg>
          <span>{tripDetails.distance}</span>
        </div>
        <div className="flex items-center gap-1">
          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>{tripDetails.duration}</span>
        </div>
      </div>

      <p className="text-xs text-gray-500">
        Prix indicatif toutes taxes comprises
      </p>
    </div>
  </motion.div>
)}
```

---

### 5.4 Ajouter l'autocomplétion Places API (bonus)

**Package à installer :**
```bash
npm install @googlemaps/js-api-loader
```

**Création d'un hook personnalisé :**

**Fichier : `app/app/lib/hooks/usePlacesAutocomplete.ts`**

```typescript
import { useState, useEffect, useRef } from 'react';
import { Loader } from '@googlemaps/js-api-loader';

/**
 * Hook personnalisé pour l'autocomplétion Google Places
 *
 * Usage :
 * const { inputRef } = usePlacesAutocomplete((place) => {
 *   console.log('Adresse sélectionnée:', place);
 * });
 *
 * <input ref={inputRef} type="text" />
 */
export function usePlacesAutocomplete(
  onPlaceSelected: (place: google.maps.places.PlaceResult) => void
) {
  const inputRef = useRef<HTMLInputElement>(null);
  const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(null);

  useEffect(() => {
    if (!inputRef.current) return;

    // Charger Google Maps JavaScript API
    const loader = new Loader({
      apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '',
      version: 'weekly',
      libraries: ['places']
    });

    loader.load().then(() => {
      if (!inputRef.current) return;

      // Créer l'autocomplétion
      autocompleteRef.current = new google.maps.places.Autocomplete(
        inputRef.current,
        {
          componentRestrictions: { country: 'fr' }, // Limiter à la France
          fields: ['formatted_address', 'geometry', 'name']
        }
      );

      // Écouter la sélection
      autocompleteRef.current.addListener('place_changed', () => {
        const place = autocompleteRef.current?.getPlace();
        if (place) {
          onPlaceSelected(place);
        }
      });
    });

    return () => {
      // Cleanup
      if (autocompleteRef.current) {
        google.maps.event.clearInstanceListeners(autocompleteRef.current);
      }
    };
  }, [onPlaceSelected]);

  return { inputRef };
}
```

**IMPORTANT** : Pour Places Autocomplete côté client, tu as besoin d'une **deuxième clé API** :
- Une clé **server-side** (pour Distance Matrix) → dans `.env.local`
- Une clé **client-side** (pour Places) → dans `.env.local` avec préfixe `NEXT_PUBLIC_`

**Ajouter à `.env.local` :**
```bash
# Server-side (backend)
GOOGLE_MAPS_API_KEY=AIzaSy...

# Client-side (frontend)
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=AIzaSy...
```

Tu peux utiliser **la même clé** pour les deux, ou créer 2 clés différentes (plus sécurisé).

---

## 6. Debugging et Troubleshooting

### Problème 1 : "Invalid API key"

**Symptôme :** Erreur 400 ou 403 de Google

**Causes possibles :**
- ✅ Clé API mal copiée (espace avant/après)
- ✅ APIs pas activées dans Google Cloud Console
- ✅ Restrictions trop strictes sur la clé

**Solution :**
1. Vérifier que la clé est exacte (pas d'espace)
2. Vérifier que Places API + Distance Matrix API sont activées
3. Temporairement retirer les restrictions pour tester

---

### Problème 2 : "ZERO_RESULTS"

**Symptôme :** Google retourne `status: "ZERO_RESULTS"`

**Causes possibles :**
- ✅ Adresse invalide ou trop vague
- ✅ Destination trop éloignée (hors France)

**Solution :**
```typescript
if (element.status === 'ZERO_RESULTS') {
  return NextResponse.json({
    success: false,
    error: 'Aucun itinéraire trouvé entre ces adresses. Vérifiez les adresses saisies.'
  }, { status: 400 });
}
```

---

### Problème 3 : Clé API visible dans le code

**Symptôme :** La clé apparaît dans DevTools → Sources

**Cause :** Tu as mis `NEXT_PUBLIC_` devant dans `.env.local`

**Solution :**
- ✅ Clé **server-side** : `GOOGLE_MAPS_API_KEY` (sans NEXT_PUBLIC_)
- ✅ Clé **client-side** : `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY` (avec NEXT_PUBLIC_)

---

### Problème 4 : Requêtes trop lentes

**Symptôme :** Calcul prend 3-5 secondes

**Solutions :**
1. **Mettre en cache** les résultats fréquents (Paris → Orly)
2. Utiliser **Redis** ou une DB pour stocker les calculs récents
3. **Debounce** les inputs (attendre que l'utilisateur finisse de taper)

---

### Debugging avec console.log

**Dans l'API Route :**
```typescript
console.log('📍 Requête reçue:', { departure, arrival });
console.log('🔑 Clé API présente:', !!GOOGLE_MAPS_API_KEY);
console.log('🌍 URL Google:', googleApiUrl.toString());
console.log('📊 Réponse Google:', JSON.stringify(data, null, 2));
console.log('💰 Prix calculé:', price);
```

**Dans le Frontend :**
```typescript
console.log('🚀 Envoi requête calcul prix');
console.log('📦 Body:', { departure, arrival });
console.log('✅ Réponse reçue:', result);
```

---

## 📝 Checklist finale

Avant de déployer en production, vérifie que :

- [ ] La clé API Google est dans `.env.local` (local) ET dans Vercel Environment Variables (prod)
- [ ] Les 2 APIs sont activées (Places + Distance Matrix)
- [ ] La clé API a des restrictions (IPs ou domaines autorisés)
- [ ] Le calcul retourne un prix cohérent (teste Paris → Versailles ≈ 46€)
- [ ] Les erreurs sont gérées gracieusement (message utilisateur clair)
- [ ] Les logs sont en place pour débugger en prod
- [ ] Le frontend affiche distance + durée + prix
- [ ] Le formulaire est désactivé pendant le calcul (évite double-requête)

---

## 🎓 Concepts clés à retenir

### 1. API REST
Une API REST communique avec des requêtes HTTP (GET, POST, etc.) et retourne du JSON.

### 2. Variables d'environnement
Secrets stockés dans `.env.local` (local) ou Vercel (prod), jamais dans le code.

### 3. Architecture client-server
Frontend → API Next.js → API Google → Réponse.
Le frontend ne communique JAMAIS directement avec Google.

### 4. Sécurité des clés API
Une clé API est comme un mot de passe. Jamais dans le code frontend, toujours côté serveur.

### 5. Gestion d'erreurs
Toujours prévoir que l'API externe peut échouer (réseau, quota dépassé, etc.).

---

## 🚀 Pour aller plus loin

**Optimisations avancées :**
- Cache Redis pour trajets fréquents (Paris → CDG)
- Rate limiting pour éviter les abus
- Webhooks pour monitoring des coûts Google
- Calcul alternatif si Google en panne (calcul à vol d'oiseau × 1.4)

**Autres APIs Google Maps utiles :**
- **Geocoding API** : Convertir adresse → coordonnées GPS
- **Directions API** : Afficher l'itinéraire sur une carte
- **Maps JavaScript API** : Carte interactive sur le site

---

*Guide créé le : Janvier 2026*
*Pour : Projet VTC Rachel*
*Niveau : Débutant avec explications détaillées*
