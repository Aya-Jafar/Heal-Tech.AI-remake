import React, { useState, ChangeEvent, useEffect } from "react";
import summarizeText from "../../huggingFace/textSummary";
import { extractPdfText } from "../../utils/helpers";
import { ApiResponse } from "../../schemas";


export default function Summarization() {
  const [fileContent, setFileContent] = useState<string | null>(null);
  const [generatedText, setGeneratedText] = useState<ApiResponse | null>(null);

  const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    // TODO: Add File size check

    if (file) {
      const reader = new FileReader();
      reader.onload = async (e) => {
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


  useEffect(() => {}, [generatedText]);


  const summarize = () => {
    if (fileContent) {
      summarizeText({ inputs: fileContent }).then((response: ApiResponse[]) => {

        // console.log(JSON.stringify(response));
        // if (response.hasOwnProperty("generated_text")) {
        setGeneratedText(response[0]);
        console.log("Generated text set:", response);
        // }
      });
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
        <p>Upload patient document and then click summarize</p>
      </div>
      <div className="model summary">
        <div className="file-upload-container">
          {/* TODO: Change the accept to txt and PDF */}
          <input type="file" id="inp" onChange={handleFileChange} />
        </div>

        <button id="explore-btn" onClick={summarize}>
          Summarize
        </button>

        {generatedText !== null && (
          <p>{generatedText.generated_text}</p>
        )}
      </div>
    </div>
  );
}
