export type MqBreakpoints = Record<string, number>;

export interface CreateMediaQueryOptions {
  /**
   * A debug name for the signal. Used in Angular DevTools to identify the signal.
   */
  debugName?: string;
}

export type DisplayModeOption =
  | 'browser'
  | 'fullscreen'
  | 'standalone'
  | 'minimal-ui'
  | 'window-controls-overlay'
  | 'picture-in-picture';
