import { computed, Signal } from '@angular/core';
import { retainUntilDestroy } from './mql-registry';

export function createConsumer(query: string): Signal<boolean> {
  const querySignal: Signal<boolean> = retainUntilDestroy(query);

  return computed(() => querySignal());
}

export function createConsumerLabel(descriptor: string): string {
  return `[NgxMq Signal: ${descriptor}]`;
}
