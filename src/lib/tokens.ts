import { InjectionToken } from '@angular/core';
import { DEFAULT_BREAKPOINT_EPSILON } from './constants';
import { MqBreakpoints } from './models';

export const MQ_BREAKPOINTS: InjectionToken<MqBreakpoints> = new InjectionToken('MQ_BREAKPOINTS');

export const MQ_BREAKPOINT_EPSILON: InjectionToken<number> = new InjectionToken('MQ_BREAKPOINT_EPSILON', {
  providedIn: 'root',
  factory: () => DEFAULT_BREAKPOINT_EPSILON,
});

export const NGX_MQ_SSR_VALUE: InjectionToken<boolean> = new InjectionToken('NGX_MQ_SSR_VALUE', {
  providedIn: 'root',
  factory: () => false,
});
