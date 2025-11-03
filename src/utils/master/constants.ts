import { getSize } from './globalUtilityFunctionsAndConstants'

// GENERAL
export const SPACE = {
  64: getSize(64),
  32: getSize(32),
  24: getSize(24),
  18: getSize(18),
  12: getSize(12),
  8: getSize(8),
  4: getSize(4),
}

export const BORDER_RADIUS = {
  circle: 1000,
  40: 40, // iPhone screen radius
  25: 25,
  20: 20,
  13: 13,
  10: 10,
}

export const SCREEN_MARGIN_HORIZONTAL = SPACE[18]
