import { create } from "zustand";

export type ModalState = {
  closing: boolean;
  setClosing: (closing: boolean) => void;
  handleClose: (onClose: () => void) => void;
};

export const useModalStore = create<ModalState>((set) => ({
  closing: false,
  setClosing: (closing) => set({ closing }),
  handleClose: (onClose) => {
    set({ closing: true });
    setTimeout(() => {
      set({ closing: false });
      onClose();
    }, 300);
  },
}));
