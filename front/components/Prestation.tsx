import Image from "next/image";
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
      <h2>{name}</h2>
      <Image
        src={background}
        alt={name}
        fill
        priority
        sizes="(max-width: 768px) 100vw,
              (max-width: 1200px) 50vw,
              33vw"
      />
      <div className={styles.hoverContent}>
        <div>{description}</div>
        <div>{price} €</div>
      </div>
    </div>
  );
};

export default Prestation;
