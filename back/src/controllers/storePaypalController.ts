import { Request, Response } from "express";
import { calendar_v3 } from "googleapis";
import * as dotenv from "dotenv";
import { getAgenda } from "../utils/google";
import { exportToSheet } from "../utils/exportToSheet";
dotenv.config();

export type ControllerType = {
  [key: string]: (req: Request, res: Response) => Promise<void>;
};

type PurchasingData = {
  id: number;
  create_time: string | undefined;
  purchasedAmount: string | undefined;
  purchasedCurrency: string | undefined;
  status: string | undefined;
  payer_id: string | undefined;
  payer_name: string | undefined;
  prenom: string | undefined;
  nom: string | undefined;
  email_adress: string | undefined;
  address: string | undefined;
  date: string | undefined;
  hour: string | undefined;
  prestationName: string | undefined;
  prestationDuration: number | undefined;
  prestationPrice: number | undefined;
  telephone: string | undefined;
  instagram: string | undefined;
  whatsapp: string | undefined;
};

const storePaypalController: ControllerType = {};

storePaypalController.store = async (req, res) => {
  try {
    const purchasingData = req.body.purchasingData as PurchasingData;

    // save data to google sheet
    exportToSheet([purchasingData], "840247244");
    // create new agenda event

    // send mail to customer

    // const slots = await getSlotsByDate(monthYear);
    res.send({});
  } catch (err: unknown) {
    console.error(err);
    res.sendStatus(500);
  }
};

export default storePaypalController;
