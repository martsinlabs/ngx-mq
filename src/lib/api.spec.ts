import { TestBed } from '@angular/core/testing';
import { Signal, isSignal } from '@angular/core';
import { provideBreakpoints } from './providers';
import {
  up,
  down,
  between,
  matchMediaSignal,
  orientation,
  colorScheme,
  displayMode,
  reducedMotion,
  hover,
  anyHover,
  pointer,
  anyPointer,
  colorGamut,
} from './api';

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

  describe('displayMode()', () => {
    it('should return a boolean signal', () => {
      const signal = TestBed.runInInjectionContext(() => displayMode('fullscreen'));

      expect(isSignal(signal)).toBe(true);
      expect(typeof signal()).toBe('boolean');
      expect(signal.toString()).toContain('displayMode');
    });
  });

  describe('reducedMotion()', () => {
    it('should return a boolean signal', () => {
      const signal = TestBed.runInInjectionContext(() => reducedMotion());

      expect(isSignal(signal)).toBe(true);
      expect(typeof signal()).toBe('boolean');
      expect(signal.toString()).toContain('reducedMotion');
    });
  });

  describe('hover()', () => {
    it('should return a boolean signal', () => {
      const signal = TestBed.runInInjectionContext(() => hover());

      expect(isSignal(signal)).toBe(true);
      expect(typeof signal()).toBe('boolean');
      expect(signal.toString()).toContain('hover');
    });
  });

  describe('anyHover()', () => {
    it('should return a boolean signal', () => {
      const signal = TestBed.runInInjectionContext(() => anyHover());

      expect(isSignal(signal)).toBe(true);
      expect(typeof signal()).toBe('boolean');
      expect(signal.toString()).toContain('anyHover');
    });
  });

  describe('pointer()', () => {
    it('should return a boolean signal', () => {
      const signal = TestBed.runInInjectionContext(() => pointer('fine'));

      expect(isSignal(signal)).toBe(true);
      expect(typeof signal()).toBe('boolean');
      expect(signal.toString()).toContain('pointer');
    });
  });

  describe('anyPointer()', () => {
    it('should return a boolean signal', () => {
      const signal = TestBed.runInInjectionContext(() => anyPointer('fine'));

      expect(isSignal(signal)).toBe(true);
      expect(typeof signal()).toBe('boolean');
      expect(signal.toString()).toContain('anyPointer');
    });
  });

  describe('colorGamut()', () => {
    it('should return a boolean signal', () => {
      const signal = TestBed.runInInjectionContext(() => colorGamut('p3'));

      expect(isSignal(signal)).toBe(true);
      expect(typeof signal()).toBe('boolean');
      expect(signal.toString()).toContain('colorGamut');
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
