import { Request, Response } from "express";
import { calendar_v3 } from "googleapis";
import * as dotenv from "dotenv";
import { getAgenda } from "../utils/google";
dotenv.config();

export type ControllerType = {
  [key: string]: (req: Request, res: Response) => Promise<void>;
};

type PurchasingData = {
  id: string;
  create_time: string;
  purchasedAmount: string;
  purchasedCurrency: string;
  status: string;
  payer_id: string;
  payer_name: string;
  prenom: string;
  nom: string;
  email_adress: string;
  address: string;
  date: Date;
  hour: string;
  prestationName: string;
  prestationDuration: number;
  prestationPrice: number;
};

const storePaypalController: ControllerType = {};

storePaypalController.store = async (req, res) => {
  try {
    const purchasingData = req.body.purchasingData as string;

    // save data to google sheet

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
