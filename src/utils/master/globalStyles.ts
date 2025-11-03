import { StyleSheet } from 'react-native'
import { colors } from './colors'
import { SCREEN_MARGIN_HORIZONTAL, SPACE } from './constants'
import { getSize, getWidthByRatio } from './globalUtilityFunctionsAndConstants'

export const globalStyle = StyleSheet.create({
  // TEXT
  textExtraSize: {
    color: colors.white,
    fontSize: getSize(36),
    fontWeight: '600',
  },

  title: {
    color: colors.white,
    fontSize: getSize(28),
    fontWeight: '600',
  },

  subTitle: {
    color: colors.white,
    fontSize: getSize(22),
    fontWeight: '600',
  },

  detailsTitle: {
    color: colors.white,
    fontSize: getSize(20),
    fontWeight: '600',
  },

  detailsText: {
    color: colors.white,
    fontSize: getSize(18),
    fontWeight: '500',
  },

  bodyText: {
    color: colors.white,
    fontSize: getSize(15),
    fontWeight: '400',
  },

  mediumText: {
    color: colors.white,
    fontSize: getSize(13),
  },

  smallText: {
    color: colors.white,
    fontSize: getSize(11),
  },

  errorText: {
    color: colors.textError,
    fontSize: getSize(11),
  },

  boldText: {
    fontWeight: '800',
  },

  underlineText: {
    textDecorationLine: 'underline',
  },

  centeredText: {
    textAlign: 'center',
  },

  grayText: {
    color: colors.textInactive,
  },

  primaryText: {
    color: colors.primary,
  },

  blackText: {
    color: colors.offBlack,
  },

  // STYLE
  width100Percent: {
    width: '100%',
  },

  flex: {
    flex: 1,
  },

  flexGrow: {
    flexGrow: 1,
  },

  flexShrink: {
    flexShrink: 1,
  },

  flexWrap: {
    flexWrap: 'wrap',
    gap: SPACE[12],
  },

  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  simpleRow: {
    flexDirection: 'row',
  },

  screenPadding: {
    paddingHorizontal: SCREEN_MARGIN_HORIZONTAL,
  },

  screenMargin: {
    marginHorizontal: SCREEN_MARGIN_HORIZONTAL,
  },

  spaceBetween: {
    height: SPACE[32],
    width: '100%',
  },

  spaceBetweenSmall: {
    height: SPACE[18],
    width: '100%',
  },

  spaceBetweenXSmall: {
    height: SPACE[12],
    width: '100%',
  },

  spaceBetweenXXSmall: {
    height: SPACE[4],
    width: '100%',
  },

  screenContentWidth: {
    width: getWidthByRatio(1) - 2 * SCREEN_MARGIN_HORIZONTAL,
    alignSelf: 'center',
  },

  centerContent: {
    justifyContent: 'center',
    alignItems: 'center',
  },

  spaceRight: {
    marginRight: SPACE[12],
  },

  spaceLeft: {
    marginLeft: SPACE[12],
  },

  absoluteFill: {
    ...StyleSheet.absoluteFillObject,
  },
})
