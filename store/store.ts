// store.ts
import { create } from "zustand";

//https://stackoverflow.com/questions/68183319/how-do-toggle-using-zustand

interface MenuStore {
  menuOpen: boolean;
  toggleMenu: () => void;
  setMenuClose: () => void;
}

export const useMenuStore = create<MenuStore>((set) => ({
  menuOpen: false,
  toggleMenu: () => set((state) => ({ menuOpen: !state.menuOpen })),
  setMenuClose: () => set({ menuOpen: false }),
}));
