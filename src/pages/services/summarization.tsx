import React, { useState, ChangeEvent } from "react";

export default function Summarization() {
  const [fileContent, setFileContent] = useState<string | null>(null);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target?.result as string;
        setFileContent(content);
      };
      // TODO: Add File size check
      reader.readAsText(file, "utf-8");
    }
  };

  // console.log(fileContent);

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
          <input
            type="file"
            id="inp"
            onChange={handleFileChange}
            accept="pdf/*"
          />
        </div>
        <button id="explore-btn">Summarize</button>
      </div>
    </div>
  );
}
