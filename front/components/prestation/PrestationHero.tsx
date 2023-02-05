import React from "react";
import Prestation from "../Prestation";
//@ts-ignore
import Card from "react-animated-3d-card";
import genericStyles from "../../styles/Prestation_details.module.scss";
import styles from "./PrestationHero.module.scss";

type PrestationHeroProps = {
  prestation: {
    name: string;
    description: string;
    price: number;
    background: string;
    link: string;
    description_long: string;
    duration: number;
  };
};

const PrestationHero = ({ prestation }: PrestationHeroProps) => {
  return (
    <>
      <h2>{prestation.name}</h2>
      <div className={styles.prestationDescriptionContainer}>
        <div className={styles.articlesContainer}>
          <Card key={prestation.name}>
            <article>
              <Prestation
                name={prestation.name}
                description={prestation.description}
                price={prestation.price}
                background={prestation.background}
                link={prestation.link}
              />
            </article>
          </Card>
        </div>

        <div>
          {prestation.description_long.split("\n").map((line) => (
            <p>{line}</p>
          ))}
          <p className={styles.priceDurationInfo}>
            {prestation.price} € pour {prestation.duration} minutes
          </p>
        </div>
      </div>
    </>
  );
};

export default PrestationHero;
