import Head from "next/head";
import { useRouter } from "next/router";
import React, { ReactElement, useEffect, useRef, useState } from "react";
import Layout from "../../components/Layout";
import { NextPageWithLayout } from "../_app";
import styles from "../../styles/Prestation_details.module.scss";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import "dayjs/locale/fr";
import dayjs from "dayjs";
import { agendaAPI } from "../../api/agenda";
import PrestationHero from "../../components/prestation/PrestationHero";
import PersonalInfosInput from "../../components/prestation/PersonalInfosInput";
import ContactInput from "../../components/prestation/ContactInput";
import CreneauInput from "../../components/prestation/CreneauInput";
import PaypalButton from "../../components/prestation/PaypalButton";
import { PrestationItem, prestationsAPI } from "../../api/prestations";

export type ErrorMessage = {
  type: "nom" | "prenom" | "birthdate" | "contact" | "creneau";
  content: string;
};

type Prestation_detailsProps = {
  prestations_list: PrestationItem[];
};

export const convertRawSlotsToDaySlots = (rawSlots: string[], date: Date) => {
  return rawSlots
    .filter((raw) => {
      const rawDate = new Date(raw);
      const rawYear = rawDate.getFullYear();
      const rawMonth = rawDate.getMonth();
      const rawDay = rawDate.getDate();

      if (
        date.getFullYear() === rawYear &&
        date.getMonth() === rawMonth &&
        date.getDate() === rawDay
      )
        return true;
      return false;
    })
    .map((raw) => {
      const rawDate = new Date(raw);
      const rawHour = rawDate.getHours().toString().padStart(2, "0");
      const rawMin = rawDate.getMinutes().toString().padStart(2, "0");
      return `${rawHour}:${rawMin}`;
    });
};

