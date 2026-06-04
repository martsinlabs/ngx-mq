# Architecture

This document explains how `ngx-mq` is put together internally. It is aimed at contributors and
maintainers; consumers only need the [README](./README.md).

## Design goals

- **One signal per query.** A given media query is observed once, no matter how many components ask
  for it.
- **No manual cleanup.** Listeners are bound to Angular's `DestroyRef` and removed automatically.
- **SSR-safe by construction.** When `matchMedia` is absent the API still returns a valid signal.
- **Public API only.** The runtime is built on documented Angular APIs (`signal`, `computed`,
  `inject`, `DestroyRef`) so it stays resilient across Angular versions.
- **Dev ergonomics, zero prod cost.** Validation and assertions live behind `isDevMode()` and tree
  shake out of production builds.

## Layered structure

```
 Public helpers        api.ts            up / down / between / colorScheme / ...
       |               composition.ts    and / or / not
       v
 Signal factory        core.ts           createConsumer()  -> computed wrapper + SSR value
       |
       v
 Query registry        mql-registry/     retain / release  -> one MediaQueryList + signal per query
       |
       v
 Configuration         tokens.ts         MQ_BREAKPOINTS, MQ_BREAKPOINT_EPSILON, NGX_MQ_SSR_VALUE
                       providers.ts      provideBreakpoints / provideSsrValue / ...
                       utils/            breakpoint resolution, epsilon, query normalization
```

Each layer depends only on the layer below it. Public helpers never touch the registry directly;
they go through `createConsumer`.

## Module map

| Module                          | Responsibility                                                        |
| ------------------------------- | -------------------------------------------------------------------- |
| `lib/api.ts`                    | Public query helpers. Build a query string, delegate, attach a label |
| `lib/composition.ts`            | `and` / `or` / `not` over existing boolean signals                   |
| `lib/core.ts`                   | `createConsumer`: resolve SSR value, retain a signal, wrap it        |
| `lib/mql-registry/`             | The shared registry of `MediaQueryList` handles and signals          |
| `lib/tokens.ts`                 | Injection tokens for breakpoints, epsilon, and the SSR value         |
| `lib/providers.ts`              | `provide*` helpers and the built-in presets                          |
| `lib/utils/breakpoints.utils.ts`| Breakpoint resolution, epsilon application, validation               |
| `lib/utils/common.utils.ts`     | Media-query string normalization                                     |
| `lib/constants.ts`              | Preset breakpoint maps and the default epsilon                       |

## Request flow

What happens when a component calls `up('lg')`:

```
up('lg')
  -> assertInInjectionContext (dev only)
  -> resolveBreakpoint('lg')                 read MQ_BREAKPOINTS, look up the px value
  -> normalizeQuery('(min-width: 1024px)')   trim, collapse whitespace, lower-case
  -> createConsumer(query)
       -> inject(NGX_MQ_SSR_VALUE)            resolve the effective SSR value
       -> retainUntilDestroy(query, ssr)      get the shared signal, schedule release on destroy
       -> computed(() => querySignal())       expose a read-only derived signal
  -> attach toString() for Angular DevTools
  -> return Signal<boolean>
```

The returned signal is a `computed` wrapper around the registry's writable signal. Components read it
like any other signal, and Angular's reactivity propagates `matchMedia` changes automatically.

## The query registry

The registry is the core of the library. It implements two patterns:

- **Flyweight:** one `MediaQueryList` and one `WritableSignal<boolean>` exist per unique query
  string, shared by every caller.
- **Multiton:** the registry is a single `Map<string, MqHandle>` keyed by query string.

It is stored on `globalThis` under a `Symbol.for('ngx-mq:mql-registry')` key, so a single instance is
shared even if the library is loaded from more than one bundle in the same realm.

Each entry is an `MqHandle`:

```ts
interface MqHandle {
  mql: MediaQueryList;                 // the native query
  signal: WritableSignal<boolean>;     // current match state
  onChange: (e?: MediaQueryListEvent) => void;
  retainers: Set<DestroyRef>;          // who currently depends on this entry
}
```

### Reference counting and cleanup

`retain` and `release` manage the lifetime of each handle:

- **`retain(query, token, ssrValue)`** creates the handle on first use (calling `matchMedia` and
  attaching a `change` listener), adds `token` to `retainers`, and returns the read-only signal.
- **`release(query, token)`** removes `token` from `retainers`. When the set becomes empty it detaches
  the listener and deletes the map entry, so nothing leaks.

`retainUntilDestroy` (in `mql-registry.extensions.ts`) ties this to Angular: it injects the current
`DestroyRef`, uses it as the retain token, and registers `release` in `destroyRef.onDestroy(...)`.
The `DestroyRef` is both the identity of the retainer and the cleanup trigger.

### Listener compatibility

`mql-registry.listeners.ts` uses `addEventListener('change', ...)` where available and falls back to
the deprecated `addListener` for older engines (for example Safari < 14).

## Server-side rendering

`retain` checks `typeof globalThis.matchMedia !== 'function'`. On the server this is true, so it
returns a fresh static `signal(ssrValue)` and never touches the registry or attaches listeners. The
effective SSR value is resolved in `createConsumer` as `options.ssrValue ?? inject(NGX_MQ_SSR_VALUE)`,
which defaults to `false`. After hydration the browser code path takes over and the signal reflects
the live query.

## Composition

`and` / `or` / `not` operate purely at the signal level: each returns a `computed` that reads its
inputs. They do not create new registry entries, so composing helpers keeps the same shared listeners
and the same automatic cleanup. Empty `and()` is `true` (vacuous truth) and empty `or()` is `false`.

## Breakpoints and epsilon

Breakpoint maps are provided through `MQ_BREAKPOINTS` and frozen at provide time by
`normalizeBreakpoints` (keys trimmed, values validated in dev). `up` uses `min-width`; `down` and
`between` use `max-width` with a small epsilon subtracted (`applyMaxEpsilon`, default `0.02`, from
`MQ_BREAKPOINT_EPSILON`). The epsilon makes upper bounds exclusive so adjacent ranges such as
`down('md')` and `up('md')` never both match.

## Development vs production

Every assertion and validation is wrapped in `isDevMode()`:

- injection-context checks in the public helpers,
- "breakpoint not found" and "no breakpoints provided" errors,
- epsilon and breakpoint-value validation,
- signal `debugName` assignment.

In production these branches are dropped, and the package is marked `sideEffects: false` so unused
helpers tree-shake away.

## Testing

Tests run on Vitest with the Analog Angular plugin (`vitest.config.ts`, `src/test-setup.ts`). The
suite covers the public API, the registry's retain/release semantics, SSR fallback, breakpoint and
epsilon math, and composition. `_getRegistry` and `_resetRegistry` are internal helpers used only to
isolate registry state between tests.
