import { stringUtils } from '@src/features/transaction';

describe('stringUtils', () => {
  describe('uppercase', () => {
    it('should convert string to uppercase', () => {
      expect(stringUtils.uppercase('hello')).toBe('HELLO');
    });

    it('should handle mixed case', () => {
      expect(stringUtils.uppercase('HeLLo WoRLd')).toBe('HELLO WORLD');
    });

    it('should handle empty string', () => {
      expect(stringUtils.uppercase('')).toBe('');
    });

    it('should handle already uppercase string', () => {
      expect(stringUtils.uppercase('HELLO')).toBe('HELLO');
    });
  });

  describe('dateFormat', () => {
    it('should format date correctly', () => {
      const result = stringUtils.dateFormat('2024-06-01T10:00:00Z');
      expect(result).toMatch('1 Juni 2024');
    });

    it('should handle different dates', () => {
      const result = stringUtils.dateFormat('2023-12-25T00:00:00Z');
      expect(result).toMatch('25 Desember 2023');
    });
  });
});
