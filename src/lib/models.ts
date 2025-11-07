export type MqBreakpoints = Record<string, number>;

export interface CreateMediaQueryOptions {
  /**
   * Static signal value used during SSR.
   */
  ssrValue?: boolean;
}

export type DisplayModeOption =
  | 'browser'
  | 'fullscreen'
  | 'standalone'
  | 'minimal-ui'
  | 'window-controls-overlay'
  | 'picture-in-picture';
