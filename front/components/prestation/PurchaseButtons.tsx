import React, { useEffect, useState } from "react";
import { PurchasingData, purchaseAPI } from "../../api/purchase";
import { ErrorMessage } from "../../pages/prestations/[id]";
import styles from "./PurchaseButtons.module.scss";
import StripeButton from "../purchaseButtons/StripeButton";
import PaypalButton from "../purchaseButtons/PaypalButton";

type PurchaseButtonsProps = {
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
  purchaseOK: boolean;
  setPurchaseOK: React.Dispatch<React.SetStateAction<boolean>>;
  buttonOnly?: boolean;
  goToNextStep?: () => void;
};

const PurchaseButtons = ({
  prestation,
  date,
  hour,
  telephone,
  instagram,
  whatsapp,
  errors,
  purchaseOK,
  setPurchaseOK,
  buttonOnly,
  goToNextStep,
}: PurchaseButtonsProps) => {
  const [purchasingData, setPurchasingData] = useState<PurchasingData>({
    date,
    hour,
    telephone,
    instagram,
    whatsapp,
    prestationName: prestation.name,
    prestationDuration: prestation.duration,
    prestationPrice: prestation.price,
  });

  const storePurchase = async () => {
    if (purchaseOK === true) {
      await purchaseAPI.storePurchase(purchasingData);
      if (goToNextStep) goToNextStep();
    }
  };

  useEffect(() => {
    storePurchase();
  }, [purchasingData, purchaseOK]);

  return (
    <>
      {buttonOnly !== true && (
        <h3>4. Je paye la prestation via paypal ou par carte bancaire</h3>
      )}
      <div className={styles.paypalContainer}>
        {errors.length === 0 ? (
          <>
            <PaypalButton
              prestation={prestation}
              setPurchaseOK={setPurchaseOK}
              purchasingData={purchasingData}
              setPurchasingData={setPurchasingData}
            />
            <StripeButton
              prestation={prestation}
              date={date}
              hour={hour}
              telephone={telephone}
              instagram={instagram}
              whatsapp={whatsapp}
              setPurchaseOK={setPurchaseOK}
            />
          </>
        ) : (
          <div className={styles.warning}>
            {errors.map((message) => (
              <p key={message.type}>- {message.content}</p>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default PurchaseButtons;
