---
title: Getting Started
category: Guides
---

# Getting Started

`ngx-mq` turns CSS media queries and breakpoints into Angular **signals**, with
automatic cleanup and SSR safety.

## Install

Pick the version that matches your Angular setup:

```bash
# Angular 20-22
npm install ngx-mq@3

# Angular 19
npm install ngx-mq@2

# Angular 16-18
npm install ngx-mq@1
```

## Configure breakpoints

Provide a breakpoint map once at bootstrap. Use a custom map or a built-in preset.

```ts
import { bootstrapApplication } from '@angular/platform-browser';
import { provideBreakpoints } from 'ngx-mq';
import { AppComponent } from './app/app.component';

bootstrapApplication(AppComponent, {
  providers: [
    provideBreakpoints({ sm: 640, md: 768, lg: 1024 }),
    // Or a preset: provideTailwindBreakpoints(), provideBootstrapBreakpoints(), provideMaterialBreakpoints()
  ],
});
```

## Create your first signal

Call the query helpers inside an
[injection context](https://angular.dev/guide/di/dependency-injection-context),
typically as component fields.

```ts
import { Component } from '@angular/core';
import { up, down, between } from 'ngx-mq';

@Component({
  selector: 'app-root',
  template: `
    @if (isMobile()) {
      <app-mobile-nav />
    } @else {
      <app-desktop-nav />
    }
  `,
})
export class AppComponent {
  readonly isMobile = down('md');
  readonly isTablet = between('md', 'lg');
  readonly isDesktop = up('lg');
}
```

Each helper returns a `Signal<boolean>` that updates reactively as the viewport
changes. The underlying `matchMedia` listener is shared across callers and removed
automatically when the owning context is destroyed.

## Next steps

- [SSR](./ssr.md) - render safely on the server.
- [Recipes](./recipes.md) - common patterns and composition.
