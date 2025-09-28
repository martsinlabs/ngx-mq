import { signal as createSignal, WritableSignal } from '@angular/core';
import { addChangeListenerToMql, removeChangeListenerFromMql } from './mql-registry.listeners';
import { MqlRegistry, MqRetainToken, MqHandle, MqRetainRef } from './mql-registry.models';

const REGISTRY_KEY: symbol = Symbol.for('ngx-mq:mql-registry');

const getRegistry = (): MqlRegistry => {
  const realmGlobal: Record<PropertyKey, unknown> = globalThis;

  return (realmGlobal[REGISTRY_KEY] ??= new Map()) as MqlRegistry;
};

const createRetainToken = (): MqRetainToken => Symbol('retain-token');

const createMqHandle = (query: string): MqHandle => {
  const mql: MediaQueryList = matchMedia(query);
  const signal: WritableSignal<boolean> = createSignal(mql.matches);

  const onChange = (event?: MediaQueryListEvent) => signal.set(event?.matches ?? mql.matches);

  addChangeListenerToMql(mql, onChange);

  return { mql, signal, onChange, retainers: new Set() };
};

export function retain(query: string): MqRetainRef {
  const token: MqRetainToken = createRetainToken();

  // SSR-safe fallback
  if (typeof matchMedia !== 'function') {
    return { signal: createSignal(false).asReadonly(), token };
  }

  const registry: MqlRegistry = getRegistry();

  let handle: MqHandle | undefined = registry.get(query);

  if (!handle) {
    handle = createMqHandle(query);
    registry.set(query, handle);
  }

  handle.retainers.add(token);

  return { signal: handle.signal.asReadonly(), token };
}

export function release(query: string, token: MqRetainToken): void {
  const registry: MqlRegistry = getRegistry();

  let handle: MqHandle | undefined = registry.get(query);

  if (!handle) return;

  handle.retainers.delete(token);

  if (handle.retainers.size === 0) {
    removeChangeListenerFromMql(handle.mql, handle.onChange);
    registry.delete(query);
  }
}
