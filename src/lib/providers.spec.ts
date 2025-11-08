import {
  provideBreakpoints,
  provideTailwindBreakpoints,
  provideBootstrapBreakpoints,
  provideMaterialBreakpoints,
  provideBreakpointEpsilon,
  provideSsrValue,
} from './providers';
import {
  TAILWIND_BREAKPOINTS,
  BOOTSTRAP_BREAKPOINTS,
  MATERIAL_BREAKPOINTS,
  DEFAULT_BREAKPOINT_EPSILON,
} from './constants';
import { MQ_BREAKPOINT_EPSILON, MQ_BREAKPOINTS, NGX_MQ_SSR_VALUE } from './tokens';
import { ValueProvider } from '@angular/core';

describe('providers', () => {
  describe('provideBreakpoints()', () => {
    it('should return a provider with given breakpoints', () => {
      const provider = provideBreakpoints(TAILWIND_BREAKPOINTS) as ValueProvider;

      expect(provider.provide).toBe(MQ_BREAKPOINTS);
      expect(provider.useValue).toEqual(TAILWIND_BREAKPOINTS);
    });
  });

  describe('provideTailwindBreakpoints()', () => {
    it('should return Tailwind breakpoints provider', () => {
      const provider = provideTailwindBreakpoints() as ValueProvider;

      expect(provider.provide).toBe(MQ_BREAKPOINTS);
      expect(provider.useValue).toEqual(TAILWIND_BREAKPOINTS);
    });
  });

  describe('provideBootstrapBreakpoints()', () => {
    it('should return Bootstrap breakpoints provider', () => {
      const provider = provideBootstrapBreakpoints() as ValueProvider;

      expect(provider.provide).toBe(MQ_BREAKPOINTS);
      expect(provider.useValue).toEqual(BOOTSTRAP_BREAKPOINTS);
    });
  });

  describe('provideMaterialBreakpoints()', () => {
    it('should return Material breakpoints provider', () => {
      const provider = provideMaterialBreakpoints() as ValueProvider;

      expect(provider.provide).toBe(MQ_BREAKPOINTS);
      expect(provider.useValue).toEqual(MATERIAL_BREAKPOINTS);
    });
  });

  describe('provideBreakpointEpsilon()', () => {
    it('should return epsilon provider with given value', () => {
      const provider = provideBreakpointEpsilon(DEFAULT_BREAKPOINT_EPSILON) as ValueProvider;

      expect(provider.provide).toBe(MQ_BREAKPOINT_EPSILON);
      expect(provider.useValue).toBe(DEFAULT_BREAKPOINT_EPSILON);
    });

    it('should fallback to default epsilon when no argument is provided', () => {
      const provider = provideBreakpointEpsilon() as ValueProvider;

      expect(provider.provide).toBe(MQ_BREAKPOINT_EPSILON);
      expect(provider.useValue).toBe(DEFAULT_BREAKPOINT_EPSILON);
    });
  });

  describe('provideSsrValue()', () => {
    it('should return SSR value provider with given value', () => {
      const provider = provideSsrValue(true) as ValueProvider;

      expect(provider.provide).toBe(NGX_MQ_SSR_VALUE);
      expect(provider.useValue).toBe(true);
    });
  });
});
