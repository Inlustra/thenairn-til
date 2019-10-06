import App, { Container } from "next/app";
import React from "react";
import { ThemeProvider, defaultTheme } from "../components/framework/theme";
import GlobalStyles from "../components/framework/globals";

export default class MyApp extends App {

  render() {
    const { Component, pageProps } = this.props;
    return (
      <ThemeProvider theme={defaultTheme}>
        <Container>
          <GlobalStyles />
          <Component {...pageProps} />
        </Container>
      </ThemeProvider>
    );
  }
}
