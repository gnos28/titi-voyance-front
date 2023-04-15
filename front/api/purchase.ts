import { api } from "./api";

export type PurchasingData = {
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
  date: Date | null | undefined;
  hour: string | undefined;
  prestationName: string | undefined;
  prestationDuration: number | undefined;
  prestationPrice: number | undefined;
  telephone: string | undefined;
  instagram: string | undefined;
  whatsapp: string | undefined;
};

type StorePaypal = {
  status: number;
  data: undefined;
};

type StoreStripe = {
  status: number;
  data: { url: string };
};

export const purchaseAPI = {
  storePaypal: async (purchasingData: PurchasingData): Promise<StorePaypal> => {
    try {
      const { status, data }: StorePaypal = await api.csr.post(`/storePaypal`, {
        purchasingData,
      });

      return { status, data };
    } catch (e) {
      console.error(e);
      return { status: 500, data: undefined };
    }
  },
  storeStripe: async (purchasingData: PurchasingData): Promise<StoreStripe> => {
    try {
      const { status, data }: StoreStripe = await api.csr.post(
        `/create-checkout-session`,
        {
          purchasingData,
        }
      );

      return { status, data };
    } catch (e) {
      console.error(e);
      return { status: 500, data: { url: "" } };
    }
  },
};
