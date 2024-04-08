import { create } from "zustand";
import { NextWordState, NextWordActions } from "../schema";

export const useNextWord = create<NextWordState & NextWordActions>((set) => ({
  userText: "",

  setUserText: (update) => {
    set((state) => ({
      userText: typeof update === "function" ? update(state.userText) : update,
    }));
  },
}));
