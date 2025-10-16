import { DestroyRef, inject, Signal } from '@angular/core';
import { retain, release } from './mql-registry';

export function retainUntilDestroy(query: string): Signal<boolean> {
  const destroyRef: DestroyRef = inject(DestroyRef);

  const querySignal: Signal<boolean> = retain(query, destroyRef);

  destroyRef.onDestroy(() => release(query, destroyRef));

  return querySignal;
}
