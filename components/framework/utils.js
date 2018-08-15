import { css } from 'styled-components';

function deepValue(obj, path) {
  for (var i = 0, paths = path.split('.'), len = paths.length; i < len; i++) {
    obj = obj[paths[i]];
  }
  return obj;
}

function getBreakpoint(breakpoint, { theme }) {
  if (!theme)
    throw new Error(
      "No theme defined, make sure you've correctly wrapped your app in ThemeProvider"
    );
  return deepValue(theme, 'breakpoints.'+breakpoint);
}

export const mediaFrom = breakpoint => (...args) => props => css`

`

export const mediaLessThan = breakpoint => (...args) => props => css`
  @media (max-width: ${getBreakpoint(breakpoint, props)}) {
    ${css(...args)};
  }
`;

export const mediaGreaterThan = breakpoint => (...args) => props => css`
  @media (min-width: ${getBreakpoint(breakpoint, props)}) {
    ${css(...args)};
  }
`;

export const mediaBetween = (firstBreakpoint, secondBreakpoint) => (
  ...args
) => props => css`
  @media (min-width: ${getBreakpoint(
      firstBreakpoint,
      props
    )}) and (max-width: ${getBreakpoint(secondBreakpoint, props)}) {
    ${css(...args)};
  }
`;

export const toPercentage = number => (number * 100).toFixed(2) + '%';

