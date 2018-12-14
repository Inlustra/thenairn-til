import styled, { css } from "styled-components";
import { media } from "../utils";
import { BaseTheme, Breakpoint } from "../base";

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

export type Theme = typeof theme & BaseTheme;
export type TextWeight = keyof Theme["Text"]["weights"];
export type TextSize = keyof Theme["Text"]["sizes"];

export interface Props {
  theme: Theme;
  inline?: boolean;
  weight?: number | TextWeight;
  size?: TextSize | { [K in Breakpoint]?: TextSize };
  centered?: boolean;
  justified?: boolean;
  left?: boolean;
  right?: boolean;
}

export const Text = styled.p<Props>`
  ${({ inline }) => inline && `display: inline;`};

  ${({ size, theme }: Props) => {
    switch (typeof size) {
      case "object":
        return (Object.keys(size) as Breakpoint[]).map(
          mediaSize =>
            css`
              ${media(mediaSize)} {
                font-size: ${theme.Text.sizes[size[mediaSize] as TextSize] ||
                  theme.defaultFontSize};
              }
            `
        );
      default:
        return css`
          font-size: ${size ? theme.Text.sizes[size] : theme.defaultFontSize};
        `;
    }
  }};

  ${({ color, theme }) =>
    css`
      color: ${color ? theme.colors[color] : theme.defaultTextColor};
    `};

  ${({ weight, theme }) =>
    css`
      font-weight: ${weight
        ? typeof weight === "number"
          ? weight
          : theme.Text.weights[weight]
        : theme.defaultFontWeight};
    `};

  text-align: ${({ centered, justified, left, right }) =>
    (centered && "center") ||
    (justified && "justify") ||
    (left && "left") ||
    (right && "right")};
`;
