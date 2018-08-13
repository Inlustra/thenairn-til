import {
  Hero,
  HeroBody,
  Container,
  Title,
  Subtitle,
  Columns,
  Column,
  Box
} from "bloomer";

export default () => (
  <Hero isColor="info" isBold isFullHeight>
    <HeroBody>
      <Container hasTextAlign="centered">
        <Title>Thomas Nairn</Title>
        <Subtitle>Today I learned</Subtitle>
        <Columns isCentered>
          <Column isSize={{desktop: 8, tablet: 10, mobile: 12}}>
            <Box>
              <Columns isMobile>
                <Column isSize={3}>icons</Column>
                <Column>
                </Column>
              </Columns>
            </Box>
          </Column>
        </Columns>
      </Container>
    </HeroBody>
  </Hero>
);
