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
  min-height: ${({ fullHeight }) => fullHeight && '100vh'};
  min-height: ${({ halfHeight }) => halfHeight && '50vh'};

  ${({ color, bold, theme }) => {
    const bg = theme.colors[color];
    const textColor = colorInvert(bg);
    if (bold) {
      const colorTopLeft = darken(0.1, saturate(0.1, adjustHue(-10, bg)));
      const colorBottomRight = lighten(0.05, saturate(0.05, adjustHue(10, bg)));
      console.log(bg)
      console.log(colorTopLeft)
      console.log(colorBottomRight)
      return `
        color: ${textColor};
        background-image: linear-gradient(141deg, ${colorTopLeft} 0%, ${bg} 71%, ${colorBottomRight} 100%);
      `;
    } else {
      return css`
        background-color: ${bg};
        color: ${textColor};
      `;
    }
  }};


    
  ${({ small }) =>
    small &&
    css`
      ${Body} {
        padding-bottom: 1.5rem;
        padding-top: 1.5rem;
      }
    `}

  ${({ medium }) =>
    medium &&
    css`
      ${media('tablet')} {
        ${Body} {
          padding-bottom: 9rem;
          padding-top: 9rem;
        }
      }
    `}

  ${({ large }) =>
    large &&
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
  fullHeight: PropTypes.bool,
  large: PropTypes.bool,
  medium: PropTypes.bool,
  small: PropTypes.bool,
  color: PropTypes.string,
  bold: PropTypes.bool
};

Hero.Body = Body;
