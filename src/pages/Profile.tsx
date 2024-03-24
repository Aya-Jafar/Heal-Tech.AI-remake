import React, { useContext, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../store/auth";
import { AuthSchema } from "../schema";
import { getSavedGeneratedText } from "../Firebase/data";
import { Grid } from "@mui/material";
import { onAuthStateChanged } from "firebase/auth";
import { getAuth } from "firebase/auth";
import { app } from "../Firebase/config";
interface SavedGenerated {
  title?: string;
  text?: string;
}

function Profile() {
  const { currentUser } = useAuth() as AuthSchema;

  const [savedGenerated, setSavedGenerated] = useState<Array<object>>([]);

  const { uid } = useParams();

  useEffect(() => {
    getSavedGeneratedText(setSavedGenerated);
  }, [currentUser]);

  console.log(savedGenerated);

  return (
    <div className="profile">
      {savedGenerated.length > 0 ? (
        <div className="saved-grid">
          {savedGenerated.map((saved: SavedGenerated, index) => (
            <div key={index} className="saved-item">
              <h1>{saved?.title}</h1>
              <p>{saved?.text}</p>
            </div>
          ))}
        </div>
      ) : (
        <div className="loader-container">
          <span className="loader"></span>
        </div>
      )}
    </div>
  );
}

export default Profile;
