import Head from "next/head";
import { ReactElement } from "react";
import type { NextPageWithLayout } from "./_app";
import Layout from "../components/Layout";
import styles from "../styles/Tarifs.module.scss";
import Prestation from "../components/Prestation";

const prestations = [
  {
    name: "Question simple avec datation",
    description: "Je répond à votre question",
    price: 5,
    background: "",
  },
  {
    name: "Tirage Général",
    description: "Je répond à vos deux questions (avec des détails) + message",
    price: 10,
    background: "",
  },
  {
    name: "Lacher prise",
    description: "Je répond à votre question",
    price: 20,
    background: "",
  },
  {
    name: "Question simple avec datation",
    description: "Je répond à votre question",
    price: 10,
    background: "",
  },
];

const Tarifs: NextPageWithLayout = () => {
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
            <article>
              <Prestation
                name={prestation.name}
                description={prestation.description}
                price={prestation.price}
                background={prestation.background}
              />
            </article>
          ))}
        </div>
      </main>
    </>
  );
};

Tarifs.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default Tarifs;
