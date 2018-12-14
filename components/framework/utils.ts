import { parseToHsl } from "polished";
import { Breakpoint } from "./base";

function deepValue(obj: any, path: string) {
  for (var i = 0, paths = path.split("."), len = paths.length; i < len; i++) {
    obj = obj[paths[i]];
  }
  return obj;
}

export const media = (media: Breakpoint) => (props: any) =>
  deepValue(props, "theme.media." + media);

export const toPercentage = (number: number) => (number * 100).toFixed(2) + "%";
export const colorInvert = (str: string) =>
  parseToHsl(str).lightness > 0.55 ? "rgba(#000, 0.7)" : "#fff";
