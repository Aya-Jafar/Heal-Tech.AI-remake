import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { getSavedGeneratedData } from "../Firebase/data";

interface SavedGeneratedData {
  title: string;
  text: string;
}

function SavedGenerated() {
  const { generatedTextId } = useParams();
  const [currentData, setCurrentData] = useState<
    SavedGeneratedData | undefined
  >();

  useEffect(() => {
    if (generatedTextId) {
      getSavedGeneratedData(generatedTextId)
        .then((result) => {
          if (result) {
            const transformedData: SavedGeneratedData = {
              title: result?.title,
              text: result?.text,
            };
            setCurrentData(transformedData);
          } else {
            setCurrentData(undefined);
          }
        })
        .catch((error) => {
          setCurrentData(undefined);
        });
    }
  }, [generatedTextId]);


  return (
    <div className="page-wrapper">
      <div className="generated-page-container">
        {currentData !== undefined && (
          <>
            <div className="generated-crud">
              <h1>{currentData?.title}</h1>
              <div className="crud-btns">
                <button className="btn" id="edit-btn">
                  Edit
                </button>
                <button className="btn" id="del-btn">
                  Delete
                </button>
              </div>
            </div>
            <p>{currentData?.text}</p>
          </>
        )}
      </div>
    </div>
  );
}

export default SavedGenerated;
