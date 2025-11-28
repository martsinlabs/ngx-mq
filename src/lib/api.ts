import { assertInInjectionContext, isDevMode, Signal } from '@angular/core';
import { applyMaxEpsilon, resolveBreakpoint } from './utils/breakpoints.utils';
import { DisplayModeOption, CreateMediaQueryOptions } from './models';
import { createConsumer, createConsumerLabel } from './core';
import { normalizeQuery } from './utils/common.utils';

export function up(bp: string, options?: CreateMediaQueryOptions): Signal<boolean> {
  isDevMode() && assertInInjectionContext(up);

  const query: string = normalizeQuery(`(min-width: ${resolveBreakpoint(bp)}px)`);
  const consumer: Signal<boolean> = createConsumer(query, options);

  consumer.toString = () => createConsumerLabel(`up(${bp})`);

  return consumer;
}

export function down(bp: string, options?: CreateMediaQueryOptions): Signal<boolean> {
  isDevMode() && assertInInjectionContext(down);

  const query: string = normalizeQuery(`(max-width: ${applyMaxEpsilon(resolveBreakpoint(bp))}px)`);
  const consumer: Signal<boolean> = createConsumer(query, options);

  consumer.toString = () => createConsumerLabel(`down(${bp})`);

  return consumer;
}

export function between(minBp: string, maxBp: string, options?: CreateMediaQueryOptions): Signal<boolean> {
  isDevMode() && assertInInjectionContext(between);

  const minPx: number = resolveBreakpoint(minBp);
  const maxPx: number = resolveBreakpoint(maxBp);
  const query: string = normalizeQuery(`(min-width: ${minPx}px) and (max-width: ${applyMaxEpsilon(maxPx)}px)`);
  const consumer: Signal<boolean> = createConsumer(query, options);

  consumer.toString = () => createConsumerLabel(`between(${minBp}, ${maxBp})`);

  return consumer;
}

export function orientation(value: 'portrait' | 'landscape', options?: CreateMediaQueryOptions): Signal<boolean> {
  isDevMode() && assertInInjectionContext(orientation);

  const query: string = normalizeQuery(`(orientation: ${value})`);
  const consumer: Signal<boolean> = createConsumer(query, options);

  consumer.toString = () => createConsumerLabel(`orientation(${value})`);

  return consumer;
}

export function colorScheme(value: 'light' | 'dark', options?: CreateMediaQueryOptions): Signal<boolean> {
  isDevMode() && assertInInjectionContext(colorScheme);

  const query: string = normalizeQuery(`(prefers-color-scheme: ${value})`);
  const consumer: Signal<boolean> = createConsumer(query, options);

  consumer.toString = () => createConsumerLabel(`colorScheme(${value})`);

  return consumer;
}

export function displayMode(value: DisplayModeOption, options?: CreateMediaQueryOptions): Signal<boolean> {
  isDevMode() && assertInInjectionContext(displayMode);

  const query = normalizeQuery(`(display-mode: ${value})`);
  const consumer: Signal<boolean> = createConsumer(query, options);

  consumer.toString = () => createConsumerLabel(`displayMode(${value})`);

  return consumer;
}

export function reducedMotion(options?: CreateMediaQueryOptions): Signal<boolean> {
  isDevMode() && assertInInjectionContext(reducedMotion);

  const query: string = normalizeQuery('(prefers-reduced-motion: reduce)');
  const consumer: Signal<boolean> = createConsumer(query, options);

  consumer.toString = () => createConsumerLabel('reducedMotion');

  return consumer;
}

export function hover(options?: CreateMediaQueryOptions): Signal<boolean> {
  isDevMode() && assertInInjectionContext(hover);

  const query: string = normalizeQuery('(hover: hover)');
  const consumer: Signal<boolean> = createConsumer(query, options);

  consumer.toString = () => createConsumerLabel('hover');

  return consumer;
}

export function anyHover(options?: CreateMediaQueryOptions): Signal<boolean> {
  isDevMode() && assertInInjectionContext(anyHover);

  const query: string = normalizeQuery('(any-hover: hover)');
  const consumer: Signal<boolean> = createConsumer(query, options);

  consumer.toString = () => createConsumerLabel('anyHover');

  return consumer;
}

export function pointer(value: 'fine' | 'coarse' | 'none', options?: CreateMediaQueryOptions): Signal<boolean> {
  isDevMode() && assertInInjectionContext(pointer);

  const query: string = normalizeQuery(`(pointer: ${value})`);
  const consumer: Signal<boolean> = createConsumer(query, options);

  consumer.toString = () => createConsumerLabel(`pointer(${value})`);

  return consumer;
}

export function anyPointer(value: 'fine' | 'coarse' | 'none', options?: CreateMediaQueryOptions): Signal<boolean> {
  isDevMode() && assertInInjectionContext(anyPointer);

  const query: string = normalizeQuery(`(any-pointer: ${value})`);
  const consumer: Signal<boolean> = createConsumer(query, options);

  consumer.toString = () => createConsumerLabel(`anyPointer(${value})`);

  return consumer;
}

export function matchMediaSignal(query: string, options?: CreateMediaQueryOptions): Signal<boolean> {
  isDevMode() && assertInInjectionContext(matchMediaSignal);

  const media: string = normalizeQuery(query);
  const consumer: Signal<boolean> = createConsumer(media, options);

  consumer.toString = () => createConsumerLabel(`matchMediaSignal(${query})`);

  return consumer;
}
