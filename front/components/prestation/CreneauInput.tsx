import {
  FormControlLabel,
  FormGroup,
  ListItemButton,
  ListItemText,
  Switch,
  TextField,
} from "@mui/material";
import { StaticDatePicker } from "@mui/x-date-pickers";
import React, { BaseSyntheticEvent, useEffect } from "react";
import dayjs, { Dayjs } from "dayjs";
import {
  convertRawSlotsToDaySlots,
  ErrorMessage,
} from "../../pages/prestations/[id]";
import genericStyles from "../../styles/Prestation_details.module.scss";
import styles from "./CreneauInput.module.scss";

type CreneauInputProps = {
  noBookedDate: boolean;
  setNoBookedDate: React.Dispatch<React.SetStateAction<boolean>>;
  dayBookedSlots: string[];
  monthBookedSlots: string[];
  date: Date | null;
  setDate: React.Dispatch<React.SetStateAction<Date | null>>;
  hour: string | undefined;
  setHour: React.Dispatch<React.SetStateAction<string | undefined>>;
  errors: ErrorMessage[];
};

const hourList = Array(22)
  .fill(undefined)
  .map(
    (_, index) =>
      `${(Math.floor(index / 2) + 11).toString().padStart(2, "0")}:${
        index % 2 ? "30" : "00"
      }`
  );

const CreneauInput = ({
  noBookedDate,
  setNoBookedDate,
  dayBookedSlots,
  monthBookedSlots,
  date,
  setDate,
  hour,
  setHour,
  errors,
}: CreneauInputProps) => {
  const today = new Date();
  const currentYear = today.getFullYear();
  const currentMonth = today.getMonth();
  const currentDay = today.getDate();
  const currentHour = today.getHours();

  const isDisabled = (h: string, forceDate?: Date, forceSlots?: string[]) => {
    const dateToCheck = forceDate || date;
    const slotsToCheck = forceSlots ? forceSlots : dayBookedSlots;

    if (dateToCheck && !forceDate) {
      const hHour = parseInt(h.split(":")[0], 10);

      if (
        dateToCheck.getFullYear() === currentYear &&
        dateToCheck.getMonth() === currentMonth &&
        dateToCheck.getDate() === currentDay &&
        hHour <= currentHour + 3
      ) {
        return true;
      }
    }

    return slotsToCheck.includes(h);
  };

  const isDayDisabled = (day: Dayjs & { $d: Date }) => {
    const daySlots = convertRawSlotsToDaySlots(monthBookedSlots, day["$d"]);

    return hourList
      .map((hour) => isDisabled(hour, day["$d"], daySlots))
      .every((hour) => hour === true);
  };

  const handleDateChange = (newValue: dayjs.Dayjs | null) => {
    if (newValue) setDate(newValue.toDate());
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

  const handleSwitchClick = () => {
    if (noBookedDate === false) {
      setDate(null);
      setHour(undefined);
    }

    setNoBookedDate(!noBookedDate);
  };

  useEffect(() => {
    if (date && hour) {
      const daySlots = convertRawSlotsToDaySlots(monthBookedSlots, date);
      if (isDisabled(hour, date, daySlots)) {
        setHour(undefined);
      }
    }
  }, [date, hour]);

  return (
    <>
      <h3>
        3. Je choisi un créneau pour le rendez-vous
        {!noBookedDate && displaySelectedDateTime()}
      </h3>
      <div className={styles.switchContainer}>
        <Switch
          checked={noBookedDate}
          onChange={handleSwitchClick}
          inputProps={{ "aria-label": "controlled" }}
        />
        <span className={styles.label} onClick={handleSwitchClick}>
          Je ne souhaite pas sélectionner de créneau maintenant et serait
          recontacté plus tard pour la prise d'un rendez-vous
        </span>
      </div>
      <div
        className={[
          styles.dateTimeContainer,
          errors.map((err) => err.type).includes("creneau") &&
          noBookedDate === false
            ? styles.creneauWarning
            : "",
          noBookedDate ? styles.disableCalendar : "",
        ].join(" ")}
      >
        <div className={styles.dateSelectionContainer}>
          <StaticDatePicker
            displayStaticWrapperAs="desktop"
            disablePast
            shouldDisableDate={isDayDisabled}
            label="Week picker"
            value={date}
            onChange={handleDateChange}
            // renderDay={renderWeekPickerDay}
            renderInput={(params) => (
              <TextField
                {...params}
                error={errors.map((err) => err.type).includes("creneau")}
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
    </>
  );
};

export default CreneauInput;
