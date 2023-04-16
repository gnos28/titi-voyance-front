import {
  PayPalButtons,
  PayPalButtonsComponentProps,
} from "@paypal/react-paypal-js";
import React from "react";
import { PurchasingData } from "../../api/purchase";

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
  setPurchaseOK: React.Dispatch<React.SetStateAction<boolean>>;
  purchasingData: PurchasingData;
  setPurchasingData: React.Dispatch<React.SetStateAction<PurchasingData>>;
};

const PaypalButton = ({
  setPurchaseOK,
  prestation,
  setPurchasingData,
  purchasingData,
}: PaypalButtonProps) => {
  const handleCreateOrder: PayPalButtonsComponentProps["createOrder"] = async (
    _data,
    actions
  ) =>
    actions.order
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
      .then(
        (orderId) =>
          // Your code here after create the order
          orderId
      );

  const handleApprove: PayPalButtonsComponentProps["onApprove"] = async (
    _data,
    actions
  ) => {
    const actionsOrder = actions.order;
    if (!actionsOrder) return new Promise((resolve) => resolve());

    return actionsOrder.capture().then(async (details) => {
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

      if (status === "COMPLETED" && nom && prenom) {
        const prestationName = prestation.name;
        const prestationDuration = prestation.duration;
        const prestationPrice = prestation.price;

        setPurchasingData({
          ...purchasingData,
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
          prestationName,
          prestationDuration,
          prestationPrice,
        });

        setPurchaseOK(true);
      }
    });
  };

  return (
    <PayPalButtons
      style={{ layout: "horizontal", tagline: false }}
      createOrder={(data, actions) => handleCreateOrder(data, actions)}
      onApprove={handleApprove}
      disabled={prestation.price === 0}
    />
  );
};

export default PaypalButton;
