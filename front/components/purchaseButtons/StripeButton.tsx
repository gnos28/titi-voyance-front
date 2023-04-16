import React, { useEffect } from "react";
import { PurchasingData, purchaseAPI } from "../../api/purchase";
import styles from "./StripeButton.module.scss";
import { Button } from "@mui/material";
import CreditCardIcon from "@mui/icons-material/CreditCard";

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
  setPurchaseOK: React.Dispatch<React.SetStateAction<boolean>>;
};

const StripeButton = ({
  prestation,
  date,
  hour,
  telephone,
  instagram,
  whatsapp,
  setPurchaseOK,
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
    const { status, data } = await purchaseAPI.createStripeSession(
      purchasingData
    );

    if (status === 200) window.location.href = data.url;
  };

  useEffect(() => {
    // Check to see if this is a redirect back from Checkout
    const query = new URLSearchParams(window.location.search);

    if (query.get("success")) {
      setPurchaseOK(true);
    }

    if (query.get("canceled")) {
      setPurchaseOK(false);
    }
  }, []);

  return (
    <div className={styles.stripeButtonContainer}>
      <Button
        onClick={handleClick}
        sx={{ height: 47, width: 300, marginTop: "-5px" }}
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
