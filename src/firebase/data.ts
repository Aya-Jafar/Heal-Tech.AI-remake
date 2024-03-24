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

// Input object schema to save in Firestore
interface GeneratedTextInput {
  title: string;
  text: string;
}

export const saveGeneratedText = async (
  generatedText: GeneratedTextInput
): Promise<void> => {
  const { currentUser } = useAuth.getState() as AuthSchema;

  const currentUserUid = (currentUser as any)?.uid;

  // Get the current user's UID
  if (currentUserUid) {
    // Create a reference to the "generated-text" collection
    const generatedTextRef = await addDoc(
      collection(db, "generated-text"),
      generatedText
    );

    const generatedTextId = generatedTextRef.id;

    // Create a reference to the user's document in the "saved-generated" collection
    const userSavedPostsRef = doc(db, "saved-generated", currentUserUid);

    try {
      // Fetch the user's document to get the current saved generated text IDs
      const userSavedPostsSnapshot = await getDoc(userSavedPostsRef);
      const userData = userSavedPostsSnapshot.data();

      if (userData && userData.savedGenerated) {
        // Add the generated text ID to the array
        userData.savedGenerated.push(generatedTextId);

        // Update the user's document with the updated saved generated text IDs
        await setDoc(userSavedPostsRef, {
          savedGenerated: userData.savedGenerated,
        });

        console.log("Generated text ID added to saved-generated");
      } else {
        // Create a new document for the user if it doesn't exist
        await setDoc(userSavedPostsRef, {
          savedGenerated: [generatedTextId],
        });

        console.log(
          "User's saved-generated document created with the generated text ID"
        );
      }
    } catch (error) {
      console.error("Error updating saved-generated:", error);
    }
  }
};

export const getSavedGeneratedText = async (
  setter: React.Dispatch<React.SetStateAction<Array<object>>>
) => {
  const { currentUser } = useAuth.getState() as AuthSchema;
  const currentUserUid = (currentUser as any)?.uid;

  console.log("Inside function", currentUser);

  if (currentUserUid) {
    const userSavedPostsRef = doc(db, "saved-generated", currentUserUid);

    const generatedTexts = [] as Array<object>;

    try {
      // Fetch the user's document to get the current saved artwork data
      const userSavedPostsSnapshot = await getDoc(userSavedPostsRef);
      const userData = userSavedPostsSnapshot.data();

      if (userData && userData.savedGenerated) {
        const savedGeneratedIDs = userData.savedGenerated;
        console.log(savedGeneratedIDs);

        for (const generatedTextId of savedGeneratedIDs) {
          const generatedTextDocRef = doc(
            db,
            "generated-text",
            generatedTextId
          );
          const generatedTextDocSnapshot = await getDoc(generatedTextDocRef);
          if (generatedTextDocSnapshot.exists()) {
            const generatedText = generatedTextDocSnapshot.data();
            generatedTexts.push(generatedText);
          }
        }
      }
      if (generatedTexts) {
        setter(generatedTexts);
      }
    } catch (error) {
      console.error("Error fetching saved artworks:", error);
    }
  }
};
