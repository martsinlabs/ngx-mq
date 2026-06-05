import { isDevMode, Provider } from '@angular/core';
import { MQ_BREAKPOINT_EPSILON, MQ_BREAKPOINTS, NGX_MQ_SSR_VALUE } from './tokens';
import { normalizeBreakpoints, validateEpsilon } from './utils/breakpoints.utils';
import { MqBreakpoints } from './models';
import {
  BOOTSTRAP_BREAKPOINTS,
  DEFAULT_BREAKPOINT_EPSILON,
  MATERIAL_BREAKPOINTS,
  TAILWIND_BREAKPOINTS,
} from './constants';

/**
 * Registers a custom breakpoint map, enabling {@link up}, {@link down} and {@link between}.
 *
 * Provide once at bootstrap, or at any injector level to scope/override breakpoints.
 *
 * @param bps - A {@link MqBreakpoints} map of names to minimum widths in pixels.
 * @returns An Angular {@link Provider}.
 *
 * @example
 * ```ts
 * bootstrapApplication(AppComponent, {
 *   providers: [provideBreakpoints({ sm: 640, md: 768, lg: 1024 })],
 * });
 * ```
 *
 * @category Providers
 */
export function provideBreakpoints(bps: MqBreakpoints): Provider {
  return { provide: MQ_BREAKPOINTS, useValue: normalizeBreakpoints(bps) };
}

/**
 * Registers the default Tailwind CSS breakpoints:
 * `sm: 640, md: 768, lg: 1024, xl: 1280, 2xl: 1536`.
 *
 * @returns An Angular {@link Provider}.
 * @category Providers
 */
export function provideTailwindBreakpoints(): Provider {
  return provideBreakpoints(TAILWIND_BREAKPOINTS);
}

/**
 * Registers the default Bootstrap breakpoints:
 * `sm: 576, md: 768, lg: 992, xl: 1200, xxl: 1400`.
 *
 * @returns An Angular {@link Provider}.
 * @category Providers
 */
export function provideBootstrapBreakpoints(): Provider {
  return provideBreakpoints(BOOTSTRAP_BREAKPOINTS);
}

/**
 * Registers the default Material 2 breakpoints:
 * `sm: 600, md: 905, lg: 1240, xl: 1440`.
 *
 * @returns An Angular {@link Provider}.
 * @category Providers
 */
export function provideMaterialBreakpoints(): Provider {
  return provideBreakpoints(MATERIAL_BREAKPOINTS);
}

/**
 * Sets the epsilon subtracted from exclusive upper bounds in {@link down} and
 * {@link between}, preventing adjacent ranges from overlapping.
 *
 * @param epsilon - A value in the range `(0, 1]`. Defaults to `0.02`.
 * @returns An Angular {@link Provider}.
 *
 * @example
 * ```ts
 * provideBreakpointEpsilon(0.02);
 * ```
 *
 * @category Providers
 */
export function provideBreakpointEpsilon(epsilon: number = DEFAULT_BREAKPOINT_EPSILON): Provider {
  // Dev-only guard; the false branch never runs in production builds.
  /* v8 ignore next */
  if (isDevMode()) validateEpsilon(epsilon);

  return { provide: MQ_BREAKPOINT_EPSILON, useValue: epsilon };
}

/**
 * Sets the app-wide value query signals report during server-side rendering,
 * where `matchMedia` is unavailable. A per-call `ssrValue` overrides this.
 *
 * @param value - The boolean returned by every signal on the server.
 * @returns An Angular {@link Provider}.
 *
 * @example
 * ```ts
 * provideSsrValue(true);
 * ```
 *
 * @category Providers
 */
export function provideSsrValue(value: boolean): Provider {
  return { provide: NGX_MQ_SSR_VALUE, useValue: value };
}
