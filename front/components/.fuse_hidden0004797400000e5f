import React, { useEffect, useState } from "react";
import StripeButton from "./prestation/StripeButton";
import { ErrorMessage } from "../pages/prestations/[id]";

const Message = ({ message }: { message: string }) => (
  <section>
    <p>{message}</p>
  </section>
);

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

const Stripe = ({
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
  const [message, setMessage] = useState("");

  useEffect(() => {
    // Check to see if this is a redirect back from Checkout
    const query = new URLSearchParams(window.location.search);

    if (query.get("success")) {
      setMessage("Order placed! You will receive an email confirmation.");
    }

    if (query.get("canceled")) {
      setMessage(
        "Order canceled -- continue to shop around and checkout when you're ready."
      );
    }
  }, []);

  //   return <Message message={message} />;

  return message ? <Message message={message} /> : <StripeButton />;
};

export default Stripe;
