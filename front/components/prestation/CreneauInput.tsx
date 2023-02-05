import { ListItemButton, ListItemText, TextField } from "@mui/material";
import { StaticDatePicker } from "@mui/x-date-pickers";
import React, { BaseSyntheticEvent } from "react";
import dayjs from "dayjs";
import { ErrorMessage } from "../../pages/prestations/[id]";
import genericStyles from "../../styles/Prestation_details.module.scss";
import styles from "./CreneauInput.module.scss";

type CreneauInputProps = {
  dayBookedSlots: string[];
  date: Date | null;
  setDate: React.Dispatch<React.SetStateAction<Date | null>>;
  hour: string | undefined;
  setHour: React.Dispatch<React.SetStateAction<string | undefined>>;
  errors: ErrorMessage[];
};

const hourList = Array(20)
  .fill(undefined)
  .map(
    (_, index) =>
      `${(Math.floor(index / 2) + 9).toString().padStart(2, "0")}:${
        index % 2 ? "30" : "00"
      }`
  );

const CreneauInput = ({
  dayBookedSlots,
  date,
  setDate,
  hour,
  setHour,
  errors,
}: CreneauInputProps) => {
  const isDisabled = (h: string) => {
    return dayBookedSlots.includes(h);
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

  return (
    <>
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
