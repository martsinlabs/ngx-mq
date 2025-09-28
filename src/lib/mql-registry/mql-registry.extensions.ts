import { DestroyRef, inject } from '@angular/core';
import { retain, release } from './mql-registry';
import { MqRetainRef } from './mql-registry.models';

export function retainUntilDestroy(query: string): MqRetainRef {
  const ref: MqRetainRef = retain(query);
  const destroyRef: DestroyRef = inject(DestroyRef);

  destroyRef.onDestroy(() => release(query, ref.token));

  return ref;
}
