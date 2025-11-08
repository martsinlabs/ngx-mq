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

export function provideBreakpoints(bps: MqBreakpoints): Provider {
  return { provide: MQ_BREAKPOINTS, useValue: normalizeBreakpoints(bps) };
}

export function provideTailwindBreakpoints(): Provider {
  return provideBreakpoints(TAILWIND_BREAKPOINTS);
}

export function provideBootstrapBreakpoints(): Provider {
  return provideBreakpoints(BOOTSTRAP_BREAKPOINTS);
}

export function provideMaterialBreakpoints(): Provider {
  return provideBreakpoints(MATERIAL_BREAKPOINTS);
}

export function provideBreakpointEpsilon(epsilon: number = DEFAULT_BREAKPOINT_EPSILON): Provider {
  if (isDevMode()) validateEpsilon(epsilon);

  return { provide: MQ_BREAKPOINT_EPSILON, useValue: epsilon };
}

export function provideSsrValue(value: boolean): Provider {
  return { provide: NGX_MQ_SSR_VALUE, useValue: value };
}
