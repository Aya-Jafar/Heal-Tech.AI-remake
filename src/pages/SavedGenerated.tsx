import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { getSavedGeneratedData } from "../Firebase/data";
import Modal from "@mui/material/Modal";
import { Box } from "@mui/material";
import { Typography } from "@mui/material";
import { confirmDeleteBoxStyle } from "../utils/dynamicStyles";
import { deleteGeneratedText, editGeneratedText } from "../Firebase/data";
import CustomizedSnackbars from "../components/common/SnackBar";
import { SavedGeneratedData } from "../schema";

function SavedGenerated() {
  const { generatedTextId, type } = useParams();

  const [currentData, setCurrentData] = useState<
    SavedGeneratedData | undefined
  >();

  const [confirmOpen, setConfirmOpen] = useState<boolean>(false);
  const [showSnackbar, setShowSnackbar] = useState<boolean>(false);

  const [isEditing, setIsEditing] = useState<boolean>(false);

  const [editBtnText, setEditBtnText] = useState<string>("Edit");

  const [editedText, setEditedText] = useState<string>("");

  const fetchDataBasedOnType = (currentType: string) => {
    if (
      generatedTextId &&
      type === currentType &&
      (currentType === "summarized" || currentType === "generated")
    ) {
      getSavedGeneratedData(generatedTextId, currentType)
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
  };

  useEffect(() => {
    if (type) {
      fetchDataBasedOnType(type);
    }
  }, [generatedTextId, type]);

  const handleInput = async (e: React.FormEvent<HTMLSpanElement>) => {
    let newText = (e.target as HTMLSpanElement).innerText;
    setEditedText(newText);
  };

  const handleSaveClick = async () => {
    if (generatedTextId && (type === "summarized" || type === "generated")) {
      const edited = await editGeneratedText(generatedTextId, editedText, type);
      if (edited && editBtnText === "Save") {
        setShowSnackbar(true);
      }
    }
  };

  return (
    <div className="page-wrapper">
      <div className="generated-page-container">
        {currentData !== undefined && (
          <>
            <div className="generated-crud">
              <h1>{currentData?.title}</h1>
              <div className="crud-btns">
                <button
                  className="btn"
                  id="edit-btn"
                  onClick={() => {
                    setIsEditing(true);
                    setEditBtnText("Save");
                    handleSaveClick();
                  }}
                >
                  {editBtnText}
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
            <p
              contentEditable={isEditing}
              suppressContentEditableWarning={true}
              onInput={handleInput}
            >
              {currentData?.text}
            </p>
          </>
        )}
        <Modal open={confirmOpen} onClose={() => setConfirmOpen(false)}>
          <Box sx={confirmDeleteBoxStyle}>
            <Typography id="modal-modal-title" variant="h4" component="h2">
              Confirm Action
            </Typography>
            <br />
            <Typography variant="subtitle1">
              Are you sure you want to delete this generated text?
            </Typography>
            <br />
            <br />
            <div className="crud-btns">
              <button
                className="btn"
                id="del-btn-confirm"
                onClick={async () => {
                  if (generatedTextId) {
                    // If the delete was successful
                    if (
                      type &&
                      (type === "summarized" || type === "generated")
                    ) {
                      const isDeleted = await deleteGeneratedText(
                        generatedTextId,
                        type
                      );

                      if (isDeleted) {
                        setShowSnackbar(true);
                        setConfirmOpen(false);
                      }
                    }
                  }
                }}
              >
                Delete
              </button>
              <button
                className="btn"
                id="cancel-btn-confirm"
                onClick={() => setConfirmOpen(false)}
              >
                Cancel
              </button>
            </div>
          </Box>
        </Modal>
        <CustomizedSnackbars
          text="Generated text was successfully deleted"
          openState={showSnackbar}
          type="success"
          setOpenState={setShowSnackbar}
        />

        <CustomizedSnackbars
          text="Generated text was successfully updated"
          openState={showSnackbar}
          type="success"
          setOpenState={setShowSnackbar}
        />
      </div>
    </div>
  );
}

export default SavedGenerated;
