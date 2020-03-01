import { AppProps } from "next/app";
import React from "react";
import { ThemeProvider, defaultTheme } from "../framework/theme";
import GlobalStyles from "../framework/globals";
import withApollo, { WithApolloProps } from "next-with-apollo";
import ApolloClient, { InMemoryCache } from "apollo-boost";
import { ApolloProvider } from "@apollo/react-hooks";
import { ErrorBoundary } from "_components/ErrorBoundary";

const App = ({
  Component,
  pageProps,
  apollo
}: AppProps & WithApolloProps<any>) => (
  <ApolloProvider client={apollo}>
    <ThemeProvider theme={defaultTheme}>
      <ErrorBoundary>
        <GlobalStyles />
        <Component {...pageProps} />
      </ErrorBoundary>
    </ThemeProvider>
  </ApolloProvider>
);

export default withApollo(({ initialState }) => {
  return new ApolloClient({
    uri: "https://thenairn.com/api/graphql",
    cache: new InMemoryCache().restore(initialState || {}),
    request: operation => {
      const token = localStorage.getItem("token");
      operation.setContext({
        headers: {
          authorization: token ? `Bearer ${token}` : ""
        }
      });
    }
  });
})(App);
