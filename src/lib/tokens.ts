import { InjectionToken } from '@angular/core';
import { DEFAULT_BREAKPOINT_EPSILON } from './constants';
import { MqBreakpoints } from './models';

/**
 * Holds the active {@link MqBreakpoints} map. Has no default: configure it with
 * {@link provideBreakpoints} or a preset. Inject it to read breakpoints directly.
 *
 * @category Injection Tokens
 */
export const MQ_BREAKPOINTS: InjectionToken<MqBreakpoints> = new InjectionToken('MQ_BREAKPOINTS');

/**
 * Holds the epsilon used for exclusive upper bounds. Set it with
 * {@link provideBreakpointEpsilon}; defaults to `0.02`.
 *
 * @category Injection Tokens
 */
export const MQ_BREAKPOINT_EPSILON: InjectionToken<number> = new InjectionToken('MQ_BREAKPOINT_EPSILON', {
  providedIn: 'root',
  factory: () => DEFAULT_BREAKPOINT_EPSILON,
});

/**
 * Holds the value query signals report during SSR. Set it with
 * {@link provideSsrValue}; defaults to `false`.
 *
 * @category Injection Tokens
 */
export const NGX_MQ_SSR_VALUE: InjectionToken<boolean> = new InjectionToken('NGX_MQ_SSR_VALUE', {
  providedIn: 'root',
  factory: () => false,
});
