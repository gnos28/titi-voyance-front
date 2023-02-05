import React from "react";
import {
  PayPalButtons,
  PayPalButtonsComponentProps,
} from "@paypal/react-paypal-js";
import { paypalAPI } from "../../api/paypal";
import { ErrorMessage } from "../../pages/prestations/[id]";
import genericStyles from "../../styles/Prestation_details.module.scss";
import styles from "./PaypalButton.module.scss";

type PaypalButtonProps = {
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
};

const PaypalButton = ({
  prestation,
  date,
  hour,
  telephone,
  instagram,
  whatsapp,
  errors,
}: PaypalButtonProps) => {
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

  return (
    <>
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
    </>
  );
};

export default PaypalButton;
