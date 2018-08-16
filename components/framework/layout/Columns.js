import styled, { css } from "styled-components";
import PropTypes from "prop-types";
import { media, toPercentage } from "../utils";

export const theme = {
  gap: "0.75rem"
};

export const Columns = styled.div`
  margin-left: -${({ theme }) => theme.Columns.gap};
  margin-right: -${({ theme }) => theme.Columns.gap};
  margin-top: -${({ theme }) => theme.Columns.gap};

  &:last-child {
    margin-bottom: -${({ theme }) => theme.Columns.gap};
  }
  &:not(:last-child) {
    margin-bottom: calc(1.5rem - ${({ theme }) => theme.Columns.gap});
  }

  ${({ isCentered }) =>
    isCentered &&
    css`
      justify-content: center;
    `};

  ${({ isVCentered }) =>
    isVCentered &&
    css`
      align-items: center;
    `}

  ${({ isMultiline }) =>
    isMultiline &&
    css`
      flex-wrap: wrap;
    `}

  ${({ isGapless }) =>
    isGapless &&
    css`
      margin-left: 0;
      margin-right: 0;
      margin-top: 0;
      &:last-child {
        margin-bottom: 0;
      }
      &:not(:last-child) {
        margin-bottom: 1.5rem;
      }
      & > div {
        padding: 0;
      }
    `}

    /* Responsiveness */

    ${({ isMobile }) =>
      isMobile &&
      css`
        display: flex;
      `}

    ${({ fromSize }) =>
      fromSize
        ? css`
            ${media(fromSize)} {
              display: flex;
            }
          `
        : css`
            display: flex;
          `}
`;

Columns.propTypes = {
  isCentered: PropTypes.bool,
  isGapless: PropTypes.bool,
  isMobile: PropTypes.bool,
  isVCentered: PropTypes.bool
};

export const Column = styled.div`
  display: block;
  flex-basis: 0;
  flex-shrink: 1;
  padding: ${({ theme }) => theme.Columns.gap};

  ${({ isSize }) => {
    switch (typeof isSize) {
      case "number":
        return css`
          flex: none;
          width: ${toPercentage(isSize / 12)};
        `;
      case "object":
        return Object.keys(isSize).map(
          mediaSize =>
            css`
              ${media(mediaSize)} {
                flex: none;
                width: ${toPercentage(isSize[mediaSize] / 12)};
              }
            `
        );
      default:
        return "";
    }
  }};
`;
