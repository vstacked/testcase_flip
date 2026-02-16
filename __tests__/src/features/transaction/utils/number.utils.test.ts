import { numberUtils } from '@src/features/transaction';

describe('numberUtils', () => {
  describe('formatAmount', () => {
    it('should format amount with Rp prefix', () => {
      const result = numberUtils.formatAmount(100000);
      expect(result).toContain('Rp100.000');
    });

    it('should handle zero', () => {
      expect(numberUtils.formatAmount(0)).toBe('Rp0');
    });

    it('should handle small amounts', () => {
      const result = numberUtils.formatAmount(50);
      expect(result).toBe('Rp50');
    });
  });
});
