import styled, { css } from "styled-components";
import { media } from "../utils";
import { BaseTheme, Breakpoint } from "../base";
import {
  Props as SpacingProps,
  spacing,
  Theme as SpacingTheme
} from "../mixins/spacing";

export const theme = {
  Text: {
    sizes: {
      1: "3rem",
      2: "2.5rem",
      3: "2rem",
      4: "1.5rem",
      5: "1.25rem",
      6: "1rem",
      7: "0.75rem"
    },
    weights: {
      bold: 700,
      semibold: 600,
      medium: 500,
      normal: 400,
      light: 300
    }
  }
};

export type Theme = typeof theme & BaseTheme & SpacingTheme;
export type TextWeight = keyof Theme["Text"]["weights"];
export type TextSize = keyof Theme["Text"]["sizes"];

export interface Props extends SpacingProps {
  theme: Theme;
  inline?: boolean;
  weight?: number | TextWeight;
  size?: TextSize | { [K in Breakpoint]?: TextSize };

  centered?: boolean;
  justified?: boolean;
  left?: boolean;
  right?: boolean;

  italic?: boolean;
  lowercase?: boolean;
  uppercase?: boolean;
  capitalized?: boolean;
}

export const Text = styled.p<Props>`
  ${spacing}
  ${({ inline }) => inline && `display: inline;`};

  ${({ size, theme }: Props) => {
    switch (typeof size) {
      case "object":
        return (Object.keys(size) as Breakpoint[]).map(mediaSize =>
          media(
            mediaSize,
            css`
              font-size: ${theme.Text.sizes[size[mediaSize] as TextSize]};
            `
          )
        );
      default:
        return css`
          font-size: ${size ? theme.Text.sizes[size] : theme.defaultFontSize};
        `;
    }
  }};

  ${({ color, theme }) =>
    css`
      color: ${color ? theme.colors[color] || color : theme.defaultTextColor};
    `};

  ${({ weight, theme }) =>
    css`
      font-weight: ${weight
        ? typeof weight === "number"
          ? weight
          : theme.Text.weights[weight]
        : theme.defaultFontWeight};
    `};

    ${({ lowercase, uppercase, capitalized, italic }) => {
      if (capitalized) {
        return css`
          text-transform: capitalize !important;
        `;
      } else if (lowercase) {
        return css`
          text-transform: lowercase !important;
        `;
      } else if (uppercase) {
        return css`
          text-transform: uppercase !important;
        `;
      } else if (italic) {
        return css`
          text-transform: italic !important;
        `;
      }
    }}

  text-align: ${({ centered, justified, left, right }) =>
    (centered && "center") ||
    (justified && "justify") ||
    (left && "left") ||
    (right && "right")};
`;
