import styled from "styled-components";
import { BaseTheme } from "../base";
import { spacing, Props as SpacingProps } from "../mixins/spacing";
import { control } from "../mixins/control";

export const theme = {
  input: {}
};

export type Theme = typeof theme & BaseTheme;

export type Props = {} & SpacingProps;

export const Input = styled.input<Props>`
  ${control}
  ${spacing}
  border: 1px solid black;
`;
