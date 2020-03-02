import { AppProps } from "next/app";
import React from "react";
import { ThemeProvider, defaultTheme } from "../framework/theme";
import GlobalStyles from "../framework/globals";
import { ErrorBoundary } from "_components/ErrorBoundary";

const App = ({
  Component,
  pageProps,
}: AppProps) => (
    <ThemeProvider theme={defaultTheme}>
      <ErrorBoundary>
        <GlobalStyles />
        <Component {...pageProps} />
      </ErrorBoundary>
    </ThemeProvider>
);

export default App;