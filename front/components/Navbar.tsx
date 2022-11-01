import React, { useContext } from "react";
import Link from "next/link";
import styles from "./Navbar.module.scss";
import MenuContext from "../contexts/menuContext";

const items = [
  { name: "Accueil", link: "/" },
  { name: "Tarifs", link: "tarifs" },
  { name: "Me contacter", link: "contact" },
];

const Navbar = () => {
  const { menu, setMenu } = useContext(MenuContext);

  return (
    <nav className={styles.navContainer}>
      {items.map((item) => (
        <Link
          key={item.name}
          href={item.link}
          className={menu === item.name ? styles.active : ""}
          onClick={() => setMenu(item.name)}
        >
          {item.name}
        </Link>
      ))}
    </nav>
  );
};

export default Navbar;
