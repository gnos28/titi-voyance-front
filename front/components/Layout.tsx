import React, { ReactNode, useEffect, useState } from "react";
import Header from "./Header";
import styles from "./Layout.module.scss";
import Navbar from "./Navbar";
import { useRouter } from "next/router";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";

type Children = { children: ReactNode };

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

export default function Layout({ children }: Children) {
  const [menu, setMenu] = useState<string>("/");
  const router = useRouter();

  const setActiveMenu = () => {
    const routePath = router.route.split("/")[1];
    if (routePath !== menu) setMenu(routePath || "/");
  };

  useEffect(() => {
    setActiveMenu();
  }, []);

  return (
    <PayPalScriptProvider options={{ "client-id": "test" }}>
      <ThemeProvider theme={darkTheme}>
        <Header />
        <Navbar menu={menu} setMenu={setMenu} />
        <div className={styles.container}>
          <div className={styles.mainContainer}>{children}</div>
        </div>
      </ThemeProvider>{" "}
    </PayPalScriptProvider>
  );
}
