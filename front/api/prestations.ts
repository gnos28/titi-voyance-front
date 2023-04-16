import { api } from "./_api";

export type PrestationItem = {
  name: string;
  description: string;
  price: number;
  background: string;
  link: string;
  description_long: string;
  duration: number;
};

type GetAll = {
  status: number;
  data: { prestations: PrestationItem[] } | undefined;
};

type From = "csr" | "ssr";

export const prestationsAPI = {
  getAll: async (from: From): Promise<GetAll> => {
    try {
      const { status, data }: GetAll = await api[from].get(`/getPrestations`);

      return { status, data };
    } catch (e) {
      console.error(e);
      return { status: 500, data: undefined };
    }
  },
};
