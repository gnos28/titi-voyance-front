import Head from "next/head";
import { ReactElement, useContext, useEffect, useState } from "react";
import type { NextPageWithLayout } from "./_app";
import Layout from "../components/Layout";
import styles from "../styles/Home.module.scss";
import Image from "next/image";
import Link from "next/link";
import MenuContext from "../contexts/menuContext";

const Home: NextPageWithLayout = () => {
  const { setMenu } = useContext(MenuContext);
  const [imgSize, setImgSize] = useState<number | undefined>(undefined);

  useEffect(() => {
    const { innerWidth } = window;

    setImgSize(Math.min(500, innerWidth * 0.8));
  }, []);

  return (
    <>
      <Head>
        <title>Les cartes de titiphe</title>
      </Head>
      <main className={styles.main}>
        <div>
          {imgSize !== undefined && (
            <>
              <Link
                href={"presentation"}
                onClick={() => setMenu("/presentation")}
              >
                <Image
                  src="/titiphe_landing.webp"
                  alt="titiphe_landing"
                  sizes="(max-width: 768px) 100vw,
              (max-width: 1200px) 50vw,
              33vw"
                  width={imgSize}
                  height={imgSize}
                  draggable={false}
                />
              </Link>
              <h2>
                Voyance, Cartomancie
                <br />
                Soins energétiques
              </h2>
            </>
          )}
        </div>
      </main>
    </>
  );
};

Home.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default Home;
