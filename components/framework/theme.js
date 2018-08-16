import { theme as Box } from "./elements/Box";
import { theme as Columns } from "./layout/Columns";
import { theme as Text } from "./elements/Text";
import { em, stripUnit, hsl } from "polished";
export const px = number => number + "px";
export const rem = number => number + "rem";

const colors = {
  primary: hsl(171, 1, 0.41),
  info: hsl(204, 0.86, 0.53),
  success: hsl(141, 0.71, 48),
  warning: hsl(171, 1, 0.67),
  danger: hsl(348, 1, 0.61)
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
  defaultFontSize: px(14),
  defaultFontWeight: 400,
  defaultLineHeight: px(12),
  defaultFontFamily: '"Montserrat", Arial, sans-serif',
  defaultBackgroundColor: "#ffffff",
  defaultTextColor: "#000000",
  link: "#123455",

  // Colors
  colors,

  // Responsiveness
  gap,
  breakpoints,
  media,

  // Components
  Columns,
  Box,
  Text
};