const Prestation_details: NextPageWithLayout<Prestation_detailsProps> = ({
  prestations_list,
}) => {
  const router = useRouter();
  const { id } = router.query;
  const [date, setDate] = useState<Date | null>(new Date());
  const [hour, setHour] = useState<string | undefined>(undefined);
  const [monthBookedSlots, setMonthBookedSlots] = useState<string[]>([]);
  const [dayBookedSlots, setDayBookedSlots] = useState<string[]>([]);
  const previousDate = useRef(new Date());
  const [birthdate, setBirthdate] = useState<Date | null>(null);
  const [nom, setNom] = useState<string>("");
  const [prenom, setPrenom] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [telephone, setTelephone] = useState<string>("");
  const [instagram, setInstagram] = useState<string>("");
  const [whatsapp, setWhatsapp] = useState<string>("");
  const [errors, setErrors] = useState<ErrorMessage[]>([]);

  const prestation = prestations_list.filter(
    (prestation) => prestation.link === id
  )[0];

  dayjs.locale("fr");

  const getBookedSlots = async () => {
    if (date !== null) {
      let rawSlots = monthBookedSlots;

      if (
        !monthBookedSlots.length ||
        previousDate.current.getFullYear() !== date.getFullYear() ||
        previousDate.current.getMonth() !== date.getMonth()
      ) {
        rawSlots =
          (
            await agendaAPI.getByDate(
              `${date.getFullYear()}-${(date.getMonth() + 1)
                .toString()
                .padStart(2, "0")}`
            )
          ).data?.slots || [];

        setMonthBookedSlots(rawSlots);
        previousDate.current = date;
      }

      setDayBookedSlots(convertRawSlotsToDaySlots(rawSlots, date));
    }
  };

  const allowPaypal = () => {
    const is18 = new Date().getTime() - 365 * 24 * 60 * 60 * 1000;

    // ^(?:(?:\+|00)33|0)\s*[1-9](?:[\s.-]*\d{2}){4}$ // phone number validator

    const errorMessages: ErrorMessage[] = [];

    if (nom === "")
      errorMessages.push({
        type: "nom",
        content: "veuillez renseigner votre nom",
      });

    if (prenom === "")
      errorMessages.push({
        type: "prenom",
        content: "veuillez renseigner votre prénom",
      });

    if (birthdate === null)
      errorMessages.push({
        type: "birthdate",
        content: "veuillez renseigner votre date de naissance",
      });

    if (birthdate !== null && birthdate.getTime() > is18)
      errorMessages.push({
        type: "birthdate",
        content: "ces prestations sont interdites aux mineurs",
      });

    if (errorMessages.length) return setErrors(errorMessages);

    if (telephone === "" && instagram === "" && whatsapp === "")
      errorMessages.push({
        type: "contact",
        content: "veuillez indiquer un moyen de vous contacter",
      });

    if (errorMessages.length) return setErrors(errorMessages);

    if (date === null || !hour)
      errorMessages.push({
        type: "creneau",
        content: "veuillez sélectionner un créneau pour la prestation",
      });

    setErrors(errorMessages);
  };

  const storeToLocalStorage = () => {
    nom && localStorage.setItem("nom", nom);
    prenom && localStorage.setItem("prenom", prenom);
    email && localStorage.setItem("email", email);
    birthdate && localStorage.setItem("birthdate", JSON.stringify(birthdate));
    telephone && localStorage.setItem("telephone", telephone);
    instagram && localStorage.setItem("instagram", instagram);
    whatsapp && localStorage.setItem("whatsapp", whatsapp);
    date && localStorage.setItem("date", JSON.stringify(date));
    hour && localStorage.setItem("hour", hour || "");
  };

  const retrieveLocalStorage = () => {
    const localNom = localStorage.getItem("nom");
    if (localNom) setNom(localNom);

    const localPrenom = localStorage.getItem("prenom");
    if (localPrenom) setPrenom(localPrenom);

    const localEmail = localStorage.getItem("email");
    if (localEmail) setEmail(localEmail);

    const localBirthdate = localStorage.getItem("birthdate");

    if (localBirthdate && localBirthdate !== "null")
      setBirthdate(new Date(JSON.parse(localBirthdate)));

    const localTelephone = localStorage.getItem("telephone");
    if (localTelephone) setTelephone(localTelephone);

    const localInstagram = localStorage.getItem("instagram");
    if (localInstagram) setInstagram(localInstagram);

    const localWhatsapp = localStorage.getItem("whatsapp");
    if (localWhatsapp) setWhatsapp(localWhatsapp);

    const localDate = localStorage.getItem("date");
    if (localDate) setDate(new Date(JSON.parse(localDate)));

    const localHour = localStorage.getItem("hour");
    if (localHour) setHour(localHour);
  };

  useEffect(() => {
    allowPaypal();
  }, [nom, prenom, birthdate, telephone, instagram, whatsapp, date, hour]);

  useEffect(() => {
    storeToLocalStorage();
  }, [
    nom,
    prenom,
    email,
    birthdate,
    telephone,
    instagram,
    whatsapp,
    date,
    hour,
  ]);

  useEffect(() => {
    getBookedSlots();
  }, [date]);

  useEffect(() => {
    getBookedSlots();
    retrieveLocalStorage();
  }, []);

  return (
    <>
      <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="frFR">
        <Head>
          <title>Les cartes de titiphe</title>
          <meta
            name="description"
            content="Les cartes de titiphe, voyance et cartomancie"
          />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <div className={styles.prestationDetailsContainer}>
          {prestation && (
            <>
              <PrestationHero prestation={prestation} />
              <PersonalInfosInput
                nom={nom}
                setNom={setNom}
                prenom={prenom}
                setPrenom={setPrenom}
                email={email}
                setEmail={setEmail}
                birthdate={birthdate}
                setBirthdate={setBirthdate}
                errors={errors}
              />
              <ContactInput
                telephone={telephone}
                setTelephone={setTelephone}
                instagram={instagram}
                setInstagram={setInstagram}
                whatsapp={whatsapp}
                setWhatsapp={setWhatsapp}
                errors={errors}
              />
              <CreneauInput
                dayBookedSlots={dayBookedSlots}
                monthBookedSlots={monthBookedSlots}
                date={date}
                setDate={setDate}
                hour={hour}
                setHour={setHour}
                errors={errors}
              />
              <PaypalButton
                prestation={prestation}
                date={date}
                hour={hour}
                telephone={telephone}
                instagram={instagram}
                whatsapp={whatsapp}
                errors={errors}
              />
              <h3>
                5. Le rendez-vous est pris, je peux l'ajouter à mon agenda 😃
              </h3>
            </>
          )}
        </div>
      </LocalizationProvider>
    </>
  );
};

Prestation_details.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export async function getStaticPaths() {
  const prestations_list =
    (await prestationsAPI.getAll("ssr")).data?.prestations || [];

  const paths = prestations_list.map((prestation) => ({
    params: { id: prestation.link },
  }));

  return {
    paths,
    fallback: "blocking",
  };
}

export async function getStaticProps() {
  const prestations_list =
    (await prestationsAPI.getAll("ssr")).data?.prestations || [];

  const { ISR_REVALIDATION } = process.env;

  const revalidate = !prestations_list.length
    ? 1
    : parseInt(ISR_REVALIDATION || "10", 10);

  return {
    props: { prestations_list }, // will be passed to the page component as props
    revalidate,
  };
}

export default Prestation_details;
