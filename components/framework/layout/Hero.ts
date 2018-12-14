import styled, { css } from "styled-components";
import { media, colorInvert } from "../utils";
import { darken, lighten, saturate, adjustHue } from "polished";
import { BaseTheme, Color } from "../base";

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

export interface Props {
  theme: BaseTheme;
  fullHeight?: boolean;
  halfHeight?: boolean;
  color: Color;
  bold?: boolean;
  small?: boolean;
  medium?: boolean;
  large?: boolean;
}

export const Hero = styled.div<Props>`
  display: flex;
  align-items: stretch;
  flex-direction: column;
  justify-content: space-between;
  min-height: ${({ fullHeight }) => fullHeight && "100vh"};
  min-height: ${({ halfHeight }) => halfHeight && "50vh"};

  ${({ color, bold, theme }: Props) => {
    const bg = theme.colors[color];
    const textColor = colorInvert(bg);
    if (bold) {
      const colorTopLeft = darken(0.1, saturate(0.1, adjustHue(-10, bg)));
      const colorBottomRight = lighten(0.05, saturate(0.05, adjustHue(10, bg)));
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
      ${media("tablet")} {
        ${Body} {
          padding-bottom: 9rem;
          padding-top: 9rem;
        }
      }
    `}

  ${({ large }) =>
    large &&
    css`
      ${media("tablet")} {
        ${Body} {
          padding-bottom: 18rem;
          padding-top: 18rem;
        }
      }
    `}
`;
