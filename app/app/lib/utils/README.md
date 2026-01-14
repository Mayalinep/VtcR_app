# Utils - Utilitaires du projet

Ce dossier contient tous les utilitaires réutilisables du projet VTC Rachel.

## Structure

```
utils/
├── cn.ts          # Fonction pour fusionner les classes Tailwind (ShadCN UI)
├── format.ts      # Formatage (prix, dates, téléphones, distances)
├── validation.ts  # Validation (emails, téléphones, champs requis)
├── constants.ts   # Constantes globales (branding, contact, etc.)
└── index.ts       # Point d'entrée centralisé (exporte tout)
```

## Utilisation

### Import depuis le point d'entrée centralisé

```typescript
// ✅ Recommandé : Import depuis app/lib/utils
import { formatPrice, validateEmail, cn, BRAND } from '@/app/lib/utils';
```

### Import depuis un fichier spécifique

```typescript
// ✅ Possible : Import direct depuis un fichier
import { formatPrice } from '@/app/lib/utils/format';
import { validateEmail } from '@/app/lib/utils/validation';
import { cn } from '@/app/lib/utils/cn';
```

### Import pour ShadCN UI

```typescript
// ✅ Compatible ShadCN : Import depuis @/lib/utils
import { cn } from '@/lib/utils';
// Note: Ce chemin réexporte depuis app/app/lib/utils/cn.ts
```

## Architecture

- **Source de vérité** : `app/app/lib/utils/`
- **Point d'entrée** : `app/app/lib/utils/index.ts`
- **Compatibilité ShadCN** : `app/lib/utils.ts` (réexporte `cn()`)

Cette architecture garantit :
- ✅ Un seul endroit pour tous les utilitaires
- ✅ Compatibilité avec ShadCN UI
- ✅ Clarté pour les nouveaux développeurs
- ✅ Maintenabilité à long terme
