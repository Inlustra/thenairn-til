import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';
import { media } from '../utils';

export const theme = {
  sizes: {
    1: '3rem',
    2: '2.5rem',
    3: '2rem',
    4: '1.5rem',
    5: '1.25rem',
    6: '1rem',
    7: '0.75rem'
  },
  weights: {
    bold: 700,
    semibold: 600,
    medium: 500,
    normal: 400,
    light: 300
  }
};

export const Text = styled.div`
  ${({ inline }) => inline && `display: inline;`};

  ${({ size, theme }) => {
    switch (typeof size) {
      case 'object':
        return Object.keys(size).map(
          mediaSize =>
            css`
              ${media(mediaSize)} {
                font-size: ${theme.Text.sizes[size[mediaSize]] ||
                  theme.defaultFontSize};
              }
            `
        );
      default:
        return css`
          font-size: ${theme.Text.sizes[size] || theme.defaultFontSize};
        `;
    }
  }};

  ${({ color, theme }) =>
    css`
      color: ${theme.colors[color] || theme.defaultTextColor};
    `};

  ${({ weight, theme }) =>
    css`
      font-weight: ${typeof weight === 'number'
        ? weight
        : theme.Text.weights[weight] || theme.defaultTextColor};
    `};

  text-align: ${({ centered, justified, left, right }) =>
    (centered && 'center') ||
    (justified && 'justify') ||
    (left && 'left') ||
    (right && 'right')};
`;

Text.propTypes = {
  centered: PropTypes.bool,
  justified: PropTypes.bool,
  left: PropTypes.bool,
  right: PropTypes.bool,
  inline: PropTypes.bool,
  size: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.objectOf(PropTypes.number)
  ]),
  weight: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  color: PropTypes.string
};
