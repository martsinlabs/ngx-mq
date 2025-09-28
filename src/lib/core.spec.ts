import { TestBed } from '@angular/core/testing';
import { EnvironmentInjector, runInInjectionContext } from '@angular/core';
import { createConsumer, createConsumerLabel } from './core';

describe('core API', () => {
  it(`createConsumer should return a Signal`, () => {
    runInInjectionContext(TestBed.inject(EnvironmentInjector), () => {
      const consumer = createConsumer('(min-width: 768px)');
      expect(typeof consumer()).toBe('boolean');
    });
  });

  it('createConsumerLabel should return formatted string', () => {
    const label = createConsumerLabel('my-label');
    expect(label).toBe('[NgxMq Signal: my-label]');
  });
});
