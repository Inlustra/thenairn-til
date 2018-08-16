import styled, { css } from "styled-components";
import PropTypes from "prop-types";
import { media, colorInvert } from "../utils";

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
  min-height: ${({ isFullHeight }) => isFullHeight && "100vh"};
  min-height: ${({ isHalfHeight }) => isHalfHeight && "50vh"};

  ${({ isColor }) =>
    isColor &&
    css`
      background-color: ${({ theme }) => theme.colors[isColor]};
      color: ${({ theme }) => colorInvert(theme.colors[isColor])};
    `};
    
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
      ${media("tablet")} {
        ${Body} {
          padding-bottom: 9rem;
          padding-top: 9rem;
        }
      }
    `}

  ${({ isLarge }) =>
    isLarge &&
    css`
      ${media("tablet")} {
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
  isColor: PropTypes.bool,
};

Hero.Body = Body;
