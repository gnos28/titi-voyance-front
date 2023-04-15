import React from "react";
import { PurchasingData, purchaseAPI } from "../../api/purchase";
import styles from "./StripeButton.module.scss";
import { Button } from "@mui/material";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import { ErrorMessage } from "../../pages/prestations/[id]";

type StripeButtonProps = {
  prestation: {
    name: string;
    description: string;
    price: number;
    background: string;
    link: string;
    description_long: string;
    duration: number;
  };
  date: Date | null;
  hour: string | undefined;
  telephone: string;
  instagram: string;
  whatsapp: string;
  errors: ErrorMessage[];
  setPurchaseOK: React.Dispatch<React.SetStateAction<boolean>>;
  buttonOnly?: boolean;
};

const StripeButton = ({
  prestation,
  date,
  hour,
  telephone,
  instagram,
  whatsapp,
  errors,
  setPurchaseOK,
  buttonOnly,
}: StripeButtonProps) => {
  const purchasingData: PurchasingData = {
    id: new Date().getTime(),
    create_time: new Date().toISOString(),
    purchasedAmount: "1",
    purchasedCurrency: "EUR",
    status: undefined,
    payer_id: undefined,
    payer_name: undefined,
    prenom: undefined,
    nom: undefined,
    email_adress: undefined,
    address: undefined,
    date,
    hour,
    prestationName: prestation.name,
    prestationDuration: prestation.duration,
    prestationPrice: prestation.price,
    telephone,
    instagram,
    whatsapp,
  };

  const handleClick = async () => {
    await purchaseAPI.storeStripe(purchasingData);
  };

  return (
    <div className={styles.stripeButtonContainer}>
      <Button
        onClick={handleClick}
        sx={{ height: 47, width: 276, marginTop: "-5px" }}
        color="info"
        variant="contained"
        startIcon={<CreditCardIcon />}
        disabled={prestation.price === 0}
      >
        Carte Bancaire
      </Button>
      {/* <button className={styles.stripeButton}>Checkout</button> */}
    </div>
  );
};

export default StripeButton;
