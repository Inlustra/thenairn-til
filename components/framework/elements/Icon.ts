import styled, { css } from "styled-components";
import { BaseTheme } from "../base";

export const theme = {
  Icon: {
    sizes: {
      small: "1rem",
      medium: "2rem",
      large: "3rem",
      default: "1.5rem"
    }
  }
};


export type Theme = typeof theme & BaseTheme;
export type IconSize = keyof Theme["Icon"]["sizes"];

export interface Props {
  size?: IconSize;
  theme: Theme;
}

const getSize = ({ size, theme }: Props) => {
  switch (typeof size) {
    case "string":
      return theme.Icon.sizes[size];
    default:
      return theme.Icon.sizes.default;
  }
};

export const Icon = styled.span<Props>`
  align-items: center;
  display: inline-flex;
  justify-content: center;

  ${props => {
    const size = getSize(props);
    return css`
      height: ${size};
      width: ${size};
    `;
  }};
`;
