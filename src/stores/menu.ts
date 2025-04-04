import { create } from "zustand";

interface MenuStore {
  isOpen: boolean;
  setIsOpen: (by: boolean) => void;
}

const useMenuStore = create<MenuStore>((set) => ({
  isOpen: false,
  setIsOpen: (value: boolean) => set(() => ({ isOpen: value })),
}));

export default useMenuStore;
