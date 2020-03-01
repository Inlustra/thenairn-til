import styled from "styled-components";
import { BaseTheme } from "../base";
import {
  spacing,
  Props as SpacingProps,
  Theme as SpacingTheme
} from "../mixins/spacing";

export const theme = {
  Box: {
    shadow: `0 2px 3px rgba(10,10,10,.1), 0 0 0 1px rgba(10,10,10,.1)`,
    padding: `1.25rem`,
    radius: `6px`,
    backgroundColor: `#fff`
  }
};

export type Theme = typeof theme & BaseTheme & SpacingTheme;

export interface Props extends SpacingProps {
  theme: Theme;
}

export const Box = styled.div<Props>`
  display: block;
  color: ${({ theme }: Props) => theme.defaultTextColor};
  box-shadow: ${({ theme }: Props) => theme.Box.shadow};
  padding: ${({ theme }: Props) => theme.Box.padding};
  border-radius: ${({ theme }: Props) => theme.Box.radius};
  background-color: ${({ theme }: Props) => theme.Box.backgroundColor};
  ${spacing}
`;
