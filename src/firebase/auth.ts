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
  setCurrentUser: React.Dispatch<React.SetStateAction<any>>
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

export async function signOutUser() {
  try {
    await signOut(auth);
    localStorage.removeItem("token");
  } catch (error) {
    console.error("Sign-out error:", error);
  }
}

export async function logIn(
  email: string,
  password: string,
  setCurrentUser: React.Dispatch<React.SetStateAction<any>>
) {
  try {
    await signInWithEmailAndPassword(auth, email, password);
    const user = auth.currentUser;

    if (user) {
      //   console.log("User from login", user);
      setCurrentUser(user);
      localStorage.setItem("token", (user as any).accessToken);
    }
  } catch (error) {
    console.error("Sign-in error:", error);
  }
}
