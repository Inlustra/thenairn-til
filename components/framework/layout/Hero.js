import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';
import { media, colorInvert } from '../utils';
import { darken, lighten, saturate, adjustHue } from 'polished';

const Body = styled.div`
  display: flex;
  align-items: center;
  flex-grow: 1;
  flex-shrink: 0;
  padding: 3rem 1.5rem;

  & > div {
    flex-grow: 1;
    flex-shrink: 1;
  }
`;

export const Hero = styled.div`
  display: flex;
  align-items: stretch;
  flex-direction: column;
  justify-content: space-between;
  min-height: ${({ isFullHeight }) => isFullHeight && '100vh'};
  min-height: ${({ isHalfHeight }) => isHalfHeight && '50vh'};
  
  ${({ isColor, isBold, theme }) => {
    console.log(theme.colors);
    console.log(theme.colors[isColor]);
    console.log(isColor);
    const bg = theme.colors[isColor];
    const color = colorInvert(bg);
    if (isBold) {
      const colorTopLeft = darken(0.1, saturate(0.1, adjustHue(-10, bg)));
      const colorBottomRight = lighten(0.05, saturate(0.05, adjustHue(10, bg)));
      return `
        background-image: linear-gradient(141deg, ${colorTopLeft} 0%, ${bg} 71%, ${colorBottomRight} 100%);
      `;
    } else {
      return css`
        background-color: ${bg};
        color: ${color};
      `;
    }
  }};


    
  ${({ isSmall }) =>
    isSmall &&
    css`
      ${Body} {
        padding-bottom: 1.5rem;
        padding-top: 1.5rem;
      }
    `}

  ${({ isMedium }) =>
    isMedium &&
    css`
      ${media('tablet')} {
        ${Body} {
          padding-bottom: 9rem;
          padding-top: 9rem;
        }
      }
    `}

  ${({ isLarge }) =>
    isLarge &&
    css`
      ${media('tablet')} {
        ${Body} {
          padding-bottom: 18rem;
          padding-top: 18rem;
        }
      }
    `}
`;

Hero.propTypes = {
  isFullHeight: PropTypes.bool,
  isLarge: PropTypes.bool,
  isMedium: PropTypes.bool,
  isSmall: PropTypes.bool,
  isColor: PropTypes.string,
  isBold: PropTypes.bool
};

Hero.Body = Body;
