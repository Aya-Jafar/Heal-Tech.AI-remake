import React, { useState, useEffect } from "react";
import { useAuth } from "../store/auth";
import { AuthSchema } from "../schema";
import { getSavedGeneratedText } from "../Firebase/data";
import { Avatar } from "@mui/material";
import { deepOrange } from "@mui/material/colors";
import { getUserInfo } from "../Firebase/data";

interface SavedGenerated {
  title?: string;
  text?: string;
}

function Profile() {
  const { currentUser } = useAuth() as AuthSchema;

  const [savedGenerated, setSavedGenerated] = useState<Array<object>>([]);

  const [userInfo, setUserInfo] = useState<any>(null);

  // TODO: Pass the uid in the URL dynamically
  //   const { uid } = useParams();

  // TODO: Remove this state and make the `savedGenerated` dynamic
  const [loaded, setLoaded] = useState<boolean>(false);


  useEffect(() => {
    getUserInfo().then((result) => setUserInfo(result));
    getSavedGeneratedText(setSavedGenerated, setLoaded);
  }, [currentUser, loaded]);

  const get1st2Letters = () => {
    return `${(currentUser as any)?.displayName[0]}${
      (currentUser as any)?.displayName.split(" ")[1][0]
    }`;
  };

  return (
    <div className="profile">
      <div className="into-section">
        <Avatar sx={{ bgcolor: deepOrange[500], width: 100, height: 100 }}>
          <h1>{get1st2Letters()}</h1>
        </Avatar>
        <div>
          <h2>{userInfo?.userName}</h2>
          <h3>{userInfo?.specialization}</h3>
        </div>
      </div>

      {!loaded && (
        <div className="loader-container">
          <span className="loader"></span>
        </div>
      )}

      {loaded && savedGenerated.length > 0 ? (
        <div className="saved-grid">
          {savedGenerated.map((saved: SavedGenerated, index) => (
            <div key={index} className="saved-item">
              <h1>{saved?.title}</h1>
              <p>{saved?.text}</p>
            </div>
          ))}
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}

export default Profile;
