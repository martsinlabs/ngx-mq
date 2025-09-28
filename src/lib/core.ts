import { Signal } from '@angular/core';
import { createComputed } from '@angular/core/primitives/signals';
import { MqRetainRef, retainUntilDestroy } from './mql-registry';

export function createConsumer(query: string): Signal<boolean> {
  const retainRef: MqRetainRef = retainUntilDestroy(query);

  return createComputed(() => retainRef.signal());
}

export function createConsumerLabel(descriptor: string): string {
  return `[NgxMq Signal: ${descriptor}]`;
}
