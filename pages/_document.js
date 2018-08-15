// ./pages/_document.js
import React from 'react';
import Document, { Head, Main, NextScript } from 'next/document';
import {
  ServerStyleSheet,
  injectGlobal
} from 'styled-components';
import { theme } from '../components/framework/theme';
import globals from '../components/framework/globals';

injectGlobal(globals(theme));

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
        <Head>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          {this.props.styleTags}
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    );
  }
}
