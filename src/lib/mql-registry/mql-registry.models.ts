import { DestroyRef, WritableSignal } from '@angular/core';

export type MqRetainToken = DestroyRef;

export interface MqHandle {
  mql: MediaQueryList;
  signal: WritableSignal<boolean>;
  onChange: (event?: MediaQueryListEvent) => void;
  retainers: Set<MqRetainToken>;
}

export type MqlRegistry = Map<string, MqHandle>;
