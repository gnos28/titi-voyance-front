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
      setAnimateCard(undefined);
      router.push(`prestations/${link || ""}`);
    }, 450);
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
        <meta
          name="description"
          content="Les cartes de titiphe, voyance et cartomancie"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.articlesContainer}>
        {animateCard
          ? prestations_list.map((prestation) => (
              <div className={getCardClass(prestation.link)}>
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
              </div>
            ))
          : prestations_list.map((prestation) => (
              // <Link
              //   onClick={(e) => e.preventDefault}
              //   href={`prestations/${prestation.link || ""}`}
              // >
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
              // </Link>
            ))}
      </main>
    </>
  );
};

Prestations.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default Prestations;
