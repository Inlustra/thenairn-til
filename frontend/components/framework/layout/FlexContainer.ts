import styled, { css } from "styled-components";
import { Props as SpacingProps, spacing } from "../mixins/spacing";
import { Props as LayoutProps, layout } from "../mixins/layout";

export interface Props extends SpacingProps, LayoutProps {
  theme: any;
  inline?: boolean;
  row?: boolean;
  rowReverse?: boolean;
  column?: boolean;
  columnReverse?: boolean;
  nowrap?: boolean;
  wrap?: boolean;
  wrapReverse?: boolean;
  justifyStart?: boolean;
  justifyEnd?: boolean;
  justifyCenter?: boolean;
  justifyBetween?: boolean;
  justifyAround?: boolean;
  contentStart?: boolean;
  contentEnd?: boolean;
  contentCenter?: boolean;
  contentSpaceBetween?: boolean;
  contentSpaceAround?: boolean;
  contentStretch?: boolean;
  alignStart?: boolean;
  alignEnd?: boolean;
  alignCenter?: boolean;
  alignBaseline?: boolean;
  alignStretch?: boolean;
  full?: boolean;
  center?: boolean;
}

export const FlexContainer = styled.div<Props>`
    ${layout}
    ${spacing}

  ${({ inline }) => css`
    display: ${inline ? "inline-flex" : "flex"};
  `}

  ${({ row }) =>
    row &&
    css`
      flex-direction: row;
    `};

  ${({ rowReverse }) =>
    rowReverse &&
    css`
      flex-direction: row-reverse;
    `};
  ${({ column }) =>
    column &&
    css`
      flex-direction: column;
    `};
  ${({ columnReverse }) =>
    columnReverse &&
    css`
      flex-direction: column-reverse;
    `};
  ${({ nowrap }) =>
    nowrap &&
    css`
      flex-wrap: nowrap; /* default */
    `};
  ${({ wrap }) =>
    wrap &&
    css`
      flex-wrap: wrap;
    `};
  ${({ wrapReverse }) =>
    wrapReverse &&
    css`
      flex-wrap: wrap-reverse;
    `};

  ${({ justifyStart }) =>
    justifyStart &&
    css`
      justify-content: flex-start; /* default */
    `};
  ${({ justifyEnd }) =>
    justifyEnd &&
    css`
      justify-content: flex-end;
    `};
  ${({ justifyCenter }) =>
    justifyCenter &&
    css`
      justify-content: center;
    `};
  ${({ justifyBetween }) =>
    justifyBetween &&
    css`
      justify-content: space-between;
    `};
  ${({ justifyAround }) =>
    justifyAround &&
    css`
      justify-content: space-around;
    `};

  ${({ contentStart }) =>
    contentStart &&
    css`
      align-content: flex-start;
    `};
  ${({ contentEnd }) =>
    contentEnd &&
    css`
      align-content: flex-end;
    `};
  ${({ contentCenter }) =>
    contentCenter &&
    css`
      align-content: center;
    `};
  ${({ contentSpaceBetween }) =>
    contentSpaceBetween &&
    css`
      align-content: space-between;
    `};
  ${({ contentSpaceAround }) =>
    contentSpaceAround &&
    css`
      align-content: space-around;
    `};
  ${({ contentStretch }) =>
    contentStretch &&
    css`
      align-content: stretch; /* default */
    `};

  ${({ alignStart }) =>
    alignStart &&
    css`
      align-items: flex-start;
    `};
  ${({ alignEnd }) =>
    alignEnd &&
    css`
      align-items: flex-end;
    `};
  ${({ alignCenter }) =>
    alignCenter &&
    css`
      align-items: center;
    `};
  ${({ alignBaseline }) =>
    alignBaseline &&
    css`
      align-items: baseline;
    `};
  ${({ alignStretch }) =>
    alignStretch &&
    css`
      align-items: stretch;
    `};

  ${({ full }) =>
    full &&
    css`
      width: 100%;
      height: 100%;
      flex-basis: 100%;
    `};

  ${({ center }) =>
    center &&
    css`
      align-items: center;
      justify-content: center;
    `};
`;
