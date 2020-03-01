import styled, { css } from "styled-components";
import { BaseTheme } from "../base";
import { darken } from "polished";
import { control } from "../mixins/control";
import { colorInvert } from "../utils";
import { spacing, Props as SpacingProps } from "../mixins/spacing";

export const theme = {
  textSizes: {
    small: "0.75rem",
    normal: "1rem",
    medium: "1.25rem",
    large: "1.5rem"
  }
};

export type Theme = typeof theme & BaseTheme;

export type Props = {
  theme: Theme;
  fullWidth?: boolean;
  disabled?: boolean;
  inverted?: boolean;
  outlined?: boolean;
  loading?: boolean;
  glow?: boolean;
  color?: string;
  size?: keyof Theme["textSizes"];
} & SpacingProps;

export const Button = styled.button<Props>`
  ${spacing}
  ${control}
  user-select: none;
  background-color: #fff;
  border-color: #dbdbdb;
  border-width: 1px;
  cursor: pointer;
  justify-content: center;
  text-align: center;
  white-space: nowrap;

  ${({ color, theme, disabled, inverted, outlined, loading, glow }) => {
    const themeColor = theme.colors[color || "greyLighter"];
    const themeColorInvert = colorInvert(themeColor);
    return css`
          background-color: ${themeColor};
          border-color: transparent;
          color: ${themeColorInvert};
          ${
            disabled
              ? css`
                  background-color: ${themeColor};
                  border-color: transparent;
                  box-shadow: none;
                `
              : css`
                  :hover {
                    background-color: ${darken("0.025", themeColor)};
                    border-color: transparent;
                    color: ${themeColorInvert};
                  }

                  :focus {
                    border-color: transparent;
                    color: ${themeColorInvert};
                    :not(:active) {
                      box-shadow: 0 0 0 0.125em rgba(${themeColor}, 0.25);
                    }
                  }

                  :active {
                    background-color: ${darken("0.05", themeColor)};
                    color: ${themeColorInvert};
                  }
                `
          }

      ${inverted &&
        css`
          color: ${themeColor};
          background-color: ${themeColorInvert};

          ${disabled
            ? css`
                border-color: transparent;
                box-shadow: none;
              `
            : css`
                :hover {
                  background-color: ${darken("0.05", themeColorInvert)};
                }
              `}
        `}

        ${loading &&
          css`
            :after {
              border-color: transparent transparent ${themeColorInvert}
                ${themeColorInvert} !important;
            }
          `}

        ${outlined &&
          css`
            background-color: transparent;
            border-color: ${themeColor};
            color: ${themeColor};
            :hover,
            :focus {
              background-color: ${themeColor};
              border-color: ${themeColor};
              color: ${themeColorInvert};
            }

            ${loading &&
              css`
                :after {
                  border-color: transparent transparent ${themeColor}
                    ${themeColor} !important;
                }
              `}

            ${disabled &&
              css`
                background-color: transparent;
                border-color: ${themeColor};
                box-shadow: none;
                color: ${themeColor};
              `}
          `}

          ${outlined &&
            inverted &&
            css`
              background-color: transparent;
              border-color: ${themeColorInvert};
              color: ${themeColor};
              :hover,
              :focus {
                background-color: ${themeColorInvert};
                color: ${themeColor};
              }
              ${disabled &&
                css`
                  background-color: transparent;
                  border-color: ${themeColorInvert};
                  box-shadow: none;
                  color: ${themeColorInvert};
                `}
            `}

            ${glow &&
              css`
                filter: drop-shadow(0 0.1mm 0.8mm ${themeColor});
              `}
    `;
  }}

${({ size, theme: { textSizes } }) => {
  const fontSize = textSizes[size || "normal"];
  return css`
      ${size === "small" && `border-radius: 2px;`}
      font-size: ${fontSize};
    `;
}}

  ${({ fullWidth }) => {
    return (
      fullWidth &&
      css`
        width: 100%;
        display: flex;
      `
    );
  }}

${({ loading, theme }) =>
  loading &&
  css`
    @keyframes spinAround {
      from {
        transform: rotate(0deg);
      }
      to {
        transform: rotate(359deg);
      }
    }

    color: transparent !important;
    :after {
      position: absolute !important;
      animation: spinAround 500ms infinite linear;
      border: 2px solid ${theme.colors.greyLight};
      border-radius: 290486px;
      border-right-color: transparent;
      border-top-color: transparent;
      content: "";
      display: block;
      height: 1em;
      position: relative;
      width: 1em;
    }
  `}

`;

export const Link = Button.withComponent("a");
