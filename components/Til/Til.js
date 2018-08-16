import React from "react";
import { Box } from "../framework/elements/Box";
import SyntaxHighlighter from "react-syntax-highlighter/prism";
import { xonokai } from "react-syntax-highlighter/styles/prism";
import styled from "styled-components";
import { Columns, Column } from "../framework/layout/Columns";
import { Text } from "../framework/elements/Text";

export const TilBox = styled(Box)`
  border-radius: 6px 6px 0 0;
`;

export const TilCode = styled.pre`
  margin: 0;
  border: none !important;
  border-radius: 0 0 6px 6px !important;
`;

export const Til = ({ title, language, code, expanded }) => (
  <div>
    <TilBox>
      <Columns isVCentered isMobile>
        <Column isNarrow isSize={2}>
          <Text isSize={{ desktop: 5, mobile: 7 }}>TIL</Text>
        </Column>
        <Column>{title}</Column>
      </Columns>
    </TilBox>
    <SyntaxHighlighter
      language={language}
      style={xonokai}
      PreTag={TilCode}
      children={code}
      showLineNumbers
    />
  </div>
);
