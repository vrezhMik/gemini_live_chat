import { create } from "zustand";

// Define the shape of your store
interface ActiveIdState {
  activeId: number; // State property
  setActiveId: (id: number) => void; // Action
}

// Create the store with types
const useActiveId = create<ActiveIdState>((set) => ({
  activeId: -1,
  setActiveId: (id: number) => set(() => ({ activeId: id })),
}));

export default useActiveId;
