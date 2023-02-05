import Head from "next/head";
import { ReactElement } from "react";
import type { NextPageWithLayout } from "./_app";
import Layout from "../components/Layout";
import styles from "../styles/Home.module.scss";
import Image from "next/image";

const Home: NextPageWithLayout = () => {
  return (
    <>
      <Head>
        <title>Les cartes de titiphe</title>
      </Head>
      <main className={styles.main}>
        <aside className={styles.sideBackground}>
          <Image
            src="/mains-voyance.webp"
            alt="mains-voyance"
            fill
            sizes="(max-width: 768px) 100vw,
              (max-width: 1200px) 50vw,
              33vw"
            priority
          ></Image>
          <div className={styles.backgroundShadow}></div>
        </aside>
        <section className={styles.sideContent}>
          <h2 className={styles.title}>Qui suis-je ?</h2>
          <p>
            Bonjour, Je suis Tiphaine, j'ai 37 ans et depuis mon plus jeune âge,
            la spiritualité et le paranormal font partie de ma vie.
          </p>
          <p>
            Je vous propose mes services en cartomancie et en soin énergétique à
            distance.
          </p>
          <p>
            Lors des tirages de cartes, j'utilise mes ressentis et ma
            clairvoyance afin de vous aider et vous éclairer au maximum dans
            votre chemin de vie.
          </p>
          <p>
            J'ai naturellement cette connection du cœur, je ressens les énergies
            positives ou négatives. Je capte les états d'esprits et les
            sentiments.
          </p>
          <p>
            Plus de 25 ans d'expérience dans le domaine de la cartomancie, c'est
            un don familial. Voyance claire & précise, uniquement sur
            rendez-vous, avec l'assurance d'une complète confidentialité.
          </p>
        </section>
      </main>
    </>
  );
};

Home.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default Home;
