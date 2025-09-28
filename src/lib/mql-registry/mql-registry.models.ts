import { Signal, WritableSignal } from '@angular/core';

export type MqRetainToken = symbol;

export interface MqRetainRef {
  signal: Signal<boolean>;
  token: MqRetainToken;
}

export interface MqHandle {
  mql: MediaQueryList;
  signal: WritableSignal<boolean>;
  onChange: (event?: MediaQueryListEvent) => void;
  retainers: Set<MqRetainToken>;
}

export type MqlRegistry = Map<string, MqHandle>;
