import Head from "next/head";
import { useRouter } from "next/router";
import React, { ReactElement } from "react";
import Layout from "../../components/Layout";
import { NextPageWithLayout } from "../_app";
import styles from "../../styles/Prestation_details.module.scss";
import { prestations_list } from "../../data/prestations_list";

const Prestation_details: NextPageWithLayout = () => {
  const router = useRouter();
  const { id } = router.query;

  const prestation = prestations_list.filter(
    (prestation) => prestation.link === id
  )[0];

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
      <div className={styles.prestationDetailsContainer}>
        <h2>{prestation.name}</h2>
        <p>{prestation.description_long}</p>
        <p>
          {prestation.price} € {prestation.duration} minutes
        </p>
      </div>
    </>
  );
};

Prestation_details.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default Prestation_details;
