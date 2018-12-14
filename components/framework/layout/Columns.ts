import styled, { css } from "styled-components";
import { media, toPercentage } from "../utils";
import { BaseTheme, Breakpoint } from "../base";

export const theme = {
  Columns: {
    gap: "0.75rem"
  }
};

export type Theme = typeof theme & BaseTheme;

export interface ColumnsProps {
  theme: Theme;
  centered?: boolean;
  gapless?: boolean;
  mobile?: boolean;
  vCentered?: boolean;
  multiline?: boolean;
  fromSize?: Breakpoint;
  fullHeight?: boolean;
}

export const Columns = styled.div<ColumnsProps>`

  &:last-child {
    margin-bottom: -${({ theme }: ColumnsProps) => theme.Columns.gap};
  }
  &:not(:last-child) {
    margin-bottom: calc(1.5rem - ${({ theme }: ColumnsProps) =>
      theme.Columns.gap});
  }

  ${({ centered }: ColumnsProps) =>
    centered &&
    css`
      justify-content: center;
    `};

  ${({ fullHeight }: ColumnsProps) =>
    fullHeight
      ? css`
          height: 100%;
        `
      : css`
          margin-left: -${({ theme }: ColumnsProps) => theme.Columns.gap};
          margin-right: -${({ theme }: ColumnsProps) => theme.Columns.gap};
          margin-top: -${({ theme }: ColumnsProps) => theme.Columns.gap};
        `}

  ${({ vCentered }: ColumnsProps) =>
    vCentered &&
    css`
      align-items: center;
    `}

  ${({ multiline }: ColumnsProps) =>
    multiline &&
    css`
      flex-wrap: wrap;
    `}

  ${({ gapless }: ColumnsProps) =>
    gapless &&
    css`
      margin-left: 0;
      margin-right: 0;
      margin-top: 0;
      &:last-child {
        margin-bottom: 0;
      }
      &:not(:last-child) {
        margin-bottom: 1.5rem;
      }
      & > div {
        padding: 0;
      }
    `}

    /* Responsiveness */

    ${({ mobile }: ColumnsProps) =>
      mobile &&
      css`
        display: flex;
      `}
      
    ${({ fromSize }: ColumnsProps) =>
      fromSize
        ? css`
            ${media(fromSize)} {
              display: flex;
            }
          `
        : css`
            ${media("tablet")} {
              display: flex;
            }
          `}
`;

export type ColumnSize = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;

export interface ColumnProps {
  theme: Theme;
  size?: ColumnSize | { [K in Breakpoint]?: ColumnSize };
  narrow?: boolean | { [K in Breakpoint]?: true };
}

export const Column = styled.div<ColumnProps>`
  display: block;
  flex-basis: 0;
  flex-grow: 1;
  flex-shrink: 1;
  padding: ${({ theme }: ColumnProps) => theme.Columns.gap};

  ${({ size }: ColumnProps) => {
    switch (typeof size) {
      case "number":
        return css`
          flex: none;
          width: ${toPercentage(size / 12)};
        `;
      case "object":
        return (Object.keys(size) as Breakpoint[]).map(
          mediaSize =>
            css`
              ${media(mediaSize)} {
                flex: none;
                width: ${toPercentage((size[mediaSize] as ColumnSize) / 12)};
              }
            `
        );
      default:
        return "";
    }
  }};

  ${({ narrow }: ColumnProps) => {
    switch (typeof narrow) {
      case "boolean":
        return (
          narrow &&
          css`
            flex: none;
          `
        );
      case "object":
        return (Object.keys(narrow) as Breakpoint[]).map(
          mediaSize =>
            css`
              ${media(mediaSize)} {
                flex: none;
              }
            `
        );
      default:
        return "";
    }
  }};
`;
