import React from "react";
import {
  MobileStepper,
  Stack,
  Step,
  StepConnector,
  stepConnectorClasses,
  StepIconProps,
  StepLabel,
  Stepper,
  styled,
} from "@mui/material";
import AddIcCallIcon from "@mui/icons-material/AddIcCall";
import MoreTimeIcon from "@mui/icons-material/MoreTime";
import PaymentIcon from "@mui/icons-material/Payment";
import CheckIcon from "@mui/icons-material/Check";
import BadgeIcon from "@mui/icons-material/Badge";
import { Step as StepName } from "../../pages/prestations/[id]";
import styles from "./StepBanner.module.scss";

type StepBannerProps = {
  steps: StepName[];
  activeStep: number;
  goToStep: (step: StepName) => void;
};

const StepBanner = ({ steps, activeStep, goToStep }: StepBannerProps) => {
  const ColorlibConnector = styled(StepConnector)(({ theme }) => ({
    [`&.${stepConnectorClasses.alternativeLabel}`]: {
      top: 22,
    },
    [`&.${stepConnectorClasses.active}`]: {
      [`& .${stepConnectorClasses.line}`]: {
        backgroundImage:
          "linear-gradient( 95deg, #741b47 0%, #9b3869 50%, #c995af 100%)",
      },
    },
    [`&.${stepConnectorClasses.completed}`]: {
      [`& .${stepConnectorClasses.line}`]: {
        backgroundImage:
          "linear-gradient( 95deg, #741b47 0%, #9b3869 50%, #c995af 100%)",
      },
    },
    [`& .${stepConnectorClasses.line}`]: {
      height: 3,
      border: 0,
      backgroundColor:
        theme.palette.mode === "dark" ? theme.palette.grey[800] : "#eaeaf0",
      borderRadius: 1,
    },
  }));

  const ColorlibStepIconRoot = styled("div")<{
    ownerState: { completed?: boolean; active?: boolean };
  }>(({ theme, ownerState }) => ({
    backgroundColor:
      theme.palette.mode === "dark" ? theme.palette.grey[700] : "#ccc",
    zIndex: 1,
    color: "#fff",
    width: 50,
    height: 50,
    display: "flex",
    borderRadius: "50%",
    justifyContent: "center",
    alignItems: "center",
    ...(ownerState.active && {
      backgroundImage:
        "linear-gradient( 136deg, #c995af 0%, #9b3869 50%, #741b47 100%)",
      boxShadow: "0 4px 10px 0 rgba(0,0,0,.25)",
    }),
    ...(ownerState.completed && {
      backgroundImage:
        "linear-gradient( 136deg, #c995af 0%, #9b3869 50%, #741b47 100%)",
    }),
  }));

  const ColorlibStepIcon = (props: StepIconProps) => {
    const { active, completed, className } = props;

    const icons: { [index: string]: React.ReactElement } = {
      1: <BadgeIcon />,
      2: <AddIcCallIcon />,
      3: <MoreTimeIcon />,
      4: <PaymentIcon />,
      5: <CheckIcon />,
    };

    return (
      <ColorlibStepIconRoot
        ownerState={{ completed, active }}
        className={className}
      >
        {icons[String(props.icon)]}
      </ColorlibStepIconRoot>
    );
  };

  const handleClick = (label: StepName) => {
    const labelIndex = steps.findIndex((st) => st === label);
    if (activeStep > labelIndex && activeStep !== 4) goToStep(label);
  };

  return (
    <>
      <div className={styles.mobileStepper}>
        <MobileStepper
          variant="dots"
          steps={steps.length}
          position="static"
          activeStep={activeStep}
          sx={{ justifyContent:"center", flexGrow: 1, backgroundColor: "black" }}
          nextButton={null}
          backButton={null}
        />
      </div>
      <div className={styles.desktopStepper}>
        <Stack sx={{ width: "100%" }} spacing={4}>
          <Stepper
            alternativeLabel
            activeStep={activeStep}
            connector={<ColorlibConnector />}
          >
            {steps.map((label) => (
              <Step key={label} onClick={() => handleClick(label)}>
                <StepLabel
                  StepIconComponent={ColorlibStepIcon}
                  sx={activeStep !== 4 ? { cursor: "pointer" } : {}}
                >
                  {label}
                </StepLabel>
              </Step>
            ))}
          </Stepper>
        </Stack>
      </div>
    </>
  );
};

export default StepBanner;
