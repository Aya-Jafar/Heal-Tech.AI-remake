import React from "react";
import PredictiveText from "../../components/PredictiveText";
import saveIcon from "../../images/save-icon.png";
import { saveGeneratedText } from "../../Firebase/data";

export default function AutoCompletion() {
  const handleSaveClick = async () => {
    console.log("hiii");

    await saveGeneratedText({
      title: "Mock title",
      text: "Mock text",
    });
  };

  return (
    <div className="model-page">
      <div className="model-description">
        <div className="title-and-save">
          <h1>Medical Auto Completion</h1>
        </div>

        <p>
          We used a model named Dialo GPT-large, created by Microsoft in 2019 as
          a general-purpose model. We fine-tuned it on medical domain data (from
          medical books and papers) so that the model can assist doctors in
          enhancing their work.
        </p>
        <br />
        <p>
          Start typing and the AI completion will show up. Hit Tab to apply it.
        </p>
      </div>

      <div className="model-section">
        <button className="save-btn" onClick={handleSaveClick}>
          <img src={saveIcon} alt="" />
          Save
        </button>
        <PredictiveText />
      </div>
    </div>
  );
}
