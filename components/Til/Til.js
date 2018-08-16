import React from 'react';
import { Box } from '../framework/elements/Box';
import SyntaxHighlighter from 'react-syntax-highlighter/prism';
import { xonokai } from 'react-syntax-highlighter/styles/prism';
import styled from 'styled-components';
import { Columns, Column } from '../framework/layout/Columns';
import { Text } from '../framework/elements/Text';

export const TilBox = styled(Box)`
  border-radius: 6px 6px 0 0;
  box-shadow: none;
`;

export const TilCode = styled.pre`
  margin: 0;
  border: none !important;
  border-radius: 0 0 6px 6px !important;
  box-shadow: 0 2px 3px rgba(10,10,10,.1), 0 0 0 1px rgba(10,10,10,.1);
`;

export const Til = ({ title, language, code, expanded }) => (
  <div>
    <TilBox>
      <Columns vCentered mobile>
        <Column narrow size={2}>
          <Text size={4} color="greyLighter" centered>
            TIL
          </Text>
        </Column>
        <Column><Text weight="semibold">{title}</Text></Column>
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
