import "../styles/globals.css";
import type { AppProps } from "next/app";
import React from "react";
import { ToastContainer } from "react-toastify";
/**
 *
 * @param {AppProps} param0
 * @return {React.Component}
 * return next component
 */
function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <ToastContainer />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
