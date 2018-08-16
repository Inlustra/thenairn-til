import styled, { css } from "styled-components";
import { media } from "../utils";

export const theme = {
  1: "3rem",
  2: "2.5rem",
  3: "2rem",
  4: "1.5rem",
  5: "1.25rem",
  6: "1rem",
  7: "0.75rem"
};

export const Text = styled.span`
  ${({ isSize, theme }) => {
    switch (typeof isSize) {
      case "object":
        return Object.keys(isSize).map(
          mediaSize =>
            css`
              ${media(mediaSize)} {
                font-size: ${theme.Text[isSize[mediaSize]] ||
                  theme.defaultFontSize};
              }
            `
        );
      default:
        return css`
          font-size: ${theme.Text[isSize] || theme.defaultFontSize};
        `;
    }
  }};

  
`;
