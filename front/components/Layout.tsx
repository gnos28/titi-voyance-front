import React, { ReactNode, useEffect, useState } from "react";
import Header from "./Header";
import styles from "./Layout.module.scss";
import Navbar from "./Navbar";
import { useRouter } from "next/router";

type Children = { children: ReactNode };

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
    <>
      <Header />
      <Navbar menu={menu} setMenu={setMenu} />
      <div className={styles.container}>
        <div className={styles.mainContainer}>{children}</div>
      </div>
    </>
  );
}
