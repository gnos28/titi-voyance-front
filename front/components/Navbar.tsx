import React from "react";
import Link from "next/link";
import styles from "./Navbar.module.scss";

type NavbarProps = {
  menu: string;
  setMenu: React.Dispatch<React.SetStateAction<string>>;
};

export const menuItems = [
  { name: "Accueil", link: "/" },
  { name: "Prestations", link: "/prestations" },
  { name: "Me contacter", link: "/contact" },
];

const Navbar = ({ menu, setMenu }: NavbarProps) => {
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
