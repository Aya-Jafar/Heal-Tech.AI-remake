import React, { useState, useRef, useEffect } from "react";
import PredictiveText from "../../components/PredictiveText";

export default function AutoCompletion() {
  return (
    <div className="model-page">
      <div className="model-description">
        <h1>Medical Auto Completion</h1>
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
      <div className="model">
        <PredictiveText />
      </div>
    </div>
  );
}
