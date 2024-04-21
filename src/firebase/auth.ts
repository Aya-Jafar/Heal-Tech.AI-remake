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
import {
  addDoc,
  doc,
  setDoc,
  getDoc,
  collection,
  getDocs,
} from "firebase/firestore";
import db from "./config";

const auth = getAuth(app);

const { currentUser, setCurrentUser } = useAuth.getState() as AuthSchema;

export async function createAccount(
  email: string,
  userName: string,
  password: string,
  specialization: string,
  phoneNumber: string
) {
  try {
    await createUserWithEmailAndPassword(auth, email, password);
    const user = auth.currentUser;

    if (user) {
      await updateProfile(user, { displayName: userName });
      setCurrentUser(user);
      localStorage.setItem("token", (user as any).accessToken);
      await saveUserDataToFirestore(user.uid, {
        email,
        userName,
        specialization,
        phoneNumber,
      });
    }
  } catch (error) {
    console.error("Email sign-up error:", error);
    throw error
  }
}

export async function saveUserDataToFirestore(uid: string, userData: any) {
  try {
    // Create a reference to the "users" collection and the document with the user's UID
    const userDocRef = doc(db, "users", uid);

    // Set the user's data in the document
    await setDoc(userDocRef, userData);

    console.log("User data saved to Firestore");
  } catch (error) {
    console.error("Error saving user data to Firestore:", error);
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
