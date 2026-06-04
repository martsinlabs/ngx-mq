import { assertInInjectionContext, isDevMode, Signal } from '@angular/core';
import { applyMaxEpsilon, resolveBreakpoint } from './utils/breakpoints.utils';
import { CreateMediaQueryOptions, DisplayModeOption } from './models';
import { createConsumer, createConsumerLabel } from './core';
import { normalizeQuery } from './utils/common.utils';

/**
 * Tracks whether the viewport width is **at or above** a breakpoint.
 *
 * Builds a `(min-width: <bp>px)` query from the value registered for `bp` via
 * {@link provideBreakpoints} (or a preset like {@link provideTailwindBreakpoints}).
 *
 * @param bp - Name of a configured breakpoint, e.g. `'md'`.
 * @param options - Optional per-call settings ({@link CreateMediaQueryOptions}).
 * @returns A `Signal<boolean>` that is `true` while the viewport width is `>=` the breakpoint.
 *
 * @remarks Must be called within an Angular
 * [injection context](https://angular.dev/guide/di/dependency-injection-context).
 *
 * @example
 * ```ts
 * export class LayoutComponent {
 *   readonly isDesktop = up('lg');
 * }
 * ```
 *
 * @see {@link down} and {@link between} for the complementary ranges.
 * @category Breakpoints
 */
export function up(bp: string, options?: CreateMediaQueryOptions): Signal<boolean> {
  isDevMode() && assertInInjectionContext(up);

  const query: string = normalizeQuery(`(min-width: ${resolveBreakpoint(bp)}px)`);
  const consumer: Signal<boolean> = createConsumer(query, options);

  consumer.toString = () => createConsumerLabel(`up(${bp})`);

  return consumer;
}

/**
 * Tracks whether the viewport width is **below** a breakpoint.
 *
 * Builds a `(max-width: <bp - epsilon>px)` query. The upper bound is **exclusive**:
 * a small epsilon is subtracted so `down('md')` and {@link up}`('md')` never overlap.
 *
 * @param bp - Name of a configured breakpoint, e.g. `'md'`.
 * @param options - Optional per-call settings ({@link CreateMediaQueryOptions}).
 * @returns A `Signal<boolean>` that is `true` while the viewport width is `<` the breakpoint.
 *
 * @remarks Must be called within an Angular
 * [injection context](https://angular.dev/guide/di/dependency-injection-context).
 *
 * @example
 * ```ts
 * export class NavComponent {
 *   readonly isMobile = down('md');
 * }
 * ```
 *
 * @see {@link provideBreakpointEpsilon} to tune the exclusive-bound epsilon.
 * @category Breakpoints
 */
export function down(bp: string, options?: CreateMediaQueryOptions): Signal<boolean> {
  isDevMode() && assertInInjectionContext(down);

  const query: string = normalizeQuery(`(max-width: ${applyMaxEpsilon(resolveBreakpoint(bp))}px)`);
  const consumer: Signal<boolean> = createConsumer(query, options);

  consumer.toString = () => createConsumerLabel(`down(${bp})`);

  return consumer;
}

/**
 * Tracks whether the viewport width falls within the range `[minBp, maxBp)`.
 *
 * Combines `min-width` and `max-width` into a single query. The lower bound is
 * inclusive and the upper bound is **exclusive** (epsilon is subtracted from `maxBp`).
 *
 * @param minBp - Name of the lower (inclusive) breakpoint.
 * @param maxBp - Name of the upper (exclusive) breakpoint.
 * @param options - Optional per-call settings ({@link CreateMediaQueryOptions}).
 * @returns A `Signal<boolean>` that is `true` while the width is in `[minBp, maxBp)`.
 *
 * @remarks Must be called within an Angular
 * [injection context](https://angular.dev/guide/di/dependency-injection-context).
 *
 * @example
 * ```ts
 * export class GridComponent {
 *   readonly isTablet = between('md', 'lg');
 * }
 * ```
 *
 * @category Breakpoints
 */
export function between(minBp: string, maxBp: string, options?: CreateMediaQueryOptions): Signal<boolean> {
  isDevMode() && assertInInjectionContext(between);

  const minPx: number = resolveBreakpoint(minBp);
  const maxPx: number = resolveBreakpoint(maxBp);
  const query: string = normalizeQuery(`(min-width: ${minPx}px) and (max-width: ${applyMaxEpsilon(maxPx)}px)`);
  const consumer: Signal<boolean> = createConsumer(query, options);

  consumer.toString = () => createConsumerLabel(`between(${minBp}, ${maxBp})`);

  return consumer;
}

/**
 * Tracks the screen orientation via the `(orientation: ...)` media feature.
 *
 * @param value - `'portrait'` (height `>=` width) or `'landscape'` (width `>` height).
 * @param options - Optional per-call settings ({@link CreateMediaQueryOptions}).
 * @returns A `Signal<boolean>` that is `true` while the orientation matches `value`.
 *
 * @remarks Must be called within an Angular
 * [injection context](https://angular.dev/guide/di/dependency-injection-context).
 *
 * @example
 * ```ts
 * readonly isLandscape = orientation('landscape');
 * ```
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/CSS/@media/orientation | MDN: orientation}
 * @category Media Features
 */
