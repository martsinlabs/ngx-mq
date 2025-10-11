import { computed, Signal } from '@angular/core';
import { MqRetainRef, retainUntilDestroy } from './mql-registry';

export function createConsumer(query: string): Signal<boolean> {
  const retainRef: MqRetainRef = retainUntilDestroy(query);

  return computed(() => retainRef.signal());
}

export function createConsumerLabel(descriptor: string): string {
  return `[NgxMq Signal: ${descriptor}]`;
}
