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
import { GetStaticProps } from "next";

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
          <div onClick={onClick} className={styles.firefoxCardContainer}>
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

    const _navigator = navigator as Navigator & { userAgentData?: unknown };

    if (_navigator.userAgentData === undefined) setAllowAnimation(false);
  }, []);

  return (
    <>
      <Head>
        <title>Prestations - Les cartes de titiphe</title>
        <meta
          name="description"
          content={`Prestations disponibles sur rendez-vous : ${prestations_list
            .map((presta) => presta.name)
            .join(", ")}`}
        />
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

export const getStaticProps: GetStaticProps = async () => {
  const prestations_list =
    (await prestationsAPI.getAll("ssr")).data?.prestations || [];

  console.log("prestations_list", prestations_list.length);

  const { ISR_REVALIDATION } = process.env;

  const revalidate = !prestations_list.length
    ? 1
    : parseInt(ISR_REVALIDATION || "10", 10);

  return {
    props: { prestations_list }, // will be passed to the page component as props
    revalidate,
  };
};

export default Prestations;
