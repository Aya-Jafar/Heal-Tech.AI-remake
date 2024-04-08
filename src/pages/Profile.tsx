import React, { useState, useEffect } from "react";
import { useAuth } from "../store/auth";
import { AuthSchema } from "../schema";
import { Avatar } from "@mui/material";
import { cyan } from "@mui/material/colors";
import { getUserInfo } from "../Firebase/data";
import { get1st2Letters } from "../utils/helpers";
import GeneratedTextGrid from "../components/GeneratedTextGrid";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";

function Profile() {
  const { currentUser } = useAuth() as AuthSchema;

  const [userInfo, setUserInfo] = useState<any>(null);

  const [currentTab, setCurrentTab] = useState<string>("Generated Text");

  useEffect(() => {
    // Get username and description for the current user
    getUserInfo().then((result) => setUserInfo(result));
  }, [currentUser]);

  const [value, setValue] = React.useState(0);

  // Handle current tab change
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
    if (newValue === 0) {
      setCurrentTab("Generated Text");
    } else if (newValue === 1) {
      setCurrentTab("Summarized Text");
    }
  };
  
  const generateTabContent = () => (
    <GeneratedTextGrid currentTab={currentTab} />
  );

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
            <>No specific specialization</>
          )}
        </div>
      </div>
      <br />
      <br />

      <Box sx={{ width: "100%" }}>
        <Tabs value={value} onChange={handleChange} centered>
          <Tab
            label="Generated Text"
            sx={{ color: "white", fontWeight: "bold" }}
          />
          <Tab
            label="Summarized Text"
            sx={{ color: "white", fontWeight: "bold" }}
          />
        </Tabs>
      </Box>

      {generateTabContent()}
    </div>
  );
}

export default Profile;
