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
import PurchaseButtons from "../../components/prestation/PurchaseButtons";
import { PrestationItem, prestationsAPI } from "../../api/prestations";
import { GetStaticPaths, GetStaticProps } from "next";
import StepBanner from "../../components/prestation/StepBanner";
import StepButtons from "../../components/prestation/StepButtons";
import AddToCalendar from "../../components/prestation/AddToCalendar";

export type Step =
  | "Informations"
  | "Contact"
  | "Horaire"
  | "Paiement"
  | "Confirmation";

export type ErrorMessage = {
  step: Step;
  type: "nom" | "prenom" | "birthdate" | "contact" | "creneau" | "paypalNOK";
  content: string;
};

type Prestation_detailsProps = {
  prestations_list: PrestationItem[];
};

const steps: Step[] = [
  "Informations",
  "Contact",
  "Horaire",
  "Paiement",
  "Confirmation",
];

export const convertRawSlotsToDaySlots = (rawSlots: string[], date: Date) =>
  rawSlots
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
  const [purchaseOK, setPurchaseOK] = useState(false);
  const [errors, setErrors] = useState<ErrorMessage[]>([]);
  const [activeStep, setActiveStep] = useState(0);
  const [noBookedDate, setNoBookedDate] = useState(false);

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
        step: "Informations",
        type: "nom",
        content: "veuillez renseigner votre nom",
      });

    if (prenom === "")
      errorMessages.push({
        step: "Informations",
        type: "prenom",
        content: "veuillez renseigner votre prénom",
      });

    if (birthdate === null)
      errorMessages.push({
        step: "Informations",
        type: "birthdate",
        content: "veuillez renseigner votre date de naissance",
      });

    if (birthdate !== null && birthdate.getTime() > is18)
      errorMessages.push({
        step: "Informations",
        type: "birthdate",
        content: "ces prestations sont interdites aux mineurs",
      });

    if (errorMessages.length) return setErrors(errorMessages);

    if (telephone === "" && instagram === "" && whatsapp === "")
      errorMessages.push({
        step: "Contact",
        type: "contact",
        content: "veuillez indiquer un moyen de vous contacter",
      });

    if (errorMessages.length) return setErrors(errorMessages);

    if (noBookedDate === false && (date === null || !hour))
      errorMessages.push({
        step: "Horaire",
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

  const goNextStep = (step: Step) => {
    const nextStep = steps.findIndex((st) => st === step) + 1;

    if (nextStep < steps.length) setActiveStep(nextStep);
  };

  const goPreviousStep = (step: Step) => {
    const previousStep = steps.findIndex((st) => st === step) - 1;

    if (previousStep >= 0) setActiveStep(previousStep);
  };

  const goToStep = (step: Step) => {
    const newStep = steps.findIndex((st) => st === step);

    setActiveStep(newStep);
  };

  useEffect(() => {
    allowPaypal();
  }, [
    nom,
    prenom,
    birthdate,
    telephone,
    instagram,
    whatsapp,
    date,
    hour,
    noBookedDate,
  ]);

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

  const goToNextStep = () => {
    setActiveStep(4);
  };

  // useEffect(() => {
  //   if (purchaseOK) setActiveStep(4);
  // }, [purchaseOK]);

  useEffect(() => {
    getBookedSlots();
    retrieveLocalStorage();
  }, []);

  return (
    <>
      <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="frFR">
        <Head>
          <title>{prestation.name} - Les cartes de titiphe</title>
          <meta name="description" content={prestation.description_long} />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <div className={styles.prestationDetailsContainer}>
          {prestation && (
            <>
              <PrestationHero prestation={prestation} />
              <StepBanner
                steps={steps}
                activeStep={activeStep}
                goToStep={goToStep}
              />
              {activeStep === 0 && (
                <>
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
                  <StepButtons
                    steps={steps}
                    step="Informations"
                    errors={errors}
                    goNextStep={goNextStep}
                    goPreviousStep={goPreviousStep}
                  />
                </>
              )}
              {activeStep === 1 && (
                <>
                  <ContactInput
                    telephone={telephone}
                    setTelephone={setTelephone}
                    instagram={instagram}
                    setInstagram={setInstagram}
                    whatsapp={whatsapp}
                    setWhatsapp={setWhatsapp}
                    errors={errors}
                  />
                  <StepButtons
                    steps={steps}
                    step="Contact"
                    errors={errors}
                    goNextStep={goNextStep}
                    goPreviousStep={goPreviousStep}
                  />
                </>
              )}
              {activeStep === 2 && (
                <>
                  <CreneauInput
                    noBookedDate={noBookedDate}
                    setNoBookedDate={setNoBookedDate}
                    dayBookedSlots={dayBookedSlots}
                    monthBookedSlots={monthBookedSlots}
                    date={date}
                    setDate={setDate}
                    hour={hour}
                    setHour={setHour}
                    errors={errors}
                  />
                  <StepButtons
                    steps={steps}
                    step="Horaire"
                    errors={errors}
                    goNextStep={goNextStep}
                    goPreviousStep={goPreviousStep}
                  />
                </>
              )}
              {activeStep === 3 && (
                <>
                  <PurchaseButtons
                    prestation={prestation}
                    date={date}
                    hour={hour}
                    telephone={telephone}
                    instagram={instagram}
                    whatsapp={whatsapp}
                    errors={errors}
                    purchaseOK={purchaseOK}
                    setPurchaseOK={setPurchaseOK}
                    goToNextStep={goToNextStep}
                  />
                  <StepButtons
                    steps={steps}
                    step="Paiement"
                    // errors={[]}
                    errors={
                      purchaseOK
                        ? []
                        : [
                            {
                              step: "Paiement",
                              type: "paypalNOK",
                              content: "paiement NOK",
                            },
                          ]
                    }
                    goNextStep={goNextStep}
                    goPreviousStep={goPreviousStep}
                  />
                </>
              )}
              {activeStep === 4 && (
                <>
                  <AddToCalendar
                    date={date}
                    hour={hour}
                    prestation={prestation}
                  />
                </>
              )}
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

export const getStaticPaths: GetStaticPaths = async () => {
  const prestations_list =
    (await prestationsAPI.getAll("ssr")).data?.prestations || [];

  const paths = prestations_list.map((prestation) => ({
    params: { id: prestation.link },
  }));

  return {
    paths,
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps = async () => {
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
};

export default Prestation_details;
