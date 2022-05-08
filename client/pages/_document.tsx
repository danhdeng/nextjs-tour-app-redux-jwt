/* eslint-disable require-jsdoc */
// A custom Document can update the <html> and <body> tags used to render a Page. This file is only rendered on the server, so event handlers like onClick cannot be used in _document.

import Document, { Head, Html, Main, NextScript } from "next/document";

/**
 *  A custom Document to extends the Document
 */
export default class _Document extends Document {
  render() {
    return (
      <Html>
        <Head>
          <link
            href="https://use.fontawesome.com/releases/v5.15.1/css/all.css"
            rel="stylesheet"
          />
          <link
            href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
            rel="stylesheet"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
