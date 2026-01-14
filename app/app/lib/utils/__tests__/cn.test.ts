/**
 * Test pour la fonction cn() - Vérifie que l'architecture fonctionne
 */
import { describe, it, expect } from 'vitest';

// Test import depuis le point d'entrée centralisé
import { cn } from '../index';

// Test import direct depuis cn.ts
import { cn as cnDirect } from '../cn';

describe('cn() function', () => {
  it('should merge classes correctly', () => {
    expect(cn('px-2', 'px-4')).toBe('px-4');
    expect(cn('text-red-500', 'text-blue-500')).toBe('text-blue-500');
  });

  it('should handle conditional classes', () => {
    expect(cn('px-2', false && 'px-4', 'py-1')).toBe('px-2 py-1');
  });

  it('should be accessible from both import paths', () => {
    // Vérifie que les deux imports fonctionnent
    expect(cn('test')).toBe(cnDirect('test'));
  });
});
