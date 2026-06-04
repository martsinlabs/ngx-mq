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
 * Combines boolean signals with logical **AND**.
 *
 * Composition happens at the signal level, so the underlying media-query
 * listeners stay shared and are still cleaned up automatically.
 *
 * @param conditions - Boolean signals to combine. An empty call returns a
 * signal that is always `true` (vacuous truth).
 * @returns A `Signal<boolean>` that is `true` only when **every** condition is `true`.
 *
 * @example
 * ```ts
 * readonly isLandscapeDesktop = and(up('lg'), orientation('landscape'), hover());
 * ```
 *
 * @see {@link or} and {@link not}.
 * @category Combining Signals
 */
export function and(...conditions: Signal<boolean>[]): Signal<boolean> {
  const result: Signal<boolean> = computed(() => conditions.every((condition: Signal<boolean>) => condition()));

  result.toString = () => createConsumerLabel(`and(${conditions.map(describe).join(', ')})`);

  return result;
}

/**
 * Combines boolean signals with logical **OR**.
 *
 * Composition happens at the signal level, so the underlying media-query
 * listeners stay shared and are still cleaned up automatically.
 *
 * @param conditions - Boolean signals to combine. An empty call returns a
 * signal that is always `false`.
 * @returns A `Signal<boolean>` that is `true` when **at least one** condition is `true`.
 *
 * @example
 * ```ts
 * readonly prefersSimpleUi = or(down('md'), reducedMotion());
 * ```
 *
 * @see {@link and} and {@link not}.
 * @category Combining Signals
 */
export function or(...conditions: Signal<boolean>[]): Signal<boolean> {
  const result: Signal<boolean> = computed(() => conditions.some((condition: Signal<boolean>) => condition()));

  result.toString = () => createConsumerLabel(`or(${conditions.map(describe).join(', ')})`);

  return result;
}

/**
 * Negates a boolean signal.
 *
 * Useful for features that have no direct inverse helper, such as
 * "devices without hover": `not(hover())`.
 *
 * @param condition - The boolean signal to invert.
 * @returns A `Signal<boolean>` that is `true` when `condition` is `false`, and vice versa.
 *
 * @example
 * ```ts
 * readonly isTouchLike = not(hover());
 * ```
 *
 * @see {@link and} and {@link or}.
 * @category Combining Signals
 */
export function not(condition: Signal<boolean>): Signal<boolean> {
  const result: Signal<boolean> = computed(() => !condition());

  result.toString = () => createConsumerLabel(`not(${describe(condition)})`);

  return result;
}
