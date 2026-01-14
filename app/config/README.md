# Config - Fichiers de Configuration

Ce dossier contient les fichiers de configuration pour les outils de développement.

## Structure

```
config/
├── vitest.config.ts    # Configuration Vitest (tests unitaires)
└── vitest.setup.ts      # Setup global pour les tests
```

## Fichiers de Config à la Racine

Certains fichiers de configuration **DOIVENT** rester à la racine de `app/` car Next.js les cherche là :

### Obligatoires (ne peuvent PAS être déplacés) :
- ✅ `next.config.ts` - Configuration Next.js (Next.js cherche ce fichier à la racine)
- ✅ `tsconfig.json` - Configuration TypeScript (Next.js et TypeScript le cherchent à la racine)
- ✅ `postcss.config.mjs` - Configuration PostCSS (Next.js le cherche à la racine)
- ✅ `eslint.config.mjs` - Configuration ESLint (ESLint le cherche à la racine)
- ✅ `components.json` - Configuration ShadCN UI (ShadCN le cherche à la racine)
- ✅ `package.json` - Dépendances npm (npm le cherche à la racine)

### Générés automatiquement (ne pas modifier) :
- ✅ `next-env.d.ts` - Types TypeScript générés par Next.js (généré automatiquement)
- ✅ `tsconfig.tsbuildinfo` - Cache TypeScript (généré automatiquement, ignoré par Git)

**⚠️ Ces fichiers ne peuvent PAS être déplacés sans casser Next.js/TypeScript/ESLint.**

## Tests

Les tests sont organisés à côté du code qu'ils testent :

```
app/lib/utils/
├── format.ts
├── validation.ts
└── __tests__/
    ├── format.test.ts
    └── validation.test.ts
```

C'est la pratique standard : **tests à côté du code**.
