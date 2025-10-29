<p align="center">
  <img src="https://raw.githubusercontent.com/martsinlabs/ngx-mq/refs/heads/main/assets/logo.svg" width="160" alt="ngx-mq logo" />
</p>

<h3 align="center">
  Signal-Powered Breakpoints & Media Queries
</h3>

<h5 align="center">
  <a href="https://github.com/martsinlabs/ngx-mq/actions/workflows/ci.yml">
    <img src="https://img.shields.io/github/actions/workflow/status/martsinlabs/ngx-mq/ci.yml?branch=main&label=CI&color=44cc11&logo=github" alt="CI Status" />
  </a>
  <a href="https://codecov.io/gh/martsinlabs/ngx-mq">
    <img src="https://codecov.io/gh/martsinlabs/ngx-mq/branch/main/graph/badge.svg" alt="coverage" />
  </a>
  <br>
  <a href="https://www.npmjs.com/package/ngx-mq">
    <img src="https://img.shields.io/npm/v/ngx-mq.svg?color=007ec6" alt="npm version" />
  </a>
  <a href="https://www.npmjs.com/package/ngx-mq">
    <img src="https://img.shields.io/npm/dm/ngx-mq.svg?color=44cc11" alt="npm downloads" />
  </a>
  <a href="https://opensource.org/license/MIT">
    <img src="https://img.shields.io/npm/l/ngx-mq.svg?color=44cc11" alt="license" />
  </a>
</h5>

<br>

## Features

- Lightweight
- SSR-safe
- Auto-cleanup
- Angular 16 — next
- Well-tested

## Introduction

Built on the native [matchMedia](https://developer.mozilla.org/en-US/docs/Web/API/Window/matchMedia) API, NGX-MQ brings a signal-based and declarative way to handle breakpoints and media queries in Angular. Lifecycle management is fully automated via `DestroyRef`, removing the need for manual cleanup. Under the hood, it leverages the Multiton and Flyweight patterns for efficient instance reuse and consistent behavior across your app.

> **Tip:** Always call query utilities within Angular’s [injection context](https://angular.dev/guide/di/dependency-injection-context) to keep them in sync with the framework’s lifecycle.

## Live Demo

Try it on [StackBlitz](https://stackblitz.com/github/martsinlabs/ngx-mq-demo/tree/demo/v2?file=src%2Fapp%2Fapp.component.ts)

## Installation

Choose the package version that matches your Angular setup:

```bash
# For Angular 16–18
npm install ngx-mq@1

# For Angular 19–20
npm install ngx-mq@2
```

## Breakpoint API

### Configuration

Provide your map at the application bootstrap.

```ts
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import {
  provideBreakpoints,
  provideTailwindBreakpoints,
  provideBootstrapBreakpoints,
  provideMaterialBreakpoints,
  provideBreakpointEpsilon,
} from 'ngx-mq';

bootstrapApplication(AppComponent, {
  providers: [
    // Define a custom map (keys are named ranges, values are widths in pixels)
    provideBreakpoints({
      sm: 640,
      md: 768,
      lg: 1024,
    }),

    // Or use one of the built-in presets
    // provideTailwindBreakpoints(),
    // provideBootstrapBreakpoints(),
    // provideMaterialBreakpoints(),

    // Configure epsilon if needed (default: 0.02)
    provideBreakpointEpsilon(0.02),
  ],
});
```

**Available presets**

- **Tailwind** → `sm: 640, md: 768, lg: 1024, xl: 1280, 2xl: 1536`
- **Bootstrap** → `sm: 576, md: 768, lg: 992, xl: 1200, xxl: 1400`
- **Material** → `sm: 600, md: 905, lg: 1240, xl: 1440`

> **Note**: Epsilon is a small value subtracted from upper bounds to prevent adjacent ranges from overlapping.

### BP-related utilities

| Function  | Parameters                                                        | Returns           | Description                                   |
| --------- | ----------------------------------------------------------------- | ----------------- | --------------------------------------------- |
| `up`      | `bp: string, options?: CreateMediaQueryOptions`                   | `Signal<boolean>` | `true` when viewport width ≥ breakpoint       |
| `down`    | `bp: string, options?: CreateMediaQueryOptions`                   | `Signal<boolean>` | `true` when viewport width < breakpoint       |
| `between` | `minBp: string, maxBp: string, options?: CreateMediaQueryOptions` | `Signal<boolean>` | `true` when viewport width is in range [a, b] |

> **Tip:** Wrap these APIs into reusable helpers:

```ts
// viewport-utils.ts
import { Signal } from '@angular/core';
import { up, down, between } from 'ngx-mq';

export const isMobile = (): Signal<boolean> => down('md');
export const isTablet = (): Signal<boolean> => between('md', 'lg');
export const isDesktop = (): Signal<boolean> => up('lg');
```

## Common utilities

Utils exposing common CSS media features.

| Function      | Parameters                                                             | Returns           | Description                                                              |
| ------------- | ---------------------------------------------------------------------- | ----------------- | ------------------------------------------------------------------------ |
| `orientation` | `option: 'portrait' \| 'landscape', options?: CreateMediaQueryOptions` | `Signal<boolean>` | `true` when the current screen orientation matches the specified option. |
| `colorScheme` | `option: 'light' \| 'dark', options?: CreateMediaQueryOptions`         | `Signal<boolean>` | `true` when the system color scheme matches the specified option.        |

---

## Generic Media Query API

Works with any valid [CSS media query](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_media_queries) and returns a `Signal<boolean>` which automatically updates when the query result changes.

| Function           | Parameters                                         | Returns           | Description                                               |
| ------------------ | -------------------------------------------------- | ----------------- | --------------------------------------------------------- |
| `matchMediaSignal` | `query: string, options?: CreateMediaQueryOptions` | `Signal<boolean>` | Provides a signal representing the state of a media query |

> **Tip:** Use this API for media queries that are not part of your breakpoint map.

```ts
import { Signal } from '@angular/core';
import { matchMediaSignal } from 'ngx-mq';

// Example: track orientation changes
export const isLandscape = (): Signal<boolean> => matchMediaSignal('(orientation: landscape)');
```

## Types

```ts
export interface CreateMediaQueryOptions {
  /**
   * A debug name for the signal. Used in Angular DevTools to identify the signal.
   */
  debugName?: string;
}
```

## Contributing

[CONTRIBUTING.md](https://github.com/martsinlabs/ngx-mq/blob/main/CONTRIBUTING.md)