export function orientation(value: 'portrait' | 'landscape', options?: CreateMediaQueryOptions): Signal<boolean> {
  isDevMode() && assertInInjectionContext(orientation);

  const query: string = normalizeQuery(`(orientation: ${value})`);
  const consumer: Signal<boolean> = createConsumer(query, options);

  consumer.toString = () => createConsumerLabel(`orientation(${value})`);

  return consumer;
}

/**
 * Tracks the user's preferred color scheme via `(prefers-color-scheme: ...)`.
 *
 * @param value - `'light'` or `'dark'`.
 * @param options - Optional per-call settings ({@link CreateMediaQueryOptions}).
 * @returns A `Signal<boolean>` that is `true` while the system scheme matches `value`.
 *
 * @remarks Must be called within an Angular
 * [injection context](https://angular.dev/guide/di/dependency-injection-context).
 *
 * @example
 * ```ts
 * readonly isDark = colorScheme('dark');
 * ```
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-color-scheme | MDN: prefers-color-scheme}
 * @category Media Features
 */
export function colorScheme(value: 'light' | 'dark', options?: CreateMediaQueryOptions): Signal<boolean> {
  isDevMode() && assertInInjectionContext(colorScheme);

  const query: string = normalizeQuery(`(prefers-color-scheme: ${value})`);
  const consumer: Signal<boolean> = createConsumer(query, options);

  consumer.toString = () => createConsumerLabel(`colorScheme(${value})`);

  return consumer;
}

/**
 * Tracks how the app is being displayed via the `(display-mode: ...)` feature,
 * useful for detecting installed PWAs.
 *
 * @param value - One of {@link DisplayModeOption}, e.g. `'standalone'`.
 * @param options - Optional per-call settings ({@link CreateMediaQueryOptions}).
 * @returns A `Signal<boolean>` that is `true` while the display mode matches `value`.
 *
 * @remarks Must be called within an Angular
 * [injection context](https://angular.dev/guide/di/dependency-injection-context).
 *
 * @example
 * ```ts
 * readonly isInstalledPwa = displayMode('standalone');
 * ```
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/CSS/@media/display-mode | MDN: display-mode}
 * @category Media Features
 */
export function displayMode(value: DisplayModeOption, options?: CreateMediaQueryOptions): Signal<boolean> {
  isDevMode() && assertInInjectionContext(displayMode);

  const query = normalizeQuery(`(display-mode: ${value})`);
  const consumer: Signal<boolean> = createConsumer(query, options);

  consumer.toString = () => createConsumerLabel(`displayMode(${value})`);

  return consumer;
}

/**
 * Tracks whether the user has requested reduced motion via
 * `(prefers-reduced-motion: reduce)`.
 *
 * @param options - Optional per-call settings ({@link CreateMediaQueryOptions}).
 * @returns A `Signal<boolean>` that is `true` while reduced motion is preferred.
 *
 * @remarks Must be called within an Angular
 * [injection context](https://angular.dev/guide/di/dependency-injection-context).
 *
 * @example
 * ```ts
 * readonly reduceMotion = reducedMotion();
 * ```
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-motion | MDN: prefers-reduced-motion}
 * @category Media Features
 */
export function reducedMotion(options?: CreateMediaQueryOptions): Signal<boolean> {
  isDevMode() && assertInInjectionContext(reducedMotion);

  const query: string = normalizeQuery('(prefers-reduced-motion: reduce)');
  const consumer: Signal<boolean> = createConsumer(query, options);

  consumer.toString = () => createConsumerLabel('reducedMotion');

  return consumer;
}

/**
 * Tracks whether the **primary** input device can hover via `(hover: hover)`.
 *
 * @param options - Optional per-call settings ({@link CreateMediaQueryOptions}).
 * @returns A `Signal<boolean>` that is `true` while the primary pointer supports hover.
 *
 * @remarks Must be called within an Angular
 * [injection context](https://angular.dev/guide/di/dependency-injection-context).
 *
 * @example
 * ```ts
 * readonly canHover = hover();
 * ```
 *
 * @see {@link anyHover} to test **any** available input device.
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/CSS/@media/hover | MDN: hover}
 * @category Media Features
 */
export function hover(options?: CreateMediaQueryOptions): Signal<boolean> {
  isDevMode() && assertInInjectionContext(hover);

  const query: string = normalizeQuery('(hover: hover)');
  const consumer: Signal<boolean> = createConsumer(query, options);

  consumer.toString = () => createConsumerLabel('hover');

  return consumer;
}

/**
 * Tracks whether **any** available input device can hover via `(any-hover: hover)`.
 *
 * @param options - Optional per-call settings ({@link CreateMediaQueryOptions}).
 * @returns A `Signal<boolean>` that is `true` while at least one pointer supports hover.
 *
 * @remarks Must be called within an Angular
 * [injection context](https://angular.dev/guide/di/dependency-injection-context).
 *
 * @example
 * ```ts
 * readonly anyCanHover = anyHover();
 * ```
 *
 * @see {@link hover} to test only the primary input device.
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/CSS/@media/any-hover | MDN: any-hover}
 * @category Media Features
 */
