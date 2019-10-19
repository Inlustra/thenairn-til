import React from "react";
import { Text } from "../components/framework/elements/Text";
import { Column, Columns } from "../components/framework/layout/Columns";
import { Container } from "../components/framework/layout/Container";
import { Body, Hero } from "../components/framework/layout/Hero";
import Gists from "../components/Gists";

export default () => (
  <Hero fullHeight bold color="danger">
    <Body>
      <Container>
        <Columns centered>
          <Column>
            <Text as="h1" size={3} color="whiteTer" weight="semibold" centered>
              Thomas Nairn
            </Text>
            <Text size={5} color="whiteTer" centered>
              Today I learned
            </Text>
          </Column>
        </Columns>
        <Columns centered>
          <Column size={{ mobile: 12, tablet: 10, desktop: 8 }}>
            <Gists username="inlustra" />
          </Column>
        </Columns>
      </Container>
    </Body>
  </Hero>
);
