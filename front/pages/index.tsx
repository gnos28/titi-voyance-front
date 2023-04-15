import Head from "next/head";
import { ReactElement, useContext, useEffect, useState } from "react";
import type { NextPageWithLayout } from "./_app";
import Layout from "../components/Layout";
import styles from "../styles/Home.module.scss";
import Image from "next/image";
import Link from "next/link";
import MenuContext from "../contexts/menuContext";
import PaypalButton from "../components/prestation/PaypalButton";
import PriceSelectButtons from "../components/PriceSelectButtons";
import { PrestationItem } from "../api/prestations";

const fakePrestation: PrestationItem = {
  name: "",
  description: "",
  price: 0,
  background: "",
  link: "",
  description_long: "",
  duration: 0,
};

const Home: NextPageWithLayout = () => {
  const { setMenu } = useContext(MenuContext);
  const [imgSize, setImgSize] = useState<number | undefined>(undefined);
  const [_paypalOK, setPaypalOK] = useState(false);
  const [price, setPrice] = useState(0);
  const prices = [3, 5, 10, 20];

  useEffect(() => {
    const { innerWidth } = window;

    setImgSize(Math.min(500, innerWidth * 0.8));
  }, []);

  return (
    <>
      <Head>
        <title>Les cartes de titiphe</title>
        <meta
          name="description"
          content="Les cartes de titiphe, voyance et cartomancie"
        />
      </Head>
      <main className={styles.main}>
        <div>
          {imgSize !== undefined && (
            <>
              <Link
                href={"presentation"}
                onClick={() => setMenu("/presentation")}
              >
                <div className={styles.imgContainer}>
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
                </div>
              </Link>
              <h2>
                Voyance, Cartomancie
                <br />
                Soins energétiques
              </h2>
              <h3>Retrouvez moi sur</h3>
              <div className={styles.linkContainer}>
                <Link
                  href={"https://www.tiktok.com/@titiphe.28"}
                  target="_blank"
                >
                  <Image
                    src="/tiktok.svg"
                    alt="titiphe tiktok"
                    sizes="(max-width: 768px) 100vw,
                    (max-width: 1200px) 50vw,
                    33vw"
                    width={80}
                    height={80}
                    draggable={false}
                  />
                </Link>
                <Link
                  href={
                    "https://instagram.com/les_cartes_de_titiphe?igshid=ZDdkNTZiNTM="
                  }
                  target="_blank"
                >
                  <Image
                    src="/instagram.svg"
                    alt="titiphe instagram"
                    sizes="(max-width: 768px) 100vw,
                    (max-width: 1200px) 50vw,
                    33vw"
                    width={80}
                    height={80}
                    draggable={false}
                  />
                </Link>
                <Link
                  href={
                    "https://www.facebook.com/profile.php?id=100090645823445"
                  }
                  target="_blank"
                >
                  <Image
                    src="/facebook.svg"
                    alt="titiphe facebook"
                    sizes="(max-width: 768px) 100vw,
                    (max-width: 1200px) 50vw,
                    33vw"
                    width={80}
                    height={80}
                    draggable={false}
                  />
                </Link>
              </div>
              <h3>Faire un don</h3>
              <PriceSelectButtons
                price={price}
                prices={prices}
                setPrice={setPrice}
              />
              {prices.map((p) =>
                price === p ? (
                  <PaypalButton
                    key={p}
                    prestation={{ ...fakePrestation, price: p }}
                    date={null}
                    hour={undefined}
                    telephone={""}
                    instagram={""}
                    whatsapp={""}
                    errors={[]}
                    setPaypalOK={setPaypalOK}
                    buttonOnly={true}
                  />
                ) : null
              )}
              {price === 0 && (
                <PaypalButton
                  prestation={{ ...fakePrestation }}
                  date={null}
                  hour={undefined}
                  telephone={""}
                  instagram={""}
                  whatsapp={""}
                  errors={[]}
                  setPaypalOK={setPaypalOK}
                  buttonOnly={true}
                />
              )}
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
