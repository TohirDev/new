import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

export const useMahallaStore = create()(
  devtools((set) => ({
    mahallaModal: undefined,
    setMahallaModal: (data) =>
      set((state) => ({
        ...state,
        mahallaModal: data,
      })),
  })),
  { name: 'Mahalla Store' }
);
