import { assertInInjectionContext, isDevMode, Signal } from '@angular/core';
import { applyMaxEpsilon, resolveBreakpoint } from './utils/breakpoints.utils';
import { createConsumer, createConsumerLabel } from './core';
import { normalizeQuery } from './utils/common.utils';

export function up(bp: string): Signal<boolean> {
  isDevMode() && assertInInjectionContext(up);

  const query: string = normalizeQuery(`(min-width: ${resolveBreakpoint(bp)}px)`);
  const consumer: Signal<boolean> = createConsumer(query);

  consumer.toString = () => createConsumerLabel(`up(${bp})`);

  return consumer;
}

export function down(bp: string): Signal<boolean> {
  isDevMode() && assertInInjectionContext(down);

  const query: string = normalizeQuery(`(max-width: ${applyMaxEpsilon(resolveBreakpoint(bp))}px)`);
  const consumer: Signal<boolean> = createConsumer(query);

  consumer.toString = () => createConsumerLabel(`down(${bp})`);

  return consumer;
}

export function between(minBp: string, maxBp: string): Signal<boolean> {
  isDevMode() && assertInInjectionContext(between);

  const minPx: number = resolveBreakpoint(minBp);
  const maxPx: number = resolveBreakpoint(maxBp);
  const query: string = normalizeQuery(`(min-width: ${minPx}px) and (max-width: ${applyMaxEpsilon(maxPx)}px)`);
  const consumer: Signal<boolean> = createConsumer(query);

  consumer.toString = () => createConsumerLabel(`between(${minBp}, ${maxBp})`);

  return consumer;
}

export function matchMediaSignal(query: string): Signal<boolean> {
  isDevMode() && assertInInjectionContext(between);

  const media: string = normalizeQuery(query);
  const consumer: Signal<boolean> = createConsumer(media);

  consumer.toString = () => createConsumerLabel(`matchMediaSignal(${query})`);

  return consumer;
}
