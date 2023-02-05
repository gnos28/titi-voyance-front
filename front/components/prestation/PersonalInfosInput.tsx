import { TextField } from "@mui/material";
import { DesktopDatePicker } from "@mui/x-date-pickers";
import React from "react";
import dayjs from "dayjs";
import { ErrorMessage } from "../../pages/prestations/[id]";
import genericStyles from "../../styles/Prestation_details.module.scss";
import styles from "./PersonalInfosInput.module.scss";

type PersonalInfosInputProps = {
  nom: string;
  setNom: React.Dispatch<React.SetStateAction<string>>;
  prenom: string;
  setPrenom: React.Dispatch<React.SetStateAction<string>>;
  email: string;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  birthdate: Date | null;
  setBirthdate: React.Dispatch<React.SetStateAction<Date | null>>;
  errors: ErrorMessage[];
};

const PersonalInfosInput = ({
  nom,
  setNom,
  prenom,
  setPrenom,
  email,
  setEmail,
  birthdate,
  setBirthdate,
  errors,
}: PersonalInfosInputProps) => {
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

  const handleBirthdateChange = (newValue: dayjs.Dayjs | null) => {
    if (newValue) setBirthdate(newValue.toDate());
  };

  return (
    <>
      <h3>1. Je renseigne mes informations personnelles</h3>
      <div className={genericStyles.infoContainer}>
        <div>
          <TextField
            id="nom"
            label="Nom"
            variant="outlined"
            required
            value={nom}
            onChange={(newValue) => handleInputChange(newValue, "nom")}
            error={errors.map((err) => err.type).includes("nom")}
          />
          <TextField
            id="prenom"
            label="Prénom"
            variant="outlined"
            required
            value={prenom}
            onChange={(newValue) => handleInputChange(newValue, "prenom")}
            error={errors.map((err) => err.type).includes("prenom")}
          />
          <TextField
            id="email"
            label="Email"
            variant="outlined"
            type="email"
            value={email}
            onChange={(newValue) => handleInputChange(newValue, "email")}
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
                id="date de naissance"
                error={errors.map((err) => err.type).includes("birthdate")}
              />
            )}

            // error={errors.map((err) => err.type).includes("birthdate")}
          />
        </div>
        <div className={genericStyles.maxWidth}>
          <TextField
            id="information complementaires"
            label="Informations complétementaires sur le tirage demandé"
            variant="outlined"
            multiline
            rows={5}
            fullWidth
          />
        </div>
      </div>
    </>
  );
};

export default PersonalInfosInput;
