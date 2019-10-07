import { css } from "styled-components";

export interface Props {
  clipped?: boolean;
}

export const layout = css<Props>`
  ${({ clipped }) =>
    clipped &&
    css`
      overflow: hidden;
    `}
`;
