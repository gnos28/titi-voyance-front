import { Request, Response } from "express";
import { calendar_v3 } from "googleapis";
import * as dotenv from "dotenv";
import { getAgenda } from "../utils/google";
dotenv.config();

export type ControllerType = {
  [key: string]: (req: Request, res: Response) => Promise<void>;
};

const storePaypalController: ControllerType = {};

storePaypalController.store = async (req, res) => {
  try {
    const monthYear = req.body.monthYear as string;

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
