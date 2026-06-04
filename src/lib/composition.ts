import { computed, Signal } from '@angular/core';
import { createConsumerLabel } from './core';

const LABEL_RE = /^\[NgxMq Signal: (.+)]$/;

/** Extracts the inner descriptor from an ngx-mq signal label, or falls back to its raw toString(). */
function describe(condition: Signal<boolean>): string {
  const raw: string = condition.toString();
  const match: RegExpExecArray | null = LABEL_RE.exec(raw);

  return match ? match[1] : raw;
}

/**
 * Combines boolean signals with logical AND.
 * The resulting signal is `true` only when every condition is `true`.
 * An empty call returns a signal that is always `true`.
 */
export function and(...conditions: Signal<boolean>[]): Signal<boolean> {
  const result: Signal<boolean> = computed(() => conditions.every((condition: Signal<boolean>) => condition()));

  result.toString = () => createConsumerLabel(`and(${conditions.map(describe).join(', ')})`);

  return result;
}

/**
 * Combines boolean signals with logical OR.
 * The resulting signal is `true` when at least one condition is `true`.
 * An empty call returns a signal that is always `false`.
 */
export function or(...conditions: Signal<boolean>[]): Signal<boolean> {
  const result: Signal<boolean> = computed(() => conditions.some((condition: Signal<boolean>) => condition()));

  result.toString = () => createConsumerLabel(`or(${conditions.map(describe).join(', ')})`);

  return result;
}

/**
 * Negates a boolean signal.
 * The resulting signal is `true` when the condition is `false`, and vice versa.
 */
export function not(condition: Signal<boolean>): Signal<boolean> {
  const result: Signal<boolean> = computed(() => !condition());

  result.toString = () => createConsumerLabel(`not(${describe(condition)})`);

  return result;
}
