import * as styledComponents from "styled-components";
import { ThemedStyledComponentsModule } from "styled-components";
import { BaseTheme, baseTheme } from "./base";
import { theme as boxTheme } from "./elements/Box";
import { theme as iconTheme } from "./elements/Icon";
import { theme as textTheme } from "./elements/Text";
import { theme as columnsTheme } from "./layout/Columns";

export function createTheme<T>(themes?: T[], base: BaseTheme = baseTheme) {
  return {
    ...base,
    ...boxTheme,
    ...iconTheme,
    ...textTheme,
    ...columnsTheme,
    ...(themes ? themes.reduce((prev, curr) => ({ ...prev, ...curr }), {}) : [])
  };
}

const defaultTheme = createTheme();

const {
  default: styled,
  css,
  createGlobalStyle,
  keyframes,
  ThemeProvider
} = styledComponents as ThemedStyledComponentsModule<typeof defaultTheme>;

export {
  css,
  createGlobalStyle,
  keyframes,
  ThemeProvider,
  styled,
  defaultTheme
};
