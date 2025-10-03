import { applyMaxEpsilon, normalizeBreakpoints, resolveBreakpoint, validateEpsilon } from './breakpoints.utils';
import { EnvironmentInjector, runInInjectionContext, Injector } from '@angular/core';
import { provideBreakpoints } from '../providers';
import { MQ_BREAKPOINT_EPSILON } from '../tokens';
import { TestBed } from '@angular/core/testing';

describe('resolveBreakpoint()', () => {
  it('should throw if no breakpoints were provided', () => {
    runInInjectionContext(TestBed.inject(EnvironmentInjector), () => {
      expect(() => resolveBreakpoint('md')).toThrow(/No breakpoints provided/);
    });
  });

  it('should throw if breakpoint does not exist', () => {
    const injector: Injector = Injector.create({
      providers: [provideBreakpoints({ md: 768 })],
      parent: TestBed.inject(EnvironmentInjector),
    });

    runInInjectionContext(injector, () => {
      expect(() => resolveBreakpoint('xl')).toThrow(/Breakpoint "xl" not found/);
    });
  });

  it('should return the numeric value if breakpoint exists', () => {
    const injector: Injector = Injector.create({
      providers: [provideBreakpoints({ md: 768 })],
      parent: TestBed.inject(EnvironmentInjector),
    });

    runInInjectionContext(injector, () => {
      expect(resolveBreakpoint('md')).toBe(768);
    });
  });
});

describe('normalizeBreakpoints()', () => {
  it('trims keys and keeps numeric values as-is', () => {
    const input = { ' sm ': 640, md: 768 };
    const out = normalizeBreakpoints(input);

    expect(new Set(Object.keys(out))).toEqual(new Set(['sm', 'md']));
    expect(out).toEqual({ sm: 640, md: 768 });
  });

  it('returns a new frozen object and does not mutate the input', () => {
    const input = { sm: 640 };
    const out = normalizeBreakpoints(input);

    expect(out).not.toBe(input);
    expect(Object.isFrozen(out)).toBe(true);
  });

  it('supports fractional values and preserves them', () => {
    const input = { sm: 639.5, md: 768.25 };
    const out = normalizeBreakpoints(input);

    expect(out.sm).toBeCloseTo(639.5);
    expect(out.md).toBeCloseTo(768.25);
  });
});

describe('validateEpsilon()', () => {
  it('should not throw for valid values in (0,1]', () => {
    expect(() => validateEpsilon(0.5)).not.toThrow();
    expect(() => validateEpsilon(1)).not.toThrow();
    expect(() => validateEpsilon(0.0001)).not.toThrow();
  });

  it('should throw for 0 or less', () => {
    expect(() => validateEpsilon(0)).toThrow();
    expect(() => validateEpsilon(-0.1)).toThrow();
    expect(() => validateEpsilon(-Infinity)).toThrow();
  });

  it('should throw for greater than 1', () => {
    expect(() => validateEpsilon(1.01)).toThrow();
    expect(() => validateEpsilon(2)).toThrow();
    expect(() => validateEpsilon(Infinity)).toThrow();
  });

  it('should throw for NaN or non-finite values', () => {
    expect(() => validateEpsilon(NaN)).toThrow();
  });
});

describe('applyMaxEpsilon()', () => {
  it('should use default epsilon (0.02) if none provided', () => {
    runInInjectionContext(TestBed.inject(EnvironmentInjector), () => {
      const result = applyMaxEpsilon(100);
      expect(result).toBe(99.98); // 100 - 0.02
    });
  });

  it('should use provided epsilon from DI', () => {
    const injector: Injector = Injector.create({
      providers: [{ provide: MQ_BREAKPOINT_EPSILON, useValue: 0.5 }],
      parent: TestBed.inject(EnvironmentInjector),
    });

    runInInjectionContext(injector, () => {
      const result = applyMaxEpsilon(100);
      expect(result).toBe(99.5); // 100 - 0.5
    });
  });
});
