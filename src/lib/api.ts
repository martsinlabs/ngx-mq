import { assertInInjectionContext, isDevMode, Signal } from '@angular/core';
import { applyMaxEpsilon, resolveBreakpoint } from './utils/breakpoints.utils';
import { CreateMediaQueryOptions, DisplayModeOption } from './models';
import { createConsumer, createConsumerLabel } from './core';
import { normalizeQuery } from './utils/common.utils';

export function up(bp: string, options?: CreateMediaQueryOptions): Signal<boolean> {
  isDevMode() && assertInInjectionContext(up);

  const query: string = normalizeQuery(`(min-width: ${resolveBreakpoint(bp)}px)`);
  const consumer: Signal<boolean> = createConsumer(query, options?.debugName);

  consumer.toString = () => createConsumerLabel(`up(${bp})`);

  return consumer;
}

export function down(bp: string, options?: CreateMediaQueryOptions): Signal<boolean> {
  isDevMode() && assertInInjectionContext(down);

  const query: string = normalizeQuery(`(max-width: ${applyMaxEpsilon(resolveBreakpoint(bp))}px)`);
  const consumer: Signal<boolean> = createConsumer(query, options?.debugName);

  consumer.toString = () => createConsumerLabel(`down(${bp})`);

  return consumer;
}

export function between(minBp: string, maxBp: string, options?: CreateMediaQueryOptions): Signal<boolean> {
  isDevMode() && assertInInjectionContext(between);

  const minPx: number = resolveBreakpoint(minBp);
  const maxPx: number = resolveBreakpoint(maxBp);
  const query: string = normalizeQuery(`(min-width: ${minPx}px) and (max-width: ${applyMaxEpsilon(maxPx)}px)`);
  const consumer: Signal<boolean> = createConsumer(query, options?.debugName);

  consumer.toString = () => createConsumerLabel(`between(${minBp}, ${maxBp})`);

  return consumer;
}

export function orientation(option: 'portrait' | 'landscape', options?: CreateMediaQueryOptions): Signal<boolean> {
  isDevMode() && assertInInjectionContext(orientation);

  const query: string = normalizeQuery(`(orientation: ${option})`);
  const consumer: Signal<boolean> = createConsumer(query, options?.debugName);

  consumer.toString = () => createConsumerLabel(`orientation(${option})`);

  return consumer;
}

export function colorScheme(option: 'light' | 'dark', options?: CreateMediaQueryOptions): Signal<boolean> {
  isDevMode() && assertInInjectionContext(colorScheme);

  const query: string = normalizeQuery(`(prefers-color-scheme: ${option})`);
  const consumer: Signal<boolean> = createConsumer(query, options?.debugName);

  consumer.toString = () => createConsumerLabel(`colorScheme(${option})`);

  return consumer;
}

export function displayMode(option: DisplayModeOption, options?: CreateMediaQueryOptions): Signal<boolean> {
  isDevMode() && assertInInjectionContext(displayMode);

  const query = normalizeQuery(`(display-mode: ${option})`);
  const consumer: Signal<boolean> = createConsumer(query, options?.debugName);

  consumer.toString = () => createConsumerLabel(`displayMode(${option})`);

  return consumer;
}

export function matchMediaSignal(query: string, options?: CreateMediaQueryOptions): Signal<boolean> {
  isDevMode() && assertInInjectionContext(matchMediaSignal);

  const media: string = normalizeQuery(query);
  const consumer: Signal<boolean> = createConsumer(media, options?.debugName);

  consumer.toString = () => createConsumerLabel(`matchMediaSignal(${query})`);

  return consumer;
}
