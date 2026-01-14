/**
 * Test d'intégration - Vérifie que tous les chemins d'import fonctionnent
 */
import { describe, it, expect } from 'vitest';

// Test imports depuis différents chemins
import { cn as cnFromLibUtils } from '@/lib/utils';
import { cn as cnFromAppLibUtils } from '@/app/lib/utils/index';
import { cn as cnFromCnFile } from '@/app/lib/utils/cn';
import { formatPrice, validateEmail, BRAND } from '@/app/lib/utils/index';

describe('Import paths - Architecture verification', () => {
  it('should import cn() from @/lib/utils (ShadCN compatibility)', () => {
    // Test que ShadCN peut importer depuis @/lib/utils
    expect(typeof cnFromLibUtils).toBe('function');
    expect(cnFromLibUtils('px-2', 'px-4')).toBe('px-4');
  });

  it('should import cn() from @/app/lib/utils/index (centralized entry point)', () => {
    // Test que le point d'entrée centralisé fonctionne
    expect(typeof cnFromAppLibUtils).toBe('function');
    expect(cnFromAppLibUtils('text-red', 'text-blue')).toBe('text-blue');
  });

  it('should import cn() directly from cn.ts', () => {
    // Test que l'import direct fonctionne
    expect(typeof cnFromCnFile).toBe('function');
    expect(cnFromCnFile('py-1', 'py-2')).toBe('py-2');
  });

  it('should import all utilities from index.ts', () => {
    // Vérifie que cn() est exporté
    expect(typeof cnFromAppLibUtils).toBe('function');
    
    // Vérifie que les autres utilitaires sont exportés
    expect(typeof formatPrice).toBe('function');
    expect(typeof validateEmail).toBe('function');
    expect(BRAND).toBeDefined();
    expect(BRAND.name).toBe('VTC Rachel');
  });

  it('should have consistent cn() function from all import paths', () => {
    // Vérifie que cn() fonctionne de la même manière depuis tous les chemins
    const testClasses = 'px-2 py-1';
    const result1 = cnFromLibUtils(testClasses);
    const result2 = cnFromAppLibUtils(testClasses);
    const result3 = cnFromCnFile(testClasses);
    
    // Tous doivent retourner le même résultat
    expect(result1).toBe(result2);
    expect(result2).toBe(result3);
    expect(result1).toBe('px-2 py-1');
  });
});
