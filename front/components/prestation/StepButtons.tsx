import { Button } from "@mui/material";
import React from "react";
import { ErrorMessage, Step } from "../../pages/prestations/[id]";
import styles from "./StepButtons.module.scss";

type StepButtonsProps = {
  steps: Step[];
  step: Step;
  errors: ErrorMessage[];
  goNextStep: (step: Step) => void;
  goPreviousStep: (step: Step) => void;
};

const StepButtons = ({
  steps,
  step,
  errors,
  goNextStep,
  goPreviousStep,
}: StepButtonsProps) => {
  const disableNextButton = () =>
    errors.filter((err) => err.step === step).length > 0;

  return (
    <div className={styles.container}>
      <div>
        {steps[0] !== step && (
          <Button variant="text" onClick={() => goPreviousStep(step)}>
            Etape Précédente
          </Button>
        )}
      </div>
      <div>
        {steps[steps.length - 1] !== step && (
          <Button
            variant="contained"
            disabled={disableNextButton()}
            onClick={() => goNextStep(step)}
          >
            Etape Suivante
          </Button>
        )}
      </div>
    </div>
  );
};

export default StepButtons;
