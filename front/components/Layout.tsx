import React, { ReactNode, useEffect, useRef } from "react";
import Header from "./Header";
import styles from "./Layout.module.scss";
import Navbar from "./Navbar";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import {
  PayPalScriptProvider,
  ScriptProviderProps,
} from "@paypal/react-paypal-js";
import { MenuContextProvider } from "../contexts/menuContext";
import { useRouter } from "next/router";

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
  const layoutContainer = useRef<HTMLDivElement>(null);
  const router = useRouter();
  let previousRoute = "";

  useEffect(() => {
    const currentRoute = router.route;
    if (currentRoute !== previousRoute && layoutContainer.current) {
      previousRoute = currentRoute;
      layoutContainer.current.scrollTo({ top: 0 });
    }
  });

  return (
    <MenuContextProvider>
      <PayPalScriptProvider options={initialOptions}>
        <ThemeProvider theme={darkTheme}>
          <Header />
          <Navbar />
          <div className={styles.container} ref={layoutContainer}>
            <div className={styles.mainContainer}>{children}</div>
          </div>
        </ThemeProvider>{" "}
      </PayPalScriptProvider>
    </MenuContextProvider>
  );
}
