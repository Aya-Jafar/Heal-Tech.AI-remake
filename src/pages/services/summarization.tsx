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

export default function Summarization() {
  const [fileContent, setFileContent] = useState<string | null>(null);
  const { currentUser, setIsLoginModalOpen } = useAuth() as AuthSchema;


  const [summaryText, setSummaryText] = useState<SummaryAPIResponse | string>();

  const [isLoading, setIsLoading] = useState<boolean>(false);

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

  useEffect(() => {}, [summaryText, isLoading]);

  const summarizeClickHandler = async () => {
    if (fileContent) {
      // Check input size before sending request
      if (countTokens(fileContent) > 512) {
        setSummaryText("File size is too large");
        setIsLoading(false);
        setFileContent(null);
        return;
      }

      const makeRequest = async () => {
        setIsLoading(true);
        const response = await summarizeText({ inputs: fileContent });
        if (Array.isArray(response) && response[0]?.generated_text) {
          setSummaryText(response[0].generated_text);
          setIsLoading(false);
          setFileContent(null);
        } else {
          setSummaryText("Something went wrong, Please try again");
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
      summaryText &&
      typeof summaryText === "object" &&
      summaryText.generated_text !== undefined &&
      typeof summaryText.generated_text === "string" &&
      summaryText.generated_text.length > 0
    ) {
      if (typeof summaryText === "object") {
        await saveSummarizedText({
          title: title,
          text: summaryText.generated_text,
        });
      }
      setIsTitleModalOpen(false);
      // setSnackbar(true);
    } else {
      // TODO: show snackbar error message
    }
  };

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

        {summaryText !== null &&
        summaryText !== undefined &&
        typeof summaryText !== "string" ? (
          <p>{summaryText.generated_text}</p>
        ) : (
          // Show error message string
          <p>{summaryText}</p>
        )}
        <center>
          <button className="save-btn" onClick={handleSaveClick}>
            <img src={saveIcon} alt="" />

            <p>Save</p>
          </button>
        </center>

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
      </div>
    </div>
  );
}
