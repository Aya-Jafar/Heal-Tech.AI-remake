import React, { useState, useEffect } from "react";
import { useAuth } from "../store/auth";
import { AuthSchema } from "../schema";
import { getSavedGeneratedText } from "../Firebase/data";
import { Avatar } from "@mui/material";
import { cyan } from "@mui/material/colors";
import { getUserInfo } from "../Firebase/data";
import { get1st2Letters } from "../utils/helpers";
import { Link } from "react-router-dom";
import { linkStyle } from "../dynamicStyles";

interface SavedGenerated {
  generatedTextId?: string;
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

  return (
    <div className="profile">
      <div className="info-section">
        <Avatar sx={{ bgcolor: cyan[500], width: 100, height: 100 }}>
          <h1>{get1st2Letters(currentUser)}</h1>
        </Avatar>
        <div>
          <h2>{`Dr. ${(currentUser as any)?.displayName}`}</h2>
          {userInfo?.specialization ? (
            <p>{userInfo?.specialization}</p>
          ) : (
            <>None</>
          )}
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
            <Link
              to={`/saved-generated/${saved.generatedTextId}`}
              key={index}
              className="saved-item"
              style={{ ...linkStyle }}
            >
              <>
                <h1>{saved?.title}</h1>
                <p>{saved?.text}</p>
              </>
            </Link>
          ))}
        </div>
      ) : (
        <center>
          <p>No Saved texts yet...</p>
        </center>
      )}
    </div>
  );
}

export default Profile;
