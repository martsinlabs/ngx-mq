import { TestBed } from '@angular/core/testing';
import { up, down, between } from './api';
import { isSignal, Signal } from '@angular/core';
import { provideBreakpoints } from './providers';

describe('Public API', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideBreakpoints({ sm: 640, md: 768 })],
    });
  });

  it('up() should return a boolean signal', () => {
    const signal: Signal<boolean> = TestBed.runInInjectionContext(() => up('md'));
    expect(isSignal(signal)).toBe(true);
    expect(typeof signal()).toBe('boolean');
    expect(signal.toString()).toContain('up');
  });

  it('down() should return a boolean signal', () => {
    const signal = TestBed.runInInjectionContext(() => down('md'));
    expect(isSignal(signal)).toBe(true);
    expect(typeof signal()).toBe('boolean');
    expect(signal.toString()).toContain('down');
  });

  it('between() should return a boolean signal', () => {
    const signal = TestBed.runInInjectionContext(() => between('sm', 'md'));
    expect(isSignal(signal)).toBe(true);
    expect(typeof signal()).toBe('boolean');
    expect(signal.toString()).toContain('between');
  });
});
