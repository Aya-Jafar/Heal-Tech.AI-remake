import React, { useState, ChangeEvent, useEffect } from "react";
import summarizeText from "../../huggingFace/textSummary";
import { countTokens, extractPdfText } from "../../utils/helpers";
import { SummaryAPIResponse, APIErrorResponse } from "../../schema";
import saveIcon from "../../images/save-icon.png";
import Modal from "@mui/material/Modal";
import { Box } from "@mui/material";
import { Typography } from "@mui/material";
import { TextField } from "@mui/material";
import { useAuth } from "../../store/auth";
import { AuthSchema } from "../../schema";
import { saveBoxStyle } from "../../utils/dynamicStyles";
import { saveSummarizedText } from "../../Firebase/data";
import CustomizedSnackbars from "../../components/SnackBar";

export default function Summarization() {
  const [fileContent, setFileContent] = useState<string | null>(null);
  const { currentUser, setIsLoginModalOpen } = useAuth() as AuthSchema;

  const [summaryText, setSummaryText] = useState<SummaryAPIResponse>();

  const [errorMsg, setErrorMsg] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [snackbar, setSnackbar] = React.useState<boolean>(false);

  const [isTitleModalOpen, setIsTitleModalOpen] =
    React.useState<boolean>(false);

  const [title, setTitle] = React.useState<string>("");

  const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = async (e: ProgressEvent<FileReader>) => {
        const content = e.target?.result as string;

        if (file.name.endsWith(".pdf")) {
          const pdfContent = await extractPdfText(content);
          setFileContent(pdfContent);
        } else {
          setFileContent(content);
        }
      };

      reader.readAsBinaryString(file);
    }
  };

  useEffect(() => {
    console.log(summaryText?.generated_text);
  }, [summaryText, isLoading]);

  const summarizeClickHandler = async () => {
    if (fileContent) {
      // Check input size before sending request
      if (countTokens(fileContent) > 512) {
        setErrorMsg("File size is too large");
        setIsLoading(false);
        setFileContent(null);
        return;
      }

      const makeRequest = async () => {
        setIsLoading(true);
        const response = await summarizeText({ inputs: fileContent });
        if (Array.isArray(response) && response[0]?.generated_text) {
          console.log(response[0].generated_text);

          setSummaryText(response[0]?.generated_text);

          setIsLoading(false);
          setFileContent(null);
        } else {
          setErrorMsg("Something went wrong, Please try again");
          setIsLoading(false);
          setFileContent(null);
        }
      };

      await makeRequest();
    }
  };

  const handleSaveClick = async () => {
    if (currentUser !== undefined && currentUser !== null) {
      setIsTitleModalOpen(true);
    } else {
      setIsLoginModalOpen(true);
    }
  };

  const saveToProfile = async () => {
    if (
      title.length > 0 &&
      summaryText !== undefined &&
      typeof summaryText === "string" &&
      errorMsg.length === 0
    ) {
      await saveSummarizedText({
        title: title,
        text: summaryText,
      });
      setIsTitleModalOpen(false);
      setSnackbar(true);
    } else {
      // TODO: show snackbar error message
    }
  };

  console.log(summaryText);

  return (
    <div className="model-page">
      <div className="model-description">
        <h1>Text summarization</h1>
        <p>
          where you can upload paitients documents and data to get a summary of
          paitient documents saving a lot of time and with more effiency for
          this purpose we use model named flan-t5 and then fine tune it on
          (dailog-summary data ) to be more properate for this domain to enhance
          doctors work and increase effiency
        </p>
        <br />
        <p>Upload patient document (as a PDF) and then click summarize</p>
      </div>
      <div className="model summary">
        <div className="file-upload-container">
          <input type="file" id="inp" onChange={handleFileChange} />
        </div>

        <button id="explore-btn" onClick={summarizeClickHandler}>
          {isLoading ? <strong>Loading...</strong> : <strong>Summarize</strong>}
        </button>

        {summaryText !== undefined &&
          typeof summaryText === "string" &&
          errorMsg.length === 0 && (
            <>
              <p>{summaryText}</p>
              <center>
                <button className="save-btn" onClick={handleSaveClick}>
                  <img src={saveIcon} alt="" />
                  <p>Save</p>
                </button>
              </center>
            </>
          )}
        {errorMsg.length > 0 && (
          <>
            <p>{errorMsg}</p>
          </>
        )}

        <Modal
          open={isTitleModalOpen}
          onClose={() => setIsTitleModalOpen(false)}
        >
          <Box sx={saveBoxStyle}>
            <Typography id="modal-modal-title" variant="h4" component="h2">
              Save to your profile
            </Typography>
            <form action="" style={{ marginTop: "60px" }}>
              <TextField
                id="outlined-basic"
                label="Title"
                variant="outlined"
                name="title"
                onChange={(e) => setTitle(e.target.value)}
                style={{ marginBottom: "20px" }}
                sx={{
                  width: "100%",
                  "& label": {
                    color: "white", // Label color
                  },
                  "& fieldset": {
                    borderColor: "white !important", // Border color
                  },
                }}
                inputProps={{
                  style: {
                    color: "white", // Text color
                  },
                }}
              />
            </form>

            <br />
            <br />
            <center>
              <button className="btn" onClick={saveToProfile}>
                <strong>Save</strong>
              </button>
            </center>
          </Box>
        </Modal>
        <CustomizedSnackbars
          text="Summarized text was saved in profile successfully"
          openState={snackbar}
          setOpenState={setSnackbar}
        />
      </div>
    </div>
  );
}
