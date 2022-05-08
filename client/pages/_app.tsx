import "../styles/globals.css";
import type { AppProps } from "next/app";
import React from "react";
import { ToastContainer } from "react-toastify";
import { Provider } from "react-redux";
import store from "../redux/store";
import "mdb-react-ui-kit/dist/css/mdb.min.css";
/**
 *
 * @param {AppProps} param0
 * @return {React.Component}
 * return next component
 */
function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <ToastContainer />
      <Component {...pageProps} />
    </Provider>
  );
}

export default MyApp;
