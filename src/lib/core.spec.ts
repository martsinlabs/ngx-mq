import { describe, it, expect } from 'vitest';
import { TestBed } from '@angular/core/testing';
import { EnvironmentInjector, runInInjectionContext } from '@angular/core';
import { createConsumer, createConsumerLabel } from './core';

describe('Core API', () => {
  describe('createConsumer()', () => {
    it('should return a Signal', () => {
      runInInjectionContext(TestBed.inject(EnvironmentInjector), () => {
        const consumer = createConsumer('(min-width: 768px)');
        expect(typeof consumer()).toBe('boolean');
      });
    });

    it('should honor the ssrValue and debugName options', () => {
      runInInjectionContext(TestBed.inject(EnvironmentInjector), () => {
        const consumer = createConsumer('(min-width: 1024px)', { ssrValue: true, debugName: 'my-signal' });
        expect(typeof consumer()).toBe('boolean');
      });
    });
  });

  describe('createConsumerLabel()', () => {
    it('should return formatted string', () => {
      const label = createConsumerLabel('my-label');
      expect(label).toBe('[NgxMq Signal: my-label]');
    });
  });
});
