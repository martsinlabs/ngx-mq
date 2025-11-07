import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideClientHydration } from '@angular/platform-browser';
import { provideSsrValue, provideTailwindBreakpoints } from 'ngx-mq';

export const appConfig: ApplicationConfig = {
  providers: [
    provideSsrValue(true),
    provideClientHydration(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideTailwindBreakpoints(),
    provideAnimationsAsync(),
  ],
};
