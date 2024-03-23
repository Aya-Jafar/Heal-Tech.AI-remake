import { create } from "zustand";

export const useNextWord = create((set) => ({
  generatedText: null,

  setGeneratedText: (currentUser: any) => set({ currentUser }),
}));
