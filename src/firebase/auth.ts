import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  GoogleAuthProvider,
  updateProfile,
} from "firebase/auth";
import { app } from "./config";

const auth = getAuth(app);

export async function createAccount(
  email: string,
  userName: string,
  password: string,
  setCurrentUser: any
) {
  try {
    await createUserWithEmailAndPassword(auth, email, password);
    const user = auth.currentUser;

    if (user) {
      await updateProfile(user, { displayName: userName });
      setCurrentUser(user);
      localStorage.setItem("token", (user as any).accessToken);
    }
  } catch (error) {
    console.error("Email sign-up error:", error);
  }
}



function logIn(email: string, password: string): void {}
