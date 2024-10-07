// store.ts
import { create } from "zustand";

interface MenuStore {
  menuOpen: boolean;
  toggleMenu: () => void;
  setMenuClose: () => void;
}

interface FullScreenStore {
  //fullScreenGlobal: boolean;
  isFullScreen: boolean;
  //toggleFullScreenGlobalState: () => void;
  toggleFullScreen: () => void;
}

export const useMenuStore = create<MenuStore>((set) => ({
  menuOpen: false,
  toggleMenu: () => set((state) => ({ menuOpen: !state.menuOpen })),
  setMenuClose: () => set({ menuOpen: false }),
}));

export const useFullScreenStore = create<FullScreenStore>((set) => ({
  isFullScreen: false, // Initialize fullScreenGlobalState as false
  toggleFullScreen: () =>
    set((state) => ({ isFullScreen: !state.isFullScreen })), // Toggle fullScreenGlobalState
}));
