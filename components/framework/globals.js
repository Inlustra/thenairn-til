import { css } from "styled-components";
import { minireset } from "./minireset";

const custom = (theme, css) => {
  return css
    .map(string => {
      switch (typeof string) {
        case "function":
          return string({ theme });
        default:
          return string;
      }
    })
    .join("")
    .split("\n");
};
const globals = theme =>
  //Workaround until v4 of styled-components
  custom(
    theme,
    css`
      html {
        background-color: ${({ theme }) => theme.defaultBackgroundColor};
        font-size: ${({ theme }) => theme.defaultFontSize};
        -moz-osx-font-smoothing: grayscale;
        -webkit-font-smoothing: antialiased;
        min-width: 300px;
        overflow-x: hidden;
        overflow-y: scroll;
        text-rendering: optimizeLegibility;
        text-size-adjust: 100%;
        box-sizing: border-box;
      }

      body,
      button,
      input,
      select,
      textarea {
        font-family: ${({ theme }) => theme.defaultFontFamily};
      }

      body {
        color: ${({ theme }) => theme.defaultTextColor};
        margin: 0;
        font-size: 1rem;
        font-weight: ${({ theme }) => theme.defaultFontWeight};
        line-height: ${({ theme }) => theme.defaultLineHeight};
      }

      ,
      pre {
        margin: 0;
      }

      ${minireset};
    `
  );

export default globals;
