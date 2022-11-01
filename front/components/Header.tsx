import React from "react";
import styles from "./Header.module.scss";
import "@fontsource/comfortaa";

const Header = () => {
  return (
    <div className={styles.headerContainer}>
      <header>
        <div className={styles.titleContainer}>
          <div
            className={[styles.cardContainer, styles.cardContainerLeft].join(
              " "
            )}
          >
            <div className={[styles.card, styles.card1].join(" ")}></div>
            <div className={[styles.card, styles.card2].join(" ")}></div>
          </div>
          <h1>
            Les cartes de
            <br />
            TITIPHE
          </h1>
          <div
            className={[styles.cardContainer, styles.cardContainerRight].join(
              " "
            )}
          >
            <div className={[styles.card, styles.card1].join(" ")}></div>
            <div className={[styles.card, styles.card2].join(" ")}></div>
          </div>
        </div>
      </header>
    </div>
  );
};

export default Header;
