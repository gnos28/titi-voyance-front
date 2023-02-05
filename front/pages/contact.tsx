import Head from "next/head";
import { ReactElement } from "react";
import type { NextPageWithLayout } from "./_app";
import Layout from "../components/Layout";
import styles from "../styles/Home.module.scss";

const Contact: NextPageWithLayout = () => {
  return (
    <>
      <Head>
        <title>Les cartes de titiphe</title>
      </Head>

      <main className={styles.main}></main>
    </>
  );
};

Contact.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default Contact;
