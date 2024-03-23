import { create } from "zustand";

interface AuthState {
  isLoginModalOpen: boolean;
  isSignUpModalOpen: boolean;
  currentUser: object | null;
}

interface AuthActions {
  setIsLoginModalOpen: (isLoginModalOpen: boolean) => void;
  setIsSignUpModalOpen: (isSignUpModalOpen: boolean) => void;
  setCurrentUser: (currentUser: object) => void;
}

// Create the useAuth store with types
export const useAuth = create<AuthState & AuthActions>((set) => ({
  isLoginModalOpen: false,
  isSignUpModalOpen: false,
  currentUser: null,

  setIsLoginModalOpen: (isLoginModalOpen) => set({ isLoginModalOpen }),
  setIsSignUpModalOpen: (isSignUpModalOpen) => set({ isSignUpModalOpen }),
  setCurrentUser: (currentUser) => set({ currentUser }),
}));
