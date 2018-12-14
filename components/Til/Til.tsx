import React from "react";
import { Box } from "../framework/elements/Box";
// @ts-ignore

import { PrismAsyncLight as SyntaxHighlighter } from "react-syntax-highlighter";
import { xonokai } from "react-syntax-highlighter/dist/styles/prism";
import styled, { css } from "styled-components";
import { Columns, Column } from "../framework/layout/Columns";
import { Text } from "../framework/elements/Text";
import { Icon } from "../framework/elements/Icon";

export const TilText = styled(Box)`
  border-radius: 6px 6px 0 0;
  box-shadow: none;
`;

export const TilConceal = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: linear-gradient(
    to top,
    rgba(90, 90, 90, 0.8),
    rgba(0, 0, 0, 0)
  );
`;

export interface TilMediaProps {
  expanded?: boolean;
}

export const TilMedia = styled.div<TilMediaProps>`
  position: relative;
  overflow: hidden;
  border-radius: 0 0 6px 6px !important;
  box-shadow: 0 2px 3px rgba(10, 10, 10, 0.1), 0 0 0 1px rgba(10, 10, 10, 0.1);

  ${({ expanded }) =>
    expanded
      ? css`
          & > ${TilConceal} {
            visibility: hidden;
          }
        `
      : css`
          max-height: 100px;
        `};
`;

export const TilCode = styled.pre`
  margin: 0;
  border: none !important;
  border-top-left-radius: 0 !important;
  border-top-right-radius: 0 !important;
`;

export const TilConcealIconContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export interface Props {
  title: string;
  language: string;
  code: string;
  icons?: string[];
  expanded?: boolean;
}

export const Til = ({ title, language, code, icons = [], expanded }: Props) => {
  return (
    <article>
      <TilText>
        <Columns vCentered mobile>
          <Column narrow size={2}>
            <Text size={4} color="greyLighter" centered>
              TIL
            </Text>
          </Column>
          <Column>
            <Text weight="semibold">{title}</Text>
          </Column>
        </Columns>
      </TilText>
      <TilMedia expanded={expanded}>
        <SyntaxHighlighter
          language={language}
          style={xonokai}
          PreTag={TilCode}
          children={code}
          showLineNumbers
        />
        <Columns mobile centered vCentered fullHeight>
          {icons.map((icon, i) => (
            <Column narrow key={i}>
              <Icon size="medium">
                <img alt={icon} src={`/static/icons/${icon}.svg`} />
              </Icon>
            </Column>
          ))}
        </Columns>
      </TilMedia>
    </article>
  );
};