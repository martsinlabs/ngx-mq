import { signal } from '@angular/core';
import { and, or, not } from './composition';

describe('Combinators', () => {
  describe('and()', () => {
    it('is true only when every condition is true and reacts to changes', () => {
      const a = signal(true);
      const b = signal(true);
      const result = and(a, b);

      expect(result()).toBe(true);

      b.set(false);
      expect(result()).toBe(false);
    });

    it('returns true for an empty call (vacuous truth)', () => {
      expect(and()()).toBe(true);
    });

    it('exposes a readable debug label', () => {
      expect(and(signal(true)).toString()).toContain('and(');
    });
  });

  describe('or()', () => {
    it('is true when at least one condition is true and reacts to changes', () => {
      const a = signal(false);
      const b = signal(false);
      const result = or(a, b);

      expect(result()).toBe(false);

      b.set(true);
      expect(result()).toBe(true);
    });

    it('returns false for an empty call', () => {
      expect(or()()).toBe(false);
    });
  });

  describe('not()', () => {
    it('negates the condition and reacts to changes', () => {
      const a = signal(false);
      const result = not(a);

      expect(result()).toBe(true);

      a.set(true);
      expect(result()).toBe(false);
    });
  });

  describe('label composition', () => {
    it('nests inner ngx-mq descriptors without double-wrapping', () => {
      const a = signal(true);
      a.toString = () => '[NgxMq Signal: up(md)]';

      expect(not(a).toString()).toBe('[NgxMq Signal: not(up(md))]');
    });
  });
});
