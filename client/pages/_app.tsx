import "../styles/globals.css";
import type { AppProps } from "next/app";
import React from "react";

/**
 *
 * @param {AppProps} param0
 * @return {NextComponentType<NextPageContext, any, {}>} component
 */
function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default MyApp;
