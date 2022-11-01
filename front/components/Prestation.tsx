import React from "react";
import styles from "./Prestation.module.scss";

type PrestationProps = {
  name: string;
  description: string;
  price: number;
  background: string;
};

const Prestation = ({
  name,
  description,
  price,
  background,
}: PrestationProps) => {
  return (
    <div className={styles.prestationContainer}>
      <div>{background}</div>
      <div className={styles.hoverContent}>
        <div>{description}</div>
        <div>{price} €</div>
      </div>
      <h3>{name}</h3>
    </div>
  );
};

export default Prestation;
