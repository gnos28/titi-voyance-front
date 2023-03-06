import Head from "next/head";
import { ReactElement } from "react";
import type { NextPageWithLayout } from "./_app";
import Layout from "../components/Layout";
import styles from "../styles/Home.module.scss";
import Link from "next/link";
import Image from "next/image";

const Contact: NextPageWithLayout = () => {
  return (
    <>
      <Head>
        <title>Contact - Les cartes de titiphe</title>
        <meta
          name="description"
          content="Live de voyance sur tiktok, live cartomancie tiktok, live guidance tiktok, tirage gratuit, guidance, titiphe28"
        />
      </Head>

      <main className={styles.main}>
        <div>
          <h2>retrouvez moi sur tik-tok</h2>
          <div className={styles.tiktokContainer}>
            <Link href={"https://www.tiktok.com/@titiphe.28"} target="_blank">
              <Image
                src="/titiphe_tiktok.webp"
                alt="titiphe tiktok"
                sizes="(max-width: 768px) 100vw,
              (max-width: 1200px) 50vw,
              33vw"
                width={200}
                height={200}
                draggable={false}
              />
              <div className={styles.tiktokDescription}>
                <Image
                  src="/TikTok_Logo.svg"
                  alt="titiphe tiktok"
                  sizes="(max-width: 768px) 100vw,
              (max-width: 1200px) 50vw,
              33vw"
                  width={128.77815}
                  height={31.308346}
                  draggable={false}
                />
                <p>@titiphe.28</p>
                <p>Les cartes de titiphe</p>
              </div>
            </Link>
          </div>
          <h3>Du lundi au vendredi à partir de 22h</h3>
        </div>
      </main>
    </>
  );
};

Contact.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default Contact;
