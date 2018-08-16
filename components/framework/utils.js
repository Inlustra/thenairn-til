import { css } from "styled-components";
import { parseToHsl } from "polished";

function deepValue(obj, path) {
  for (var i = 0, paths = path.split("."), len = paths.length; i < len; i++) {
    obj = obj[paths[i]];
  }
  return obj;
}

export const media = media => props => deepValue(props, "theme.media." + media);

export const toPercentage = number => (number * 100).toFixed(2) + "%";
export const colorInvert = str =>
  parseToHsl(str).lightness > 0.55 ? "rgba(#000, 0.7)" : "#fff";
