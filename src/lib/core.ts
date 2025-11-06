import { isDevMode, Signal, inject } from '@angular/core';
import { createComputed, SIGNAL } from '@angular/core/primitives/signals';
import { retainUntilDestroy } from './mql-registry';
import { CreateMediaQueryOptions } from './models';
import { NGX_MQ_SSR_VALUE } from './tokens';

export function createConsumer(query: string, options?: CreateMediaQueryOptions): Signal<boolean> {
  const defaultSsrValue: boolean = inject(NGX_MQ_SSR_VALUE);
  const effectiveSsrValue: boolean = options?.ssrValue ?? defaultSsrValue;

  const querySignal: Signal<boolean> = retainUntilDestroy(query, effectiveSsrValue);

  const getter = createComputed(() => querySignal());

  if (isDevMode()) {
    getter[SIGNAL].debugName = options?.debugName;
  }

  return getter satisfies Signal<boolean>;
}

export function createConsumerLabel(descriptor: string): string {
  return `[NgxMq Signal: ${descriptor}]`;
}
