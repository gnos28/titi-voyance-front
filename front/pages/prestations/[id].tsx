import Head from "next/head";
import { useRouter } from "next/router";
import React, {
  BaseSyntheticEvent,
  ReactElement,
  useEffect,
  useRef,
  useState,
} from "react";
import Layout from "../../components/Layout";
import { NextPageWithLayout } from "../_app";
import styles from "../../styles/Prestation_details.module.scss";
import { prestations_list } from "../../data/prestations_list";
import { DesktopDatePicker, StaticDatePicker } from "@mui/x-date-pickers";
import TextField from "@mui/material/TextField";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import "dayjs/locale/fr";
import dayjs from "dayjs";
import { ListItemButton, ListItemText } from "@mui/material";
import {
  PayPalButtons,
  PayPalButtonsComponentProps,
} from "@paypal/react-paypal-js";
//@ts-ignore
import Card from "react-animated-3d-card";
import Prestation from "../../components/Prestation";
import { agendaAPI } from "../../api/agenda";
import InstagramIcon from "@mui/icons-material/Instagram";
import PhoneInTalkIcon from "@mui/icons-material/PhoneInTalk";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import { paypalAPI } from "../../api/paypal";

type ErrorMessage = {
  type: "nom" | "prenom" | "birthdate" | "contact" | "creneau";
  content: string;
};

const hourList = Array(20)
  .fill(undefined)
  .map(
    (_, index) =>
      `${(Math.floor(index / 2) + 9).toString().padStart(2, "0")}:${
        index % 2 ? "30" : "00"
      }`
  );

