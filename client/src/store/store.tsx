import { create } from "zustand";

interface ActiveIdState {
  activeId: number;
  setActiveId: (id: number) => void;
}

interface isChoosedState {
  isChoosed: boolean;
  setIsChoosed: (state: boolean) => void;
}

interface isRemovedState {
  isRemoved: boolean;
  setIsRemoved: (state: boolean) => void;
}
interface isGeneratingState {
  isGenerating: boolean;
  setisGenerating: (state: boolean) => void;
}

export const useActiveId = create<ActiveIdState>((set) => ({
  activeId: -1,
  setActiveId: (id: number) => set(() => ({ activeId: id })),
}));

export const useIsChoosed = create<isChoosedState>((set) => ({
  isChoosed: true,
  setIsChoosed: (state: boolean) => set(() => ({ isChoosed: state })),
}));

export const useIsRemoved = create<isRemovedState>((set) => ({
  isRemoved: false,
  setIsRemoved: (state: boolean) => set(() => ({ isRemoved: state })),
}));

export const useIsGenerating = create<isGeneratingState>((set) => ({
  isGenerating: false,
  setisGenerating: (state: boolean) => set(() => ({ isGenerating: state })),
}));
