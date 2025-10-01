export type MqBreakpoints = Record<string, number>;

export interface CreateMediaQueryOptions {
  /**
   * A debug name for the signal. Used in Angular DevTools to identify the signal.
   */
  debugName?: string;
}
