import styled, { css } from "styled-components";
import { Props as SpacingProps, spacing } from "../mixins/spacing";
import { Props as LayoutProps, layout } from "../mixins/layout";

export interface Props extends SpacingProps, LayoutProps {
  theme: any;
  inline?: boolean;
  inlineBlock?: boolean;
}

export const Container = styled.div<Props>`
  ${layout}
  ${spacing}
  ${({ inline, inlineBlock }) => css`
    display: ${inline ? "inline" : inlineBlock ? "inline-block" : "block"};
  `}
  margin: 0 auto;
  position: relative;
`;
