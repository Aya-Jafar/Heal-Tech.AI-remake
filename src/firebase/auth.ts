import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  GoogleAuthProvider,
  updateProfile,
} from "firebase/auth";
import { app } from "./config";
import { useAuth } from "../store/auth";
import { AuthSchema } from "../schema";

const auth = getAuth(app);

const { currentUser, setCurrentUser } = useAuth.getState() as AuthSchema;

console.log(currentUser);


export async function createAccount(
  email: string,
  userName: string,
  password: string
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

export async function logIn(email: string, password: string) {
  try {
    await signInWithEmailAndPassword(auth, email, password);
    const user = auth.currentUser;
    console.log(user);

    if (user) {
      setCurrentUser(user);
      localStorage.setItem("token", (user as any).accessToken);
    } else {
      setCurrentUser(null);
    }
  } catch (error) {
    console.error("Sign-in error:", error);
    setCurrentUser(null);
  }
}
