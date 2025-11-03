import { isString } from 'lodash'
import { Dimensions, Platform } from 'react-native'

// Platform •••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••--
export const isIos = Platform.OS === 'ios'

// DIMENSIONS •••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••--
const { width: screenWidth, height: screenHeight } = Dimensions.get('screen')
const { width: windowWidth, height: windowHeight } = Dimensions.get('window')

// Helper functions to get current window dimensions
export const getWindowWidth = (): number => windowWidth
export const getWindowHeight = (): number => windowHeight

// Define adaptive screen dimensions
const screenAdaptiveWidth = windowWidth
const screenAdaptiveHeight = windowHeight

// Base dimensions (iPhone 14 Pro Max)
const baseWidth = 430
const baseHeight = 932

// Calculate scale factors
const widthScaleFactor = screenWidth / baseWidth
const heightScaleFactor = screenHeight / baseHeight
const scaleFactor = Math.min(widthScaleFactor, heightScaleFactor)

// Scaling functions
export const getSize = (size: number | string): number => {
  if (isString(size)) {
    const parsedSize = parseFloat(size)
    return isNaN(parsedSize) ? 0 : Math.round(parsedSize * scaleFactor)
  }

  return Math.round(size * scaleFactor)
}

export const getScaledSize = (size: number): number => {
  return Math.round(size * scaleFactor)
}

export const getScaledWidth = (size: number): number => {
  return Math.round(size * widthScaleFactor)
}

export const getScaledHeight = (size: number): number => {
  return Math.round(size * heightScaleFactor)
}

// Update ratio functions to use the dynamic dimension getters
export const getWidthByRatio = (ratio: number): number =>
  getWindowWidth() * ratio
export const getHeightByRatio = (ratio: number): number =>
  getWindowHeight() * ratio

// Design based on iPhone 14 Pro Max
const designScreenWidth = 430
const designScreenHeight = 932

// Adjusted functions for both mobile and desktop
export const getAdjustedWidth = (
  width: number | string,
  customDesignWidth = designScreenWidth,
): number | string => {
  if (typeof width === 'string') {
    return width
  }
  return width * (screenAdaptiveWidth / customDesignWidth)
}

export const getAdjustedHeight = (
  height: number | string,
  customDesignHeight = designScreenHeight,
): number | string => {
  if (typeof height === 'string') {
    return height
  }
  return height * (screenAdaptiveHeight / customDesignHeight)
}
