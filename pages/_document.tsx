// ./pages/_document.js
import React from "react";
import Document, { Head, Main, NextScript } from "next/document";
import { ThemeProvider as StyledThemeProvider, ThemeProviderComponent } from "styled-components";
import { ServerStyleSheet } from "styled-components";
import { createTheme } from "../components/framework/theme";
import GlobalStyles from "../components/framework/globals";

const theme = createTheme();
const ThemeProvider = StyledThemeProvider as ThemeProviderComponent<typeof theme>

export default class MyDocument extends Document {
  static getInitialProps({ renderPage }) {
    const sheet = new ServerStyleSheet();
    const page = renderPage(App => props =>
      sheet.collectStyles(<App {...props} />)
    );
    const styleTags = sheet.getStyleElement();
    return { ...page, styleTags };
  }

  render() {
    return (
      <html>
        <ThemeProvider theme={theme}>
          <Head>
            <meta
              name="viewport"
              content="width=device-width, initial-scale=1"
            />
            <GlobalStyles />
            {this.props.styleTags}
          </Head>
          <body>
            <Main />
            <NextScript />
          </body>
        </ThemeProvider>
      </html>
    );
  }
}
