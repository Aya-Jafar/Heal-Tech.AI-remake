import { create } from "zustand";

export const useAuth = create((set) => ({
  isLoginModalOpen: false,
  isSignUpModalOpen: false,

  currentUser: null,

  setIsLoginModalOpen: (isLoginModalOpen: boolean) => set({ isLoginModalOpen }),

  setIsSignUpModalOpen: (isSignUpModalOpen: boolean) =>
    set({ isSignUpModalOpen }),

  setCurrentUser: (currentUser: object) => set({ currentUser }),
}));
