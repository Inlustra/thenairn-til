import {
  createGlobalStyle,
  GlobalStyleComponent,
  CSSObject,
  InterpolationFunction,
  Interpolation
} from "styled-components";
import { minireset } from "./minireset";
import { BaseTheme } from "./base";

interface Props {
  theme: BaseTheme;
}

const GlobalStyles = (createGlobalStyle as (
  first: TemplateStringsArray | CSSObject | InterpolationFunction<Props>,
  ...interpolations: Array<Interpolation<Props>>
) => GlobalStyleComponent<Props, BaseTheme>)`
  html {
    background-color: ${({ theme }: Props) => theme.defaultBackgroundColor};
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
`;

export default GlobalStyles;
