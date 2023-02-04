import { api } from "./api";

type GetByDate = {
  status: number;
  data: { slots: string[] } | undefined;
};

export const paypalAPI = {
  storePaypal: async (monthYear: string): Promise<GetByDate> => {
    try {
      const { status, data }: GetByDate = await api.csr.post(`/storePaypal`, {
        monthYear,
      });

      return { status, data };
    } catch (e) {
      console.error(e);
      return { status: 500, data: undefined };
    }
  },
};
