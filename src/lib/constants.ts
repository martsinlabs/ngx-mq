import { MqBreakpoints } from './models';

export const TAILWIND_BREAKPOINTS: MqBreakpoints = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
};

export const BOOTSTRAP_BREAKPOINTS: MqBreakpoints = {
  sm: 576,
  md: 768,
  lg: 992,
  xl: 1200,
  xxl: 1400,
};

export const MATERIAL_BREAKPOINTS: MqBreakpoints = {
  sm: 600,
  md: 905,
  lg: 1240,
  xl: 1440,
};

export const DEFAULT_BREAKPOINT_EPSILON: number = 0.02;
