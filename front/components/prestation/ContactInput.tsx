import React, { useEffect, useState } from "react";
import InstagramIcon from "@mui/icons-material/Instagram";
import PhoneInTalkIcon from "@mui/icons-material/PhoneInTalk";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import { TextField } from "@mui/material";
import { ErrorMessage } from "../../pages/prestations/[id]";
import genericStyles from "../../styles/Prestation_details.module.scss";
import styles from "./ContactInput.module.scss";

type ContactInputProps = {
  telephone: string;
  setTelephone: React.Dispatch<React.SetStateAction<string>>;
  instagram: string;
  setInstagram: React.Dispatch<React.SetStateAction<string>>;
  whatsapp: string;
  setWhatsapp: React.Dispatch<React.SetStateAction<string>>;
  errors: ErrorMessage[];
};

const ContactInput = ({
  telephone,
  setTelephone,
  instagram,
  setInstagram,
  whatsapp,
  setWhatsapp,
  errors,
}: ContactInputProps) => {
  const [contactContainerStyle, setContactContainerStyle] =
    useState<React.CSSProperties>({});

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

  useEffect(() => {
    const { innerWidth } = window;

    if (innerWidth < 650)
      setContactContainerStyle({
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
      });
  }, []);

  return (
    <>
      <h3>2. Je souhaite être contacté par</h3>
      <div className={genericStyles.infoContainer}>
        <div style={contactContainerStyle}>
          <PhoneInTalkIcon sx={{ fontSize: 40 }} />
          <TextField
            id="telephone"
            label="Téléphone"
            variant="outlined"
            onChange={(newValue) => handleContactChange(newValue, "telephone")}
            value={telephone}
            error={errors.map((err) => err.type).includes("contact")}
          />
        </div>
        <div style={contactContainerStyle}>
          <InstagramIcon sx={{ fontSize: 40 }} />
          <TextField
            id="instagram"
            label="Instagram"
            variant="outlined"
            onChange={(newValue) => handleContactChange(newValue, "instagram")}
            value={instagram}
            error={errors.map((err) => err.type).includes("contact")}
          />
        </div>
        <div style={contactContainerStyle}>
          <WhatsAppIcon sx={{ fontSize: 40 }} />
          <TextField
            id="whatsapp"
            label="WhatsApp"
            variant="outlined"
            onChange={(newValue) => handleContactChange(newValue, "whatsapp")}
            value={whatsapp}
            error={errors.map((err) => err.type).includes("contact")}
          />
        </div>
      </div>
    </>
  );
};

export default ContactInput;
