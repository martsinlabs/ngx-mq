import { isDevMode, Signal } from '@angular/core';
import { createComputed, SIGNAL } from '@angular/core/primitives/signals';
import { retainUntilDestroy } from './mql-registry';

export function createConsumer(query: string, debugName?: string): Signal<boolean> {
  const querySignal: Signal<boolean> = retainUntilDestroy(query);

  const getter = createComputed(() => querySignal());

  if (isDevMode()) {
    getter[SIGNAL].debugName = debugName;
  }

  return getter satisfies Signal<boolean>;
}

export function createConsumerLabel(descriptor: string): string {
  return `[NgxMq Signal: ${descriptor}]`;
}
