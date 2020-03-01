import * as styledComponents from "styled-components";
import { ThemedStyledComponentsModule } from "styled-components";
import { BaseTheme, baseTheme } from "./base";
import { theme as boxTheme } from "./elements/Box";
import { theme as iconTheme } from "./elements/Icon";
import { theme as textTheme } from "./elements/Text";
import { theme as buttonTheme } from "./elements/Button";
import { theme as columnsTheme } from "./layout/Columns";
import { theme as controlTheme } from "./mixins/control";
import { theme as spacingTheme } from "./mixins/spacing";
import { theme as navbarTheme } from "./components/Navbar";
import merge from "lodash/merge";

type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends Array<infer U>
    ? Array<DeepPartial<U>>
    : T[P] extends ReadonlyArray<infer U>
    ? ReadonlyArray<DeepPartial<U>>
    : DeepPartial<T[P]>;
};

export function createTheme<T, B extends DeepPartial<BaseTheme>, E>(
  componentThemes?: T[],
  baseOverrides?: B,
  extras?: E
) {
  return merge(
    {
      ...baseTheme,
      ...boxTheme,
      ...iconTheme,
      ...textTheme,
      ...columnsTheme,
      ...buttonTheme,
      ...navbarTheme,
      // Mixins
      ...controlTheme,
      ...spacingTheme
    },
    ...(componentThemes || []),
    baseOverrides,
    extras
  );
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
