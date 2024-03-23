import { create } from "zustand";

interface NextWordState {
  userText: string;
}

interface NextWordActions {
  setUserText: (update: string | ((prevUserText: string) => string)) => void;
}

export const useNextWord = create<NextWordState & NextWordActions>((set) => ({
  userText: "",

  setUserText: (update) => {
    set((state) => ({
      userText: typeof update === "function" ? update(state.userText) : update,
    }));
  },
}));
