import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';
import { media, toPercentage } from '../utils';

export const theme = {
  gap: '0.75rem'
};

export const Columns = styled.div`

  &:last-child {
    margin-bottom: -${({ theme }) => theme.Columns.gap};
  }
  &:not(:last-child) {
    margin-bottom: calc(1.5rem - ${({ theme }) => theme.Columns.gap});
  }

  ${({ centered }) =>
    centered &&
    css`
      justify-content: center;
    `};

  ${({ vCentered }) =>
    !vCentered &&
    css`
      margin-left: -${({ theme }) => theme.Columns.gap};
      margin-right: -${({ theme }) => theme.Columns.gap};
      margin-top: -${({ theme }) => theme.Columns.gap};
    `}

  ${({ vCentered }) =>
    vCentered &&
    css`
      height: 100%;
      width: 100%;
      align-items: center;
    `}

  ${({ multiline }) =>
    multiline &&
    css`
      flex-wrap: wrap;
    `}

  ${({ gapless }) =>
    gapless &&
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

    ${({ mobile }) =>
      mobile &&
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
            ${media('tablet')} {
              display: flex;
            }
          `}
`;

Columns.propTypes = {
  centered: PropTypes.bool,
  gapless: PropTypes.bool,
  mobile: PropTypes.bool,
  vCentered: PropTypes.bool,
  multiline: PropTypes.bool,
  fromSize: PropTypes.string
};

export const Column = styled.div`
  display: block;
  flex-basis: 0;
  flex-grow: 1;
  flex-shrink: 1;
  padding: ${({ theme }) => theme.Columns.gap};

  ${({ size }) => {
    switch (typeof size) {
      case 'number':
        return css`
          flex: none;
          width: ${toPercentage(size / 12)};
        `;
      case 'object':
        return Object.keys(size).map(
          mediaSize =>
            css`
              ${media(mediaSize)} {
                flex: none;
                width: ${toPercentage(size[mediaSize] / 12)};
              }
            `
        );
      default:
        return '';
    }
  }};

  ${({ narrow }) => {
    switch (typeof narrow) {
      case 'boolean':
        return (
          narrow &&
          css`
            flex: none;
          `
        );
      case 'object':
        return Object.keys(narrow).map(
          mediaSize =>
            css`
              ${media(mediaSize)} {
                flex: none;
              }
            `
        );
      default:
        return '';
    }
  }};
`;

Column.propTypes = {
  size: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.objectOf(PropTypes.number)
  ]),
  narrow: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.objectOf(PropTypes.boolean)
  ])
};
