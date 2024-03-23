import { create } from "zustand";

interface NextWordState {
  aiText: string;
}

interface NextWordActions {
  setAIText: (aiText: string) => void;
}

export const useNextWord = create<NextWordState & NextWordActions>((set) => ({
  aiText: "",

  setAIText: (aiText) => set({ aiText }),
}));
