<p align="center">
  <img src="https://raw.githubusercontent.com/martsinlabs/ngx-mq/refs/heads/main/assets/logo.svg" width="130" alt="ngx-mq logo" />
</p>

<h3 align="center">Signal-powered breakpoints &amp; media queries for Angular</h3>
<br />

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

<p align="center">
  <a href="https://martsinlabs.github.io/ngx-mq"><b>Documentation</b></a>
  &nbsp;&nbsp;·&nbsp;&nbsp;
  <a href="https://stackblitz.com/github/martsinlabs/ngx-mq-demo/tree/demo/v3"><b>Live demo</b></a>
  &nbsp;&nbsp;·&nbsp;&nbsp;
  <a href="#why-ngx-mq"><b>Why ngx-mq?</b></a>
</p>

---

## Overview

A responsive value is just a signal: read it in the template, compose it, and never wire up cleanup.

```ts
import { Component } from '@angular/core';
import { up } from 'ngx-mq';

@Component({
  selector: 'app-root',
  template: `
    @if (isDesktop()) {
      <app-sidebar />
    }
  `,
})
export class AppComponent {
  readonly isDesktop = up('lg');
}
```

- **Signal-native** so it works anywhere signals do, zoneless apps included.
- **Zero boilerplate**: no subscriptions, no `unsubscribe`, cleanup is automatic.
- **SSR-safe** with a value you control on the server.
- **Batteries included**: Tailwind, Bootstrap and Material presets, plus `and` / `or` / `not`.
- **Tiny**: ~1.9 kB gzipped, and no RxJS.

## Install

```bash
npm i ngx-mq        # Angular 20-22
```

<sub>Angular 19 -> <code>ngx-mq@2</code> &nbsp;·&nbsp; Angular 16-18 -> <code>ngx-mq@1</code></sub>

Then register your breakpoints once, at bootstrap:

```ts
import { provideBreakpoints } from 'ngx-mq';

bootstrapApplication(AppComponent, {
  providers: [provideBreakpoints({ sm: 640, md: 768, lg: 1024 })],
  // or a preset: provideTailwindBreakpoints() / provideBootstrapBreakpoints() / provideMaterialBreakpoints()
});
```

