<p align="center">
  <img src="https://raw.githubusercontent.com/martsinlabs/ngx-mq/refs/heads/main/assets/logo.svg" width="140" alt="ngx-mq" />
</p>

<h3 align="center">Signal-Powered Breakpoints &amp; Media Queries for Angular</h3>

<p align="center">
  Reactive <code>matchMedia</code> as Angular signals. SSR-safe, zoneless-ready, and free of RxJS.
</p>

<p align="center">
  <a href="https://github.com/martsinlabs/ngx-mq/actions/workflows/ci.yml">
    <img src="https://img.shields.io/github/actions/workflow/status/martsinlabs/ngx-mq/ci.yml?branch=main&label=CI&color=44cc11&logo=github" alt="CI status" />
  </a>
  <a href="https://codecov.io/gh/martsinlabs/ngx-mq">
    <img src="https://codecov.io/gh/martsinlabs/ngx-mq/branch/main/graph/badge.svg" alt="coverage" />
  </a>
  <a href="https://www.npmjs.com/package/ngx-mq">
    <img src="https://img.shields.io/npm/v/ngx-mq.svg?color=007ec6" alt="npm version" />
  </a>
  <a href="https://www.npmjs.com/package/ngx-mq">
    <img src="https://img.shields.io/npm/dm/ngx-mq.svg?color=44cc11" alt="npm downloads" />
  </a>
  <a href="https://bundlephobia.com/package/ngx-mq">
    <img src="https://img.shields.io/bundlephobia/minzip/ngx-mq.svg?color=44cc11&label=minzip" alt="minzipped size" />
  </a>
  <a href="https://opensource.org/license/MIT">
    <img src="https://img.shields.io/npm/l/ngx-mq.svg?color=44cc11" alt="license" />
  </a>
</p>

---

## Features

- **Signal-native**: every query is a `Signal<boolean>` that updates as the viewport changes.
- **SSR-safe**: returns a configurable static value on the server, then hydrates on the client.
- **Auto-cleanup**: listeners are tied to Angular's `DestroyRef`; no manual teardown.
- **Efficient**: one shared `matchMedia` listener per unique query, reused across the app.
- **Batteries included**: Tailwind, Bootstrap and Material breakpoint presets out of the box.
- **Composable**: combine any signals with `and` / `or` / `not`.
- **Tiny and tested**: ~1.9 kB gzipped, 100% line coverage.

## Why ngx-mq?

Angular's CDK ships [`BreakpointObserver`](https://material.angular.io/cdk/layout/overview), which
works well but is built around RxJS and raw query strings. `ngx-mq` is designed for the signals era:
templates read a value directly, there is nothing to subscribe to, and cleanup is automatic.

|                       | `ngx-mq`                                          | CDK `BreakpointObserver`                  |
| --------------------- | ------------------------------------------------- | ----------------------------------------- |
| Reactivity            | `Signal<boolean>`                                 | `Observable<BreakpointState>`             |
| Cleanup               | Automatic via `DestroyRef`                         | Manual (`unsubscribe` / `takeUntilDestroyed`) |
| Template usage        | `@if (isDesktop())`                                | `async` pipe or manual subscription        |
| Named breakpoints     | Tailwind, Bootstrap, Material presets or your own | Material breakpoints or raw strings        |
| Media-feature helpers | `colorScheme`, `hover`, `pointer`, ...            | Raw query strings                          |
| Composition           | `and` / `or` / `not`                              | RxJS operators                             |
| SSR                   | Configurable static value                          | Handle it yourself                         |
| Footprint             | ~1.9 kB standalone                                 | Part of `@angular/cdk`                     |

If you already pull in `@angular/cdk` and live in RxJS, `BreakpointObserver` is a fine choice. If you
want a signals-first, zoneless-friendly API with batteries included, reach for `ngx-mq`.

## Documentation

