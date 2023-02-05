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

        <div className={styles.descriptionTextContainer}>
          <div>
            {prestation.description_long.split("\n").map((line, lineIndex) => (
              <p key={lineIndex}>{line}</p>
            ))}
          </div>
          <div className={styles.priceDurationInfo}>
            <span>
              {prestation.price} € / {prestation.duration} minutes
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default PrestationHero;
