import { TestBed } from '@angular/core/testing';
import { Signal, isSignal } from '@angular/core';
import { provideBreakpoints } from './providers';
import { up, down, between, matchMediaSignal, orientation, colorScheme } from './api';

describe('Public API', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideBreakpoints({ sm: 640, md: 768 })],
    });
  });

  describe('up()', () => {
    it('should return a boolean signal', () => {
      const signal: Signal<boolean> = TestBed.runInInjectionContext(() => up('md'));

      expect(isSignal(signal)).toBe(true);
      expect(typeof signal()).toBe('boolean');
      expect(signal.toString()).toContain('up');
    });
  });

  describe('down()', () => {
    it('should return a boolean signal', () => {
      const signal = TestBed.runInInjectionContext(() => down('md'));

      expect(isSignal(signal)).toBe(true);
      expect(typeof signal()).toBe('boolean');
      expect(signal.toString()).toContain('down');
    });
  });

  describe('between()', () => {
    it('should return a boolean signal', () => {
      const signal = TestBed.runInInjectionContext(() => between('sm', 'md'));

      expect(isSignal(signal)).toBe(true);
      expect(typeof signal()).toBe('boolean');
      expect(signal.toString()).toContain('between');
    });
  });

  describe('orientation()', () => {
    it('should return a boolean signal', () => {
      const signal = TestBed.runInInjectionContext(() => orientation('portrait'));

      expect(isSignal(signal)).toBe(true);
      expect(typeof signal()).toBe('boolean');
      expect(signal.toString()).toContain('orientation');
    });
  });

  describe('colorScheme()', () => {
    it('should return a boolean signal', () => {
      const signal = TestBed.runInInjectionContext(() => colorScheme('dark'));

      expect(isSignal(signal)).toBe(true);
      expect(typeof signal()).toBe('boolean');
      expect(signal.toString()).toContain('colorScheme');
    });
  });

  describe('matchMediaSignal()', () => {
    it('should return a boolean signal', () => {
      const signal = TestBed.runInInjectionContext(() => matchMediaSignal('(prefers-color-scheme: dark)'));

      expect(isSignal(signal)).toBe(true);
      expect(typeof signal()).toBe('boolean');
      expect(signal.toString()).toContain('matchMediaSignal');
    });
  });
});
