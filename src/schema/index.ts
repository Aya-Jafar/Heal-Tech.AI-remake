export interface AuthSchema {
  isLoginModalOpen: boolean;

  isSignUpModalOpen: boolean;

  setIsLoginModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setIsLogin: React.Dispatch<React.SetStateAction<boolean>>;

  setIsSignUpModalOpen: React.Dispatch<React.SetStateAction<boolean>>;

  setCurrentUser: React.Dispatch<React.SetStateAction<any>>;

  currentUser: {
    uid: string;
  };
}

export interface SummaryAPIResponse {
  generated_text?: string;
}
export interface APIErrorResponse {
  estimated_time?: number;
}

export interface ChatBotState {
  isClicked: boolean;
  currentQuestion: string;
  answer: string | null;
  questions: string[];
}

export type ChatBotStateAction =
  | { type: "SEND_ICON_CLICK" }
  | { type: "SET_CURRENT_QUESTION"; payload: string }
  | { type: "SET_ANSWER"; payload: string }
  | { type: "RESET_CLICK" }
  | { type: "SET_ERROR"; payload: string };