- **API reference and guides:** https://martsinlabs.github.io/ngx-mq
- **Live demo:** [StackBlitz](https://stackblitz.com/github/martsinlabs/ngx-mq-demo/tree/demo/v2?file=src%2Fapp%2Fapp.component.ts)

## Installation

Install the major version that matches your Angular version:

| Angular | Install            |
| ------- | ------------------ |
| 20 - 22 | `npm i ngx-mq@3`   |
| 19      | `npm i ngx-mq@2`   |
| 16 - 18 | `npm i ngx-mq@1`   |

## Quick start

**1. Provide a breakpoint map** at bootstrap (a custom map or a preset):

```ts
import { bootstrapApplication } from '@angular/platform-browser';
import { provideBreakpoints } from 'ngx-mq';
import { AppComponent } from './app/app.component';

bootstrapApplication(AppComponent, {
  providers: [provideBreakpoints({ sm: 640, md: 768, lg: 1024 })],
});
```

**2. Use the helpers** as signals inside any component:

```ts
import { Component } from '@angular/core';
import { up, down, between } from 'ngx-mq';

@Component({
  selector: 'app-root',
  template: `
    @if (isDesktop()) {
      <app-sidebar />
    }
  `,
})
export class AppComponent {
  readonly isMobile = down('md');
  readonly isTablet = between('md', 'lg');
  readonly isDesktop = up('lg');
}
```

> **Tip:** Call the helpers within Angular's [injection context](https://angular.dev/guide/di/dependency-injection-context) (component fields, `inject`, factories) so their lifecycle stays in sync with the framework.

## API

Every query helper returns a `Signal<boolean>` and accepts an optional `options` argument
([`CreateMediaQueryOptions`](#options)). The `options` column is omitted below for brevity.

### Configuration

Register breakpoints once, then refer to them by name. Use a custom map or a preset:

```ts
import {
  provideBreakpoints,
  provideTailwindBreakpoints,
  provideBootstrapBreakpoints,
  provideMaterialBreakpoints,
} from 'ngx-mq';
```

| Preset      | Breakpoints                                      |
| ----------- | ------------------------------------------------ |
| Tailwind    | `sm: 640, md: 768, lg: 1024, xl: 1280, 2xl: 1536` |
| Bootstrap   | `sm: 576, md: 768, lg: 992, xl: 1200, xxl: 1400`  |
| Material    | `sm: 600, md: 905, lg: 1240, xl: 1440`            |

### Breakpoints

| Helper    | Arguments        | `true` when                          |
| --------- | ---------------- | ------------------------------------ |
| `up`      | `bp`             | viewport width `>=` `bp`             |
| `down`    | `bp`             | viewport width `<` `bp`              |
| `between` | `minBp`, `maxBp` | viewport width is in `[minBp, maxBp)` |

> **Note:** `down` and `between` upper bounds are **exclusive**: a small epsilon is subtracted
> from the max so adjacent ranges (e.g. `down('md')` and `up('md')`) never overlap. Tune it with
> [`provideBreakpointEpsilon`](#providers).

### Media features

| Helper          | Arguments                      | `true` when                          |
| --------------- | ------------------------------ | ------------------------------------ |
| `orientation`   | `'portrait' \| 'landscape'`    | the screen orientation matches       |
| `colorScheme`   | `'light' \| 'dark'`            | the system color scheme matches      |
| `displayMode`   | `DisplayModeOption`            | the display mode matches (PWA detection) |
| `reducedMotion` | none                           | the user prefers reduced motion      |
| `hover`         | none                           | the primary pointer can hover        |
| `anyHover`      | none                           | any available pointer can hover      |
| `pointer`       | `'fine' \| 'coarse' \| 'none'` | the primary pointer matches          |
| `anyPointer`    | `'fine' \| 'coarse' \| 'none'` | any available pointer matches        |
| `colorGamut`    | `'srgb' \| 'p3' \| 'rec2020'`  | the display covers the gamut         |

### Custom queries

For anything without a dedicated helper, pass a raw CSS media query:

```ts
import { matchMediaSignal } from 'ngx-mq';

readonly isRetina = matchMediaSignal('(min-resolution: 2dppx)');
```

### Composition

Combine boolean signals into derived ones. Combinators work at the signal level, so the underlying
listeners stay shared and are still cleaned up automatically.

| Helper | Arguments                          | `true` when                                |
| ------ | ---------------------------------- | ------------------------------------------ |
| `and`  | `...conditions: Signal<boolean>[]` | every condition is `true` (empty: `true`)  |
| `or`   | `...conditions: Signal<boolean>[]` | any condition is `true` (empty: `false`)   |
| `not`  | `condition: Signal<boolean>`       | the condition is `false`                   |

```ts
import { and, or, not, up, down, hover, orientation, reducedMotion } from 'ngx-mq';

// Large screen, in landscape, with a hover-capable pointer
readonly isLandscapeDesktop = and(up('lg'), orientation('landscape'), hover());

// Small screens OR a reduced-motion preference
readonly prefersSimpleUi = or(down('md'), reducedMotion());

// Devices without hover (touch-like): `hover()` has no direct inverse helper
readonly isTouchLike = not(hover());
```

### Providers

Each returns a standard Angular `Provider` you can register at any injector level.

| Provider                        | Argument             | Description                                            |
| ------------------------------- | -------------------- | ----------------------------------------------------- |
| `provideBreakpoints`            | `bps: MqBreakpoints` | Registers a custom breakpoint map.                    |
| `provideTailwindBreakpoints`    | none                 | Registers the Tailwind preset.                        |
| `provideBootstrapBreakpoints`   | none                 | Registers the Bootstrap preset.                       |
| `provideMaterialBreakpoints`    | none                 | Registers the Material 2 preset.                      |
| `provideBreakpointEpsilon`      | `epsilon: number`    | Sets the exclusive-bound epsilon (default `0.02`).    |
| `provideSsrValue`               | `value: boolean`     | Sets the value signals report during SSR (default `false`). |

> **Tip:** To register these as environment providers, wrap them with
> [`makeEnvironmentProviders`](https://angular.dev/api/core/makeEnvironmentProviders).

### Options

```ts
interface CreateMediaQueryOptions {
  /** Value the signal reports during SSR. Overrides the app-wide `provideSsrValue`. */
  ssrValue?: boolean;
  /** Debug name shown for the signal in Angular DevTools. */
  debugName?: string;
}
```

### Types

```ts
type MqBreakpoints = Record<string, number>;

type DisplayModeOption =
  | 'browser'
  | 'fullscreen'
  | 'standalone'
  | 'minimal-ui'
  | 'window-controls-overlay'
  | 'picture-in-picture';
```

## Server-side rendering

`matchMedia` does not exist on the server, so during SSR every signal returns a static value and
no listeners are created. Set the default with `provideSsrValue`, or override it per call:

```ts
provideSsrValue(false);          // app-wide default
up('lg', { ssrValue: true });    // per-call override
```

Once the app hydrates in the browser, each signal switches to the live query result.

## How it works

`ngx-mq` keeps a single `MediaQueryList` and writable signal per unique query in a global registry
(Multiton + Flyweight). Callers share that signal, and a reference count tied to `DestroyRef`
removes the listener and registry entry once the last consumer is destroyed. No manual cleanup, no
duplicate listeners.

## Contributing

Contributions are welcome. See [CONTRIBUTING.md](https://github.com/martsinlabs/ngx-mq/blob/main/CONTRIBUTING.md).

## License

[MIT](https://github.com/martsinlabs/ngx-mq/blob/main/LICENSE) © Martsin Labs

## Sponsors

<table>
  <tr>
    <td width="240" align="center">
      <p>
        <img
          src="https://raw.githubusercontent.com/getsentry/sentry/7b65f0f23d7eb5ccc035b12776bf5d8f3d9f8965/static/images/logo-sentry.svg"
          width="120"
          alt="Sentry" />
      </p>
      <p>
        <a href="https://sentry.io" target="_blank"><strong>Sentry</strong></a>
        <br />
        Error tracking and performance monitoring.
      </p>
    </td>
  </tr>
</table>
