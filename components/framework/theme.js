import { theme as Box } from './elements/Box';
import { theme as Text } from './elements/Text';
import { theme as Icon } from './elements/Icon';

import { theme as Columns } from './layout/Columns';
import { em, stripUnit, hsl } from 'polished';
export const px = number => number + 'px';
export const rem = number => number + 'rem';

const colors = {
  white: hsl(0, 0, 1),
  primary: hsl(171, 1, 0.4, 1),
  info: hsl(204, 0.86, 0.53),
  success: hsl(141, 0.71, 48),
  warning: hsl(48, 1, 0.67),
  danger: hsl(348, 1, 0.61),
  black: hsl(0, 0, 0.04),
  light: hsl(0, 0, 0.96),
  dark: hsl(0, 0, 0.21),
  blackBis: hsl(0, 0, 0.7),
  blackTer: hsl(0, 0, 0.14),
  greyDarker: hsl(0, 0, 0.21),
  greyDark: hsl(0, 0, 0.29),
  grey: hsl(0, 0, 0.48),
  greyLight: hsl(0, 0, 0.71),
  greyLighter: hsl(0, 0, 0.86),
  whiteTer: hsl(0, 0, 0.96),
  whiteBis: hsl(0, 0, 0.98)
};

const gap = px(64);

const breakpoints = {
  tablet: px(769),
  desktop: px(960 + 2 * stripUnit(gap)),
  widescreen: px(1152 + 2 * stripUnit(gap)),
  fullhd: px(1344 + 2 * stripUnit(gap))
};

const media = {
  mobile: `@media screen and (max-width: ${em(
    stripUnit(breakpoints.tablet) - 1
  )})`,
  tablet: `@media screen and (min-width: ${em(breakpoints.tablet)})`,
  desktop: `@media screen and (min-width: ${em(breakpoints.desktop)})`,
  widescreen: `@media screen and (min-width: ${em(breakpoints.widescreen)})`,
  fullhd: `@media screen and (min-width: ${em(breakpoints.fullhd)})`
};

export const theme = {
  // Defaults
  defaultFontSize: px(16),
  defaultFontWeight: 400,
  defaultLineHeight: 1.5,
  defaultFontFamily: '"Montserrat", Arial, sans-serif',
  defaultBackgroundColor: colors.whiteBis,
  defaultTextColor: colors.greyDark,

  // Colors
  colors,

  // Responsiveness
  gap,
  breakpoints,
  media,

  // Components
  Columns,
  Box,
  Text,
  Icon
};
