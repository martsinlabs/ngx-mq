/**
 * A map of breakpoint names to their minimum widths in **pixels**.
 *
 * Keys are arbitrary range names (e.g. `'sm'`, `'md'`); values are the lower
 * bound of each range. Passed to {@link provideBreakpoints} at bootstrap.
 *
 * @example
 * ```ts
 * const breakpoints: MqBreakpoints = { sm: 640, md: 768, lg: 1024 };
 * ```
 *
 * @category Types
 */
export type MqBreakpoints = Record<string, number>;

/**
 * Per-call options accepted by every query helper (e.g. {@link up}, {@link colorScheme}).
 *
 * @category Types
 */
export interface CreateMediaQueryOptions {
  /**
   * Value the signal reports during server-side rendering, where `matchMedia`
   * is unavailable. Overrides the app-wide default set by {@link provideSsrValue}.
   *
   * @defaultValue `false`
   */
  ssrValue?: boolean;

  /**
   * A debug name for the signal, shown in Angular DevTools to help identify it.
   */
  debugName?: string;
}

/**
 * Allowed values for the {@link displayMode} helper, mirroring the CSS
 * `display-mode` media feature.
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/CSS/@media/display-mode | MDN: display-mode}
 * @category Types
 */
export type DisplayModeOption =
  | 'browser'
  | 'fullscreen'
  | 'standalone'
  | 'minimal-ui'
  | 'window-controls-overlay'
  | 'picture-in-picture';
