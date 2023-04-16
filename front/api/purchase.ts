import { api } from "./_api";

export type PurchasingData = {
  id?: number;
  create_time?: string | undefined;
  purchasedAmount?: string | undefined;
  purchasedCurrency?: string | undefined;
  status?: string | undefined;
  payer_id?: string | undefined;
  payer_name?: string | undefined;
  prenom?: string | undefined;
  nom?: string | undefined;
  email_adress?: string | undefined;
  address?: string | undefined;
  date: Date | null | undefined;
  hour: string | undefined;
  prestationName: string | undefined;
  prestationDuration: number | undefined;
  prestationPrice: number | undefined;
  telephone: string | undefined;
  instagram: string | undefined;
  whatsapp: string | undefined;
};

type StorePurchase = {
  status: number;
  data: undefined;
};

type CreateStripeSession = {
  status: number;
  data: { url: string };
};

export const purchaseAPI = {
  storePurchase: async (
    purchasingData: PurchasingData
  ): Promise<StorePurchase> => {
    try {
      const { status, data }: StorePurchase = await api.csr.post(
        `/storePurchase`,
        {
          purchasingData,
        }
      );

      return { status, data };
    } catch (e) {
      console.error(e);
      return { status: 500, data: undefined };
    }
  },
  createStripeSession: async (
    purchasingData: PurchasingData
  ): Promise<CreateStripeSession> => {
    try {
      const { status, data }: CreateStripeSession = await api.csr.post(
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
