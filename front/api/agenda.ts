import { api } from "./_api";

type GetByDate = {
  status: number;
  data: { slots: string[] } | undefined;
};

export const agendaAPI = {
  getByDate: async (monthYear: string): Promise<GetByDate> => {
    try {
      const { status, data }: GetByDate = await api.csr.post(`/getAgenda`, {
        monthYear,
      });

      return { status, data };
    } catch (e) {
      console.error(e);
      return { status: 500, data: undefined };
    }
  },
};
