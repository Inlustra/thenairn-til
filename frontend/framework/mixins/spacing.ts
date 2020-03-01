import { css } from "styled-components";

export const theme = {
  spacing: {
    xs: "2px",
    sm: "4px",
    md: "8px",
    lg: "16px",
    xl: "32px"
  }
};

export type Theme = {
  spacing: typeof theme["spacing"] & {
    [key: string]: string;
  };
};

type SpacingPosition = "t" | "r" | "b" | "l" | "x" | "y";

type SpacingProp =
  | Partial<
      { [key in SpacingPosition]: keyof typeof theme["spacing"] }
    >
  | keyof typeof theme["spacing"]
  | string;

export interface Props {
  theme: Theme;
  padding?: SpacingProp;
  margin?: SpacingProp;
}

function generateSpacing(theme: Theme, spacing: SpacingProp) {
  if (typeof spacing === "object") {
    let top = "0",
      left = "0",
      bottom = "0",
      right = "0";
    Object.keys(spacing).forEach(position => {
      const spacingPosition = position as SpacingPosition;
      const themeSpace = spacing[spacingPosition] as string;
      const amount = theme.spacing[themeSpace] || themeSpace;
      switch (spacingPosition) {
        case "t":
          return (top = amount);
        case "l":
          return (left = amount);
        case "b":
          return (bottom = amount);
        case "r":
          return (right = amount);
        case "x":
          return (left = right = amount);
        case "y":
          return (bottom = top = amount);
      }
    });
    return `${top} ${left} ${bottom} ${right}`;
  } else {
    const amount = theme.spacing[spacing] as string;
    return `${amount}`;
  }
}

export const spacing = ({ theme }: Props) => css`
  ${({ padding }: Props) =>
    padding &&
    css`
      padding: ${generateSpacing(theme, padding)};
    `}

  ${({ margin }: Props) =>
    margin &&
    css`
      margin: ${generateSpacing(theme, margin)};
    `}
`;
