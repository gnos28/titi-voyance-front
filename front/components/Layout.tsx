import React, { ReactNode } from "react";
import Header from "./Header";
import styles from "./Layout.module.scss";
import Navbar from "./Navbar";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import {
  PayPalScriptProvider,
  ScriptProviderProps,
} from "@paypal/react-paypal-js";
import { MenuContextProvider } from "../contexts/menuContext";

type Children = { children: ReactNode };

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

const initialOptions: ScriptProviderProps["options"] = {
  "client-id": process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID as string,
  currency: "EUR",
  intent: "capture",
  // "data-client-token": "boloss",
};

export default function Layout({ children }: Children) {
  return (
    <MenuContextProvider>
      <PayPalScriptProvider options={initialOptions}>
        <ThemeProvider theme={darkTheme}>
          <Header />
          <Navbar />
          <div className={styles.container}>
            <div className={styles.mainContainer}>{children}</div>
          </div>
        </ThemeProvider>{" "}
      </PayPalScriptProvider>
    </MenuContextProvider>
  );
}
