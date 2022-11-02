import Head from "next/head";
import { ReactElement } from "react";
import type { NextPageWithLayout } from "./_app";
import Layout from "../components/Layout";
import styles from "../styles/Prestations.module.scss";
import Prestation from "../components/Prestation";
//@ts-ignore
import Card from "react-animated-3d-card";

const prestations = [
  {
    name: "Question simple avec datation",
    description: "Je répond à votre question",
    price: 5,
    background: "/card1.webp",
  },
  {
    name: "Tirage Général",
    description: "Je répond à vos deux questions (avec des détails) + message",
    price: 10,
    background: "/card2.webp",
  },
  {
    name: "Lacher prise",
    description: "Je répond à votre question",
    price: 20,
    background: "/card3.webp",
  },
  {
    name: "Question simple avec datation2",
    description: "Je répond à votre question",
    price: 10,
    background: "/card4.webp",
  },
];

const Prestations: NextPageWithLayout = () => {
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

      <main className={styles.main}>
        <div className={styles.articlesContainer}>
          {prestations.map((prestation) => (
            <Card key={prestation.name}>
              <article>
                <Prestation
                  name={prestation.name}
                  description={prestation.description}
                  price={prestation.price}
                  background={prestation.background}
                />
              </article>
            </Card>
          ))}
        </div>
      </main>
    </>
  );
};

Prestations.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default Prestations;
