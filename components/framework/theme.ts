import { BaseTheme, baseTheme } from "./base";
import { theme as boxTheme } from "./elements/Box";
import { theme as iconTheme } from "./elements/Icon";
import { theme as textTheme } from "./elements/Text";
import { theme as columnsTheme } from "./layout/Columns";

export function createTheme<T>(themes?: T[], base: BaseTheme = baseTheme) {
  return {
    ...base,
    ...(themes
      ? themes.reduce((prev, curr) => ({ ...prev, ...curr }), {})
      : []),
    ...boxTheme,
    ...iconTheme,
    ...textTheme,
    ...columnsTheme
  };
}