const Prestation_details: NextPageWithLayout = () => {
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

  const isDisabled = (h: string) => {
    return dayBookedSlots.includes(h);
  };

  const handleBirthdateChange = (newValue: dayjs.Dayjs | null) => {
    if (newValue) setBirthdate(newValue.toDate());
  };

  const handleDateChange = (newValue: dayjs.Dayjs | null) => {
    if (newValue) setDate(newValue.toDate());
  };

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

      setDayBookedSlots(
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
          })
      );
    }
  };

  const handleCreateOrder: PayPalButtonsComponentProps["createOrder"] = (
    data,
    actions
  ) => {
    return actions.order
      .create({
        purchase_units: [
          {
            amount: {
              // currency_code: "EUR",
              value: prestation.price.toString(),
            },
          },
        ],
      })
      .then((orderId) => {
        // Your code here after create the order
        return orderId;
      });
  };

  const handleApprove: PayPalButtonsComponentProps["onApprove"] = async (
    data,
    actions
  ) => {
    const actionsOrder = actions.order;
    if (!actionsOrder) return new Promise((resolve) => resolve());

    return actionsOrder.capture().then(async (details) => {
      console.log("details", details);

      const { create_time, id, status } = details;

      const email_adress = details.payer.email_address;
      const prenom = details.payer.name?.given_name;
      const nom = details.payer.name?.surname;
      const payer_id = details.payer.payer_id;
      const payer_name = details?.payer?.name?.given_name;

      const purchasedAmount = details.purchase_units[0]?.amount.value;
      const purchasedCurrency = details.purchase_units[0]?.amount.currency_code;

      const rawAddress = details.purchase_units[0]?.shipping?.address;
      let address: string | undefined;
      if (rawAddress) address = JSON.stringify(rawAddress);

      if (status === "COMPLETED" && nom && prenom && date && hour) {
        const prestationName = prestation.name;
        const prestationDuration = prestation.duration;
        const prestationPrice = prestation.price;

        const purchasingData = {
          id: parseInt(id, 10),
          create_time,
          purchasedAmount,
          purchasedCurrency,
          status,
          payer_id,
          payer_name,
          prenom,
          nom,
          email_adress,
          address,
          date,
          hour,
          prestationName,
          prestationDuration,
          prestationPrice,
          telephone,
          instagram,
          whatsapp,
        };

        await paypalAPI.storePaypal(purchasingData);

        console.log("purchasingData", purchasingData);
      }
    });
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    type: "nom" | "prenom" | "email"
  ) => {
    const rawInput = e.target.value;
    let cleanedInput = "";

    if (type === "nom" || type === "prenom") {
      cleanedInput = rawInput.replace(
        /[^a-zA-ZáàâäãåçéèêëíìîïñóòôöõúùûüýÿæœÁÀÂÄÃÅÇÉÈÊËÍÌÎÏÑÓÒÔÖÕÚÙÛÜÝŸÆŒ\-\s]/g,
        ""
      );
    }

    if (type === "email") {
      cleanedInput = rawInput.replace(/[^a-zA-Z0-9\-\.@]/g, "").toLowerCase();
    }

    if (type === "nom") setNom(cleanedInput);
    if (type === "prenom") setPrenom(cleanedInput);
    if (type === "email") setEmail(cleanedInput);
  };

  const handleContactChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    type: "telephone" | "instagram" | "whatsapp"
  ) => {
    const rawInput = e.target.value;
    let cleanedInput = "";

    if (type === "telephone" || type === "whatsapp") {
      cleanedInput = rawInput.replace(/[^\d\s\+\-\.]/g, "");
    }

    if (type === "instagram") {
      cleanedInput = rawInput.replace(/[^a-zA-Z0-9\._]/g, "").toLowerCase();
    }

    if (type === "telephone") setTelephone(cleanedInput);
    if (type === "instagram") setInstagram(cleanedInput);
    if (type === "whatsapp") setWhatsapp(cleanedInput);
  };

  const displaySelectedDateTime = () => {
    if (date && hour) {
      const selectedDate = new Date(
        date.getFullYear(),
        date.getMonth(),
        date.getDate(),
        parseInt(hour.split(":")[0], 10),
        parseInt(hour.split(":")[1], 10)
      );

      return " : " + dayjs(selectedDate).format("dddd D MMMM YYYY H:mm");
    }

    return "";
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
              <h2>{prestation.name}</h2>
              <div className={styles.prestationDescriptionContainer}>
                <div className={styles.articlesContainer}>
                  <Card key={prestation.name}>
                    <article>
                      <Prestation
                        name={prestation.name}
                        description={prestation.description}
                        price={prestation.price}
                        background={prestation.background}
                        link={prestation.link}
                      />
                    </article>
                  </Card>
                </div>

                <div>
                  <p>{prestation.description_long}</p>
                  <p>
                    {prestation.price} € {prestation.duration} minutes
                  </p>
                </div>
              </div>
              <h3>1. Je renseigne mes informations personnelles</h3>
              <div className={styles.infoContainer}>
                <div>
                  <TextField
                    id="outlined-basic"
                    label="Nom"
                    variant="outlined"
                    required
                    value={nom}
                    onChange={(newValue) => handleInputChange(newValue, "nom")}
                    error={errors.map((err) => err.type).includes("nom")}
                  />
                  <TextField
                    id="outlined-basic"
                    label="Prénom"
                    variant="outlined"
                    required
                    value={prenom}
                    onChange={(newValue) =>
                      handleInputChange(newValue, "prenom")
                    }
                    error={errors.map((err) => err.type).includes("prenom")}
                  />
                  <TextField
                    id="outlined-basic"
                    label="Email"
                    variant="outlined"
                    type="email"
                    value={email}
                    onChange={(newValue) =>
                      handleInputChange(newValue, "email")
                    }
                  />
                  <DesktopDatePicker
                    label="Date de naissance"
                    inputFormat="MM/DD/YYYY"
                    value={birthdate}
                    onChange={handleBirthdateChange}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        required
                        error={errors
                          .map((err) => err.type)
                          .includes("birthdate")}
                      />
                    )}

                    // error={errors.map((err) => err.type).includes("birthdate")}
                  />
                </div>
                <div className={styles.maxWidth}>
                  <TextField
                    id="outlined-basic"
                    label="Informations complétementaires sur le tirage demandé"
                    variant="outlined"
                    multiline
                    rows={5}
                    fullWidth
                  />
                </div>
              </div>
              <h3>2. Je souhaite être contacté par</h3>
              <div className={styles.infoContainer}>
                <div>
                  <PhoneInTalkIcon sx={{ fontSize: 40 }} />
                  <TextField
                    id="outlined-basic"
                    label="Téléphone"
                    variant="outlined"
                    onChange={(newValue) =>
                      handleContactChange(newValue, "telephone")
                    }
                    value={telephone}
                    error={errors.map((err) => err.type).includes("contact")}
                  />
                </div>
                <div>
                  <InstagramIcon sx={{ fontSize: 40 }} />
                  <TextField
                    id="outlined-basic"
                    label="Instagram"
                    variant="outlined"
                    onChange={(newValue) =>
                      handleContactChange(newValue, "instagram")
                    }
                    value={instagram}
                    error={errors.map((err) => err.type).includes("contact")}
                  />
                </div>
                <div>
                  <WhatsAppIcon sx={{ fontSize: 40 }} />
                  <TextField
                    id="outlined-basic"
                    label="WhatsApp"
                    variant="outlined"
                    onChange={(newValue) =>
                      handleContactChange(newValue, "whatsapp")
                    }
                    value={whatsapp}
                    error={errors.map((err) => err.type).includes("contact")}
                  />
                </div>
              </div>
              <h3>
                3. Je choisi un créneau pour le rendez-vous
                {displaySelectedDateTime()}
              </h3>
              <div
                className={[
                  styles.dateTimeContainer,
                  errors.map((err) => err.type).includes("creneau")
                    ? styles.creneauWarning
                    : "",
                ].join(" ")}
              >
                <div>
                  <StaticDatePicker
                    displayStaticWrapperAs="desktop"
                    label="Week picker"
                    value={date}
                    onChange={handleDateChange}
                    // renderDay={renderWeekPickerDay}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        error={errors
                          .map((err) => err.type)
                          .includes("creneau")}
                      />
                    )}
                    inputFormat="'Week of' MMM d"
                    showDaysOutsideCurrentMonth={true}
                  />
                </div>
                <div className={styles.hourSelectionContainer}>
                  {hourList.map((h) => (
                    <ListItemButton
                      key={h}
                      sx={{
                        width: 75,
                        maxWidth: 75,
                        textAlign: "center",
                      }}
                      onClick={(e: BaseSyntheticEvent) => {
                        setHour(e.target.innerText);
                      }}
                      selected={hour === h ? true : false}
                      disabled={isDisabled(h)}
                    >
                      <ListItemText primary={h} />
                    </ListItemButton>
                  ))}
                </div>
              </div>
              <h3>4. Je paye la prestation via paypal</h3>
              {errors.length === 0 ? (
                <PayPalButtons
                  style={{ layout: "horizontal" }}
                  createOrder={handleCreateOrder}
                  onApprove={handleApprove}
                />
              ) : (
                <div className={styles.warning}>
                  {errors.map((message) => (
                    <p key={message.type}>- {message.content}</p>
                  ))}
                </div>
              )}

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

export default Prestation_details;
