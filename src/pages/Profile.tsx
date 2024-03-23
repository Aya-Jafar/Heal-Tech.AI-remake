import React, { useContext, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../store/auth";
import { AuthSchema } from "../schema";
import { saveGeneratedText } from "../Firebase/data";

function Profile() {
  const { currentUser } = useAuth() as AuthSchema;

  console.log(currentUser?.uid);

  const [savedNotes, setSavedNotes] = useState([]);

  const { uid } = useParams();


  useEffect(() => {
    // getSavedArtworks(uid, setSavedNotes);
    // getUserInfo(uid).then((result) => setUserInfo(result));
  }, [uid]);

  // console.log(userInfo);

  return (
    <div className="profile">
      <div>
        {/* {currentUser ? (
          <img src={currentUser.image} alt="" className="profile-image" />
        ) : (
          <img src={profileImg} alt="" className="profile-image" />
        )} */}
      </div>

      {/* <h1>{userInfo && userInfo.name}</h1> */}
      {/* <h4>{userInfo && userInfo.email}</h4> */}
      {/* 
      <ProfileTabProvider>
        <ProfileTabs />
        <ProfileTabContent uid={uid} />
      </ProfileTabProvider> */}
    </div>
  );
}

export default Profile;
