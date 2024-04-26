export interface AuthSchema {
  isLoginModalOpen: boolean;

  isSignUpModalOpen: boolean;

  setIsLoginModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setIsLogin: React.Dispatch<React.SetStateAction<boolean>>;

  setIsSignUpModalOpen: React.Dispatch<React.SetStateAction<boolean>>;

  setCurrentUser: React.Dispatch<React.SetStateAction<any>>;

  currentUser: object;
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

export interface SavedGenerated {
  generatedTextId?: string;
  title?: string;
  text?: string;
}

export interface GeneratedTextGridProps {
  currentTab: string;
}

export interface ErrorAlertProps {
  validAuth: boolean;
  type?: string;
}

export interface MobileHeaderProps {
  menuActive: boolean;
}

export interface ServiceItemProps {
  color: string;
  title: string;
  description: string;
  path: string;
}

export interface CustomizedSnackbarsProps {
  text: string;
  openState: boolean;
  setOpenState: React.Dispatch<React.SetStateAction<boolean>>;
  type: "success" | "error";
}

// Input object schema to save in Firestore
export interface SaveGeneratedTextInput {
  title: string;
  text: string;
}

export interface SavedGeneratedData {
  title: string;
  text: string;
}

export interface NextWordState {
  userText: string;
}

export interface NextWordActions {
  setUserText: (update: string | ((prevUserText: string) => string)) => void;
}

export interface TitleFormProps {
  isTitleModalOpen: boolean;
  setIsTitleModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setTitle: React.Dispatch<React.SetStateAction<string>>;
  saveToProfile: React.MouseEventHandler<HTMLButtonElement>;
}

export interface ValidAuth {
  email: boolean;
  password1: boolean;
  password2: boolean;
  name: boolean;
  specialization: boolean;
  phoneNumber: boolean;
  password1ErrorMessage: string;
}
