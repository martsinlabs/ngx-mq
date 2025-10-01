import { isDevMode, Signal } from '@angular/core';
import { createComputed, SIGNAL } from '@angular/core/primitives/signals';
import { MqRetainRef, retainUntilDestroy } from './mql-registry';

export function createConsumer(query: string, debugName?: string): Signal<boolean> {
  const retainRef: MqRetainRef = retainUntilDestroy(query);

  const getter = createComputed(() => retainRef.signal());

  if (isDevMode()) {
    getter[SIGNAL].debugName = debugName;
  }

  return getter satisfies Signal<boolean>;
}

export function createConsumerLabel(descriptor: string): string {
  return `[NgxMq Signal: ${descriptor}]`;
}
