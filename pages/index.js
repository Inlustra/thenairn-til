import React from "react";
import { Til } from "../components/Til/Til";
import { Hero } from "../components/framework/elements/Hero";
import { Container } from "../components/framework/layout/Container";
import { Columns, Column } from "../components/framework/layout/Columns";

export default () => (
  <Hero isFullHeight isColor="primary">
    <Hero.Body>
      <Container>
        <Columns isCentered>
          <Column isSize={{ mobile: 12, tablet: 10, desktop: 8 }}>
            <Til
              title=" The reason quantum security is perfect. The particles are so small
              that light would affect the position of the particle itself."
            />
          </Column>
        </Columns>
      </Container>
    </Hero.Body>
  </Hero>
);
