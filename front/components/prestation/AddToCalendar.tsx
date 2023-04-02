import React from "react";
import { AddToCalendarButton } from "add-to-calendar-button-react";
import { PrestationItem } from "../../api/prestations";
import styles from "./AddToCalendar.module.scss";

type AddToCalendarProps = {
  date: Date | null;
  hour: string | undefined;
  prestation: PrestationItem;
};
const AddToCalendar = ({ date, hour, prestation }: AddToCalendarProps) => {
  let startDate: string = "";
  let endTime: string = "";

  if (date && hour) {
    const startYear = date.getFullYear();
    const startMonth = date.getMonth() + 1;
    const startDay = date.getDate();
    const startHour = parseInt(hour.split(":")[0], 10);
    const startMinute = parseInt(hour.split(":")[1], 10);

    const startTime = new Date(
      startYear,
      startMonth - 1,
      startDay,
      startHour,
      startMinute
    ).getTime();

    const endDate = new Date(startTime + prestation.duration * 60 * 1000);

    if (endDate.getDate() !== startDay) endTime = "23:59";
    else
      endTime = `${endDate.getHours().toString().padStart(2, "0")}:${endDate
        .getMinutes()
        .toString()
        .padStart(2, "0")}`;

    startDate = `${date.getFullYear()}-${(date.getMonth() + 1)
      .toString()
      .padStart(2, "0")}-${date.getDate().toString().padStart(2, "0")}`;
  }

  return (
    <div>
      {date !== null && hour !== undefined && (
        <>
          <h3>5. Le rendez-vous est pris, je peux l'ajouter à mon agenda 😃</h3>
          <div className={styles.container}>
            <div>
              <AddToCalendarButton
                label="Google"
                name={prestation.name}
                startDate={startDate}
                startTime={hour}
                endTime={endTime}
                timeZone="Europe/Paris"
                options={["Google"]}
              />
            </div>
            <div>
              <AddToCalendarButton
                label="Apple"
                name={prestation.name}
                startDate={startDate}
                startTime={hour}
                endTime={endTime}
                timeZone="Europe/Paris"
                options={["Apple"]}
              />
            </div>
            <div>
              <AddToCalendarButton
                label="Teams"
                name={prestation.name}
                startDate={startDate}
                startTime={hour}
                endTime={endTime}
                timeZone="Europe/Paris"
                options={["MicrosoftTeams"]}
              />
            </div>
            <div>
              <AddToCalendarButton
                label="Outlook"
                name={prestation.name}
                startDate={startDate}
                startTime={hour}
                endTime={endTime}
                timeZone="Europe/Paris"
                options={["Outlook.com"]}
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default AddToCalendar;
