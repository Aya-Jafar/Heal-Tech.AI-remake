import React from "react";
import { linkStyle } from "../../utils/dynamicStyles";
import { Link } from "react-router-dom";
import {
  getSavedGeneratedTexts,
  getSavedSummarizedTexts,
} from "../../backend/data";
import { GeneratedTextGridProps, SavedGenerated } from "../../schema";
import { Grid } from "@mui/material";
import Loader from "../common/Loader";

function GeneratedTextGrid({ currentTab }: GeneratedTextGridProps) {
  const [loaded, setLoaded] = React.useState<boolean>(false);
  const [savedGenerated, setSavedGenerated] = React.useState<
    Array<SavedGenerated>
  >([]);

  const getCurrentTabData = () => {
    // Fetch firebase data based on the current tab
    switch (currentTab) {
      case "Generated Text":
        getSavedGeneratedTexts(setSavedGenerated, setLoaded);
        break;
      case "Summarized Text":
        getSavedSummarizedTexts(setSavedGenerated, setLoaded);
        break;
      default:
        break;
    }
  };

  React.useEffect(() => {
    setLoaded(false);
    getCurrentTabData();
  }, [currentTab]);

  return (
    <>
      {!loaded &&  <Loader />}


      {loaded && savedGenerated?.length > 0 ? (
        <Grid container spacing={{ xs: 2, md: 3 }} className="saved-grid">
          {savedGenerated?.map((saved: SavedGenerated, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Link
                to={`/saved-generated/${saved?.generatedTextId}/${
                  currentTab === "Generated Text" ? "generated" : "summarized"
                }`}
                style={{ ...linkStyle }}
              >
                <div className="saved-item">
                  <h1>{saved?.title}</h1>
                  <p>{saved?.text}</p>
                </div>
              </Link>
            </Grid>
          ))}
        </Grid>
      ) : (
        <center>
          <p>No Saved texts yet...</p>
        </center>
      )}
    </>
  );
}

export default GeneratedTextGrid;
