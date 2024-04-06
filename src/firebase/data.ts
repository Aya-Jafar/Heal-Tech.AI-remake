import { useAuth } from "../store/auth";
import { AuthSchema } from "../schema";
import {
  addDoc,
  doc,
  setDoc,
  getDoc,
  collection,
  getDocs,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";
import db from "./config";

// Input object schema to save in Firestore
interface SaveGeneratedTextInput {
  title: string;
  text: string;
}

//
interface GetGeneratedTextInput {
  dataSetter: React.Dispatch<React.SetStateAction<Array<object>>>;
  setLoaded: React.Dispatch<React.SetStateAction<boolean>>;
}

export const getUserInfo = async () => {
  try {
    const { currentUser } = useAuth.getState() as AuthSchema;

    const currentUserUid = (currentUser as any)?.uid;

    const docRef = doc(db, "users", currentUserUid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return docSnap.data();
    } else {
      return null;
    }
  } catch (e) {
    console.log(e);
    return null;
  }
};

export const saveGeneratedText = async (
  generatedText: SaveGeneratedTextInput
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
  dataSetter: React.Dispatch<React.SetStateAction<Array<object>>>,
  setLoaded: React.Dispatch<React.SetStateAction<boolean>>
) => {
  const { currentUser } = useAuth.getState() as AuthSchema;
  const currentUserUid = (currentUser as any)?.uid;

  if (currentUserUid) {
    const userSavedPostsRef = doc(db, "saved-generated", currentUserUid);

    const generatedTexts = [] as Array<object>;

    try {
      // Fetch the user's document to get the current saved artwork data
      const userSavedPostsSnapshot = await getDoc(userSavedPostsRef);
      const userData = userSavedPostsSnapshot.data();

      if (userData && userData.savedGenerated) {
        const savedGeneratedIDs = userData.savedGenerated;

        for (const generatedTextId of savedGeneratedIDs) {
          const generatedTextDocRef = doc(
            db,
            "generated-text",
            generatedTextId
          );
          const generatedTextDocSnapshot = await getDoc(generatedTextDocRef);
          if (generatedTextDocSnapshot.exists()) {
            const generatedText = generatedTextDocSnapshot.data();
            generatedTexts.push({ generatedTextId, ...generatedText });
          }
        }
      }
      if (generatedTexts) {
        dataSetter(generatedTexts);
        setLoaded(true);
      }
    } catch (error) {
      console.error("Error fetching saved artworks:", error);
    }
  }
};

export const getSavedGeneratedData = async (savedTextId: string) => {
  try {
    // Reference to the document with the specified savedTextId
    const savedGeneratedRef = doc(db, "generated-text", savedTextId);

    // Get the document snapshot
    const docSnapshot = await getDoc(savedGeneratedRef);

    // Check if the document exists
    if (docSnapshot?.exists()) {
      // Access the data of the document
      const savedGeneratedData = docSnapshot.data();
      return savedGeneratedData;
    } else {
      console.log("Document does not exist");
      return;
    }
  } catch (error) {
    console.error("Error getting document:", error);
    throw error;
  }
};

export const deleteGeneratedText = async (savedTextId: string) => {
  const savedGeneratedRef = doc(db, "generated-text", savedTextId);

  try {
    // Check if the document exists before attempting deletion
    const docSnapshot = await getDoc(savedGeneratedRef);
    if (docSnapshot.exists()) {
      await deleteDoc(savedGeneratedRef);
      console.log("Document successfully deleted");
      return true;
    } else {
      console.log("Document does not exist");
      return false;
    }
  } catch (error) {
    console.error("Error deleting document: ", error);
    return false;
  }
};

export const editGeneratedText = async (
  savedTextId: string,
  newText: string
) => {
  const savedGeneratedRef = doc(db, "generated-text", savedTextId);

  try {
    // Update the comment text
    await updateDoc(savedGeneratedRef, { text: newText });
    console.log("Comment edited successfully");
    return true
  } catch (error) {
    console.error("Error editing comment: ", error);
    return false
  }
};
