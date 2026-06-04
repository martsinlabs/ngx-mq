---
title: SSR
category: Guides
---

# Server-Side Rendering

On the server there is no `matchMedia`, so a query has no real result to report.
`ngx-mq` stays safe by returning a **static value** during SSR, then taking over
the real query once the app hydrates in the browser.

## Set the app-wide SSR value

Use {@link provideSsrValue} to choose what every signal reports on the server.
It defaults to `false`.

```ts
import { provideSsrValue, provideTailwindBreakpoints } from 'ngx-mq';
import { provideClientHydration } from '@angular/platform-browser';

export const appConfig = {
  providers: [
    provideClientHydration(),
    provideTailwindBreakpoints(),
    provideSsrValue(false),
  ],
};
```

## Override per call

Any helper accepts a per-call `ssrValue` that wins over the app-wide default.
This is useful when a specific query should assume a different server value.

```ts
import { up } from 'ngx-mq';

// Assume desktop on the server for this one signal
readonly isDesktop = up('lg', { ssrValue: true });
```

## How it behaves

1. **Server render** - the signal returns the resolved `ssrValue` (per-call value,
   else the app-wide default, else `false`). No listeners are created.
2. **Hydration** - in the browser the signal switches to the live `matchMedia`
   result and updates reactively from then on.

> **Tip:** Choose an `ssrValue` that matches your most common or most layout-stable
> case to minimize a visible shift right after hydration.
