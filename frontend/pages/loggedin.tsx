import React from "react";
import { Text } from "../framework/elements/Text";
import { Column, Columns } from "../framework/layout/Columns";
import { Container } from "../framework/layout/Container";
import { Body, Hero } from "../framework/layout/Hero";
import { Topbar } from "_components/Topbar";
import { redirectUnauthenticated } from "../lib/ssr-redirects";
import { useMeSimpleQuery } from "generated/graphql";
import { withApollo, NextApolloPage } from "lib/apollo";

interface Props {}

const LoggedInPage: NextApolloPage<Props> = () => {
  const { data, loading, error } = useMeSimpleQuery({
    ssr: true
  });
  return (
    <>
      <Topbar />
      <Hero fullHeight bold color="info">
        <Body>
          <Container>
            <Columns centered>
              <Column>
                <Text
                  as="h1"
                  size={3}
                  color="whiteTer"
                  weight="semibold"
                  centered
                >
                  {loading
                    ? "Loading..."
                    : data && data.me
                    ? `Hi, ${data.me.username}`
                    : `Uh oh... ${JSON.stringify(error)}`}
                </Text>
              </Column>
            </Columns>
          </Container>
        </Body>
      </Hero>
    </>
  );
};

LoggedInPage.getInitialProps = async ctx => {
  await redirectUnauthenticated(ctx);
  return {};
};

export default withApollo(LoggedInPage);
