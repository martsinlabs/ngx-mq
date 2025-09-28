import { inject, isDevMode } from '@angular/core';
import { MQ_BREAKPOINT_EPSILON, MQ_BREAKPOINTS } from '../tokens';
import { MqBreakpoints } from '../models';

function assertBreakpointsProvided(): MqBreakpoints {
  const breakpoints: MqBreakpoints | null = inject(MQ_BREAKPOINTS, { optional: true });

  if (isDevMode() && !breakpoints) {
    throw new Error(
      '[ngx-mq]: No breakpoints provided.\n' +
        'Please configure your app with provideBreakpoints(), ' +
        'or use one of the built-in presets: ' +
        'provideTailwindBreakpoints(), provideBootstrapBreakpoints(), provideMaterialBreakpoints().'
    );
  }

  return breakpoints!;
}

function assertBreakpointExists(bp: string, breakpoints: MqBreakpoints): number {
  if (isDevMode() && !(bp in breakpoints)) {
    throw new Error(
      `[ngx-mq]: Breakpoint "${bp}" not found in provided configuration.\n` +
        `Available breakpoints: ${Object.keys(breakpoints).join(', ')}.`
    );
  }

  return breakpoints[bp];
}

export function resolveBreakpoint(bp: string): number {
  const breakpoints: MqBreakpoints = assertBreakpointsProvided();

  return assertBreakpointExists(bp, breakpoints);
}

export function normalizeBreakpoints(bps: MqBreakpoints): Readonly<MqBreakpoints> {
  const out: Record<string, number> = {};

  for (const [rawKey, value] of Object.entries(bps)) {
    const key = rawKey.trim();

    if (isDevMode()) {
      if (!Number.isFinite(value)) {
        throw new Error(`[ngx-mq] Breakpoint "${key}" must be a finite number, got ${value}.`);
      }

      if (value <= 0) {
        throw new Error(`[ngx-mq] Breakpoint "${key}" must be > 0, got ${value}.`);
      }
    }

    out[key] = value;
  }

  return Object.freeze(out);
}

export function applyMaxEpsilon(value: number): number {
  const epsilon: number = inject(MQ_BREAKPOINT_EPSILON, { optional: true }) ?? 0.02;

  return value - epsilon;
}
