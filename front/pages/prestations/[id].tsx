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
import {
  Checkbox,
  FormControlLabel,
  FormGroup,
  Icon,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material";
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
  const [birthdate, setBrithdate] = useState<Date | null>(null);

  const prestation = prestations_list.filter(
    (prestation) => prestation.link === id
  )[0];
  dayjs.locale("fr");

  const isDisabled = (h: string) => {
    return dayBookedSlots.includes(h);
  };

  const handleBirthdateChange = (newValue: dayjs.Dayjs | null) => {
    if (newValue) setBrithdate(newValue.toDate());
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
              value: "1",
            },
          },
        ],
      })
      .then((orderId) => {
        // Your code here after create the order
        return orderId;
      });
  };

  const handleApprove: PayPalButtonsComponentProps["onApprove"] = (
    data,
    actions
  ) => {
    const actionsOrder = actions.order;
    if (!actionsOrder) return new Promise((resolve) => resolve());

    return actionsOrder.capture().then((details) => {
      console.log("details", details);

      const { create_time, id, status } = details;

      const email_adress = details.payer.email_address;
      const prenom = details.payer.name?.given_name;
      const nom = details.payer.name?.surname;
      const payer_id = details.payer.payer_id;

      const purchasedAmount = details.purchase_units[0]?.amount.value;
      const purchasedCurrency = details.purchase_units[0]?.amount.currency_code;

      const rawAddress = details.purchase_units[0]?.shipping?.address;
      let address: string | undefined;
      if (rawAddress) address = JSON.stringify(rawAddress);

      if (status === "COMPLETED") {
        const purchasingData = {
          id,
          create_time,
          purchasedAmount,
          purchasedCurrency,
          status,
          payer_id,
          prenom,
          nom,
          email_adress,
          address,
          date,
          hour,
        };
      }

      const name = details?.payer?.name?.given_name;
    });
  };

  useEffect(() => {
    getBookedSlots();
  }, [date]);

  useEffect(() => {
    getBookedSlots();
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
                  />
                  <TextField
                    id="outlined-basic"
                    label="Prénom"
                    variant="outlined"
                    required
                  />
                  <TextField
                    id="outlined-basic"
                    label="Email"
                    variant="outlined"
                    type="email"
                  />
                  <DesktopDatePicker
                    label="Date de naissance"
                    inputFormat="MM/DD/YYYY"
                    value={birthdate}
                    onChange={handleBirthdateChange}
                    renderInput={(params) => <TextField {...params} required />}
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
                  />
                </div>
                <div>
                  <InstagramIcon sx={{ fontSize: 40 }} />
                  <TextField
                    id="outlined-basic"
                    label="Instagram"
                    variant="outlined"
                  />
                </div>
                <div>
                  <WhatsAppIcon sx={{ fontSize: 40 }} />
                  <TextField
                    id="outlined-basic"
                    label="WhatsApp"
                    variant="outlined"
                  />
                </div>
              </div>
              <h3>3. Je choisi un créneau pour le rendez-vous</h3>
              <div className={styles.dateTimeContainer}>
                <StaticDatePicker
                  displayStaticWrapperAs="desktop"
                  label="Week picker"
                  value={date}
                  onChange={handleDateChange}
                  // renderDay={renderWeekPickerDay}
                  renderInput={(params) => <TextField {...params} />}
                  inputFormat="'Week of' MMM d"
                  showDaysOutsideCurrentMonth={true}
                />
                <List
                  sx={{
                    width: "100%",
                    maxWidth: 360,
                    bgcolor: "background.paper",
                    position: "relative",
                    overflow: "auto",
                    maxHeight: "100%",
                    "& ul": { padding: 0 },
                  }}
                >
                  {hourList.map((h) => (
                    <ListItem disablePadding key={h}>
                      <ListItemButton
                        onClick={(e: BaseSyntheticEvent) => {
                          setHour(e.target.innerText);
                        }}
                        selected={hour === h ? true : false}
                        disabled={isDisabled(h)}
                      >
                        <ListItemText primary={h} />
                      </ListItemButton>
                    </ListItem>
                  ))}
                </List>
              </div>
              <h3>4. Je paye la prestation via paypal</h3>
              <PayPalButtons
                style={{ layout: "horizontal" }}
                createOrder={handleCreateOrder}
                onApprove={handleApprove}
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

export default Prestation_details;
