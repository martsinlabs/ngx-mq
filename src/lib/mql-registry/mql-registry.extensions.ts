import { DestroyRef, inject, Signal } from '@angular/core';
import { retain, release } from './mql-registry';

export function retainUntilDestroy(query: string, ssrValue: boolean): Signal<boolean> {
  const destroyRef: DestroyRef = inject(DestroyRef);

  const querySignal: Signal<boolean> = retain(query, destroyRef, ssrValue);

  destroyRef.onDestroy(() => release(query, destroyRef));

  return querySignal;
}
