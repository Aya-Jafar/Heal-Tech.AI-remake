

export interface AuthSchema {
  isLoginModalOpen: boolean;
  currentUser: object;
  isSignUpModalOpen: boolean;

  setIsLoginModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setIsLogin: React.Dispatch<React.SetStateAction<boolean>>;

  setIsSignUpModalOpen: React.Dispatch<React.SetStateAction<boolean>>;

  setCurrentUser: React.Dispatch<React.SetStateAction<object>>;
}
