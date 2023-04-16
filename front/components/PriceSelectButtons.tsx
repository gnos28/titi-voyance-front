import { ToggleButton, ToggleButtonGroup } from "@mui/material";
import React from "react";
import styles from "./PriceSelectButtons.module.scss";

type PriceSelectButtonsProps = {
  price: number;
  prices: number[];
  setPrice: React.Dispatch<React.SetStateAction<number>>;
};

const PriceSelectButtons = ({
  price,
  prices,
  setPrice,
}: PriceSelectButtonsProps) => {
  const handleChangePrice = (
    _event: React.MouseEvent<HTMLElement, MouseEvent>,
    value: number
  ) => {
    setPrice(value);
  };

  const getButtonStyle = (_buttonPrice: number) => {
    const selected = {
      backgroundColor: "#9b3869",
      color: "white",
      fontSize: "18px",
      fontWeight: "bold",
    };

    return selected;
  };

  return (
    <div className={styles.toggleButtonContainer}>
      <ToggleButtonGroup
        color="primary"
        value={price}
        exclusive
        onChange={handleChangePrice}
        aria-label="Platform"
        size="large"
      >
        {prices.map((prix) => (
          <ToggleButton key={prix} value={prix} sx={getButtonStyle(prix)}>
            {prix}€
          </ToggleButton>
        ))}
      </ToggleButtonGroup>
    </div>
  );
};

export default PriceSelectButtons;
