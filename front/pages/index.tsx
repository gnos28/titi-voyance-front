import Head from "next/head";
import { ReactElement, useContext, useEffect, useState } from "react";
import type { NextPageWithLayout } from "./_app";
import Layout from "../components/Layout";
import styles from "../styles/Home.module.scss";
import Image from "next/image";
import Link from "next/link";
import MenuContext from "../contexts/menuContext";
import PurchaseButtons from "../components/prestation/PurchaseButtons";
import PriceSelectButtons from "../components/PriceSelectButtons";
import { PrestationItem } from "../api/prestations";

const fakePrestation: PrestationItem = {
  name: "don libre",
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
  const [_purchaseOK, setPurchaseOK] = useState(false);
  const [price, setPrice] = useState(0);
  const prices = [8, 15, 20, 30, 40, 50];

  useEffect(() => {
    const { innerWidth } = window;

    setImgSize(Math.min(500, innerWidth * 0.8));

    // Check to see if this is a redirect back from Checkout
    const query = new URLSearchParams(window.location.search);

    if (query.get("success")) {
      setPurchaseOK(true);
    }

    if (query.get("canceled")) {
      setPurchaseOK(false);
    }
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
              <div className={styles.alert}>
                <Image
                  src="/fake_tiktok.jpg"
                  alt="fake_tiktok"
                  sizes="(max-width: 768px) 100vw,
              (max-width: 1200px) 50vw,
              33vw"
                  width={imgSize / 2}
                  height={imgSize / 2}
                  draggable={false}
                />
                <p className={styles.alertTitle}>
                  ATTENTION : CE COMPTE EST UN FAUX
                </p>
                <p>
                  Il s'agit d'une personne tentant de se faire passer pour moi
                  pour vous soutirer des paiements, ne suivez pas ses
                  instructions.
                </p>
              </div>
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
                  href={"https://www.tiktok.com/@les.cartes.de.titiphe"}
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
                  href={"https://www.instagram.com/les_cartes_de_titiphe/"}
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
              <h3 className={styles.h3noMarginBottom}>Faire un don</h3>
              <h4 className={styles.h4large}>
                Sélectionnez le montant du don puis votre moyen de paiement
              </h4>
              <PriceSelectButtons
                price={price}
                prices={prices}
                setPrice={setPrice}
              />
              <div className={styles.paymentButtonsContainer}>
                {_purchaseOK ? (
                  <span>
                    Votre paiement à bien été récéptionné 👋
                    <br />
                    Vous serez très prochainement recontacté pour convenir
                    d&apos;un rendez-vous.
                  </span>
                ) : (
                  <>
                    {prices.map((p) =>
                      price === p ? (
                        <PurchaseButtons
                          key={p}
                          prestation={{ ...fakePrestation, price: p }}
                          date={null}
                          hour={undefined}
                          telephone={""}
                          instagram={""}
                          whatsapp={""}
                          errors={[]}
                          purchaseOK={_purchaseOK}
                          setPurchaseOK={setPurchaseOK}
                          buttonOnly={true}
                        />
                      ) : null
                    )}
                    {price === 0 && (
                      <PurchaseButtons
                        prestation={{ ...fakePrestation }}
                        date={null}
                        hour={undefined}
                        telephone={""}
                        instagram={""}
                        whatsapp={""}
                        errors={[]}
                        purchaseOK={_purchaseOK}
                        setPurchaseOK={setPurchaseOK}
                        buttonOnly={true}
                      />
                    )}
                  </>
                )}
              </div>
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
