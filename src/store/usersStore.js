import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

export const useUsersStore = create()(
  devtools((set) => ({
    usersModal: undefined,
    setUsersModal: (data) =>
      set((state) => ({
        ...state,
        usersModal: data,
      })),
  })),
  { name: 'Users Store' }
);
