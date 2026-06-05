import { describe, it, expect, beforeEach } from 'vitest';
import { TestBed } from '@angular/core/testing';
import { provideBreakpoints } from './providers';
import { up, down, between } from './api';
import { _getRegistry, _resetRegistry } from './mql-registry/mql-registry';

describe('Breakpoint query generation', () => {
  beforeEach(() => {
    _resetRegistry();
    TestBed.configureTestingModule({
      providers: [provideBreakpoints({ sm: 640, md: 768 })],
    });
  });

  it('up() builds an inclusive min-width query', () => {
    TestBed.runInInjectionContext(() => up('md'));

    expect(_getRegistry().has('(min-width: 768px)')).toBe(true);
  });

  it('down() subtracts epsilon for an exclusive max-width', () => {
    TestBed.runInInjectionContext(() => down('md'));

    expect(_getRegistry().has('(max-width: 767.98px)')).toBe(true);
  });

  it('between() combines an inclusive min and an exclusive max', () => {
    TestBed.runInInjectionContext(() => between('sm', 'md'));

    expect(_getRegistry().has('(min-width: 640px) and (max-width: 767.98px)')).toBe(true);
  });
});
