import React, { useState, ChangeEvent, useEffect } from "react";
import summarizeText from "../../huggingFace/textSummary";
import { countTokens, extractPdfText } from "../../utils/helpers";
import { SummaryAPIResponse, APIErrorResponse } from "../../schema";

export default function Summarization() {
  const [fileContent, setFileContent] = useState<string | null>(null);
  const [summaryText, setSummaryText] = useState<SummaryAPIResponse | string>(
    ""
  );
  const [isLoading, setIsLoading] = useState<boolean>(false);

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
      </div>
    </div>
  );
}
