import React, { ReactNode } from "react";
import Header from "./Header";
import { MenuContextProvider } from "../contexts/menuContext";
import styles from "./Layout.module.scss";
import Navbar from "./Navbar";

type Children = { children: ReactNode };

export default function Layout({ children }: Children) {
  return (
    <MenuContextProvider>
      <div className={styles.container}>
        <Header />
        <Navbar />
        <div className={styles.mainContainer}>{children}</div>
      </div>
    </MenuContextProvider>
  );
}
