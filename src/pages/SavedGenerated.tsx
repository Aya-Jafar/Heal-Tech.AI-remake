import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { getSavedGeneratedData } from "../Firebase/data";
import Modal from "@mui/material/Modal";
import { Box } from "@mui/material";
import { Typography } from "@mui/material";
import { confirmDeleteBoxStyle } from "../dynamicStyles";
import { deleteGeneratedText } from "../Firebase/data";

interface SavedGeneratedData {
  title: string;
  text: string;
}

function SavedGenerated() {
  const { generatedTextId } = useParams();
  const [currentData, setCurrentData] = useState<
    SavedGeneratedData | undefined
  >();

  const [confirmOpen, setConfirmOpen] = useState<boolean>(false);

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
                <button
                  className="btn"
                  id="del-btn"
                  onClick={() => setConfirmOpen(true)}
                >
                  Delete
                </button>
              </div>
            </div>
            <p>{currentData?.text}</p>
          </>
        )}
        <Modal open={confirmOpen} onClose={() => setConfirmOpen(false)}>
          <Box
            sx={confirmDeleteBoxStyle}
            style={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Typography id="modal-modal-title" variant="h4" component="h2">
              Confirm Action
            </Typography>
            <br />
            <Typography variant="subtitle1">
              Are you sure you want to delete this generated text?
            </Typography>
            <br />
            <br />
            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                width: "100%",
                gap: "10px",
              }}
            >
              <button
                className="btn"
                id="del-btn-confirm"
                onClick={() => {
                  if (generatedTextId) {
                    deleteGeneratedText(generatedTextId);
                  }
                }}
              >
                Delete
              </button>
              <button className="btn" id="cancel-btn-confirm">
                Cancel
              </button>
            </div>
          </Box>
        </Modal>
      </div>
    </div>
  );
}

export default SavedGenerated;
