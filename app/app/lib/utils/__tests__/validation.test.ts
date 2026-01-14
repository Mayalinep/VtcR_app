import { describe, it, expect } from 'vitest';
import {
  validateEmail,
  validatePhone,
  validateRequired,
  validateMinLength,
  validateMaxLength,
  validatePostalCode,
  validateUrl,
} from '../validation';

describe('validateEmail', () => {
  it('should validate correct emails', () => {
    expect(validateEmail('test@example.com')).toBe(true);
    expect(validateEmail('user.name@domain.co.uk')).toBe(true);
    expect(validateEmail('user+tag@example.com')).toBe(true);
  });

  it('should reject invalid emails', () => {
    expect(validateEmail('invalid-email')).toBe(false);
    expect(validateEmail('@example.com')).toBe(false);
    expect(validateEmail('user@')).toBe(false);
    expect(validateEmail('user@domain')).toBe(false);
    expect(validateEmail('')).toBe(false);
  });
});

describe('validatePhone', () => {
  it('should validate French phone numbers', () => {
    expect(validatePhone('0612345678')).toBe(true);
    expect(validatePhone('0712345678')).toBe(true);
    expect(validatePhone('+33612345678')).toBe(true);
    expect(validatePhone('+33712345678')).toBe(true);
  });

  it('should handle formatted phone numbers', () => {
    expect(validatePhone('06 12 34 56 78')).toBe(true);
    expect(validatePhone('+33 6 12 34 56 78')).toBe(true);
  });

  it('should reject invalid phone numbers', () => {
    expect(validatePhone('123456789')).toBe(false);
    expect(validatePhone('0512345678')).toBe(false); // Ne commence pas par 06/07
    expect(validatePhone('06123456')).toBe(false); // Trop court
    expect(validatePhone('')).toBe(false);
  });
});

describe('validateRequired', () => {
  it('should validate non-empty strings', () => {
    expect(validateRequired('Hello')).toBe(true);
    expect(validateRequired('Test 123')).toBe(true);
  });

  it('should reject empty or whitespace-only strings', () => {
    expect(validateRequired('')).toBe(false);
    expect(validateRequired('   ')).toBe(false);
    expect(validateRequired('\t\n')).toBe(false);
  });
});

describe('validateMinLength', () => {
  it('should validate strings with minimum length', () => {
    expect(validateMinLength('Hello', 3)).toBe(true);
    expect(validateMinLength('Test', 4)).toBe(true);
  });

  it('should reject strings shorter than minimum', () => {
    expect(validateMinLength('Hi', 3)).toBe(false);
    expect(validateMinLength('', 5)).toBe(false);
  });
});

describe('validateMaxLength', () => {
  it('should validate strings within maximum length', () => {
    expect(validateMaxLength('Hello', 10)).toBe(true);
    expect(validateMaxLength('Test', 4)).toBe(true);
  });

  it('should reject strings longer than maximum', () => {
    expect(validateMaxLength('This is too long', 10)).toBe(false);
  });
});

describe('validatePostalCode', () => {
  it('should validate French postal codes', () => {
    expect(validatePostalCode('75001')).toBe(true);
    expect(validatePostalCode('13001')).toBe(true);
    expect(validatePostalCode('69000')).toBe(true);
  });

  it('should reject invalid postal codes', () => {
    expect(validatePostalCode('1234')).toBe(false); // Trop court
    expect(validatePostalCode('123456')).toBe(false); // Trop long
    expect(validatePostalCode('ABCDE')).toBe(false); // Lettres
    expect(validatePostalCode('')).toBe(false);
  });
});

describe('validateUrl', () => {
  it('should validate correct URLs', () => {
    expect(validateUrl('https://example.com')).toBe(true);
    expect(validateUrl('http://example.com')).toBe(true);
    expect(validateUrl('https://www.example.com/path')).toBe(true);
  });

  it('should reject invalid URLs', () => {
    expect(validateUrl('not-a-url')).toBe(false);
    expect(validateUrl('example.com')).toBe(false); // Pas de protocol
    expect(validateUrl('')).toBe(false);
  });
});
