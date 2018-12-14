import React from "react";
import { Til } from "../components/Til/Til";
import { Hero, Body } from "../components/framework/layout/Hero";
import { Container } from "../components/framework/layout/Container";
import { Columns, Column } from "../components/framework/layout/Columns";
import { Text } from "../components/framework/elements/Text";

const golangExample = `func sum(nums ...int) {
  fmt.Print(nums, " ")
  total := 0
  for _, num := range nums {
      total += num
  }
  fmt.Println(total)
}`;

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
            <Til
              title=" The reason quantum security is perfect. The particles are so small
              that light would affect the position of the particle itself."
              language="go"
              code={golangExample}
              icons={["go"]}
            />
          </Column>
        </Columns>
      </Container>
    </Body>
  </Hero>
);