> Call the helpers inside an [injection context](https://angular.dev/guide/di/dependency-injection-context): a component field, a constructor, or a DI factory.

## Examples

#### Show different layouts per screen size

```ts
readonly isMobile = down('md');
readonly isTablet = between('md', 'lg');
readonly isDesktop = up('lg');
```

#### Follow the system dark mode

```ts
readonly prefersDark = colorScheme('dark');
```

#### Drop hover styles on touch devices

```ts
// `hover()` has no direct inverse, so compose it
readonly isTouchLike = not(hover());
```

#### Combine any conditions

```ts
// Large screen, in landscape, with a hover-capable pointer
readonly isLandscapeDesktop = and(up('lg'), orientation('landscape'), hover());

// Small screens OR a reduced-motion preference
readonly prefersSimpleUi = or(down('md'), reducedMotion());
```

#### Respect reduced motion

```ts
readonly reduceMotion = reducedMotion();
```

#### Anything else, with a raw query

```ts
readonly isRetina = matchMediaSignal('(min-resolution: 2dppx)');
```

## Why ngx-mq?

Angular's CDK ships [`BreakpointObserver`](https://material.angular.io/cdk/layout/overview), which works well but is built around RxJS and raw query strings. `ngx-mq` is built for the signals era: read a value in the template, subscribe to nothing, clean up automatically.

|                       | `ngx-mq`                                    | CDK `BreakpointObserver`              |
| --------------------- | ------------------------------------------- | ------------------------------------- |
| Reactivity            | `Signal<boolean>`                           | `Observable<BreakpointState>`         |
| Cleanup               | Automatic via `DestroyRef`                  | Manual (`takeUntilDestroyed`)         |
| Named breakpoints     | Tailwind / Bootstrap / Material or your own | Material breakpoints or raw strings   |
| Media-feature helpers | `colorScheme`, `hover`, `pointer`, ...      | Raw query strings                     |
| Composition           | `and` / `or` / `not`                        | RxJS operators                        |
| SSR                   | Configurable static value                   | Handle it yourself                    |
| Footprint             | ~1.9 kB standalone                          | Part of `@angular/cdk`                |

## Documentation

Spin it up in seconds on [StackBlitz](https://stackblitz.com/github/martsinlabs/ngx-mq-demo/tree/demo/v3), no setup required.

Full API reference, guides and recipes live at **[martsinlabs.github.io/ngx-mq](https://martsinlabs.github.io/ngx-mq)**.

<details>
<summary><b>API reference</b> (quick view)</summary>

<br>

Every query helper returns a `Signal<boolean>` and accepts an optional `options` argument
([`CreateMediaQueryOptions`](#options-and-types)).

**Breakpoints**

| Helper    | Arguments        | `true` when                          |
| --------- | ---------------- | ------------------------------------ |
| `up`      | `bp`             | viewport width `>=` `bp`             |
| `down`    | `bp`             | viewport width `<` `bp` (exclusive)  |
| `between` | `minBp`, `maxBp` | viewport width is in `[minBp, maxBp)` |

`down` and `between` upper bounds are exclusive: a small epsilon (default `0.02`, set via `provideBreakpointEpsilon`) is subtracted from the max so adjacent ranges never overlap.

**Media features**

| Helper          | Arguments                      | `true` when                              |
| --------------- | ------------------------------ | ---------------------------------------- |
| `orientation`   | `'portrait' \| 'landscape'`    | the screen orientation matches           |
| `colorScheme`   | `'light' \| 'dark'`            | the system color scheme matches          |
| `displayMode`   | `DisplayModeOption`            | the display mode matches (PWA detection) |
| `reducedMotion` | none                           | the user prefers reduced motion          |
| `hover`         | none                           | the primary pointer can hover            |
| `anyHover`      | none                           | any available pointer can hover          |
| `pointer`       | `'fine' \| 'coarse' \| 'none'` | the primary pointer matches              |
| `anyPointer`    | `'fine' \| 'coarse' \| 'none'` | any available pointer matches            |
| `colorGamut`    | `'srgb' \| 'p3' \| 'rec2020'`  | the display covers the gamut             |

**Composition**

| Helper | Arguments                          | `true` when                               |
| ------ | ---------------------------------- | ----------------------------------------- |
| `and`  | `...conditions: Signal<boolean>[]` | every condition is `true` (empty: `true`) |
| `or`   | `...conditions: Signal<boolean>[]` | any condition is `true` (empty: `false`)  |
| `not`  | `condition: Signal<boolean>`       | the condition is `false`                  |

**Custom queries**

| Helper             | Arguments       | Description                                  |
| ------------------ | --------------- | -------------------------------------------- |
| `matchMediaSignal` | `query: string` | A signal for any raw CSS media query         |

**Providers**

| Provider                      | Argument             | Description                                              |
| ----------------------------- | -------------------- | ------------------------------------------------------- |
| `provideBreakpoints`          | `bps: MqBreakpoints` | Registers a custom breakpoint map                       |
| `provideTailwindBreakpoints`  | none                 | Registers the Tailwind preset                           |
| `provideBootstrapBreakpoints` | none                 | Registers the Bootstrap preset                          |
| `provideMaterialBreakpoints`  | none                 | Registers the Material 2 preset                         |
| `provideBreakpointEpsilon`    | `epsilon: number`    | Sets the exclusive-bound epsilon (default `0.02`)       |
| `provideSsrValue`             | `value: boolean`     | Sets the value signals report during SSR (default `false`) |

**Options and types**

```ts
interface CreateMediaQueryOptions {
  ssrValue?: boolean; // value reported during SSR; overrides provideSsrValue
  debugName?: string; // shown for the signal in Angular DevTools
}

type MqBreakpoints = Record<string, number>;

type DisplayModeOption =
  | 'browser' | 'fullscreen' | 'standalone'
  | 'minimal-ui' | 'window-controls-overlay' | 'picture-in-picture';
```

</details>

## Server-side rendering

`matchMedia` does not exist on the server, so each signal returns a static value during SSR and switches to the live result after hydration. Set the default with `provideSsrValue(true)`, or override per call with `up('lg', { ssrValue: true })`.

## Contributing

Contributions are welcome. See [CONTRIBUTING.md](https://github.com/martsinlabs/ngx-mq/blob/main/CONTRIBUTING.md) and [ARCHITECTURE.md](https://github.com/martsinlabs/ngx-mq/blob/main/ARCHITECTURE.md).

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
