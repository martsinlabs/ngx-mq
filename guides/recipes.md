---
title: Recipes
category: Guides
---

# Recipes

Practical patterns built from the `ngx-mq` helpers.

## Reusable viewport helpers

Wrap the breakpoint helpers into named functions you can share across components.

```ts
// viewport.ts
import { Signal } from '@angular/core';
import { up, down, between } from 'ngx-mq';

export const isMobile = (): Signal<boolean> => down('md');
export const isTablet = (): Signal<boolean> => between('md', 'lg');
export const isDesktop = (): Signal<boolean> => up('lg');
```

```ts
export class HeaderComponent {
  readonly mobile = isMobile();
}
```

## Compose conditions

Combine any boolean signals with {@link and}, {@link or} and {@link not}.

```ts
import { and, or, not, up, down, hover, orientation, reducedMotion } from 'ngx-mq';

// Large screen, in landscape, with a hover-capable pointer
readonly isLandscapeDesktop = and(up('lg'), orientation('landscape'), hover());

// Small screens OR a reduced-motion preference
readonly prefersSimpleUi = or(down('md'), reducedMotion());

// Devices without hover (touch-like): there is no direct inverse helper for hover()
readonly isTouchLike = not(hover());
```

## Dark mode

```ts
import { colorScheme } from 'ngx-mq';

export class ThemeService {
  readonly prefersDark = colorScheme('dark');
}
```

## Detect an installed PWA

```ts
import { displayMode } from 'ngx-mq';

readonly isInstalledPwa = displayMode('standalone');
```

## Touch vs precise pointers

```ts
import { pointer, anyPointer } from 'ngx-mq';

readonly isTouch = pointer('coarse');
readonly hasFinePointer = anyPointer('fine');
```

## Respect reduced motion

```ts
import { reducedMotion } from 'ngx-mq';

export class AnimationService {
  readonly reduceMotion = reducedMotion();
}
```

## Anything else

For features without a dedicated helper, drop down to {@link matchMediaSignal}
with a raw CSS media query.

```ts
import { matchMediaSignal } from 'ngx-mq';

readonly isRetina = matchMediaSignal('(min-resolution: 2dppx)');
```
