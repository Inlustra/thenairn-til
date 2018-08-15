import { theme as Columns } from './layout/Columns';

export const px = number => number + 'px';
export const rem = number => number + 'rem';

const breakpoints = {
  tablet: px(769),
  desktop: px(960 + 2 * 64),
  widescreen: px(1152 + 2 * 64),
  fullhd: px(1344 + 2 * 64)
};

export const theme = {

  // Typography
  defaultFontSize: px(14),
  defaultFontWeight: 400,
  defaultLineHeight: px(12),
  defaultFontFamily: '"Montserrat", Arial, sans-serif',

  // Colors
  defaultBackgroundColor: '#ffffff',
  defaultTextColor: '#000000',
  link: '#123455',

  // Responsiveness
  breakpoints,

  // Components
  Columns
};