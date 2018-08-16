import styled, { css }  from "styled-components";
import {stripUnit} from 'polished'

export const Container = styled.div`
  margin: 0 auto;
  position: relative;

  ${({ theme }) =>
    Object.keys(theme.breakpoints).map(
      breakpoint => css`
        ${theme.media[breakpoint]} {
          max-width: ${stripUnit(theme.breakpoints[breakpoint]) - 2 * theme.gap};
          width: 
        }
      `
    )};
`;
