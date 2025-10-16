import { signal as createSignal, Signal, WritableSignal } from '@angular/core';
import { addChangeListenerToMql, removeChangeListenerFromMql } from './mql-registry.listeners';
import { MqlRegistry, MqRetainToken, MqHandle } from './mql-registry.models';

const REGISTRY_KEY: symbol = Symbol.for('ngx-mq:mql-registry');

const getRegistry = (): MqlRegistry => {
  const realmGlobal: Record<PropertyKey, unknown> = globalThis;

  return (realmGlobal[REGISTRY_KEY] ??= new Map()) as MqlRegistry;
};

const createMqHandle = (query: string): MqHandle => {
  const mql: MediaQueryList = matchMedia(query);
  const signal: WritableSignal<boolean> = createSignal(mql.matches);

  const onChange = (event?: MediaQueryListEvent) => signal.set(event?.matches ?? mql.matches);

  addChangeListenerToMql(mql, onChange);

  return { mql, signal, onChange, retainers: new Set() };
};

export function retain(query: string, token: MqRetainToken): Signal<boolean> {
  // SSR-safe fallback
  if (typeof globalThis.matchMedia !== 'function') {
    return createSignal(false).asReadonly();
  }

  const registry: MqlRegistry = getRegistry();

  let handle: MqHandle | undefined = registry.get(query);

  if (!handle) {
    handle = createMqHandle(query);
    registry.set(query, handle);
  }

  handle.retainers.add(token);

  return handle.signal.asReadonly();
}

export function release(query: string, token: MqRetainToken): boolean {
  const registry: MqlRegistry = getRegistry();

  let handle: MqHandle | undefined = registry.get(query);

  if (!handle) return false;

  const removed: boolean = handle.retainers.delete(token);

  if (handle.retainers.size === 0) {
    removeChangeListenerFromMql(handle.mql, handle.onChange);
    registry.delete(query);
  }

  return removed;
}

/* @internal
 * Returns the current registry (used only in tests).
 */
export function _getRegistry(): MqlRegistry {
  return getRegistry();
}

/* @internal
 * Clears all registry entries and removes media-query listeners.
 */
export function _resetRegistry(): void {
  const registry: MqlRegistry = getRegistry();

  registry.forEach((handle: MqHandle) => {
    removeChangeListenerFromMql(handle.mql, handle.onChange);
  });

  registry.clear();
}
