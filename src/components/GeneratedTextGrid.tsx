import React from "react";
import { linkStyle } from "../utils/dynamicStyles";
import { Link } from "react-router-dom";
import {
  getSavedGeneratedTexts,
  getSavedSummarizedTexts,
} from "../Firebase/data";

interface SavedGenerated {
  generatedTextId?: string;
  title?: string;
  text?: string;
}

interface GeneratedTextGridProps {
  currentTab: string;
}

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
    getCurrentTabData();
  }, [currentTab, loaded]);

  return (
    <>
      {!loaded && (
        <div className="loader-container">
          <span className="loader"></span>
        </div>
      )}
      {loaded && savedGenerated?.length > 0 ? (
        <div className="saved-grid">
          {savedGenerated?.map((saved: SavedGenerated, index) => (
            <Link
              to={`/saved-generated/${saved?.generatedTextId}`}
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
    </>
  );
}

export default GeneratedTextGrid;
