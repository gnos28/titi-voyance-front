import React from "react";
import Prestation from "../Prestation";
//@ts-ignore
import Card from "react-animated-3d-card";
import genericStyles from "../../styles/Prestation_details.module.scss";
import styles from "./PrestationHero.module.scss";
import { prestations_list } from "../../data/prestations_list";
import Link from "next/link";

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
  const currentIndex = prestations_list.findIndex(
    (presta) => presta.name === prestation.name
  );

  const previousIndex = currentIndex - 1 < 0 ? undefined : currentIndex - 1;
  const nextIndex =
    currentIndex + 1 > prestations_list.length - 1
      ? undefined
      : currentIndex + 1;

  return (
    <>
      <h2 className={styles.interactiveTitle}>
        <div>
          {previousIndex !== undefined && (
            <Link href={`${prestations_list[previousIndex].link}`}>
              {prestations_list[previousIndex].name}
            </Link>
          )}
        </div>
        <div>
          <span>{prestation.name}</span>
        </div>
        <div>
          {nextIndex !== undefined && (
            <Link href={`${prestations_list[nextIndex].link}`}>
              {prestations_list[nextIndex].name}
            </Link>
          )}
        </div>
      </h2>
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
