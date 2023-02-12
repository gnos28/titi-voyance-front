import Head from "next/head";
import React, { ReactElement, useEffect, useState } from "react";
import type { NextPageWithLayout } from "./_app";
import Layout from "../components/Layout";
import styles from "../styles/Prestations.module.scss";
import Prestation from "../components/Prestation";
//@ts-ignore
import Card from "react-animated-3d-card";
// import { PrestationItem, prestations_list } from "../data/prestations_list";
import { useRouter } from "next/router";
import { PrestationItem, prestationsAPI } from "../api/prestations";

type PrestationsProps = {
  prestations_list: PrestationItem[];
};

const Prestations: NextPageWithLayout<PrestationsProps> = ({
  prestations_list,
}) => {
  const [animateCard, setAnimateCard] = useState<string | undefined>(undefined);
  const [allowAnimation, setAllowAnimation] = useState<boolean>(true);

  const router = useRouter();

  const handleCardClick = (link: string) => {
    if (animateCard === undefined) {
      router.prefetch(`prestations/${link || ""}`);

      setTimeout(() => {
        router.push(`prestations/${link || ""}`);
      }, 350);
      setAnimateCard(link);
    }
  };

  const getCardClass = (link: string) => {
    if (link === animateCard) return styles.animateIn;
    if (animateCard) return styles.animateOut;
    return "";
  };

  const getCard = (prestation: PrestationItem) => {
    return (
      <article>
        <Prestation
          name={prestation.name}
          description={prestation.description}
          price={prestation.price}
          background={prestation.background}
          link={prestation.link}
        />
      </article>
    );
  };

  const getAnimatedCard = (prestation: PrestationItem, onClick: () => void) => {
    return (
      <>
        {allowAnimation ? (
          <Card onClick={onClick}>{getCard(prestation)}</Card>
        ) : (
          <div onClick={onClick}>
            <div>
              <div>{getCard(prestation)}</div>
            </div>
          </div>
        )}
      </>
    );
  };

  useEffect(() => {
    setAnimateCard(undefined);

    if (navigator.userAgent.match(/Firefox/i)) setAllowAnimation(false);
  }, []);

  return (
    <>
      <Head>
        <title>Les cartes de titiphe</title>
      </Head>

      <main className={styles.articlesContainer}>
        {animateCard
          ? prestations_list.map((prestation) => (
              <div
                className={getCardClass(prestation.link)}
                key={prestation.name}
              >
                {getAnimatedCard(prestation, () =>
                  handleCardClick(prestation.link)
                )}
              </div>
            ))
          : prestations_list.map((prestation) => (
              <React.Fragment key={prestation.name}>
                {getAnimatedCard(prestation, () =>
                  handleCardClick(prestation.link)
                )}
              </React.Fragment>
            ))}
      </main>
    </>
  );
};

Prestations.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export async function getStaticProps() {
  const prestations_list =
    (await prestationsAPI.getAll("ssr")).data?.prestations || [];

  return {
    props: { prestations_list }, // will be passed to the page component as props
  };
}

export default Prestations;
