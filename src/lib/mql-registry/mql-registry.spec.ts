import { DestroyRef, Injector, Signal } from '@angular/core';
import { retain, release, MqRetainToken } from '../mql-registry';
import { _getRegistry, _resetRegistry } from './mql-registry';
import { MqlRegistry } from './mql-registry.models';

const createToken = (): MqRetainToken => Injector.create({ providers: [] }).get(DestroyRef);

const query = '(min-width: 768px)';

describe('MQL Registry', () => {
  beforeEach(() => _resetRegistry());

  describe('retain()', () => {
    it('should return a static signal when matchMedia is not available', () => {
      const token: MqRetainToken = createToken();
      const original: typeof globalThis.matchMedia = globalThis.matchMedia;
      Object.defineProperty(globalThis, 'matchMedia', { value: undefined });

      const signal: Signal<boolean> = retain(query, token, false);

      expect(typeof signal).toBe('function');
      expect(_getRegistry().size).toBe(0);

      Object.defineProperty(globalThis, 'matchMedia', { writable: true, value: original });
    });

    it('should return boolean signal and add query to registry', () => {
      const token: MqRetainToken = createToken();

      const signal: Signal<boolean> = retain(query, token, false);

      expect(typeof signal()).toBe('boolean');
      expect(_getRegistry().has(query)).toBe(true);
    });

    it('should reuse existing signal when called multiple times for same query', () => {
      const registry: MqlRegistry = _getRegistry();

      const signal1: Signal<boolean> = retain(query, createToken(), false);
      const signal2: Signal<boolean> = retain(query, createToken(), false);

      expect(signal1).toBe(signal2);
      expect(registry.size).toBe(1);
    });
  });

  describe('release()', () => {
    it('should remove query from registry and return true when released', () => {
      const token: MqRetainToken = createToken();

      retain(query, token, false);
      const released: boolean = release(query, token);

      expect(released).toBe(true);
      expect(_getRegistry().has(query)).toBe(false);
    });

    it('should return false when releasing non-existing query', () => {
      const token: MqRetainToken = createToken();

      const result: boolean = release(query, token);

      expect(result).toBe(false);
    });

    it('should only remove one token when multiple retainers exist', () => {
      const token1: MqRetainToken = createToken();
      const token2: MqRetainToken = createToken();

      retain(query, token1, false);
      retain(query, token2, false);
      const released: boolean = release(query, token1);

      expect(released).toBe(true);
      expect(_getRegistry().has(query)).toBe(true);
    });
  });
});