export function anyHover(options?: CreateMediaQueryOptions): Signal<boolean> {
  isDevMode() && assertInInjectionContext(anyHover);

  const query: string = normalizeQuery('(any-hover: hover)');
  const consumer: Signal<boolean> = createConsumer(query, options);

  consumer.toString = () => createConsumerLabel('anyHover');

  return consumer;
}

/**
 * Tracks the accuracy of the **primary** pointer via `(pointer: ...)`.
 *
 * @param value - `'fine'` (mouse/stylus), `'coarse'` (touch), or `'none'`.
 * @param options - Optional per-call settings ({@link CreateMediaQueryOptions}).
 * @returns A `Signal<boolean>` that is `true` while the primary pointer matches `value`.
 *
 * @remarks Must be called within an Angular
 * [injection context](https://angular.dev/guide/di/dependency-injection-context).
 *
 * @example
 * ```ts
 * readonly isTouch = pointer('coarse');
 * ```
 *
 * @see {@link anyPointer} to test **any** available input device.
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/CSS/@media/pointer | MDN: pointer}
 * @category Media Features
 */
export function pointer(value: 'fine' | 'coarse' | 'none', options?: CreateMediaQueryOptions): Signal<boolean> {
  isDevMode() && assertInInjectionContext(pointer);

  const query: string = normalizeQuery(`(pointer: ${value})`);
  const consumer: Signal<boolean> = createConsumer(query, options);

  consumer.toString = () => createConsumerLabel(`pointer(${value})`);

  return consumer;
}

/**
 * Tracks the accuracy of **any** available pointer via `(any-pointer: ...)`.
 *
 * @param value - `'fine'` (mouse/stylus), `'coarse'` (touch), or `'none'`.
 * @param options - Optional per-call settings ({@link CreateMediaQueryOptions}).
 * @returns A `Signal<boolean>` that is `true` while at least one pointer matches `value`.
 *
 * @remarks Must be called within an Angular
 * [injection context](https://angular.dev/guide/di/dependency-injection-context).
 *
 * @example
 * ```ts
 * readonly hasFinePointer = anyPointer('fine');
 * ```
 *
 * @see {@link pointer} to test only the primary input device.
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/CSS/@media/any-pointer | MDN: any-pointer}
 * @category Media Features
 */
export function anyPointer(value: 'fine' | 'coarse' | 'none', options?: CreateMediaQueryOptions): Signal<boolean> {
  isDevMode() && assertInInjectionContext(anyPointer);

  const query: string = normalizeQuery(`(any-pointer: ${value})`);
  const consumer: Signal<boolean> = createConsumer(query, options);

  consumer.toString = () => createConsumerLabel(`anyPointer(${value})`);

  return consumer;
}

/**
 * Tracks the approximate color gamut of the display via `(color-gamut: ...)`.
 *
 * @param value - `'srgb'`, `'p3'`, or `'rec2020'` (ordered by increasing range).
 * @param options - Optional per-call settings ({@link CreateMediaQueryOptions}).
 * @returns A `Signal<boolean>` that is `true` while the display covers `value`.
 *
 * @remarks Must be called within an Angular
 * [injection context](https://angular.dev/guide/di/dependency-injection-context).
 *
 * @example
 * ```ts
 * readonly isWideGamut = colorGamut('p3');
 * ```
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/CSS/@media/color-gamut | MDN: color-gamut}
 * @category Media Features
 */
export function colorGamut(value: 'srgb' | 'p3' | 'rec2020', options?: CreateMediaQueryOptions): Signal<boolean> {
  isDevMode() && assertInInjectionContext(colorGamut);

  const query: string = normalizeQuery(`(color-gamut: ${value})`);
  const consumer: Signal<boolean> = createConsumer(query, options);

  consumer.toString = () => createConsumerLabel(`colorGamut(${value})`);

  return consumer;
}

/**
 * Tracks an arbitrary, raw CSS media query.
 *
 * Use this escape hatch for any feature not covered by the dedicated helpers.
 * The query is normalized (trimmed, collapsed whitespace, lower-cased) before use.
 *
 * @param query - A valid CSS media query, e.g. `'(min-resolution: 2dppx)'`.
 * @param options - Optional per-call settings ({@link CreateMediaQueryOptions}).
 * @returns A `Signal<boolean>` that reflects the live result of the query.
 *
 * @remarks Must be called within an Angular
 * [injection context](https://angular.dev/guide/di/dependency-injection-context).
 *
 * @example
 * ```ts
 * readonly isRetina = matchMediaSignal('(min-resolution: 2dppx)');
 * ```
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_media_queries | MDN: CSS media queries}
 * @category Custom Queries
 */
export function matchMediaSignal(query: string, options?: CreateMediaQueryOptions): Signal<boolean> {
  isDevMode() && assertInInjectionContext(matchMediaSignal);

  const media: string = normalizeQuery(query);
  const consumer: Signal<boolean> = createConsumer(media, options);

  consumer.toString = () => createConsumerLabel(`matchMediaSignal(${query})`);

  return consumer;
}
