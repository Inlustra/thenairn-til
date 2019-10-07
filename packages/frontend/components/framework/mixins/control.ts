import { css } from "styled-components";

export const theme = {
  controls: {
    radius: "4px",
    borderWidth: "1px",
    height: "2.25em",
    lineHeight: "1.5",
    paddingVertical: "calc(0.375em - 1px)",
    paddingHorizontal: "calc(0.625em - 1px)",
    fontSize: "1rem"
  }
};

export type Props = {
  theme: Theme;
  disabled?: boolean;
};

export type Theme = typeof theme;

export const control = ({ theme, disabled }: Props) => css`
  appearance: none;
  align-items: center;
  border: ${theme.controls.borderWidth} solid transparent;
  border-radius: ${theme.controls.radius};
  box-shadow: none;
  display: inline-flex;
  font-size: ${theme.controls.fontSize};
  height: ${theme.controls.height};
  justify-content: flex-start;
  line-height: ${theme.controls.lineHeight};
  padding-bottom: ${theme.controls.paddingVertical};
  padding-left: ${theme.controls.paddingHorizontal};
  padding-right: ${theme.controls.paddingHorizontal};
  padding-top: ${theme.controls.paddingVertical};
  position: relative;
  vertical-align: top;
  // States
  :focus,
  :active {
    outline: none;
  }

  ${disabled &&
    css`
      cursor: not-allowed;
    `}
`;
