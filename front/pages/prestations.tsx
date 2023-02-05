import Head from "next/head";
import { ReactElement, useState } from "react";
import type { NextPageWithLayout } from "./_app";
import Layout from "../components/Layout";
import styles from "../styles/Prestations.module.scss";
import Prestation from "../components/Prestation";
//@ts-ignore
import Card from "react-animated-3d-card";
import Link from "next/link";
import { prestations_list } from "../data/prestations_list";
import { useRouter } from "next/router";

const Prestations: NextPageWithLayout = () => {
  const [animateCard, setAnimateCard] = useState<string | undefined>(undefined);

  const router = useRouter();
  // router.push()

  const handleCardClick = (link: string) => {
    setAnimateCard(link);
    setTimeout(() => {
      // setAnimateCard(undefined);
      router.push(`prestations/${link || ""}`);
    }, 350);
  };

  const getCardClass = (link: string) => {
    if (link === animateCard) return styles.animateIn;
    if (animateCard) return styles.animateOut;
    return "";
  };

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
                <Card onClick={() => handleCardClick(prestation.link)}>
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
            ))
          : prestations_list.map((prestation) => (
              <Card
                onClick={() => handleCardClick(prestation.link)}
                key={prestation.name}
              >
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
            ))}
      </main>
    </>
  );
};

Prestations.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default Prestations;
