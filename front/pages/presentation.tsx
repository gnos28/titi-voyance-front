import Head from "next/head";
import { ReactElement } from "react";
import type { NextPageWithLayout } from "./_app";
import Layout from "../components/Layout";
import styles from "../styles/Presentation.module.scss";
import Image from "next/image";

const Home: NextPageWithLayout = () => {
  const age = (
    (new Date().getTime() - new Date(1985, 8, 27).getTime()) /
    (365 * 24 * 60 * 60 * 1000)
  ).toFixed(0);

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
          ></Image>
          <div className={styles.backgroundShadow}></div>
        </aside>
        <section className={styles.sideContent}>
          <h2 className={styles.title}>Qui suis-je ?</h2>
          <p>
            Je suis Tiphaine, une cartomancienne et praticienne en soins
            énergétiques à distance avec plus de 20 ans d'expérience. Agée de{" "}
            {age} ans, la spiritualité et le paranormal font partie intégrante
            de ma vie depuis mon plus jeune âge.
          </p>
          <p>
            Je vous offre mes dons en cartomancie pour vous aider à éclairer
            votre chemin de vie. Grâce à ma clairvoyance et à mes ressentis, je
            capte les énergies, les sentiments et les états d'esprit pour vous
            fournir une voyance claire et précise. C'est un don familial que je
            partage avec vous en toute confidentialité, uniquement sur
            rendez-vous.
          </p>
          <p>
            Rejoignez-moi pour une expérience spirituelle enrichissante, je suis
            là pour vous aider à explorer votre avenir et à comprendre votre
            chemin de vie. Vous pouvez également me retrouver en direct sur
            TikTok chaque soir de la semaine pour des lectures de cartes en
            direct et une session de questions-réponses."
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
