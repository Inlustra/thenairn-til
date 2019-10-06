import { Breakpoint } from "./base";
import { css } from "styled-components";
import { parseToHsl, rgba } from "polished";

function deepValue(obj: any, path: string) {
  for (var i = 0, paths = path.split("."), len = paths.length; i < len; i++) {
    obj = obj[paths[i]];
  }
  return obj;
}

export const media = (
  media: Breakpoint,
  cssInput: ReturnType<typeof css> | undefined
) => (props: any) =>
  media === "mobile"
    ? cssInput
    : css`
        ${deepValue(props, "theme.media." + media)} {
          ${cssInput}
        }
      `;

export const mediaDefault = <T extends number | string | boolean>(
  mediaDefault: T | { [key in Breakpoint]?: T },
  fn: (param: T) => ReturnType<typeof css> | undefined
) => {
  switch (typeof mediaDefault) {
    case "object":
      return (Object.keys(mediaDefault) as Breakpoint[]).map(mediaSize => {
        const opt = mediaDefault[mediaSize];
        return opt && media(mediaSize, fn(opt));
      });
    default:
      return mediaDefault && fn(mediaDefault);
  }
};

export const toPercentage = (number: number) => (number * 100).toFixed(2) + "%";

export const colorInvert = (color: string) =>
  parseToHsl(color).lightness > 0.65 ? rgba(0, 0, 0, 0.7) : "#fff";
