import React from "react";
import { Box } from "../framework/elements/Box";
import SyntaxHighlighter from "react-syntax-highlighter/prism";
import { xonokai } from "react-syntax-highlighter/styles/prism";
import styled from "styled-components";
import { Columns, Column } from "../framework/layout/Columns";
import { Text } from "../framework/elements/Text";
import { Icon } from "../framework/elements/Icon";
import { Container } from "../framework/layout/Container";

export const TilText = styled(Box)`
  border-radius: 6px 6px 0 0;
  box-shadow: none;
`;

export const TilMedia = styled.div`
  position: relative;
  overflow: hidden;
  border-radius: 0 0 6px 6px !important;
  box-shadow: 0 2px 3px rgba(10, 10, 10, 0.1), 0 0 0 1px rgba(10, 10, 10, 0.1);
  max-height: 100px;
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

export const TilCode = styled.pre`
  margin: 0;
  border: none !important;
`;

export const Til = ({ title, language, code, icons = [], expanded }) => (
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
      <TilConceal>
        <Container>
          <Columns mobile centered vCentered>
            {icons.map((icon, i) => (
              <Column narrow key={i}>
                <Icon size="medium">
                  <img alt={icon} src={`/static/icons/${icon}.svg`} />
                </Icon>
              </Column>
            ))}
          </Columns>
        </Container>
      </TilConceal>
    </TilMedia>
  </article>
);
