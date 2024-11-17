import { create } from "zustand";

// Define the shape of your store
interface ActiveIdState {
  activeId: number; // State property
  setActiveId: (id: number) => void; // Action
}

interface isChoosedState {
  isChoosed: boolean; // State property
  setIsChoosed: (state: boolean) => void; // Action
}
// Create the store with types
export const useActiveId = create<ActiveIdState>((set) => ({
  activeId: -1,
  setActiveId: (id: number) => set(() => ({ activeId: id })),
}));

export const useIsChoosed = create<isChoosedState>((set) => ({
  isChoosed: true,
  setIsChoosed: (state: boolean) => set(() => ({ isChoosed: state })),
}));
