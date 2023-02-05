import React, { useContext, useEffect } from "react";
import Link from "next/link";
import styles from "./Navbar.module.scss";
import MenuContext from "../contexts/menuContext";
import { useRouter } from "next/router";

export const menuItems = [
  { name: "Accueil", link: "/" },
  { name: "Qui suis-je ?", link: "/presentation" },
  { name: "Prestations", link: "/prestations" },
  { name: "Me contacter", link: "/contact" },
];

const Navbar = () => {
  const { menu, setMenu } = useContext(MenuContext);
  const router = useRouter();

  const setActiveMenu = () => {
    const routePath = router.route.split("/")[1];

    if (menu === "") setMenu("/");
    if (menu && routePath !== menu) setMenu(routePath || "/");
  };

  useEffect(() => {
    setActiveMenu();
  }, []);

  return (
    <nav className={styles.navContainer}>
      {menuItems.map((item) => (
        <Link
          key={item.name}
          href={item.link}
          className={menu === item.link ? styles.active : ""}
          onClick={() => setMenu(item.link)}
        >
          {item.name}
        </Link>
      ))}
    </nav>
  );
};

export default Navbar;
